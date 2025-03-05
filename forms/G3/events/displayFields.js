function displayFields(form,customHTML){ 
		
	var codcoligada = form.getValue("CodColigada"); 
	var idmov = form.getValue("IdMov");
	var idFluig = getValue('WKNumProces');
	var atividade = parseInt(getValue("WKNumState"));
	var MOBILE = form.getMobile();
	var MODE = form.getFormMode();
	var customJS = "<script>";
	var tabelaX = form.getChildrenIndexes("dependentes");

	var INICIO = 1;
    var ANEXOMAPADECOTACAO = 82;
	
	form.setValue("IdentificadorFluig", idFluig);
	
	var fields = new Array(codcoligada, idmov, idFluig);

	log.info("displayFields:"+ fields);

	form.setShowDisabledFields(true);
	form.setHidePrintLink(false);

	if(MODE == "ADD"){
		
		/**
		 * Os campos que armazenam as descrições dos anexos, deverão ter seus valores setados no modo ADD caso estejam bloqueados pelo enableFields em ADD.
		 * Caso contrário, terão seus valores zerados e as funções para anexos não funcionarão como esperado.
	     * Isso não se aplica as tabelas pai e filho, pois a descrição do anexo é gravada no campo mo momento em que é adicionada uam nova linha
		 */  
	
		form.setValue("fdRegistroNascDep", "Registro de anexo");
		
	}
	
	
	 /**
	  * No modo de visualização, irá remove o botão que adiciona uma nova linha na tabela pai e filho e a td que fica a lixeira de cada linha
	  */ 
	if(MODE == "VIEW"){
		customJS += "$('.btnAddNewRow').remove();";
		customJS += "$('.tdDeleteRow').remove();";


	} else if(MODE == "MOD"){
       
	} 
	
	/**
	 * Remove o botão de upload/delete da tabela pai e filho com o uso da função invisibleBtnUpload
	 * Remove também o botão da lixeira e o botão de adicionar uma nova linha
	 */
    
	if((atividade != ANEXOMAPADECOTACAO) && (MODE == "MOD")){

		if (tabelaX == null || tabelaX.length == 0){
            
			if (valorEmBranco(form.getValue("fdRegistroNascDep"))){
				form.setVisibleById('Documentacao',false);
			} 
		}

        var totalDependentes = form.getChildrenIndexes("dependentes");
		for (var i = 0; i < totalDependentes.length; i++) {
			var inputId = "fnRegistroNascDep___" + totalDependentes[i]
			customJS += "invisibleBtnUpload('" + inputId +"');";
		}
        customJS += "$('.btnAddNewRow').remove();";
		customJS += "$('.tdDeleteRow').remove();";

	} else if((MODE == "ADD")){

        var totalDependentes = form.getChildrenIndexes("dependentes");
		for (var i = 0; i < totalDependentes.length; i++) {
			var inputId = "fnRegistroNascDep___" + totalDependentes[i]
			customJS += "invisibleBtnUpload('" + inputId +"');";
		}
	} 
	customJS += "function getAtividade(){ return '" + atividade + "'};";
	customJS += "function getMode(){ return '" + MODE + "'};";
	customJS += "function getMobile(){ return " + MOBILE + "};";
	customJS += "displayBtnFiles();";
	customJS += "tableLineCount();";
	customJS += "</script>"
    customHTML.append(customJS)

}

function valorEmBranco(value) {
    return (value == null || value == undefined || value.trim() == "");
}