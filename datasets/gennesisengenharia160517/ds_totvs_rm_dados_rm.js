/***********************************************************************************************
 * @author 		TBNE - Angelo Barcelos - Desenvolvedor FLUIG angelo.barcelos@totvs.com.br
 * @data   		03/07/2023
 * @Versao RM   12.1.2302.160
 * @Descricao	Dados Requisição de Materiais
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
			"IDMOV",
			"CODFILIAL",
			"CODCOLIGADA",
			"FILIAL",
			"DATAEMISSAO",
			"NUMEROMOV",
			"CODCCUSTO",
			"CENTRO_CUSTO",
			"LOCAL_ESTOQUE",
			"VALORBRUTOITEM",
			"CODUND",
			"VALORBRUTOITEMORIG",
			"QUANTIDADE",
			"PRECOUNITARIO",
			"QUANTIDADEORIGINAL",
			"NOME_PRODUTO",
			"NOME_COMPRADOR",
			"NOME_SOLICITANTE",
			"OBSERVACAO",
			"VALORBRUTO",
			"VALORLIQUIDO",
			"URGENCIA"
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
				if (constraints[i].fieldName == "CODCOLIGADA") {
					CODCOLIGADA = constraints[i].initialValue
				}
				if (constraints[i].fieldName == "IDMOV") {
					IDMOV = constraints[i].initialValue
				}

			}
		}
	    PARAMS = "CODCOLIGADA=" + CODCOLIGADA + ";IDMOV=" + IDMOV;
    	//PARAMS = "CODCOLIGADA=1" + ";IDMOV=13255";
		log.info("PARAMS " + PARAMS);
		var result = authService.realizarConsultaSQL("NUC.FLUIG.3", 2, "T", PARAMS);
		log.info("result " + result);
		var JSONObj = org.json.XML.toJSONObject(result);
		var dados = JSONObj.get("NewDataSet").get("Resultado");

		if (dados.isNull(0)) {
			row = dados;
			dataset.addRow(new Array(
			    row.has("IDMOV") ? row.get("IDMOV") : "",
			    row.has("CODFILIAL") ? row.get("CODFILIAL") : "",
			    row.has("CODCOLIGADA") ? row.get("CODCOLIGADA") : "",
			    row.has("FILIAL") ? row.get("FILIAL") : "",
			    row.has("DATAEMISSAO") ? row.get("DATAEMISSAO") : "",
			    row.has("NUMEROMOV") ? row.get("NUMEROMOV") : "",
			    row.has("CODCCUSTO") ? row.get("CODCCUSTO") : "",
			    row.has("CENTRO_CUSTO") ? row.get("CENTRO_CUSTO") : "",
			    row.has("LOCAL_ESTOQUE") ? row.get("LOCAL_ESTOQUE") : "",
			    row.has("VALORBRUTOITEM") ? row.get("VALORBRUTOITEM") : "",
			    row.has("CODUND") ? row.get("CODUND") : "",
			    row.has("VALORBRUTOITEMORIG") ? row.get("VALORBRUTOITEMORIG") : "",
			    row.has("QUANTIDADE") ? row.get("QUANTIDADE") : "",
			    row.has("PRECOUNITARIO") ? row.get("PRECOUNITARIO") : "",
			    row.has("QUANTIDADEORIGINAL") ? row.get("QUANTIDADEORIGINAL") : "",
			    row.has("NOME_PRODUTO") ? row.get("NOME_PRODUTO") : "",
			    row.has("NOME_COMPRADOR") ? row.get("NOME_COMPRADOR") : "",
				row.has("NOME_SOLICITANTE") ? row.get("NOME_SOLICITANTE") : "",
			    row.has("OBSERVACAO") ? row.get("OBSERVACAO") : "",
			    row.has("VALORBRUTO") ? row.get("VALORBRUTO") : "",
			    row.has("VALORLIQUIDO") ? row.get("VALORLIQUIDO") : "",
			    row.has("URGENCIA") ? row.get("URGENCIA") : ""
			));
		} else
			for (var i = 0; i < dados.length(); i++) {
				var registro = dados.get(i);
				dataset.addRow(new Array(
					registro.get("IDMOV"),
					registro.get("CODFILIAL"),
					registro.get("CODCOLIGADA"),
					registro.get("FILIAL"),
					registro.get("DATAEMISSAO"),
					registro.get("NUMEROMOV"),
					registro.get("CODCCUSTO"),
					registro.get("CENTRO_CUSTO"),
					registro.get("LOCAL_ESTOQUE"),
					registro.get("VALORBRUTOITEM"),
					registro.get("CODUND"),
					registro.get("VALORBRUTOITEMORIG"),
					registro.get("QUANTIDADE"),
					registro.get("PRECOUNITARIO"),
					registro.get("QUANTIDADEORIGINAL"),
					registro.get("NOME_PRODUTO"),
					registro.get("NOME_COMPRADOR"),
					registro.get("NOME_SOLICITANTE"),
					registro.get("OBSERVACAO"),
					registro.get("VALORBRUTO"),
					registro.get("VALORLIQUIDO"),
					registro.get("URGENCIA")
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