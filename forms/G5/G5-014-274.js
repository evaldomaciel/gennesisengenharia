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

  ///** desconsiderando valores menores que 1 centavo */
  total = (~~(total*100))/100

  if (!isNaN(valorTotal) && total > valorTotal) {
    $("#div_mensagem_valor_excedido_fin").show(400);
  } else {
    $("#div_mensagem_valor_excedido_fin").hide(400);
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