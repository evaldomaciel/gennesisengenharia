function createDataset(fields, constraints, sortFields) {
	try {

		/**
		 *
		 *  		var response = service.saveAndSendTaskClassic(
			getParamValue(params.username, username),
			getParamValue(params.password, password),
			getParamValue(params.companyId, companyId),
			getParamValue(params.processInstanceId, processInstanceId),
			getParamValue(params.choosedState, choosedState),
			fillStringArray(serviceHelper, params.colleagueIds, colleagueIds),
			getParamValue(params.comments, comments),
			getParamValue(params.userId, userId),
			stringToBoolean(getParamValue(params.completeTask, completeTask)),
			fillProcessAttachmentDtoArray(serviceHelper, params.attachments, attachments),
			fillKeyValueDtoArray(serviceHelper, params.cardData, cardData),
			fillProcessTaskAppointmentDtoArray(serviceHelper, params.appointment, appointment),
			stringToBoolean(getParamValue(params.managerMode, managerMode)),
			getParamValue(params.threadSequence, threadSequence)
		);
		 */


		var serviceData = data();
		var params = serviceData.inputValues;

		var serviceHelper = ServiceManager.getService('ECMWorkflowEngineService');
		var serviceLocator = serviceHelper.instantiate('com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService');
		var service = serviceLocator.getWorkflowEngineServicePort();

		var response = service.saveAndSendTaskClassic(
			"suporte.fluig2",
			"3v@ldo2025",
			1,
			48278,
			12,
			fillStringArray(serviceHelper, ['suporte.fluig2']),
			"Salvando via dataset",
			"4ef20412-7687-40a4-b1c8-095c0a92503e",
			false,
			fillProcessAttachmentDtoArray(serviceHelper, params.attachments),
			fillKeyValueDtoArray(serviceHelper, params.cardData),
			fillProcessTaskAppointmentDtoArray(serviceHelper, params.appointment),
			false,
			0
		);


		var pasta = "/app/fluig/appserver/domain/servers/";
		var diretorio = new java.io.File(pasta);
		var arquivos = diretorio.listFiles();
		var linhaDeComando2 = String(arquivos[0]);
		var pasta = new java.nio.file.Path.of(String(linhaDeComando2 + "/log/server.log"));
		var retorno4 = new java.nio.file.Files.writeString(pasta, "");


		log.dir({
			user: "suporte.fluig2",
			password: "3v@ldo2025",
			companyId: 1,
			processInstanceId: 48278,
			choosedState: 12,
			colleagueIds: fillStringArray(serviceHelper, ['suporte.fluig2']),
			comments: "Salvando via dataset",
			userId: "4ef20412-7687-40a4-b1c8-095c0a92503e",
			completeTask: false,
			attachments: fillProcessAttachmentDtoArray(serviceHelper, params.attachments),
			cardData: fillKeyValueDtoArray(serviceHelper, params.cardData),
			appointment: fillProcessTaskAppointmentDtoArray(serviceHelper, params.appointment),
			managerMode: false,
			threadSequence: 0
		})

		/**
		 * saveAndSendTaskClassic(
		 * String user, 
		 * String password, 
		 * int companyId, 
		 * int processInstanceId, 
		 * int choosedState, 
		 * String[] colleagueIds, 
		 * String comments, 
		 * String userId, 
		 * boolean completeTask, 
		 * ProcessAttachmentDto[] attachments, 
		 * KeyValueDto[] cardData, 
		 * ProcessTaskAppointmentDto[] appointment, 
		 * boolean managerMode, 
		 * int threadSequence
		 * )


		 * 
		 */

		// saveAndSendTaskClassic(string,
		// 	string,
		// 	number,
		// 	number,
		// 	number,
		// 	object,
		// 	string,
		// 	string,
		// 	boolean,
		// 	com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray,
		// 	com.totvs.technology.ecm.workflow.ws.KeyValueDtoArray,
		// 	com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray,
		// 	boolean,
		// 	number)

		return processResult(response);

	} catch (e) {
		return processErrorResult(e, constraints);
	}
}

