function servicetask176(attempt, message) {
  var userId = getValue("WKUser");
  hAPI.setCardValue("cTask007", getAtribuicoes("G5-007")); 
	hAPI.setCardValue("cTask012", getAtribuicoes("G5-012")); 
	hAPI.setCardValue("cTask014", getAtribuicoes("G5-014"));
	hAPI.setCardValue("cTask034", userId);
	hAPI.setCardValue("cTask097", getAtribuicoes("G5-097"));
	hAPI.setCardValue("cTask127", getAtribuicoes("G5-127"));
	hAPI.setCardValue("cTask128", getAtribuicoes("G5-128"));
	hAPI.setCardValue("cTask216", getAtribuicoes("G5-216"));
	hAPI.setCardValue("cTask221", getAtribuicoes("G5-221"));
	hAPI.setCardValue("cTask223", getAtribuicoes("G5-223"));
	hAPI.setCardValue("cTask274", getAtribuicoes("G5-274"));
	hAPI.setCardValue("cTask295", getAtribuicoes("G5-295"));
  
}

function getAtribuicoes(atribuicao)
{
    var constraintAtribuicao = DatasetFactory.createConstraint("ID_ATV",atribuicao, atribuicao, ConstraintType.MUST)
    var dtsAtribuicoes = DatasetFactory.getDataset("dts_consultaCadastroAtribuicoes", null, [constraintAtribuicao], null) 
    if (dtsAtribuicoes.rowsCount > 0) 
    {
        return dtsAtribuicoes.getValue(0, "hd_cod_user_atv")
    } else {
        return ""
    }
}
