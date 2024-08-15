function servicetask176(attempt, message) {
	var userId = getValue("WKUser");
	var CODCCUSTO = hAPI.getCardValue('CODCCUSTO');
	var SETOR_SOLICITANTE = String(hAPI.getCardValue('SETORSOLICITANTE')).toUpperCase();
	var CODCOLIGADA = hAPI.getCardValue('CODCOLIGADA');

	/** Aprovação do Gestor */
	hAPI.setCardValue("cTask007", getAprovadorAtv(CODCCUSTO, SETOR_SOLICITANTE, CODCOLIGADA, 'Gestor'));

	/** Aprovação da diretoria */
	hAPI.setCardValue("cTask012", getAprovadorAtv(CODCCUSTO, SETOR_SOLICITANTE, CODCOLIGADA, 'Diretor'));

	hAPI.setCardValue("cTask014", getAtribuicoes("G5-014"));
	hAPI.setCardValue("cTask034", userId);
	hAPI.setCardValue("cTask097", getAtribuicoes("G5-097"));
	hAPI.setCardValue("cTask127", getAtribuicoes("G5-127"));
	hAPI.setCardValue("cTask128", getAtribuicoes("G5-128"));
	hAPI.setCardValue("cTask274", getAtribuicoes("G5-274"));

	var CampoSetor = String(hAPI.getCardValue('setor_solicitante'));
	var campoCentroCusto = String(hAPI.getCardValue('CODFILIAL'));
	/** Tratar erro */
	var cTask221 = getAtribuicoes('G5-221-' + CampoSetor + '-' + campoCentroCusto);
	hAPI.setCardValue("cTask221", getAtribuicoes(cTask221));

	var cTask216 = getAtribuicoes('G5-216-' + CampoSetor + '-' + campoCentroCusto);
	hAPI.setCardValue("cTask216", getAtribuicoes(cTask216));

	var cTask295 = getAtribuicoes('G5-295-' + CampoSetor + '-' + campoCentroCusto);
	hAPI.setCardValue("cTask295", getAtribuicoes(cTask295));

	var cTask223 = getAtribuicoes('G5-223-' + CampoSetor + '-' + campoCentroCusto);
	hAPI.setCardValue("cTask223", getAtribuicoes(cTask223));

	var cTask214 = getAtribuicoes('G5-214-' + CampoSetor + '-' + campoCentroCusto);
	hAPI.setCardValue("cTask214", getAtribuicoes(cTask214));
	return true;
}

function getAprovadorAtv(CODCCUSTO, SETOR_SOLICITANTE, CODCOLIGADA, TIPO) {
	var msgFalha = String("Não foi encontrado um aprovador no dataset 'ds_G5-Aprovar' com os parâmetros: CODCCUSTO: " + CODCCUSTO + ", SETOR_SOLICITANTE: " + SETOR_SOLICITANTE + ", CODCOLIGADA: " + CODCOLIGADA + ", TIPO: " + TIPO);
	try {
		var constraintDs_G5_CODCCUSTO = DatasetFactory.createConstraint('CODCCUSTO', CODCCUSTO, CODCCUSTO, ConstraintType.MUST);
		var constraintDs_G5_SETOR_SOLICITANTE = DatasetFactory.createConstraint('SETOR_SOLICITANTE', SETOR_SOLICITANTE, SETOR_SOLICITANTE, ConstraintType.MUST);
		var constraintDs_G5_CODCOLIGADA = DatasetFactory.createConstraint('CODCOLIGADA', CODCOLIGADA, CODCOLIGADA, ConstraintType.MUST);
		var constraintDs_G5_TIPO = DatasetFactory.createConstraint('TIPO', TIPO, TIPO, ConstraintType.MUST);
		constraintDs_G5_SETOR_SOLICITANTE.setLikeSearch(true);
		constraintDs_G5_TIPO.setLikeSearch(true);
		var constraints = new Array(constraintDs_G5_CODCCUSTO, constraintDs_G5_SETOR_SOLICITANTE, constraintDs_G5_CODCOLIGADA, constraintDs_G5_TIPO)
		log.dir(constraints)
		var datasetAprovador = DatasetFactory.getDataset('ds_G5-Aprovar', null, constraints, null);
		if (datasetAprovador != null && datasetAprovador != undefined && datasetAprovador.rowsCount > 0) {
			return datasetAprovador.getValue(0, 'APROVADOR');
		} else {
			log.warn(msgFalha);
			hAPI.setTaskComments(getValue("WKUser"), getValue("WKNumProces"), 0, msgFalha);
			notificaFalha(msgFalha, 'evaldomaciel17@gmail.com')
			notificaFalha(msgFalha, 'suportefluig@engpac.com.br')
			return "Pool:Group:G5-APROVAR";
		}
	} catch (error) {
		throw new Error(error);
	}
}

function getAtribuicoes(atribuicao) {
	var constraintAtribuicao = DatasetFactory.createConstraint("ID_ATV", atribuicao, atribuicao, ConstraintType.MUST)
	var dtsAtribuicoes = DatasetFactory.getDataset("dts_consultaCadastroAtribuicoes", null, [constraintAtribuicao], null)
	if (dtsAtribuicoes.rowsCount > 0) {
		return dtsAtribuicoes.getValue(0, "hd_cod_user_atv")
	} else {
		return "Pool:Group:G5-APROVAR";
	}
}

function notificaFalha(textoMsg, destinatario) {
	var msg = '';
	msg += '<html>'
	msg += '	<head>'
	msg += '		<meta>'
	msg += '		<meta>'
	msg += '		<meta>'
	msg += '	</head>'
	msg += '	<body>'
	msg += '	<h2> Olá, ' + getValue("WKUser") + '</h2>';
	msg += '	<p> Ocorreu um erro na solicitação ' + String(getValue("WKNumProces")) + '</p>'
	msg += '	<p>' + textoMsg + '</p>'
	msg += '	</body>'
	msg += '</html>'
	var obj = new com.fluig.foundation.mail.service.EMailServiceBean();

	var assunto = String('ENGPAC - G5 - Fluig ' + String(getValue("WKNumProces")) + ' - Notificação de falha');
	var envido = obj.simpleEmail(1, assunto, "suportefluig@engpac.com.br", destinatario, msg, "text/html");
	return envido;
}