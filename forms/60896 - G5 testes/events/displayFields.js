function displayFields(form, customHTML) {
  var user = getValue("WKUser");
  var adminUser = isAdminUser(user);
  var activity = getValue("WKNumState");

  var corDeFundoAtiva = getConstante("Cor_Fundo_Ativa");
  var corDeFundoInativa = getConstante("Cor_Fundo_Inativa");
  var corDeFundoConsulta = getConstante("Cor_Fundo_Consulta");

  try {
    var customAppend = "\n<script>";
    customAppend += "\n function getWKNumState(){ return " + getValue("WKNumState") + "; } ";
    customAppend += "\n function getNumProces(){ return " + getValue("WKNumProces") + "; } ";
    customAppend += "\n function getWKNextState(){ return " + getValue("WKNextState") + "; } ";
    customAppend += "\n function getWKCardId(){ return " + getValue("WKCardId") + "; } ";
    customAppend += "\n function getAdmin(){ return " + adminUser + "; } ";
    customAppend += "\n function getMode(){ return '" + form.getFormMode() + "'; } ";
    customAppend += "\n var FORM_MODE = '" + form.getFormMode() + "'; ";
    // customAppend += "\n " + getExpediente() + "'";

    /** Definindo cor padrão para todos os campos
     * No final do código teremos a inclusão das cores no formulário */
    var cor_div_formulario_inicial = form.getFormMode() == "VIEW" ? corDeFundoConsulta : corDeFundoInativa;
    var cor_div_aprovacao_gestor = form.getFormMode() == "VIEW" ? corDeFundoConsulta : corDeFundoInativa;
    var cor_div_aprovacao_diretoria = form.getFormMode() == "VIEW" ? corDeFundoConsulta : corDeFundoInativa;
    var cor_div_dados_fornecedor_financeiro = form.getFormMode() == "VIEW" ? corDeFundoConsulta : corDeFundoInativa;
    var cor_div_provisionamento = form.getFormMode() == "VIEW" ? corDeFundoConsulta : corDeFundoInativa;
    var cor_div_provisionamento_revisao = form.getFormMode() == "VIEW" ? corDeFundoConsulta : corDeFundoInativa;
    var cor_div_aguardando_vencimento = form.getFormMode() == "VIEW" ? corDeFundoConsulta : corDeFundoInativa;
    var cor_div_pagamento_unico = form.getFormMode() == "VIEW" ? corDeFundoConsulta : corDeFundoInativa;
    var cor_div_pagamento_parcial = form.getFormMode() == "VIEW" ? corDeFundoConsulta : corDeFundoInativa;
    var cor_div_confirma_integracao = form.getFormMode() == "VIEW" ? corDeFundoConsulta : corDeFundoInativa;

    form.setValue("numero_solicitacao", getValue("WKNumProces"));

    if (activity == 0 || activity == 4) {
      cor_div_formulario_inicial = corDeFundoAtiva;
      if (form.getFormMode() == "ADD") form.setValue("idLan", "-1");
      form.setValue("solicitante", getColleagueName(user));
      form.setVisibleById("div_aprovacao_gestor", false);
      form.setVisibleById("div_aprovacao_diretoria", false);
      form.setVisibleById("div_dados_fornecedor_financeiro", false);
      form.setVisibleById("div_provisionamento", false);
      form.setVisibleById("div_provisionamento_revisao", false);
      form.setVisibleById("div_aguardando_vencimento", false);
      form.setVisibleById("div_pagamento_unico", false);
      form.setVisibleById("div_pagamento_parcial", false);
      form.setVisibleById("div_confirma_integracao", false);
    }

    else if (activity == 7) {
      cor_div_aprovacao_gestor = corDeFundoAtiva;
      form.setVisibleById("div_aprovacao_diretoria", false);
      form.setVisibleById("div_dados_fornecedor_financeiro", false);
      form.setVisibleById("div_provisionamento", false);
      form.setVisibleById("div_provisionamento_revisao", false);
      form.setVisibleById("div_aguardando_vencimento", false);
      form.setVisibleById("div_pagamento_unico", false);
      form.setVisibleById("div_pagamento_parcial", false);
      form.setVisibleById("div_confirma_integracao", false);
    }

    else if (activity == 12) {
      cor_div_aprovacao_diretoria = corDeFundoAtiva;
      form.setVisibleById("div_dados_fornecedor_financeiro", false);
      form.setVisibleById("div_provisionamento", false);
      form.setVisibleById("div_provisionamento_revisao", false);
      form.setVisibleById("div_aguardando_vencimento", false);
      form.setVisibleById("div_pagamento_unico", false);
      form.setVisibleById("div_pagamento_parcial", false);
      form.setVisibleById("div_confirma_integracao", false);
    }

    else if (activity == 274) {
      cor_div_dados_fornecedor_financeiro = corDeFundoAtiva;
      form.setVisibleById("div_provisionamento", false);
      form.setVisibleById("div_provisionamento_revisao", false);
      form.setVisibleById("div_aguardando_vencimento", false);
      form.setVisibleById("div_pagamento_unico", false);
      form.setVisibleById("div_pagamento_parcial", false);
      form.setVisibleById("div_confirma_integracao", false);
    }

    else if (activity == 14) {
      /**  Provisionamento */
      cor_div_provisionamento = corDeFundoAtiva;
      cor_div_provisionamento_revisao = corDeFundoAtiva;
      form.setVisibleById("div_aguardando_vencimento", false);
      form.setVisibleById("div_pagamento_unico", false);
      form.setVisibleById("div_pagamento_parcial", false);
      form.setVisibleById("div_confirma_integracao", false);
      form.setVisibleById("div_provisionamento_revisao", false);
    }


    else if (activity == 34) {
      /** Revisão */
      cor_div_provisionamento_revisao = corDeFundoAtiva;
      form.setVisibleById("div_aguardando_vencimento", false);
      form.setVisibleById("div_pagamento_unico", false);
      form.setVisibleById("div_pagamento_parcial", false);
      form.setVisibleById("div_confirma_integracao", false);
      form.setVisibleById("div_provisionamento_revisao", false);
    }

    else if (activity == 128 || activity == 248) {
      /** Pagamento parcial */
      cor_div_pagamento_parcial = corDeFundoAtiva;
      form.setVisibleById("div_aguardando_vencimento", false);
      form.setVisibleById("div_pagamento_unico", false);
      form.setVisibleById("div_confirma_integracao", false);
      form.setVisibleById("div_provisionamento_revisao", false);
    }


    else if (activity == 127 || activity == 247) {
      /** Pagamento unico */
      cor_div_pagamento_unico = corDeFundoAtiva;
      form.setVisibleById("div_aguardando_vencimento", false);
      form.setVisibleById("div_pagamento_parcial", false);
      form.setVisibleById("div_confirma_integracao", false);
      form.setVisibleById("div_provisionamento_revisao", false);
    }

    else if (activity == 97 || activity == 246) {
      /** aguardando vencimento */
      cor_div_aguardando_vencimento = corDeFundoAtiva;
      form.setVisibleById("div_pagamento_unico", false);
      form.setVisibleById("div_pagamento_parcial", false);
      form.setVisibleById("div_confirma_integracao", false);
      form.setVisibleById("div_provisionamento_revisao", false);
    }


    /** Aplicação cores de fundo */
    customAppend += "\n $('#div_formulario_inicial section').css('background-color','" + cor_div_formulario_inicial + "'); ";
    customAppend += "\n $('#div_aprovacao_gestor section').css('background-color','" + cor_div_aprovacao_gestor + "'); ";
    customAppend += "\n $('#div_aprovacao_diretoria section').css('background-color','" + cor_div_aprovacao_diretoria + "'); ";
    customAppend += "\n $('#div_dados_fornecedor_financeiro section').css('background-color','" + cor_div_dados_fornecedor_financeiro + "'); ";
    customAppend += "\n $('#div_provisionamento section').css('background-color','" + cor_div_provisionamento + "'); ";
    customAppend += "\n $('#div_provisionamento_revisao section').css('background-color','" + cor_div_provisionamento_revisao + "'); ";
    customAppend += "\n $('#div_aguardando_vencimento section').css('background-color','" + cor_div_aguardando_vencimento + "'); ";
    customAppend += "\n $('#div_pagamento_unico section').css('background-color','" + cor_div_pagamento_unico + "'); ";
    customAppend += "\n $('#div_pagamento_parcial section').css('background-color','" + cor_div_pagamento_parcial + "'); ";
    customAppend += "\n $('#div_confirma_integracao section').css('background-color','" + cor_div_confirma_integracao + "'); ";

    var idLan = parseInt(form.getValue("idLan"));
    if (idLan > 0) {
      form.setVisibleById("div_confirma_integracao", true);
      customAppend += "\n $('#idLanSucesso').text(" + idLan + "); ";
    }

    if (String(form.getValue("mensagem_solicitacao_ajustes")) == "") {
      form.setVisibleById("div_provisionamento_revisao", false);
    }

    /** Negações */
    // if (adminUser == false) {
    form.setVisibleById("div_dados_ocultos", false);
    form.setVisibleById("div_atribuicoes", false);
    // }

    if (activity != 0 && activity != 4 && activity != 221 && activity != 216 && activity != 295 && activity != 223) {
      customAppend += "\n $('.table-rateio-ccusto-delete').hide(); ";
      customAppend += "\n $('table#table_anexo_solicitacao').find(\".bpm-mobile-trash-column\").hide() ";
      form.setVisibleById("btn_add_linha_as", false);
      form.setVisibleById("btn_add_linha", false);
    }

    if (activity != 14) {
      customAppend += "\n $('.table-rateio-ccusto-fin-delete').hide(); ";
      form.setVisibleById("btn_add_linha_fin", false);
    }

    if (activity != 7 && form.getValue('mensagem_cancel_gestor') == "") {
      form.setVisibleById('div_aprovacao_gestor', false);
    }
    if (activity != 12 && form.getValue('mensagem_cancel_diretoria') == "") {
      form.setVisibleById('div_aprovacao_diretoria', false);
    }

    customAppend += "\n</script>";
    customHTML.append(customAppend);
    // customHTML.append("\n <script> var algo = " + JSONUtil.toJSON(preencheFormAcelerador(form)) + " </script>")



    /** INICO DO PREENCHIMENTO AUTOMATICO PARA TESTE 
    if (user == '4ef20412-7687-40a4-b1c8-095c0a92503e' && form.getFormMode() == "ADD") {
      var datasetDs_G5 = DatasetFactory.getDataset('ds_G52', null, new Array(
        DatasetFactory.createConstraint('documentid', '61170', '61170', ConstraintType.MUST)
      ), null);

      var colunas = datasetDs_G5.getColumnsName();
      customHTML.append("\n<script> var colunasSize = '" + colunas.length + "'; </script>");
      customHTML.append("\n<script> var colunas = '" + JSONUtil.toJSON(colunas) + "'; </script>");
      for (var index = 0; index < colunas.length; index++) {
        var campo = colunas[index];
        var valor = datasetDs_G5.getValue(0, campo);
        form.setValue(campo, valor);
        customHTML.append("\n<script> var " + campo + " = '" + valor + "'; </script>");
      }
    }
    /** FIM DO PREENCHIMENTO AUTOMATICO */

  } catch (error) {
    log.info("Erro no G5: ", error);
    customHTML.append("\n\t <script> " + String(error.lineNumber) + " - " + String(error) + "</script>");
  }
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
  var aConstraint = [];
  aConstraint.push(DatasetFactory.createConstraint('id', cCriterio, cCriterio, ConstraintType.MUST));
  var oConstantes = DatasetFactory.getDataset('ds_Constantes', null, null, null);
  for (var i = 0; i < oConstantes.rowsCount; i++) {
    if (oConstantes.getValue(i, "id").trim() == cCriterio.trim()) {
      return oConstantes.getValue(i, "Valor").trim();
    }
  }
  return '0';
}

