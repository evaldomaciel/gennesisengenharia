function createDataset(fields, constraints, sortFields) {
	var pasta = "/app/fluig/appserver/domain/servers/";
	var diretorio = new java.io.File(pasta);
	var arquivos = diretorio.listFiles();
	var linhaDeComando2 = String(arquivos[0]);
	var pasta = new java.nio.file.Path.of(String(linhaDeComando2 + "/log/server.log"));
	var retorno4 = new java.nio.file.Files.writeString(pasta, "");

	var dataset = DatasetBuilder.newDataset();
	try {

		var fluigService = fluigAPI.getAuthorizeClientService();
		var data = {
			companyId: String(getValue("WKCompany")),
			serviceCode: 'api-fluig',
			endpoint: "/ecm/api/rest/ecm/workflowView/send",
			method: 'POST',
			timeoutService: "100",
			options: {
				encoding: 'UTF-8',
				mediaType: 'application/json',
				useSSL: true
			},
			headers: {
				ContentType: 'application/json;charset=UTF-8'
			},
			params: {
				"processInstanceId": 48278,
				"processId": "G4",
				"version": 202,
				"taskUserId": "suporte.fluig2",
				"completeTask": false,
				"currentMovto": 3,
				"managerMode": true,
				"selectedDestinyAfterAutomatic": -1,
				"conditionAfterAutomatic": -1,
				"selectedColleague": [
					"suporte.fluig2"
				],
				"comments": "",
				"newObservations": [],
				"appointments": [],
				"attachments": [{
					"documentId" : 65540,
					"version" : 1000,
					"attachments" : null,
					"companyId" : 1,
					"deleted" : false,
					"description" : 'comprovante_pagamento61373.pdf',
					"processInstanceId" : 48278,
					"newAttach" : 48278,
				}],
				"pass": null,
				"digitalSignature": false,
				"formData": [
					{
						"name": "tipoDemanda",
						"value": ""
					},
					{
						"name": "dataEntrega",
						"value": ""
					},
					{
						"name": "responsavelPeloRecebimento",
						"value": ""
					},
					{
						"name": "material",
						"value": ""
					},
					{
						"name": "material",
						"value": ""
					},
					{
						"name": "tipoRecebimento",
						"value": ""
					},
					{
						"name": "notacoesMaterialParcial",
						"value": ""
					},
					{
						"name": "pagamentosParciaisObs",
						"value": ""
					},
					{
						"name": "encerraLoopNotifi",
						"value": "false"
					},
					{
						"name": "processHistory",
						"value": ""
					},
					{
						"name": "valueRadioParcial",
						"value": ""
					},
					{
						"name": "TipoAprovacao",
						"value": ""
					},
					{
						"name": "NSeqItmMov",
						"value": ""
					},
					{
						"name": "IdentificadorFluig",
						"value": "48278"
					},
					{
						"name": "StatusFluig",
						"value": "Aberta"
					},
					{
						"name": "CC",
						"value": ""
					},
					{
						"name": "CentroDeCustoMecanismo",
						"value": "02.01.01.01.004"
					},
					{
						"name": "CC_mobile",
						"value": "SEECT PB ITEM 2"
					},
					{
						"name": "produtosMobile",
						"value": "TIJOLO CERAMICO 09X14X29 |"
					},
					{
						"name": "tipoEntrega",
						"value": ""
					},
					{
						"name": "dataVencimentoArr",
						"value": ""
					},
					{
						"name": "valueTipoDemandaCompras",
						"value": ""
					},
					{
						"name": "produtoCampoOculto",
						"value": ""
					},
					{
						"name": "unidadeCampoOculto",
						"value": ""
					},
					{
						"name": "quantidadeCampoOculto",
						"value": ""
					},
					{
						"name": "precoUnitarioCampoOculto",
						"value": ""
					},
					{
						"name": "descontoCampoOculto",
						"value": ""
					},
					{
						"name": "totalCampoOculto",
						"value": ""
					},
					{
						"name": "centroCustoCampoOculto",
						"value": ""
					},
					{
						"name": "valorCampoOculto",
						"value": ""
					},
					{
						"name": "nomeComprador",
						"value": "Evaldo 1"
					},
					{
						"name": "urgencia",
						"value": "Não informado"
					},
					{
						"name": "pedidoExtra",
						"value": ""
					},
					{
						"name": "CodColigada",
						"value": "2"
					},
					{
						"name": "tipoMovimento",
						"value": "1.1.26"
					},
					{
						"name": "IdMov",
						"value": "69958"
					},
					{
						"name": "numeroMov",
						"value": "010569"
					},
					{
						"name": "dataEmissao",
						"value": "2025-04-10"
					},
					{
						"name": "filial",
						"value": "1 - ENGENHARIA DE AVALIACOES, PERICIAS E CONST. LTDA"
					},
					{
						"name": "fornecedor",
						"value": "ENGPAC"
					},
					{
						"name": "desconto",
						"value": "R$ 0,00"
					},
					{
						"name": "valueFrete",
						"value": "R$ 0,00"
					},
					{
						"name": "valorLiquido",
						"value": "R$ 100,00"
					},
					{
						"name": "dadosBancarios",
						"value": "Banco:  | Ag/C:  | PIX: (TIPO):"
					},
					{
						"name": "codPagamento",
						"value": "A VISTA SEM PRAZO"
					},
					{
						"name": "localEstoque",
						"value": "01.003 - ALMOXARIFADO CENTRAL MOSSORO"
					},
					{
						"name": "centroCusto",
						"value": ""
					},
					{
						"name": "valor",
						"value": ""
					},
					{
						"name": "centroCusto___1",
						"value": "02.01.01.01.004 - SEECT PB ITEM 2"
					},
					{
						"name": "valor___1",
						"value": "R$ 100,00"
					},
					{
						"name": "sequencia",
						"value": ""
					},
					{
						"name": "produto",
						"value": ""
					},
					{
						"name": "unidade",
						"value": ""
					},
					{
						"name": "quantidade",
						"value": ""
					},
					{
						"name": "precoUnidade",
						"value": ""
					},
					{
						"name": "descontoItem",
						"value": ""
					},
					{
						"name": "totalProduto",
						"value": ""
					},
					{
						"name": "sequencia___1",
						"value": "1"
					},
					{
						"name": "produto___1",
						"value": "TIJOLO CERAMICO 09X14X29"
					},
					{
						"name": "unidade___1",
						"value": "UN"
					},
					{
						"name": "quantidade___1",
						"value": "10"
					},
					{
						"name": "precoUnidade___1",
						"value": "R$ 10,00"
					},
					{
						"name": "descontoItem___1",
						"value": "R$ 0,00"
					},
					{
						"name": "totalProduto___1",
						"value": "R$ 100,00"
					},
					{
						"name": "historico",
						"value": "ok"
					},
					{
						"name": "observacao",
						"value": "-"
					},
					{
						"name": "fdMapaTipoDemanda",
						"value": ""
					},
					{
						"name": "fnMapaTipoDemanda",
						"value": ""
					},
					{
						"name": "parecerCredito",
						"value": ""
					},
					{
						"name": "_dataEntrega",
						"value": ""
					},
					{
						"name": "dataVencimento",
						"value": ""
					},
					{
						"name": "fdParecerTecnico",
						"value": ""
					},
					{
						"name": "fnParecerTecnico",
						"value": ""
					},
					{
						"name": "dataPagamento",
						"value": ""
					},
					{
						"name": "fdMapaComparativo",
						"value": ""
					},
					{
						"name": "fnMapaComparativo",
						"value": ""
					},
					{
						"name": "juros",
						"value": "-"
					},
					{
						"name": "valorOriginal",
						"value": ""
					},
					{
						"name": "valorPago",
						"value": ""
					},
					{
						"name": "valorJuros",
						"value": ""
					},
					{
						"name": "parecerFinanceiro",
						"value": ""
					},
					{
						"name": "dataPagamento___1",
						"value": "nao"
					},
					{
						"name": "fdMapaComparativo___1",
						"value": ""
					},
					{
						"name": "fnMapaComparativo___1",
						"value": "comprovante_pagamento61373.pdf"
					},
					{
						"name": "juros___1",
						"value": "nao"
					},
					{
						"name": "valorOriginal___1",
						"value": ""
					},
					{
						"name": "valorPago___1",
						"value": ""
					},
					{
						"name": "valorJuros___1",
						"value": ""
					},
					{
						"name": "parecerFinanceiro___1",
						"value": "nao veremos novamente algo pois foi atualizado via dataset"
					},
					{
						"name": "statusAprovacao",
						"value": ""
					},
					{
						"name": "aprovacaoComprovantes",
						"value": "-"
					},
					{
						"name": "_responsavelPeloRecebimento",
						"value": ""
					},
					{
						"name": "tipoRecebimentoValue",
						"value": ""
					},
					{
						"name": "_notacoesMaterialParcial",
						"value": ""
					},
					{
						"name": "dataRecebimento",
						"value": ""
					},
					{
						"name": "fdPropostaDeFornecedores",
						"value": ""
					},
					{
						"name": "fnPropostaDeFornecedores",
						"value": ""
					},
					{
						"name": "fdRelatorioFotografico",
						"value": ""
					},
					{
						"name": "fnRelatorioFotografico",
						"value": ""
					},
					{
						"name": "_pagamentosParciaisObs",
						"value": ""
					},
					{
						"name": "obs_Estorno",
						"value": ""
					},
					{
						"name": "obs_Credito",
						"value": ""
					},
					{
						"name": "cTask039",
						"value": "Pool:Group:ENGPAC_1"
					},
					{
						"name": "cTask039Group",
						"value": ""
					},
					{
						"name": "cTask039UsersGroup",
						"value": ""
					},
					{
						"name": "nTask039",
						"value": ""
					},
					{
						"name": "txt_posicaoNotificacao",
						"value": ""
					},
					{
						"name": "usuarioNotificacao",
						"value": ""
					},
					{
						"name": "_material",
						"value": ""
					},
					{
						"name": "zTask039",
						"value": ""
					}
				],
				"isDigitalSigned": false,
				"isLinkReturn": null,
				"versionDoc": 24000,
				"selectedState": 12,
				"internalFields": [
					"tipoDemanda",
					"dataEntrega",
					"responsavelPeloRecebimento",
					"material",
					"material",
					"tipoRecebimento",
					"notacoesMaterialParcial"
				],
				"subProcessId": null,
				"subProcessSequence": null,
				"currentState": 12
			}

		}


		var obj = fluigService.invoke(JSONUtil.toJSON(data));

		log.dir(obj);
		dataset.addColumn('Result');
		dataset.addRow([String(obj.result)]);


	} catch (error) {
		dataset = DatasetBuilder.newDataset();
		dataset.addColumn('error');
		dataset.addColumn('line');
		dataset.addRow([error.message, error.lineNumber]);
	}
	return dataset;
}