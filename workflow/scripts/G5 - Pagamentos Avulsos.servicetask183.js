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
    var usuario = 'suporte.totvs'
    var senha = 'Suporte#5'
    var authenticatedService = getWebService(usuario, senha, "RMWsDataServer", "com.totvs.WsDataServer", "com.totvs.IwsDataServer");

    var idLanModelo = parseInt(hAPI.getCardValue("idLan")) > 0 ? hAPI.getCardValue("idLan") : 19051;
    var idLanNovo = parseInt(hAPI.getCardValue("idLan")) > 0 ? hAPI.getCardValue("idLan") : "-1";

    var primaryKey = hAPI.getCardValue("coligada") + ";" + idLanModelo;
    var context = "CodSistema=F;CodColigada=1";
    var text = String(authenticatedService.readRecord(dataServerName, primaryKey, context));
    if (!ChekExist(text)) text = GetXml();

    text = formatStringToXML(text);
    text = removeNode(text, "_x0024_IMAGES");
    text = removeNode(text, "FLANCOMPL");
    text = removeNode(text, "FLANRATCCU");

    text = replaceValue(text, 'CODCOLIGADA', hAPI.getCardValue("coligada"));
    text = replaceValue(text, 'IDLAN', idLanNovo);
    text = replaceValue(text, 'NUMERODOCUMENTO', hAPI.getCardValue("numero_documento_analise"));
    text = replaceValue(text, 'PAGREC', hAPI.getCardValue("pagar_receber"));
    text = replaceValue(text, 'CODCCUSTO', codCCusto);
    text = replaceValue(text, 'HISTORICO', hAPI.getCardValue("historico_analise"));
    text = replaceValue(text, 'DATAVENCIMENTO', dataVencimento);
    text = replaceValue(text, 'DATAEMISSAO', dataEmissao);
    text = replaceValue(text, 'DATAPREVBAIXA', dataPrevBaixa);
    text = replaceValue(text, 'VALORORIGINAL', valorOriginal);
    text = replaceValue(text, 'VALORCAPBX', formatText2Float(hAPI.getCardValue("hidden_valor_cap")));
    text = replaceValue(text, 'VALORJUROS', formatText2Float(hAPI.getCardValue("hidden_valor_juros")));
    text = replaceValue(text, 'VALORDESCONTO', hAPI.getCardValue("hidden_valor_desconto"));
    text = replaceValue(text, 'VALORMULTA', formatText2Float(hAPI.getCardValue("hidden_valor_multa")));
    text = replaceValue(text, 'CAPMENSAL', hAPI.getCardValue("cap_mensal_analise"));
    text = replaceValue(text, 'CODCOLCFO', hAPI.getCardValue("hidden_coligada_cli_for"));
    text = replaceValue(text, 'CODCFO', hAPI.getCardValue("hidden_codigo_cli_for"));
    text = replaceValue(text, 'CODCOLCXA', hAPI.getCardValue("coligada"));
    text = replaceValue(text, 'CODCXA', hAPI.getCardValue("conta_caixa_analise"));
    text = replaceValue(text, 'CODTDO', hAPI.getCardValue("dados_pagamento_analise"));
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
      dadosDoItem.put("CODCOLIGADA", String(hAPI.getCardValue("coligada")));
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
    log.info("============================= XML =============================")
    log.info(newXML)
    var result = authenticatedService.saveRecord(dataServerName, newXML, context);
    var result = String(result);
    checkIsPK(result, 2);
    var movimentoGerado = result.split(";")[1];
    hAPI.setCardValue("idLan", String(movimentoGerado));
    return true;
  } catch (error) {
    throw String(" Linha: " + error.lineNuber + " - " + String(error));
  }
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
  log.dir({
    'columnName': columnName,
    'newValue': newValue
  })
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

