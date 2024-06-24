function beforeStateEntry(sequenceId){
	var usuario = fluigAPI.getUserService().getCurrent().getFullName(); //Nome do Usuario
	
	try{		
		if (sequenceId == 66) { //Aprovação da Engenharia
			CarregaXML("Inicio", "Aprovado pelo Gestor de Compras", usuario, "PEND");
		}else if (sequenceId == 2){
			if(decisionMaker()){
				CarregaXML("Outro", "Aprovado pela Estoque", usuario, "PEND");
			}else if(!(decisionMaker)){
				CarregaXML("Inicio", "Aprovado pelo Gestor de Compras", usuario, "PEND");
			}
		}else if (sequenceId == 4) { //Aprovação da Dir.
			if (hAPI.getCardValue("tipoMovimento") == "1.1.27" || hAPI.getCardValue("tipoMovimento") == "1.1.21") {
				CarregaXML("Inicio", "Aprovado pelo Gestor de Compras", usuario, "PEND");
			} else if (hAPI.getCardValue("tipoMovimento") == "1.1.26" || hAPI.getCardValue("tipoMovimento") == "1.1.20") {
				CarregaXML("Outro", "Aprovado pela Engenharia", usuario, "PEND");
			}
		} else if (sequenceId == 10) { //FIM
			CarregaXML("Outro", "Aprovado pela Diretoria", usuario, "A");
			G4.start();
		}
	}catch(e){
		throw "beforeStateEntry" + e;
	}
}