function createDataset(fields, constraints, sortFields) {
	log.info('=====DTS INTEGRACAO G5=====')
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("Retorno");
	dataset.addColumn("Mensagem");
	try {

		var wsUpdate_RM = ServiceManager.getService('RMWsDataServer');
		var serviceLocator = wsUpdate_RM.instantiate('com.totvs.WsDataServer');
		var service = serviceLocator.getRMIwsDataServer();
		var serviceHelper = wsUpdate_RM.getBean();
		var dataServerName = 'FinLanDataBR'

		var primaryKey = hAPI.getCardValue("CODCOLIGADA") + ";" + hAPI.getCardValue("IDLAN");
		var authService = getWebService(usuario, senha);
		var context = "CodSistema=F;CodColigada=1"
		var text = new String(authService.readRecord(NOME_DATASERVER, primaryKey, context));
		if (!ChekExist(text)) text = GetXml();

		if (constraints != null && constraints.length > 0) {
			for (var c = 0; c < constraints.length; c++) {
				if (constraints[c].fieldName.toUpperCase() != "SQLLIMIT") {
					var campoNome = constraints[c].fieldName.toUpperCase();
					var campoValor = String(constraints[c].initialValue);
					text = replaceValue(text, campoNome, campoValor);
					if (campoNome == "CODCOLIGADA") context = "CodSistema=F;CodColigada=" + campoValor;
				}
			}
		}

		log.info('========= XML =========')
		log.info(XML)
		log.info("====================== INSTANCIANDO ======================")
		var authenticatedService = serviceHelper.getBasicAuthenticatedClient(service, "com.totvs.IwsDataServer", 'suporte.totvs', 'Suporte#5');
		var result = authenticatedService.saveRecord(dataServerName, XML, context);

		log.info('RESULT +++ ' + String(result))
		var resultMsg = String(result)

		if (resultMsg.split(";").length == 1) {
			dataset.addRow(['NOK', String(result)])
		} else {
			dataset.addRow(['OK', String(result)])
		}
		return dataset
	} catch (e) {
		dataset.addRow(['ERRO' + e.lineNumber, String(e)]);
		return dataset
	}
}

function getConstraints(constraints) {
	var objRetorno = {}
	if (constraints != null && constraints.length > 0) {
		for (var c = 0; c < constraints.length; c++) {
			if (constraints[c].fieldName.toUpperCase() != "SQLLIMIT") {
				objRetorno[constraints[c].fieldName.toUpperCase()] = constraints[c].initialValue
			}
		}
	}
	return objRetorno;
}

