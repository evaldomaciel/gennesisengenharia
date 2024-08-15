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

	// var constraints = [];
	// constraints.push(DatasetFactory.createConstraint("COLIGADA", "1", "1", ConstraintType.MUST));
	// constraints.push(DatasetFactory.createConstraint("FILIAL", "3", "3", ConstraintType.MUST));

	// var dataset = DatasetFactory.getDataset("nomeDoSeuDataset", null, constraints, null);

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
			"NOME",
			"UNIDADE",
			"DISCIPLINA",
			"QUANTIDADE",
			"QUANTIDADE_RESTANTE",
			"RASTREIO"

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
	
		var CODCOLIGADA ;
		var FILIAL;
		var IDMOV ;
		var PARAMS;
		
		
		log.dir(constraints);
		if (constraints != null) {
			for (var i = 0; i < constraints.length; i++) {
				
				if (constraints[i].fieldName == "IDMOV") {
					IDMOV = constraints[i].initialValue;
				}
				if (constraints[i].fieldName == "CODCOLIGADA") {
					CODCOLIGADA = constraints[i].initialValue;
				}
			}
		}

			PARAMS =  "IDMOV=" + IDMOV + ";CODCOLIGADA=" + CODCOLIGADA;
		
			log.info("PARAMS " + PARAMS);
			var result = authService.realizarConsultaSQL("FLUIGIRM", 0, "T", PARAMS);
			log.info("result " + result);
			var JSONObj = org.json.XML.toJSONObject(result);
			log.dir( '## AQUI ##' );
			log.dir( JSONObj );
			var dados = JSONObj.get("NewDataSet").get("Resultado");

			if (dados.isNull(0)) {
				row = dados;
				dataset.addRow(new Array(
					row.has("NOME") ? row.get("NOME") : "",
					row.has("UNIDADE") ? row.get("UNIDADE") : "",
					row.has("DISCIPLINA") ? row.get("DISCIPLINA") : "",
					row.has("QUANTIDADE") ? row.get("QUANTIDADE") : "",
					row.has("QUANTIDADE_RESTANTE") ? row.get("QUANTIDADE_RESTANTE") : "",
					row.has("RASTREIO") ? row.get("RASTREIO") : ""		   
				));
			} else {
						for (var i = 0; i < dados.length(); i++) {
					var registro = dados.get(i);
						{
							dataset.addRow(new Array(
							registro.get("NOME"),
							registro.get("UNIDADE"),
							registro.get("DISCIPLINA"),
							registro.get("QUANTIDADE"),
							registro.get("QUANTIDADE_RESTANTE"),
							registro.get("RASTREIO")
						
						));
					}
				
				}
			}
		
	} catch (e) {
		return getDefaultError(e.toString());

	}
	return dataset;
}

/**
 * Função valorEmBranco é um facilitador que evita você precisar repetir a condição completa  verificando se o valor está undefined, null ou se está vazio
 * @param value valor a ser testado
 * @returns verdadeiro caso seja null, undefined ou após a função trim() estiver vazio ou falso se tiver conteúdo
 */
function valorEmBranco(value) {
    if(typeof value === "object" && value !== null){
        value = JSON.stringify(value);
    }
	return (value == null || value == undefined || value.trim() == "");
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