function getColleagueName(user) {
  var const1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
  var datasetAttachment = DatasetFactory.getDataset("colleague", null, [const1], null);
  return datasetAttachment.getValue(0, "colleagueName");
}

function isAdminUser(user) {
  var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
  var constraints = [c1];
  var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);
  if (dataset.rowsCount > 0) {
    return Boolean(dataset.getValue(0, 'adminUser'));
  }
  return false;
}

function getExpediente() {
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
  return "recebeDadosParaCalcularHoraUteis('" + expediente + "','" + periodoInicial + "','" + periodoFinal + "','" + diaSemana + "','" + feriado + "')";
}

/** Vamos acelerar o preenchimento do formulario na atividade inicial para testes */
function preencheFormAcelerador(form) {
  if ((user == "fluig" || user == "4ef20412-7687-40a4-b1c8-095c0a92503e") && form.getFormMode() == "ADD") {
    var datasetDs_G5 = DatasetFactory.getDataset('ds_G52', null, new Array(
      DatasetFactory.createConstraint('documentid', '61170', '61170', ConstraintType.MUST)
    ), null);

    var colunas = datasetDs_G5.getColumnsName();
    for (var index = 0; index < colunas.length; index++) {
      var campo = colunas[index];
      var valor = datasetDs_G5.getValue(0, campo);
      form.setValue(campo, valor);
    }
  }
  return colunas;
}
