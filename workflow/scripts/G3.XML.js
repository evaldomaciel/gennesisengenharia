function CarregaXML(atividade, etapa, aprovador, situacao){	
	var CodColigada 	= hAPI.getCardValue("CodColigada");
	var IdMov 			= hAPI.getCardValue("IdMov");
	var IdFluig			= hAPI.getCardValue("IdentificadorFluig");
	var XML				= '';
	
	//Metadados PRJ3934720 - APROVACAO FLUIG
	
	var valorID;
	
	if (atividade == "Inicio") {
		valorID = '-1';
	} else {
		var c1 = DatasetFactory.createConstraint("CODCOLIGADA", CodColigada, CodColigada, ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("IDMOV", IdMov, IdMov, ConstraintType.MUST);

        var constraints = [c1, c2];
        var dataset = DatasetFactory.getDataset("dsIDMetadados", null, constraints, null);
        
        if (dataset != null && dataset.rowsCount > 0) {
        	for (var i = 0; i < dataset.rowsCount; i++) {
        		valorID = dataset.getValue(i, "ID").toString().trim();
        	}
        }else{
        	valorID = "-1";
        }
	}
	
	XML = "<NewDataSet>";
		XML += "<ZMDAPROVACAOFLUIG>";
			XML += "<ID>"+valorID+"</ID>";
			XML += "<CODCOLIGADA>"+CodColigada+"</CODCOLIGADA>";
			XML += "<IDMOV>"+IdMov+"</IDMOV>";
			XML += "<STATUS>"+situacao+"</STATUS>";
			if(IdFluig == null || IdFluig == "" || IdFluig == undefined){
				
			}else{
				XML += "<IDFLUIG>"+IdFluig+"</IDFLUIG>";
			}
			XML += "<ETAPAAPROV>"+String(etapa)+"</ETAPAAPROV>";
			XML += "<APROVADOR>"+String(aprovador)+"</APROVADOR>";
		XML += "</ZMDAPROVACAOFLUIG>";
	XML += "</NewDataSet>";
	
	log.info("CUSTOM: G3 - XML________________________________________________________________");
    log.info(XML);
    
    try {
		log.info("CUSTOM: G3 - serviceIntegracao...");
		callTBCRM(XML);
	} catch (e) {
		throw "ERRO >>> " + e;
	}
}

function callTBCRM(XML) {
	var usuario = getAccess()[0];
	var pass = getAccess()[1];
	var vBase64 = new org.apache.commons.codec.binary.Base64();
	var senha = new java.lang.String(vBase64.decodeBase64(pass.getBytes()));
	
	var NOME_SERVICO = "RMWsDataServer";
    var CAMINHO_SERVICO = "com.totvs.WsDataServer";    
    var servico = ServiceManager.getServiceInstance(NOME_SERVICO);	
	var serviceHelper = servico.getBean();
    var instancia = servico.instantiate(CAMINHO_SERVICO);
    var ws = instancia.getRMIwsDataServer();

    var authenticatedService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsDataServer", usuario, senha);
    log.error(ws);
    var CodColigada = hAPI.getCardValue("CodColigada");
    var Filial = hAPI.getCardValue("filial").split('-');
	var FilialSplit = Filial[0].trim();
	var FilialNumber = parseInt(FilialSplit);
    
    
    log.info("-----> Filial XML " + FilialNumber);
    
    var contexto = "CODCOLIGADA="+CodColigada+";CODFILIAL=" + FilialNumber;
    
    try {
		//var result = authenticatedService.saveRecord("RMSPRJ3934720Server", XML, contexto);
		var result = authenticatedService.saveRecord("RMSPRJ5770240Server", XML, contexto);
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