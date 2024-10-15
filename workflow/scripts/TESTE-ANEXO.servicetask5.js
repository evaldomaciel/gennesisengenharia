function servicetask5(attempt, message) {
	/**
	  * Criada pasta "Anexos Jurídico" na raiz do GED com o ID 13590 ou 467649
	  * HMG: gennesisengenharia160517 - pasta : 61248
	  * PRD: gennesisengenharia160516 - pasta : 88200
	  */

	try {
		var pageService = fluigAPI.getPageService();
		var urlDoServidor = String(pageService.getServerURL());
		var pastaPai = urlDoServidor.indexOf('gennesisengenharia160516') >= 0 ? 88200 : 61248;
		var nomeSubPasta = "G5-" + String(getValue("WKNumProces"));
		// var pastaCriada = criaPasta(pastaPai, nomeSubPasta);
		var pastaCriada = criaPasta(62647, nomeSubPasta);
		// var listaDeDocumento = publicarGED(62647);
		var listaDeDocumento = publicarGED(pastaCriada);
		// hAPI.setCardValue("anexos", String(listaDeDocumento.join(",")))
		return true;
	} catch (error) {
		throw error;
	}
}