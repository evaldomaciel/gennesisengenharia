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
				if (solG3 && parseInt(solG3.getValue(0, 'IdentificadorFluigAnexo')) > 0) {
					solAnexarDoc = parseInt(solG3.getValue(0, 'IdentificadorFluigAnexo'))
					processId = "G4";
				};
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
				var selectedStateObj = funSwitchNextState(processId, movSeq.getValue(0, 'stateSequence'))
				var processDetail = getSourceProcess(solAnexarDoc);
				var docDetails = getDocDetails(processDetail.getValue(0, 'cardDocumentId'));
				var processTask = getProcessTask(solAnexarDoc)
				var cardData = hAPI.getCardData(solAnexarDoc);
				var keys = cardData.keySet().toArray();
				var fieldsAndValues = [];
				var attachmentsListBody = [];

				for (var key in keys) {
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

					else if (fieldName.indexOf('aprovacaoComprovantes') >= 0) { /** Não faz nada */ }
					else if (fieldName.indexOf('tipoDemanda') >= 0) { /** Não faz nada */ }
					else if (fieldName.indexOf('dataEntrega') >= 0) { /** Não faz nada */ }

					/** Adiciona os outros campos */
					else { fieldsAndValues.push({ "name": fieldName, "value": cardData.get(fieldName) }); }
				}

				if (processId == "G4") valorOriginal = currencyPtBr2Float(cardData.get('valorLiquido'));
				else if (processId == "G5") valorOriginal = currencyPtBr2Float(cardData.get('Valor'));

				/** Agora recriamos oa anexos com o campos de processo */
				if (attachmentList.size() > 0) {
					for (var i = 0; i < attachmentList.size(); i++) {
						var attachment = attachmentList.get(i);
						log.info("Vamos aos anexo: " + attachment.getDocumentDescription());
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

				/** Preenchendo campos especifico */
				if (processId == "G4" || processId == "G3") {
					fieldsAndValues.push({ "name": "aprovacaoComprovantes", "value": "Aprovado" });
					fieldsAndValues.push({ "name": "tipoDemanda", "value": "Não definido" });
					fieldsAndValues.push({ "name": "dataEntrega", "value": "Não definido" });
				}

				/** Varáveis para mover a solicitação */
				var currentMovto = movSeq.getValue(0, 'processHistoryPK.movementSequence');
				var versionDoc = docDetails.getValue(0, 'NR_VERSAO');
				var currentState = movSeq.getValue(0, 'stateSequence');
				// var selectedColleague = processTask.getValue(0, 'processTaskPK.colleagueId');
				var selectedColleague = String(processTask.getValue(0, 'processTaskPK.colleagueId')).indexOf(":") >= 0 ? "fluig2" : processTask.getValue(0, 'processTaskPK.colleagueId');
				var processVersion = processDetail.getValue(0, 'version');


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
						"version": processVersion,
						"taskUserId": selectedColleague,
						"completeTask": selectedStateObj.completeTask,
						"currentMovto": currentMovto,
						"managerMode": true,
						"selectedDestinyAfterAutomatic": -1,
						"conditionAfterAutomatic": -1,
						"selectedColleague": [], /** Antes estava com o selectedColleague */
						"comments": "Atualizado via script do processo G7, solicitação " + getValue("WKNumProces"),
						"newObservations": [],
						"appointments": [],
						"attachments": attachmentsListBody,
						"pass": null,
						"digitalSignature": false,
						"formData": fieldsAndValues,
						"isDigitalSigned": false,
						"isLinkReturn": null,
						"versionDoc": versionDoc,
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
						"currentState": currentState
					}
				}

				log.info("------- JSON de integração ------- ")
				log.dir(data)

				var vo = fluigService.invoke(JSONUtil.toJSON(data));

				log.info("------- Sem tratar  getServiceCode ------- ")
				log.dir(vo.getServiceCode());
				log.info("------- Sem tratar  getHttpStatusResult ------- ")
				log.dir(vo.getHttpStatusResult());
				log.info("------- Sem tratar  getParams ------- ")
				log.dir(vo.getParams());


				log.info("String(vo.getResult()).indexOf('\"content\":\"ERROR\",\"message\"') > 0");
				log.info(String(vo.getResult()).indexOf('"content":"ERROR","message"') > 0);

				if (vo.getResult() == null || vo.getResult().isEmpty()) {
					throw new Error("Retorno está vazio");

				}
				else if (vo.getResult() && String(vo.getResult()).indexOf('"content":"ERROR","message"') > 0) {
					throw new Error(vo.getResult());
				}

				else {
					log.info(vo.getResult());
				}

				log.info("Integração para movimentar o fluxo sem erro aparente!")
				log.dir(vo.getResult());
				return String(vo.getResult())
			}
		} else {
			log.info("Não há documento para atualizar! ");
		}
	}
	catch (error) {
		throw new Error(error.lineNumber + " - " + error.message);
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
		throw new Error(error);
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
	} catch (error) {
		throw new Error("Erro na função getSourceProcess " + String(error));
	}
	return false
}

