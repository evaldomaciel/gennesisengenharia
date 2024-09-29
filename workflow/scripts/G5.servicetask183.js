function servicetask183(attempt, message) {
  var codCCusto = hAPI.getCardValue("centro_de_custo");
  codCCusto = codCCusto.split(" - ")[0];
  var valorOriginal = hAPI.getCardValue("valor_original_analise")
  valorOriginal = formatText2Float(valorOriginal);
  var dataVencimento = hAPI.getCardValue("hidden_data_vencimento");
  dataVencimento = dataVencimento.replace("Z", "");
  var dataEmissao = hAPI.getCardValue("hidden_data_emissao");
  dataEmissao = dataEmissao.replace("Z", "");
  var dataPrevBaixa = hAPI.getCardValue("hidden_data_previabaixa");
  dataPrevBaixa = dataPrevBaixa.replace("Z", "");

  try {
    var dataServerName = 'FinLanDataBR'
    var usuario = getConstante('rm_usuario')
    var senha = getConstante('rm_senha')
    var authenticatedService = getWebService(usuario, senha, "RMWsDataServer", "com.totvs.WsDataServer", "com.totvs.IwsDataServer");
    var idLanNovo = parseInt(hAPI.getCardValue("idLan")) > 0 ? hAPI.getCardValue("idLan") : "-1";
    var historico_analise = String(hAPI.getCardValue("historico_analise")) + ' - Solicitação do Fluig número ' + getValue('WKNumProces');
    hAPI.setCardValue("historico_analise", historico_analise);
    var text = GetXml();
    text = formatStringToXML(text);
    text = removeNode(text, "_x0024_IMAGES");
    text = removeNode(text, "FLANCOMPL");
    text = removeNode(text, "FLANRATCCU");

    /** Validando se o pagamento é via boleto */
    if (hAPI.getCardValue("dados_pagamento") != "BOLETO") {
      text = removeNode(text, "IPTE");
    } else {
      text = replaceValue(text, 'IPTE', hAPI.getCardValue("cod_boleto_analise"));
    }

    text = replaceValue(text, 'CODCOLIGADA', hAPI.getCardValue("CODCOLIGADA"));
    text = replaceValue(text, 'CODCOLCONVENIO', hAPI.getCardValue("CODCOLIGADA"));
    text = replaceValue(text, 'CODCOLPGTO', hAPI.getCardValue("CODCOLIGADA"));
    text = replaceValue(text, 'IDLAN', idLanNovo);
    text = replaceValue(text, 'NUMERODOCUMENTO', hAPI.getCardValue("numero_documento_analise"));
    text = replaceValue(text, 'PAGREC', hAPI.getCardValue("pagar_receber"));
    text = replaceValue(text, 'CODCCUSTO', codCCusto);
    text = replaceValue(text, 'HISTORICO', historico_analise);
    text = replaceValue(text, 'DATAVENCIMENTO', dataVencimento);
    text = replaceValue(text, 'DATAEMISSAO', dataEmissao);
    text = replaceValue(text, 'DATAPREVBAIXA', dataVencimento); ///dataPrevBaixa);
    text = replaceValue(text, 'VALORORIGINAL', valorOriginal);
    text = replaceValue(text, 'VALORCAPBX', formatText2Float(hAPI.getCardValue("hidden_valor_cap")));
    text = replaceValue(text, 'VALORJUROS', formatText2Float(hAPI.getCardValue("hidden_valor_juros")));
    text = replaceValue(text, 'VALORDESCONTO', hAPI.getCardValue("hidden_valor_desconto"));
    text = replaceValue(text, 'VALORMULTA', formatText2Float(hAPI.getCardValue("hidden_valor_multa")));
    text = replaceValue(text, 'CAPMENSAL', hAPI.getCardValue("cap_mensal_analise"));
    text = replaceValue(text, 'CODCOLCFO', hAPI.getCardValue("hidden_coligada_cli_for"));
    text = replaceValue(text, 'CODCFO', hAPI.getCardValue("hidden_codigo_cli_for"));
    text = replaceValue(text, 'CODCOLCXA', hAPI.getCardValue("CODCOLIGADA"));
    text = replaceValue(text, 'CODCXA', hAPI.getCardValue("conta_caixa_analise"));
    text = replaceValue(text, 'CODTDO', hAPI.getCardValue("CODTDO"));
    text = replaceValue(text, 'IDPGTO', hAPI.getCardValue("cad_referencia_fin"));
    text = replaceValue(text, 'CODFILIAL', hAPI.getCardValue("filial_analise"));
    text = replaceValue(text, 'CNABBANCO', "341");
    text = replaceValue(text, 'REEMBOLSAVEL', "0");
    text = replaceValue(text, 'CARENCIAJUROS', hAPI.getCardValue("hidden_valor_carencia"));
    text = replaceValue(text, 'MULTADIA', formatText2Float(hAPI.getCardValue("multa_dia_analise")));
    text = replaceValue(text, 'PERCJUROS', formatText2Float(hAPI.getCardValue("percentual_juros_analise")));
    text = replaceValue(text, 'PERCDESCONTO', formatText2Float(hAPI.getCardValue("percentual_desc_analise")));
    text = replaceValue(text, 'PERCMULTA', formatText2Float(hAPI.getCardValue("percentual_multa_analise")));
    text = replaceValue(text, 'PERCCAP', formatText2Float(hAPI.getCardValue("percentual_cap_analise")));

    var rateios = "";
    var table_rateio_ccusto_fin_indexes = hAPI.getChildrenIndexes("table_rateio_ccusto_fin");
    for (var i = 0; i < table_rateio_ccusto_fin_indexes.length; i++) {
      var dadosDoItem = new java.util.HashMap();
      var coluna_ccusto_fin = String(hAPI.getCardValue("coluna_ccusto_fin" + "___" + table_rateio_ccusto_fin_indexes[i])).split("-");
      var coluna_natureza_fin = String(hAPI.getCardValue("coluna_natureza_fin" + "___" + table_rateio_ccusto_fin_indexes[i])).split("-");
      dadosDoItem.put("CODCOLIGADA", String(hAPI.getCardValue("CODCOLIGADA")));
      dadosDoItem.put("CODCCUSTO", String(coluna_ccusto_fin[0]).trim());
      dadosDoItem.put("NOME", String(coluna_ccusto_fin[1]).trim());
      dadosDoItem.put("CODNATFINANCEIRA", String(coluna_natureza_fin[0]).trim());
      dadosDoItem.put("DESCRICAO", String(coluna_natureza_fin[1]).trim());
      dadosDoItem.put("VALOR", formatText2Float(hAPI.getCardValue("coluna_valor_fin" + "___" + table_rateio_ccusto_fin_indexes[i])));
      dadosDoItem.put("PERCENTUAL", formatText2Float(hAPI.getCardValue("coluna_percentual_fin" + "___" + table_rateio_ccusto_fin_indexes[i])));
      dadosDoItem.put("IDRATCCU", String(idLanNovo));
      dadosDoItem.put("IDLAN", String(idLanNovo));
      dadosDoItem.put("CODCOLNATFINANCEIRA", "0");
      rateios += makeFLANRATCCUXML(dadosDoItem);
    }
    text = addItem(text, "</FinLAN>", rateios);
    var newXML = new XML(text)
    log.info(newXML)
    var result = authenticatedService.saveRecord(dataServerName, text, context);
    var result = String(result);
    checkIsPK(result, 2);
    var movimentoGerado = result.split(";")[1];
    hAPI.setCardValue("idLan", String(movimentoGerado));
    return true;
  } catch (error) {
    throw String(" Linha: " + error.lineNuber + " - " + String(error));
  }
}

