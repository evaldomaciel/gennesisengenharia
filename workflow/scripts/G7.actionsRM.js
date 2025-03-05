/**
* A API de autenticação da Totvs baseia no "Basic access authentication" do HTTP.
* Código Java para autenticação 
* Programa responsável por integrar com os Web services do RM 
*  Exemplo dev valores para os parâmetros 
* @param {String} user nome de usuário
* @param {String} pass senha do usuário 
* @param {String} serviceRM nome do serviço cadastrado no painel de controle
* @param {String} instance instância do serviço "com.totvs.WsDataServer"
* @param {String} authClient instância do serviço de autenticação "com.totvs.IwsDataServer"
* @returns parâmetros de autenticação
*/
function getWebService(user, pass, serviceRM, instance, authClient) {
	var dataServerService = ServiceManager.getServiceInstance(serviceRM);
	if (dataServerService == null) {
		throw "Serviço nao encontrado: " + serviceRM;
	}
	var serviceLocator = dataServerService.instantiate(instance);
	if (serviceLocator == null) {
		throw "Instancia do serviço nao encontrada: " + serviceRM + " - " + instance;
	}
	var service = serviceLocator.getRMIwsDataServer();
	if (service == null) {
		throw "Instancia do dataserver do invalida: " + serviceRM + " - " + instance;
	}
	var serviceHelper = dataServerService.getBean();
	if (serviceHelper == null) {
		throw "Instancia do service helper invalida: " + serviceRM + " - " + instance;
	}
	var authService = serviceHelper.getBasicAuthenticatedClient(service, authClient, user, pass);
	if (serviceHelper == null) {
		throw "Instancia do auth service invalida: " + serviceRM + " - " + instance;
	}
	return authService;
}
function dcReadView(dataServerName, context, user, pass, filter) {
	// carrega o webservice...
	var authService = getWebService(user, pass);
	// lê os dados da visão respeitando o filter passado
	var viewData = new String(authService.readView(dataServerName, filter, context));
	return viewData;
}
function dcReadRecord(dataServerName, context, user, pass, primaryKey) {
	// carrega o webservice...
	var authService = getWebService(user, pass);
	// lê os dados do registro respeitando a pk passada
	try {
		var recordData = new String(authService.readRecord(dataServerName, primaryKey, context));
	}
	catch (e) {
		var recordData = new String(authService.getSchema(dataServerName, context));
	}
	return recordData;
}
function dcSaveRecord(dataServerName, context, user, pass, xml) {
	// carrega o webservice...
	var authService = getWebService(user, pass);
	// salva o registro de acordo com o xml passado
	var pk = new String(authService.readRecord(dataServerName, xml, context));
	return pk;
}

//Transforma o conceito de constraints do Fluig para o filter do TBC.
function parseConstraints(constraints, filterRequired) {
	// inicializa o resultado...
	var result = [];
	result.context = "";
	// inicializa o filter...
	var filter = "";
	// varre as contraints...
	for (con in constraints) {
		var fieldName = con.getFieldName().toUpperCase();
		if (fieldName == "RMSCONTEXT") {
			result.context = con.getInitialValue();
			continue;
		}
		filter += "(";
		if (fieldName == "RMSFILTER") {
			filter += con.getInitialValue();
		}
		else {
			if (con.getInitialValue() == con.getFinalValue() || isEmpty(con.getFinalValue())) {
				filter += con.getFieldName();
				var isLike = false;
				switch (con.getConstraintType()) {
					case ConstraintType.MUST:
						filter += " = ";
						break;
					case ConstraintType.MUST_NOT:
						filter += " = ";
						break;
					case ConstraintType.SHOULD:
						filter += " LIKE ";
						isLike = true;
						break;
					case ConstraintType.SHOULD_NOT:
						filter += " NOT LIKE ";
						isLike = true;
						break;
				}
				filter += getFormattedValue(con.getInitialValue(), isLike);
			}
			else {
				filter += con.getFieldName();
				filter += " BETWEEN ";
				filter += getFormattedValue(con.getInitialValue(), false);
				filter += " AND ";
				filter += getFormattedValue(con.getFinalValue(), false);
			}
		}
		filter += ") AND ";
	}
	if (filter.length == 0) {
		if (filterRequired) {
			filter = "1=1";
		}
		else {
			filter = "1=1";
		}
	}
	else filter = filter.substring(0, filter.length - 5);
	// guarda o filter...
	result.filter = filter;
	// retorna o resultado...
	return result;
}
function isEmpty(str) {
	return (!str || 0 === str.length);
}
function getFormattedValue(value, isLike) {
	if (isLike) { return "'%" + value + "%'"; }
	else { return "'" + value + "'"; }
}
function getXMLFromString(xmlString) {
	var factory = javax.xml.parsers.DocumentBuilderFactory.newInstance();
	var parser = factory.newDocumentBuilder();
	var is = new org.xml.sax.InputSource();
	is.setCharacterStream(new java.io.StringReader(xmlString));
	return parser.parse(is);
}
function checkIsPK(result, qtd) {
	var lines = result.split('\r');
	if (lines.length == 1) {
		var pk = result.split(';');
		if (pk.length == qtd) return;
	}
	throw result;
}
function ChekExist(result) {
	var lines = result.split('\r');
	if (lines.length > 1) return true;
	else return false;
}
/**
 * Trata o XML para evitar que a próximas funções a serem executadas retornem algum erro
 * @param {string} params string de integração  
 * @returns string de integração sem os cacteres que podem causar algum problema na integração
 */
function formatStringToXML(params) {
	var regexLineR = new RegExp("\r", "g");
	var regexLine = new RegExp("\n", "g");
	var regexTab = new RegExp("\t", "g");
	var regexDspace = new RegExp("  ", "g");
	var text = params.replace(regexLine, " ");
	text = text.replace(regexLineR, " ");
	text = text.replace(regexTab, " ");
	text = text.replace(regexDspace, " ");
	return text = text.trim();
}
function addItem(text, prevColumnName, newColumn) {
	if ((prevColumnName != null) && (prevColumnName.trim() != "")) {
		var entryPoint = text.indexOf(prevColumnName);
		return text.substr(0, entryPoint) + newColumn + text.substr(entryPoint);;
	}
	else {
		return text
	};
}
function replaceValue(text, columnName, newValue) {
	newValue = String(newValue);
	if ((newValue != null) && (newValue.trim() != "")) {
		var regex = new RegExp("<" + columnName + ">(.*?)<\\/" + columnName + ">", "g");
		var replaceText = "<" + columnName + ">" + newValue + "</" + columnName + ">";
		return text.replace(regex, replaceText);
	}
	else return text;
}
function removeValue(text, columnName) {
	var regex = new RegExp("<" + columnName + ">(.*?)<\\/" + columnName + ">", "g");
	var replaceText = "<" + columnName + "></" + columnName + ">";
	return text.replace(regex, replaceText);
}
function removeNode(text, columnName) {
	var regex = new RegExp("<" + columnName + ">(.*?)<\\/" + columnName + ">", "g");
	var replaceText = "";
	return text.replace(regex, replaceText);
}
function isEmpty(str) {
	return (!str || 0 === str.length);
}
function getNodeValue(text, columnName) {
	var regex = new RegExp("<" + columnName + ">(.*?)</" + columnName + ">");
	var match = text.match(regex);
	return match ? match[1] : null;
}