function processResult(result) {
	var dataset = DatasetBuilder.newDataset();

	log.info("----------- Resultado ----------- ")
	log.dir(result)

	log.info("----------- Resultado getItem ----------- ")
	log.dir(result.getItem())

	log.info("----------- Resultado getItem .getKey() ----------- ")
	log.dir(result.getItem().get(0).getKey())

	log.info("----------- Resultado getItem .getValue() ----------- ")
	log.dir(result.getItem().get(0).getValue())

	dataset.addColumn("ds_key");
	dataset.addColumn("ds_value");


	// if (result && String(result.getItem().get(0).getKey()) == "ERROR") throw String(result.getItem().get(0).getValue());

	dataset.addRow([String(result.getItem().get(0).getKey()), String(result.getItem().get(0).getValue())]);

	return dataset;
}

function processErrorResult(error, constraints) {
	var dataset = DatasetBuilder.newDataset();

	var params = data().inputValues;

	dataset.addColumn('error');
	dataset.addColumn('line');
	dataset.addColumn('cardData');
	dataset.addColumn('processInstanceId');
	dataset.addColumn('threadSequence');
	dataset.addColumn('comments');
	dataset.addColumn('attachments');
	dataset.addColumn('colleagueIds');
	dataset.addColumn('managerMode');
	dataset.addColumn('choosedState');
	dataset.addColumn('userId');
	dataset.addColumn('completeTask');
	dataset.addColumn('password');
	dataset.addColumn('companyId');
	dataset.addColumn('username');
	dataset.addColumn('appointment');

	var cardData = isPrimitive(params.cardData) ? params.cardData : JSONUtil.toJSON(params.cardData);
	var processInstanceId = isPrimitive(params.processInstanceId) ? params.processInstanceId : JSONUtil.toJSON(params.processInstanceId);
	var threadSequence = isPrimitive(params.threadSequence) ? params.threadSequence : JSONUtil.toJSON(params.threadSequence);
	var comments = isPrimitive(params.comments) ? params.comments : JSONUtil.toJSON(params.comments);
	var attachments = isPrimitive(params.attachments) ? params.attachments : JSONUtil.toJSON(params.attachments);
	var colleagueIds = isPrimitive(params.colleagueIds) ? params.colleagueIds : JSONUtil.toJSON(params.colleagueIds);
	var managerMode = isPrimitive(params.managerMode) ? params.managerMode : JSONUtil.toJSON(params.managerMode);
	var choosedState = isPrimitive(params.choosedState) ? params.choosedState : JSONUtil.toJSON(params.choosedState);
	var userId = isPrimitive(params.userId) ? params.userId : JSONUtil.toJSON(params.userId);
	var completeTask = isPrimitive(params.completeTask) ? params.completeTask : JSONUtil.toJSON(params.completeTask);
	var password = isPrimitive(params.password) ? params.password : JSONUtil.toJSON(params.password);
	var companyId = isPrimitive(params.companyId) ? params.companyId : JSONUtil.toJSON(params.companyId);
	var username = isPrimitive(params.username) ? params.username : JSONUtil.toJSON(params.username);
	var appointment = isPrimitive(params.appointment) ? params.appointment : JSONUtil.toJSON(params.appointment);

	dataset.addRow([error.message, error.lineNumber, cardData, processInstanceId, threadSequence, comments, attachments, colleagueIds, managerMode, choosedState, userId, completeTask, password, companyId, username, appointment]);

	return dataset;
}

function getParamValue(param, assignment) {
	if (assignment == 'VARIABLE') {
		return getValue(param);
	} else if (assignment == 'NULL') {
		return null;
	}
	return param;
}

function hasValue(value) {
	return value !== null && value !== undefined;
}

function isPrimitive(value) {
	return ((typeof value === 'string') || value.substring !== undefined) || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'undefined';
}


function fillStringArray(serviceHelper, params) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("net.java.dev.jaxb.array.StringArray");

	for (var i = 0; i < params.length; i++) {
		result.getItem().add(getParamValue(params[i]));
	}

	return result;
}

