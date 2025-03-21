/* ETAPA 000 | 004 - INICIO */
function calculaValorTotalPago() {
  var valorOriginal = parseFloat(
    $("#valor_original").val().replace(/\./g, "").replace(",", "."),
  );
  var valorJuros = parseFloat(
    $("#valor_juros").val().replace(/\./g, "").replace(",", "."),
  );

  var temValorOriginal = isNaN(valorOriginal) ? 0 : valorOriginal;
  var temValorJuros = isNaN(valorJuros) ? 0 : valorJuros;

  var valorTotal = temValorOriginal + temValorJuros;
  $("#Valor").val(valorTotal.toFixed(2).replace(".", ","));
  $("#valor_original_analise").val(valorTotal.toFixed(2).replace(".", ","));
}
function adicionaValorAnalise(valor) {
  $("#valor_original_analise").val(valor);
}

function calculaValorTotalPagoPu() {
  var valorOriginal = parseFloat(
    $("#valor_original_pu").val().replace(/\./g, "").replace(",", "."),
  );
  var valorJuros = parseFloat(
    $("#valor_juros_pu").val().replace(/\./g, "").replace(",", "."),
  );

  var temValorOriginal = isNaN(valorOriginal) ? 0 : valorOriginal;
  var temValorJuros = isNaN(valorJuros) ? 0 : valorJuros;

  var valorTotal = temValorOriginal + temValorJuros;
  $("#valor_pu").val(valorTotal.toFixed(2).replace(".", ","));
}

function adicionaCentroCustoRateio(ccusto) {
  let campo = $("#centro_de_custo").val();
  let valorDoCampo = campo[0];

  var tableBody = document
    .getElementById("table_rateio_ccusto")
    .getElementsByTagName("tbody")[0];

  var rows = tableBody.getElementsByTagName("tr");
  if (rows.length == 1) {
    acrescentarLinha();
    rows = tableBody.getElementsByTagName("tr");
  }

  for (let i = 1; i < rows.length; i++) {
    var colunaCcustoInput = rows[i].querySelector(
      `[name="coluna_ccusto___${i}"]`,
    );
    window[`${colunaCcustoInput.id}`].setValue(valorDoCampo);
    $(`#cc${i}`).text(ccusto["NOMECCUSTO"]);
  }
}

function adicionaFilialEmAnalise(filial) {
  let campo = $("#filial").val();
  let valorDoCampo = campo[0];
  console.log(valorDoCampo);
  console.log(filial);

  window["filial_analise"].value = filial;
}

function corDaUrgenciaSolicitacao(urgencia) {
  var inputField = $("#urgencia_solicitacao");
  if (urgencia == "Normal") {
    inputField.css("background-color", "#01DF01");
  }
  if (urgencia == "Urgente") {
    inputField.css("background-color", "#FFDD00");
  }
}

/* FORMATA A PORCENTAGEM DO RATEIO */
function formatPercentual(input) {
  const row = input.closest("tr");
  const percentualInput = row.querySelector('input[name^="coluna_percentual"]');

  if (percentualInput) {
    const percentualValue = input.value.replace(/\D/g, "");
    percentualInput.value = percentualValue + "%";
  }
}

function parseFormattedNumber(value) {
  if (!value) return 0;
  return parseFloat(value.replace(/\./g, "").replace(",", "."));
}

function atualizaValoresTabela() {
  $(".rateio-tabela").on("change", (e, i) => {
    let totalValue = parseFormattedNumber($('[name="Valor"]').val());
    let fieldName = String($(e.target).attr('name'));
    let field = String(fieldName).split("___");
    let fieldId = String(field[1]);
    let fieldFin = String(field[0]).indexOf("_fin") > 0 ? "_fin" : "";
    if (isNaN(totalValue) || totalValue === 0) return;
    if (fieldName.indexOf('coluna_valor') >= 0) {
      let valueField = parseFormattedNumber($(e.target).val());
      let percent = (valueField / totalValue) * 100;
      let completeFieldName = `[name="coluna_percentual${fieldFin}___${fieldId}"]`;
      $(completeFieldName).val(percent.toFixed(2) + "%");
      let tableName = $(completeFieldName).closest("table").attr("tablename");
      updateValorTotal(tableName);
    }
  });
}

function acrescentarLinha(tabela) {
  wdkAddChild(tabela);
  var inputs = $("[mask]");
  MaskEvent.initMask(inputs);
  updateValorTotal(tabela);
  if (tabela == 'table_rateio_ccusto') {
    filtraPorColigada($("#CODCOLIGADA").val());
    filtraNaturezaPorSetor();
  }
  if (tabela == 'table_rateio_ccusto_fin') {
    filtraCCPorColigadaFin($("#CODCOLIGADA").val());
    filtraNaturezaPorSetorFin();
  }
}

