/* FUNÇÕES ETAPA 014 - PROVISIONAMENTO */

function filtraPorColigadaDa(coligada) {
  var tableBody = document
    .getElementById("table_dados_adicionais")
    .getElementsByTagName("tbody")[0];

  var rows = tableBody.getElementsByTagName("tr");
  if (rows.length == 1) {
    acrescentarLinhaFin();
    rows = tableBody.getElementsByTagName("tr");
  }

  if (coligada == "" || coligada == null) {
    for (let i = 1; i < rows.length; i++) {
      var colunaCcustoInput = rows[i].querySelector(`[name="coluna_ccusto_da___${i}"]`);
      reloadZoomFilterValues(colunaCcustoInput.id);
    }
  } else {
    reloadZoomFilterValues("vincular_fornecedor_analise", `CODCOLIGADA,${coligada}`);
    for (let i = 1; i < rows.length; i++) {
      var colunaCcustoInput = rows[i].querySelector(`[name="coluna_ccusto_da___${i}"]`);
      reloadZoomFilterValues(colunaCcustoInput.id, `CODCOLIGADA,${coligada}`);
    }
  }
}

/* PREENCHE O CAMPO PORCENTAGEM DA TABELA RATEIO POR CENTRO DE CUSTO BASEADO NO VALOR TOTAL A SER PAGO */
function updatePercentualDa(input) {
  const valorTotalInput = document.getElementById("valor_original_analise");
  const valorTotal = parseFormattedNumber(valorTotalInput.value);

  getValorTotalDa();

  if (isNaN(valorTotal) || valorTotal === 0) return;

  const valor = parseFormattedNumber(input.value);
  const percentual = (valor / valorTotal) * 100;

  const row = input.closest("tr");
  const percentualInput = row.querySelector('input[name^="coluna_percentual_da"]');

  if (percentualInput) {
    percentualInput.value = percentual.toFixed(2) + "%";
  }
}

/* FORMATA A PORCENTAGEM DO RATEIO */
function formatPercentualDa(input) {
  const row = input.closest("tr");
  const percentualInput = row.querySelector('input[name^="coluna_percentual_da"]');

  if (percentualInput) {
    const percentualValue = input.value.replace(/\D/g, "");
    percentualInput.value = percentualValue + "%";
  }
}

/* CALCULA VALOR TOTAL DO RATEIO */
function getValorTotalDa() {
  const tableRows = document.querySelectorAll('table[tablename="table_dados_adicionais"] tbody tr');
  let total = 0;

  tableRows.forEach((row) => {
    const valorInput = row.querySelector('input[name^="coluna_valor_da"]');
    if (valorInput && valorInput.value !== "") {
      const valor = parseValue(valorInput.value);
      if (!isNaN(valor)) {
        total += valor;
      }
    }
  });

  const formattedValue = formatValue(total);
  document.getElementById("valor_total_rateio_da").value = formattedValue;

  const valorTotal = parseValue(document.getElementById("valor_original_analise").value);

  if (!isNaN(valorTotal) && total > valorTotal) {
    $("#div_mensagem_valor_excedido_da").show(400);
  } else {
    $("#div_mensagem_valor_excedido_da").hide(400);
  }
}

function filtraNaturezaPorSetorDa() {
  let campo = $("#setor_solicitante").val();
  let valorDoCampo = campo[0];
  console.log(valorDoCampo);

  var tableBody = document
    .getElementById("table_dados_adicionais")
    .getElementsByTagName("tbody")[0];

  var rows = tableBody.getElementsByTagName("tr");
  if (rows.length == 1) {
    acrescentarLinhaDa();
    rows = tableBody.getElementsByTagName("tr");
  }
  for (let i = 1; i < rows.length; i++) {
    var colunaNaturezaInput = rows[i].querySelector(`[name="coluna_natureza_da___${i}"]`);

    if (colunaNaturezaInput) {
      $(colunaNaturezaInput).val(null).trigger("change");
      reloadZoomFilterValues(`${colunaNaturezaInput.id}`, "SETOR," + valorDoCampo);
    }
  }
  return true;
}

function limpaFiltroNaturezaPorSetorDa() {
  var tableBody = document
    .getElementById("table_dados_adicionais")
    .getElementsByTagName("tbody")[0];

  var rows = tableBody.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    var colunaNaturezaInput = rows[i].querySelector(`[name="coluna_natureza_da___${i}"]`);

    if (colunaNaturezaInput) {
      $(colunaNaturezaInput).val(null).trigger("change");

      if (
        window[`coluna_natureza_da___${i}`] &&
        window[`coluna_natureza_da___${i}`].element
      ) {
        reloadZoomFilterValues(`coluna_natureza_da___${i}`);
      }
    }
  }
}

