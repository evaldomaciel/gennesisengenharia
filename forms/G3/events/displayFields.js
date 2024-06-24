function displayFields(form,customHTML){ 
		
	// Fields
	var codcoligada = form.getValue("CodColigada"); 
	var idmov = form.getValue("IdMov");
	var idFluig = getValue('WKNumProces');
	var atividade = parseInt(getValue("WKNumState"));

	customHTML.append("<script>");
    customHTML.append("        function getWKNumState(){ return " + atividade + "};");
    customHTML.append("</script>");
	
	form.setValue("IdentificadorFluig", idFluig);
	
	var fields = new Array(codcoligada, idmov, idFluig);

	log.info("displayFields:"+ fields);

	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
}