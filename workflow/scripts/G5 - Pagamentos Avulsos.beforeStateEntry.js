function beforeStateEntry(sequenceId) {
  try {
    /* PROVISIONAMENTO */
    if (sequenceId == 7) {
      dadosRateio();
    }
    /* APROVAÇÃO GESTOR - APROVADA */
    if (sequenceId == 227) {
      hAPI.setCardValue("aprovacao_gestor", "aprovado");
      hAPI.setCardValue("mensagem_cancel_gestor", "Aprovado pelo Gestor");
    }
    /* APROVAÇÃO GESTOR - REPROVADA */
    if (sequenceId == 228) {
      hAPI.setCardValue("aprovacao_gestor", "reprovado");
      hAPI.setCardValue("mensagem_cancel_gestor", "Reprovado pelo Gestor");
    }
    /* APROVAÇÃO DIRETORIA - APROVADA */
    if (sequenceId == 233) {
      hAPI.setCardValue("aprovacao_diretoria", "aprovado");
      hAPI.setCardValue("mensagem_cancel_diretoria", "Aprovado pela Diretoria");
    }
    /* APROVAÇÃO DIRETORIA - REPROVADA */
    if (sequenceId == 234) {
      hAPI.setCardValue("aprovacao_diretoria", "reprovado");
      hAPI.setCardValue("mensagem_cancel_diretoria", "Reprovado pela Diretoria");
    }
    /* AGUARDANDO VENCIMENTO */
    if (sequenceId == 246) {
      hAPI.setCardValue("seleciona_fase_envio", "aguardando_vencimento");
    }
    /* PAGAMENTO ÚNICO */
    if (sequenceId == 247) {
      hAPI.setCardValue("seleciona_fase_envio", "pagamento_unico");
    }
    /* PAGAMENTO PARCIAL */
    if (sequenceId == 248) {
      hAPI.setCardValue("seleciona_fase_envio", "pagamento_parcial");
    }
    /* DADOS DO FORNECEDOR */
    if (sequenceId == 274) {
      dadosDoFornecedor();
    }
  } catch (err) {
    log.error("erro no beforeStateEntry do G5: " + err);
  }
}

function dadosDoFornecedor() {
  dadosCadastroFornecedor();
  dadosCadastroBancario();
  dadosRateio();
}

