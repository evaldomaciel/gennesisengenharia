function servicetask56(attempt, message) {
	var solAnexarDoc;
	var processId;
	var valorOriginal = 0;

	var numSolOrigem = parseInt(hAPI.getCardValue('solicitacao_origem'));

	try {

		var attachmentList = hAPI.listAttachments();
		log.info("Definida a variável attachmentList")

		if (numSolOrigem > 0) {
			/** Vamos descobrir se vem do G3/G4 ou G5 */

			var solOrigem = getSourceProcess(numSolOrigem)
			log.info("Definida a variável solOrigem")

			if (solOrigem && solOrigem.getValue(0, "processId") == "G3") {
				processId = "G3";
				var solG3 = getG3(numSolOrigem);
				if (solG3) solAnexarDoc = parseInt(solG3.getValue(0, 'IdentificadorFluigAnexo'));
			}

			else if (solOrigem && solOrigem.getValue(0, "processId") == "G4") {
				processId = "G4";
				solAnexarDoc = numSolOrigem;
			}
			else if (solOrigem && solOrigem.getValue(0, "processId") == "G5") {
				processId = "G5";
				solAnexarDoc = numSolOrigem;
			}

			if (solAnexarDoc > 0) {

				var movSeq = getMovementSeq(solAnexarDoc);
				log.dir(movSeq)

				var selectedStateObj = funSwitchNextState(processId, movSeq.getValue(0, 'stateSequence'))
				log.dir(selectedStateObj)

				var processDetail = getSourceProcess(solAnexarDoc);
				log.dir(processDetail)

				var docDetails = getDocDetails(processDetail.getValue(0, 'cardDocumentId'));
				log.dir(docDetails)

				var cardData = hAPI.getCardData(solAnexarDoc);
				var keys = cardData.keySet().toArray();
				var fieldsAndValues = [];
				var attachmentsListBody = [];

				log.info("------ cardData ------ ");
				log.dir(cardData)

				log.info("------ keys ------ ");
				log.dir(keys)

				for (var key in keys) {
					log.info("Vamos aos anexos " + keys[key])
					var fieldName = keys[key];

					/** Removendo campos existentes de anexos */
					if (fieldName.indexOf('dataPagamento___') >= 0) { /** Não faz nada */ }
					else if (fieldName.indexOf('fdMapaComparativo___') >= 0) { /** Não faz nada */ }
					else if (fieldName.indexOf('fnMapaComparativo___') >= 0) { /** Não faz nada */ }
					else if (fieldName.indexOf('valorOriginal___') >= 0) { /** Não faz nada */ }
					else if (fieldName.indexOf('valorPago___') >= 0) { /** Não faz nada */ }
					else if (fieldName.indexOf('valorJuros___') >= 0) { /** Não faz nada */ }
					else if (fieldName.indexOf('juros___') >= 0) { /** Não faz nada */ }
					else if (fieldName.indexOf('parecerFinanceiro___') >= 0) { /** Não faz nada */ }

					/** Adiciona os outros campos */
					else { fieldsAndValues.push({ "name": fieldName, "value": cardData.get(fieldName) }); }

				}

				if (processId == "G4") valorOriginal = currencyPtBr2Float(cardData.get('valorLiquido'));
				else if (processId == "G5") valorOriginal = currencyPtBr2Float(cardData.get('Valor'));

				/** Agora recriamos oa anexos com o campos de processo */
				if (attachmentList.size() > 0) {
					for (var i = 0; i < attachmentList.size(); i++) {
						var attachment = attachmentList.get(i);
						log.info("Processando o anexo " + attachment)

						if (processId == "G4") {
							valorOriginal = currencyPtBr2Float(cardData.get('valorLiquido'));
							fieldsAndValues.push({ "name": 'dataPagamento___' + String(i + 1), "value": hAPI.getCardValue('data_pagamento') });
							fieldsAndValues.push({ "name": 'fdMapaComparativo___' + String(i + 1), "value": attachment.getDocumentDescription() });
							fieldsAndValues.push({ "name": 'fnMapaComparativo___' + String(i + 1), "value": attachment.getDocumentDescription() });
							fieldsAndValues.push({ "name": 'valorOriginal___' + String(i + 1), "value": hAPI.getCardValue('valor_original') });
							fieldsAndValues.push({ "name": 'valorPago___' + String(i + 1), "value": hAPI.getCardValue('valor_titulo') });
							fieldsAndValues.push({ "name": 'valorJuros___' + String(i + 1), "value": String(currencyPtBr2Float(hAPI.getCardValue('valor_titulo')) - currencyPtBr2Float((hAPI.getCardValue('valor_original')))) });
							fieldsAndValues.push({ "name": 'juros___' + String(i + 1), "value": currencyPtBr2Float(hAPI.getCardValue('valor_titulo')) > currencyPtBr2Float((hAPI.getCardValue('valor_original'))) ? 'sim' : 'nao' });
							fieldsAndValues.push({ "name": 'parecerFinanceiro___' + String(i + 1), "value": "Atualizado via script do processo G7, solicitação " + getValue("WKNumProces") });
						}

						else if (processId == "G5") {
							fieldsAndValues.push({ "name": 'data_vencimento_av___' + String(i + 1), "value": hAPI.getCardValue('data_vencimento') });
							fieldsAndValues.push({ "name": 'data_pagamento_av___' + String(i + 1), "value": hAPI.getCardValue('data_pagamento') });
							fieldsAndValues.push({ "name": 'anexo_av___' + String(i + 1), "value": attachment.getDocumentDescription() });
							fieldsAndValues.push({ "name": 'fnInsertAnexoAv___' + String(i + 1), "value": attachment.getDocumentDescription() });

							fieldsAndValues.push({ "name": 'pagamento_realizado_pu', "value": 'Sim' });
							fieldsAndValues.push({ "name": 'teve_juros_pu', "value": currencyPtBr2Float(hAPI.getCardValue('valor_titulo')) > currencyPtBr2Float((hAPI.getCardValue('valor_original'))) ? 'Sim' : 'Não' });
							fieldsAndValues.push({ "name": 'valor_original_pu', "value": hAPI.getCardValue('valor_original') });
							fieldsAndValues.push({ "name": 'valor_juros_pu', "value": String(currencyPtBr2Float(hAPI.getCardValue('valor_titulo')) - currencyPtBr2Float((hAPI.getCardValue('valor_original')))) });
							fieldsAndValues.push({ "name": 'valor_pu', "value": hAPI.getCardValue('valor_titulo') });
							fieldsAndValues.push({ "name": 'data_vencimento_pu___' + String(i + 1), "value": hAPI.getCardValue('data_vencimento') });
							fieldsAndValues.push({ "name": 'data_pagamento_pu___' + String(i + 1), "value": hAPI.getCardValue('data_pagamento') });
							fieldsAndValues.push({ "name": 'anexo_pu___' + String(i + 1), "value": attachment.getDocumentDescription() });
							fieldsAndValues.push({ "name": 'fnInsertAnexoPu___' + String(i + 1), "value": attachment.getDocumentDescription() });
						}

						attachmentsListBody.push({
							"documentId": attachment.getDocumentId(),
							"version": attachment.getVersion(),
							"attachments": null,
							"companyId": 1,
							"deleted": false,
							"description": attachment.getDocumentDescription(),
							"processInstanceId": solAnexarDoc,
							"newAttach": true,
						})
					}
				}

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
						"processInstanceId": solAnexarDoc,
						"processId": processId,
						"version": processDetail.getValue(0, 'version'),
						"taskUserId": getValue("WKUser"),
						"completeTask": selectedStateObj.completeTask,
						"currentMovto": movSeq.getValue(0, 'processHistoryPK.movementSequence'),
						"managerMode": true,
						"selectedDestinyAfterAutomatic": -1,
						"conditionAfterAutomatic": -1,
						"selectedColleague": [
							getValue("WKUser")
						],
						"comments": "Atualizado via script do processo G7, solicitação " + getValue("WKNumProces"),
						"newObservations": [],
						"appointments": [],
						"attachments": attachmentsListBody,
						"pass": null,
						"digitalSignature": false,
						"formData": fieldsAndValues,
						"isDigitalSigned": false,
						"isLinkReturn": null,
						"versionDoc": docDetails.getValue(0, 'documentPK.version'),
						"selectedState": selectedStateObj.selectedState,
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
						"currentState": movSeq.getValue(0, 'stateSequence')
					}
				}

				var obj = fluigService.invoke(JSONUtil.toJSON(data));

				log.info("Integração para movimentar o fluxo sem erro aparente!")
				log.dir(obj);
				return String(obj.result)
			}
		} else {
			log.info("Não há documento para atualizar! ");
		}
	}
	catch (error) {
		throw String(error.lineNumber + " - " + error.message);
	}
}


