function validaZoom(nomeDoCampo) {
  // console.log({ "validaZoom": nomeDoCampo });
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

  }
  if (FIELD == "centro_de_custo") {
    $("#hidden_filial_cc").val(selectedItem["CODFILIAL"]);
    $("#nome_ccusto").text(selectedItem["NOMECCUSTO"]);
    $("#CODCCUSTO").val(selectedItem["CCUSTO"]);
    window["CODFILIAL"].value = $("#hidden_filial_cc").val();
    window["filial_analise"].value = $("#hidden_filial_cc").val();
    adicionaCentroCustoRateio(selectedItem);
    let nomeFilial = getNomeFilial($("#CODCOLIGADA").val(), selectedItem["CODFILIAL"]);
    $("[name='filial']").val(nomeFilial);
    $("[name='nome_filial_analise']").val(nomeFilial);
  }
  if (FIELD == "conta_caixa_analise") {
    $("#nome_conta_analise").val(selectedItem["DESCRICAO"]);
    $("#hidden_numbanco").val(selectedItem["DESCRICAO"]);
    validaContaCaixa(selectedItem["CODCXA"]);
  }
  if (FIELD == "coligada") {
    $("#CODCOLIGADA").val(selectedItem["CODCOLIGADA"]);
  }
  if (FIELD == "ccusto_analise") {
    $("#nome_ccusto_analise").val(selectedItem["NOMECCUSTO"]);
  }
  if (FIELD == "dados_pagamento") {
    window["dados_pagamento_analise"].setValue(selectedItem["DESCRICAO"]);
    $("#hidden_dados_pgmt").val(selectedItem["DESCRICAO"]);
    $("#descricao").val(selectedItem["DESCRICAO"]);
    $("#descricao_fin").val(selectedItem["DESCRICAO"]);
    $("#cad_referencia").val(selectedItem["IDPGTO"]);
    $("#cad_referencia_fin").val(selectedItem["IDPGTO"]);
    $("#dados_bancarios_ativo").prop('checked', selectedItem["ATIVO"] == "1" || selectedItem["ATIVO"] == 1 ? true : false);
    preencheDadosPagamento(selectedItem['CODCOLIGADA'], selectedItem['CODCOLCFO'], selectedItem['CODCFO'], selectedItem['IDPGTO']);
    toggleCampoDadosPgmt(selectedItem["DESCRICAO"], selectedItem["TIPOPIX"], selectedItem["CHAVE"]);
  }
  if (FIELD == "dados_pagamento_analise") {
    $("#hidden_dados_pgmt").val(selectedItem["DESCRICAO"]);
    $("#descricao_fin").val(selectedItem["DESCRICAO"]);
    $("#cad_referencia_fin").val(selectedItem["IDPGTO"]);
    $("#dados_bancarios_ativo_fin").prop('checked', selectedItem["ATIVO"] == "1" || selectedItem["ATIVO"] == 1 ? true : false);
    tipoDaChavePixDadosPagamentoFin(selectedItem["TIPOPIX"], selectedItem["CHAVE"]);
    preencheDadosPagamento(selectedItem['CODCOLIGADA'], selectedItem['CODCOLCFO'], selectedItem['CODCFO'], selectedItem['IDPGTO']);
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
    formSetValue("filial_d_bancarios_fin", selectedItem["CODFILIAL"])
  }
  if (FIELD == "filial_default") {
    $("#nome_filial_default").val(selectedItem["NOME"]);
    $("#nome_filial_default_fin").val(selectedItem["NOME"]);
    $("#nome_filial_analise").val(selectedItem["NOME"]);
    formSetValue("filial_default_fin", selectedItem["CODFILIAL"])
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
    $("#tipo_cliente_forn_fin").val(selectedItem["Tipo"]);
    $("#nome_cliente_forn_fin").val(selectedItem["Nome"]);
  }
  if (FIELD == "tipo_documento_analise") {
    $("#CODTDO").val(selectedItem["CODTDO"]);
    $("#nome_tipo_documento").val(selectedItem["DESCRICAO"]);
  }
  if (FIELD == "vincular_fornecedor") {
    if (selectedItem["CODCOLIGADA"] != $("[name='CODCOLIGADA']").val() && selectedItem["CODCOLIGADA"] != 0) {
      exibeMsg("Atenção!", "O fornecedor que você selecionou não é um cadastro global (0) e/ou não pertence a mesma coligada selecionada no início do formulário. Verifique o código da coligada antes de selecionar o fornecedor ou altere a coligada onde será feito o lançamento", "danger");
      window['vincular_fornecedor'].clear()
      return;
    }

    $("#CGCCFO").val(selectedItem["CGCCFO"]);
    $("#nome_forn").text(selectedItem["NOME"]);
    $("#nome").val(selectedItem["NOME"]);
    $("#nome_cli_fornecedor_analise").val(selectedItem["NOME"]);
    $("#cnpj_forn").text(selectedItem["CGCCFO"]);
    $("#nome_social").val(selectedItem["NOMEFANTASIA"]);
    $("#nome").val(selectedItem["NOME"]);
    $("#CNPJ").val(selectedItem["CGCCFO"]);
    $("#tipo_rua").val(selectedItem["TIPORUA"]);
    $("#rua").val(selectedItem["RUA"]);
    $("#numero").val(selectedItem["NUMERO"]);
    $("#tipo_bairro").val(selectedItem["TIPOBAIRRO"]);
    $("#bairro").val(selectedItem["BAIRRO"]);
    $("#municipio").val(selectedItem["CIDADE"]);
    $("#sigla_estado").val(selectedItem["CODETD"]);
    $("#CEP").val(selectedItem["CEP"]);
    $("#telefone").val(selectedItem["TELEFONE"]);
    $("#email").val(selectedItem["EMAIL"]);
    $("#contato").val(selectedItem["CONTATO"]);
    $("#status_tipo_cliente").val(selectedItem["ATIVO"]);
    $("#id_pais").val(selectedItem["IDPAIS"]);
    $("#pais").val(selectedItem["PAIS"]);
    preencheNomeDoUFFin(selectedItem["CODETD"]);
    if (selectedItem["PESSOAFISOUJUR"] == "F") {
      $('input[name="categoria"][value="F"]').prop('checked', true);
    } else {
      $('input[name="categoria"][value="J"]').prop('checked', true);
    }

    /** Vamos a seção dados do fornecedor */
    $("#nome_social_fin").val(selectedItem["NOMEFANTASIA"]);
    $("#nome_fin").val(selectedItem["NOME"]);
    $("#CPF_fin").val(selectedItem["CGCCFO"]);
    $("#CNPJ_fin").val(selectedItem["CGCCFO"]);
    $("#CpfCnpj_analise").val(selectedItem["CGCCFO"]);
    $("#nome_cliente_forn_fin").text(selectedItem["NOME"]);
    $("#status_tipo_cliente_fin").val(selectedItem["ATIVO"]);
    $("#CEP_fin").val(selectedItem["CEP"]);
    $("#tipo_rua_fin").val(selectedItem["TIPORUA"]);
    $("#rua_fin").val(selectedItem["RUA"]);
    $("#numero_fin").val(selectedItem["NUMERO"]);
    $("#tipo_bairro_fin").val(selectedItem["TIPOBAIRRO"]);
    $("#bairro_fin").val(selectedItem["BAIRRO"]);
    $("#id_pais_fin").val(selectedItem["IDPAIS"]);
    $("#pais_fin").val(selectedItem["PAIS"]);
    $("#sigla_estado_fin").val(selectedItem["CODETD"]);
    preencheNomeDoUFFin(selectedItem["CODETD"]);
    $("#municipio_fin").val(selectedItem["CIDADE"]);
    $("#telefone_fin").val(selectedItem["TELEFONE"]);
    $("#email_fin").val(selectedItem["EMAIL"]);
    $("#contato_fin").val(selectedItem["CONTATO"]);
    if (selectedItem["PESSOAFISOUJUR"] == "F") {
      $('input[name="categoria_fin"][value="F"]').prop('checked', true);
    } else {
      $('input[name="categoria_fin"][value="J"]').prop('checked', true);
    }

    /** Campos de integração */
    $("#cnpj_forn").text(selectedItem["CGCCFO"]);
    $("#hidden_cnpj_fornecedor").val(selectedItem["CGCCFO"]);
    $("#hidden_coligada_cli_for").val(selectedItem["CODCOLIGADA"]);
    $("#hidden_codigo_cli_for").val(selectedItem["CODCFO"]);
    let campo = String($("#vincular_fornecedor").val());
    if (window["vincular_fornecedor_analise"].setValue) window["vincular_fornecedor_analise"].setValue(campo);
    else $("#vincular_fornecedor_analise").val(campo);

  }
  if (FIELD == "vincular_fornecedor_analise") {
    if (selectedItem["CODCOLIGADA"] != $("[name='CODCOLIGADA']").val() && selectedItem["CODCOLIGADA"] != 0) {
      exibeMsg("Atenção!", "O fornecedor que você selecionou não é um cadastro global (0) e/ou não pertence a mesma coligada selecionada no início do formulário. Verifique o código da coligada antes de selecionar o fornecedor ou altere a coligada onde será feito o lançamento", "danger");
      window['vincular_fornecedor'].clear()
      return;
    }

    $("#CGCCFO_analise").val(selectedItem["CGCCFO"]);
    $("#nome_forn_analise").text(selectedItem["NOME"]);
    $("#nome_cli_fornecedor_analise").val(selectedItem["NOME"]);
    $("#cnpj_forn_analise").text(selectedItem["CGCCFO"]);
    $("#CpfCnpj_analise").val(selectedItem["CGCCFO"]);
    $("#cfo_forn_analise").text(selectedItem["CODCFO"]);
    $("#nome_social_fin").val(selectedItem["NOMEFANTASIA"]);
    $("#nome_fin").val(selectedItem["NOME"]);
    $("#CNPJ_fin").val(selectedItem["CGCCFO"]);
    $("#tipo_rua_fin").val(selectedItem["TIPORUA"]);
    $("#rua_fin").val(selectedItem["RUA"]);
    $("#numero_fin").val(selectedItem["NUMERO"]);
    $("#tipo_bairro_fin").val(selectedItem["TIPOBAIRRO"]);
    $("#bairro_fin").val(selectedItem["BAIRRO"]);
    $("#municipio_fin").val(selectedItem["CIDADE"]);
    $("#sigla_estado_fin").val(selectedItem["CODETD"]);
    $("#CEP_fin").val(selectedItem["CEP"]);
    $("#telefone_fin").val(selectedItem["TELEFONE"]);
    $("#email_fin").val(selectedItem["EMAIL"]);
    $("#contato_fin").val(selectedItem["CONTATO"]);
    $("#status_tipo_cliente_fin").val(selectedItem["ATIVO"]);
    $("#id_pais_fin").val(selectedItem["IDPAIS"]);
    $("#pais_fin").val(selectedItem["PAIS"]);
    preencheNomeDoUFFin(selectedItem["CODETD"]);
    if (selectedItem["PESSOAFISOUJUR"] == "F") {
      $('input[name="categoria_fin"][value="F"]').prop('checked', true);
    } else {
      $('input[name="categoria_fin"][value="J"]').prop('checked', true);
    }
    $("#hidden_cnpj_fornecedor").val(selectedItem["CGCCFO"]);
    $("#hidden_coligada_cli_for").val(selectedItem["CODCOLIGADA"]);
    $("#hidden_codigo_cli_for").val(selectedItem["CODCFO"]);

  }

  /** Refaz os filtros de todos os campos zoom */
  reloadZoomAfterLoad(true)
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
  }
  if (removedItem.inputId == "vincular_fornecedor") {
    $("#hidden_codigo_cli_for").val("");
    $("#nome_forn").text("");
    $("#cnpj_forn").text("");
    reloadZoomFilterValues("dados_pagamento");
    limpaDaDadosPagamento()
  }
  if (removedItem.inputId == "vincular_fornecedor_analise") {
    $("#hidden_codigo_cli_for").val("");
    $('#dados_pagamento_analise').text("");
    $('#dados_pagamento_analise').val("");
    window['dados_pagamento_analise'].clear();
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
    limpaDaDadosPagamento()
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
  let CODCOLIGADA = String($("#CODCOLIGADA").val())
  if (loaded == true) {
    if (count >= 50) {
      console.log("Nenhum zoom foi carregado");
    }
    else if (empresa.close != undefined || coligada.close != undefined || vincular_fornecedor.close != undefined || forma_pagamento.close != undefined || zTask007.close != undefined) {
      reloadZoomAfterLoad(false);
      filtraNaturezaPorSetor();
      filtraNaturezaPorSetorFin();
      filtraTipoDeDocumentoPorColigada(CODCOLIGADA);
      filtraContaCaixaPelaColigadaEFilial(CODCOLIGADA)
      filtraPorColigada(CODCOLIGADA);
      filtraCCPorColigada();
      filtraCCPorColigadaFin();
      filtraDadosPagamento();
    }
    else {
      setTimeout(() => {
        reloadZoomAfterLoad(true, count);
      }, 300);
    }
  }
}

