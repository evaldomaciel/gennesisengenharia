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

	linhaDeComando1 = new java.lang.Runtime.getRuntime().exec("./bin/jboss-cli.sh --connect command=/host=master:reload");


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
			"CODFILIAL",
			"CODCOLIGADA",
			"FILIAL",
			"VALORFRETE",
			"DESCONTO_OC",
			"DATAEMISSAO",
			"NUMEROMOV",
			"CODCFO",
			"CODCCUSTO",
			"CENTRO_CUSTO",
			"LOCAL_ESTOQUE",
			"FORNECEDOR",
			"VALORBRUTO",
			"VALORLIQUIDO",
			"VALORBRUTOITEM",
			"CODUND",
			"VALORBRUTOITEMORIG",
			"QUANTIDADE",
			"PRECOUNITARIO",
			"DESCONTO_ITEM",
			"QUANTIDADEORIGINAL",
			"NOME_PRODUTO",
			"NOME_COMPRADOR",
			"HISTORICOCURTO",
			"TIPO_PAGAMENTO",
			"CODTMV",
			"URGENCIA",
			"NUMOS",
			"OBSERVACAO",
			"DADOSBANCARIOS"
			
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
	
		var CODCOLIGADA = '2';
		var IDMOV = '42216';
		var PARAMS;
		if (constraints != null) {
			for (var i = 0; i < constraints.length; i++) {
				if (constraints[i].fieldName == "CODCOLIGADA") {
					CODCOLIGADA = constraints[i].initialValue
				}
				if (constraints[i].fieldName == "IDMOV") {
					IDMOV = constraints[i].initialValue
				}

			}
		}
        PARAMS = "CODCOLIGADA=" + CODCOLIGADA + ";IDMOV=" + IDMOV;
 	//	PARAMS = "CODCOLIGADA=1" + ";IDMOV=10501";
		log.info("PARAMS " + PARAMS);
		var result = authService.realizarConsultaSQL("NUC.FLUIG.1", 2, "T", PARAMS);
		log.info("result " + result);
		var JSONObj = org.json.XML.toJSONObject(result);
		log.dir( '## AQUI ##' );
//		log.dir( JSONObj );
		var dados = JSONObj.get("NewDataSet").get("Resultado");''

		if (dados.isNull(0)) {
			row = dados;
			dataset.addRow(new Array(
			    row.has("IDMOV") ? row.get("IDMOV") : "",
			    row.has("CODFILIAL") ? row.get("CODFILIAL") : "",
			    row.has("CODCOLIGADA") ? row.get("CODCOLIGADA") : "",
			    row.has("FILIAL") ? row.get("FILIAL") : "",
			    row.has("VALORFRETE") ? row.get("VALORFRETE") : "",
			    row.has("DESCONTO_OC") ? row.get("DESCONTO_OC") : "",
			    row.has("DATAEMISSAO") ? row.get("DATAEMISSAO") : "",
			    row.has("NUMEROMOV") ? row.get("NUMEROMOV") : "",
			    row.has("CODCFO") ? row.get("CODCFO") : "",
			    row.has("CODCCUSTO") ? row.get("CODCCUSTO") : "",
			    row.has("CENTRO_CUSTO") ? row.get("CENTRO_CUSTO") : "",
			    row.has("LOCAL_ESTOQUE") ? row.get("LOCAL_ESTOQUE") : "",
			    row.has("FORNECEDOR") ? row.get("FORNECEDOR") : "",
			    row.has("VALORBRUTO") ? row.get("VALORBRUTO") : "",
			    row.has("VALORLIQUIDO") ? row.get("VALORLIQUIDO") : "",
			    row.has("VALORBRUTOITEM") ? row.get("VALORBRUTOITEM") : "",
			    row.has("CODUND") ? row.get("CODUND") : "",
			    row.has("VALORBRUTOITEMORIG") ? row.get("VALORBRUTOITEMORIG") : "",
			    row.has("QUANTIDADE") ? row.get("QUANTIDADE") : "",
			    row.has("PRECOUNITARIO") ? row.get("PRECOUNITARIO") : "",
			    row.has("DESCONTO_ITEM") ? row.get("DESCONTO_ITEM") : "",
			    row.has("QUANTIDADEORIGINAL") ? row.get("QUANTIDADEORIGINAL") : "",
			    row.has("NOME_PRODUTO") ? row.get("NOME_PRODUTO") : "",
			    row.has("NOME_COMPRADOR") ? row.get("NOME_COMPRADOR") : "",
			    row.has("HISTORICOCURTO") ? row.get("HISTORICOCURTO") : "",
			    row.has("TIPO_PAGAMENTO") ? row.get("TIPO_PAGAMENTO") : "",  
			    row.has("CODTMV") ? row.get("CODTMV") : "",
			    row.has("URGENCIA") ? row.get("URGENCIA") : "",
	    		row.has("NUMOS") ? row.get("NUMOS") : "",
			    row.has("OBSERVACAO") ? row.get("OBSERVACAO") : "",
			    row.has("DADOSBANCARIOS") ? row.get("DADOSBANCARIOS") : ""
			));
		} else
			for (var i = 0; i < dados.length(); i++) {
				var registro = dados.get(i);
				dataset.addRow(new Array(
					registro.get("IDMOV"),
					registro.get("CODFILIAL"),
					registro.get("CODCOLIGADA"),
					registro.get("FILIAL"),
					registro.get("VALORFRETE"),
					registro.get("DESCONTO_OC"),
					registro.get("DATAEMISSAO"),
					registro.get("NUMEROMOV"),
					registro.get("CODCFO"),
					registro.get("CODCCUSTO"),
					registro.get("CENTRO_CUSTO"),
					registro.get("LOCAL_ESTOQUE"),
					registro.get("FORNECEDOR"),
					registro.get("VALORBRUTO"),
					registro.get("VALORLIQUIDO"),
					registro.get("VALORBRUTOITEM"),
					registro.get("CODUND"),
					registro.get("VALORBRUTOITEMORIG"),
					registro.get("QUANTIDADE"),
					registro.get("PRECOUNITARIO"),
					registro.get("DESCONTO_ITEM"),
					registro.get("QUANTIDADEORIGINAL"),
					registro.get("NOME_PRODUTO"),
					registro.get("NOME_COMPRADOR"),
					registro.get("HISTORICOCURTO"),
					registro.get("TIPO_PAGAMENTO"),
					registro.get("CODTMV"),
					registro.get("URGENCIA"),
					registro.get("NUMOS"),
					registro.get("OBSERVACAO"),
					registro.get("DADOSBANCARIOS")
				));

			}
		log.dir(dataset);
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