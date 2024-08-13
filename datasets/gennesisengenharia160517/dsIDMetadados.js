function createDataset(fields, constraints, sortFields) {

    var PARAMS;
    var CODCOLIGADA;
    var IDMOV;
    if (constraints != null) {
		 for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].fieldName == "CODCOLIGADA") {
				CODCOLIGADA = constraints[i].initialValue; 
            }
            if (constraints[i].fieldName == "IDMOV") {
            	IDMOV = constraints[i].initialValue; 
	        }			
		}
	}
    
    PARAMS="CODCOLIGADA="+CODCOLIGADA+";IDMOV="+IDMOV;
	
	var NOME_SERVICO = "WSCONSSQL";
	log.info("#3 "+NOME_SERVICO);
	var CAMINHO_SERVICO = "com.totvs.WsConsultaSQL";
	log.info("#4 "+CAMINHO_SERVICO);
	var COLUNAS = new Array("ID"); 
	log.info("#5 "+COLUNAS);
	var dataset = DatasetBuilder.newDataset();
	log.info("#6 "+dataset);
	
	for (var i=0; i < COLUNAS.length; i++ ) {
	
		dataset.addColumn(COLUNAS[i]);
	}
	
	log.info("#8 DEPOIS DO FOR");
	
	var servico = ServiceManager.getService(NOME_SERVICO);
	log.info("#8 "+servico);
	var instancia = servico.instantiate(CAMINHO_SERVICO);
	log.info("#9 "+instancia);
    var ws = instancia.getRMIwsConsultaSQL();
    log.info("#10 "+ws);
    var serviceHelper = servico.getBean();
    log.info("#11 "+serviceHelper);
    
    //Conector TBC
	//Credenciais Auth Basic TBC
	var usuario = getAccess()[0];
	var pass = getAccess()[1];
	var vBase64 = new org.apache.commons.codec.binary.Base64();
	var senha = new java.lang.String(vBase64.decodeBase64(pass.getBytes()));
	
    var authService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsConsultaSQL", usuario, senha);
    log.info("#12 "+authService);
    log.info("#PARAMS = "+PARAMS);
    var result = authService.realizarConsultaSQL("FLUIGIDAPROV", 0, "T", PARAMS);
    log.info("#13 "+result);
    var JSONObj = org.json.XML.toJSONObject(result);
    log.info("#14 "+JSONObj);
    var dados = JSONObj.get("NewDataSet").get("Resultado");
    
	log.info("#15 "+dados);

	if (dados.isNull(0)) {
        row = dados;
        dataset.addRow(new Array(
                row.has("ID") ? row.get("ID") : ""));
    } else {
        for (var i = 0; i < dados.length(); i++) {
            var registro = dados.get(i);
            dataset.addRow(new Array(
				registro.get("ID")));
        }
    }
	
	return dataset;
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