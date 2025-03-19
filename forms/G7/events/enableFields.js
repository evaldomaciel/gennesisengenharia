function enableFields(form) {
  var activity = getValue("WKNumState");
  var user = getValue("WKUser");

  try {
    if (user == "suporte.fluig" || user == "suporte2.fluig" || user != "admin") {
    }

    form.setEnabled("processo_origem", false);
    form.setEnabled("solicitacao_origem", false);
    form.setEnabled("id_titulo", false);
    form.setEnabled("id_fornecedor", false);
    form.setEnabled("data_vencimento", false);
    form.setEnabled("data_pagamento", false);
    form.setEnabled("valor_titulo", false);
    form.setEnabled("codigo_autenticacao", false);
    form.setEnabled("cancelado", false);
    form.setEnabled("forma_de_pagamento", false);

    if (activity == 15) {
      form.setEnabled("processo_origem", true);
      form.setEnabled("solicitacao_origem", true);
      form.setEnabled("cancelado", true);
    }

  } catch (error) {
    log.info("error");
  }
}