function filtraPorColigada(CODCOLIGADA) {
  if (centro_de_custo.open != undefined) reloadZoomFilterValues("centro_de_custo", `CODCOLIGADA,${CODCOLIGADA}`);
  if (dados_pagamento.open != undefined) filtraDadosPagamento();
  if (dados_pagamento_analise.open != undefined) filtraDadosPagamento();
  if (conta_caixa_analise.open != undefined) filtraContaCaixaPelaColigadaEFilial();
  if (vincular_fornecedor.open != undefined) reloadZoomFilterValues("vincular_fornecedor", `CODCOLIGADA,${CODCOLIGADA}`);
  if (filial_d_bancarios.open != undefined) reloadZoomFilterValues("filial_d_bancarios", `CODCOLIGADA,${CODCOLIGADA}`);
  if (filial_d_bancarios_fin.open != undefined) reloadZoomFilterValues("filial_d_bancarios_fin", `CODCOLIGADA,${CODCOLIGADA}`);
}

function filtraCCPorColigada() {
  let coligada = $("#CODCOLIGADA").val();
  $('[name^="coluna_ccusto___"]').each((i, e) => {
    let colunaCcustoInput = $(e).attr("name");
    if (coligada == "" || coligada == null) {
      if (validaZoom(colunaCcustoInput)) reloadZoomFilterValues(colunaCcustoInput);
    } else {
      if (validaZoom(colunaCcustoInput)) reloadZoomFilterValues(colunaCcustoInput, `CODCOLIGADA,${coligada}`);
    }
  });
}

