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
    customAppend += "\n function getWKUser(){ return " + getValue("WKUser") + "; } ";
    customAppend += "\n function getNumProces(){ return " + getValue("WKNumProces") + "; } ";
    customAppend += "\n function getWKNextState(){ return " + getValue("WKNextState") + "; } ";
    customAppend += "\n function getWKCardId(){ return " + getValue("WKCardId") + "; } ";
    customAppend += "\n function getAdmin(){ return " + adminUser + "; } ";
    customAppend += "\n function getMode(){ return '" + form.getFormMode() + "'; } ";
    customAppend += "\n function getWKCompany(){ return '" + getValue("WKCompany") + "'; } ";
    customAppend += "\n var FORM_MODE = '" + form.getFormMode() + "'; ";
    // customAppend += "\n " + getExpediente() + "'";

    if (form.getValue("cancelado") == "" || form.getValue("cancelado") == null) {
      form.setVisibleById("div_identificacao", false);
      cor_div_identificacao = corDeFundoInativa;
    } else {
      form.setVisibleById("div_identificacao", true);
    }

    /** Definindo cor padrão para todos os campos
     * No final do código teremos a inclusão das cores no formulário */
    var cor_div_formulario_inicial = form.getFormMode() == "VIEW" ? corDeFundoConsulta : corDeFundoInativa;
    var cor_div_identificacao = form.getFormMode() == "VIEW" ? corDeFundoConsulta : corDeFundoInativa;
    var cor_div_avaliacao = form.getFormMode() == "VIEW" ? corDeFundoConsulta : corDeFundoInativa;

    form.setValue("numero_solicitacao", getValue("WKNumProces"));

    if (activity == 0 || activity == 4) {
      cor_div_formulario_inicial = corDeFundoAtiva;
      form.setVisibleById("div_identificacao", false);
      form.setVisibleById("div_Avaliacao", false);

      // Atribuições teste
      //form.setValue("processo_origem", "G5");
      //form.setValue("solicitacao_origem", "47599");
      form.setValue("id_titulo", "63");
      //form.setValue("id_fornecedor", "123");
      //form.setValue("data_vencimento", "28/02/2025");
      //form.setValue("data_pagamento", "01/02/2025");
      //form.setValue("valor_titulo", "100.000,00");
      //form.setValue("codigo_autenticacao", "123");
      form.setValue("cod_coligada", "2");
      //form.setValue("nomeComprador", "Admin Fluig");
      //form.setValue("valor_original", "90.000,00");
      //var userEmail = getColleagueName(user);

      // Coletar e-mail pelo nome do comprador
      // if (form.getValue("nomeComprador") != "") {
      //   var userEmail = form.getValue("nomeComprador");
      // }

      // var c1 = DatasetFactory.createConstraint('colleagueName', userEmail, userEmail, ConstraintType.MUST);
      // var dataset = DatasetFactory.getDataset("colleague", null, [c1], null);

      // var email = dataset.getValue(0, "mail");
      // form.setValue("email_solicitante", email);
    }

    if (activity == 15) {
      cor_div_formulario_inicial = corDeFundoAtiva;
      cor_div_identificacao = corDeFundoAtiva;
      form.setVisibleById("div_identificacao", true);
      form.setVisibleById("div_Avaliacao", false);
    }

    if (activity == 21) {
      cor_div_formulario_inicial = corDeFundoInativa;
      form.setVisibleById("div_Avaliacao", false);
    }

    if (activity == 29) {
      cor_div_formulario_inicial = corDeFundoInativa;
      cor_div_identificacao = corDeFundoInativa;
      cor_div_avaliacao = corDeFundoAtiva;
      form.setVisibleById("div_Avaliacao", true);
    }

    /** Aplicação cores de fundo */
    customAppend += "\n $('#div_formulario_inicial section').css('background-color','" + cor_div_formulario_inicial + "'); ";
    customAppend += "\n $('#div_identificacao').css('background-color','" + cor_div_identificacao + "'); ";
    customAppend += "\n $('#div_Avaliacao').css('background-color','" + cor_div_avaliacao + "'); ";

    /****  div_atribuicoes ****/
    form.setVisibleById("div_atribuicoes", false);
    form.setVisibleById("div_dados_ocultos", false);

    if (gestorDoProcesso(user, "G7-ATRIBUICAO")) {
      form.setVisibleById("div_atribuicoes", true);
      form.setVisibleById("div_dados_ocultos", true);
    }

    customAppend += "\n</script>";
    customHTML.append(customAppend);

  } catch (error) {
    log.info("Erro no G7: ", error);
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
  if (datasetAttachment.rowsCount > 0) return datasetAttachment.getValue(0, "colleagueName");
  return user;
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

/**
* Valida se um usuário pertecer a um grupo ou não
* @param {String} colleagueId código do usuário  
* @param {String} groupId código do grupo
* @returns true se o usuário pertencer ao grupo que foi informado
*/
function gestorDoProcesso(colleagueId, groupId) {
  var datasetColleagueGroup = DatasetFactory.getDataset('colleagueGroup', null, new Array(
    DatasetFactory.createConstraint('colleagueGroupPK.colleagueId', colleagueId, colleagueId, ConstraintType.MUST),
    DatasetFactory.createConstraint('colleagueGroupPK.groupId', groupId, groupId, ConstraintType.MUST)
  ), null);
  if (datasetColleagueGroup.rowsCount > 0) {
    return true;
  } else {
    return false;
  }
}