function deleteTableRow(row, tableName) {
  fnWdkRemoveChild(row);
  console.log(tableName);
  updateValorTotal(tableName);
}


/* CALCULA VALOR TOTAL DO RATEIO */
function updateValorTotal(tableName) {
  console.log(tableName)

  let fieldFin = String(tableName).indexOf("_fin") > 0 ? "_fin" : "";
  let total = 0;

  $(`input[name^="coluna_valor${fieldFin}"]`).each((i, e) => {
    let valor = parseValue(e.value);
    if (!isNaN(valor)) {
      total += valor;
    }
  });

  let formattedValue = formatValue(total);
  document.getElementById(`valor_total_rateio${fieldFin}`).value = formattedValue;

  let valorTotal = parseValue(document.getElementById("Valor").value);
  
  ///** desconsiderando valores menores que 1 centavo */
  total = (~~(total*100))/100

  if (!isNaN(valorTotal) && total > valorTotal) 
  {
    $(`#div_mensagem_valor_excedido${fieldFin}`).show(400);
  } else {
    $(`#div_mensagem_valor_excedido${fieldFin}`).hide(400);
  }
  getLinhasTabelaRateio();
}

function preencheNomeDoUF(value) {
  if (value == "AC") {
    $("#nome_estado").val("Acre");
  }
  if (value == "AL") {
    $("#nome_estado").val("Alagoas");
  }
  if (value == "AP") {
    $("#nome_estado").val("Amapá");
  }
  if (value == "AM") {
    $("#nome_estado").val("Amazonas");
  }
  if (value == "BA") {
    $("#nome_estado").val("Bahia");
  }
  if (value == "CE") {
    $("#nome_estado").val("Ceará");
  }
  if (value == "DF") {
    $("#nome_estado").val("Distrito Federal");
  }
  if (value == "ES") {
    $("#nome_estado").val("Espírito Santo");
  }
  if (value == "GO") {
    $("#nome_estado").val("Goiás");
  }
  if (value == "MA") {
    $("#nome_estado").val("Maranhão");
  }
  if (value == "MT") {
    $("#nome_estado").val("Mato Grosso");
  }
  if (value == "MS") {
    $("#nome_estado").val("Mato Grosso do Sul");
  }
  if (value == "MG") {
    $("#nome_estado").val("Minas Gerais");
  }
  if (value == "PA") {
    $("#nome_estado").val("Pará");
  }
  if (value == "PB") {
    $("#nome_estado").val("Paraíba");
  }
  if (value == "PR") {
    $("#nome_estado").val("Paraná");
  }
  if (value == "PE") {
    $("#nome_estado").val("Pernambuco");
  }
  if (value == "PI") {
    $("#nome_estado").val("Piauí");
  }
  if (value == "RJ") {
    $("#nome_estado").val("Rio de Janeiro");
  }
  if (value == "RN") {
    $("#nome_estado").val("Rio Grande do Norte");
  }
  if (value == "RS") {
    $("#nome_estado").val("Rio Grande do Sul");
  }
  if (value == "RO") {
    $("#nome_estado").val("Rondônia");
  }
  if (value == "RR") {
    $("#nome_estado").val("Roraima");
  }
  if (value == "SC") {
    $("#nome_estado").val("Santa Catarina");
  }
  if (value == "SP") {
    $("#nome_estado").val("São Paulo");
  }
  if (value == "SE") {
    $("#nome_estado").val("Sergipe");
  }
  if (value == "TO") {
    $("#nome_estado").val("Tocantins");
  }
}

function adicionaIdPais(pais) {
  if (pais == "Brasil") {
    $("#id_pais").val(1);
  }
}

/* CONVERTE UM CAMPO DATA PRA TIMESTAMP ISO 8601 */
function getTimestamp(data) {
  console.log(data);
  const [day, month, year] = data.split("/");
  const formattedDate = `${year}-${month}-${day}T00:00:00Z`;

  const date = new Date(formattedDate);
  if (isNaN(date)) {
    throw new RangeError("Invalid Date");
  }
  const timestamp = date.toISOString();
  return timestamp;
}

function getDataVencimento(elemento, data) {
  const date = getTimestamp(data);
  $("#hidden_data_vencimento").val(date);
  getPrazoVencimento(elemento, date);
}

function getPrazoVencimento(elemento, data) {
  const dataVencimentoFormatado = data.split("/").reverse().join("-"); // Converte para o formato AAAA-MM-DD
  const dataVencimento = new Date(dataVencimentoFormatado);
  const dataAtual = new Date();
  const timestampAtual = dataAtual.toISOString();

  calculaHoraUtil(dataAtual, dataVencimento, "Default");
}