function filtraCCPorColigadaFin() {
  let coligada = $("#CODCOLIGADA").val();
  $('[name^="coluna_ccusto_fin___"]').each((i, e) => {
    let colunaCcustoInput = $(e).attr("name");
    if (coligada == "" || coligada == null) {
      if (validaZoom(colunaCcustoInput)) reloadZoomFilterValues(colunaCcustoInput);
    } else {
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

function filtraTipoDeDocumentoPorColigada(codColigada) {
  codColigada = parseInt(codColigada);
  if (codColigada >= 0 && validaZoom("tipo_documento_analise")) reloadZoomFilterValues(`tipo_documento_analise`, `filtro,CODCOLIGADA = ${codColigada}`);
  return true;
}

function filtraContaCaixaPelaColigadaEFilial() {
  if (validaZoom("conta_caixa_analise")) reloadZoomFilterValues(`conta_caixa_analise`, `filtro,FCXA.CODCOLIGADA = ${$("#CODCOLIGADA").val()} AND FCXA.CODFILIAL = ${$("#CODFILIAL").val()}`)
}

function filtraDadosPagamento() {
  if (validaZoom("dados_pagamento_analise")) reloadZoomFilterValues("dados_pagamento_analise", `CODCOLIGADA,${$("#CODCOLIGADA").val()},CODCFO,${$("#hidden_codigo_cli_for").val()}`);
  if (validaZoom("dados_pagamento")) reloadZoomFilterValues("dados_pagamento", `CODCOLIGADA,${$("#CODCOLIGADA").val()},CODCFO,${$("#hidden_codigo_cli_for").val()}`);
}

function validaContaCaixa(codContaCaixa) {
  let codColigada = String($("#CODCOLIGADA").val());
  let datasetDsReadRecord = DatasetFactory.getDataset('dsReadRecord', null, new Array(
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

function preencheDadosPagamento(CODCOLIGADA, CODCOLCFO, CODCFO, IDPGTO) {
  let datasetDsReadRecord = DatasetFactory.getDataset('dsReadRecord', null, new Array(
    DatasetFactory.createConstraint('dataServer', 'FinDADOSPGTODataBR', null, ConstraintType.MUST),
    DatasetFactory.createConstraint('primaryKey', `${CODCOLIGADA};${CODCOLCFO};${CODCFO};${IDPGTO}`, null, ConstraintType.MUST),
    DatasetFactory.createConstraint('mainTag', 'FDadosPgto', null, ConstraintType.MUST)
  ), null);

  if (datasetDsReadRecord.values == undefined) {
    return exibeMsg("Atenção!", `Erro no retorno do dataset. Contate o administrador!`, "warning")
  }

  if (datasetDsReadRecord.values.length > 0) {
    if (datasetDsReadRecord.values[0].Erro != undefined) {
      exibeMsg("Atenção!", `${datasetDsReadRecord.values[0].Erro} - ${datasetDsReadRecord.values[0].primaryKey}`, "warning")
      return;
    }
    else {
      let dadosPagamento = datasetDsReadRecord.values[0];
      if (dadosPagamento.NUMEROBANCO != undefined) formSetValue("NUMEROBANCO", dadosPagamento.NUMEROBANCO);
      if (dadosPagamento.NUMEROBANCO != undefined) {
        formSetValue("NUMEROBANCO", dadosPagamento.NUMEROBANCO);
        autocompleteBanco(dadosPagamento.NUMEROBANCO);
      }
      if (dadosPagamento.FORMAPAGAMENTO != undefined) {
        let descFormPagamento = getNomeFormaPagamento(dadosPagamento.FORMAPAGAMENTO);
        formSetValue("forma_pagamento", descFormPagamento);
        formSetValue("forma_pagamento_fin", descFormPagamento);
        formSetValue("hidden_desc_fpgmto", descFormPagamento);
        formSetValue("hidden_forma_pgmto", dadosPagamento.FORMAPAGAMENTO);
      }
      if (dadosPagamento.CODIGOAGENCIA != undefined) formSetValue("agencia", dadosPagamento.CODIGOAGENCIA);
      if (dadosPagamento.CODIGOAGENCIA != undefined) formSetValue("agencia_fin", dadosPagamento.CODIGOAGENCIA);
      if (dadosPagamento.DIGITOAGENCIA != undefined) formSetValue("digito", dadosPagamento.DIGITOAGENCIA);
      if (dadosPagamento.DIGITOAGENCIA != undefined) formSetValue("digito_fin", dadosPagamento.DIGITOAGENCIA);
      if (dadosPagamento.DESCRICAO != undefined) formSetValue("nome_agencia", dadosPagamento.DESCRICAO);
      if (dadosPagamento.DESCRICAO != undefined) formSetValue("nome_agencia_fin", dadosPagamento.DESCRICAO);
      if (dadosPagamento.CONTACORRENTE != undefined) formSetValue("conta_corrente", dadosPagamento.CONTACORRENTE);
      if (dadosPagamento.CONTACORRENTE != undefined) formSetValue("conta_corrente_fin", dadosPagamento.CONTACORRENTE);
      if (dadosPagamento.DIGITOCONTA != undefined) formSetValue("digito_conta_corrente", dadosPagamento.DIGITOCONTA);
      if (dadosPagamento.DIGITOCONTA != undefined) formSetValue("digito_conta_corrente_fin", dadosPagamento.DIGITOCONTA);
      if (dadosPagamento.TIPOCONTA != undefined) formSetValue("tipo_conta", dadosPagamento.TIPOCONTA);
      if (dadosPagamento.TIPOCONTA != undefined) formSetValue("tipo_conta_fin", dadosPagamento.TIPOCONTA);
      if (dadosPagamento.FAVORECIDO != undefined) formSetValue("favorecido", dadosPagamento.FAVORECIDO);
      if (dadosPagamento.FAVORECIDO != undefined) formSetValue("favorecido_fin", dadosPagamento.FAVORECIDO);
      if (dadosPagamento.CGCFAVORECIDO != undefined) formSetValue("CpfCnpj_favorecido", dadosPagamento.CGCFAVORECIDO);
      if (dadosPagamento.CGCFAVORECIDO != undefined) formSetValue("CpfCnpj_favorecido_fin", dadosPagamento.CGCFAVORECIDO);
      if (dadosPagamento.TIPOPIX != undefined) formSetValue("tipo_chave_pix", dadosPagamento.TIPOPIX);
      if (dadosPagamento.TIPOPIX != undefined) formSetValue("tipo_chave_pix_fin", dadosPagamento.TIPOPIX);
      if (dadosPagamento.CHAVE != undefined) formSetValue("chave_CPF", dadosPagamento.CHAVE);
      if (dadosPagamento.CHAVE != undefined) formSetValue("chave_CPF_fin", dadosPagamento.CHAVE);
      if (dadosPagamento.CHAVE != undefined) formSetValue("chave_CNPJ", dadosPagamento.CHAVE);
      if (dadosPagamento.CHAVE != undefined) formSetValue("chave_CNPJ_fin", dadosPagamento.CHAVE);
      if (dadosPagamento.CHAVE != undefined) formSetValue("chave_email", dadosPagamento.CHAVE);
      if (dadosPagamento.CHAVE != undefined) formSetValue("chave_email_fin", dadosPagamento.CHAVE);
      if (dadosPagamento.CHAVE != undefined) formSetValue("chave_celular", dadosPagamento.CHAVE);
      if (dadosPagamento.CHAVE != undefined) formSetValue("chave_celular_fin", dadosPagamento.CHAVE);
      if (dadosPagamento.CHAVE != undefined) formSetValue("chave_aleatoria", dadosPagamento.CHAVE);
      if (dadosPagamento.CHAVE != undefined) formSetValue("chave_aleatoria_fin", dadosPagamento.CHAVE);
      if (dadosPagamento.CHAVE != undefined) formSetValue("chave_pix_padrao", dadosPagamento.CHAVE);

      formSetValue("filial_d_bancarios", String($("[name='CODFILIAL']").val()));
      formSetValue("nome_filial_d_banc", String($("[name='filial']").val()));

      formSetValue("filial_d_bancarios_fin", String($("[name='CODFILIAL']").val()));
      formSetValue("nome_filial_d_banc_fin", String($("[name='filial']").val()));
    }
  } else {
    exibeMsg("Atenção!", `Não encontramos dados de pagamento para este fornecedor! <br/><b>primaryKey</b>: ${CODCOLIGADA};${CODCOLCFO};${CODCFO};${IDPGTO}`, "warning")
  }
}

function limpaDaDadosPagamento() {
  formSetValue("banco", "");
  formSetValue("banco_fin", "");
  formSetValue("camara_comp", "");
  formSetValue("camara_comp_fin", "");
  formSetValue("NUMEROBANCO", "");
  formSetValue("agencia", "");
  formSetValue("agencia_fin", "");
  formSetValue("digito", "");
  formSetValue("digito_fin", "");
  formSetValue("nome_agencia", "");
  formSetValue("nome_agencia_fin", "");
  formSetValue("conta_corrente", "");
  formSetValue("conta_corrente_fin", "");
  formSetValue("digito_conta_corrente", "");
  formSetValue("digito_conta_corrente_fin", "");
  formSetValue("tipo_conta", "");
  formSetValue("tipo_conta_fin", "");
  formSetValue("favorecido", "");
  formSetValue("favorecido_fin", "");
  formSetValue("CpfCnpj_favorecido", "");
  formSetValue("CpfCnpj_favorecido_fin", "");
  formSetValue("tipo_chave_pix", "");
  formSetValue("tipo_chave_pix_fin", "");
  formSetValue("chave_CPF", "");
  formSetValue("chave_CPF_fin", "");
  formSetValue("chave_CNPJ", "");
  formSetValue("chave_CNPJ_fin", "");
  formSetValue("chave_email", "");
  formSetValue("chave_email_fin", "");
  formSetValue("chave_celular", "");
  formSetValue("chave_celular_fin", "");
  formSetValue("chave_aleatoria", "");
  formSetValue("chave_aleatoria_fin", "");
  formSetValue("chave_pix_padrao", "");
  formSetValue("forma_pagamento", "");
  formSetValue("hidden_desc_fpgmto", "");
  formSetValue("hidden_forma_pgmto", "");
  formSetValue("descricao", "");
  formSetValue("descricao_fin", "");
  formSetValue("filial_d_bancarios", "");
  formSetValue("filial_d_bancarios_fin", "");
  formSetValue("nome_filial_d_banc", "");
  formSetValue("nome_filial_d_banc_fin", "");
}

function limpaFiltroColigada() {
  $("#CODCOLIGADA").val("");
  formSetValue("centro_de_custo", "")
  formSetValue("filial", "")
  formSetValue("setor_solicitante", "")
  formLimpaCampoZoom("coluna_natureza")
  formLimpaCampoZoom("coluna_ccusto")
  formLimpaCampoZoom("dados_pagamento");
  formLimpaCampoZoom("dados_pagamento_analise");
  formLimpaCampoZoom("vincular_fornecedor");
}

function filtraNaturezaPorSetor() {
  let valorDoCampo = String($("#SETORSOLICITANTE").val());
  $(`[name^="coluna_natureza___"]`).each((i, e) => {
    if (e.type == 'hidden') return;
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

function getNomeFormaPagamento(valor) {
  var datasetDs_forma_pagamento = DatasetFactory.getDataset('ds_forma_pagamento', null, new Array(
    DatasetFactory.createConstraint('Valor', valor, valor, ConstraintType.MUST)
  ), null);
  if (datasetDs_forma_pagamento.values.length > 0) return datasetDs_forma_pagamento.values[0].Nome;
  return null;
}

function getNomeFilial(CODCOLIGADA, CODFILIAL) {
  var datasetDsRMFisFilialDataBR = DatasetFactory.getDataset('dsRMFisFilialDataBR', null, new Array(
    DatasetFactory.createConstraint('CODFILIAL', CODFILIAL, CODFILIAL, ConstraintType.MUST),
    DatasetFactory.createConstraint('CODCOLIGADA', CODCOLIGADA, CODCOLIGADA, ConstraintType.MUST)
  ), null);
  if (datasetDsRMFisFilialDataBR.values != undefined && datasetDsRMFisFilialDataBR.values.length > 0) {
    return datasetDsRMFisFilialDataBR.values[0].NOME;
  }
  else return "";
}

function formSetValue(nomeCampo, valor) {
  if (window[nomeCampo].open != undefined) valor == "" || valor == null ? window[nomeCampo].clear() : window[nomeCampo].setValue(valor);
  else window[nomeCampo].value = valor;

  console.log("Campo:" + nomeCampo + " Valor: " + valor);
  if(valor == "" || valor == null) console.log("Valor para o campo " + nomeCampo + " não encontrado!");
}

function formGetValue(nomeCampo) {
  console.log(nomeCampo);
  let tipoCampo = $(`[name="${nomeCampo}"]`).attr("type");
  if (tipoCampo == 'radio') return $(`[name="${nomeCampo}"]:checked`).val();
  if (tipoCampo == 'zoom') return String($(`[name="${nomeCampo}"]`).val());
  let nodeName = $(`[name="${nomeCampo}"]`).get(0).nodeName;
  if (nodeName == 'SELECT') return $(`[name="${nomeCampo}"] option:selected`).val();
  return String($(`[name="${nomeCampo}"]`).val());
}

function formLimpaCampoZoom(nomeCampo) {
  $(`[name^='${nomeCampo}']`).each((i, e) => {
    if (e.name) formSetValue(e.name, "")
  });
}