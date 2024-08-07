function enableFields(form) {
  var activity = getValue("WKNumState");
  var user = getValue("WKUser");
  var indexes = form.getChildrenIndexes("table_rateio_ccusto");
  var indexes_fin = form.getChildrenIndexes("table_rateio_ccusto_fin");

  if (user == "suporte.fluig" || user == "suporte2.fluig" || user != "admin") {
  }

  try {
    /* ETAPA 000 | 004 - INICIO */
    if (activity == 4 || activity == 0) {
      form.setEnabled("numero_solicitacao", false);
      form.setEnabled("numero_solicitacao_principal", false);
      form.setEnabled("solicitante", false);

      /* ETAPA 007 - APROVAÇÃO GESTOR */
    } else if (activity == 7) {
      /* SECTION CABEÇALHO*/
      form.setEnabled("numero_solicitacao", false);
      form.setEnabled("numero_solicitacao_principal", false);
      form.setEnabled("solicitante", false);
      form.setEnabled("coligada", false);
      form.setEnabled("empresa", false);
      form.setEnabled("filial", false);
      form.setEnabled("centro_de_custo", false);
      form.setEnabled("setor_solicitante", false);
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

      /* SECTION DADOS DO FORNECEDOR */
      form.setEnabled("fornecedor_cadastrado", false);
      form.setEnabled("fornecedor_dados", false);
      form.setEnabled("vincular_fornecedor", false);
      form.setEnabled("dados_pagamento", false);
      form.setEnabled("cod_boleto", false);

      /* SECTION CADASTRO DE FORNECEDOR */
      form.setEnabled("cliente_global", false);
      form.setEnabled("data_nascimento", false);
      form.setEnabled("estado_civil", false);
      form.setEnabled("nome_social", false);
      form.setEnabled("nome", false);
      form.setEnabled("classificacao", false);
      form.setEnabled("categoria", false);
      form.setEnabled("CPF", false);
      form.setEnabled("CNPJ", false);
      form.setEnabled("inscricao_estadual", false);
      form.setEnabled("inscricao_municipal", false);
      form.setEnabled("tipo_cliente_forn", false);
      form.setEnabled("nome_cliente_forn", false);
      form.setEnabled("status_tipo_cliente", false);
      form.setEnabled("identidade", false);
      form.setEnabled("orgao_emissor", false);
      form.setEnabled("estado_emissor", false);
      form.setEnabled("numero_dependentes", false);
      form.setEnabled("aposen_pensionista", false);
      form.setEnabled("nacionalidade", false);
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
      form.setEnabled("codigo_municipio", false);
      form.setEnabled("nome_municipio", false);
      form.setEnabled("caixa_postal", false);
      form.setEnabled("cep_caixa_postal", false);
      form.setEnabled("telefone", false);
      form.setEnabled("celular", false);
      form.setEnabled("telefone_comercial", false);
      form.setEnabled("fax", false);
      form.setEnabled("fax_dedicado", false);
      form.setEnabled("email", false);
      form.setEnabled("contato", false);

      /* SECTION DADOS BANCARIOS */
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
      form.setEnabled("CpfCnpj", false);
      form.setEnabled("tipo_chave_pix", false);
      form.setEnabled("chave_CPF", false);
      form.setEnabled("chave_CNPJ", false);
      form.setEnabled("chave_email", false);
      form.setEnabled("chave_celular", false);
      form.setEnabled("chave_aleatoria", false);
      form.setEnabled("tipo_doc", false);
      form.setEnabled("cod_finalidade", false);

      /* DADOS DEFAULT*/
      form.setEnabled("classificacao_default", false);
      form.setEnabled("nome_cli_fornecedor_default", false);
      form.setEnabled("filial_default", false);
      form.setEnabled("nome_filial_default", false);
      form.setEnabled("dados_banc_default", false);
      form.setEnabled("nome_dados_banc_default", false);
      form.setEnabled("cadastro_forn_totvs", false);

      /* SECTION RATEIO */
      toggleTabelaRateio(form, indexes, false);
      /* ETAPA 012 - APROVAÇÃO DIRETORIA */
    } else if (activity == 12) {
      /* SECTION CABEÇALHO*/
      form.setEnabled("numero_solicitacao", false);
      form.setEnabled("numero_solicitacao_principal", false);
      form.setEnabled("solicitante", false);
      form.setEnabled("coligada", false);
      form.setEnabled("empresa", false);
      form.setEnabled("filial", false);
      form.setEnabled("centro_de_custo", false);
      form.setEnabled("setor_solicitante", false);
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

      /* SECTION DADOS DO FORNECEDOR */
      form.setEnabled("fornecedor_cadastrado", false);
      form.setEnabled("fornecedor_dados", false);
      form.setEnabled("vincular_fornecedor", false);
      form.setEnabled("dados_pagamento", false);
      form.setEnabled("cod_boleto", false);

      /* SECTION CADASTRO DE FORNECEDOR */
      form.setEnabled("cliente_global", false);
      form.setEnabled("data_nascimento", false);
      form.setEnabled("estado_civil", false);
      form.setEnabled("nome_social", false);
      form.setEnabled("nome", false);
      form.setEnabled("classificacao", false);
      form.setEnabled("categoria", false);
      form.setEnabled("CPF", false);
      form.setEnabled("CNPJ", false);
      form.setEnabled("inscricao_estadual", false);
      form.setEnabled("inscricao_municipal", false);
      form.setEnabled("tipo_cliente_forn", false);
      form.setEnabled("nome_cliente_forn", false);
      form.setEnabled("status_tipo_cliente", false);
      form.setEnabled("identidade", false);
      form.setEnabled("orgao_emissor", false);
      form.setEnabled("estado_emissor", false);
      form.setEnabled("numero_dependentes", false);
      form.setEnabled("aposen_pensionista", false);
      form.setEnabled("nacionalidade", false);
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
      form.setEnabled("codigo_municipio", false);
      form.setEnabled("nome_municipio", false);
      form.setEnabled("caixa_postal", false);
      form.setEnabled("cep_caixa_postal", false);
      form.setEnabled("telefone", false);
      form.setEnabled("celular", false);
      form.setEnabled("telefone_comercial", false);
      form.setEnabled("fax", false);
      form.setEnabled("fax_dedicado", false);
      form.setEnabled("email", false);
      form.setEnabled("contato", false);

      /* SECTION DADOS BANCARIOS */
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
      form.setEnabled("CpfCnpj", false);
      form.setEnabled("tipo_chave_pix", false);
      form.setEnabled("chave_CPF", false);
      form.setEnabled("chave_CNPJ", false);
      form.setEnabled("chave_email", false);
      form.setEnabled("chave_celular", false);
      form.setEnabled("chave_aleatoria", false);
      form.setEnabled("tipo_doc", false);
      form.setEnabled("cod_finalidade", false);

      /* DADOS DEFAULT*/
      form.setEnabled("classificacao_default", false);
      form.setEnabled("nome_cli_fornecedor_default", false);
      form.setEnabled("filial_default", false);
      form.setEnabled("nome_filial_default", false);
      form.setEnabled("dados_banc_default", false);
      form.setEnabled("nome_dados_banc_default", false);
      form.setEnabled("cadastro_forn_totvs", false);


      /* SECTION RATEIO */
      toggleTabelaRateio(form, indexes, false);
      /* ETAPA 014 - PROVISIONAMENTO */
    } else if (activity == 14) {
      /* SECTION CABEÇALHO*/
      form.setEnabled("numero_solicitacao", false);
      form.setEnabled("numero_solicitacao_principal", false);
      form.setEnabled("solicitante", false);
      form.setEnabled("coligada", false);
      form.setEnabled("empresa", false);
      form.setEnabled("filial", false);
      form.setEnabled("centro_de_custo", false);
      form.setEnabled("setor_solicitante", false);
      form.setEnabled("urgencia_solicitacao", false);
      form.setEnabled("titulo_solicitacao", false);
      form.setEnabled("descricao_solicitacao", false);
      form.setEnabled("data_vencimento", true);
      form.setEnabled("responsavel_solicitacao", false);
      form.setEnabled("email_solicitante", false);
      form.setEnabled("copia_email_solicitante", false);
      form.setEnabled("teve_juros", false);
      form.setEnabled("valor_original", false);
      form.setEnabled("valor_juros", false);
      form.setEnabled("Valor", false);

      /* SECTION DADOS DO FORNECEDOR */
      form.setEnabled("fornecedor_cadastrado", false);
      form.setEnabled("fornecedor_dados", false);
      form.setEnabled("vincular_fornecedor", false);
      form.setEnabled("dados_pagamento", false);
      form.setEnabled("cod_boleto", false);

      /* SECTION CADASTRO DE FORNECEDOR */
      form.setEnabled("cliente_global", false);
      form.setEnabled("data_nascimento", false);
      form.setEnabled("estado_civil", false);
      form.setEnabled("nome_social", false);
      form.setEnabled("nome", false);
      form.setEnabled("classificacao", false);
      form.setEnabled("categoria", false);
      form.setEnabled("CPF", false);
      form.setEnabled("CNPJ", false);
      form.setEnabled("inscricao_estadual", false);
      form.setEnabled("inscricao_municipal", false);
      form.setEnabled("tipo_cliente_forn", false);
      form.setEnabled("nome_cliente_forn", false);
      form.setEnabled("status_tipo_cliente", false);
      form.setEnabled("identidade", false);
      form.setEnabled("orgao_emissor", false);
      form.setEnabled("estado_emissor", false);
      form.setEnabled("numero_dependentes", false);
      form.setEnabled("aposen_pensionista", false);
      form.setEnabled("nacionalidade", false);
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
      form.setEnabled("codigo_municipio", false);
      form.setEnabled("nome_municipio", false);
      form.setEnabled("caixa_postal", false);
      form.setEnabled("cep_caixa_postal", false);
      form.setEnabled("telefone", false);
      form.setEnabled("celular", false);
      form.setEnabled("telefone_comercial", false);
      form.setEnabled("fax", false);
      form.setEnabled("fax_dedicado", false);
      form.setEnabled("email", false);
      form.setEnabled("contato", false);

      /* SECTION DADOS BANCARIOS */
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
      form.setEnabled("CpfCnpj", false);
      form.setEnabled("tipo_chave_pix", false);
      form.setEnabled("chave_CPF", false);
      form.setEnabled("chave_CNPJ", false);
      form.setEnabled("chave_email", false);
      form.setEnabled("chave_celular", false);
      form.setEnabled("chave_aleatoria", false);
      form.setEnabled("tipo_doc", false);
      form.setEnabled("cod_finalidade", false);


      /* SECTION DADOS DO FORNECEDOR - FINANCEIRO */
      form.setEnabled("cliente_global_fin", false);
      form.setEnabled("data_nascimento_fin", false);
      form.setEnabled("estado_civil_fin", false);
      form.setEnabled("nome_social_fin", false);
      form.setEnabled("nome_fin", false);
      form.setEnabled("classificacao_fin", false);
      form.setEnabled("categoria_fin", false);
      form.setEnabled("CPF_fin", false);
      form.setEnabled("CNPJ_fin", false);
      form.setEnabled("inscricao_estadual_fin", false);
      form.setEnabled("inscricao_municipal_fin", false);
      form.setEnabled("tipo_cliente_forn_fin", false);
      form.setEnabled("nome_cliente_forn_fin", false);
      form.setEnabled("status_tipo_cliente_fin", false);
      form.setEnabled("identidade_fin", false);
      form.setEnabled("orgao_emissor_fin", false);
      form.setEnabled("estado_emissor_fin", false);
      form.setEnabled("numero_dependentes_fin", false);
      form.setEnabled("aposen_pensionista_fin", false);
      form.setEnabled("nacionalidade_fin", false);
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
      form.setEnabled("codigo_municipio_fin", false);
      form.setEnabled("nome_municipio_fin", false);
      form.setEnabled("caixa_postal_fin", false);
      form.setEnabled("cep_caixa_postal_fin", false);
      form.setEnabled("telefone_fin", false);
      form.setEnabled("celular_fin", false);
      form.setEnabled("telefone_comercial_fin", false);
      form.setEnabled("fax_fin", false);
      form.setEnabled("fax_dedicado_fin", false);
      form.setEnabled("email_fin", false);
      form.setEnabled("contato_fin", false);

      /* SECTION DADOS BANCARIOS */
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
      form.setEnabled("CpfCnpj_fin", false);
      form.setEnabled("tipo_chave_pix_fin", false);
      form.setEnabled("chave_CPF_fin", false);
      form.setEnabled("chave_CNPJ_fin", false);
      form.setEnabled("chave_email_fin", false);
      form.setEnabled("chave_celular_fin", false);
      form.setEnabled("chave_aleatoria_fin", false);
      form.setEnabled("tipo_doc_fin", false);
      form.setEnabled("cod_finalidade_fin", false);

      /* DADOS DEFAULT*/
      form.setEnabled("classificacao_default_fin", false);
      form.setEnabled("nome_cli_forn_default_fin", false);
      form.setEnabled("filial_default_fin", false);
      form.setEnabled("nome_filial_default_fin", false);
      form.setEnabled("dados_banc_default_fin", false);
      form.setEnabled("nome_dados_banc_default_fin", false);
      form.setEnabled("cadastro_forn_totvs_fin", false);


      /* SECTION RATEIO */
      toggleTabelaRateioFin(form, indexes_fin, false);
      toggleTabelaRateio(form, indexes, false);

      form.setEnabled("pagar_receber", false);
      form.setEnabled("filial_analise", false);
      /* ETAPA 034 - REVISAR SOLICITAÇÃO */
    } else if (activity == 34) {
      form.setEnabled("numero_solicitacao", false);
      form.setEnabled("numero_solicitacao_principal", false);
      form.setEnabled("solicitante", false);

      form.setEnabled("mensagem_solicitacao_ajustes", false);
      /* ETAPA 097 - AGUARDANDO VENCIMENTO */
    } else if (activity == 97) {
      /* SECTION CABEÇALHO*/
      form.setEnabled("numero_solicitacao", false);
      form.setEnabled("numero_solicitacao_principal", false);
      form.setEnabled("solicitante", false);
      form.setEnabled("coligada", false);
      form.setEnabled("empresa", false);
      form.setEnabled("filial", false);
      form.setEnabled("centro_de_custo", false);
      form.setEnabled("setor_solicitante", false);
      form.setEnabled("urgencia_solicitacao", false);
      form.setEnabled("titulo_solicitacao", false);
      form.setEnabled("descricao_solicitacao", false);
      form.setEnabled("data_vencimento", true);
      form.setEnabled("responsavel_solicitacao", false);
      form.setEnabled("email_solicitante", false);
      form.setEnabled("copia_email_solicitante", false);
      form.setEnabled("teve_juros", false);
      form.setEnabled("valor_original", false);
      form.setEnabled("valor_juros", false);
      form.setEnabled("Valor", false);

      /* ETAPA 127 - PAGAMENTO ÚNICO */
    } else if (activity == 127) {
      /* SECTION CABEÇALHO*/
      form.setEnabled("numero_solicitacao", false);
      form.setEnabled("numero_solicitacao_principal", false);
      form.setEnabled("solicitante", false);
      form.setEnabled("coligada", false);
      form.setEnabled("empresa", false);
      form.setEnabled("filial", false);
      form.setEnabled("centro_de_custo", false);
      form.setEnabled("setor_solicitante", false);
      form.setEnabled("urgencia_solicitacao", false);
      form.setEnabled("titulo_solicitacao", false);
      form.setEnabled("descricao_solicitacao", false);
      form.setEnabled("data_vencimento", true);
      form.setEnabled("responsavel_solicitacao", false);
      form.setEnabled("email_solicitante", false);
      form.setEnabled("copia_email_solicitante", false);
      form.setEnabled("teve_juros", false);
      form.setEnabled("valor_original", false);
      form.setEnabled("valor_juros", false);
      form.setEnabled("Valor", false);

      /* ETAPA 128 - PAGAMENTO PARCIAL */
    } else if (activity == 128) {
      /* SECTION CABEÇALHO*/
      form.setEnabled("numero_solicitacao", false);
      form.setEnabled("numero_solicitacao_principal", false);
      form.setEnabled("solicitante", false);
      form.setEnabled("coligada", false);
      form.setEnabled("empresa", false);
      form.setEnabled("filial", false);
      form.setEnabled("centro_de_custo", false);
      form.setEnabled("setor_solicitante", false);
      form.setEnabled("urgencia_solicitacao", false);
      form.setEnabled("titulo_solicitacao", false);
      form.setEnabled("descricao_solicitacao", false);
      form.setEnabled("data_vencimento", true);
      form.setEnabled("responsavel_solicitacao", false);
      form.setEnabled("email_solicitante", false);
      form.setEnabled("copia_email_solicitante", false);
      form.setEnabled("teve_juros", false);
      form.setEnabled("valor_original", false);
      form.setEnabled("valor_juros", false);
      form.setEnabled("Valor", false);
    } else if (activity == 274) {
      /* SECTION DADOS DO FORNECEDOR */
      form.setEnabled("fornecedor_cadastrado", false);
      form.setEnabled("fornecedor_dados", false);
      form.setEnabled("vincular_fornecedor", false);
      form.setEnabled("dados_pagamento", false);
      form.setEnabled("cod_boleto", false);

      /* SECTION CADASTRO DE FORNECEDOR */
      form.setEnabled("cliente_global", false);
      form.setEnabled("data_nascimento", false);
      form.setEnabled("estado_civil", false);
      form.setEnabled("nome_social", false);
      form.setEnabled("nome", false);
      form.setEnabled("classificacao", false);
      form.setEnabled("categoria", false);
      form.setEnabled("CPF", false);
      form.setEnabled("CNPJ", false);
      form.setEnabled("inscricao_estadual", false);
      form.setEnabled("inscricao_municipal", false);
      form.setEnabled("tipo_cliente_forn", false);
      form.setEnabled("nome_cliente_forn", false);
      form.setEnabled("status_tipo_cliente", false);
      form.setEnabled("identidade", false);
      form.setEnabled("orgao_emissor", false);
      form.setEnabled("estado_emissor", false);
      form.setEnabled("numero_dependentes", false);
      form.setEnabled("aposen_pensionista", false);
      form.setEnabled("nacionalidade", false);
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
      form.setEnabled("codigo_municipio", false);
      form.setEnabled("nome_municipio", false);
      form.setEnabled("caixa_postal", false);
      form.setEnabled("cep_caixa_postal", false);
      form.setEnabled("telefone", false);
      form.setEnabled("celular", false);
      form.setEnabled("telefone_comercial", false);
      form.setEnabled("fax", false);
      form.setEnabled("fax_dedicado", false);
      form.setEnabled("email", false);
      form.setEnabled("contato", false);

      /* SECTION DADOS BANCARIOS */
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
      form.setEnabled("CpfCnpj", false);
      form.setEnabled("tipo_chave_pix", false);
      form.setEnabled("chave_CPF", false);
      form.setEnabled("chave_CNPJ", false);
      form.setEnabled("chave_email", false);
      form.setEnabled("chave_celular", false);
      form.setEnabled("chave_aleatoria", false);
      form.setEnabled("tipo_doc", false);
      form.setEnabled("cod_finalidade", false);

      /* DADOS DEFAULT*/
      form.setEnabled("classificacao_default", false);
      form.setEnabled("nome_cli_fornecedor_default", false);
      form.setEnabled("filial_default", false);
      form.setEnabled("nome_filial_default", false);
      form.setEnabled("dados_banc_default", false);
      form.setEnabled("nome_dados_banc_default", false);
      form.setEnabled("cadastro_forn_totvs", false);

      /* SECTION RATEIO */
      toggleTabelaRateio(form, indexes, false);
    }
  } catch (error) {
    console.log("error");
  }
}

function toggleTabelaRateio(form, indexes, enable) {
  for (var i = 0; i < indexes.length; i++) {
    form.setEnabled("coluna_natureza___" + indexes[i], enable);
    form.setEnabled("coluna_ccusto___" + indexes[i], enable);
    form.setEnabled("coluna_valor___" + indexes[i], enable);
    form.setEnabled("coluna_percentual___" + indexes[i], enable);
  }
  form.setEnabled("valor_total_rateio", enable);
}

function toggleTabelaRateioFin(form, indexes, enable) {
  for (var i = 0; i < indexes.length; i++) {
    form.setEnabled("coluna_natureza_fin___" + indexes[i], enable);
    form.setEnabled("coluna_ccusto_fin___" + indexes[i], enable);
    form.setEnabled("coluna_valor_fin___" + indexes[i], enable);
    form.setEnabled("coluna_percentual_fin___" + indexes[i], enable);
  }
  form.setEnabled("valor_total_rateio_fin", enable);
}