function funSwitchNextState(processId, currentState) {
	log.info("funSwitchNextState(" + processId + ", " + currentState + ") ")
	currentState = String(currentState);
	if (processId == "G5" && currentState == "127") {/** Não faz nada, pois já esta na etapa esperada */ }
	else if (processId == "G5" && currentState == "97") return { selectedState: 127, completeTask: true }
	else if (processId == "G5" && currentState == "128") return { selectedState: 127, completeTask: true }
	else if (processId == "G4" && currentState == "14") return { selectedState: 12, completeTask: true }
	else if (processId == "G4" && currentState == "12") return { selectedState: 16, completeTask: true }
	return { selectedState: currentState, completeTask: false }
}

function currencyPtBr2Float(val) {
	log.info("currencyPtBr2Float(" + val + ")")
	try {
		if (String(val).length > 1) {
			val = val.replaceAll("[^\\d,.-]", "");
			var localeBR = new java.util.Locale("pt", "BR");
			var formatador = new java.text.NumberFormat.getNumberInstance(localeBR);
			var numero = formatador.parse(val);
			var valorDecimal = new java.math.BigDecimal(numero.toString());
			return valorDecimal;
		}
		return 0.00;
	} catch (error) {
		throw error;
	}
}

function getSourceProcess(processInstanceId) {
	log.info("getSourceProcess(" + processInstanceId + ")")
	try {
		var datasetWorkflowProcess = DatasetFactory.getDataset('workflowProcess',
			new Array('processId', 'workflowProcessPK.processInstanceId', 'status', 'version', 'cardDocumentId'),
			new Array(
				DatasetFactory.createConstraint('workflowProcessPK.processInstanceId', processInstanceId, processInstanceId, ConstraintType.MUST)
			), null);
		if (datasetWorkflowProcess.rowsCount > 0) return datasetWorkflowProcess;
		log.info("Não foi possível obter os dados na função getSourceProcess(" + processInstanceId + ")")
		return false
	} catch (error) {
		throw "Erro na função getSourceProcess " + String(error);
	}
}