function getG3(identificadorFluig) {
	log.info("getG3(" + identificadorFluig + ")")
	try {
		var datasetDSG3 = DatasetFactory.getDataset('DSG3',
			new Array('IdentificadorFluig', 'StatusFluig', 'IdentificadorFluigAnexo'),
			new Array(
				DatasetFactory.createConstraint('IdentificadorFluig', identificadorFluig, identificadorFluig, ConstraintType.MUST)
			), null);
		if (datasetDSG3.rowsCount > 0) return datasetDSG3;
		log.info("Não foi possível obter os dados na função getG3(" + identificadorFluig + ")")
	} catch (error) {
		throw new Error("Erro na função getG3 " + String(error));
	}
	return false
}

function getG4(identificadorFluig) {
	log.info("getG4(" + identificadorFluig + ")")
	try {
		var datasetDSG4 = DatasetFactory.getDataset('DSG4',
			new Array('IdentificadorFluig', 'StatusFluig'),
			new Array(
				DatasetFactory.createConstraint('IdentificadorFluig', identificadorFluig, identificadorFluig, ConstraintType.MUST)
			), null);
		if (datasetDSG4.rowsCount > 0) return datasetDSG4;
		log.info("Não foi possível obter os dados na função getG4(" + identificadorFluig + ")")
	} catch (error) {
		throw new Error("Erro na função getG4 " + String(error));
	}
	return false
}

function getG5(identificadorFluig) {
	log.info("getG5(" + identificadorFluig + ")")
	try {
		var datasetDSG5 = DatasetFactory.getDataset('ds_G5',
			new Array('numero_solicitacao'),
			new Array(
				DatasetFactory.createConstraint('numero_solicitacao', identificadorFluig, identificadorFluig, ConstraintType.MUST)
			), null);
		if (datasetDSG5.rowsCount > 0) return datasetDSG5;
		log.info("Não foi possível obter os dados na função getG5(" + identificadorFluig + ")")
	} catch (error) {
		throw new Error("Erro na função getG5 " + String(error));
	}
	return false
}

function getDocDetails(documentId) {
	log.info("getDocDetails(" + documentId + ")")
	try {
		var datasetDsConsultaDocumentoBD = DatasetFactory.getDataset('dsConsultaDocumentoBD', null, new Array(
			DatasetFactory.createConstraint('NR_DOCUMENTO', documentId, documentId, ConstraintType.MUST)
		), null);
		if (datasetDsConsultaDocumentoBD.rowsCount > 0) return datasetDsConsultaDocumentoBD;
		else log.error("Não foi possível obter os dados na função getDocDetails(" + documentId + "). ");
	} catch (error) {
		throw new Error("Erro na função getDocDetails " + String(error));
	}
	return false;
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
		if (datasetProcessHistory.rowsCount > 0) return datasetProcessHistory;
		log.info("Não foi possível obter os dados na função getMovementSeq(" + processInstanceId + ")")
	} catch (error) {
		throw "Erro na função getMovementSeq " + String(error);
	}
	return false;
}

function getProcessTask(processInstanceId) {
	log.info("getProcessTask(" + processInstanceId + ")");
	try {
		var datasetProcessTask = DatasetFactory.getDataset('processTask', null, new Array(
			DatasetFactory.createConstraint('processTaskPK.processInstanceId', processInstanceId, processInstanceId, ConstraintType.MUST),
			DatasetFactory.createConstraint('active', 'true', 'true', ConstraintType.MUST)
		), null);
		if (datasetProcessTask.rowsCount > 0) return datasetProcessTask;
		log.info("Não foi possível obter os dados na função getProcessTask(" + processInstanceId + ")")
	} catch (error) {
		throw new Error("Erro na função getProcessTask " + String(error));
	}
	return false;
}

/***
 * 65538
 */
