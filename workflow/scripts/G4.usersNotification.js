function usersNotification(usuarioNotific) {
	logTexto(" <--> USER NOTIFICATION <--> ")
	/** Verifica se é grupo ou usuário */
	//if (usuarioNotific.indexOf("Pool:Group:") != -1) {
	/**
	 * É grupo, busca o grupo e seta primeiro usuário como responsável 
	 * depois faz o loop para buscar outros usuários
	 */
	/** Seta os usuários do grupo já carregados no formulário na variável */
	//var usersGroup = String(hAPI.getCardValue("cTask039UsersGroup"));
	//logTexto("usersGroup " + usersGroup)
	/** Busca o grupo se não informado */
	//var arrUsersGroup = ""

	//if (usersGroup == "") {
	/** Seta Grupo na variável */
	//	var codGroup = usuarioNotific.split("Pool:Group:")[1];
	//	logTexto("codGroup " + codGroup)
	/** Seta o grupo no campo */
	//	hAPI.setCardValue("cTask039Group", usuarioNotific);
	//	logTexto("usuarioNotific " + usuarioNotific)
	/** Seta Usuários do Grupo */
	//	arrUsersGroup = getUsersGroup(codGroup);
	//} else {
	//	/** Seta Usuários do Grupo */
	///	arrUsersGroup = usersGroup.split(',');
	//}

	//logTexto("arrUsersGroup " + arrUsersGroup)


	/** Seta primeiro Usuário a Notificar */
	//var userNotify = arrUsersGroup[0];
	//logTexto("userNotify " + userNotify)
	/** Seta o primeiro usuário como responsável */
	//hAPI.setCardValue("cTask039", userNotify);
	/** Tira o usuário setado da lista de grupos */



	//var newUsersGroup = [];
	//for (var i = 0; i < arrUsersGroup.length; i++) {
	//	if (arrUsersGroup[i] != userNotify) {
	//		newUsersGroup.push(arrUsersGroup[i]);
	//	}
	//}


	//logTexto("newUsersGroup.join(',') " + newUsersGroup.join(','))
	/** Seta o novo grupo de usuários */
	//hAPI.setCardValue("cTask039UsersGroup", newUsersGroup.join(','));


	/*

	var listaUsr = hAPI.getCardValue("cTask039UsersGroup")
	var arrUsersGroup = listaUsr.split(";")
	var usuarioAnterior = hAPI.getCardValue("cTask039")

	if (arrUsersGroup.length > 0) {
		if (usuarioAnterior == "admin" || usuarioAnterior == "4ef20412-7687-40a4-b1c8-095c0a92503e") {
			
			if(arrUsersGroup[0] == usuarioAnterior){
				hAPI.setCardValue("encerraLoopNotifi", "true");
			}else{
				hAPI.setCardValue("cTask039", arrUsersGroup[0]);
			}
		} else {
			for (var i = 0; i < arrUsersGroup.length; i++) {
				logTexto("COMPARACAO == " + arrUsersGroup[i] + "  " + usuarioAnterior)
				if (arrUsersGroup[i] == usuarioAnterior) {
					logTexto("POSICAO I " + i + " ARRLENGTH == " + arrUsersGroup.length)
					if ((arrUsersGroup.length - 1) != i) {
						logTexto("SETOU MO MALA")
						hAPI.setCardValue("cTask039", arrUsersGroup[i + 1]);
						//hAPI.setCardValue("cTask039UsersGroup", arrUsersGroup[i + 1]);
					} else {
						logTexto("SETOU ULTIMA POSICAO")
						hAPI.setCardValue("encerraLoopNotifi", "true");
						hAPI.setCardValue("cTask039", arrUsersGroup[0]);
					}

					break
				}
			}
		}
	} else {
		hAPI.setCardValue("cTask039", "");
	}
	//}*/





	var atribuicao = getAtribuicao();

	if(atribuicao == ""){
		hAPI.setCardValue("encerraLoopNotifi", "true");
	}else{
		hAPI.setCardValue("encerraLoopNotifi", "false");
	}

	hAPI.setCardValue("cTask039", atribuicao)

}




function getAtribuicao() {
	var codcoligada = hAPI.getCardValue("CodColigada");
	var filial = hAPI.getCardValue("filial").split(' - ')[0];

	var desc = "G4_NOTIFICA-" + codcoligada + "-" + filial
	var userNotify = "";

	var cst = [DatasetFactory.createConstraint("txt_iden_atividade", desc, desc, ConstraintType.MUST)]
	var dtsAtribuicao = DatasetFactory.getDataset("ds_consultaCadastroAtribuicoes", null, cst, null)

	if (dtsAtribuicao.rowsCount > 0) {
		var userNotify = String(dtsAtribuicao.getValue(0, "hd_cod_user_atv"));
	}

	return userNotify
}
/*
function getUsersGroup(group) {
	/** Recebe o grupo e pega o grupo sem o prefixo "Pool:Group:" 
	var cst = [DatasetFactory.createConstraint("colleagueGroupPK.groupId", group, group, ConstraintType.MUST)]
	var dtsGroup = DatasetFactory.getDataset("colleagueGroup", null, cst, null)
	var usersGroup = [];

	if (dtsGroup.rowsCount > 0) {
		/** Faz o loop para alimentar os usuários do grupo 
		for (var i = 0; i < dtsGroup.rowsCount; i++) {
			usersGroup.push(String(dtsGroup.getValue(i, "colleagueGroupPK.colleagueId")));
		}
	}
	logTexto("userGroup.join(',') " + usersGroup.join(","))
	return usersGroup

}*/






function logTexto(texto) {
	log.info(texto)
}