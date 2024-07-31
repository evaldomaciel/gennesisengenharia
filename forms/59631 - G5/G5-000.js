/* FUNÇÕES GLOBAIS */
$(document).ready(function () {
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
    }
  });

  /* PREENCHE COLIGADA COM 0 QUANDO FOR GLOBAL */
  $('#cliente_global_fin').change(function () {
    if ($(this).is(':checked')) {
      $('#hidden_coligada_cli_for').val('0');
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

  /* Mascara CPF/CNPJ */
  $("#CpfCnpj_favorecido").keydown(function () {
    try {
      $("#CpfCnpj_favorecido").unmask();
    } catch (e) { }

    var tamanho = $("#CpfCnpj_favorecido").val().length;

    if (tamanho < 11) {
      $("#CpfCnpj_favorecido").mask("999.999.999-99");
    } else {
      $("#CpfCnpj_favorecido").mask("99.999.999/9999-99");
    }

    // ajustando foco
    var elem = this;
    setTimeout(function () {
      // mudo a posição do seletor
      elem.selectionStart = elem.selectionEnd = 10000;
    }, 0);
    // reaplico o valor para mudar o foco
    var currentValue = $(this).val();
    $(this).val("");
    $(this).val(currentValue);
  });

  // Mascara CPF/CNPJ
  $("#CpfCnpj_analise").keydown(function () {
    try {
      $("#CpfCnpj_analise").unmask();
    } catch (e) { }

    var tamanho = $("#CpfCnpj_analise").val().length;

    if (tamanho < 11) {
      $("#CpfCnpj_analise").mask("999.999.999-99");
    } else {
      $("#CpfCnpj_analise").mask("99.999.999/9999-99");
    }

    // ajustando foco
    var elem = this;
    setTimeout(function () {
      // mudo a posição do seletor
      elem.selectionStart = elem.selectionEnd = 10000;
    }, 0);
    // reaplico o valor para mudar o foco
    var currentValue = $(this).val();
    $(this).val("");
    $(this).val(currentValue);
  });

  // Mascara CPF/CNPJ
  $("#CpfCnpj_participante").keydown(function () {
    try {
      $("#CpfCnpj_participante").unmask();
    } catch (e) { }

    var tamanho = $("#CpfCnpj_participante").val().length;

    if (tamanho < 11) {
      $("#CpfCnpj_participante").mask("999.999.999-99");
    } else {
      $("#CpfCnpj_participante").mask("99.999.999/9999-99");
    }

    // ajustando foco
    var elem = this;
    setTimeout(function () {
      // mudo a posição do seletor
      elem.selectionStart = elem.selectionEnd = 10000;
    }, 0);
    // reaplico o valor para mudar o foco
    var currentValue = $(this).val();
    $(this).val("");
    $(this).val(currentValue);
  });


  $("#sigla_estado_fin").on("change", function () {
    // Obtém o valor digitado no campo
    var valor = $(this).val();
    preencheNomeDoUF(valor);
  });

  window["tipo_moeda"].value = "R$";

  reloadZoomFilterValues("dados_pagamento_analise", `CGC,${$("#hidden_cnpj_fornecedor").val()},COLIGADA,${$("#coligada").val()}`);

  ;

  reloadZoomAfterLoad(true);

});
/**
 * Recarrega o campos do tipo zoom, após verificar que o load da pagina foi completado com sucesso.
 * @param {boolean} loaded 
 * @param {Number} count 
 */
function reloadZoomAfterLoad(loaded, count) {
  count = count == undefined ? 0 : count + 1;
  console.log(`loaded: ${loaded} - count: ${count} `);
  if (loaded == true) {
    if (count >= 100) {
      console.log("Nenhum zoom foi carregado");
    }
    else if (empresa.close != undefined || coligada.close != undefined || vincular_fornecedor.close != undefined || forma_pagamento.close != undefined || zTask007.close != undefined) {
      reloadZoomAfterLoad(false);
      filtraNaturezaPorSetor();
      filtraNaturezaPorSetorFin();
    }
    else {
      setTimeout(() => {
        reloadZoomAfterLoad(true, count);
      }, 3);
    }
  }
}

/** Aqui acaba o ready */
function setSelectedZoomItem(selectedItem) {
  var FIELD = selectedItem.inputId;

  /* ATRIBUIÇÕES */
  if (FIELD == "zTask004") {
    $("#cTask004").val(selectedItem["colleagueId"]);
  }
  if (FIELD == "zTask007") {
    $("#cTask007").val(selectedItem["colleagueId"]);
  }
  if (FIELD == "zTask012") {
    $("#cTask012").val(selectedItem["colleagueId"]);
  }
  if (FIELD == "zTask014") {
    $("#cTask014").val(selectedItem["colleagueId"]);
  }
  if (FIELD == "zTask034") {
    $("#cTask034").val(selectedItem["colleagueId"]);
  }
  if (FIELD == "zTask097") {
    $("#cTask097").val(selectedItem["colleagueId"]);
  }
  if (FIELD == "zTask127") {
    $("#cTask127").val(selectedItem["colleagueId"]);
  }
  if (FIELD == "zTask128") {
    $("#cTask128").val(selectedItem["colleagueId"]);
  }
  if (FIELD == "zTask216") {
    $("#cTask216").val(selectedItem["colleagueId"]);
  }
  if (FIELD == "zTask223") {
    $("#cTask223").val(selectedItem["colleagueId"]);
  }
  if (FIELD == "setor_solicitante") {
    filtraNaturezaPorSetor();
    filtraNaturezaPorSetorFin();
    filtraNaturezaPorSetorDa();
  }
  if (FIELD == "centro_de_custo") {
    $("#hidden_filial_cc").val(selectedItem["CODFILIAL"]);
    window["filial"].value = selectedItem["CODFILIAL"];
    window["filial_analise"].value = selectedItem["CODFILIAL"];
    $("#nome_ccusto").val(selectedItem["NOMECCUSTO"]);
    adicionaCentroCustoRateio(selectedItem);
  }
  if (FIELD == "conta_caixa_analise") {
    $("#nome_conta_analise").val(selectedItem["DESCRICAO"]);
    $("#hidden_numbanco").val(selectedItem["DESCRICAO"]);
  }
  if (FIELD == "coligada") {
    filtraPorColigada(selectedItem["ID"]);
  }
  if (FIELD == "ccusto_analise") {
    $("#nome_ccusto_analise").val(selectedItem["NOMECCUSTO"]);
  }
  if (FIELD == "dados_pagamento") {
    let campo = $("#dados_pagamento").val();
    let valorDoCampo = campo[0];
    window["dados_pagamento_analise"].setValue(valorDoCampo);
    $("#hidden_dados_pgmt").val(selectedItem["DESCRICAO"]);
    tipoDaChavePixDadosPagamento(selectedItem["TIPOPIX"], selectedItem["CHAVE"]);
    toggleCodBoleto($("#hidden_dados_pgmt").val());
  }
  if (FIELD == "dados_pagamento_analise") {
    $("#hidden_dados_pgmt").val(selectedItem["DESCRICAO"]);
    tipoDaChavePixDadosPagamentoFin(selectedItem["TIPOPIX"], selectedItem["CHAVE"]);
    toggleCodBoleto(selectedItem["DESCRICAO"]);
  }
  if (FIELD.indexOf("coluna_ccusto") > -1) {
    var seq = FIELD.split("___");
    $("#cc" + seq[1]).val(selectedItem["NOMECCUSTO"]);
    console.log(selectedItem);
  }
  if (FIELD == "filial_analise") {
    $("#nome_filial_analise").val(selectedItem["NOME"]);
  }
  if (FIELD == "filial_d_bancarios") {
    $("#nome_filial_d_bancarios").val(selectedItem["NOME"]);
    $("#nome_filial_d_bancarios_fin").val(selectedItem["NOME"]);
    window["filial_d_bancarios_fin"].setValue(selectedItem["CODFILIAL"]);
  }
  if (FIELD == "filial_default") {
    $("#nome_filial_default").val(selectedItem["NOME"]);
    $("#nome_filial_default_fin").val(selectedItem["NOME"]);
    window["filial_default_fin"].setValue(selectedItem["CODFILIAL"]);
  }
  if (FIELD == "forma_pagamento") {
    $("#hidden_desc_fpgmto").val(selectedItem["Nome"]);
    $("#hidden_forma_pgmto").val(selectedItem["Valor"]);
  }
  if (FIELD == "forma_pagamento_fin") {
    $("#hidden_desc_fpgmto").val(selectedItem["Nome"]);
    $("#hidden_forma_pgmto").val(selectedItem["Valor"]);
  }
  if (FIELD == "tipo_cliente_forn") {
    $("#nome_cliente_forn").val(selectedItem["Nome"]);
    window["tipo_cliente_forn_fin"].setValue(selectedItem["Tipo"]);
    $("#nome_cliente_forn_fin").val(selectedItem["Nome"]);
  }
  if (FIELD == "tipo_documento_analise") {
    $("#nome_tipo_documento").val(selectedItem["Nome"]);
  }
  if (FIELD == "vincular_fornecedor") {
    let campo = $("#vincular_fornecedor").val();
    let valorDoCampo = campo[0];
    reloadZoomFilterValues("dados_pagamento", `CGC,${selectedItem["CGCCFO"]},COLIGADA,${$("#coligada").val()}`);

    window["vincular_fornecedor_analise"].setValue(valorDoCampo);
    $("#nome_forn").text(selectedItem["NOME"]);
    $("#nome_cli_fornecedor_analise").val(selectedItem["NOME"]);
    $("#cnpj_forn").text(selectedItem["CGCCFO"]);
    $("#CpfCnpj_analise").text(selectedItem["CGCCFO"]);
    $("#hidden_cnpj_fornecedor").val(selectedItem["CGCCFO"]);
    $("#hidden_coligada_cli_for").val(selectedItem["CODCOLIGADA"]);
    $("#hidden_codigo_cli_for").val(selectedItem["CODCFO"]);
    $("#nome_social_fin").val(selectedItem["NOMEFANTASIA"]);
    $("#nome_fin").val(selectedItem["NOME"]);
    $("#CNPJ_fin").val(selectedItem["CGCCFO"]);
    $("#CpfCnpj_analise").val(selectedItem["CGCCFO"]);
    $("#tipo_rua_fin").val(selectedItem["TIPORUA"]);
    $("#rua_fin").val(selectedItem["RUA"]);
    $("#numero_fin").val(selectedItem["NUMERO"]);
    $("#tipo_bairro_fin").val(selectedItem["TIPOBAIRRO"]);
    $("#bairro_fin").val(selectedItem["BAIRRO"]);
    $("#municipio_fin").val(selectedItem["CIDADE"]);
    $("#sigla_estado_fin").val(selectedItem["CODETD"]);
    preencheNomeDoUFFin(selectedItem["CODETD"]);
    $("#CEP_fin").val(selectedItem["CEP"]);
    $("#telefone_fin").val(selectedItem["TELEFONE"]);
    $("#email_fin").val(selectedItem["EMAIL"]);
    $("#contato_fin").val(selectedItem["CONTATO"]);
    $("#status_tipo_cliente_fin").val(selectedItem["ATIVO"]);
    $("#codigo_municipio_fin").val(selectedItem["CODMUNICIPIO"]);
    if (selectedItem["PESSOAFISOUJUR"] == "F") {
      $('input[name="categoria_fin"][value="F"]').prop('checked', true);
    } else {
      $('input[name="categoria_fin"][value="J"]').prop('checked', true);
    }
    $("#id_pais_fin").val(selectedItem["IDPAIS"]);
    $("#pais_fin").val(selectedItem["PAIS"]);
    $("#nacionalidade_fin").val(selectedItem["NACIONALIDADE"]);
    $("#numero_dependentes_fin").val(selectedItem["NUMDEPENDENTES"]);
    $("#caixa_postal_fin").val(selectedItem["CAIXAPOSTAL"]);
    $("#cad_referencia_fin").val(selectedItem["IDCFO"]); // Ref.
    $("#aposen_pensionista_fin").val(selectedItem["APOSENTADOOUPENSIONISTA"]);
  }
  if (FIELD == "vincular_fornecedor_analise") {
    reloadZoomFilterValues("dados_pagamento_analise", `CGC,${selectedItem["CGCCFO"]},COLIGADA,${$("#coligada").val()}`);
    $("#nome_cli_fornecedor_analise").text(selectedItem["NOME"]);
    $("#hidden_codigo_cli_for").val(selectedItem["CODCFO"]);
    $("#hidden_coligada_cli_for").val(selectedItem["CODCOLIGADA"]);
    $("#hidden_cnpj_fornecedor").val(selectedItem["CGCCFO"]);
    $("#nome_forn_analise").text(selectedItem["NOME"]);
    $("#cnpj_forn_analise").text(selectedItem["CGCCFO"]);
  }
}

function setZoomData(instance, value) {
  window[instance].setValue(value);
}

function removedZoomItem(removedItem) {
  /* ATRIBUIÇÕES */
  if (removedItem.inputId == "zTask004") {
    $("#cTask004").val("");
  }
  if (removedItem.inputId == "zTask007") {
    $("#cTask007").val("");
  }
  if (removedItem.inputId == "zTask012") {
    $("#cTask012").val("");
  }
  if (removedItem.inputId == "zTask014") {
    $("#cTask014").val("");
  }
  if (removedItem.inputId == "zTask034") {
    $("#cTask034").val("");
  }
  if (removedItem.inputId == "zTask097") {
    $("#cTask097").val("");
  }
  if (removedItem.inputId == "zTask127") {
    $("#cTask127").val("");
  }
  if (removedItem.inputId == "zTask128") {
    $("#cTask128").val("");
  }
  if (removedItem.inputId == "setor_solicitante") {
    limpaFiltroNaturezaPorSetor();
    limpaFiltroNaturezaPorSetorFin();
    limpaFiltroNaturezaPorSetorDa();
  }
  if (removedItem.inputId == "vincular_fornecedor") {
    reloadZoomFilterValues("dados_pagamento");
    $("#hidden_codigo_cli_for").val("");
    $("#nome_forn").text("");
    $("#cnpj_forn").text("");
  }
  if (removedItem.inputId == "vincular_fornecedor_analise") {
    $("#hidden_codigo_cli_for").val("");
  }
  if (removedItem.inputId == "centro_de_custo") {
    $("#hidden_filial_cc").val("");
    $("#filial").val("");
  }
  if (removedItem.inputId == "coligada") {
    limpaFiltroColigada();
  }
  if (removedItem.inputId == "dados_pagamento") {
    $("#tipo_forn").text("");
    $("#chave_forn").text("");
  }
  if (removedItem.inputId == "dados_pagamento_analise") {
    $("#tipo_forn_analise").text("");
    $("#chave_forn_analise").text("");
    toggleCodBoleto("");
  }
}

function setFilterZoom() { }

function formataCpfCnpj(valor) {
  var value = valor.replace(/[^\d]/g, ""); // Remove caracteres não numéricos
  var formattedValue = "";

  if (value.length <= 11) {
    // Se tiver até 11 dígitos, é considerado CPF
    formattedValue = formattedValue.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4",
    ); // Formata para CPF
  } else {
    // Se tiver mais de 11 dígitos, é considerado CNPJ
    formattedValue = formattedValue.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5",
    ); // Formata para CNPJ
  }

  $("#CpfCnpj").val(formattedValue);
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
