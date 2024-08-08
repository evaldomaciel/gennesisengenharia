function validaZoom(nomeDoCampo) {
  console.log({ "validaZoom": nomeDoCampo });
  if ($(`[name='${nomeDoCampo}']`).attr("type") == "zoom") return true;
  return false;
}

function setSelectedZoomItem(selectedItem) {
  console.log(selectedItem);
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
    $("#SETORSOLICITANTE").val(selectedItem["Nome"]);
    filtraNaturezaPorSetor();
    filtraNaturezaPorSetorFin();
    filtraNaturezaPorSetorDa();
  }
  if (FIELD == "centro_de_custo") {
    $("#hidden_filial_cc").val(selectedItem["CODFILIAL"]);
    $("#nome_ccusto").text(selectedItem["NOMECCUSTO"]);

    window["filial"].value = $("#hidden_filial_cc").val();
    window["CODFILIAL"].value = $("#hidden_filial_cc").val();
    window["filial_analise"].value = $("#hidden_filial_cc").val();
    adicionaCentroCustoRateio(selectedItem);
  }
  if (FIELD == "conta_caixa_analise") {
    $("#nome_conta_analise").val(selectedItem["DESCRICAO"]);
    $("#hidden_numbanco").val(selectedItem["DESCRICAO"]);
    validaContaCaixa(selectedItem["CODCXA"]);
  }
  if (FIELD == "coligada") {
    $("#CODCOLIGADA").val(selectedItem["ID"]);
    filtraPorColigada(selectedItem["ID"]);
    filtraTipoDeDocumentoPorColigada(selectedItem["ID"]);
    filtraContaCaixaPelaColigadaEFilial(selectedItem["ID"]);
  }
  if (FIELD == "ccusto_analise") {
    $("#nome_ccusto_analise").val(selectedItem["NOMECCUSTO"]);
  }
  if (FIELD == "dados_pagamento") {
    let campo = $("#dados_pagamento").val();
    let valorDoCampo = campo[0];
    window["dados_pagamento_analise"].setValue(valorDoCampo);
    $("#hidden_dados_pgmt").val(selectedItem["DESCRICAO"]);
    toggleCampoDadosPgmt(selectedItem);
  }
  if (FIELD == "dados_pagamento_analise") {
    $("#hidden_dados_pgmt").val(selectedItem["DESCRICAO"]);
    tipoDaChavePixDadosPagamentoFin(selectedItem["TIPOPIX"], selectedItem["CHAVE"]);
    toggleCodBoleto(selectedItem["DESCRICAO"]);
  }
  if (FIELD.indexOf("coluna_ccusto") > -1) {
    var seq = FIELD.split("___");
    $("#cc" + seq[1]).text(selectedItem["NOMECCUSTO"]);
    console.log(selectedItem["NOMECCUSTO"]);
  }
  if (FIELD == "filial_analise") {
    $("#nome_filial_analise").val(selectedItem["NOME"]);
    $("#CODFILIAL").val(selectedItem["CODFILIAL"]);
  }
  if (FIELD == "filial_d_bancarios") {
    $("#nome_filial_d_banc").val(selectedItem["NOME"]);
    $("#nome_filial_d_banc_fin").val(selectedItem["NOME"]);
    $("#nome_filial_analise").val(selectedItem["NOME"]);
    window["filial_d_bancarios_fin"].setValue(selectedItem["CODFILIAL"]);
  }
  if (FIELD == "filial_default") {
    $("#nome_filial_default").val(selectedItem["NOME"]);
    $("#nome_filial_default_fin").val(selectedItem["NOME"]);
    $("#nome_filial_analise").val(selectedItem["NOME"]);
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
    $("#CODTDO").val(selectedItem["CODTDO"]);
    $("#nome_tipo_documento").val(selectedItem["DESCRICAO"]);
  }
  if (FIELD == "vincular_fornecedor") {
    $("#CGCCFO").val(selectedItem["CGCCFO"]);
    let campo = $("#vincular_fornecedor").val();
    let valorDoCampo = campo[0];
    reloadZoomFilterValues("dados_pagamento", `CGC,${$("#CGCCFO").val()},COLIGADA,${$("#CODCOLIGADA").val()}`);
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
    $("#CGCCFO_analise").val(selectedItem["CGCCFO"]);
    $("#nome_cli_fornecedor_analise").text(selectedItem["NOME"]);
    $("#hidden_codigo_cli_for").val(selectedItem["CODCFO"]);
    $("#hidden_coligada_cli_for").val(selectedItem["CODCOLIGADA"]);
    $("#hidden_cnpj_fornecedor").val(selectedItem["CGCCFO"]);
    $("#nome_forn_analise").text(selectedItem["NOME"]);
    $("#cnpj_forn_analise").text(selectedItem["CGCCFO"]);
    $("#cfo_forn_analise").text($("#hidden_codigo_cli_for").val());
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
    $("#div_chave_tipo_forn").hide(400);
    $("#div_cod_boleto").hide(400);
  }
  if (removedItem.inputId == "dados_pagamento_analise") {
    $("#tipo_forn_analise").text("");
    $("#chave_forn_analise").text("");
    toggleCodBoleto("");
  }

  if (removedItem.inputId == "tipo_documento_analise") {
    $("#CODTDO").val("");
    $("#nome_tipo_documento").val("");
  }
}

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
      filtraTipoDeDocumentoPorColigada(String($("#CODCOLIGADA").val()));
      filtraContaCaixaPelaColigadaEFilial(String($("#CODCOLIGADA").val()))
      filtraPorColigadaFin();
      limpaFiltroNaturezaPorSetorFin();
      filtraPorColigadaDa()
      filtraTipoDeDocumentoPorColigada(String($("#CODCOLIGADA").val()))
      filtraDadosDePagamento(String($("#CODCOLIGADA").val()))

    }
    else {
      setTimeout(() => {
        reloadZoomAfterLoad(true, count);
      }, 3);
    }
  }
}

