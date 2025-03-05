function servicetask30(attempt, message) {
	hAPI.setCardValue("cTask015", getValue("WKUser"));
	hAPI.setCardValue("cTask016", getAtribuicoes("G7-016"));
	hAPI.setCardValue("cTask021", getAtribuicoes("G7-021"));
	hAPI.setCardValue("cTask029", getAtribuicoes("G7-029"));

	hAPI.setCardValue("nTask015", get_Constante("G7-015-SLA"));
	hAPI.setCardValue("nTask021", get_Constante("G7-021-SLA"));
	hAPI.setCardValue("nTask029", get_Constante("G7-029-SLA"));

	try {
		var Service = ServiceManager.getService('ECMWorkflowEngineService');
		var serviceHelper = Service.getBean();
		//var serviceLocator = serviceHelper.instantiate('classe.locator');
	} catch (error) {
		log.error(error);
		throw error;
	}
}

function getAtribuicoes(atribuicao) {
	var constraintAtribuicao = DatasetFactory.createConstraint(
		"ID_ATV",
		atribuicao,
		atribuicao,
		ConstraintType.MUST
	);
	var dtsAtribuicoes = DatasetFactory.getDataset(
		"dts_consultaCadastroAtribuicoes",
		null,
		[constraintAtribuicao],
		null
	);
	if (dtsAtribuicoes.rowsCount > 0) {
		return dtsAtribuicoes.getValue(0, "hd_cod_user_atv");
	} else {
		return "";
	}
}

///**** GET PARA CONTANTES
///**** PARAMETROS cCriterio
function get_Constante(cCriterio) {
	/// Get Dataset para uma variavel;
	var aConstraint = [];
	aConstraint.push(DatasetFactory.createConstraint('id', cCriterio, cCriterio, ConstraintType.MUST));
	/// aciona o dataset ds_Constante
	var oConstantes = DatasetFactory.getDataset('ds_Constantes', null, null, null);

	for (var i = 0; i < oConstantes.values.length; i++) {
		if (oConstantes.values[i][0].trim() == cCriterio.trim()) {
			return oConstantes.values[i][1];
		}
	}
	return '0';
}