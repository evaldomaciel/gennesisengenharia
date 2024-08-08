function toggleCamposJuros(teveJuros) {
  if (teveJuros == "Sim") {
    $("#div_teveJuros").show(400);
    $("#Valor").prop("readonly", true);
  } else {
    $("#div_teveJuros").hide(400);
    $("#Valor").prop("readonly", false);
    $("#Valor").val("");
    $("#valor_original").val("");
    $("#valor_juros").val("");
  }
}

function toggleCadastroFornecedor(fornecedorCadastrado) {
  if (fornecedorCadastrado == "Sim") {
    $("#div_vincular_fornecedor").show(400);
    $("#div_dados_pagamento").show(400);
    $("#div_nome_cnpj_forn").show(400);
    $("#div_cadastrar_fornecedor").hide(400);
  }
  if (fornecedorCadastrado == "Não") {
    $("#div_vincular_fornecedor").hide(400);
    $("#div_dados_pagamento").hide(400);
    $("#div_nome_cnpj_forn").hide(400);
    $("#div_cadastrar_fornecedor").show(400);
  }
}

function toggleCampoPorTipo(tipoPessoa) {
  if (tipoPessoa == "F") {
    $("#div_cpf").show(400);
    $("#div_cnpj").hide(400);
    $("#div_data_nascimento").show(400);
    $("#div_estado_civil").show(400);
    $("#div_cpf_fin").show(400);
    $("#div_cnpj_fin").hide(400);
    $("#div_data_nascimento_fin").show(400);
    $("#div_estado_civil_fin").show(400);
  } else {
    $("#div_cpf").hide(400);
    $("#div_cnpj").show(400);
    $("#div_data_nascimento").hide(400);
    $("#div_estado_civil").hide(400);
    $("#div_cpf_fin").hide(400);
    $("#div_cnpj_fin").show(400);
    $("#div_data_nascimento_fin").hide(400);
    $("#div_estado_civil_fin").hide(400);
  }
}

function toggleSolicitacao() {
  $("#div_body_solicitacao").toggle(); // Alterna a exibição da div
  let btnText = $("#btn_hide_solicitacao").text();
  if (btnText === "Ocultar Solicitação") {
    $("#btn_hide_solicitacao").text("Exibir Solicitação");
  } else {
    $("#btn_hide_solicitacao").text("Ocultar Solicitação");
  }
}

function toggleDadosForn() {
  $("#div_body_dados_forn_fin").toggle(); // Alterna a exibição da div
  let btnText = $("#btn_hide_solicitacao_fin").text();
  if (btnText === "Ocultar Solicitação") {
    $("#btn_hide_solicitacao_fin").text("Exibir Solicitação");
  } else {
    $("#btn_hide_solicitacao_fin").text("Ocultar Solicitação");
  }
}

function toggleDadosBanc() {
  $("#div_body_dados_dfin").toggle(); // Alterna a exibição da div
  let btnText = $("#btn_hide_solicitacao_bfin").text();
  if (btnText === "Ocultar Solicitação") {
    $("#btn_hide_solicitacao_bfin").text("Exibir Solicitação");
  } else {
    $("#btn_hide_solicitacao_bfin").text("Ocultar Solicitação");
  }
}

function toggleRateioFin() {
  $("#div_body_rateio_fin").toggle(); // Alterna a exibição da div
  let btnText = $("#btn_hide_solicitacao_r_fin").text();
  if (btnText === "Ocultar Solicitação") {
    $("#btn_hide_solicitacao_r_fin").text("Exibir Solicitação");
  } else {
    $("#btn_hide_solicitacao_r_fin").text("Ocultar Solicitação");
  }
}