function ChekExist(result) {
	var lines = result.split('\r');
	if (lines.length > 1) return true
	else return false;
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

function GetXml() {
	return "<FinLAN>" +
		"\n   <FLAN>" +
		"\n      <CODCOLIGADA>1</CODCOLIGADA>" +
		"\n      <IDLAN>-1</IDLAN>  " +
		"\n      <NUMERODOCUMENTO>000046632/09</NUMERODOCUMENTO>" +
		"\n      <NFOUDUP>0</NFOUDUP>" +
		"\n      <CLASSIFICACAO>0</CLASSIFICACAO>" +
		"\n      <PAGREC>2</PAGREC>" +
		"\n      <STATUSLAN>0</STATUSLAN>" +
		"\n      <CODAPLICACAO>F</CODAPLICACAO>" +
		"\n      <CODCCUSTO>01.01.01.01.002</CODCCUSTO>" +
		"\n      <HISTORICO>teste</HISTORICO>" +
		"\n      <DATAVENCIMENTO>2024-07-31T00:00:00.000</DATAVENCIMENTO>" +
		"\n      <DATAEMISSAO>2024-07-25T00:00:00.000</DATAEMISSAO>" +
		"\n      <DATAPREVBAIXA>2024-07-25T00:00:00.000</DATAPREVBAIXA>" +
		"\n      <VALORORIGINAL>1.0000</VALORORIGINAL>" +
		"\n      <VALORCAPBX>0.0000</VALORCAPBX>" +
		"\n      <VALORJUROS>0.0000</VALORJUROS>" +
		"\n      <VALORDESCONTO>0.0000</VALORDESCONTO>" +
		"\n      <VALORMULTA>0.0000</VALORMULTA>" +
		"\n      <VALORAUXILIAR>0.0000</VALORAUXILIAR>" +
		"\n      <VALORBASEIRRF>100.0000</VALORBASEIRRF>" +
		"\n      <VALORIRRF>0.0000</VALORIRRF>" +
		"\n      <VALORREPASSE>0.0000</VALORREPASSE>" +
		"\n      <VALORVENCIMENTOANTECIP>0.0000</VALORVENCIMENTOANTECIP>" +
		"\n      <VALORNOTACREDITO>0.0000</VALORNOTACREDITO>" +
		"\n      <VALORADIANTAMENTO>0.0000</VALORADIANTAMENTO>" +
		"\n      <VALORDEVOLUCAO>0.0000</VALORDEVOLUCAO>" +
		"\n      <CAPMENSAL>00.00</CAPMENSAL>" +
		"\n      <TAXASVENDOR>0.0000</TAXASVENDOR>" +
		"\n      <JUROSVENDOR>0.0000</JUROSVENDOR>" +
		"\n      <CODCOLCFO>0</CODCOLCFO>" +
		"\n      <CODCFO>000000003</CODCFO>" +
		"\n      <CODCOLCXA>1</CODCOLCXA>" +
		"\n      <CODCXA>99522-9</CODCXA>" +
		"\n      <IDPGTO>1</IDPGTO>" +
		"\n      <CODTDO>PIX</CODTDO>" +
		"\n      <CODFILIAL>1</CODFILIAL>" +
		"\n      <SERIEDOCUMENTO>1</SERIEDOCUMENTO>" +
		"\n      <TIPOCONTABILLAN>0</TIPOCONTABILLAN>" +
		"\n      <CODMOEVALORORIGINAL>R$</CODMOEVALORORIGINAL>" +
		"\n      <LIBAUTORIZADA>0</LIBAUTORIZADA>" +
		"\n      <STATUSEXPORTACAO>0</STATUSEXPORTACAO>" +
		"\n      <NUMLOTECONTABIL>0</NUMLOTECONTABIL>" +
		"\n      <STATUSEXTRATO>0</STATUSEXTRATO>" +
		"\n      <CNABACEITE>0</CNABACEITE>" +
		"\n      <CNABSTATUS>0</CNABSTATUS>" +
		"\n      <CNABBANCO>341</CNABBANCO>" +
		"\n      <REEMBOLSAVEL>0</REEMBOLSAVEL>" +
		"\n      <USUARIO>LUCIANA.S</USUARIO>" +
		"\n      <BAIXAAUTORIZADA>1</BAIXAAUTORIZADA>" +
		"\n      <TEMCHEQUEPARCIAL>0</TEMCHEQUEPARCIAL>" +
		"\n      <JAIMPRIMIU>0</JAIMPRIMIU>" +
		"\n      <NUMBLOQUEIOS>0</NUMBLOQUEIOS>" +
		"\n      <COTACAOINCLUSAO>1.000000000</COTACAOINCLUSAO>" +
		"\n      <COTACAOBAIXA>0.000000000</COTACAOBAIXA>" +
		"\n      <CARENCIAJUROS>0</CARENCIAJUROS>" +
		"\n      <TIPOJUROSDIA>0</TIPOJUROSDIA>" +
		"\n      <USUARIOCRIACAO>LUCIANA.S</USUARIOCRIACAO>" +
		"\n      <DATAALTERACAO>2024-03-05T00:00:00</DATAALTERACAO>" +
		"\n      <ALTERACAOBLOQUEADA>0</ALTERACAOBLOQUEADA>" +
		"\n      <MULTADIA>0.0000</MULTADIA>" +
		"\n      <DESCONTADO>0</DESCONTADO>" +
		"\n      <VALORINSS>0.0000</VALORINSS>" +
		"\n      <VALORDEDUCAO>0.0000</VALORDEDUCAO>" +
		"\n      <APLICFORMULA>F</APLICFORMULA>" +
		"\n      <INSSEMOUTRAEMPRESA>0.0000</INSSEMOUTRAEMPRESA>" +
		"\n      <PERCENTBASEINSS>100.0000</PERCENTBASEINSS>" +
		"\n      <OCAUTONOMO>0</OCAUTONOMO>" +
		"\n      <PERCBASEINSSEMPREGADO>100.0000</PERCBASEINSSEMPREGADO>" +
		"\n      <INSSEDITADO>0</INSSEDITADO>" +
		"\n      <IRRFEDITADO>0</IRRFEDITADO>" +
		"\n      <REUTILIZACAO>0</REUTILIZACAO>" +
		"\n      <CATEGORIAAUTONOMO>0</CATEGORIAAUTONOMO>" +
		"\n      <VALORSESTSENAT>0.0000</VALORSESTSENAT>" +
		"\n      <CONVENIO>99522</CONVENIO>" +
		"\n      <DIGCONVENIO>9</DIGCONVENIO>" +
		"\n      <PERCJUROS>0</PERCJUROS>" +
		"\n      <PERCDESCONTO>0</PERCDESCONTO>" +
		"\n      <PERCMULTA>0</PERCMULTA>" +
		"\n      <PERCCAP>0</PERCCAP>" +
		"\n      <PERCOP1>0</PERCOP1>" +
		"\n      <PERCOP2>0</PERCOP2>" +
		"\n      <PERCOP3>0</PERCOP3>" +
		"\n      <PERCOP4>0</PERCOP4>" +
		"\n      <PERCOP5>0</PERCOP5>" +
		"\n      <PERCOP6>0</PERCOP6>" +
		"\n      <PERCOP7>0</PERCOP7>" +
		"\n      <PERCOP8>0</PERCOP8>" +
		"\n      <VALORINSSEMPREGADOR>0</VALORINSSEMPREGADOR>" +
		"\n      <VALORBASEINSSEMPREGADOR>0</VALORBASEINSSEMPREGADOR>" +
		"\n      <VRBASEINSS>0</VRBASEINSS>" +
		"\n      <VRBASEIRRF>0.0000</VRBASEIRRF>" +
		"\n      <VALORSERVICO>0.0000</VALORSERVICO>" +
		"\n      <VRBASEINSSOUTRAEMPRESA>0.0000</VRBASEINSSOUTRAEMPRESA>" +
		"\n      <IDHISTORICO>6125</IDHISTORICO>" +
		"\n      <PreencherRatCCusto>true</PreencherRatCCusto>" +
		"\n      <PreencherRatDepto>true</PreencherRatDepto>" +
		"\n      <VALORDEDUCAODEPENDENTES>0.0000</VALORDEDUCAODEPENDENTES>" +
		"\n      <VRPERDAFINANCEIRA>0.0000</VRPERDAFINANCEIRA>" +
		"\n      <MODELOCONTABILIZACAO>0</MODELOCONTABILIZACAO>" +
		"\n      <MODELOCONTABILIZACAOBAIXA>0</MODELOCONTABILIZACAOBAIXA>" +
		"\n      <CODCOLCONVENIO>1</CODCOLCONVENIO>" +
		"\n      <IDCONVENIO>14</IDCONVENIO>" +
		"\n      <VALORORIGINALBX>0</VALORORIGINALBX>" +
		"\n      <VALORDESCONTOBX>0</VALORDESCONTOBX>" +
		"\n      <VALORJUROSBX>0</VALORJUROSBX>" +
		"\n      <VALORMULTABX>0</VALORMULTABX>" +
		"\n      <VALORCAPBX>0</VALORCAPBX>" +
		"\n      <VALOROP1BX>0,0000</VALOROP1BX>" +
		"\n      <VALOROP2BX>0,0000</VALOROP2BX>" +
		"\n      <VALOROP3BX>0,0000</VALOROP3BX>" +
		"\n      <VALOROP4BX>0,0000</VALOROP4BX>" +
		"\n      <VALOROP5BX>0,0000</VALOROP5BX>" +
		"\n      <VALOROP6BX>0,0000</VALOROP6BX>" +
		"\n      <VALOROP7BX>0,0000</VALOROP7BX>" +
		"\n      <VALOROP8BX>0,0000</VALOROP8BX>" +
		"\n      <VALORINSSBX>0</VALORINSSBX>" +
		"\n      <VALORIRRFBX>0</VALORIRRFBX>" +
		"\n      <VALORSESTSENATBX>0</VALORSESTSENATBX>" +
		"\n      <VALORDEVOLUCAOBX>0</VALORDEVOLUCAOBX>" +
		"\n      <VALORNOTACREDITOBX>0</VALORNOTACREDITOBX>" +
		"\n      <VALORADIANTAMENTOBX>0</VALORADIANTAMENTOBX>" +
		"\n      <VALORJUROSVENDORBX>0</VALORJUROSVENDORBX>" +
		"\n      <VALORRETENCOESBX>0</VALORRETENCOESBX>" +
		"\n      <STATUSORCAMENTO>0</STATUSORCAMENTO>" +
		"\n      <BAIXAPENDENTE>0</BAIXAPENDENTE>" +
		"\n      <CODCOLTOMADOR>0</CODCOLTOMADOR>" +
		"\n      <VALORDESCONTOACORDO>0.0000</VALORDESCONTOACORDO>" +
		"\n      <VALORJUROSACORDO>0.0000</VALORJUROSACORDO>" +
		"\n      <VALORACRESCIMOACORDO>0.0000</VALORACRESCIMOACORDO>" +
		"\n      <VALORDEDUCAOVARIAVEL>0.0000</VALORDEDUCAOVARIAVEL>" +
		"\n      <STATUSLIQDUVIDOSA>0</STATUSLIQDUVIDOSA>" +
		"\n      <VALORVINCULADO>0</VALORVINCULADO>" +
		"\n      <STATUSNEGATIVACAO>0</STATUSNEGATIVACAO>" +
		"\n      <PreencheDadosBancarios>true</PreencheDadosBancarios>" +
		"\n      <STATUSTERCEIRIZACAO>0</STATUSTERCEIRIZACAO>" +
		"\n      <STATUSAPROVACAO>0</STATUSAPROVACAO>" +
		"\n      <CODCOLPGTO>1</CODCOLPGTO>" +
		"\n  </FLAN>" +
		"\n</FinLAN>";
}