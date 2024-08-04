function displayFields(form, customHTML) {

  var user = getValue("WKUser");

  /** Vamos acelerar o preenchimento do formulario na atividade inicial para testes */
  if ((user == "fluig" || user == "4ef20412-7687-40a4-b1c8-095c0a92503e") && form.getFormMode() == "ADD") {
    var datasetDs_G5 = DatasetFactory.getDataset('ds_G5', null, new Array(
      DatasetFactory.createConstraint('documentid', '60831', '60831', ConstraintType.MUST)
    ), null);

    var colunas = datasetDs_G5.getColumnsName();
    for (let index = 0; index < colunas.length; index++) {
      let campo = colunas[index];
      let valor = datasetDs_G5.getValue(0, campo);
      form.setValue(campo, valor);
    }
  }

  if (form.getFormMode() == "ADD") form.setValue("idLan", "-1");


  var adminUser = false;
  var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
  var constraints = [c1];
  var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
  if (dataset.rowsCount > 0) {
    adminUser = dataset.getValue(0, 'adminUser');
  }

  /* PEGA DADOS DO EXPEDIENTE */
  var ps1 = DatasetFactory.getDataset("ds_period_exped", null, null, null);
  var ps2 = DatasetFactory.getDataset("globalCalendar", null, null, null);

  var expediente = new Array();
  var periodoInicial = new Array();
  var periodoFinal = new Array();
  var diaSemana = new Array();

  for (var i = 0; i < ps1.rowsCount; i++) {
    expediente.push(ps1.getValue(i, "COD_PERIOD_EXPED"));
    periodoInicial.push(ps1.getValue(i, "NUM_HORA_INIC_PERIOD") / 3600);
    periodoFinal.push(ps1.getValue(i, "NUM_HORA_FIM_PERIOD") / 3600);
    diaSemana.push(ps1.getValue(i, "NUM_DIA_PERIOD"));
  }

  var feriado = new Array();

  for (var i = 0; i < ps2.rowsCount; i++) {
    feriado.push(ps2.getValue(i, "dayFormatted"));
  }

  customHTML.append("<script>function getWKNumState(){ return " + getValue("WKNumState") + "; }</script>");
  customHTML.append("<script>function getNumProces(){ return " + getValue("WKNumProces") + "; }</script>");
  customHTML.append("<script>function getWKNextState(){ return " + getValue("WKNextState") + "; }</script>");
  customHTML.append("<script>function getWKCardId(){ return " + getValue("WKCardId") + "; }</script>");
  customHTML.append("<script>function getAdmin(){ return " + adminUser + "; }</script>");
  customHTML.append("<script>var FORM_MODE = '" + form.getFormMode() + "'</script>");
  customHTML.append("<script>");
  customHTML.append("function getMode(){ return '" + form.getFormMode() + "'};");
  customHTML.append("</script>");
  customHTML.append("<script>");
  customHTML.append("recebeDadosParaCalcularHoraUteis('" + expediente + "','" + periodoInicial + "','" + periodoFinal + "','" + diaSemana + "','" + feriado + "')");
  customHTML.append("</script>");

  var corDeFundoAtiva = getConstante("Cor_Fundo_Ativa");
  var corDeFundoInativa = getConstante("Cor_Fundo_Inativa");
  var corDeFundoConsulta = getConstante("Cor_Fundo_Consulta");
  var numeroSolicitacao = getValue("WKNumProces");
  var activity = getValue("WKNumState");
  form.setValue("numero_solicitacao", numeroSolicitacao);
  var customAppend = "\n<script>";
  try {
    form.setVisibleById("div_atribuicoes", false);
    form.setVisibleById("div_dados_ocultos", false);

    if (form.getFormMode() == "VIEW") {
      /* EXIBIÇÃO DAS DIVS DE ETAPAS */

      if (form.getValue("dados_fornecedor") == "BOLETO") {
        form.setVisibleById("div_cod_boleto", true);
      } else {
        form.setVisibleById("div_cod_boleto", false);
      }

      /* CADASTRO DE FORNECEDOR */
      if (form.getValue("fornecedor_cadastrado") == "Não") {
        form.setVisibleById("div_cadastrar_fornecedor", true);
        form.setVisibleById("div_vincular_fornecedor", false);
        form.setVisibleById("div_dados_pagamento", false);
        form.setVisibleById("div_cod_boleto", false);
      } else {
        form.setVisibleById("div_cadastrar_fornecedor", false);
        form.setVisibleById("div_vincular_fornecedor", true);
        form.setVisibleById("div_dados_pagamento", true);
        form.setVisibleById("div_cod_boleto", true);
      }

      /* 007 - APROVAÇÃO GESTOR */
      if (form.getValue("aprovacao_gestor") == "" || form.getValue("aprovacao_gestor") == null) {
        form.setVisibleById("div_aprovacao_gestor", false);
      } else {
        form.setVisibleById("div_aprovacao_gestor", true);
      }

      /* 012 - APROVAÇÃO DIRETORIA */
      if (form.getValue("aprovacao_diretoria") == "" || form.getValue("aprovacao_diretoria") == null) {
        form.setVisibleById("div_aprovacao_diretoria", false);
      } else {
        form.setVisibleById("div_aprovacao_diretoria", true);
      }


      /* 014 - PROVISIONAMENTO */
      if (form.getValue("dados_conformidade") == "" || form.getValue("dados_conformidade") == null) {
        form.setVisibleById("div_provisionamento", false);
        form.setVisibleById("div_analise_vinculo_fornecedor", false);
        form.setVisibleById("div_provisionamento_revisao", false);
      }
      if (form.getValue("dados_conformidade") == "Sim") {
        form.setVisibleById("div_provisionamento", true);
        form.setVisibleById("div_analise_vinculo_fornecedor", true);
      }
      if (form.getValue("dados_conformidade") == "Nao" || form.getValue("dados_conformidade") == "Cancelar") {
        form.setVisibleById("div_provisionamento", true);
        form.setVisibleById("div_provisionamento_revisao", true);
      }

      var rateioCentroDeCustos = form.getChildrenIndexes("table_rateio_ccusto_fin");
      if (rateioCentroDeCustos.length <= 1) {
        form.setVisibleById("section_rateio_financeiro", false);
      } else {
        form.setVisibleById("section_rateio_financeiro", true);
      }


      /* 034 - REVISAR SOLICITAÇÃO */
      if (form.getValue("mensagem_solicitacao_ajustes") == "" || form.getValue("mensagem_solicitacao_ajustes") == null) {
        form.setVisibleById("div_provisionamento_revisao", false);
      } else {
        form.setVisibleById("div_provisionamento_revisao", true);
      }

      /* 097 - AGUARDANDO VENCIMENTO */
      if (form.getValue("seleciona_fase_envio_av") == "" || form.getValue("seleciona_fase_envio_av") == null) {
        form.setVisibleById("div_aguardando_vencimento", false);
      } else {
        form.setVisibleById("div_aguardando_vencimento", true);
      }

      /* 127 - PAGAMENTO ÚNICO */
      if (form.getValue("pagamento_realizado_pu") == "" || form.getValue("pagamento_realizado_pu") == null) {
        form.setVisibleById("div_pagamento_unico", false);
      } else {
        form.setVisibleById("div_pagamento_unico", true);
      }

      /* 128 - PAGAMENTO PARCIAL */
      if (form.getValue("pagamento_realizado_pu") == "" || form.getValue("pagamento_realizado_pu") == null) {
        form.setVisibleById("div_pagamento_parcial", false);
      } else {
        form.setVisibleById("div_pagamento_parcial", true);
      }

      form.setVisibleById("div_confirma_integracao", false);

      /* VALIDAÇÕES */

      /* 000 | 004 - INICIO */
      /* CAMPO HOUVE JUROS */
      if (form.getValue("teve_juros") == "Não") {
        form.setVisibleById("div_teveJuros", false);
      }
      if (form.getValue("teve_juros") == "Sim") {
        form.setVisibleById("div_teveJuros", true);
      }

      form.setVisibleById("div_btn_hide_solicitacao", false);
      form.setVisibleById("div_btn_hide_solicitacao_fin", false);
      form.setVisibleById("div_btn_hide_solicitacao_bfin", false);
      form.setVisibleById("div_btn_hide_solicitacao_r_fin", false);
      form.setVisibleById("btn_add_linha", false);
      form.setVisibleById("btn_add_linha_fin", false);
      form.setVisibleById("btn_add_linha_as", false);

      /* CADASTRO DE FORNECEDOR */
      if (form.getValue("cad_cliente_fornecedor") == "" || form.getValue("cad_cliente_fornecedor") == null) {
        form.setVisibleById("div_cad_cliente_fornecedor", false);
      }

      if (form.getValue("cliente_global") == "" || form.getValue("cliente_global") == null) {
        form.setVisibleById("div_cliente_global", false);
      }

      if (form.getValue("data_nascimento") == "" || form.getValue("data_nascimento") == null) {
        form.setVisibleById("div_data_nascimento", false);
      }

      if (form.getValue("estado_civil") == "" || form.getValue("estado_civil") == null) {
        form.setVisibleById("div_estado_civil", false);
      }

      if (form.getValue("nome_social") == "" || form.getValue("nome_social") == null) {
        form.setVisibleById("div_nome_social", false);
      }

      if (form.getValue("nome") == "" || form.getValue("nome") == null) {
        form.setVisibleById("div_nome", false);
      }

      if (form.getValue("inscricao_estadual") == "" || form.getValue("inscricao_estadual") == null) {
        form.setVisibleById("div_inscricao_estadual", false);
      }

      if (form.getValue("inscricao_municipal") == "" || form.getValue("inscricao_municipal") == null) {
        form.setVisibleById("div_inscricao_municipal", false);
      }

      if (form.getValue("email") == "" || form.getValue("email") == null) {
        form.setVisibleById("div_email", false);
      }

      if (form.getValue("tipo_cliente_forn") == "" || form.getValue("tipo_cliente_forn") == null) {
        form.setVisibleById("div_tipo_cliente_forn", false);
      }

      if (form.getValue("identidade") == "" || form.getValue("identidade") == null) {
        form.setVisibleById("div_identidade", false);
      }

      if (form.getValue("orgao_emissor") == "" || form.getValue("orgao_emissor") == null) {
        form.setVisibleById("div_orgao_emissor", false);
      }

      if (form.getValue("estado_emissor") == "" || form.getValue("estado_emissor") == null) {
        form.setVisibleById("div_estado_emissor", false);
      }

      if (form.getValue("complemento") == "" || form.getValue("complemento") == null) {
        form.setVisibleById("div_complemento", false);
      }

      if (form.getValue("nome_municipio") == "" || form.getValue("nome_municipio") == null) {
        form.setVisibleById("div_nome_municipio", false);
      }

      if (form.getValue("cep_caixa_postal") == "" || form.getValue("cep_caixa_postal") == null) {
        form.setVisibleById("div_cep_caixa_postal", false);
      }

      if (form.getValue("celular") == "" || form.getValue("celular") == null) {
        form.setVisibleById("div_celular", false);
      }

      if (form.getValue("telefone_comercial") == "" || form.getValue("telefone_comercial") == null) {
        form.setVisibleById("div_telefone_comercial", false);
      }

      if (form.getValue("fax") == "" || form.getValue("fax") == null) {
        form.setVisibleById("div_fax", false);
      }

      if (form.getValue("fax_dedicado") == "" || form.getValue("fax_dedicado") == null) {
        form.setVisibleById("div_fax_dedicado", false);
      }

      if (form.getValue("dados_bancarios_ativo") == "" || form.getValue("dados_bancarios_ativo") == null) {
        form.setVisibleById("div_dados_bancarios_ativo", false);
      }

      if (form.getValue("cad_referencia") == "" || form.getValue("cad_referencia") == null) {
        form.setVisibleById("div_cad_referencia", false);
      }

      if (form.getValue("descricao") == "" || form.getValue("descricao") == null) {
        form.setVisibleById("div_descricao", false);
      }

      if (form.getValue("filial_d_bancarios") == "" || form.getValue("filial_d_bancarios") == null) {
        form.setVisibleById("div_filial_d_bancarios", false);
      }

      if (form.getValue("nome_filial_d_banc") == "" || form.getValue("nome_filial_d_banc") == null) {
        form.setVisibleById("div_nome_filial_d_banc", false);
      }

      if (form.getValue("forma_pagamento") == "" || form.getValue("forma_pagamento") == null) {
        form.setVisibleById("div_forma_pagamento", false);
      }

      if (form.getValue("banco") == "" || form.getValue("banco") == null) {
        form.setVisibleById("div_banco", false);
      }

      if (form.getValue("agencia") == "" || form.getValue("agencia") == null) {
        form.setVisibleById("div_agencia", false);
      }

      if (form.getValue("digito") == "" || form.getValue("digito") == null) {
        form.setVisibleById("div_digito", false);
      }

      if (form.getValue("nome_agencia") == "" || form.getValue("nome_agencia") == null) {
        form.setVisibleById("div_nome_agencia", false);
      }

      if (form.getValue("conta_corrente") == "" || form.getValue("conta_corrente") == null) {
        form.setVisibleById("div_conta_corrente", false);
      }

      if (form.getValue("digito_conta_corrente") == "" || form.getValue("digito_conta_corrente") == null) {
        form.setVisibleById("div_digito_conta_corrente", false);
      }

      if (form.getValue("tipo_conta") == "" || form.getValue("tipo_conta") == null) {
        form.setVisibleById("div_tipo_conta", false);
      }

      if (form.getValue("camara_comp") == "" || form.getValue("camara_comp") == null) {
        form.setVisibleById("div_camara_comp", false);
      }

      if (form.getValue("favorecido") == "" || form.getValue("favorecido") == null) {
        form.setVisibleById("div_favorecido", false);
      }

      if (form.getValue("CpfCnpj_favorecido") == "" || form.getValue("CpfCnpj_favorecido") == null) {
        form.setVisibleById("div_CpfCnpj_favorecido", false);
      }

      if (form.getValue("tipo_chave_pix") == "" || form.getValue("tipo_chave_pix") == null) {
        form.setVisibleById("div_tipo_chave_pix", false);
      }

      if (form.getValue("chave_CPF") == "" || form.getValue("chave_CPF") == null) {
        form.setVisibleById("div_chave_CPF", false);
      }

      if (form.getValue("chave_CNPJ") == "" || form.getValue("chave_CNPJ") == null) {
        form.setVisibleById("div_chave_CNPJ", false);
      }

      if (form.getValue("chave_email") == "" || form.getValue("chave_email") == null) {
        form.setVisibleById("div_chave_email", false);
      }

      if (form.getValue("chave_celular") == "" || form.getValue("chave_celular") == null) {
        form.setVisibleById("div_chave_celular", false);
      }

      if (form.getValue("chave_aleatoria") == "" || form.getValue("chave_aleatoria") == null) {
        form.setVisibleById("div_chave_aleatoria", false);
      }

      if (form.getValue("tipo_doc") == "" || form.getValue("tipo_doc") == null) {
        form.setVisibleById("div_tipo_doc", false);
      }

      if (form.getValue("cod_finalidade") == "" || form.getValue("cod_finalidade") == null) {
        form.setVisibleById("div_cod_finalidade", false);
      }

      if (form.getValue("fornecedor_cadastrado") == "Não") {
        form.setVisibleById("div_cadastrar_fornecedor", true);
        form.setVisibleById("div_vincular_fornecedor", false);
        form.setVisibleById("div_dados_pagamento", false);
      } else {
        form.setVisibleById("div_cadastrar_fornecedor", false);
        form.setVisibleById("div_vincular_fornecedor", true);
        form.setVisibleById("div_dados_pagamento", true);
      }

      if (form.getValue("urgencia_solicitacao") == "Normal") {
        customAppend += '\n\t $("#urgencia_solicitacao").css("backgroundColor","' + "#01DF01" + '");';
      }
      if (form.getValue("urgencia_solicitacao") == "Urgente") {
        customAppend += '\n\t $("#urgencia_solicitacao").css("backgroundColor","' + "#FFDD00" + '");';
      }

      form.setVisibleById("div_mensagem_valor_excedido", false);
      form.setVisibleById("div_mensagem_valor_excedido_fin", false);
      form.setVisibleById("div_mensagem_valor_excedido_da", false);

      /* 007 - APROVAÇÃO GESTOR */
      if (form.getValue("aprovacao_gestor") == "" || form.getValue("aprovacao_gestor") == null) {
        form.setVisibleById("div_aprovacao_gestor", false);
      }
      if (form.getValue("aprovacao_gestor") == "reprovado") {
        form.setVisibleById("div_motivo_cancel_gestor", true);
      }
      if (form.getValue("aprovacao_gestor") == "aprovado") {
        form.setVisibleById("div_motivo_cancel_gestor", false);
      }

      /* 012 - APROVAÇÃO DIRETORIA */
      if (form.getValue("aprovacao_diretoria") == "" || form.getValue("aprovacao_diretoria") == null) {
        form.setVisibleById("div_aprovacao_diretoria", false);
      }
      if (form.getValue("aprovacao_diretoria") == "reprovado") {
        form.setVisibleById("div_motivo_cancel_diretoria", true);
      }
      if (form.getValue("aprovacao_diretoria") == "aprovado") {
        form.setVisibleById("div_motivo_cancel_diretoria", false);
      }

      /* 014 - PROVISIONAMENTO || ETAPA 034 - REVISAR SOLICITAÇÃO */
      if (form.getValue("dados_conformidade") == "Não") {
        form.setVisibleById("div_provisionamento_revisao", true);
        form.setVisibleById("div_analise_vinculo_fornecedor", false);
      }
      if (form.getValue("dados_conformidade") == "Sim") {
        form.setVisibleById("div_provisionamento_revisao", false);
        form.setVisibleById("div_analise_vinculo_fornecedor", true);
      }

      /* 097 - AGUARDANDO VENCIMENTO */

      if (form.getValue("seleciona_fase_envio_av") == "" || form.getValue("seleciona_fase_envio_av") == null) {
        form.setVisibleById("div_aguardando_vencimento", false);
      }

      /* 127 - PAGAMENTO ÚNICO */

      if (form.getValue("pagamento_realizado_pu") == "" || form.getValue("pagamento_realizado_pu") == null) {
        form.setVisibleById("div_pagamento_unico", false);
      }

      if (form.getValue("pagamento_realizado_pu") == "Nao") {
        form.setVisibleById("div_teve_juros_pu", false);
        form.setVisibleById("div_valor_original_pu", false);
        form.setVisibleById("div_valor_juros_pu", false);
        form.setVisibleById("div_valor_pu", false);
        form.setVisibleById("div_data_pagamento", false);
      }

      if (form.getValue("pagamento_realizado_pu") == "Sim") {
        form.setVisibleById("div_teve_juros_pu", true);
        form.setVisibleById("div_valor_pu", true);
        form.setVisibleById("div_data_pagamento", true);
      }

      if (form.getValue("teve_juros_pu") == "Não") {
        form.setVisibleById("div_valor_original_pu", false);
        form.setVisibleById("div_valor_juros_pu", false);
      }

      if (form.getValue("teve_juros_pu") == "Sim") {
        form.setVisibleById("div_valor_original_pu", true);
        form.setVisibleById("div_valor_juros_pu", true);
      }

      /* 128 - PAGAMENTO PARCIAL */
      if (form.getValue("pagamento_realizado_pp") == "" || form.getValue("pagamento_realizado_pp") == null) {
        form.setVisibleById("div_pagamento_parcial", false);
      }

      if (form.getValue("pagamento_realizado_pp") == "Nao") {
        form.setVisibleById("div_teve_juros_pp", false);
        form.setVisibleById("div_valor_original_pp", false);
        form.setVisibleById("div_valor_juros_pp", false);
        form.setVisibleById("div_valor_inicial_pp", false);
        form.setVisibleById("div_data_pagamento_inicial", false);
        form.setVisibleById("div_valor_final_pp", false);
        form.setVisibleById("div_data_pagamento_final", false);
      }

      if (form.getValue("pagamento_realizado_pp") == "Sim") {
        form.setVisibleById("div_teve_juros_pp", true);
        form.setVisibleById("div_valor_inicial_pp", true);
        form.setVisibleById("div_data_pagamento_inicial", true);
        form.setVisibleById("div_valor_final_pp", true);
        form.setVisibleById("div_data_pagamento_final", true);
      }

      if (form.getValue("teve_juros_pp") == "Não") {
        form.setVisibleById("div_valor_original_pp", false);
        form.setVisibleById("div_valor_juros_pp", false);
      }

      if (form.getValue("teve_juros_pp") == "Sim") {
        form.setVisibleById("div_valor_original_pp", true);
        form.setVisibleById("div_valor_juros_pp", true);
      }
      /* CORES */
      customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoConsulta + '");';
      customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoConsulta + '");';
      customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoConsulta + '");';
      customAppend += '\n\t $("#section_dados_fornecedor_financeiro").css("backgroundColor","' + corDeFundoConsulta + '");';
      customAppend += '\n\t $("#section_dados_bancarios_financeiro").css("backgroundColor","' + corDeFundoConsulta + '");';
      customAppend += '\n\t $("#section_rateio_financeiro").css("backgroundColor","' + corDeFundoConsulta + '");';
      customAppend += '\n\t $("#section_cadastro_fornecedor").css("backgroundColor","' + corDeFundoConsulta + '");';
      customAppend += '\n\t $("#section_dados_bancarios").css("backgroundColor","' + corDeFundoConsulta + '");';
      customAppend += '\n\t $("#section_aprovacao_gestor").css("backgroundColor","' + corDeFundoConsulta + '");';
      customAppend += '\n\t $("#section_aprovacao_diretoria").css("backgroundColor","' + corDeFundoConsulta + '");';
      customAppend += '\n\t $("#section_provisionamento").css("backgroundColor","' + corDeFundoConsulta + '");';
      customAppend += '\n\t $("#section_provisionamento_revisao").css("backgroundColor","' + corDeFundoConsulta + '");';
      customAppend += '\n\t $("#section_analise_vinculo").css("backgroundColor","' + corDeFundoConsulta + '");';
      customAppend += '\n\t $("#section_aguardando_vencimento").css("backgroundColor","' + corDeFundoConsulta + '");';
      customAppend += '\n\t $("#section_pagamento_unico").css("backgroundColor","' + corDeFundoConsulta + '");';
      customAppend += '\n\t $("#section_pagamento_parcial").css("backgroundColor","' + corDeFundoConsulta + '");';
    } else if (form.getFormMode != "VIEW") {
      form.setVisibleById("div_atribuicoes", false);
      form.setVisibleById("div_dados_ocultos", false);
      if (user == "suporte.fluig" || user == "Fluig") {
        form.setVisibleById("div_atribuicoes", true);
        form.setVisibleById("div_dados_ocultos", true);
      }

      if (form.getValue("urgencia_solicitacao") == "Normal") {
        customAppend += '\n\t $("#urgencia_solicitacao").css("backgroundColor","' + "#01DF01" + '");';
      }
      if (form.getValue("urgencia_solicitacao") == "Urgente") {
        customAppend += '\n\t $("#urgencia_solicitacao").css("backgroundColor","' + "#FFDD00" + '");';
      }

      /* CORES */
      customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoInativa + '");';
      customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoInativa + '");';
      customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoInativa + '");';
      customAppend += '\n\t $("#section_dados_fornecedor_financeiro").css("backgroundColor","' + corDeFundoInativa + '");';
      customAppend += '\n\t $("#section_dados_bancarios_financeiro").css("backgroundColor","' + corDeFundoInativa + '");';
      customAppend += '\n\t $("#section_rateio_financeiro").css("backgroundColor","' + corDeFundoInativa + '");';
      customAppend += '\n\t $("#section_cadastro_fornecedor").css("backgroundColor","' + corDeFundoInativa + '");';
      customAppend += '\n\t $("#section_dados_bancarios").css("backgroundColor","' + corDeFundoInativa + '");';
      customAppend += '\n\t $("#section_aprovacao_gestor").css("backgroundColor","' + corDeFundoInativa + '");';
      customAppend += '\n\t $("#section_aprovacao_diretoria").css("backgroundColor","' + corDeFundoInativa + '");';
      customAppend += '\n\t $("#section_provisionamento").css("backgroundColor","' + corDeFundoInativa + '");';
      customAppend += '\n\t $("#section_provisionamento_revisao").css("backgroundColor","' + corDeFundoInativa + '");';
      customAppend += '\n\t $("#section_analise_vinculo").css("backgroundColor","' + corDeFundoInativa + '");';
      customAppend += '\n\t $("#section_aguardando_vencimento").css("backgroundColor","' + corDeFundoInativa + '");';
      customAppend += '\n\t $("#section_pagamento_unico").css("backgroundColor","' + corDeFundoInativa + '");';
      customAppend += '\n\t $("#section_pagamento_parcial").css("backgroundColor","' + corDeFundoInativa + '");';
    }
    /* ETAPA 000 | 004 - INICIO */
    if (activity == 0 || activity == 4) {

      /* PREENCHE OS DADOS DO USUARIO NA ABERTURA */
      var const1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
      var datasetAttachment = DatasetFactory.getDataset("colleague", null, [const1], null);
      var usuario = datasetAttachment.getValue(0, "colleagueName");
      form.setValue("solicitante", usuario);


      /* DIVS DAS ETAPAS */
      form.setVisibleById("div_formulario_inicial", true);
      form.setVisibleById("div_btn_hide_solicitacao", false);
      form.setVisibleById("div_btn_hide_solicitacao_fin", false);
      form.setVisibleById("div_btn_hide_solicitacao_bfin", false);
      form.setVisibleById("div_btn_hide_solicitacao_r_fin", false);
      form.setVisibleById("div_aprovacao_gestor", false);
      form.setVisibleById("div_aprovacao_diretoria", false);
      form.setVisibleById("div_dados_fornecedor_financeiro", false);
      form.setVisibleById("div_cadastrar_fornecedor", false);
      form.setVisibleById("div_provisionamento", false);
      form.setVisibleById("div_provisionamento_revisao", false);
      form.setVisibleById("div_analise_vinculo_fornecedor", false);
      form.setVisibleById("div_aguardando_vencimento", false);
      form.setVisibleById("div_pagamento_unico", false);
      form.setVisibleById("div_pagamento_parcial", false);
      form.setVisibleById("div_confirma_integracao", false);

      /* DIVS CONDICIONAIS */
      form.setVisibleById("div_teveJuros", false);
      form.setVisibleById("div_vincular_fornecedor", true);
      form.setVisibleById("div_data_nascimento", false);
      form.setVisibleById("div_estado_civil", false);
      form.setVisibleById("div_cpf", false);
      form.setVisibleById("div_cnpj", false);
      form.setVisibleById("div_mensagem_valor_excedido", false);
      form.setVisibleById("div_mensagem_valor_excedido_da", false);
      form.setVisibleById("div_mensagem_valor_excedido_fin", false);
      form.setVisibleById("div_cod_boleto_analise", false);
      form.setVisibleById("div_chave_tipo_forn", false);
      form.setVisibleById("div_cod_boleto", false);
      form.setVisibleById("div_chave_cpf", false);
      form.setVisibleById("div_chave_cnpj", false);
      form.setVisibleById("div_chave_email", false);
      form.setVisibleById("div_chave_celular", false);
      form.setVisibleById("div_chave_aleatoria", false);

      if (form.getValue("tipo_chave_pix") == "" || form.getValue("tipo_chave_pix") == null) {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }

      /* CORES */
      customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoAtiva + '");';
      customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoAtiva + '");';
      customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoAtiva + '");';
      customAppend += '\n\t $("#section_cadastro_fornecedor").css("backgroundColor","' + corDeFundoAtiva + '");';
      customAppend += '\n\t $("#section_dados_bancarios").css("backgroundColor","' + corDeFundoAtiva + '");';
      /* ETAPA 007 - APROVAÇÃO GESTOR */
    } else if (activity == 7) {

      /* DIVS DAS ETAPAS */
      form.setVisibleById("div_formulario_inicial", true);
      form.setVisibleById("div_btn_hide_solicitacao", false);
      form.setVisibleById("div_btn_hide_solicitacao_fin", false);
      form.setVisibleById("div_btn_hide_solicitacao_bfin", false);
      form.setVisibleById("div_btn_hide_solicitacao_r_fin", false);
      form.setVisibleById("div_aprovacao_gestor", true);
      form.setVisibleById("div_cadastrar_fornecedor", false);
      form.setVisibleById("div_aprovacao_diretoria", false);
      form.setVisibleById("div_dados_fornecedor_financeiro", false);
      form.setVisibleById("div_provisionamento", false);
      form.setVisibleById("div_provisionamento_revisao", false);
      form.setVisibleById("div_analise_vinculo_fornecedor", false);
      form.setVisibleById("div_aguardando_vencimento", false);
      form.setVisibleById("div_pagamento_unico", false);
      form.setVisibleById("div_pagamento_parcial", false);
      form.setVisibleById("div_confirma_integracao", false);

      /* DIVS CONDICIONAIS */
      form.setVisibleById("btn_add_linha", false);
      form.setVisibleById("btn_add_linha_as", false);
      form.setVisibleById("btn_add_linha_fin", false);
      form.setVisibleById("btn-anexo-as", false);
      form.setVisibleById("div_teveJuros", false);
      form.setVisibleById("div_vincular_fornecedor", false);
      form.setVisibleById("div_chave_tipo_forn", false);

      /* VALIDAÇÃO CAMPOS HOUVE JUROS */
      if (form.getValue("teve_juros") == "Não") {
        form.setVisibleById("div_teveJuros", false);
      }
      if (form.getValue("teve_juros") == "Sim") {
        form.setVisibleById("div_teveJuros", true);
      }

      if (form.getValue("fornecedor_cadastrado") == "Não") {
        form.setVisibleById("div_cadastrar_fornecedor", true);
        form.setVisibleById("div_vincular_fornecedor", false);
        form.setVisibleById("div_dados_pagamento", false);
        form.setVisibleById("div_cod_boleto", false);
      } else {
        form.setVisibleById("div_cadastrar_fornecedor", false);
        form.setVisibleById("div_vincular_fornecedor", true);
        form.setVisibleById("div_dados_pagamento", true);
        if (form.getValue("hidden_dados_pgmt") == "BOLETO") {
          form.setVisibleById("div_cod_boleto", true);
        } else {
          form.setVisibleById("div_cod_boleto", false);
        }
      }

      /* CAMPO CATEGORIA */
      if (form.getValue("categoria") == "F") {
        form.setVisibleById("div_cpf", true);
        form.setVisibleById("div_cnpj", false);
        form.setVisibleById("div_data_nascimento", true);
        form.setVisibleById("div_estado_civil", true);
      }
      if (form.getValue("categoria") == "J") {
        form.setVisibleById("div_cpf", false);
        form.setVisibleById("div_cnpj", true);
        form.setVisibleById("div_data_nascimento", false);
        form.setVisibleById("div_estado_civil", false);
      }

      /* CAMPO CHAVE PIX */
      if (form.getValue("tipo_chave_pix") == "" || form.getValue("tipo_chave_pix") == null) {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "CPF") {
        form.setVisibleById("div_chave_CPF", true);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "CNPJ") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", true);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "Email") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", true);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "Celular") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", true);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "Aleatoria") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", true);
      }

      form.setVisibleById("div_mensagem_valor_excedido", false);
      form.setVisibleById("div_mensagem_valor_excedido_fin", false);
      form.setVisibleById("div_mensagem_valor_excedido_da", false);
      form.setVisibleById("div_motivo_cancel_gestor", false);


      if (form.getValue("urgencia_solicitacao") == "Normal") {
        customAppend += '\n\t $("#urgencia_solicitacao").css("backgroundColor","' + "#01DF01" + '");';
      }
      if (form.getValue("urgencia_solicitacao") == "Urgente") {
        customAppend += '\n\t $("#urgencia_solicitacao").css("backgroundColor","' + "#FFDD00" + '");';
      }


      /* CORES */
      if (form.getFormMode() == "VIEW") {
        customAppend += '\n\t $("#section_aprovacao_gestor").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_cadastro_fornecedor").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_bancarios").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_fornecedor_financeiro").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_bancarios_financeiro").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_rateio_financeiro").css("backgroundColor","' + corDeFundoConsulta + '");';
      } else {
        customAppend += '\n\t $("#section_aprovacao_gestor").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_cadastro_fornecedor").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_bancarios").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_fornecedor_financeiro").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_dados_bancarios_financeiro").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_rateio_financeiro").css("backgroundColor","' + corDeFundoConsulta + '");';
      }
      /* ETAPA 012 - APROVAÇÃO DIRETORIA */
    } else if (activity == 12) {
      /* DIVS DAS ETAPAS */
      form.setVisibleById("div_formulario_inicial", true);
      form.setVisibleById("div_btn_hide_solicitacao", false);
      form.setVisibleById("div_btn_hide_solicitacao_fin", false);
      form.setVisibleById("div_btn_hide_solicitacao_bfin", false);
      form.setVisibleById("div_btn_hide_solicitacao_r_fin", false);
      form.setVisibleById("div_aprovacao_diretoria", true);
      form.setVisibleById("div_cadastrar_fornecedor", false);
      form.setVisibleById("div_aprovacao_gestor", false);
      form.setVisibleById("div_dados_fornecedor_financeiro", false);
      form.setVisibleById("div_provisionamento", false);
      form.setVisibleById("div_provisionamento_revisao", false);
      form.setVisibleById("div_analise_vinculo_fornecedor", false);
      form.setVisibleById("div_aguardando_vencimento", false);
      form.setVisibleById("div_pagamento_unico", false);
      form.setVisibleById("div_pagamento_parcial", false);
      form.setVisibleById("div_confirma_integracao", false);

      /* DIVS CONDICIONAIS */
      form.setVisibleById("btn_add_linha", false);
      form.setVisibleById("btn_add_linha_fin", false);
      form.setVisibleById("btn_add_linha_as", false);
      form.setVisibleById("btn-anexo-as", false);
      form.setVisibleById("div_chave_tipo_forn", false);

      /* VALIDAÇÃO CAMPOS HOUVE JUROS */
      if (form.getValue("teve_juros") == "Não") {
        form.setVisibleById("div_teveJuros", false);
      }
      if (form.getValue("teve_juros") == "Sim") {
        form.setVisibleById("div_teveJuros", true);
      }

      if (form.getValue("fornecedor_cadastrado") == "Não") {
        form.setVisibleById("div_cadastrar_fornecedor", true);
        form.setVisibleById("div_vincular_fornecedor", false);
        form.setVisibleById("div_dados_pagamento", false);
        form.setVisibleById("div_cod_boleto", false);
      } else {
        form.setVisibleById("div_cadastrar_fornecedor", false);
        form.setVisibleById("div_vincular_fornecedor", true);
        form.setVisibleById("div_dados_pagamento", true);
        if (form.getValue("hidden_dados_pgmt") == "BOLETO") {
          form.setVisibleById("div_cod_boleto", true);
        } else {
          form.setVisibleById("div_cod_boleto", false);
        }
      }

      /* CAMPO CATEGORIA */
      if (form.getValue("categoria") == "F") {
        form.setVisibleById("div_cpf", true);
        form.setVisibleById("div_cnpj", false);
        form.setVisibleById("div_data_nascimento", true);
        form.setVisibleById("div_estado_civil", true);
      }
      if (form.getValue("categoria") == "J") {
        form.setVisibleById("div_cpf", false);
        form.setVisibleById("div_cnpj", true);
        form.setVisibleById("div_data_nascimento", false);
        form.setVisibleById("div_estado_civil", false);
      }

      /* CAMPO CHAVE PIX */
      if (form.getValue("tipo_chave_pix") == "" || form.getValue("tipo_chave_pix") == null) {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "CPF") {
        form.setVisibleById("div_chave_CPF", true);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "CNPJ") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", true);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "Email") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", true);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "Celular") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", true);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "Aleatoria") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", true);
      }

      form.setVisibleById("div_mensagem_valor_excedido", false);
      form.setVisibleById("div_mensagem_valor_excedido_fin", false);
      form.setVisibleById("div_mensagem_valor_excedido_da", false);
      form.setVisibleById("div_motivo_cancel_diretoria", false);


      if (form.getValue("urgencia_solicitacao") == "Normal") {
        customAppend += '\n\t $("#urgencia_solicitacao").css("backgroundColor","' + "#01DF01" + '");';
      }
      if (form.getValue("urgencia_solicitacao") == "Urgente") {
        customAppend += '\n\t $("#urgencia_solicitacao").css("backgroundColor","' + "#FFDD00" + '");';
      }

      /* CORES */
      if (form.getFormMode() == "VIEW") {
        customAppend += '\n\t $("#section_aprovacao_diretoria").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_cadastro_fornecedor").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_bancarios").css("backgroundColor","' + corDeFundoConsulta + '");';
      } else {
        customAppend += '\n\t $("#section_aprovacao_diretoria").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_cadastro_fornecedor").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_bancarios").css("backgroundColor","' + corDeFundoInativa + '");';
      }

      /* ETAPA 014 - PROVISIONAMENTO */
    } else if (activity == 14) {
      /* DIVS DAS ETAPAS */
      form.setVisibleById("div_formulario_inicial", true);
      form.setVisibleById("div_cadastrar_fornecedor", false);
      form.setVisibleById("div_dados_fornecedor_financeiro", true);
      form.setVisibleById("div_btn_hide_solicitacao", false);
      form.setVisibleById("div_btn_hide_solicitacao_fin", false);
      form.setVisibleById("div_btn_hide_solicitacao_bfin", false);
      form.setVisibleById("div_btn_hide_solicitacao_r_fin", false);
      form.setVisibleById("div_aprovacao_gestor", false);
      form.setVisibleById("div_aprovacao_diretoria", false);
      form.setVisibleById("div_provisionamento", true);
      form.setVisibleById("div_provisionamento_revisao", false);
      form.setVisibleById("div_analise_vinculo_fornecedor", false);
      form.setVisibleById("div_aguardando_vencimento", false);
      form.setVisibleById("div_pagamento_unico", false);
      form.setVisibleById("div_pagamento_parcial", false);
      form.setVisibleById("div_confirma_integracao", false);


      form.setVisibleById("section_cabecalho", true);
      form.setVisibleById("section_dados_fornecedor", false);
      form.setVisibleById("section_rateio", false);
      form.setVisibleById("section_rateio_financeiro", true);

      /* DIVS CONDICIONAIS */
      form.setVisibleById("btn_add_linha", false);
      form.setVisibleById("div_cod_boleto_analise", false);
      form.setVisibleById("div_chave_tipo_forn", false);
      form.setVisibleById("div_cod_boleto", false);
      form.setVisibleById("btn_add_linha_as", false);
      form.setVisibleById("btn_add_linha_fin", false);
      form.setVisibleById("div_mensagem_valor_excedido", false);
      form.setVisibleById("div_mensagem_valor_excedido_fin", false);
      form.setVisibleById("div_mensagem_valor_excedido_da", false);
      form.setVisibleById("div_motivo_cancel_diretoria", false);

      if (form.getValue("dados_conformidade") == "Não") {
        form.setVisibleById("div_provisionamento_revisao", true);
        form.setVisibleById("div_analise_vinculo_fornecedor", false);
      }
      if (form.getValue("dados_conformidade") == "Sim") {
        form.setVisibleById("div_provisionamento_revisao", false);
        form.setVisibleById("div_analise_vinculo_fornecedor", true);
      }

      if (form.getValue("hidden_dados_pgmt") == "BOLETO") {
        form.setVisibleById("div_cod_boleto_analise", true);
        form.setVisibleById("div_cod_boleto", true);
      } else {
        form.setVisibleById("div_cod_boleto_analise", false);
        form.setVisibleById("div_cod_boleto", false);
      }

      /* VALIDAÇÃO CAMPOS HOUVE JUROS */
      if (form.getValue("teve_juros") == "Não") {
        form.setVisibleById("div_teveJuros", false);
      }
      if (form.getValue("teve_juros") == "Sim") {
        form.setVisibleById("div_teveJuros", true);
      }

      if (form.getValue("fornecedor_cadastrado") == "Não") {
        form.setVisibleById("div_cadastrar_fornecedor", true);
        form.setVisibleById("div_vincular_fornecedor", false);
        form.setVisibleById("div_dados_pagamento", false);
      } else {
        form.setVisibleById("div_cadastrar_fornecedor", false);
        form.setVisibleById("div_vincular_fornecedor", true);
        form.setVisibleById("div_dados_pagamento", true);
      }

      /* CAMPO CATEGORIA */
      if (form.getValue("categoria") == "F") {
        form.setVisibleById("div_cpf", true);
        form.setVisibleById("div_cnpj", false);
        form.setVisibleById("div_data_nascimento", true);
        form.setVisibleById("div_estado_civil", true);
      }
      if (form.getValue("categoria") == "J") {
        form.setVisibleById("div_cpf", false);
        form.setVisibleById("div_cnpj", true);
        form.setVisibleById("div_data_nascimento", false);
        form.setVisibleById("div_estado_civil", false);
      }

      /* CAMPO CHAVE PIX */
      if (form.getValue("tipo_chave_pix") == "" || form.getValue("tipo_chave_pix") == null) {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "CPF") {
        form.setVisibleById("div_chave_CPF", true);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "CNPJ") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", true);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "Email") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", true);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "Celular") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", true);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "Aleatoria") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", true);
      }

      /* CAMPO CATEGORIA - FINANCEIRO */
      if (form.getValue("categoria_fin") == "F") {
        form.setVisibleById("div_cpf_fin", true);
        form.setVisibleById("div_cnpj_fin", false);
        form.setVisibleById("div_data_nascimento_fin", true);
        form.setVisibleById("div_estado_civil_fin", true);
      }
      if (form.getValue("categoria_fin") == "J") {
        form.setVisibleById("div_cpf_fin", false);
        form.setVisibleById("div_cnpj_fin", true);
        form.setVisibleById("div_data_nascimento_fin", false);
        form.setVisibleById("div_estado_civil_fin", false);
      }

      /* CAMPO CHAVE PIX - FINANCEIRO */
      if (form.getValue("tipo_chave_pix_fin") == "" || form.getValue("tipo_chave_pix_fin") == null) {
        form.setVisibleById("div_chave_CPF_fin", false);
        form.setVisibleById("div_chave_cnpj_fin", false);
        form.setVisibleById("div_chave_email_fin", false);
        form.setVisibleById("div_chave_celular_fin", false);
        form.setVisibleById("div_chave_aleatoria_fin", false);
      }
      if (form.getValue("tipo_chave_pix_fin") == "CPF") {
        form.setVisibleById("div_chave_CPF_fin", true);
        form.setVisibleById("div_chave_cnpj_fin", false);
        form.setVisibleById("div_chave_email_fin", false);
        form.setVisibleById("div_chave_celular_fin", false);
        form.setVisibleById("div_chave_aleatoria_fin", false);
      }
      if (form.getValue("tipo_chave_pix_fin") == "CNPJ") {
        form.setVisibleById("div_chave_CPF_fin", false);
        form.setVisibleById("div_chave_cnpj_fin", true);
        form.setVisibleById("div_chave_email_fin", false);
        form.setVisibleById("div_chave_celular_fin", false);
        form.setVisibleById("div_chave_aleatoria_fin", false);
      }
      if (form.getValue("tipo_chave_pix_fin") == "Email") {
        form.setVisibleById("div_chave_CPF_fin", false);
        form.setVisibleById("div_chave_cnpj_fin", false);
        form.setVisibleById("div_chave_email_fin", true);
        form.setVisibleById("div_chave_celular_fin", false);
        form.setVisibleById("div_chave_aleatoria_fin", false);
      }
      if (form.getValue("tipo_chave_pix_fin") == "Celular") {
        form.setVisibleById("div_chave_CPF_fin", false);
        form.setVisibleById("div_chave_cnpj_fin", false);
        form.setVisibleById("div_chave_email_fin", false);
        form.setVisibleById("div_chave_celular_fin", true);
        form.setVisibleById("div_chave_aleatoria_fin", false);
      }
      if (form.getValue("tipo_chave_pix_fin") == "Aleatoria") {
        form.setVisibleById("div_chave_CPF_fin", false);
        form.setVisibleById("div_chave_cnpj_fin", false);
        form.setVisibleById("div_chave_email_fin", false);
        form.setVisibleById("div_chave_celular_fin", false);
        form.setVisibleById("div_chave_aleatoria_fin", true);
      }


      if (form.getValue("urgencia_solicitacao") == "Normal") {
        customAppend += '\n\t $("#urgencia_solicitacao").css("backgroundColor","' + "#01DF01" + '");';
      }
      if (form.getValue("urgencia_solicitacao") == "Urgente") {
        customAppend += '\n\t $("#urgencia_solicitacao").css("backgroundColor","' + "#FFDD00" + '");';
      }

      /* CORES */
      if (form.getFormMode() == "VIEW") {
        form.setVisibleById("div_btn_hide_solicitacao", false);
        form.setVisibleById("div_btn_hide_solicitacao_fin", false);
        form.setVisibleById("div_btn_hide_solicitacao_bfin", false);
        form.setVisibleById("div_btn_hide_solicitacao_r_fin", false);

        customAppend += '\n\t $("#section_provisionamento").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_provisionamento_revisao").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_cadastro_fornecedor").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_bancarios").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_fornecedor_financeiro").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_bancarios_financeiro").css("backgroundColor","' + corDeFundoConsulta + '");';
      } else {
        form.setVisibleById("div_btn_hide_solicitacao", true);
        form.setVisibleById("div_btn_hide_solicitacao_fin", true);
        form.setVisibleById("div_btn_hide_solicitacao_bfin", true);
        form.setVisibleById("div_btn_hide_solicitacao_r_fin", true);

        customAppend += '\n\t $("#section_provisionamento").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_provisionamento_revisao").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_analise_vinculo").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_cadastro_fornecedor").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_bancarios").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_fornecedor_financeiro").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_bancarios_financeiro").css("backgroundColor","' + corDeFundoInativa + '");';
      }
      /* ETAPA 034 - REVISAR SOLICITAÇÃO */
    } else if (activity == 34) {
      /* DIVS DAS ETAPAS */
      form.setVisibleById("div_provisionamento_revisao", true);
      form.setVisibleById("div_formulario_inicial", true);
      form.setVisibleById("div_btn_hide_solicitacao", false);
      form.setVisibleById("div_btn_hide_solicitacao_fin", false);
      form.setVisibleById("div_btn_hide_solicitacao_bfin", false);
      form.setVisibleById("div_btn_hide_solicitacao_r_fin", false);
      form.setVisibleById("div_aprovacao_diretoria", false);
      form.setVisibleById("div_aprovacao_gestor", false);
      form.setVisibleById("div_dados_fornecedor_financeiro", false);
      form.setVisibleById("div_provisionamento", false);
      form.setVisibleById("div_aguardando_vencimento", false);
      form.setVisibleById("div_pagamento_unico", false);
      form.setVisibleById("div_pagamento_parcial", false);
      form.setVisibleById("div_confirma_integracao", false);


      /* SECTION CADASTRO DE FORNECEDOR */
      if (form.getValue("fornecedor_cadastrado") == "Não") {
        form.setVisibleById("div_cadastrar_fornecedor", true);
        form.setVisibleById("div_vincular_fornecedor", false);
        form.setVisibleById("div_dados_pagamento", false);
      } else {
        form.setVisibleById("div_cadastrar_fornecedor", false);
        form.setVisibleById("div_vincular_fornecedor", true);
        form.setVisibleById("div_dados_pagamento", true);
      }
      if (form.getValue("dados_conformidade") == "Não") {
        form.setVisibleById("div_provisionamento_revisao", true);
        form.setVisibleById("div_analise_vinculo_fornecedor", false);
      }

      /* DIVS CONDICIONAIS */
      form.setVisibleById("btn_add_linha", false);
      form.setVisibleById("btn_add_linha_as", false);
      form.setVisibleById("btn_add_linha_fin", false);
      form.setVisibleById("div_teveJuros", false);
      form.setVisibleById("div_vincular_fornecedor", false);
      form.setVisibleById("div_cpf", false);
      form.setVisibleById("div_cnpj", false);
      form.setVisibleById("div_chave_cpf", false);
      form.setVisibleById("div_chave_cnpj", false);
      form.setVisibleById("div_chave_email", false);
      form.setVisibleById("div_chave_celular", false);
      form.setVisibleById("div_chave_aleatoria", false);
      form.setVisibleById("div_mensagem_valor_excedido", false);
      form.setVisibleById("div_mensagem_valor_excedido_fin", false);
      form.setVisibleById("div_mensagem_valor_excedido_da", false);
      form.setVisibleById("div_motivo_cancel_diretoria", false);

      /* CORES */
      if (form.getFormMode() == "VIEW") {
        customAppend += '\n\t $("#section_provisionamento_revisao").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_cadastro_fornecedor").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_bancarios").css("backgroundColor","' + corDeFundoConsulta + '");';
      } else {
        customAppend += '\n\t $("#section_provisionamento_revisao").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_cadastro_fornecedor").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_dados_bancarios").css("backgroundColor","' + corDeFundoAtiva + '");';
      }

      /* ETAPA 097 - AGUARDANDO VENCIMENTO */
    } else if (activity == 97) {
      /* DIVS DAS ETAPAS */
      form.setVisibleById("div_aguardando_vencimento", true);
      form.setVisibleById("div_formulario_inicial", true);
      form.setVisibleById("div_confirma_integracao", true);
      form.setVisibleById("div_provisionamento_revisao", false);
      form.setVisibleById("div_btn_hide_solicitacao", false);
      form.setVisibleById("div_btn_hide_solicitacao_fin", false);
      form.setVisibleById("div_btn_hide_solicitacao_bfin", false);
      form.setVisibleById("div_btn_hide_solicitacao_r_fin", false);
      form.setVisibleById("div_aprovacao_diretoria", false);
      form.setVisibleById("div_aprovacao_gestor", false);
      form.setVisibleById("div_dados_fornecedor_financeiro", false);
      form.setVisibleById("div_provisionamento", false);
      form.setVisibleById("div_analise_vinculo_fornecedor", false);
      form.setVisibleById("div_pagamento_unico", false);
      form.setVisibleById("div_pagamento_parcial", false);

      form.setVisibleById("section_cabecalho", true);
      form.setVisibleById("section_dados_fornecedor", false);
      form.setVisibleById("section_rateio", false);

      form.setVisibleById("div_cadastrar_fornecedor", false);
      form.setVisibleById("div_vincular_fornecedor", false);

      /* CORES */
      if (form.getFormMode() == "VIEW") {
        customAppend += '\n\t $("#section_aguardando_vencimento").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_confirma_integracao").css("backgroundColor","' + corDeFundoConsulta + '");';
      } else {
        customAppend += '\n\t $("#section_aguardando_vencimento").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_confirma_integracao").css("backgroundColor","' + '#2bff00' + '");';
      }
      /* ETAPA 127 - PAGAMENTO ÚNICO */
    } else if (activity == 127) {
      form.setVisibleById("div_pagamento_unico", true);
      form.setVisibleById("div_formulario_inicial", true);
      form.setVisibleById("div_confirma_integracao", true);
      form.setVisibleById("div_btn_hide_solicitacao", false);
      form.setVisibleById("div_btn_hide_solicitacao_fin", false);
      form.setVisibleById("div_btn_hide_solicitacao_bfin", false);
      form.setVisibleById("div_btn_hide_solicitacao_r_fin", false);
      form.setVisibleById("div_provisionamento_revisao", false);
      form.setVisibleById("div_aprovacao_diretoria", false);
      form.setVisibleById("div_aprovacao_gestor", false);
      form.setVisibleById("div_dados_fornecedor_financeiro", false);
      form.setVisibleById("div_provisionamento", false);
      form.setVisibleById("div_analise_vinculo_fornecedor", false);
      form.setVisibleById("div_aguardando_vencimento", false);
      form.setVisibleById("div_pagamento_parcial", false);

      form.setVisibleById("section_cabecalho", true);
      form.setVisibleById("section_dados_fornecedor", false);
      form.setVisibleById("section_rateio", false);

      form.setVisibleById("div_cadastrar_fornecedor", false);
      form.setVisibleById("div_vincular_fornecedor", false);

      /* DIVS CONDICIONAIS */
      form.setVisibleById("div_teve_juros_pu", false);
      form.setVisibleById("div_valor_original_pu", false);
      form.setVisibleById("div_valor_juros_pu", false);
      form.setVisibleById("div_valor_pu", false);
      form.setVisibleById("div_data_pagamento", false);

      /* CORES */
      if (form.getFormMode() == "VIEW") {
        customAppend += '\n\t $("#section_pagamento_unico").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoConsulta + '");';
      } else {
        customAppend += '\n\t $("#section_pagamento_unico").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_confirma_integracao").css("backgroundColor","' + '#2bff00' + '");';
      }

      /* ETAPA 128 - PAGAMENTO PARCIAL */
    } else if (activity == 128) {
      form.setVisibleById("div_pagamento_parcial", true);
      form.setVisibleById("div_formulario_inicial", true);
      form.setVisibleById("div_confirma_integracao", true);
      form.setVisibleById("div_btn_hide_solicitacao", false);
      form.setVisibleById("div_btn_hide_solicitacao_fin", false);
      form.setVisibleById("div_btn_hide_solicitacao_bfin", false);
      form.setVisibleById("div_btn_hide_solicitacao_r_fin", false);
      form.setVisibleById("div_provisionamento_revisao", false);
      form.setVisibleById("div_aprovacao_diretoria", false);
      form.setVisibleById("div_aprovacao_gestor", false);
      form.setVisibleById("div_dados_fornecedor_financeiro", false);
      form.setVisibleById("div_provisionamento", false);
      form.setVisibleById("div_analise_vinculo_fornecedor", false);
      form.setVisibleById("div_aguardando_vencimento", false);
      form.setVisibleById("div_pagamento_unico", false);

      form.setVisibleById("section_cabecalho", true);
      form.setVisibleById("section_dados_fornecedor", false);
      form.setVisibleById("section_rateio", false);

      form.setVisibleById("div_cadastrar_fornecedor", false);
      form.setVisibleById("div_vincular_fornecedor", false);

      /* DIVS CONDICIONAIS */
      form.setVisibleById("div_teve_juros_pp", false);
      form.setVisibleById("div_valor_original_pp", false);
      form.setVisibleById("div_valor_juros_pp", false);
      form.setVisibleById("div_valor_inicial_pp", false);
      form.setVisibleById("div_data_pagamento", false);
      form.setVisibleById("div_data_pagamento_inicial", false);
      form.setVisibleById("div_valor_final_pp", false);
      form.setVisibleById("div_data_pagamento_final", false);

      /* CORES */
      if (form.getFormMode() == "VIEW") {
        customAppend += '\n\t $("#section_pagamento_parcial").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoConsulta + '");';
      } else {
        customAppend += '\n\t $("#section_pagamento_parcial").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_confirma_integracao").css("backgroundColor","' + '#2bff00' + '");';
      }
    } else if (activity == 216) {
      /* PREENCHE OS DADOS DO USUARIO NA ABERTURA */
      var const1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
      var datasetAttachment = DatasetFactory.getDataset("colleague", null, [const1], null);
      var usuario = datasetAttachment.getValue(0, "colleagueName");
      form.setValue("solicitante", usuario);

      /* DIVS DAS ETAPAS */
      form.setVisibleById("div_formulario_inicial", true);
      form.setVisibleById("div_dados_fornecedor_financeiro", true);
      form.setVisibleById("div_aprovacao_gestor", false);
      form.setVisibleById("div_aprovacao_diretoria", false);
      form.setVisibleById("div_provisionamento", false);
      form.setVisibleById("div_provisionamento_revisao", false);
      form.setVisibleById("div_analise_vinculo_fornecedor", false);
      form.setVisibleById("div_aguardando_vencimento", false);
      form.setVisibleById("div_pagamento_unico", false);
      form.setVisibleById("div_pagamento_parcial", false);

      /* DIVS CONDICIONAIS */
      form.setVisibleById("div_teveJuros", false);
      form.setVisibleById("div_vincular_fornecedor", false);

      form.setVisibleById("section_cabecalho", true);
      /* CORES */
      if (form.getFormMode() == "VIEW") {
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_analise_vinculo").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_cadastro_fornecedor").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_bancarios").css("backgroundColor","' + corDeFundoConsulta + '");';
      } else {
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_analise_vinculo").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_cadastro_fornecedor").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_dados_bancarios").css("backgroundColor","' + corDeFundoAtiva + '");';
      }

    } else if (activity == 223) {
      /* DIVS DAS ETAPAS */
      form.setVisibleById("div_formulario_inicial", true);
      form.setVisibleById("div_cadastrar_fornecedor", false);
      form.setVisibleById("div_dados_fornecedor_financeiro", true);
      form.setVisibleById("div_btn_hide_solicitacao", false);
      form.setVisibleById("div_btn_hide_solicitacao_fin", false);
      form.setVisibleById("div_btn_hide_solicitacao_bfin", false);
      form.setVisibleById("div_btn_hide_solicitacao_r_fin", false);
      form.setVisibleById("div_aprovacao_gestor", false);
      form.setVisibleById("div_aprovacao_diretoria", false);
      form.setVisibleById("div_provisionamento", true);
      form.setVisibleById("div_provisionamento_revisao", false);
      form.setVisibleById("div_analise_vinculo_fornecedor", false);
      form.setVisibleById("div_aguardando_vencimento", false);
      form.setVisibleById("div_pagamento_unico", false);
      form.setVisibleById("div_pagamento_parcial", false);
      form.setVisibleById("div_confirma_integracao", false);


      form.setVisibleById("section_cabecalho", true);
      form.setVisibleById("section_dados_fornecedor", false);
      form.setVisibleById("section_rateio", false);
      form.setVisibleById("section_rateio_financeiro", true);

      if (form.getValue("dados_conformidade") == "Não") {
        form.setVisibleById("div_provisionamento_revisao", true);
        form.setVisibleById("div_analise_vinculo_fornecedor", false);
      }
      if (form.getValue("dados_conformidade") == "Sim") {
        form.setVisibleById("div_provisionamento_revisao", false);
        form.setVisibleById("div_analise_vinculo_fornecedor", true);
      }

      /* VALIDAÇÃO CAMPOS HOUVE JUROS */
      if (form.getValue("teve_juros") == "Não") {
        form.setVisibleById("div_teveJuros", false);
      }
      if (form.getValue("teve_juros") == "Sim") {
        form.setVisibleById("div_teveJuros", true);
      }

      if (form.getValue("fornecedor_cadastrado") == "Não") {
        form.setVisibleById("div_cadastrar_fornecedor", true);
        form.setVisibleById("div_vincular_fornecedor", false);
        form.setVisibleById("div_dados_pagamento", false);
      } else {
        form.setVisibleById("div_cadastrar_fornecedor", false);
        form.setVisibleById("div_vincular_fornecedor", true);
        form.setVisibleById("div_dados_pagamento", true);
      }

      /* CAMPO CATEGORIA */
      if (form.getValue("categoria") == "F") {
        form.setVisibleById("div_cpf", true);
        form.setVisibleById("div_cnpj", false);
        form.setVisibleById("div_data_nascimento", true);
        form.setVisibleById("div_estado_civil", true);
      }
      if (form.getValue("categoria") == "J") {
        form.setVisibleById("div_cpf", false);
        form.setVisibleById("div_cnpj", true);
        form.setVisibleById("div_data_nascimento", false);
        form.setVisibleById("div_estado_civil", false);
      }

      /* CAMPO CHAVE PIX */
      if (form.getValue("tipo_chave_pix") == "" || form.getValue("tipo_chave_pix") == null) {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "CPF") {
        form.setVisibleById("div_chave_CPF", true);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "CNPJ") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", true);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "Email") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", true);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "Celular") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", true);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "Aleatoria") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", true);
      }

      /* DIVS CONDICIONAIS */
      form.setVisibleById("btn_add_linha", false);
      form.setVisibleById("btn_add_linha_as", false);
      form.setVisibleById("btn_add_linha_fin", false);
      form.setVisibleById("div_mensagem_valor_excedido", false);
      form.setVisibleById("div_mensagem_valor_excedido_fin", false);
      form.setVisibleById("div_mensagem_valor_excedido_da", false);
      form.setVisibleById("div_motivo_cancel_diretoria", false);

      if (form.getValue("urgencia_solicitacao") == "Normal") {
        customAppend += '\n\t $("#urgencia_solicitacao").css("backgroundColor","' + "#01DF01" + '");';
      }
      if (form.getValue("urgencia_solicitacao") == "Urgente") {
        customAppend += '\n\t $("#urgencia_solicitacao").css("backgroundColor","' + "#FFDD00" + '");';
      }

      /* CORES */
      if (form.getFormMode() == "VIEW") {
        form.setVisibleById("div_btn_hide_solicitacao", false);
        form.setVisibleById("div_btn_hide_solicitacao_fin", false);
        form.setVisibleById("div_btn_hide_solicitacao_bfin", false);
        form.setVisibleById("div_btn_hide_solicitacao_r_fin", false);
        customAppend += '\n\t $("#section_provisionamento").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_provisionamento_revisao").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_cadastro_fornecedor").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_bancarios").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_fornecedor_financeiro").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_bancarios_financeiro").css("backgroundColor","' + corDeFundoConsulta + '");';
      } else {
        form.setVisibleById("div_btn_hide_solicitacao", true);
        form.setVisibleById("div_btn_hide_solicitacao_fin", true);
        form.setVisibleById("div_btn_hide_solicitacao_bfin", true);
        form.setVisibleById("div_btn_hide_solicitacao_r_fin", true);

        customAppend += '\n\t $("#section_provisionamento").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_provisionamento_revisao").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_analise_vinculo").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_cadastro_fornecedor").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_bancarios").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_fornecedor_financeiro").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_bancarios_financeiro").css("backgroundColor","' + corDeFundoInativa + '");';
      }
    } else if (activity == 274) {
      form.setVisibleById("div_formulario_inicial", true);
      form.setVisibleById("section_cabecalho", true);
      form.setVisibleById("section_dados_fornecedor", false);
      form.setVisibleById("section_rateio", false);
      form.setVisibleById("div_cadastrar_fornecedor", false);
      form.setVisibleById("div_dados_fornecedor_financeiro", true);
      form.setVisibleById("section_rateio_financeiro", false);
      form.setVisibleById("div_btn_hide_solicitacao", false);
      form.setVisibleById("div_btn_hide_solicitacao_fin", false);
      form.setVisibleById("div_btn_hide_solicitacao_bfin", false);
      form.setVisibleById("div_btn_hide_solicitacao_r_fin", false);
      form.setVisibleById("div_aprovacao_gestor", false);
      form.setVisibleById("div_aprovacao_diretoria", false);
      form.setVisibleById("div_provisionamento", false);
      form.setVisibleById("div_provisionamento_revisao", false);
      form.setVisibleById("div_analise_vinculo_fornecedor", false);
      form.setVisibleById("div_aguardando_vencimento", false);
      form.setVisibleById("div_pagamento_unico", false);
      form.setVisibleById("div_pagamento_parcial", false);
      form.setVisibleById("div_confirma_integracao", false);

      /* DIVS CONDICIONAIS */
      form.setVisibleById("btn_add_linha", false);
      form.setVisibleById("btn_add_linha_as", false);
      form.setVisibleById("btn_add_linha_fin", false);
      form.setVisibleById("div_teveJuros", false);
      form.setVisibleById("div_vincular_fornecedor", false);

      /* VALIDAÇÃO CAMPOS HOUVE JUROS */
      if (form.getValue("teve_juros") == "Não") {
        form.setVisibleById("div_teveJuros", false);
      }
      if (form.getValue("teve_juros") == "Sim") {
        form.setVisibleById("div_teveJuros", true);
      }

      if (form.getValue("fornecedor_cadastrado") == "Não") {
        form.setVisibleById("div_cadastrar_fornecedor", true);
        form.setVisibleById("div_vincular_fornecedor", false);
        form.setVisibleById("div_dados_pagamento", false);
      } else {
        form.setVisibleById("div_cadastrar_fornecedor", false);
        form.setVisibleById("div_vincular_fornecedor", true);
        form.setVisibleById("div_dados_pagamento", true);
      }

      /* CAMPO CATEGORIA */
      if (form.getValue("categoria") == "F") {
        form.setVisibleById("div_cpf", true);
        form.setVisibleById("div_cnpj", false);
        form.setVisibleById("div_data_nascimento", true);
        form.setVisibleById("div_estado_civil", true);
      }
      if (form.getValue("categoria") == "J") {
        form.setVisibleById("div_cpf", false);
        form.setVisibleById("div_cnpj", true);
        form.setVisibleById("div_data_nascimento", false);
        form.setVisibleById("div_estado_civil", false);
      }

      /* CAMPO CHAVE PIX */
      if (form.getValue("tipo_chave_pix") == "" || form.getValue("tipo_chave_pix") == null) {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "CPF") {
        form.setVisibleById("div_chave_CPF", true);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "CNPJ") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", true);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "Email") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", true);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "Celular") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", true);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "Aleatoria") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", true);
      }

      /* CAMPO CATEGORIA - FINANCEIRO */
      if (form.getValue("categoria_fin") == "F") {
        form.setVisibleById("div_cpf_fin", true);
        form.setVisibleById("div_cnpj_fin", false);
        form.setVisibleById("div_data_nascimento_fin", true);
        form.setVisibleById("div_estado_civil_fin", true);
      }
      if (form.getValue("categoria_fin") == "J") {
        form.setVisibleById("div_cpf_fin", false);
        form.setVisibleById("div_cnpj_fin", true);
        form.setVisibleById("div_data_nascimento_fin", false);
        form.setVisibleById("div_estado_civil_fin", false);
      }

      /* CAMPO CHAVE PIX - FINANCEIRO */
      if (form.getValue("tipo_chave_pix_fin") == "" || form.getValue("tipo_chave_pix_fin") == null) {
        form.setVisibleById("div_chave_CPF_fin", false);
        form.setVisibleById("div_chave_cnpj_fin", false);
        form.setVisibleById("div_chave_email_fin", false);
        form.setVisibleById("div_chave_celular_fin", false);
        form.setVisibleById("div_chave_aleatoria_fin", false);
      }
      if (form.getValue("tipo_chave_pix_fin") == "CPF") {
        form.setVisibleById("div_chave_CPF_fin", true);
        form.setVisibleById("div_chave_cnpj_fin", false);
        form.setVisibleById("div_chave_email_fin", false);
        form.setVisibleById("div_chave_celular_fin", false);
        form.setVisibleById("div_chave_aleatoria_fin", false);
      }
      if (form.getValue("tipo_chave_pix_fin") == "CNPJ") {
        form.setVisibleById("div_chave_CPF_fin", false);
        form.setVisibleById("div_chave_cnpj_fin", true);
        form.setVisibleById("div_chave_email_fin", false);
        form.setVisibleById("div_chave_celular_fin", false);
        form.setVisibleById("div_chave_aleatoria_fin", false);
      }
      if (form.getValue("tipo_chave_pix_fin") == "Email") {
        form.setVisibleById("div_chave_CPF_fin", false);
        form.setVisibleById("div_chave_cnpj_fin", false);
        form.setVisibleById("div_chave_email_fin", true);
        form.setVisibleById("div_chave_celular_fin", false);
        form.setVisibleById("div_chave_aleatoria_fin", false);
      }
      if (form.getValue("tipo_chave_pix_fin") == "Celular") {
        form.setVisibleById("div_chave_CPF_fin", false);
        form.setVisibleById("div_chave_cnpj_fin", false);
        form.setVisibleById("div_chave_email_fin", false);
        form.setVisibleById("div_chave_celular_fin", true);
        form.setVisibleById("div_chave_aleatoria_fin", false);
      }
      if (form.getValue("tipo_chave_pix_fin") == "Aleatoria") {
        form.setVisibleById("div_chave_CPF_fin", false);
        form.setVisibleById("div_chave_cnpj_fin", false);
        form.setVisibleById("div_chave_email_fin", false);
        form.setVisibleById("div_chave_celular_fin", false);
        form.setVisibleById("div_chave_aleatoria_fin", true);
      }

      form.setVisibleById("div_mensagem_valor_excedido", false);
      form.setVisibleById("div_mensagem_valor_excedido_fin", false);
      form.setVisibleById("div_mensagem_valor_excedido_da", false);
      form.setVisibleById("div_motivo_cancel_gestor", false);


      if (form.getValue("urgencia_solicitacao") == "Normal") {
        customAppend += '\n\t $("#urgencia_solicitacao").css("backgroundColor","' + "#01DF01" + '");';
      }
      if (form.getValue("urgencia_solicitacao") == "Urgente") {
        customAppend += '\n\t $("#urgencia_solicitacao").css("backgroundColor","' + "#FFDD00" + '");';
      }

      /* CORES */
      if (form.getFormMode() == "VIEW") {
        customAppend += '\n\t $("#section_aprovacao_gestor").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_cadastro_fornecedor").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_bancarios").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_fornecedor_financeiro").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_bancarios_financeiro").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_rateio_financeiro").css("backgroundColor","' + corDeFundoConsulta + '");';
      } else {
        customAppend += '\n\t $("#section_aprovacao_gestor").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_cadastro_fornecedor").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_bancarios").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_fornecedor_financeiro").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_dados_bancarios_financeiro").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_rateio_financeiro").css("backgroundColor","' + corDeFundoConsulta + '");';
      }

    } else if (activity == 295) {
      /* DIVS DAS ETAPAS */
      form.setVisibleById("div_formulario_inicial", true);
      form.setVisibleById("div_cadastrar_fornecedor", false);
      form.setVisibleById("div_dados_fornecedor_financeiro", true);
      form.setVisibleById("div_btn_hide_solicitacao", false);
      form.setVisibleById("div_btn_hide_solicitacao_fin", false);
      form.setVisibleById("div_btn_hide_solicitacao_bfin", false);
      form.setVisibleById("div_btn_hide_solicitacao_r_fin", false);
      form.setVisibleById("div_aprovacao_gestor", false);
      form.setVisibleById("div_aprovacao_diretoria", false);
      form.setVisibleById("div_provisionamento", true);
      form.setVisibleById("div_provisionamento_revisao", false);
      form.setVisibleById("div_analise_vinculo_fornecedor", false);
      form.setVisibleById("div_aguardando_vencimento", false);
      form.setVisibleById("div_pagamento_unico", false);
      form.setVisibleById("div_pagamento_parcial", false);
      form.setVisibleById("div_confirma_integracao", false);


      form.setVisibleById("section_cabecalho", true);
      form.setVisibleById("section_dados_fornecedor", false);
      form.setVisibleById("section_rateio", false);
      form.setVisibleById("section_rateio_financeiro", true);

      if (form.getValue("dados_conformidade") == "Não") {
        form.setVisibleById("div_provisionamento_revisao", true);
        form.setVisibleById("div_analise_vinculo_fornecedor", false);
      }
      if (form.getValue("dados_conformidade") == "Sim") {
        form.setVisibleById("div_provisionamento_revisao", false);
        form.setVisibleById("div_analise_vinculo_fornecedor", true);
      }

      /* VALIDAÇÃO CAMPOS HOUVE JUROS */
      if (form.getValue("teve_juros") == "Não") {
        form.setVisibleById("div_teveJuros", false);
      }
      if (form.getValue("teve_juros") == "Sim") {
        form.setVisibleById("div_teveJuros", true);
      }

      if (form.getValue("fornecedor_cadastrado") == "Não") {
        form.setVisibleById("div_cadastrar_fornecedor", true);
        form.setVisibleById("div_vincular_fornecedor", false);
        form.setVisibleById("div_dados_pagamento", false);
      } else {
        form.setVisibleById("div_cadastrar_fornecedor", false);
        form.setVisibleById("div_vincular_fornecedor", true);
        form.setVisibleById("div_dados_pagamento", true);
      }

      /* CAMPO CATEGORIA */
      if (form.getValue("categoria") == "F") {
        form.setVisibleById("div_cpf", true);
        form.setVisibleById("div_cnpj", false);
        form.setVisibleById("div_data_nascimento", true);
        form.setVisibleById("div_estado_civil", true);
      }
      if (form.getValue("categoria") == "J") {
        form.setVisibleById("div_cpf", false);
        form.setVisibleById("div_cnpj", true);
        form.setVisibleById("div_data_nascimento", false);
        form.setVisibleById("div_estado_civil", false);
      }

      /* CAMPO CHAVE PIX */
      if (form.getValue("tipo_chave_pix") == "" || form.getValue("tipo_chave_pix") == null) {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "CPF") {
        form.setVisibleById("div_chave_CPF", true);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "CNPJ") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", true);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "Email") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", true);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "Celular") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", true);
        form.setVisibleById("div_chave_aleatoria", false);
      }
      if (form.getValue("tipo_chave_pix") == "Aleatoria") {
        form.setVisibleById("div_chave_CPF", false);
        form.setVisibleById("div_chave_cnpj", false);
        form.setVisibleById("div_chave_email", false);
        form.setVisibleById("div_chave_celular", false);
        form.setVisibleById("div_chave_aleatoria", true);
      }

      /* DIVS CONDICIONAIS */
      form.setVisibleById("btn_add_linha", false);
      form.setVisibleById("btn_add_linha_as", false);
      form.setVisibleById("btn_add_linha_fin", false);
      form.setVisibleById("div_mensagem_valor_excedido", false);
      form.setVisibleById("div_mensagem_valor_excedido_fin", false);
      form.setVisibleById("div_mensagem_valor_excedido_da", false);
      form.setVisibleById("div_motivo_cancel_diretoria", false);

      if (form.getValue("urgencia_solicitacao") == "Normal") {
        customAppend += '\n\t $("#urgencia_solicitacao").css("backgroundColor","' + "#01DF01" + '");';
      }
      if (form.getValue("urgencia_solicitacao") == "Urgente") {
        customAppend += '\n\t $("#urgencia_solicitacao").css("backgroundColor","' + "#FFDD00" + '");';
      }

      /* CORES */
      if (form.getFormMode() == "VIEW") {
        form.setVisibleById("div_btn_hide_solicitacao", false);
        form.setVisibleById("div_btn_hide_solicitacao_fin", false);
        form.setVisibleById("div_btn_hide_solicitacao_bfin", false);
        form.setVisibleById("div_btn_hide_solicitacao_r_fin", false);
        customAppend += '\n\t $("#section_provisionamento").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_provisionamento_revisao").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_cadastro_fornecedor").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_bancarios").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_fornecedor_financeiro").css("backgroundColor","' + corDeFundoConsulta + '");';
        customAppend += '\n\t $("#section_dados_bancarios_financeiro").css("backgroundColor","' + corDeFundoConsulta + '");';
      } else {
        form.setVisibleById("div_btn_hide_solicitacao", true);
        form.setVisibleById("div_btn_hide_solicitacao_fin", true);
        form.setVisibleById("div_btn_hide_solicitacao_bfin", true);
        form.setVisibleById("div_btn_hide_solicitacao_r_fin", true);

        customAppend += '\n\t $("#section_provisionamento").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_provisionamento_revisao").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_analise_vinculo").css("backgroundColor","' + corDeFundoAtiva + '");';
        customAppend += '\n\t $("#section_cabecalho").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_rateio").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_fornecedor").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_cadastro_fornecedor").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_bancarios").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_fornecedor_financeiro").css("backgroundColor","' + corDeFundoInativa + '");';
        customAppend += '\n\t $("#section_dados_bancarios_financeiro").css("backgroundColor","' + corDeFundoInativa + '");';
      }

    }
  } catch (error) {
    log.info("Erro no G5: ", error);
    console.log("Erro:", error);
    customAppend += "\n\t " + String(error.lineNumber) + " - " + String(error.message);
  }
  customAppend += "\n</script>";
  customHTML.append(customAppend);
}

function getAtribuicoes(atribuicao) {
  var constraintAtribuicao = DatasetFactory.createConstraint("ID_ATV", atribuicao, atribuicao, ConstraintType.MUST)
  var dtsAtribuicoes = DatasetFactory.getDataset("ds_consultaCadastroAtribuicoes", null, [constraintAtribuicao], null)
  if (dtsAtribuicoes.rowsCount > 0) {
    return dtsAtribuicoes.getValue(0, "hd_cod_user_atv");
  } else {
    return ""
  }
}


function getConstante(cCriterio) {
  // Get Dataset para uma variavel;
  var aConstraint = [];
  aConstraint.push(DatasetFactory.createConstraint('id', cCriterio, cCriterio, ConstraintType.MUST));
  // aciona o dataset ds_Constante

  var oConstantes = DatasetFactory.getDataset('ds_Constantes', null, null, null);

  for (var i = 0; i < oConstantes.rowsCount; i++) {
    if (oConstantes.getValue(i, "id").trim() == cCriterio.trim()) {
      return oConstantes.getValue(i, "Valor").trim();
    }
  }
  return '0';
}


