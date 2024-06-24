

function CarregaCancelamento(){
	var CodColigada 	= hAPI.getCardValue("CodColigada");
	var IdMov 			= hAPI.getCardValue("IdMov");
	var XML				= '';
	
	var XML = "<MovCancelMovProcParams>";
		XML += "<MovimentosACancelar>";
			XML += "<MovimentosCancelar>";
				XML += "<ApagarMovRelac>false</ApagarMovRelac>";
				XML += "<CodColigada>"+CodColigada+"</CodColigada>";
				XML += "<CodSistemaLogado>T</CodSistemaLogado>";
				XML += ValidaCampo("CodUsuarioLogado", "fluig");
				XML += ValidaCampo("DataCancelamento", (new Date()).toLocaleDateString("pt-BR"));
				XML += ValidaCampo("IdMov", IdMov);
				XML += ValidaCampo("MotivoCancelamento", "Movimento Cancelado à Reprovação da Diretoria");
			XML += "</MovimentosCancelar>";
		XML += "</MovimentosACancelar>";
	XML += "</MovCancelMovProcParams>";
	
	log.info("############### CUSTOM: G3 - Cancelamento XML________________________________________________________________");
    log.info(XML);
    
    try {
		log.info("############### CUSTOM: G3 - serviceIntegracao Cancelamento...");
		callTBCRMProcess(XML);
	} catch (e) {
		throw "############### ERRO >>> " + e;
	}
}

function callTBCRMProcess(XML) {
	
	//Credenciais Auth Basic TBC
	var usuario = getAccess()[0];
	var pass = getAccess()[1];
	var vBase64 = new org.apache.commons.codec.binary.Base64();
	var senha = new java.lang.String(vBase64.decodeBase64(pass.getBytes()));
	//WS
	var NOME_SERVICO = "RmWsProcess";
    var CAMINHO_SERVICO = "com.totvs.WsProcess";    
    var servico = ServiceManager.getServiceInstance(NOME_SERVICO);	
	var serviceHelper = servico.getBean();
    var instancia = servico.instantiate(CAMINHO_SERVICO);
    var ws = instancia.getRMIwsProcess();    
    var authenticatedService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsProcess",usuario, senha);
    log.error(ws);
    
    try {
		var result = authenticatedService.executeWithParams("MovCancelMovProc", XML);
		if ((result != null) && (result.indexOf("===") != -1)) {
			var msgErro = result.substring(0, result.indexOf("==="));			
			throw msgErro;
		}
	}
	catch (e) {		
		if (e == null) {
			e = "Erro desconhecido; verifique o log do AppServer";
    	}		
		var mensagemErro = "Erro na comunicação com o TOTVS TBC: " + e;
		log.error(mensagemErro + " ---> " + XML);		
		throw mensagemErro;
	}
}

function ValidaCampo(campo, valor) {
	if ((valor != null) && (valor != "")) {
		return "<"+campo+">"+valor+"</"+ campo + "> ";
	} else {
		return "";
	}
}

//Acesso TBC
function getAccess() {
  try {
    var response = new Array();
    var dataset = DatasetFactory.getDataset("dsTBCConnector", null, null, null);
    var u = dataset.getValue(0, "user");
    var p = dataset.getValue(0, "pass");
    response.push(u, p);
    return response;
  } catch (e) {
    throw "getAccess / " + e.toString();
  }
}