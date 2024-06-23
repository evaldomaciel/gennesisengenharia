function afterProcessCreate(processId) {
	hAPI.setCardValue("IdentificadorFluig", processId)
	hAPI.setCardValue("StatusFluig", "Aberta");

	//var usuarioNotific = getAtribuicao();
	
	//log.info( "log.info( usuarioNotific );" );
	//log.info( usuarioNotific );

	/**
	 * Chama função para notificação
	 */
	//usersNotification( usuarioNotific );

	

	var atribuicao = getAtribuicao();

	if(atribuicao == ""){
		hAPI.setCardValue("encerraLoopNotifi", "true");
	}else{
		hAPI.setCardValue("encerraLoopNotifi", "false");
	}

	hAPI.setCardValue("cTask039", atribuicao)

	
}

function getAtribuicao(){
	var codcoligada = hAPI.getCardValue("CodColigada");
	var filial = hAPI.getCardValue("filial").split(' - ')[0];

	var desc = "G4_NOTIFICA-" + codcoligada + "-" + filial
	var userNotify = "";

	var cst = [DatasetFactory.createConstraint("txt_iden_atividade", desc, desc, ConstraintType.MUST)]
	var dtsAtribuicao = DatasetFactory.getDataset("ds_consultaCadastroAtribuicoes", null, cst, null)

	if(dtsAtribuicao.rowsCount > 0){
		var userNotify = String( dtsAtribuicao.getValue(0, "hd_cod_user_atv") );
	}

	return userNotify
}