function filtraPorColigadaFin() {
  let coligada = $("#CODCOLIGADA").val();
  $('[name^="coluna_ccusto_fin___"]').each((i, e) => {
    let colunaCcustoInput = $(e).attr("name");
    if (coligada == "" || coligada == null) {
      if (validaZoom(colunaCcustoInput)) reloadZoomFilterValues(colunaCcustoInput);
    } else {
      if (validaZoom("vincular_fornecedor_analise")) reloadZoomFilterValues("vincular_fornecedor_analise", `CODCOLIGADA,${coligada}`);
      if (validaZoom(colunaCcustoInput)) reloadZoomFilterValues(colunaCcustoInput, `CODCOLIGADA,${coligada}`);
    }
  });
}

function filtraNaturezaPorSetorFin() {
  let valorDoCampo = String($("#SETORSOLICITANTE").val());
  $(`[name^="coluna_natureza_fin___"]`).each((i, e) => {
    if (e.type == 'hidden') return;
    if (validaZoom(e.name)) reloadZoomFilterValues(e.name, `SETOR,${valorDoCampo}`);
  });
  return true;
}

function filtraPorColigadaDa() {
  let coligada = $("#CODCOLIGADA").val();
  $('[name^="coluna_ccusto_da___"]').each((i, e) => {
    let colunaCcustoInput = $(e).attr("name");
    if (coligada == "" || coligada == null) {
      if (validaZoom(colunaCcustoInput)) reloadZoomFilterValues(colunaCcustoInput);
    } else {
      if (validaZoom("vincular_fornecedor_analise")) reloadZoomFilterValues("vincular_fornecedor_analise", `CODCOLIGADA,${coligada}`);
      if (validaZoom(colunaCcustoInput)) reloadZoomFilterValues(colunaCcustoInput, `CODCOLIGADA,${coligada}`);
    }
  });
}

function filtraNaturezaPorSetorDa() {
  let campo = $("#SETORSOLICITANTE").val();
  let valorDoCampo = campo[0];

  let tableBody = document
    .getElementById("table_dados_adicionais")
    .getElementsByTagName("tbody")[0];

  let rows = tableBody.getElementsByTagName("tr");
  if (rows.length == 1) {
    acrescentarLinha('table_dados_adicionais');
    rows = tableBody.getElementsByTagName("tr");
  }
  for (let i = 1; i < rows.length; i++) {
    let colunaNaturezaInput = rows[i].querySelector(`[name="coluna_natureza_da___${i}"]`);

    if (colunaNaturezaInput && validaZoom(colunaNaturezaInput.id)) {
      $(colunaNaturezaInput).val(null).trigger("change");
      reloadZoomFilterValues(`${colunaNaturezaInput.id}`, "SETOR," + valorDoCampo);
    }
  }
  return true;
}

function filtraTipoDeDocumentoPorColigada(codColigada) {
  codColigada = parseInt(codColigada);
  if (codColigada >= 0 && validaZoom("tipo_documento_analise")) reloadZoomFilterValues(`tipo_documento_analise`, `filtro,CODCOLIGADA = ${codColigada}`);
  return true;
}

function filtraContaCaixaPelaColigadaEFilial() {
  if (validaZoom("conta_caixa_analise")) reloadZoomFilterValues(`conta_caixa_analise`, `filtro,FCXA.CODCOLIGADA = ${$("#CODCOLIGADA").val()}`);
}

function filtraDadosPagamento() {
  if (validaZoom("dados_pagamento_analise")) reloadZoomFilterValues("dados_pagamento_analise", `CGC,${$("#CGCCFO_analise").val()},COLIGADA,${$("#CODCOLIGADA").val()}`);
}

function filtraDadosDePagamento(codColigada) {
  codColigada = parseInt(codColigada);
  if (codColigada >= 0 && validaZoom("tipo_documento_analise")) reloadZoomFilterValues(`conta_caixa_analise`, `filtro,FCXA.CODCOLIGADA = ${codColigada}`);
}

