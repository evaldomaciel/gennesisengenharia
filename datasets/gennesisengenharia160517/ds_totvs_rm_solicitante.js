/***********************************************************************************************
 * @author 		TBNE - Angelo Barcelos - Desenvolvedor FLUIG angelo.barcelos@totvs.com.br
 * @data   		03/07/2023
 * @Versao RM   12.1.2302.160
 * @Descricao	Solicitante
 ***********************************************************************************************/

function createDataset(fields, constraints, sortFields) {

	//Conector TBC
	//Credenciais Auth Basic TBC
	var usuario = getAccess()[0];
	var pass = getAccess()[1];
	var vBase64 = new org.apache.commons.codec.binary.Base64();
	var senha = new java.lang.String(vBase64.decodeBase64(pass.getBytes()));
	//Fim do Conector TBC padrao
	var NOME_SERVICO = "WSCONSSQL";
	var CAMINHO_SERVICO = "com.totvs.WsConsultaSQL";
	var COLUNAS = new Array(
	        "REQUISITANTE_RM",
			"REQUISITANTE_SC"
			
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
	
		var CODCOLIGADA;
		var IDMOV;
		var PARAMS;
		if (constraints != null) {
			for (var i = 0; i < constraints.length; i++) {
				if (constraints[i].fieldName == "CODCOLIGADAOC") {
					CODCOLIGADA = constraints[i].initialValue
				}
				if (constraints[i].fieldName == "IDMOVOC") {
					IDMOV = constraints[i].initialValue
				}

			}
		}
	    PARAMS = "IDMOVOC=" + IDMOV + ";CODCOLIGADAOC=" + CODCOLIGADA;
//  		PARAMS = "IDMOVOC=11686" + ";CODCOLIGADAOC=2";
		log.info("PARAMS " + PARAMS);
		var result = authService.realizarConsultaSQL("solicitanterelac", 0, "G", PARAMS);
		log.info("result " + result);
		var JSONObj = org.json.XML.toJSONObject(result);
		var dados = JSONObj.get("NewDataSet").get("Resultado");

		if (dados.isNull(0)) {
			row = dados;
			dataset.addRow(new Array(
			    row.has("REQUISITANTE_RM") ? row.get("REQUISITANTE_RM") : "",
			    row.has("REQUISITANTE_SC") ? row.get("REQUISITANTE_SC") : ""
			));
		} else
			for (var i = 0; i < dados.length(); i++) {
				var registro = dados.get(i);
				dataset.addRow(new Array(
				    registro.get("REQUISITANTE_RM"),
					registro.get("REQUISITANTE_SC")
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