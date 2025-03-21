function enableFields(form) {
  var activity = getValue("WKNumState");
  var user = getValue("WKUser");
  var table_rateio_ccusto_indexes = form.getChildrenIndexes("table_rateio_ccusto");
  var table_rateio_ccusto_fin_indexes = form.getChildrenIndexes("table_rateio_ccusto_fin");
  var indexes_fin = form.getChildrenIndexes("table_rateio_ccusto_fin");

  try {
    if (user == "suporte.fluig" || user == "suporte2.fluig" || user != "admin") {
    }

    /* ETAPA 000 | 004 - INICIO */
    if (activity == 4 || activity == 0) {
      form.setEnabled("numero_solicitacao", false);
      form.setEnabled("numero_solicitacao_principal", false);
      form.setEnabled("solicitante", false);
    }

    /** Negações */

    if (activity != 4 && activity != 0 && activity != 34) {
      form.setEnabled("viewport", false);
      form.setEnabled("createFormComponents", false);
      form.setEnabled("numero_solicitacao", false);
      form.setEnabled("solicitante", false);
      form.setEnabled("empresa", false);
      form.setEnabled("coligada", false);
      form.setEnabled("centro_de_custo", false);
      form.setEnabled("setor_solicitante", false);
      form.setEnabled("filial", false);
      form.setEnabled("urgencia_solicitacao", false);
      form.setEnabled("titulo_solicitacao", false);
      form.setEnabled("descricao_solicitacao", false);
      form.setEnabled("data_vencimento", false);
      form.setEnabled("responsavel_solicitacao", false);
      form.setEnabled("email_solicitante", false);
      form.setEnabled("copia_email_solicitante", false);
      form.setEnabled("teve_juros", false);
      form.setEnabled("valor_original", false);
      form.setEnabled("valor_juros", false);
      form.setEnabled("Valor", false);
      form.setEnabled("anexo_as", false);
      form.setEnabled("fnInsertAnexoAs", false);
      form.setEnabled("fornecedor_cadastrado", false);
      form.setEnabled("vincular_fornecedor", false);
      form.setEnabled("dados_pagamento", false);
      form.setEnabled("cod_boleto", false);
      form.setEnabled("cliente_global", false);
      form.setEnabled("data_nascimento", false);
      form.setEnabled("estado_civil", false);
      form.setEnabled("nome_social", false);
      form.setEnabled("nome", false);
      form.setEnabled("classificacao", false);
      form.setEnabled("categoria", false);
      form.setEnabled("CPF", false);
      form.setEnabled("CNPJ", false);
      form.setEnabled("tipo_cliente_forn", false);
      form.setEnabled("nome_cliente_forn", false);
      form.setEnabled("status_tipo_cliente", false);
      form.setEnabled("CEP", false);
      form.setEnabled("tipo_rua", false);
      form.setEnabled("rua", false);
      form.setEnabled("numero", false);
      form.setEnabled("complemento", false);
      form.setEnabled("tipo_bairro", false);
      form.setEnabled("bairro", false);
      form.setEnabled("id_pais", false);
      form.setEnabled("pais", false);
      form.setEnabled("sigla_estado", false);
      form.setEnabled("nome_estado", false);
      form.setEnabled("telefone", false);
      form.setEnabled("celular", false);
      form.setEnabled("telefone_comercial", false);
      form.setEnabled("fax", false);
      form.setEnabled("fax_dedicado", false);
      form.setEnabled("email", false);
      form.setEnabled("contato", false);
      form.setEnabled("dados_bancarios_ativo", false);
      form.setEnabled("cad_referencia", false);
      form.setEnabled("descricao", false);
      form.setEnabled("filial_d_bancarios", false);
      form.setEnabled("nome_filial_d_banc", false);
      form.setEnabled("forma_pagamento", false);
      form.setEnabled("banco", false);
      form.setEnabled("agencia", false);
      form.setEnabled("digito", false);
      form.setEnabled("nome_agencia", false);
      form.setEnabled("conta_corrente", false);
      form.setEnabled("digito_conta_corrente", false);
      form.setEnabled("tipo_conta", false);
      form.setEnabled("camara_comp", false);
      form.setEnabled("favorecido", false);
      form.setEnabled("CpfCnpj_favorecido", false);
      form.setEnabled("tipo_chave_pix", false);
      form.setEnabled("chave_CPF", false);
      form.setEnabled("chave_CNPJ", false);
      form.setEnabled("chave_email", false);
      form.setEnabled("chave_celular", false);
      form.setEnabled("chave_aleatoria", false);
      for (var index = 0; index < table_rateio_ccusto_indexes.length; index++) {
        var pos = table_rateio_ccusto_indexes[index];
        form.setEnabled("coluna_natureza___" + pos, false);
        form.setEnabled("coluna_ccusto___" + pos, false);
        form.setEnabled("coluna_valor___" + pos, false);
        form.setEnabled("coluna_percentual___" + pos, false);
      }
      form.setEnabled("valor_total_rateio", false);
    }

    if (activity != 7) {
      form.setEnabled("aprovacao_gestor", false);
      form.setEnabled("mensagem_cancel_gestor", false);
    }

    if (activity != 12) {
      form.setEnabled("aprovacao_diretoria", false);
      form.setEnabled("mensagem_cancel_diretoria", false);
    }

    if (activity != 14) {
      form.setEnabled("dados_conformidade", false);
      form.setEnabled("mensagem_solicitacao_ajustes", false);

      for (var index = 0; index < table_rateio_ccusto_fin_indexes.length; index++) {
        var pos = table_rateio_ccusto_fin_indexes[index];
        form.setEnabled("coluna_natureza_fin" + "___" + pos, false);
        form.setEnabled("coluna_ccusto_fin" + "___" + pos, false);
        form.setEnabled("coluna_valor_fin" + "___" + pos, false);
        form.setEnabled("coluna_percentual_fin" + "___" + pos, false);
      }
      form.setEnabled("valor_total_rateio_fin", false);
    }

    if (activity != 14 && activity != 274 && activity != 216 && activity != 295) {
      form.setEnabled("cliente_global_fin", false);
      form.setEnabled("data_nascimento_fin", false);
      form.setEnabled("estado_civil_fin", false);
      form.setEnabled("nome_social_fin", false);
      form.setEnabled("nome_fin", false);
      form.setEnabled("classificacao_fin", false);
      form.setEnabled("classificacao_fin", false);
      form.setEnabled("classificacao_fin", false);
      form.setEnabled("categoria_fin", false);
      form.setEnabled("categoria_fin", false);
      form.setEnabled("CPF_fin", false);
      form.setEnabled("CNPJ_fin", false);
      form.setEnabled("tipo_cliente_forn_fin", false);
      form.setEnabled("nome_cliente_forn_fin", false);
      form.setEnabled("status_tipo_cliente_fin", false);
      form.setEnabled("status_tipo_cliente_fin", false);
      form.setEnabled("CEP_fin", false);
      form.setEnabled("tipo_rua_fin", false);
      form.setEnabled("rua_fin", false);
      form.setEnabled("numero_fin", false);
      form.setEnabled("complemento_fin", false);
      form.setEnabled("tipo_bairro_fin", false);
      form.setEnabled("bairro_fin", false);
      form.setEnabled("id_pais_fin", false);
      form.setEnabled("pais_fin", false);
      form.setEnabled("sigla_estado_fin", false);
      form.setEnabled("nome_estado_fin", false);
      form.setEnabled("telefone_fin", false);
      form.setEnabled("celular_fin", false);
      form.setEnabled("telefone_comercial_fin", false);
      form.setEnabled("fax_fin", false);
      form.setEnabled("fax_dedicado_fin", false);
      form.setEnabled("email_fin", false);
      form.setEnabled("contato_fin", false);
      form.setEnabled("dados_bancarios_ativo_fin", false);
      form.setEnabled("cad_referencia_fin", false);
      form.setEnabled("descricao_fin", false);
      form.setEnabled("filial_d_bancarios_fin", false);
      form.setEnabled("nome_filial_d_banc_fin", false);
      form.setEnabled("forma_pagamento_fin", false);
      form.setEnabled("banco_fin", false);
      form.setEnabled("agencia_fin", false);
      form.setEnabled("digito_fin", false);
      form.setEnabled("nome_agencia_fin", false);
      form.setEnabled("conta_corrente_fin", false);
      form.setEnabled("digito_conta_corrente_fin", false);
      form.setEnabled("tipo_conta_fin", false);
      form.setEnabled("camara_comp_fin", false);
      form.setEnabled("favorecido_fin", false);
      form.setEnabled("CpfCnpj_favorecido_fin", false);
      form.setEnabled("tipo_chave_pix_fin", false);
      form.setEnabled("chave_CPF_fin", false);
      form.setEnabled("chave_CNPJ_fin", false);
      form.setEnabled("chave_email_fin", false);
      form.setEnabled("chave_celular_fin", false);
      form.setEnabled("chave_aleatoria_fin", false);
    }

    if (activity != 4 && activity != 0 && activity != 14 && activity != 274 && activity != 216 && activity != 295) {
      form.setEnabled("vincular_fornecedor_analise", false);
      form.setEnabled("dados_pagamento_analise", false);

      form.setEnabled("dados_conformidade", false);
      form.setEnabled("pagar_receber", false);
      form.setEnabled("filial_analise", false);
      form.setEnabled("nome_filial_analise", false);
      form.setEnabled("referencia_analise", false);
      form.setEnabled("nome_cli_fornecedor_analise", false);
      form.setEnabled("CpfCnpj_analise", false);
      form.setEnabled("cod_boleto_analise", false);
      form.setEnabled("tipo_documento_analise", false);
      form.setEnabled("nome_tipo_documento", false);
      form.setEnabled("numero_documento_analise", false);
      form.setEnabled("segundo_numero_analise", false);
      form.setEnabled("data_emissao_analise", false);
      form.setEnabled("data_vencimento_analise", false);
      form.setEnabled("data_baixa_analise", false);
      form.setEnabled("data_previa_baixa_analise", false);
      form.setEnabled("historico_analise", false);
      form.setEnabled("serie_documento_analise", false);
      form.setEnabled("valor_original_analise", false);
      form.setEnabled("tipo_moeda", false);
      form.setEnabled("indexador_analise", false);
      form.setEnabled("nome_indexador_analise", false);
      form.setEnabled("valor_baixado_analise", false);
      form.setEnabled("conta_caixa_analise", false);
      form.setEnabled("nome_conta_analise", false);
      form.setEnabled("desconto_analise", false);
      form.setEnabled("percentual_desc_analise", false);
      form.setEnabled("formula_analise", false);
      form.setEnabled("convenio_analise", false);
      form.setEnabled("nome_convenio_analise", false);
      form.setEnabled("juros_analise", false);
      form.setEnabled("percentual_juros_analise", false);
      form.setEnabled("formula_juros_analise", false);
      form.setEnabled("juros_dia_analise", false);
      form.setEnabled("juros_dia_analise", false);
      form.setEnabled("taxa_valor_analise", false);
      form.setEnabled("carencia_juros_analise", false);
      form.setEnabled("multa_analise", false);
      form.setEnabled("percentual_multa_analise", false);
      form.setEnabled("formula_multa_analise", false);
      form.setEnabled("multa_dia_analise", false);
      form.setEnabled("data_valor_liquido", false);
      form.setEnabled("valor_liquido", false);
      form.setEnabled("capitalizacao_analise", false);
      form.setEnabled("percentual_cap_analise", false);
      form.setEnabled("formula_cap_analise", false);
      form.setEnabled("cap_mensal_analise", false);
      form.setEnabled("tipo_contabil", false);
      form.setEnabled("status_liquidacao", false);
      form.setEnabled("seleciona_fase_envio", false);
      form.setEnabled("solicitacao_mult_analise", false);
    }

    /** Todos os campos  */
    if (true == false) {

      form.setEnabled("viewport", false);
      form.setEnabled("createFormComponents", false);
      form.setEnabled("numero_solicitacao", false);
      form.setEnabled("solicitante", false);
      form.setEnabled("empresa", false);
      form.setEnabled("coligada", false);
      form.setEnabled("centro_de_custo", false);
      form.setEnabled("setor_solicitante", false);
      form.setEnabled("filial", false);
      form.setEnabled("urgencia_solicitacao", false);
      form.setEnabled("titulo_solicitacao", false);
      form.setEnabled("descricao_solicitacao", false);
      form.setEnabled("data_vencimento", false);
      form.setEnabled("responsavel_solicitacao", false);
      form.setEnabled("email_solicitante", false);
      form.setEnabled("copia_email_solicitante", false);
      form.setEnabled("teve_juros", false);
      form.setEnabled("teve_juros", false);
      form.setEnabled("valor_original", false);
      form.setEnabled("valor_juros", false);
      form.setEnabled("Valor", false);
      form.setEnabled("anexo_as", false);
      form.setEnabled("fnInsertAnexoAs", false);
      form.setEnabled("anexo_as___1", false);
      form.setEnabled("fnInsertAnexoAs___1", false);
      form.setEnabled("fornecedor_cadastrado", false);
      form.setEnabled("fornecedor_cadastrado", false);
      form.setEnabled("vincular_fornecedor", false);
      form.setEnabled("dados_pagamento", false);
      form.setEnabled("cod_boleto", false);
      form.setEnabled("cliente_global", false);
      form.setEnabled("data_nascimento", false);
      form.setEnabled("estado_civil", false);
      form.setEnabled("nome_social", false);
      form.setEnabled("nome", false);
      form.setEnabled("classificacao", false);
      form.setEnabled("classificacao", false);
      form.setEnabled("classificacao", false);
      form.setEnabled("categoria", false);
      form.setEnabled("categoria", false);
      form.setEnabled("CPF", false);
      form.setEnabled("CNPJ", false);
      form.setEnabled("tipo_cliente_forn", false);
      form.setEnabled("nome_cliente_forn", false);
      form.setEnabled("status_tipo_cliente", false);
      form.setEnabled("status_tipo_cliente", false);
      form.setEnabled("CEP", false);
      form.setEnabled("tipo_rua", false);
      form.setEnabled("rua", false);
      form.setEnabled("numero", false);
      form.setEnabled("complemento", false);
      form.setEnabled("tipo_bairro", false);
      form.setEnabled("bairro", false);
      form.setEnabled("id_pais", false);
      form.setEnabled("pais", false);
      form.setEnabled("sigla_estado", false);
      form.setEnabled("nome_estado", false);
      form.setEnabled("telefone", false);
      form.setEnabled("celular", false);
      form.setEnabled("telefone_comercial", false);
      form.setEnabled("fax", false);
      form.setEnabled("fax_dedicado", false);
      form.setEnabled("email", false);
      form.setEnabled("contato", false);
      form.setEnabled("dados_bancarios_ativo", false);
      form.setEnabled("cad_referencia", false);
      form.setEnabled("descricao", false);
      form.setEnabled("filial_d_bancarios", false);
      form.setEnabled("nome_filial_d_banc", false);
      form.setEnabled("forma_pagamento", false);
      form.setEnabled("banco", false);
      form.setEnabled("agencia", false);
      form.setEnabled("digito", false);
      form.setEnabled("nome_agencia", false);
      form.setEnabled("conta_corrente", false);
      form.setEnabled("digito_conta_corrente", false);
      form.setEnabled("tipo_conta", false);
      form.setEnabled("camara_comp", false);
      form.setEnabled("favorecido", false);
      form.setEnabled("CpfCnpj_favorecido", false);
      form.setEnabled("tipo_chave_pix", false);
      form.setEnabled("chave_CPF", false);
      form.setEnabled("chave_CNPJ", false);
      form.setEnabled("chave_email", false);
      form.setEnabled("chave_celular", false);
      form.setEnabled("chave_aleatoria", false);
      form.setEnabled("valor_total_rateio", false);

      form.setEnabled("aprovacao_gestor", false);
      form.setEnabled("mensagem_cancel_gestor", false);

      form.setEnabled("aprovacao_diretoria", false);
      form.setEnabled("mensagem_cancel_diretoria", false);

      form.setEnabled("cliente_global_fin", false);
      form.setEnabled("data_nascimento_fin", false);
      form.setEnabled("estado_civil_fin", false);
      form.setEnabled("nome_social_fin", false);
      form.setEnabled("nome_fin", false);
      form.setEnabled("classificacao_fin", false);
      form.setEnabled("classificacao_fin", false);
      form.setEnabled("classificacao_fin", false);
      form.setEnabled("categoria_fin", false);
      form.setEnabled("categoria_fin", false);
      form.setEnabled("CPF_fin", false);
      form.setEnabled("CNPJ_fin", false);
      form.setEnabled("tipo_cliente_forn_fin", false);
      form.setEnabled("nome_cliente_forn_fin", false);
      form.setEnabled("status_tipo_cliente_fin", false);
      form.setEnabled("status_tipo_cliente_fin", false);
      form.setEnabled("CEP_fin", false);
      form.setEnabled("tipo_rua_fin", false);
      form.setEnabled("rua_fin", false);
      form.setEnabled("numero_fin", false);
      form.setEnabled("complemento_fin", false);
      form.setEnabled("tipo_bairro_fin", false);
      form.setEnabled("bairro_fin", false);
      form.setEnabled("id_pais_fin", false);
      form.setEnabled("pais_fin", false);
      form.setEnabled("sigla_estado_fin", false);
      form.setEnabled("nome_estado_fin", false);
      form.setEnabled("telefone_fin", false);
      form.setEnabled("celular_fin", false);
      form.setEnabled("telefone_comercial_fin", false);
      form.setEnabled("fax_fin", false);
      form.setEnabled("fax_dedicado_fin", false);
      form.setEnabled("email_fin", false);
      form.setEnabled("contato_fin", false);
      form.setEnabled("dados_bancarios_ativo_fin", false);
      form.setEnabled("cad_referencia_fin", false);
      form.setEnabled("descricao_fin", false);
      form.setEnabled("filial_d_bancarios_fin", false);
      form.setEnabled("nome_filial_d_banc_fin", false);
      form.setEnabled("forma_pagamento_fin", false);
      form.setEnabled("banco_fin", false);
      form.setEnabled("agencia_fin", false);
      form.setEnabled("digito_fin", false);
      form.setEnabled("nome_agencia_fin", false);
      form.setEnabled("conta_corrente_fin", false);
      form.setEnabled("digito_conta_corrente_fin", false);
      form.setEnabled("tipo_conta_fin", false);
      form.setEnabled("camara_comp_fin", false);
      form.setEnabled("favorecido_fin", false);
      form.setEnabled("CpfCnpj_favorecido_fin", false);
      form.setEnabled("tipo_chave_pix_fin", false);
      form.setEnabled("chave_CPF_fin", false);
      form.setEnabled("chave_CNPJ_fin", false);
      form.setEnabled("chave_email_fin", false);
      form.setEnabled("chave_celular_fin", false);
      form.setEnabled("chave_aleatoria_fin", false);


      form.setEnabled("dados_conformidade", false);
      form.setEnabled("pagar_receber", false);
      form.setEnabled("filial_analise", false);
      form.setEnabled("nome_filial_analise", false);
      form.setEnabled("referencia_analise", false);
      form.setEnabled("vincular_fornecedor_analise", false);
      form.setEnabled("dados_pagamento_analise", false);
      form.setEnabled("nome_cli_fornecedor_analise", false);
      form.setEnabled("CpfCnpj_analise", false);
      form.setEnabled("cod_boleto_analise", false);
      form.setEnabled("tipo_documento_analise", false);
      form.setEnabled("nome_tipo_documento", false);
      form.setEnabled("numero_documento_analise", false);
      form.setEnabled("segundo_numero_analise", false);
      form.setEnabled("data_emissao_analise", false);
      form.setEnabled("data_vencimento_analise", false);
      form.setEnabled("data_baixa_analise", false);
      form.setEnabled("data_previa_baixa_analise", false);
      form.setEnabled("historico_analise", false);
      form.setEnabled("serie_documento_analise", false);
      form.setEnabled("valor_original_analise", false);
      form.setEnabled("tipo_moeda", false);
      form.setEnabled("indexador_analise", false);
      form.setEnabled("nome_indexador_analise", false);
      form.setEnabled("valor_baixado_analise", false);
      form.setEnabled("conta_caixa_analise", false);
      form.setEnabled("nome_conta_analise", false);
      form.setEnabled("desconto_analise", false);
      form.setEnabled("percentual_desc_analise", false);
      form.setEnabled("formula_analise", false);
      form.setEnabled("convenio_analise", false);
      form.setEnabled("nome_convenio_analise", false);
      form.setEnabled("juros_analise", false);
      form.setEnabled("percentual_juros_analise", false);
      form.setEnabled("formula_juros_analise", false);
      form.setEnabled("juros_dia_analise", false);
      form.setEnabled("juros_dia_analise", false);
      form.setEnabled("taxa_valor_analise", false);
      form.setEnabled("carencia_juros_analise", false);
      form.setEnabled("multa_analise", false);
      form.setEnabled("percentual_multa_analise", false);
      form.setEnabled("formula_multa_analise", false);
      form.setEnabled("multa_dia_analise", false);
      form.setEnabled("data_valor_liquido", false);
      form.setEnabled("valor_liquido", false);
      form.setEnabled("capitalizacao_analise", false);
      form.setEnabled("percentual_cap_analise", false);
      form.setEnabled("formula_cap_analise", false);
      form.setEnabled("cap_mensal_analise", false);
      form.setEnabled("tipo_contabil", false);
      form.setEnabled("status_liquidacao", false);
      form.setEnabled("seleciona_fase_envio", false);
      form.setEnabled("solicitacao_mult_analise", false);
      form.setEnabled("coluna_natureza_fin", false);
      form.setEnabled("coluna_ccusto_fin", false);
      form.setEnabled("coluna_valor_fin", false);
      form.setEnabled("coluna_percentual_fin", false);
      form.setEnabled("coluna_natureza_fin___1", false);
      form.setEnabled("coluna_ccusto_fin___1", false);
      form.setEnabled("coluna_valor_fin___1", false);
      form.setEnabled("coluna_percentual_fin___1", false);
      form.setEnabled("valor_total_rateio_fin", false);


      form.setEnabled("mensagem_solicitacao_ajustes", false);
      form.setEnabled("data_vencimento_av", false);
      form.setEnabled("data_pagamento_av", false);
      form.setEnabled("anexo_av", false);
      form.setEnabled("fnInsertAnexoAv", false);
      form.setEnabled("pagamento_realizado_pu", false);
      form.setEnabled("teve_juros_pu", false);
      form.setEnabled("teve_juros_pu", false);
      form.setEnabled("valor_original_pu", false);
      form.setEnabled("valor_juros_pu", false);
      form.setEnabled("valor_pu", false);
      form.setEnabled("data_vencimento_pu", false);
      form.setEnabled("data_pagamento_pu", false);
      form.setEnabled("anexo_pu", false);
      form.setEnabled("fnInsertAnexoPu", false);
      form.setEnabled("pagamento_realizado_pp", false);
      form.setEnabled("teve_juros_pp", false);
      form.setEnabled("teve_juros_pp", false);
      form.setEnabled("valor_original_pp", false);
      form.setEnabled("valor_juros_pp", false);
      form.setEnabled("valor_inicial_pp", false);
      form.setEnabled("valor_final_pp", false);
      form.setEnabled("data_vencimento_pp", false);
      form.setEnabled("data_pagamento_pp", false);
      form.setEnabled("anexo_pp", false);
      form.setEnabled("fnInsertAnexoPp", false);
      form.setEnabled("hidden_codigo_cli_for", false);
      form.setEnabled("hidden_coligada_cli_for", false);
      form.setEnabled("CODCOLIGADA", false);
      form.setEnabled("CODFILIAL", false);
      form.setEnabled("SETORSOLICITANTE", false);
      form.setEnabled("hidden_telefone", false);
      form.setEnabled("hidden_desc_fpgmto", false);
      form.setEnabled("hidden_forma_pgmto", false);
      form.setEnabled("hidden_valor_original", false);
      form.setEnabled("hidden_valor_baixado", false);
      form.setEnabled("hidden_valor_cap", false);
      form.setEnabled("hidden_valor_juros", false);
      form.setEnabled("hidden_valor_desconto", false);
      form.setEnabled("hidden_valor_multa", false);
      form.setEnabled("hidden_valor_carencia", false);
      form.setEnabled("hidden_data_vencimento", false);
      form.setEnabled("hidden_data_emissao", false);
      form.setEnabled("hidden_data_baixa", false);
      form.setEnabled("hidden_data_previabaixa", false);
      form.setEnabled("COD_PERIOD_EXPED", false);
      form.setEnabled("DATA_INICIO", false);
      form.setEnabled("NUM_HORA_INIC_PERIOD", false);
      form.setEnabled("DATA_FIM", false);
      form.setEnabled("NUM_HORA_FIM_PERIOD", false);
      form.setEnabled("hidden_filial_cc", false);
      form.setEnabled("hidden_numbanco", false);
      form.setEnabled("NUMEROBANCO", false);
      form.setEnabled("hidden_cnpj_fornecedor", false);
      form.setEnabled("hidden_dados_pgmt", false);
      form.setEnabled("CGCCFO", false);
      form.setEnabled("CGCCFO_analise", false);
      form.setEnabled("CODTDO", false);
      form.setEnabled("CODFILIAL_CODCXA", false);
      form.setEnabled("anexos", false);
      form.setEnabled("idLan", false);
      form.setEnabled("chave_pix_padrao", false);
      form.setEnabled("cTask007", false);
      form.setEnabled("zTask007", false);
      form.setEnabled("nTask007", false);
      form.setEnabled("cTask012", false);
      form.setEnabled("zTask012", false);
      form.setEnabled("nTask012", false);
      form.setEnabled("cTask014", false);
      form.setEnabled("zTask014", false);
      form.setEnabled("nTask014", false);
      form.setEnabled("cTask034", false);
      form.setEnabled("zTask034", false);
      form.setEnabled("nTask034", false);
      form.setEnabled("cTask097", false);
      form.setEnabled("zTask097", false);
      form.setEnabled("nTask097", false);
      form.setEnabled("cTask127", false);
      form.setEnabled("zTask127", false);
      form.setEnabled("nTask127", false);
      form.setEnabled("cTask128", false);
      form.setEnabled("zTask128", false);
      form.setEnabled("nTask128", false);
      form.setEnabled("cTask216", false);
      form.setEnabled("zTask216", false);
      form.setEnabled("nTask216", false);
      form.setEnabled("cTask221", false);
      form.setEnabled("zTask221", false);
      form.setEnabled("nTask221", false);
      form.setEnabled("cTask223", false);
      form.setEnabled("zTask223", false);
      form.setEnabled("nTask223", false);
      form.setEnabled("cTask274", false);
      form.setEnabled("zTask274", false);
      form.setEnabled("nTask274", false);
      form.setEnabled("cTask295", false);
      form.setEnabled("zTask295", false);
      form.setEnabled("nTask295", false);
    }


    /** Tratar erro - Habilita todos os campos */
    if (activity == 223 || activity == 295 || activity == 216 || activity == 221) {
      var datasetDs_G5 = DatasetFactory.getDataset('ds_G5', null, new Array(
        DatasetFactory.createConstraint('documentid', form.getDocumentId(), form.getDocumentId(), ConstraintType.MUST)
      ), null);
      var colunas = datasetDs_G5.getColumnsName();
      for (var index = 0; index < colunas.length; index++) {
        var campo = colunas[index];
        form.setEnabled(campo, true);
      }
      for (var index2 = 0; index2 < table_rateio_ccusto_indexes.length; index2++) {
        var campoId = table_rateio_ccusto_indexes[index2];
        form.setEnabled("coluna_natureza" + "___" + campoId, true);
        form.setEnabled("coluna_ccusto" + "___" + campoId, true);
        form.setEnabled("coluna_valor" + "___" + campoId, true);
        form.setEnabled("coluna_percentual" + "___" + campoId, true);
      }
      for (var index3 = 0; index3 < table_rateio_ccusto_fin_indexes.length; index3++) {
        var campoId = table_rateio_ccusto_fin_indexes[index3];
        form.setEnabled("coluna_natureza_fin" + "___" + campoId, true);
        form.setEnabled("coluna_ccusto_fin" + "___" + campoId, true);
        form.setEnabled("coluna_valor_fin" + "___" + campoId, true);
        form.setEnabled("coluna_percentual_fin" + "___" + campoId, true);
      }
    }
  } catch (error) {
    log.info("error");
  }
}