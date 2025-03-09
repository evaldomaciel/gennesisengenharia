function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	/** Variáveis de filtro */
	var mainTag = "FLAN";
	var primaryKey = "1;28767";
	var dataServer = "FinLanDataBR";

	try {
		if (constraints) {
			for (var index = 0; index < constraints.length; index++) {
				var fieldName = constraints[index].fieldName;
				var initialValue = constraints[index].initialValue;
				mainTag = fieldName == 'mainTag' ? initialValue : mainTag;
				primaryKey = fieldName == 'primaryKey' ? initialValue : primaryKey;
				dataServer = fieldName == 'dataServer' ? initialValue : dataServer;
			}
		}

		/** Autenticação */
		var user = getConstante('rm_usuario');
		var pass = getConstante('rm_senha');
		var context = "CodUsuario=suporte.totvs;CodSistema=F;CodColigada=" + String(primaryKey).split(";")[0];

		var result = dcReadRecord(dataServer, context, user, pass, primaryKey);

		/** Tratamento do XML */
		var columns = new Array();
		var factory = javax.xml.parsers.DocumentBuilderFactory.newInstance();
		var parser = factory.newDocumentBuilder();
		var source = new org.xml.sax.InputSource(new java.io.StringReader(result));
		var xmlResponse = parser.parse(source);

		var nodes = xmlResponse.getElementsByTagName(mainTag);

		if (nodes.getLength() == 0) {
			throw new Error("Nenhum dado retornado com os parâmetros informados!");
		}

		for (var i = 0; i < nodes.getLength(); i++) {
			var children = nodes.item(i).getChildNodes();
			for (var j = 0; j < children.getLength(); j++) {
				if (children.item(j) instanceof org.w3c.dom.Element) {
					var column = children.item(j).getNodeName();
					if (columns.indexOf(column) < 0) {
						columns.push(column);
						dataset.addColumn(column);
					}
				}
			}
		}

		dataset.addColumn("mainTag")
		dataset.addColumn("primaryKey")
		dataset.addColumn("dataServer")

		for (var i = 0; i < nodes.getLength(); i++) {
			var datasetRow = new Array();
			var children = nodes.item(i).getChildNodes();
			for (var j = 0; j < columns.length; j++) {
				var node = children.getElementsByTagName(columns[j]);
				if (node.getLength() > 0 && node.item(0).hasChildNodes && node.item(0).getFirstChild() != null) {
					datasetRow.push(node.item(0).getFirstChild().getTextContent());
				} else {
					datasetRow.push("");
				}
			}

			datasetRow.push(mainTag)
			datasetRow.push(primaryKey)
			datasetRow.push(dataServer)
			dataset.addRow(datasetRow);
		}

		return dataset;
	} catch (error) {
		var dataset = DatasetBuilder.newDataset();
		dataset.addColumn("Linha")
		dataset.addColumn("Erro")
		dataset.addColumn("mainTag")
		dataset.addColumn("primaryKey")
		dataset.addColumn("dataServer")
		dataset.addRow(new Array(
			String(error.lineNumber),
			String(error),
			mainTag,
			primaryKey,
			dataServer
		))
	}
	return dataset;
}

/**'
* A API de autenticação da Totvs baseia no "Basic access authentication" do HTTP.
 * Código Java para autenticação 
 * Programa responsável por integrar com os Webservices do RM 
 *  Exemplo dev valores para os parâmetros 
 *		@param string Usuario = "mestre";
 *		@param string Senha = "totvs";
*/

function getWebService(Usuario, Senha) {
	var Nome_Servico = "RMWsDataServer";
	var Caminho_Servico = "com.totvs.WsDataServer";
	var dataServerService = ServiceManager.getServiceInstance(Nome_Servico);
	if (dataServerService == null) {
		throw "Servico nao encontrado: " + Nome_Servico;
	}
	var serviceLocator = dataServerService.instantiate(Caminho_Servico);
	if (serviceLocator == null) {
		throw "Instancia do servico nao encontrada: " + Nome_Servico + " - " + Caminho_Servico;
	}
	var service = serviceLocator.getRMIwsDataServer();
	if (service == null) {
		throw "Instancia do dataserver do invalida: " + Nome_Servico + " - " + Caminho_Servico;
	}
	var serviceHelper = dataServerService.getBean();
	if (serviceHelper == null) {
		throw "Instancia do service helper invalida: " + Nome_Servico + " - " + Caminho_Servico;
	}
	var authService = serviceHelper.getBasicAuthenticatedClient(service, "com.totvs.IwsDataServer", Usuario, Senha);
	if (serviceHelper == null) {
		throw "Instancia do auth service invalida: " + Nome_Servico + " - " + Caminho_Servico;
	}
	return authService;
}

function dcReadView(dataservername, context, usuario, senha, filtro) {
	var authService = getWebService(usuario, senha);
	var viewData = new String(authService.readView(dataservername, filtro, context));
	return viewData;
}


function dcReadRecord(dataservername, context, usuario, senha, primaryKey) {
	var authService = getWebService(usuario, senha);
	try { var recordData = new String(authService.readRecord(dataservername, primaryKey, context)); }
	catch (e) { var recordData = new String(authService.getSchema(dataservername, context)); }
	return recordData;
}


function dcSaveRecord(dataservername, context, usuario, senha, xml) {
	var authService = getWebService(usuario, senha);
	var pk = new String(authService.readRecord(dataservername, xml, context));
	return pk;
}

function parseConstraints(constraints, filterRequired) {
	var result = [];
	result.context = "";
	var filter = "";
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
	result.filter = filter;
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

function abrirPesquisa(DATASET_ID, dataFields, resultFields, type, title) {
	window.open("/webdesk/zoom.jsp" +
		"?datasetId=" +
		DATASET_ID +
		"&dataFields=" +
		dataFields +
		"&resultFields=" +
		resultFields +
		"&type=" +
		type +
		"&title=" +
		title
		, "zoom", "status,scroolbars=no,width=600,height=350,top=0,left=0");
}

function checkIsPK(result, qtd) {
	var lines = result.split('\r');
	if (lines.length == 1) {
		var pk = result.split(';');
		if (pk.length == qtd)
			return;
	}
	throw result;
}

function ChekExist(result) {
	var lines = result.split('\r');
	if (lines.length > 1) return true
	else return false;
}

function replaceValue(text, columnName, newValue) {
	if ((newValue != null) && (newValue.trim() != "")) {
		var regex = new RegExp("<" + columnName + ">(.*?)<\\/" + columnName + ">", "g");
		var replaceText = "<" + columnName + ">" + newValue + "</" + columnName + ">";
		return text.replace(regex, replaceText);
	}
	else return text;
}

function isEmpty(str) {
	return (!str || 0 === str.length);
}

function getConstante(param) {
	var aConstraint = [];
	aConstraint.push(DatasetFactory.createConstraint('id', param, param, ConstraintType.MUST));
	var oConstantes = DatasetFactory.getDataset('ds_Constantes', null, null, null);
	for (var i = 0; i < oConstantes.rowsCount; i++) {
		if (oConstantes.getValue(i, "id").trim() == param.trim()) {
			return oConstantes.getValue(i, "Valor").trim();
		}
	}
	return '0';
}