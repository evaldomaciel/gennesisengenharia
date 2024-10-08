/* FUNÇÕES GLOBAIS */
$(document).ready(function () {
  autocompleteBanco();
  displayBtnFiles();

  $('[type="button"]').on('click', e => {
    formatDate();
  });
  formatDate();

  /* COPIA DATA DE VENCIMENTO PARA AS OUTRAS ETAPAS */
  $("#data_vencimento").on("change", function () {
    var valorData = $(this).val();
    $("#data_vencimento_analise").val(valorData);
    $("#data_vencimento_av").val(valorData);
    $("#DATA_FIM").val(valorData);
  });

  /* PREENCHE COLIGADA COM 0 QUANDO FOR GLOBAL */
  $('#cliente_global').change(function () {
    if ($(this).is(':checked')) {
      $('#hidden_coligada_cli_for').val('0');
    } else {
      $('#hidden_coligada_cli_for').val($("#CODCOLIGADA").val());
    }
  });

  /* PREENCHE COLIGADA COM 0 QUANDO FOR GLOBAL */
  $('#cliente_global_fin').change(function () {
    if ($(this).is(':checked')) {
      $('#hidden_coligada_cli_for').val('0');
    } else {
      $('#hidden_coligada_cli_for').val($("#CODCOLIGADA").val());
    }
  });

  /* COPIA O TELEFONE PARA UM CAMPO HIDDEN PARA A INTEGRAÇÃO */
  $("#telefone").on("change", function () {
    var telefoneFormatado = $(this).val();

    var telefoneLimpo = telefoneFormatado.replace(/\D/g, "");

    $("#hidden_telefone").val(telefoneLimpo);
  });

  /* COPIA O VALOR ORIGINAL PARA UM CAMPO HIDDEN PARA A INTEGRAÇÃO */
  $("#valor_original_analise").on("change", function () {
    // Obtém o valor digitado no campo
    var ValorOriFormatado = $(this).val();

    // Remove todos os caracteres não numéricos (exceto ponto e vírgula, que são os separadores)
    var ValorOriLimpo = ValorOriFormatado.replace(/[^\d.,]/g, "");

    // Remove todos os pontos, exceto o último, e substitui a vírgula por ponto
    ValorOriLimpo = ValorOriLimpo.replace(/\./g, "").replace(/,/, ".");

    // Converte para um formato numérico
    var valorNumerico = parseFloat(ValorOriLimpo);

    // Define o valor limpo no campo hidden (ou onde desejar)
    $("#hidden_valor_original").val(valorNumerico);
  });

  /* COPIA O VALOR BAIXADO PARA UM CAMPO HIDDEN PARA A INTEGRAÇÃO */
  $("#valor_baixado_analise").on("change", function () {
    // Obtém o valor digitado no campo
    var ValorBaixadoFormatado = $(this).val();

    // Remove todos os caracteres não numéricos (exceto ponto e vírgula, que são os separadores)
    var ValorBaixadoLimpo = ValorBaixadoFormatado.replace(/[^\d.,]/g, "");

    // Remove todos os pontos, exceto o último, e substitui a vírgula por ponto
    ValorBaixadoLimpo = ValorBaixadoLimpo.replace(/\./g, "").replace(/,/, ".");

    // Converte para um formato numérico
    var valorNumerico = parseFloat(ValorBaixadoLimpo);

    // Define o valor limpo no campo hidden (ou onde desejar)
    $("#hidden_valor_baixado").val(valorNumerico);
  });

  /* COPIA O VALOR DE CAPITALIZAÇÃO PARA UM CAMPO HIDDEN PARA A INTEGRAÇÃO */
  $("#capitalizacao_analise").on("change", function () {
    // Obtém o valor digitado no campo
    var CapFormatado = $(this).val();

    // Remove todos os caracteres não numéricos (exceto ponto e vírgula, que são os separadores)
    var CapLimpo = CapFormatado.replace(/[^\d.,]/g, "");

    // Remove todos os pontos, exceto o último, e substitui a vírgula por ponto
    CapLimpo = CapLimpo.replace(/\./g, "").replace(/,/, ".");

    // Converte para um formato numérico
    var valorNumerico = parseFloat(CapLimpo);

    // Define o valor limpo no campo hidden (ou onde desejar)
    $("#hidden_valor_cap").val(valorNumerico);
  });

  /* COPIA O VALOR DE JUROS PARA UM CAMPO HIDDEN PARA A INTEGRAÇÃO */
  $("#juros_analise").on("change", function () {
    // Obtém o valor digitado no campo
    var JurosFormatado = $(this).val();

    // Remove todos os caracteres não numéricos (exceto ponto e vírgula, que são os separadores)
    var JurosLimpo = JurosFormatado.replace(/[^\d.,]/g, "");

    // Remove todos os pontos, exceto o último, e substitui a vírgula por ponto
    JurosLimpo = JurosLimpo.replace(/\./g, "").replace(/,/, ".");

    // Converte para um formato numérico
    var valorNumerico = parseFloat(JurosLimpo);

    // Define o valor limpo no campo hidden (ou onde desejar)
    $("#hidden_valor_juros").val(valorNumerico);
  });

  /* COPIA O VALOR DE DESCONTO PARA UM CAMPO HIDDEN PARA A INTEGRAÇÃO */
  $("#desconto_analise").on("change", function () {
    // Obtém o valor digitado no campo
    var DescontoFormatado = $(this).val();

    // Remove todos os caracteres não numéricos (exceto ponto e vírgula, que são os separadores)
    var DescontoLimpo = DescontoFormatado.replace(/[^\d.,]/g, "");

    // Remove todos os pontos, exceto o último, e substitui a vírgula por ponto
    DescontoLimpo = DescontoLimpo.replace(/\./g, "").replace(/,/, ".");

    // Converte para um formato numérico
    var valorNumerico = parseFloat(DescontoLimpo);

    // Define o valor limpo no campo hidden (ou onde desejar)
    $("#hidden_valor_desconto").val(valorNumerico);
  });

  /* COPIA O VALOR DE MULTA PARA UM CAMPO HIDDEN PARA A INTEGRAÇÃO */
  $("#multa_analise").on("change", function () {
    // Obtém o valor digitado no campo
    var MultaFormatado = $(this).val();

    // Remove todos os caracteres não numéricos (exceto ponto e vírgula, que são os separadores)
    var MultaLimpo = MultaFormatado.replace(/[^\d.,]/g, "");

    // Remove todos os pontos, exceto o último, e substitui a vírgula por ponto
    MultaLimpo = MultaLimpo.replace(/\./g, "").replace(/,/, ".");

    // Converte para um formato numérico
    var valorNumerico = parseFloat(MultaLimpo);

    // Define o valor limpo no campo hidden (ou onde desejar)
    $("#hidden_valor_multa").val(valorNumerico);
  });

  /* COPIA O VALOR CARENCIA DE JUROS PARA UM CAMPO HIDDEN PARA A INTEGRAÇÃO */
  $("#carencia_juros_analise").on("change", function () {
    // Obtém o valor digitado no campo
    var CarenciaFormatado = $(this).val();

    // Remove todos os caracteres não numéricos (exceto ponto e vírgula, que são os separadores)
    var CarenciaLimpo = CarenciaFormatado.replace(/[^\d.,]/g, "");

    // Remove todos os pontos, exceto o último, e substitui a vírgula por ponto
    CarenciaLimpo = CarenciaLimpo.replace(/\./g, "").replace(/,/, ".");

    // Converte para um formato numérico
    var valorNumerico = parseFloat(CarenciaLimpo);

    // Define o valor limpo no campo hidden (ou onde desejar)
    $("#hidden_valor_carencia").val(valorNumerico);
  });

  function applyMask(field) {
    let value = field.val().replace(/\D/g, '');
    let formattedValue = '';
    console.log(field.attr('name'), value.length);
    if (value.length > 11) formattedValue = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    else formattedValue = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
    field.val(formattedValue);
  }

  $('.cpfCnpj').on('blur focus', function (e) {
    applyMask($(e.target));
  });

  $("#sigla_estado_fin").on("change", function () {
    // Obtém o valor digitado no campo
    var valor = $(this).val();
    preencheNomeDoUF(valor);
  });

  window["tipo_moeda"].value = "R$";

  $("#cfo_forn_analise").text($("#hidden_codigo_cli_for").val());

  reloadZoomAfterLoad(true);
  atualizaValoresTabela();
  toggleCadastroFornecedor(formGetValue('fornecedor_cadastrado'));
  toggleCampoPorTipo(formGetValue('categoria'));
  toggleCampoDadosPgmt(formGetValue('hidden_dados_pgmt'), formGetValue('tipo_chave_pix'), formGetValue('chave_pix_padrao'));
  toggleMotivoCancelGestor(formGetValue('aprovacao_gestor'));
  toggleMotivoCancelDiretoria(formGetValue('aprovacao_diretoria'));
  toggleCamposDePagamentoPu(formGetValue('pagamento_realizado_pu'), $("#numAtividadeAtual").val());
  toggleCamposJurosPu(formGetValue('teve_juros_pu'));
  toggleCamposDePagamentoPp(formGetValue('pagamento_realizado_pp'))
  toggleCamposJurosPp(formGetValue('teve_juros_pp'))
  toggleMotivoPedidoAjustes(formGetValue('dados_conformidade'))
  toggleCampoChavePix(formGetValue('tipo_chave_pix'))
  toggleCampoChavePixFin(formGetValue('tipo_chave_pix'))


  /** Preenche o valor das labels de "vincula fornecedor" */
  if ($("[name='nome']").val() != "") $("[id='nome_forn_analise']").text($("[name='nome']").val());
  if ($("[name='hidden_codigo_cli_for']").val() != "") $("[id='cfo_forn_analise']").text($("[name='hidden_codigo_cli_for']").val());
  if ($("[name='hidden_cnpj_fornecedor']").val() != "") {
    $("[id='cnpj_forn_analise']").text($("[name='hidden_cnpj_fornecedor']").val());
    $("[id='CpfCnpj_analise']").val($("[name='hidden_cnpj_fornecedor']").val());
  }
});

/** Aqui acaba o ready */

function formatDate() {
  $("[data-date]").each((i, e) => {
    var id = $(e).attr("id");
    FLUIGC.calendar("#" + id);
    if ($("#" + id).attr("readonly")) {
      $("#" + id).data('DateTimePicker').disable();
    }
  });
}

function parseValue(value) {
  return parseFloat(value.replace(/\./g, "").replace(",", "."));
}

function formatValue(value) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/* ADICIONA UM CAMPO HIDDEN COM A CONTAGEM DE LINHAS DO RATEIO PRA USO NO BEFORESTATEENTRY */
function getLinhasTabelaRateio() {
  var tableBody = document
    .getElementById("table_rateio_ccusto_fin")
    .getElementsByTagName("tbody")[0];
  var rows = tableBody.getElementsByTagName("tr");
  var qntdLinhas = rows.length;
  $("#hidden_qntd_linhas").val(qntdLinhas);
}