function dadosCadastroFornecedor() {
  if (hAPI.getCardValue("fornecedor_cadastrado") == "Não") {
    /* CADASTRO DE FORNECEDOR */
    var cliente_global = hAPI.getCardValue("cliente_global");
    hAPI.setCardValue("cliente_global_fin", cliente_global);

    var data_nascimento = hAPI.getCardValue("data_nascimento");
    hAPI.setCardValue("data_nascimento_fin", data_nascimento);

    var estado_civil = hAPI.getCardValue("estado_civil");
    hAPI.setCardValue("estado_civil_fin", estado_civil);

    var nome = hAPI.getCardValue("nome");
    hAPI.setCardValue("nome_fin", nome);
    hAPI.setCardValue("nome_cli_fornecedor_analise", nome);

    var nome_social = hAPI.getCardValue("nome_social");
    hAPI.setCardValue("nome_social_fin", nome_social);

    var classificacao = hAPI.getCardValue("classificacao");
    hAPI.setCardValue("classificacao_fin", classificacao);

    var categoria = hAPI.getCardValue("categoria");
    hAPI.setCardValue("categoria_fin", categoria);

    var cpf = hAPI.getCardValue("CPF");
    hAPI.setCardValue("CPF_fin", cpf);

    var cnpj = hAPI.getCardValue("CNPJ");
    hAPI.setCardValue("CNPJ_fin", cnpj);

    hAPI.setCardValue("CpfCnpj_analise", capta_Cpf_Cnpj(hAPI.getCardValue("categoria_fin")));

    var inscricao_estadual = hAPI.getCardValue("inscricao_estadual");
    hAPI.setCardValue("inscricao_estadual_fin", inscricao_estadual);

    var inscricao_municipal = hAPI.getCardValue("inscricao_municipal");
    hAPI.setCardValue("inscricao_municipal_fin", inscricao_municipal);

    // var z_tipo_cliente_fornecedor = hAPI.getCardValue("tipo_cliente_fornecedor");
    // hAPI.setCardValue("tipo_cliente_forn_fin", z_tipo_cliente_fornecedor);

    var nome_cliente_forn = hAPI.getCardValue("nome_cliente_forn");
    hAPI.setCardValue("nome_cliente_forn_fin", nome_cliente_forn);

    var status_tipo_cliente = hAPI.getCardValue("status_tipo_cliente");
    hAPI.setCardValue("status_tipo_cliente_fin", status_tipo_cliente);

    /* IDENTIDADE */
    var identidade = hAPI.getCardValue("identidade");
    hAPI.setCardValue("identidade_fin", identidade);

    var orgao_emissor = hAPI.getCardValue("orgao_emissor");
    hAPI.setCardValue("orgao_emissor_fin", orgao_emissor);

    var estado_emissor = hAPI.getCardValue("estado_emissor");
    hAPI.setCardValue("estado_emissor_fin", estado_emissor);

    var numero_dependentes = hAPI.getCardValue("numero_dependentes");
    hAPI.setCardValue("numero_dependentes_fin", numero_dependentes);

    var aposentado_pensionista = hAPI.getCardValue("aposen_pensionista");
    hAPI.setCardValue("aposen_pensionista_fin", aposentado_pensionista);

    var nacionalidade = hAPI.getCardValue("nacionalidade");
    hAPI.setCardValue("nacionalidade_fin", nacionalidade);

    var cep = hAPI.getCardValue("CEP");
    hAPI.setCardValue("CEP_fin", cep);

    var tipo_rua = hAPI.getCardValue("tipo_rua");
    hAPI.setCardValue("tipo_rua_fin", tipo_rua);

    var rua = hAPI.getCardValue("rua");
    hAPI.setCardValue("rua_fin", rua);

    var numero = hAPI.getCardValue("numero");
    hAPI.setCardValue("numero_fin", numero);

    var complemento = hAPI.getCardValue("complemento");
    hAPI.setCardValue("complemento_fin", complemento);

    var tipo_bairro = hAPI.getCardValue("tipo_bairro");
    hAPI.setCardValue("tipo_bairro_fin", tipo_bairro);

    var bairro = hAPI.getCardValue("bairro");
    hAPI.setCardValue("bairro_fin", bairro);

    var id_pais = hAPI.getCardValue("id_pais");
    hAPI.setCardValue("id_pais_fin", id_pais);

    var pais = hAPI.getCardValue("pais");
    hAPI.setCardValue("pais_fin", pais);

    var sigla_estado = hAPI.getCardValue("sigla_estado");
    hAPI.setCardValue("sigla_estado_fin", sigla_estado);

    var nome_estado = hAPI.getCardValue("nome_estado");
    hAPI.setCardValue("nome_estado_fin", nome_estado);

    var codigo_municipio = hAPI.getCardValue("codigo_municipio");
    hAPI.setCardValue("codigo_municipio_fin", codigo_municipio);

    var nome_municipio = hAPI.getCardValue("nome_municipio");
    hAPI.setCardValue("nome_municipio_fin", nome_municipio);

    var caixa_postal = hAPI.getCardValue("caixa_postal");
    hAPI.setCardValue("caixa_postal_fin", caixa_postal);

    var cep_caixa_postal = hAPI.getCardValue("cep_caixa_postal");
    hAPI.setCardValue("cep_caixa_postal_fin", cep_caixa_postal);

    var telefone = hAPI.getCardValue("telefone");
    hAPI.setCardValue("telefone_fin", telefone);

    var celular = hAPI.getCardValue("celular");
    hAPI.setCardValue("celular_fin", celular);

    var telefone_comercial = hAPI.getCardValue("telefone_comercial");
    hAPI.setCardValue("telefone_comercial", telefone_comercial);

    var fax = hAPI.getCardValue("fax");
    hAPI.setCardValue("fax_fin", fax);

    var fax_dedicado = hAPI.getCardValue("fax_dedicado");
    hAPI.setCardValue("fax_dedicado_fin", fax_dedicado);

    var email = hAPI.getCardValue("email");
    hAPI.setCardValue("email_fin", email);

    var contato = hAPI.getCardValue("contato");
    hAPI.setCardValue("contato_fin", contato);
  }
}