var expedienteGlobal;
var periodoInicialGlobal;
var periodoFinalGlobal;
var diaSemanaGlobal;
var feriadoGlobal;

function recebeDadosParaCalcularHoraUteis(
  expediente,
  periodoInicial,
  periodoFinal,
  diaSemana,
  feriado,
) {
  expedienteGlobal = expediente.split(",");
  periodoInicialGlobal = periodoInicial.split(",");
  periodoFinalGlobal = periodoFinal.split(",");
  diaSemanaGlobal = diaSemana.split(",");
  feriadoGlobal = feriado.split(",");
}

function calculaHoraUtil(dataHoraInicio, dataHoraFinal, expediente) {
  dataInicio = new Date(dataHoraInicio);
  dataFinal = new Date(dataHoraFinal);

  var totalHoras = 0;
  // Percorre o Dataset
  for (var i = 0; i < expedienteGlobal.length; i++) {
    if (expedienteGlobal[i] == expediente) {
      // Iterar sobre cada dia no intervalo
      for (
        var diaAtual = new Date(dataInicio.toDateString());
        diaAtual <= dataFinal;
        diaAtual.setDate(diaAtual.getDate() + 1)
      ) {
        // Formata a data atual para dd-mm-yyyy
        var date = new Date(diaAtual);
        var options = { day: "2-digit", month: "2-digit", year: "numeric" };
        var formattedDate = date
          .toLocaleDateString("pt-BR", options)
          .replace(/\//g, "-");

        // Verifica se o dia da semana corresponde e se não é feriado
        if (
          diaSemanaGlobal[i] == diaAtual.getDay() + 1 &&
          !feriadoGlobal.includes(formattedDate)
        ) {
          // Calcular as horas úteis
          var periodoInicio = new Date(
            converterHora(periodoInicialGlobal[i], diaAtual),
          );
          var periodoFim = new Date(
            converterHora(periodoFinalGlobal[i], diaAtual),
          );

          if (
            diaAtual.toDateString() === dataInicio.toDateString() &&
            dataInicio.toLocaleTimeString() >=
            converterHora(periodoInicialGlobal[i])
          ) {
            periodoInicio = new Date(dataInicio);
          }
          if (
            diaAtual.toDateString() === dataFinal.toDateString() &&
            dataFinal.toLocaleTimeString() <=
            converterHora(periodoFinalGlobal[i])
          ) {
            periodoFim = new Date(dataFinal);
          }

          if (periodoInicio <= periodoFim) {
            totalHoras += (periodoFim - periodoInicio) / (1000 * 60 * 60);
          }
        }
      }
    }
  }

  // Imprimir as horas úteis
  $("#nTask007").val(converterHora(totalHoras));
  $("#nTask097").val(converterHora(totalHoras));
  $("#nTask127").val(converterHora(totalHoras));
  $("#nTask128").val(converterHora(totalHoras));

  // Função para converter hora decimal para String ou Date formatados
  function converterHora(horaDecimal, date) {
    // Separar a parte inteira (horas)
    let horas = Math.floor(horaDecimal);

    // Calcular os minutos
    let minutosDecimal = (horaDecimal - horas) * 60;
    let minutos = Math.round(minutosDecimal);

    // Formatar as horas para sempre ter três dígitos
    let horasFormatadas =
      horas < 10 ? `00${horas}` : horas < 100 ? `0${horas}` : `${horas}`;

    // Formatar os minutos para sempre ter dois dígitos
    let minutosFormatados = minutos < 10 ? `0${minutos}` : `${minutos}`;

    // Retorna uma string ou um date com a data formatada
    if (date == null) {
      return `${horasFormatadas}:${minutosFormatados}`;
    } else {
      var data = new Date(date);
      data.setHours(horas);
      data.setMinutes(minutos);
      return data;
    }
  }
}

function tipoDaChavePixDadosPagamento(tipo_pix, chave) {
  console.log(chave);
  if (tipo_pix == 1) {
    $("#tipo_forn").text("Tipo: Telefone");
    $("#chave_forn").text("Chave: " + chave);
  }
  if (tipo_pix == 2) {
    $("#tipo_forn").text("Tipo: Email");
    $("#chave_forn").text("Chave: " + chave);
  }
  if (tipo_pix == 3) {
    $("#tipo_forn").text("Tipo: CPF");
    $("#chave_forn").text("Chave: " + chave);
  }
  if (tipo_pix == 4) {
    $("#tipo_forn").text("Tipo: CNPJ");
    $("#chave_forn").text("Chave: " + chave);
  }
  if (tipo_pix == 5) {
    $("#tipo_forn").text("Tipo: Aleatória");
    $("#chave_forn").text("Chave: " + chave);
  }
}

function salvaCGCCFO(valor) {
  $("#CGCCFO").val(valor);
}