function getG3(identificadorFluig) {
	log.info("getG3(" + identificadorFluig + ")")
	var datasetDSG3 = DatasetFactory.getDataset('DSG3',
		new Array('IdentificadorFluig', 'StatusFluig', 'IdentificadorFluigAnexo'),
		new Array(
			DatasetFactory.createConstraint('IdentificadorFluig', identificadorFluig, identificadorFluig, ConstraintType.MUST)
		), null);
	if (datasetDSG3.rowsCount > 0) return datasetDSG3;
	log.info("Não foi possível obter os dados na função getG3(" + identificadorFluig + ")")
	return false
}

function getG4(identificadorFluig) {
	log.info("getG4(" + identificadorFluig + ")")
	var datasetDSG4 = DatasetFactory.getDataset('DSG3',
		new Array('IdentificadorFluig', 'StatusFluig'),
		new Array(
			DatasetFactory.createConstraint('IdentificadorFluig', identificadorFluig, identificadorFluig, ConstraintType.MUST)
		), null);
	if (datasetDSG4.rowsCount > 0) return datasetDSG4;
	log.info("Não foi possível obter os dados na função getG4(" + identificadorFluig + ")")
	return false
}

function getG5(identificadorFluig) {
	log.info("getG5(" + identificadorFluig + ")")
	var datasetDSG5 = DatasetFactory.getDataset('DSG3',
		new Array('numero_solicitacao'),
		new Array(
			DatasetFactory.createConstraint('numero_solicitacao', identificadorFluig, identificadorFluig, ConstraintType.MUST)
		), null);
	if (datasetDSG5.rowsCount > 0) return datasetDSG5;
	log.info("Não foi possível obter os dados na função getG5(" + identificadorFluig + ")")
	return false
}

function getDocDetails(documentId) {
	log.info("getDocDetails(" + documentId + ")")
	try {
		var datasetDocument = DatasetFactory.getDataset('document',
			new Array('documentPK.version', 'documentPK.documentId'),
			new Array(
				DatasetFactory.createConstraint('documentPK.documentId', documentId, documentId, ConstraintType.MUST),
				DatasetFactory.createConstraint('activeVersion', 'true', 'true', ConstraintType.MUST)
			), null);
		if (datasetDocument.rowsCount > 0) return datasetDocument;
		else log.error("Não foi possível obter os dados na função getDocDetails(" + documentId + "). ");
	} catch (error) {
		throw "Erro na função getDocDetails " + String(error);
	}
}

function getMovementSeq(processInstanceId) {
	log.info("getMovementSeq(" + processInstanceId + ")")
	try {
		var datasetProcessHistory = DatasetFactory.getDataset('processHistory', null,
			new Array(
				DatasetFactory.createConstraint('sqlLimit', '1', '1', ConstraintType.MUST),
				DatasetFactory.createConstraint('processHistoryPK.processInstanceId', processInstanceId, processInstanceId, ConstraintType.MUST)
			),
			new Array('processHistoryPK.movementSequence;desc')
		);
		log.dir(datasetProcessHistory)
		if (datasetProcessHistory.rowsCount > 0) return datasetProcessHistory;
		log.info("Não foi possível obter os dados na função getMovementSeq(" + processInstanceId + ")")
		return false;
	} catch (error) {
		throw "Erro na função getMovementSeq " + String(error);
	}
}

function setFormProcess(params) {
	log.info("setFormProcess(" + params + ")")
	return {
		"processInstanceId": params.processInstanceId,
		"processId": params.processId,
		"version": params.version,
		"taskUserId": params.taskUserId,
		"completeTask": false,
		"currentMovto": params.currentMovto,
		"managerMode": true,
		"selectedDestinyAfterAutomatic": -1,
		"conditionAfterAutomatic": -1,
		"selectedColleague": [
			params.taskUserId
		],
		"comments": "",
		"newObservations": [],
		"appointments": [],
		"attachments": [],
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
				"value": "comprovante_pagamento61373.pdf"
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
				"value": "nao veremos novamente algo"
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
		"versionDoc": params.versionDoc,
		"selectedState": params.selectedState,
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
		"currentState": params.currentState,
	}
}

function setFormData(params) {
	var newArray = []

	for (var index = 0; index < params.length; index++) {
		newArray.push({
			"name": params[index].name,
			"value": params[index].value
		})
	}

	return newArray;
}

/***
 * 65538
 */