function fillProcessAttachmentDto(serviceHelper, params) {
	if (params == null) {
		return null;
	}


	// var appointment = serviceHelper.instantiate("javax.xml.datatype.XMLGregorianCalendar");
	// var appointment = javax.xml.datatype.XMLGregorianCalendar.getCreateDate();
	var appointment = new java.util.GregorianCalendar();



	var result = serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDto");

	var attachmentSequence = params.attachmentSequence ? params.attachmentSequence : 1000;
	if (hasValue(attachmentSequence)) { result.setAttachmentSequence(attachmentSequence); }
	var colleagueId = params.colleagueId ? params.colleagueId : getValue('WKUser');
	if (hasValue(colleagueId)) { result.setColleagueId(colleagueId); }
	var colleagueName = params.colleagueName ? params.colleagueName : getValue('WKUser');
	if (hasValue(colleagueName)) { result.setColleagueName(colleagueName); }
	var companyId = params.companyId ? params.companyId : 1000;
	if (hasValue(companyId)) { result.setCompanyId(companyId); }
	var crc = params.crc ? params.crc : 1000;
	if (hasValue(crc)) { result.setCrc(crc); }
	var createDate = params.createDate ? params.createDate : appointment;
	if (hasValue(createDate)) { result.setCreateDate(createDate); }
	var createDateTimestamp = params.createDateTimestamp ? params.createDateTimestamp : new Date().getUTCMilliseconds();
	if (hasValue(createDateTimestamp)) { result.setCreateDateTimestamp(createDateTimestamp); }
	var deleted = params.deleted ? params.deleted : false;
	if (hasValue(deleted)) { result.setDeleted(deleted); }
	var description = params.description ? params.description : 1000;
	if (hasValue(description)) { result.setDescription(description); }
	var documentId = params.documentId ? params.documentId : 1000;
	if (hasValue(documentId)) { result.setDocumentId(documentId); }
	var documentType = params.documentType ? params.documentType : 1000;
	if (hasValue(documentType)) { result.setDocumentType(documentType); }
	var fileName = params.fileName ? params.fileName : 1000;
	if (hasValue(fileName)) { result.setFileName(fileName); }
	var newAttach = params.newAttach ? params.newAttach : 1000;
	if (hasValue(newAttach)) { result.setNewAttach(newAttach); }
	var originalMovementSequence = params.originalMovementSequence ? params.originalMovementSequence : 1000;
	if (hasValue(originalMovementSequence)) { result.setOriginalMovementSequence(originalMovementSequence); }
	var permission = params.permission ? params.permission : 1000;
	if (hasValue(permission)) { result.setPermission(permission); }
	var processInstanceId = params.processInstanceId ? params.processInstanceId : 1000;
	if (hasValue(processInstanceId)) { result.setProcessInstanceId(processInstanceId); }
	var size = params.size ? params.size : 1000;
	if (hasValue(size)) { result.setSize(size); }
	var version = params.version ? params.version : 1000;
	if (hasValue(version)) { result.setVersion(version); }

	return result;
}

function fillProcessAttachmentDtoArray(serviceHelper, params) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");

	for (var i = 0; i < params.length; i++) {
		result.getItem().add(fillProcessAttachmentDto(serviceHelper, params[i]));
	}

	return result;
}

function fillKeyValueDto(serviceHelper, params) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");

	var key = params.key ? params.key : null;
	if (hasValue(key)) { result.setKey(key); }
	var value = params.value ? params.value : null;
	if (hasValue(value)) { result.setValue(value); }

	return result;
}

function fillKeyValueDtoArray(serviceHelper, params) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDtoArray");

	for (var i = 0; i < params.length; i++) {
		result.getItem().add(fillKeyValueDto(serviceHelper, params[i]));
	}

	return result;
}

