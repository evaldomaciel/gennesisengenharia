function servicetask129(attempt, message) {
	try {
		var user = getConstante('rm_usuario')
		var pass = getConstante('rm_senha')
		var idMov = hAPI.getCardValue('IdMov');
		var codColigada = hAPI.getCardValue('CodColigada');
		var context = String("CODSISTEMA=G;CODCOLIGADA=" + codColigada + ";CODUSUARIO=" + user);
		var primaryKey = String(codColigada + ";" + idMov);
		var authService = getWebService(user, pass, 'RMWsDataServer', 'com.totvs.WsDataServer', 'com.totvs.IwsDataServer');

		var text = new String(authService.readRecord("MOVMOVIMENTOTBCDATA", primaryKey, context));

		log.info(text)

		if (String(text).indexOf("TMOV") > 0) {
			text = formatStringToXML(text);
			text = removeNode(text, "TMOV");
			text = removeNode(text, "TNFE");
			text = removeNode(text, "TMOVFISCAL");
			text = removeNode(text, "TMOVRATCCU");
			text = removeNode(text, "TITMMOV");
			text = removeNode(text, "TITMMOVRATCCU");
			text = removeNode(text, "TITMMOVCOMPL");
			text = removeNode(text, "TMOVTRANSP");
			text = removeNode(text, "TCTRCMOV");
			text = removeNode(text, "TITMMOVFISCAL");

			var TMOV = "<TMOV>";
			TMOV += "<IDMOV>" + idMov + "</IDMOV>";
			TMOV += "<CODCOLIGADA>" + codColigada + "</CODCOLIGADA>";
			TMOV += "</TMOV>";

			text = addItem(text, "</MovMovimento>", TMOV);
			text = replaceValue(text, "IDFLUIG", getValue('WKNumProces'));

			text = new XML(text);
			log.info(text);
			var result = new String(authService.saveRecord("MOVMOVIMENTOTBCDATA", text, context));
			checkIsPK(result, 2);
			log.info("Movimento atualizado no RM");
			return true;
		} else {
			throw "Não foi possível obter os dados do movimento: " + idMov + "!";
		}
	}
	catch (e) {
		if (e == null) e = "Erro desconhecido!";
		var mensagemErro = "Ocorreu um erro ao salvar dados no RM: " + String(e) + ". Linha: " + String(e.lineNumber);
		throw mensagemErro;
	}


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