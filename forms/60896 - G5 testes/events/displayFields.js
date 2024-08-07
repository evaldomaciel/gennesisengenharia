function displayFields(form, customHTML) {

  var user = getValue("WKUser");

  /** Vamos acelerar o preenchimento do formulario na atividade inicial para testes */
  // if ((user == "fluig" || user == "4ef20412-7687-40a4-b1c8-095c0a92503e") && form.getFormMode() == "ADD") {
  //   var datasetDs_G5 = DatasetFactory.getDataset('ds_G5', null, new Array(
  //     DatasetFactory.createConstraint('documentid', '60915', '60915', ConstraintType.MUST)
  //   ), null);

  //   var colunas = datasetDs_G5.getColumnsName();
  //   for (let index = 0; index < colunas.length; index++) {
  //     let campo = colunas[index];
  //     let valor = datasetDs_G5.getValue(0, campo);
  //     form.setValue(campo, valor);
  //   }
  // }

  if (form.getFormMode() == "ADD") form.setValue("idLan", "-1");

  form.setVisibleById("div_cad_referencia", false);
  form.setVisibleById("div_cad_referencia_fin", false);
  form.setVisibleById("div_referencia_analise", false);

  var adminUser = false;
  var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
  var constraints = [c1];
  var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
  if (dataset.rowsCount > 0) {
    adminUser = dataset.getValue(0, 'adminUser');
  }

  /* PEGA DADOS DO EXPEDIENTE */
  var ps1 = DatasetFactory.getDataset("ds_period_exped", null, null, null);
  var ps2 = DatasetFactory.getDataset("globalCalendar", null, null, null);

  var expediente = new Array();
  var periodoInicial = new Array();
  var periodoFinal = new Array();
  var diaSemana = new Array();

  for (var i = 0; i < ps1.rowsCount; i++) {
    expediente.push(ps1.getValue(i, "COD_PERIOD_EXPED"));
    periodoInicial.push(ps1.getValue(i, "NUM_HORA_INIC_PERIOD") / 3600);
    periodoFinal.push(ps1.getValue(i, "NUM_HORA_FIM_PERIOD") / 3600);
    diaSemana.push(ps1.getValue(i, "NUM_DIA_PERIOD"));
  }

  var feriado = new Array();

  for (var i = 0; i < ps2.rowsCount; i++) {
    feriado.push(ps2.getValue(i, "dayFormatted"));
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
  customHTML.append("<script>");
  customHTML.append("recebeDadosParaCalcularHoraUteis('" + expediente + "','" + periodoInicial + "','" + periodoFinal + "','" + diaSemana + "','" + feriado + "')");
  customHTML.append("</script>");

  var corDeFundoAtiva = getConstante("Cor_Fundo_Ativa");
  var corDeFundoInativa = getConstante("Cor_Fundo_Inativa");
  var corDeFundoConsulta = getConstante("Cor_Fundo_Consulta");
  var numeroSolicitacao = getValue("WKNumProces");
  var activity = getValue("WKNumState");
  form.setValue("numero_solicitacao", numeroSolicitacao);
  var customAppend = "\n<script>";
  try {
  
    var idLan = parseInt(form.getValue("idLan"));
    if (idLan > 0) {
      form.setVisibleById("div_confirma_integracao", true);
      customHTML.append("\n<script> $('#idLanSucesso').text(" + idLan + "); </script>");
    }

    /** Negações */
    if (activity != 0 && activity != 4 && activity != 221 && activity != 216 && activity != 295 && activity != 223) {
      customHTML.append("\n<script> $('.table-rateio-ccusto-delete').hide(); </script>");
      customHTML.append("\n<script> $('.table-rateio-ccusto-fin-delete').hide(); </script>");
    }
  } catch (error) {
    log.info("Erro no G5: ", error);
    console.log("Erro:", error);
    customAppend += "\n\t " + String(error.lineNumber) + " - " + String(error.message);
  }
  customAppend += "\n</script>";
  customHTML.append(customAppend);
}

function getAtribuicoes(atribuicao) {
  var constraintAtribuicao = DatasetFactory.createConstraint("ID_ATV", atribuicao, atribuicao, ConstraintType.MUST)
  var dtsAtribuicoes = DatasetFactory.getDataset("ds_consultaCadastroAtribuicoes", null, [constraintAtribuicao], null)
  if (dtsAtribuicoes.rowsCount > 0) {
    return dtsAtribuicoes.getValue(0, "hd_cod_user_atv");
  } else {
    return ""
  }
}


function getConstante(cCriterio) {
  // Get Dataset para uma variavel;
  var aConstraint = [];
  aConstraint.push(DatasetFactory.createConstraint('id', cCriterio, cCriterio, ConstraintType.MUST));
  // aciona o dataset ds_Constante

  var oConstantes = DatasetFactory.getDataset('ds_Constantes', null, null, null);

  for (var i = 0; i < oConstantes.rowsCount; i++) {
    if (oConstantes.getValue(i, "id").trim() == cCriterio.trim()) {
      return oConstantes.getValue(i, "Valor").trim();
    }
  }
  return '0';
}