function toggleMotivoPedidoAjustes(respostaProvisionamento) {
  if (
    respostaProvisionamento == "Nao" ||
    respostaProvisionamento == "Cancelar"
  ) {
    $("#div_provisionamento_revisao").show(400);
    $("#div_analise_vinculo_fornecedor").hide(400);
  } else {
    $("#div_provisionamento_revisao").hide(400);
    $("#div_analise_vinculo_fornecedor").show(400);
  }
}

function getDataEmissao(data) {
  const date = getTimestamp(data);
  $("#hidden_data_emissao").val(date);
}

function getDataBaixa(data) {
  const date = getTimestamp(data);
  $("#hidden_data_baixa").val(date);
}

function getDataPrevBaixa(data) {
  const date = getTimestamp(data);
  $("#hidden_data_previabaixa").val(date);
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

/* FUNÇÕES ETAPA 127 - PAGAMENTO ÚNICO */

function toggleCamposDePagamentoPu(pagamentoRealizado) {
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
}

function toggleCamposJurosPu(teveJuros) {
  if (teveJuros == "Sim") {
    $("#div_valor_original_pu").show(400);
    $("#div_valor_juros_pu").show(400);
    $("#valor_pu").prop("readonly", true);
  } else {
    $("#div_valor_original_pu").hide(400);
    $("#div_valor_juros_pu").hide(400);
    $("#valor_pu").prop("readonly", false);
  }
}


/* FUNÇÕES ETAPA 128 - PAGAMENTO PARCIAL */
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

/* 274 - CADASTRO DE FORNECEDOR */

function preencheNomeDoUFFin(value) {
  if (value == "AC") {
    $("#nome_estado_fin").val("Acre");
  }
  if (value == "AL") {
    $("#nome_estado_fin").val("Alagoas");
  }
  if (value == "AP") {
    $("#nome_estado_fin").val("Amapá");
  }
  if (value == "AM") {
    $("#nome_estado_fin").val("Amazonas");
  }
  if (value == "BA") {
    $("#nome_estado_fin").val("Bahia");
  }
  if (value == "CE") {
    $("#nome_estado_fin").val("Ceará");
  }
  if (value == "DF") {
    $("#nome_estado_fin").val("Distrito Federal");
  }
  if (value == "ES") {
    $("#nome_estado_fin").val("Espírito Santo");
  }
  if (value == "GO") {
    $("#nome_estado_fin").val("Goiás");
  }
  if (value == "MA") {
    $("#nome_estado_fin").val("Maranhão");
  }
  if (value == "MT") {
    $("#nome_estado_fin").val("Mato Grosso");
  }
  if (value == "MS") {
    $("#nome_estado_fin").val("Mato Grosso do Sul");
  }
  if (value == "MG") {
    $("#nome_estado_fin").val("Minas Gerais");
  }
  if (value == "PA") {
    $("#nome_estado_fin").val("Pará");
  }
  if (value == "PB") {
    $("#nome_estado_fin").val("Paraíba");
  }
  if (value == "PR") {
    $("#nome_estado_fin").val("Paraná");
  }
  if (value == "PE") {
    $("#nome_estado_fin").val("Pernambuco");
  }
  if (value == "PI") {
    $("#nome_estado_fin").val("Piauí");
  }
  if (value == "RJ") {
    $("#nome_estado_fin").val("Rio de Janeiro");
  }
  if (value == "RN") {
    $("#nome_estado_fin").val("Rio Grande do Norte");
  }
  if (value == "RS") {
    $("#nome_estado_fin").val("Rio Grande do Sul");
  }
  if (value == "RO") {
    $("#nome_estado_fin").val("Rondônia");
  }
  if (value == "RR") {
    $("#nome_estado_fin").val("Roraima");
  }
  if (value == "SC") {
    $("#nome_estado_fin").val("Santa Catarina");
  }
  if (value == "SP") {
    $("#nome_estado_fin").val("São Paulo");
  }
  if (value == "SE") {
    $("#nome_estado_fin").val("Sergipe");
  }
  if (value == "TO") {
    $("#nome_estado_fin").val("Tocantins");
  }
}

function filtraPorColigadaFin(coligada) {
  var tableBody = document
    .getElementById("table_rateio_ccusto_fin")
    .getElementsByTagName("tbody")[0];

  var rows = tableBody.getElementsByTagName("tr");
  if (rows.length == 1) {
    acrescentarLinhaFin();
    rows = tableBody.getElementsByTagName("tr");
  }

  if (coligada == "" || coligada == null) {
    for (let i = 1; i < rows.length; i++) {
      var colunaCcustoInput = rows[i].querySelector(`[name="coluna_ccusto_fin___${i}"]`);
      reloadZoomFilterValues(colunaCcustoInput.id);
    }
  } else {
    reloadZoomFilterValues("vincular_fornecedor_analise", `CODCOLIGADA,${coligada}`);
    for (let i = 1; i < rows.length; i++) {
      var colunaCcustoInput = rows[i].querySelector(`[name="coluna_ccusto_fin___${i}"]`);
      reloadZoomFilterValues(colunaCcustoInput.id, `CODCOLIGADA,${coligada}`);
    }
  }
}

/* PREENCHE O CAMPO PORCENTAGEM DA TABELA RATEIO POR CENTRO DE CUSTO BASEADO NO VALOR TOTAL A SER PAGO */
function updatePercentualFin(input) {
  const valorTotalInput = document.getElementById("Valor_fin");
  const valorTotal = parseFormattedNumber(valorTotalInput.value);

  getValorTotalFin();

  if (isNaN(valorTotal) || valorTotal === 0) return;

  const valor = parseFormattedNumber(input.value);
  const percentual = (valor / valorTotal) * 100;

  const row = input.closest("tr");
  const percentualInput = row.querySelector('input[name^="coluna_percentual_fin"]');

  if (percentualInput) {
    percentualInput.value = percentual.toFixed(2) + "%";
  }
}

/* CALCULA VALOR TOTAL DO RATEIO */
function getValorTotalFin() {
  const tableRows = document.querySelectorAll('table[tablename="table_rateio_ccusto_fin"] tbody tr');
  let total = 0;

  tableRows.forEach((row) => {
    const valorInput = row.querySelector('input[name^="coluna_valor_fin"]');
    if (valorInput && valorInput.value !== "") {
      const valor = parseValue(valorInput.value);
      if (!isNaN(valor)) {
        total += valor;
      }
    }
  });

  const formattedValue = formatValue(total);
  document.getElementById("valor_total_rateio_fin").value = formattedValue;

  const valorTotal = parseValue(document.getElementById("Valor_fin").value);

  if (!isNaN(valorTotal) && total > valorTotal) {
    $("#div_mensagem_valor_excedido_fin").show(400);
  } else {
    $("#div_mensagem_valor_excedido_fin").hide(400);
  }
}

function filtraNaturezaPorSetorFin() {
  let valorDoCampo = String($("#setor_solicitante").val());
  $(`[name^="coluna_natureza_fin___"]`).each((i, e) => {
    if (e.type == 'hidden') return;
    reloadZoomFilterValues(e.name, `SETOR,${valorDoCampo}`);
  });
  return true;
}

function limpaFiltroNaturezaPorSetorFin() {
  var tableBody = document
    .getElementById("table_rateio_ccusto_fin")
    .getElementsByTagName("tbody")[0];

  var rows = tableBody.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    var colunaNaturezaInput = rows[i].querySelector(
      `[name="coluna_natureza_fin___${i}"]`,
    );

    if (colunaNaturezaInput) {
      $(colunaNaturezaInput).val(null).trigger("change");

      if (
        window[`coluna_natureza_fin___${i}`] &&
        window[`coluna_natureza_fin___${i}`].element
      ) {
        reloadZoomFilterValues(`coluna_natureza_fin___${i}`);
      }
    }
  }
}

function tipoDaChavePixDadosPagamentoFin(tipo_pix, chave) {
  console.log(chave);
  if (tipo_pix == 1) {
    $("#tipo_forn_analise").text("Tipo: Telefone");
    $("#chave_forn_analise").text("Chave: " + chave);
  }
  if (tipo_pix == 2) {
    $("#tipo_forn_analise").text("Tipo: Email");
    $("#chave_forn_analise").text("Chave: " + chave);
  }
  if (tipo_pix == 3) {
    $("#tipo_forn_analise").text("Tipo: CPF");
    $("#chave_forn_analise").text("Chave: " + chave);
  }
  if (tipo_pix == 4) {
    $("#tipo_forn_analise").text("Tipo: CNPJ");
    $("#chave_forn_analise").text("Chave: " + chave);
  }
  if (tipo_pix == 5) {
    $("#tipo_forn_analise").text("Tipo: Aleatória");
    $("#chave_forn_analise").text("Chave: " + chave);
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