function dadosCadastroBancario() {
  /* CADASTRO DADOS BANCARIOS */
  if (hAPI.getCardValue("fornecedor_cadastrado") == "Não") {
    var dados_bancarios = hAPI.getCardValue("dados_bancarios_ativo");
    hAPI.setCardValue("dados_bancarios_fin", dados_bancarios);

    var cad_referencia = hAPI.getCardValue("cad_referencia");
    hAPI.setCardValue("cad_referencia_fin", cad_referencia);

    var descricao = hAPI.getCardValue("descricao");
    hAPI.setCardValue("descricao_fin", descricao);

    // var z_filial_d_bancarios = hAPI.getCardValue("filial_d_bancarios");
    // hAPI.setCardValue("filial_d_bancarios_fin", z_filial_d_bancarios);

    var nome_filial_d_banc = hAPI.getCardValue("nome_filial_d_banc");
    hAPI.setCardValue("nome_filial_d_banc_fin", nome_filial_d_banc);

    var forma_pagamento = hAPI.getCardValue("forma_pagamento");
    hAPI.setCardValue("forma_pagamento_fin", forma_pagamento);

    var banco = hAPI.getCardValue("banco");
    hAPI.setCardValue("banco_fin", banco);

    var agencia = hAPI.getCardValue("agencia");
    hAPI.setCardValue("agencia_fin", agencia);

    var digito = hAPI.getCardValue("digito");
    hAPI.setCardValue("digito_fin", digito);

    var nome_agencia = hAPI.getCardValue("nome_agencia");
    hAPI.setCardValue("nome_agencia_fin", nome_agencia);

    var conta_corrente = hAPI.getCardValue("conta_corrente");
    hAPI.setCardValue("conta_corrente_fin", conta_corrente);

    var digito_conta_corrente = hAPI.getCardValue("digito_conta_corrente");
    hAPI.setCardValue("digito_conta_corrente_fin", digito_conta_corrente);

    var tipo_conta = hAPI.getCardValue("tipo_conta");
    hAPI.setCardValue("tipo_conta_fin", tipo_conta);

    var camara_comp = hAPI.getCardValue("camara_comp");
    hAPI.setCardValue("camara_comp_fin", camara_comp);

    var favorecido = hAPI.getCardValue("favorecido");
    hAPI.setCardValue("favorecido_fin", favorecido);

    var CpfCnpj_favorecido = hAPI.getCardValue("CpfCnpj_favorecido");
    hAPI.setCardValue("CpfCnpj_favorecido_fin", CpfCnpj_favorecido);

    var tipo_chave_pix = hAPI.getCardValue("tipo_chave_pix");
    hAPI.setCardValue("tipo_chave_pix_fin", tipo_chave_pix);

    var chave_CPF = hAPI.getCardValue("chave_CPF");
    hAPI.setCardValue("chave_CPF_fin", chave_CPF);

    var chave_CNPJ = hAPI.getCardValue("chave_CNPJ");
    hAPI.setCardValue("chave_CNPJ_fin", chave_CNPJ);

    var chave_email = hAPI.getCardValue("chave_email");
    hAPI.setCardValue("chave_email_fin", chave_email);

    var chave_celular = hAPI.getCardValue("chave_celular");
    hAPI.setCardValue("chave_celular_fin", chave_celular);

    var chave_aleatoria = hAPI.getCardValue("chave_aleatoria");
    hAPI.setCardValue("chave_aleatoria_fin", chave_aleatoria);

    /* DADOS COMPLEMENTARES */
    var tipo_doc = hAPI.getCardValue("tipo_doc");
    hAPI.setCardValue("tipo_doc_fin", tipo_doc);

    var cod_finalidade = hAPI.getCardValue("cod_finalidade");
    hAPI.setCardValue("cod_finalidade_fin", cod_finalidade);

    /* DEFAULT DADOS BANCÁRIOS */
    var classificacao_default = hAPI.getCardValue("classificacao_default");
    hAPI.setCardValue("classificacao_default_fin", classificacao_default);

    var nome_cli_fornecedor_default = hAPI.getCardValue("nome_cli_fornecedor_default");
    hAPI.setCardValue("nome_cli_forn_default_fin", nome_cli_fornecedor_default);

    var filial_default = hAPI.getCardValue("filial_default");
    hAPI.setCardValue("filial_default_fin", filial_default);

    var nome_filial_default = hAPI.getCardValue("nome_filial_default");
    hAPI.setCardValue("nome_filial_default_fin", nome_filial_default);

    var dados_banc_default = hAPI.getCardValue("dados_banc_default");
    hAPI.setCardValue("dados_banc_default_fin", dados_banc_default);

    var nome_dados_banc_default = hAPI.getCardValue("nome_dados_banc_default");
    hAPI.setCardValue("nome_dados_banc_default_fin", nome_dados_banc_default);
  }
}

function dadosRateio() {
  try {

    var indexes = hAPI.getChildrenIndexes("table_rateio_ccusto_fin");
    for (var i = indexes.length - 1; i >= 0; i--) {
      hAPI.removeCardChild("table_rateio_ccusto_fin", indexes[i]);
    }

    var valorTotal = hAPI.getCardValue("valor_total_rateio");
    hAPI.setCardValue("valor_total_rateio_fin", valorTotal);
    var camposProcessoPrincipal = hAPI.getCardData(getValue("WKNumProces"))
    var keys = camposProcessoPrincipal.keySet().toArray();
    for (var key in keys) {
      var field = keys[key];
      if (field.indexOf("coluna_natureza___") >= 0) {
        var novoItem = new java.util.HashMap();
        var idPF = field.replace("coluna_natureza___", "");
        novoItem.put("coluna_natureza_fin", camposProcessoPrincipal.get(String("coluna_natureza" + "___" + idPF)));
        novoItem.put("coluna_ccusto_fin", camposProcessoPrincipal.get(String("coluna_ccusto" + "___" + idPF)));
        novoItem.put("coluna_valor_fin", camposProcessoPrincipal.get(String("coluna_valor" + "___" + idPF)));
        novoItem.put("coluna_percentual_fin", camposProcessoPrincipal.get(String("coluna_percentual" + "___" + idPF)));
        hAPI.addCardChild("table_rateio_ccusto_fin", novoItem);
      }
    }
  } catch (err) {
    log.error("G5 beforeStateEntry: " + String(err));
  }
}

function capta_Cpf_Cnpj(tipo_pessoa) {
  if (tipo_pessoa == "F") {
    return hAPI.getCardValue("CPF_fin");
  }
  if (tipo_pessoa == "J") {
    return hAPI.getCardValue("CNPJ_fin");
  }
}
