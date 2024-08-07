function enableFields(form) {
  var activity = getValue("WKNumState");
  var user = getValue("WKUser");
  var indexes = form.getChildrenIndexes("table_rateio_ccusto");
  var indexes_fin = form.getChildrenIndexes("table_rateio_ccusto_fin");

  if (user == "suporte.fluig" || user == "suporte2.fluig" || user != "admin") {
  }

  try {
    /* ETAPA 000 | 004 - INICIO */
    if (activity == 4 || activity == 0) {
      form.setEnabled("numero_solicitacao", false);
      form.setEnabled("numero_solicitacao_principal", false);
      form.setEnabled("solicitante", false);
    }


  } catch (error) {
    console.log("error");
  }
}