function toggleCampoDadosPgmt(desc, tipoPix, chave) {
  if (desc == "BOLETO") {
    $("#div_cod_boleto").show(400);
    $("#div_chave_tipo_forn").hide(400);
    toggleCodBoleto($("#hidden_dados_pgmt").val());
  }
  else if (desc == "PIX") {
    $("#div_cod_boleto").hide(400);
    $("#div_chave_tipo_forn").show(400);
    tipoDaChavePixDadosPagamento(tipoPix, chave);
  } else {
    $("#div_cod_boleto").hide(400);
    $("#div_chave_tipo_forn").hide(400);
  }
}

function toggleMotivoPedidoAjustes(respostaProvisionamento) {
  if (respostaProvisionamento == "Sim") {
    $("#div_provisionamento_revisao").hide(400);
    $("#div_analise_vinculo_fornecedor").show(400);
  } else {
    $("#div_provisionamento_revisao").show(400);
    $("#div_analise_vinculo_fornecedor").hide(400);
  }
}

function toggleCampoChavePix(tipoChavePix) {
  if (tipoChavePix == "") {
    $("#div_chave_CPF").hide(400);
    $("#div_chave_cnpj").hide(400);
    $("#div_chave_email").hide(400);
    $("#div_chave_celular").hide(400);
    $("#div_chave_aleatoria").hide(400);
  }
  if (tipoChavePix == "3") {
    $("#div_chave_CPF").show(400);
    $("#div_chave_cnpj").hide(400);
    $("#div_chave_email").hide(400);
    $("#div_chave_celular").hide(400);
    $("#div_chave_aleatoria").hide(400);
  }
  if (tipoChavePix == "4") {
    $("#div_chave_CPF").hide(400);
    $("#div_chave_cnpj").show(400);
    $("#div_chave_email").hide(400);
    $("#div_chave_celular").hide(400);
    $("#div_chave_aleatoria").hide(400);
  }
  if (tipoChavePix == "2") {
    $("#div_chave_CPF").hide(400);
    $("#div_chave_cnpj").hide(400);
    $("#div_chave_email").show(400);
    $("#div_chave_celular").hide(400);
    $("#div_chave_aleatoria").hide(400);
  }
  if (tipoChavePix == "1") {
    $("#div_chave_CPF").hide(400);
    $("#div_chave_cnpj").hide(400);
    $("#div_chave_email").hide(400);
    $("#div_chave_celular").show(400);
    $("#div_chave_aleatoria").hide(400);
  }
  if (tipoChavePix == "5") {
    $("#div_chave_CPF").hide(400);
    $("#div_chave_cnpj").hide(400);
    $("#div_chave_email").hide(400);
    $("#div_chave_celular").hide(400);
    $("#div_chave_aleatoria").show(400);
  }
}

function toggleCampoChavePixFin(tipoChavePix) {
  if (tipoChavePix == "") {
    $("#div_chave_CPF_fin").hide(400);
    $("#div_chave_cnpj_fin").hide(400);
    $("#div_chave_email_fin").hide(400);
    $("#div_chave_celular_fin").hide(400);
    $("#div_chave_aleatoria_fin").hide(400);
  }
  if (tipoChavePix == "3") {
    $("#div_chave_CPF_fin").show(400);
    $("#div_chave_cnpj_fin").hide(400);
    $("#div_chave_email_fin").hide(400);
    $("#div_chave_celular_fin").hide(400);
    $("#div_chave_aleatoria_fin").hide(400);
  }
  if (tipoChavePix == "4") {
    $("#div_chave_CPF_fin").hide(400);
    $("#div_chave_cnpj_fin").show(400);
    $("#div_chave_email_fin").hide(400);
    $("#div_chave_celular_fin").hide(400);
    $("#div_chave_aleatoria_fin").hide(400);
  }
  if (tipoChavePix == "2") {
    $("#div_chave_CPF_fin").hide(400);
    $("#div_chave_cnpj_fin").hide(400);
    $("#div_chave_email_fin").show(400);
    $("#div_chave_celular_fin").hide(400);
    $("#div_chave_aleatoria_fin").hide(400);
  }
  if (tipoChavePix == "1") {
    $("#div_chave_CPF_fin").hide(400);
    $("#div_chave_cnpj_fin").hide(400);
    $("#div_chave_email_fin").hide(400);
    $("#div_chave_celular_fin").show(400);
    $("#div_chave_aleatoria_fin").hide(400);
  }
  if (tipoChavePix == "5") {
    $("#div_chave_CPF_fin").hide(400);
    $("#div_chave_cnpj_fin").hide(400);
    $("#div_chave_email_fin").hide(400);
    $("#div_chave_celular_fin").hide(400);
    $("#div_chave_aleatoria_fin").show(400);
  }
}

