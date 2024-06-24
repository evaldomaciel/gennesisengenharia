function servicetask56(attempt, message) {
	try{
		Cancelamento();
	}catch(e){
		throw "servicetask50 " + e;
	}
}

function Cancelamento() {
	try {
		//Acesso PadraoRM
		var usuario = getAccess()[0];
		var pass = getAccess()[1];
 		var vBase64 = new org.apache.commons.codec.binary.Base64();
 		var senha = new java.lang.String(vBase64.decodeBase64(pass.getBytes()));
	    //FIM
	    
	    var codColigada     = hAPI.getCardValue("CodColigada");
	    var idMov           = hAPI.getCardValue("IdMov");
	    var numeroMov       = hAPI.getCardValue("numeroMov");
	    var XML				= '';
	    
	    log.info("LOG G3 servicetask50#####################################");
	    log.info("var codColigada  : "+codColigada);
	    log.info("var idMov        : "+idMov);
	    log.info("var numerMov     : "+numeroMov);
	    log.info("LOG G3 servicetask50######################################");
	    
     	var XML = "<MovCancelMovProcParams>";
     		XML += "<MovimentosACancelar>";
     			XML += "<MovimentosCancelar>";
     				XML += "<ApagarMovRelac>false</ApagarMovRelac>";
     				XML += "<CancelarMovimentosGeradosSimultFaturamento>false</CancelarMovimentosGeradosSimultFaturamento>";
     				XML += "<CancelarMovimentosGeradosSimultReabriCotacao>false</CancelarMovimentosGeradosSimultReabriCotacao>";
     				XML += "<CodColigada>"+codColigada+"</CodColigada>";
     				XML += "<CodSistemaLogado>T</CodSistemaLogado>";
     				XML += "<CodUsuarioLogado>fluig</CodUsuarioLogado>";     				
     				XML += ValidaCampo("DataCancelamento", (new Date()).toLocaleDateString("pt-BR"));
     				XML += "<ExcluirItensDaCotacao>false</ExcluirItensDaCotacao>";
     				XML += ValidaCampo("IdMov", idMov);
     				XML += ValidaCampo("MotivoCancelamento", "Movimento Cancelado por WorkFlow Fluig");
     				XML += ValidaCampo("NumeroMov",numeroMov);
     			XML += "</MovimentosCancelar>";
     		XML += "</MovimentosACancelar>";
     	XML += "</MovCancelMovProcParams>";		
	
    	var NOME_SERVICO = "wsProcess";
        var CAMINHO_SERVICO = "com.totvs.WsProcess";    
        var servico = ServiceManager.getServiceInstance(NOME_SERVICO);	
    	var serviceHelper = servico.getBean();
        var instancia = servico.instantiate(CAMINHO_SERVICO);
        var ws = instancia.getRMIwsProcess();    
        var authenticatedService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsProcess",usuario, senha);
        log.error(ws);
        var response = authenticatedService.executeWithParams("MovCancelMovProc", XML);
     	if ((response != null) && (response.indexOf("===") != -1)){
		  var msgErro = response.substring(0, response.indexOf("==="));
	      throw msgErro;
		}
		var dataset = DatasetBuilder.newDataset();
		dataset.addColumn("result");
		dataset.addRow(new Array(response));
		log.info("LOG G3 # result "+dataset);
		return dataset;
		
		
	} catch(e) {
		return getDatasetError("ERRO:"+e.String());
	}
}

function ValidaCampo(campo, valor){
	if ((valor != null) && (valor != "")){
		return "<"+campo+">"+valor+"</"+ campo + "> ";
	}else
		return "";
};
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
function getDatasetError(exception) {
    var dtsError = DatasetBuilder.newDataset();
    dtsError.addColumn("ERROR");
    dtsError.addRow([exception.toString()]);
    return dtsError;

};