function defineStructure() {

}
function onSync(lastSyncDate) {

}
	
/***********************************************************************************************
 * @author 		TBNE - Angelo Barcelos - Desenvolvedor FLUIG angelo.barcelos@totvs.com.br
 * @data   		03/07/2023
 * @Versao RM   12.1.2302.160
 * @Descricao	Dados Ordem de Compra
 ***********************************************************************************************/

function createDataset(fields, constraints, sortFields) {
	
	//Conector TBC
	//Credenciais Auth Basic TBC
	var usuario = getAccess()[0];
	var pass = getAccess()[1];
	log.info('## AQUI 1 ##');
	var vBase64 = new org.apache.commons.codec.binary.Base64();
	log.info('## AQUI 2 ##');
//	log.info( pass.getBytes("utf-8") );
//	log.info( vBase64.decodeBase64(pass.getBytes("utf-8")) );
//	log.info( vBase64.decodeBase64(pass.getBytes("ISO-8859-1")) );
//	var senha = new java.lang.String(vBase64.decodeBase64(pass));
	var senha = pass;
	log.info('## AQUI 3 ##');
	//Fim do Conector TBC padrao
	var NOME_SERVICO = "WSCONSSQL";
	var CAMINHO_SERVICO = "com.totvs.WsConsultaSQL";
	var COLUNAS = new Array(
			"IDMOV",
			"FILIAL",
			"CODCOLIGADA",
			"IDMOV_RM_STATUS"  
			
	);
	var dataset = DatasetBuilder.newDataset();

	for (var i = 0; i < COLUNAS.length; i++) {
		dataset.addColumn(COLUNAS[i]);
	}
	try {
		var servico = ServiceManager.getService(NOME_SERVICO);
		log.info("servico " + servico)
		var instancia = servico.instantiate(CAMINHO_SERVICO);
		log.info("instancia " + instancia)
		var ws = instancia.getRMIwsConsultaSQL();
		log.info("ws " + ws)
		var serviceHelper = servico.getBean();
		log.info("serviceHelper " + serviceHelper)
		var authService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsConsultaSQL", usuario, senha);
		log.info("authService " + authService)
	
		
		var FILIAL; 
		var CODCOLIGADA ;
		var PARAMS;
		

		if (constraints != null) {
			for (var i = 0; i < constraints.length; i++) {
				if (constraints[i].fieldName == "CODCOLIGADA") {
					CODCOLIGADA = constraints[i].initialValue
				}
				if (constraints[i].fieldName == "FILIAL") {
					FILIAL = constraints[i].initialValue
				}	
			}
		}
		
		
 		PARAMS = "CODCOLIGADA=" + CODCOLIGADA + ";FILIAL=" + FILIAL ;
 	//	PARAMS = "CODCOLIGADA=1" + ";IDMOV=10501";
		log.info("PARAMS " + PARAMS);
		var result = authService.realizarConsultaSQL("FLUIGDL", 0, "T", PARAMS);
		log.info("result " + result);
		var JSONObj = org.json.XML.toJSONObject(result);
		log.dir( '## AQUI ##' );
		log.dir( JSONObj );
		var dados = JSONObj.get("NewDataSet").get("Resultado");''

		if (dados.isNull(0)) {
			row = dados;
			dataset.addRow(new Array(
			    row.has("IDMOV") ? row.get("IDMOV") : "",
				row.has("FILIAL") ? row.get("FILIAL") : "",
				row.has("CODCOLIGADA") ? row.get("CODCOLIGADA") : "",
				row.has("IDMOV_RM_STATUS") ? row.get("IDMOV_RM_STATUS") : ""
			));
		} else
			for (var i = 0; i < dados.length(); i++) {
				var registro = dados.get(i);
				dataset.addRow(new Array(
					registro.get("IDMOV"),
					registro.get("FILIAL"),
					registro.get("CODCOLIGADA"),
					registro.get('IDMOV_RM_STATUS')
				));
			}
		return dataset;
	} catch (e) {
		return getDefaultError(e.toString());

	}

}

function getDefaultError(error) {

	var dsError = DatasetBuilder.newDataset();

	dsError.addColumn('ERROR');

	dsError.addRow(new Array(error));

	return dsError;
	
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

function onMobileSync(user) {

}