function toggleCamposDePagamentoPu(pagamentoRealizado) {
  console.log("toggleCamposDePagamentoPu -> " + pagamentoRealizado)
  if (pagamentoRealizado == "Sim") {
    $("#div_teve_juros_pu").show(400);
    $("#div_valor_pu").show(400);
    $("#div_data_pagamento").show(400);
  } else {
    $("#div_teve_juros_pu").hide(400);
    $("#div_valor_pu").hide(400);
    $("#div_data_pagamento").hide(400);
    $("#div_valor_original_pu").hide(400);
    $("#div_valor_juros_pu").hide(400);
  }
  return pagamentoRealizado
}

function toggleCamposJurosPu(teveJuros) {
  console.log("toggleCamposJurosPu -> " + teveJuros)
  if (teveJuros == "Sim") {
    $("#div_valor_original_pu").show(400);
    $("#div_valor_juros_pu").show(400);
    $("#valor_pu").prop("readonly", true);
  } else {
    $("#div_valor_original_pu").hide(400);
    $("#div_valor_juros_pu").hide(400);
    $("#valor_pu").prop("readonly", false);
  }
  return teveJuros
}

function toggleCamposDePagamentoPp(pagamentoRealizado) {
  if (pagamentoRealizado == "Sim") {
    $("#div_teve_juros_pp").show(400);
    $("#div_valor_inicial_pp").show(400);
    $("#div_data_pagamento").show(400);
    $("#div_data_pagamento_inicial").show(400);
    $("#div_valor_final_pp").show(400);
    $("#div_data_pagamento_final").show(400);
  } else {
    $("#div_teve_juros_pp").hide(400);
    $("#div_valor_inicial_pp").hide(400);
    $("#div_data_pagamento").hide(400);
    $("#div_data_pagamento_inicial").hide(400);
    $("#div_valor_final_pp").hide(400);
    $("#div_data_pagamento_final").hide(400);
    $("#div_valor_original_pp").hide(400);
    $("#div_valor_juros_pp").hide(400);
  }
}

function toggleCamposJurosPp(teveJuros) {
  if (teveJuros == "Sim") {
    $("#div_valor_original_pp").show(400);
    $("#div_valor_juros_pp").show(400);
    $("#valor_pp").prop("readonly", true);
  } else {
    $("#div_valor_original_pp").hide(400);
    $("#div_valor_juros_pp").hide(400);
    $("#valor_pp").prop("readonly", false);
  }
}

/* FUNÇÕES ETAPA 007 - APROVAÇÃO GESTOR */
function toggleMotivoCancelGestor(respostaGestor) {
  if (respostaGestor == "reprovado") {
    $("#div_motivo_cancel_gestor").show(400);
  } else {
    $("#div_motivo_cancel_gestor").hide(400);
  }
}

/* FUNÇÕES ETAPA 012 - APROVAÇÃO DIRETORIA */
function toggleMotivoCancelDiretoria(respostaDiretoria) {
  if (respostaDiretoria == "reprovado") {
    $("#div_motivo_cancel_diretoria").show(400);
  } else {
    $("#div_motivo_cancel_diretoria").hide(400);

  }
}

function toggleCodBoleto(valor) {
  if (valor == "BOLETO") {
    $("#div_cod_boleto_analise").show(400);
    $("#div_cod_boleto").show(400);
  } else {
    $("#div_cod_boleto_analise").hide(400);
    $("#div_cod_boleto").hide(400);
  }
}
