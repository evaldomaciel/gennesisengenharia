function displayFields(form,customHTML){
	var user = getValue("WKUser");
	
    var adminUser = false;
    var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
    var constraints = [c1];
    var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);

    if ( dataset.rowsCount > 0 ){
        adminUser = dataset.getValue(0, 'adminUser');
    }

	customHTML.append("<script>function getWKNumState(){ return " + getValue("WKNumState") + "; }</script>");
	customHTML.append("<script>function getNumProces(){ return " + getValue("WKNumProces") + "; }</script>");
	customHTML.append("<script>function getWKNextState(){ return " + getValue("WKNextState") + "; }</script>");
	customHTML.append("<script>function getWKCardId(){ return " + getValue("WKCardId") + "; }</script>");
	customHTML.append("<script>function getAdmin(){ return " + adminUser + "; }</script>");
	customHTML.append("<script>var FORM_MODE = '" + form.getFormMode() + "'</script>");
	customHTML.append("<script>");
	customHTML.append("function getMode(){ return '" + form.getFormMode() + "'};");
	customHTML.append("</script>");

	var codcoligada = form.getValue("CodColigada"); 
	var idmov = form.getValue("IdMov");
	var idFluig = getValue('WKNumProces');

	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
}