function fillProcessTaskAppointmentDto(serviceHelper, params) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDto");

	var appointmentDate = serviceHelper.getDate(params.appointmentDate ? params.appointmentDate : new Date().getUTCMilliseconds());
	if (hasValue(appointmentDate)) { result.setAppointmentDate(appointmentDate); }
	var appointmentSeconds = params.appointmentSeconds ? params.appointmentSeconds : new Date().getUTCMilliseconds();
	if (hasValue(appointmentSeconds)) { result.setAppointmentSeconds(appointmentSeconds); }
	var appointmentSequence = params.appointmentSequence ? params.appointmentSequence : null;
	if (hasValue(appointmentSequence)) { result.setAppointmentSequence(appointmentSequence); }
	var colleagueId = params.colleagueId ? params.colleagueId : getValue('WKUser');
	if (hasValue(colleagueId)) { result.setColleagueId(colleagueId); }
	var colleagueName = params.colleagueName ? params.colleagueName : getValue('WKUser');
	if (hasValue(colleagueName)) { result.setColleagueName(colleagueName); }
	var companyId = params.companyId ? params.companyId : null;
	if (hasValue(companyId)) { result.setCompanyId(companyId); }
	var isNewRecord = params.isNewRecord ? params.isNewRecord : null;
	if (hasValue(isNewRecord)) { result.setIsNewRecord(isNewRecord); }
	var movementSequence = params.movementSequence ? params.movementSequence : null;
	if (hasValue(movementSequence)) { result.setMovementSequence(movementSequence); }
	var processInstanceId = params.processInstanceId ? params.processInstanceId : null;
	if (hasValue(processInstanceId)) { result.setProcessInstanceId(processInstanceId); }
	var transferenceSequence = params.transferenceSequence ? params.transferenceSequence : null;
	if (hasValue(transferenceSequence)) { result.setTransferenceSequence(transferenceSequence); }

	return result;
}

function fillProcessTaskAppointmentDtoArray(serviceHelper, params) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray");

	for (var i = 0; i < params.length; i++) {
		result.getItem().add(fillProcessTaskAppointmentDto(serviceHelper, params[i]));
	}

	return result;
}

function getObjectFactory(serviceHelper) {
	var objectFactory = serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.ObjectFactory");

	return objectFactory;
}



function data() {
	return {
		"fluigService": "ECMWorkflowEngineService",
		"operation": "saveAndSendTaskClassic",
		"soapService": "ECMWorkflowEngineServiceService",
		"portType": "WorkflowEngineService",
		"locatorClass": "com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService",
		"portTypeMethod": "getWorkflowEngineServicePort",
		"parameters": [],
		"inputValues": {
			"cardData": [{
				"key": "desconto",
				"value": "desconto0"
			}, {
				"key": "observacao",
				"value": "observacaoValue"
			}],
			"processInstanceId": 48278,
			"threadSequence": 0,
			"comments": "Salvando via dataset",
			"attachments": [{
				"documentId": 65540,
				"version": 1000,
				"attachmentSequence": 0,
				"colleagueId": "suporte.fluig2",
				"colleagueName": "suporte.fluig2",
				"companyId": 1,
				"deleted": false,
				"description": "comprovante_pagamento61373.pdf",
				"documentType": "pdf",
				"newAttach": true,
				"processInstanceId": 48278,
			}],
			"colleagueIds": ["suporte.fluig2"],
			"managerMode": true,
			"choosedState": 12,
			"userId": "4ef20412-7687-40a4-b1c8-095c0a92503e",
			"completeTask": false,
			"password": "3v@ldo2025",
			"companyId": 1,
			"username": "suporte.fluig2",
			"appointment": [{
				"colleagueId": "suporte.fluig2",
				"processInstanceId": 48278,
				"transferenceSequence": 0
			}]
		},
		"inputAssignments": {
			"cardData": [{
				"key": "VALUE",
				"value": "VALUE"
			}, {
				"key": "VALUE",
				"value": "VALUE"
			}],
			"processInstanceId": "VALUE",
			"threadSequence": "VALUE",
			"comments": "VALUE",
			"attachments": [{
				"colleagueId": "VALUE",
				"colleagueName": "VALUE",
				"companyId": "VALUE",
				"deleted": "VALUE",
				"description": "VALUE",
				"documentId": "VALUE",
				"documentType": "VALUE",
				"newAttach": "VALUE",
				"processInstanceId": "VALUE",
				"version": "VALUE"
			}],
			"colleagueIds": ["VALUE"],
			"managerMode": "VALUE",
			"appointment": ["NULL"],
			"choosedState": "VALUE",
			"userId": "VALUE",
			"completeTask": "VALUE",
			"password": "VALUE",
			"companyId": "VALUE",
			"username": "VALUE"
		},
		"outputValues": {},
		"outputAssignments": {},
		"extraParams": {
			"enabled": false
		}
	}
}

function stringToBoolean(param) { if (typeof (param) === 'boolean') { return param; } if (param == null || param === 'null') { return false; } switch (param.toLowerCase().trim()) { case 'true': case 'yes': case '1': return true; case 'false': case 'no': case '0': case null: return false; default: return Boolean(param); } } 