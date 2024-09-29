/***********************************************************************************************
 * @author 		TBNE - Angelo Barcelos - Desenvolvedor FLUIG angelo.barcelos@totvs.com.br
 * @data   		03/07/2023
 * @Versao RM   12.1.2302.160
 * @Descricao	Dados Ordem de Compra
 ***********************************************************************************************/

function createDataset(fields, constraints, sortFields) {
	var usuario = getAccess()[0];
	var pass = getAccess()[1];
	var vBase64 = new org.apache.commons.codec.binary.Base64();
	//	var senha = new java.lang.String(vBase64.decodeBase64(pass));
	var senha = pass;
	var NOME_SERVICO = "WSCONSSQL";
	var CAMINHO_SERVICO = "com.totvs.WsConsultaSQL";
	var COLUNAS = new Array(
		"LOCAL_DE_ESTOQUE",
		"FILIAL",
		"COLIGADA",
		'CODIGO_LOCAL_ESTOQUE'
	);
	var dataset = DatasetBuilder.newDataset();

	for (var i = 0; i < COLUNAS.length; i++) {
		dataset.addColumn(COLUNAS[i]);
	}
	try {
		var servico = ServiceManager.getService(NOME_SERVICO);
		var instancia = servico.instantiate(CAMINHO_SERVICO);
		var ws = instancia.getRMIwsConsultaSQL();
		var serviceHelper = servico.getBean();
		var authService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsConsultaSQL", usuario, senha);
		var CODCOLIGADA;
		var FILIAL;
		var PARAMS;
		if (constraints != null) {
			for (var i = 0; i < constraints.length; i++) {
				if (constraints[i].fieldName == "CODCOLIGADA") {
					CODCOLIGADA = constraints[i].initialValue;
				}
				if (constraints[i].fieldName == "FILIAL") {
					FILIAL = constraints[i].initialValue;
				}
			}
		}
		PARAMS = "CODCOLIGADA=" + CODCOLIGADA + ";FILIAL=" + FILIAL;
		var result = authService.realizarConsultaSQL("FLUIGCC", 0, "T", PARAMS);
		var JSONObj = org.json.XML.toJSONObject(result);
		var dados = JSONObj.get("NewDataSet").get("Resultado");

		if (dados.isNull(0)) {
			row = dados;
			dataset.addRow(new Array(
				row.has("LOCAL_DE_ESTOQE") ? row.get("LOCAL_DE_ESTOQUE") : "",
				row.has("FILIAL") ? row.get("FILIAL") : "",
				row.has("COLIGADA") ? row.get("COLIGADA") : "",
				row.has("CODIGO_LOCAL_ESTOQUE") ? row.get("CODIGO_LOCAL_ESTOQUE") : ""

			));
		} else {
			for (var i = 0; i < dados.length(); i++) {
				var registro = dados.get(i);
				{
					dataset.addRow(new Array(
						registro.get("LOCAL_DE_ESTOQUE"),
						registro.get("FILIAL"),
						registro.get("COLIGADA"),
						registro.get("CODIGO_LOCAL_ESTOQUE")

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
	if (typeof value === "object" && value !== null) {
		value = JSON.stringify(value);
	}
	return (value == null || value == undefined || value.trim() == "");
}

function getDefaultError(error) {
	var dsError = DatasetBuilder.newDataset();
	dsError.addColumn('ERROR');
	dsError.addRow(new Array(error));
	return dsError;
}

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