function GetXml() {
  return "<FinLAN>" +
    "  <FLAN>" +
    "     <CODCOLIGADA>2</CODCOLIGADA>" +
    "     <IDLAN>-1</IDLAN>" +
    "     <NUMERODOCUMENTO>0</NUMERODOCUMENTO>" +
    "     <IPTE></IPTE>" +
    "     <NFOUDUP>0</NFOUDUP>" +
    "     <CLASSIFICACAO>0</CLASSIFICACAO>" +
    "     <PAGREC>0</PAGREC>" +
    "     <CNABBANCO>341</CNABBANCO>" +
    "     <REEMBOLSAVEL>0</REEMBOLSAVEL>" +
    "     <CARENCIAJUROS>0</CARENCIAJUROS>" +
    "     <MULTADIA>0</MULTADIA>" +
    "     <PERCJUROS>0</PERCJUROS>" +
    "     <PERCDESCONTO>0</PERCDESCONTO>" +
    "     <PERCMULTA>0</PERCMULTA>" +
    "     <PERCCAP>0</PERCCAP>" +
    "     <STATUSLAN>0</STATUSLAN>" +
    "     <CODAPLICACAO>F</CODAPLICACAO>" +
    "     <CODCCUSTO>01</CODCCUSTO>" +
    "     <HISTORICO>Inserido Pelo Fluig</HISTORICO>" +
    "     <DATACRIACAO>2050-01-01T00:00:00</DATACRIACAO>" +
    "     <DATAVENCIMENTO>2050-01-01T00:00:00.000</DATAVENCIMENTO>" +
    "     <DATAEMISSAO>2050-01-01T00:00:00.000</DATAEMISSAO>" +
    "     <DATAPREVBAIXA>2050-01-01T00:00:00.000</DATAPREVBAIXA>" +
    "     <MESDECOMPETENCIA>2050-01-01T00:00:00</MESDECOMPETENCIA>" +
    "     <VALORORIGINAL>0</VALORORIGINAL>" +
    "     <VALORBAIXADO>0</VALORBAIXADO>" +
    "     <VALORCAP>0</VALORCAP>" +
    "     <VALORCAPBX>0</VALORCAPBX>" +
    "     <VALORJUROS>0</VALORJUROS>" +
    "     <VALORDESCONTO>0</VALORDESCONTO>" +
    "     <VALORCHEQUE>0</VALORCHEQUE>" +
    "     <VALOROP1>0</VALOROP1>" +
    "     <VALOROP2>0</VALOROP2>" +
    "     <VALOROP3>0</VALOROP3>" +
    "     <VALOROP4>0</VALOROP4>" +
    "     <VALOROP5>0</VALOROP5>" +
    "     <VALOROP6>0</VALOROP6>" +
    "     <VALORMULTA>0</VALORMULTA>" +
    "     <VALORAUXILIAR>0</VALORAUXILIAR>" +
    "     <VALORBASEIRRF>0</VALORBASEIRRF>" +
    "     <VALORIRRF>0</VALORIRRF>" +
    "     <VALORREPASSE>0</VALORREPASSE>" +
    "     <VALORVENCIMENTOANTECIP>0</VALORVENCIMENTOANTECIP>" +
    "     <VALORNOTACREDITO>0</VALORNOTACREDITO>" +
    "     <VALORADIANTAMENTO>0</VALORADIANTAMENTO>" +
    "     <VALORDEVOLUCAO>0</VALORDEVOLUCAO>" +
    "     <JUROSDIA>0</JUROSDIA>" +
    "     <CAPMENSAL>0</CAPMENSAL>" +
    "     <TAXASVENDOR>0</TAXASVENDOR>" +
    "     <JUROSVENDOR>0</JUROSVENDOR>" +
    "     <CODCOLCFO></CODCOLCFO>" +
    "     <CODCFO></CODCFO>" +
    "     <CODCOLCXA></CODCOLCXA>" +
    "     <CODCXA>IMPL</CODCXA>" +
    "     <IDPGTO></IDPGTO>" +
    "     <CODTDO></CODTDO>" +
    "     <CODFILIAL></CODFILIAL>" +
    "     <SERIEDOCUMENTO>@@@</SERIEDOCUMENTO>" +
    "     <CODCOLPGTO>-1</CODCOLPGTO>" +
    "     <NUMLOTECONTABIL>0</NUMLOTECONTABIL>" +
    "     <TIPOCONTABILLAN>0</TIPOCONTABILLAN>" +
    "     <MODELOCONTABILIZACAO>0</MODELOCONTABILIZACAO>" +
    "     <MODELOCONTABILIZACAOBAIXA>0</MODELOCONTABILIZACAOBAIXA>" +
    "  </FLAN>" +
    "</FinLAN>";
}