function GetXml() {
  return "<FinLAN>" +
    "\n   <FLAN>" +
    "\n      <CODCOLIGADA>1</CODCOLIGADA>" +
    "\n      <IDLAN>-1</IDLAN>  " +
    "\n      <NUMERODOCUMENTO>000046632/09</NUMERODOCUMENTO>" +
    "\n      <NFOUDUP>0</NFOUDUP>" +
    "\n      <CLASSIFICACAO>0</CLASSIFICACAO>" +
    "\n      <PAGREC>2</PAGREC>" +
    "\n      <STATUSLAN>0</STATUSLAN>" +
    "\n      <CODAPLICACAO>F</CODAPLICACAO>" +
    "\n      <CODCCUSTO>01.01.01.01.002</CODCCUSTO>" +
    "\n      <HISTORICO>teste</HISTORICO>" +
    "\n      <DATAVENCIMENTO>2024-07-31T00:00:00.000</DATAVENCIMENTO>" +
    "\n      <DATAEMISSAO>2024-07-25T00:00:00.000</DATAEMISSAO>" +
    "\n      <DATAPREVBAIXA>2024-07-25T00:00:00.000</DATAPREVBAIXA>" +
    "\n      <VALORORIGINAL>1.0000</VALORORIGINAL>" +
    "\n      <VALORCAPBX>0.0000</VALORCAPBX>" +
    "\n      <VALORJUROS>0.0000</VALORJUROS>" +
    "\n      <VALORDESCONTO>0.0000</VALORDESCONTO>" +
    "\n      <VALORMULTA>0.0000</VALORMULTA>" +
    "\n      <VALORAUXILIAR>0.0000</VALORAUXILIAR>" +
    "\n      <VALORBASEIRRF>100.0000</VALORBASEIRRF>" +
    "\n      <VALORIRRF>0.0000</VALORIRRF>" +
    "\n      <VALORREPASSE>0.0000</VALORREPASSE>" +
    "\n      <VALORVENCIMENTOANTECIP>0.0000</VALORVENCIMENTOANTECIP>" +
    "\n      <VALORNOTACREDITO>0.0000</VALORNOTACREDITO>" +
    "\n      <VALORADIANTAMENTO>0.0000</VALORADIANTAMENTO>" +
    "\n      <VALORDEVOLUCAO>0.0000</VALORDEVOLUCAO>" +
    "\n      <CAPMENSAL>00.00</CAPMENSAL>" +
    "\n      <TAXASVENDOR>0.0000</TAXASVENDOR>" +
    "\n      <JUROSVENDOR>0.0000</JUROSVENDOR>" +
    "\n      <CODCOLCFO>0</CODCOLCFO>" +
    "\n      <CODCFO>000000003</CODCFO>" +
    "\n      <CODCOLCXA>1</CODCOLCXA>" +
    "\n      <CODCXA>99522-9</CODCXA>" +
    "\n      <IDPGTO>1</IDPGTO>" +
    "\n      <CODTDO>PIX</CODTDO>" +
    "\n      <CODFILIAL>1</CODFILIAL>" +
    "\n      <SERIEDOCUMENTO>1</SERIEDOCUMENTO>" +
    "\n      <TIPOCONTABILLAN>0</TIPOCONTABILLAN>" +
    "\n      <CODMOEVALORORIGINAL>R$</CODMOEVALORORIGINAL>" +
    "\n      <LIBAUTORIZADA>0</LIBAUTORIZADA>" +
    "\n      <STATUSEXPORTACAO>0</STATUSEXPORTACAO>" +
    "\n      <NUMLOTECONTABIL>0</NUMLOTECONTABIL>" +
    "\n      <STATUSEXTRATO>0</STATUSEXTRATO>" +
    "\n      <CNABACEITE>0</CNABACEITE>" +
    "\n      <CNABSTATUS>0</CNABSTATUS>" +
    "\n      <CNABBANCO>341</CNABBANCO>" +
    "\n      <REEMBOLSAVEL>0</REEMBOLSAVEL>" +
    "\n      <USUARIO>LUCIANA.S</USUARIO>" +
    "\n      <BAIXAAUTORIZADA>1</BAIXAAUTORIZADA>" +
    "\n      <TEMCHEQUEPARCIAL>0</TEMCHEQUEPARCIAL>" +
    "\n      <JAIMPRIMIU>0</JAIMPRIMIU>" +
    "\n      <NUMBLOQUEIOS>0</NUMBLOQUEIOS>" +
    "\n      <COTACAOINCLUSAO>1.000000000</COTACAOINCLUSAO>" +
    "\n      <COTACAOBAIXA>0.000000000</COTACAOBAIXA>" +
    "\n      <CARENCIAJUROS>0</CARENCIAJUROS>" +
    "\n      <TIPOJUROSDIA>0</TIPOJUROSDIA>" +
    "\n      <USUARIOCRIACAO>LUCIANA.S</USUARIOCRIACAO>" +
    "\n      <DATAALTERACAO>2024-03-05T00:00:00</DATAALTERACAO>" +
    "\n      <ALTERACAOBLOQUEADA>0</ALTERACAOBLOQUEADA>" +
    "\n      <MULTADIA>0.0000</MULTADIA>" +
    "\n      <DESCONTADO>0</DESCONTADO>" +
    "\n      <VALORINSS>0.0000</VALORINSS>" +
    "\n      <VALORDEDUCAO>0.0000</VALORDEDUCAO>" +
    "\n      <APLICFORMULA>F</APLICFORMULA>" +
    "\n      <INSSEMOUTRAEMPRESA>0.0000</INSSEMOUTRAEMPRESA>" +
    "\n      <PERCENTBASEINSS>100.0000</PERCENTBASEINSS>" +
    "\n      <OCAUTONOMO>0</OCAUTONOMO>" +
    "\n      <PERCBASEINSSEMPREGADO>100.0000</PERCBASEINSSEMPREGADO>" +
    "\n      <INSSEDITADO>0</INSSEDITADO>" +
    "\n      <IRRFEDITADO>0</IRRFEDITADO>" +
    "\n      <REUTILIZACAO>0</REUTILIZACAO>" +
    "\n      <CATEGORIAAUTONOMO>0</CATEGORIAAUTONOMO>" +
    "\n      <VALORSESTSENAT>0.0000</VALORSESTSENAT>" +
    "\n      <CONVENIO>99522</CONVENIO>" +
    "\n      <DIGCONVENIO>9</DIGCONVENIO>" +
    "\n      <PERCJUROS>0</PERCJUROS>" +
    "\n      <PERCDESCONTO>0</PERCDESCONTO>" +
    "\n      <PERCMULTA>0</PERCMULTA>" +
    "\n      <PERCCAP>0</PERCCAP>" +
    "\n      <PERCOP1>0</PERCOP1>" +
    "\n      <PERCOP2>0</PERCOP2>" +
    "\n      <PERCOP3>0</PERCOP3>" +
    "\n      <PERCOP4>0</PERCOP4>" +
    "\n      <PERCOP5>0</PERCOP5>" +
    "\n      <PERCOP6>0</PERCOP6>" +
    "\n      <PERCOP7>0</PERCOP7>" +
    "\n      <PERCOP8>0</PERCOP8>" +
    "\n      <VALORINSSEMPREGADOR>0</VALORINSSEMPREGADOR>" +
    "\n      <VALORBASEINSSEMPREGADOR>0</VALORBASEINSSEMPREGADOR>" +
    "\n      <VRBASEINSS>0</VRBASEINSS>" +
    "\n      <VRBASEIRRF>0.0000</VRBASEIRRF>" +
    "\n      <VALORSERVICO>0.0000</VALORSERVICO>" +
    "\n      <VRBASEINSSOUTRAEMPRESA>0.0000</VRBASEINSSOUTRAEMPRESA>" +
    "\n      <IDHISTORICO>6125</IDHISTORICO>" +
    "\n      <PreencherRatCCusto>true</PreencherRatCCusto>" +
    "\n      <PreencherRatDepto>true</PreencherRatDepto>" +
    "\n      <VALORDEDUCAODEPENDENTES>0.0000</VALORDEDUCAODEPENDENTES>" +
    "\n      <VRPERDAFINANCEIRA>0.0000</VRPERDAFINANCEIRA>" +
    "\n      <MODELOCONTABILIZACAO>0</MODELOCONTABILIZACAO>" +
    "\n      <MODELOCONTABILIZACAOBAIXA>0</MODELOCONTABILIZACAOBAIXA>" +
    "\n      <CODCOLCONVENIO>1</CODCOLCONVENIO>" +
    "\n      <IDCONVENIO>14</IDCONVENIO>" +
    "\n      <VALORORIGINALBX>0</VALORORIGINALBX>" +
    "\n      <VALORDESCONTOBX>0</VALORDESCONTOBX>" +
    "\n      <VALORJUROSBX>0</VALORJUROSBX>" +
    "\n      <VALORMULTABX>0</VALORMULTABX>" +
    "\n      <VALORCAPBX>0</VALORCAPBX>" +
    "\n      <VALOROP1BX>0,0000</VALOROP1BX>" +
    "\n      <VALOROP2BX>0,0000</VALOROP2BX>" +
    "\n      <VALOROP3BX>0,0000</VALOROP3BX>" +
    "\n      <VALOROP4BX>0,0000</VALOROP4BX>" +
    "\n      <VALOROP5BX>0,0000</VALOROP5BX>" +
    "\n      <VALOROP6BX>0,0000</VALOROP6BX>" +
    "\n      <VALOROP7BX>0,0000</VALOROP7BX>" +
    "\n      <VALOROP8BX>0,0000</VALOROP8BX>" +
    "\n      <VALORINSSBX>0</VALORINSSBX>" +
    "\n      <VALORIRRFBX>0</VALORIRRFBX>" +
    "\n      <VALORSESTSENATBX>0</VALORSESTSENATBX>" +
    "\n      <VALORDEVOLUCAOBX>0</VALORDEVOLUCAOBX>" +
    "\n      <VALORNOTACREDITOBX>0</VALORNOTACREDITOBX>" +
    "\n      <VALORADIANTAMENTOBX>0</VALORADIANTAMENTOBX>" +
    "\n      <VALORJUROSVENDORBX>0</VALORJUROSVENDORBX>" +
    "\n      <VALORRETENCOESBX>0</VALORRETENCOESBX>" +
    "\n      <STATUSORCAMENTO>0</STATUSORCAMENTO>" +
    "\n      <BAIXAPENDENTE>0</BAIXAPENDENTE>" +
    "\n      <CODCOLTOMADOR>0</CODCOLTOMADOR>" +
    "\n      <VALORDESCONTOACORDO>0.0000</VALORDESCONTOACORDO>" +
    "\n      <VALORJUROSACORDO>0.0000</VALORJUROSACORDO>" +
    "\n      <VALORACRESCIMOACORDO>0.0000</VALORACRESCIMOACORDO>" +
    "\n      <VALORDEDUCAOVARIAVEL>0.0000</VALORDEDUCAOVARIAVEL>" +
    "\n      <STATUSLIQDUVIDOSA>0</STATUSLIQDUVIDOSA>" +
    "\n      <VALORVINCULADO>0</VALORVINCULADO>" +
    "\n      <STATUSNEGATIVACAO>0</STATUSNEGATIVACAO>" +
    "\n      <PreencheDadosBancarios>true</PreencheDadosBancarios>" +
    "\n      <STATUSTERCEIRIZACAO>0</STATUSTERCEIRIZACAO>" +
    "\n      <STATUSAPROVACAO>0</STATUSAPROVACAO>" +
    "\n      <CODCOLPGTO>1</CODCOLPGTO>" +
    "\n  </FLAN>" +
    "\n</FinLAN>";
}