function validaContaCaixa(codContaCaixa) {
  let codColigada = String($("#CODCOLIGADA").val());
  var datasetDsReadRecord = DatasetFactory.getDataset('dsReadRecord', null, new Array(
    DatasetFactory.createConstraint('dataServer', 'FinCxaDataBR', null, ConstraintType.MUST),
    DatasetFactory.createConstraint('primaryKey', `${codColigada};${codContaCaixa}`, null, ConstraintType.MUST),
    DatasetFactory.createConstraint('mainTag', 'FCxa', null, ConstraintType.MUST)
  ), null);

  if (datasetDsReadRecord.values.length > 0) {
    let codFlialSol = $("#CODFILIAL").val();
    if (datasetDsReadRecord.values[0].Erro != undefined) {
      exibeMsg(
        "Atenção!",
        `${datasetDsReadRecord.values[0].Erro} - ${datasetDsReadRecord.values[0].primaryKey}`,
        "warning"
      )
      return;
    }
    else {
      let codFilialCX = datasetDsReadRecord.values[0].CODFILIAL;
      if (codFilialCX == undefined || codFilialCX == "") {
        // conta caixa global, tudo certo!
        return;
      }
      if (codFilialCX != codFlialSol) {
        exibeMsg(
          "Atenção!",
          `A conta caixa selecionada esta vinculada a filial ${codFilialCX}, diferente da filial ${codFlialSol} informada no início da solicitação!`,
          "warning"
        )
      }
    }
  } else {
    exibeMsg(
      "Atenção!",
      "Não encontramos dados do cadastro desta conta caixa no Totvs RM!",
      "warning"
    )
  }
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
        if (validaZoom(`coluna_natureza_da___${i}`)) reloadZoomFilterValues(`coluna_natureza_da___${i}`);
      }
    }
  }
}

function filtraPorColigada() {
  let value = $("#CODCOLIGADA").val();
  $(`[name^="coluna_ccusto___"]`).each((i, e) => {
    console.log(e.name)
    reloadZoomFilterValues(e.name, `CODCOLIGADA,${value}`);
  });

  if (centro_de_custo.open != undefined) reloadZoomFilterValues("centro_de_custo", `CODCOLIGADA,${value}`);
  if (dados_pagamento.open != undefined) reloadZoomFilterValues("dados_pagamento", `CGC,${$("#hidden_cnpj_fornecedor").val()},COLIGADA,${$("#coligada").val()}`);
  if (dados_pagamento_analise.open != undefined) filtraDadosPagamento();
  if (conta_caixa_analise.open != undefined) filtraContaCaixaPelaColigadaEFilial();
  if (filial.open != undefined) reloadZoomFilterValues("filial", `COLIGADA,${value}`);
  if (vincular_fornecedor.open != undefined) reloadZoomFilterValues("vincular_fornecedor", `CODCOLIGADA,${value}`);
  if (vincular_fornecedor_analise.open != undefined) reloadZoomFilterValues("vincular_fornecedor_analise", `CODCOLIGADA,${value}`);

  /* CAMPO OCULTO CASO O USUÁRIO CADASTRE UM FORNECEDOR */
  $("#hidden_coligada_cli_for").val(value);
}

function limpaFiltroColigada() {
  reloadZoomFilterValues("filial");
  reloadZoomFilterValues("centro_de_custo");
  reloadZoomFilterValues("dados_pagamento");
  reloadZoomFilterValues("dados_pagamento_analise");
  reloadZoomFilterValues("vincular_fornecedor");
  reloadZoomFilterValues("vincular_fornecedor_analise");
  var tableBody = document
    .getElementById("table_rateio_ccusto")
    .getElementsByTagName("tbody")[0];

  var rows = tableBody.getElementsByTagName("tr");
  if (rows.length == 1) {
    acrescentarLinha();
    rows = tableBody.getElementsByTagName("tr");
  }
  for (let i = 1; i < rows.length; i++) {
    var colunaCcustoInput = linha[i].querySelector(
      `[name="coluna_ccusto___${i}"]`,
    );
    reloadZoomFilterValues(colunaCcustoInput.id);
  }
}

function filtraNaturezaPorSetor() {
  let valorDoCampo = String($("#SETORSOLICITANTE").val());
  $(`[name^="coluna_natureza___"]`).each((i, e) => {
    if (e.type == 'hidden') return;
    $("#coluna_natureza___1").attr("type")
    reloadZoomFilterValues(e.name, `SETOR,${valorDoCampo}`);
  });
  return true;
}

function limpaFiltroNaturezaPorSetor() {
  let valorDoCampo = String($("#SETORSOLICITANTE").val());
  $(`[name^="coluna_natureza___"]`).each((i, e) => {
    $(`[name='${e.name}']`).val(null).trigger("change");
    if (validaZoom(e.name)) reloadZoomFilterValues(e.name, `SETOR,${valorDoCampo}`);
  });
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
        if (validaZoom(`coluna_natureza_fin___${i}`)) reloadZoomFilterValues(`coluna_natureza_fin___${i}`);
      }
    }
  }
}

function exibeMsg(title, message, type) {
  FLUIGC.toast({
    title: `<h4>${title}</h4>`,
    message: message,
    type: type,
    timeout: 'slow'
  });
}