function getConstraints(constraints) {
  var objRetorno = {}
  if (constraints != null && constraints.length > 0) {
    for (var c = 0; c < constraints.length; c++) {
      if (constraints[c].fieldName.toUpperCase() != "SQLLIMIT") {
        objRetorno[constraints[c].fieldName.toUpperCase()] = constraints[c].initialValue
      }
    }
  }
  return objRetorno;
}

function ChekExist(result) {
  var lines = result.split('\r');
  if (lines.length > 1) return true
  else return false;
}

function checkIsPK(result, qtd) {
  var lines = result.split('\r');
  if (lines.length == 1) {
    var pk = result.split(';');
    if (pk.length == qtd) return;
  }
  throw result;
}

/**
 * @param {String} params recebe uma string para remoção da mascara aplicada no campo  
 * @returns número decimal 
 */
function formatText2Float(params) {
  params = String(params);
  if (params.indexOf(",") >= 0) {
    var regexExpression = RegExp('\\.', 'g');
    params = params.replace(regexExpression, '');
  }
  return params;
}

function makeFLANRATCCUXML(dados) {
  var item = "";
  item += "\n<FLANRATCCU>";
  item += "\n    <IDRATCCU>" + dados.get("IDRATCCU") + "</IDRATCCU>";
  item += "\n    <CODCOLIGADA>" + dados.get("CODCOLIGADA") + "</CODCOLIGADA>";
  item += "\n    <IDLAN>" + dados.get("IDLAN") + "</IDLAN>";
  item += "\n    <CODCCUSTO>" + dados.get("CODCCUSTO") + "</CODCCUSTO>";
  item += "\n    <NOME>" + dados.get("NOME") + "</NOME>";
  item += "\n    <VALOR>" + dados.get("VALOR") + "</VALOR>";
  item += "\n    <PERCENTUAL>" + dados.get("PERCENTUAL") + "</PERCENTUAL>";
  item += "\n    <CODCOLNATFINANCEIRA>" + dados.get("CODCOLNATFINANCEIRA") + "</CODCOLNATFINANCEIRA>";
  item += "\n    <CODNATFINANCEIRA>" + dados.get("CODNATFINANCEIRA") + "</CODNATFINANCEIRA>";
  item += "\n    <DESCRICAO>" + dados.get("DESCRICAO") + "</DESCRICAO>";
  item += "\n</FLANRATCCU>";
  return item;
}

function addItem(text, prevColumnName, newColumn) {
  if (prevColumnName != null && prevColumnName.trim() != "" && text.indexOf(prevColumnName) >= 0) {
    var entryPoint = text.indexOf(prevColumnName);
    return text.substr(0, entryPoint) + newColumn + text.substr(entryPoint);;
  }
  else {
    return text
  };
}

function replaceValue(text, columnName, newValue) {
  newValue = String(newValue);
  if ((newValue != null) && (newValue.trim() != "")) {
    var regex = new RegExp("<" + columnName + ">(.*?)<\\/" + columnName + ">", "g");
    var replaceText = "<" + columnName + ">" + newValue + "</" + columnName + ">";
    return text.replace(regex, replaceText);
  }
  else return text;
}

function removeValue(text, columnName) {
  var regex = new RegExp("<" + columnName + ">(.*?)<\\/" + columnName + ">", "g");
  var replaceText = "<" + columnName + "></" + columnName + ">";
  return text.replace(regex, replaceText);
}

function removeNode(text, columnName) {
  var regex = new RegExp("<" + columnName + ">(.*?)<\\/" + columnName + ">", "g");
  var replaceText = "";
  return text.replace(regex, replaceText);
}

/**
* A API de autenticação da Totvs baseia no "Basic access authentication" do HTTP.
* Código Java para autenticação 
* Programa responsável por integrar com os Web services do RM 
*  Exemplo dev valores para os parâmetros 
* @param {String} user nome de usuário
* @param {String} pass senha do usuário 
* @param {String} serviceRM nome do serviço cadastrado no painel de controle
* @param {String} instance instância do serviço "com.totvs.WsDataServer"
* @param {String} authClient instância do serviço de autenticação "com.totvs.IwsDataServer"
* @returns parâmetros de autenticação
*/
function getWebService(user, pass, serviceRM, instance, authClient) {
  var dataServerService = ServiceManager.getServiceInstance(serviceRM);
  if (dataServerService == null) {
    throw "Serviço nao encontrado: " + serviceRM;
  }
  var serviceLocator = dataServerService.instantiate(instance);
  if (serviceLocator == null) {
    throw "Instancia do serviço nao encontrada: " + serviceRM + " - " + instance;
  }
  var service = serviceLocator.getRMIwsDataServer();
  if (service == null) {
    throw "Instancia do dataserver do invalida: " + serviceRM + " - " + instance;
  }
  var serviceHelper = dataServerService.getBean();
  if (serviceHelper == null) {
    throw "Instancia do service helper invalida: " + serviceRM + " - " + instance;
  }
  var authService = serviceHelper.getBasicAuthenticatedClient(service, authClient, user, pass);
  if (serviceHelper == null) {
    throw "Instancia do auth service invalida: " + serviceRM + " - " + instance;
  }
  return authService;
}

/**
 * Trata o XML para evitar que a próximas funções a serem executadas retornem algum erro
 * @param {string} params string de integração  
 * @returns string de integração sem os cacteres que podem causar algum problema na integração
 */
function formatStringToXML(params) {
  var regexLineR = new RegExp("\r", "g");
  var regexLine = new RegExp("\n", "g");
  var regexTab = new RegExp("\t", "g");
  var regexDspace = new RegExp("  ", "g");
  var text = params.replace(regexLine, " ");
  text = text.replace(regexLineR, " ");
  text = text.replace(regexTab, " ");
  text = text.replace(regexDspace, " ");
  return text = text.trim();
}
