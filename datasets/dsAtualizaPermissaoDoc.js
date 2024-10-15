function defineStructure() {
	addColumn("FOLDER");
	addColumn("DOCUMENT_ID");
	addColumn("DOCUMENT_NAME");
	addColumn("UPDATE_STATUS");
	addColumn("UPDATE_BY");
	setKey(["DOCUMENT_ID"])
	addIndex(["FOLDER", "DOCUMENT_ID"])
}

function onSync(lastSyncDate) {
	var pasta = "/app/fluig/appserver/domain/servers/";
	var diretorio = new java.io.File(pasta);
	var arquivos = diretorio.listFiles();
	var linhaDeComando2 = String(arquivos[0]);
	var pasta = new java.nio.file.Path.of(String(linhaDeComando2 + "/log/server.log"));
	var retorno4 = new java.nio.file.Files.writeString(pasta, "");

	var synchronizedDataset = DatasetBuilder.newDataset();
	try {
		var folders = getFoldersOC();
		for (var folderIdx = 0; folderIdx < folders.rowsCount; folderIdx++) {
			var folderId = folders.getValue(folderIdx, 'documentPK.documentId');
			var docsInFolder = getDocsOC(folderId)
			for (var docsInFolderIdx = 0; docsInFolderIdx < docsInFolder.rowsCount; docsInFolderIdx++) {
				var documentId = docsInFolder.getValue(docsInFolderIdx, 'documentPK.documentId');
				var docName = docsInFolder.getValue(docsInFolderIdx, 'documentDescription');
				let update = callService(documentId, 1000, lastSyncDate)
				var updateMsg = String(update.getItem().get(0).getWebServiceMessage())
				synchronizedDataset.addOrUpdateRow([folderId, documentId, docName, updateMsg, getValue("WKUser")])
			}
		}
	} catch (e) {
		// throw new Error(e);
		log.error("----------------------- Deu erro ----------------------- ")
		log.info("----------------------- Deu erro ----------------------- ")
		log.error(e)
		log.info(e)
		throw new Error(e);
	}
	return synchronizedDataset;
}

function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	try {
		newDataset.addColumn("FOLDER");
		newDataset.addColumn("DOCUMENT_ID");
		newDataset.addColumn("DOCUMENT_NAME");
		newDataset.addColumn("UPDATE_STATUS");
		newDataset.addColumn("UPDATE_BY");
		var folders = getFoldersOC();
		for (var folderIdx = 0; folderIdx < folders.rowsCount; folderIdx++) {
			var folderId = folders.getValue(folderIdx, 'documentPK.documentId');
			var docsInFolder = getDocsOC(folderId)
			for (var docsInFolderIdx = 0; docsInFolderIdx < docsInFolder.rowsCount; docsInFolderIdx++) {
				var documentId = docsInFolder.getValue(docsInFolderIdx, 'documentPK.documentId');
				var docName = docsInFolder.getValue(docsInFolderIdx, 'documentDescription');
				var update = callService(documentId, 1000, docsInFolderIdx)
				var updateMsg = String(update.getItem().get(0).getWebServiceMessage())
				// var updateMsg = "teste"

				newDataset.addRow([folderId, documentId, docName, updateMsg, getValue("WKUser")])
			}
		}
	} catch (e) {
		newDataset.addColumn("LINHA");
		newDataset.addColumn("ERROR");
		newDataset.addRow([e.lineNumber, String("ERRO: " + String(e) + " - Linha: " + e.lineNumber)]);
	}
	return newDataset;
}


function callService(documentId, version, time) {
	var fluigService = 'ECMDocumentService';
	var ECMDocumentServiceService = "com.totvs.technology.ecm.dm.ws.ECMDocumentServiceService";

	var serviceHelperActive = ServiceManager.getService(fluigService);
	var serviceLocatorActive = serviceHelperActive.instantiate(ECMDocumentServiceService);
	var serviceActive = serviceLocatorActive.getDocumentServicePort();
	var response = serviceActive.getDocumentVersion('fluig', '1', 1, documentId, version, '4ef20412-7687-40a4-b1c8-095c0a92503e');
	var documentDto = response.getItem().get(0);

	var documentDtoUpload = docAPI.copyDocumentToUploadArea(documentDto.getDocumentId(), documentDto.getVersion());

	// return JSONUtil.toJSON(documentDto)

	documentDto.setVersionDescription('Atualizado via dataset ' + String(new Date().toDateString()) + " - " + time);
	documentDto.setColleagueId(getValue("WKUser")); // Informar o usuário logado.
	documentDto.setPublisherId(getValue("WKUser")); // Informar o publicador.  


	var serviceHelper = ServiceManager.getService(fluigService);
	var serviceLocator = serviceHelper.instantiate(ECMDocumentServiceService);
	var service = serviceLocator.getDocumentServicePort();

	var documentDtoArray = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.DocumentDtoArray");
	documentDtoArray.getItem().add(documentDto);

	var attachment = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.Attachment");
	attachment.setFileName(documentDto.getPhisicalFile());
	attachment.setPrincipal(true);
	attachment.setAttach(false);

	var attachmentArray = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.AttachmentArray");
	attachmentArray.getItem().add(attachment);

	var parentName = getParentName(documentDto.getParentDocumentId());

	var processInstanceId = String(parentName).split("-")[1]

	var usersProcess = getUsersProcess(processInstanceId);

	var documentSecurityConfigDtoArray = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.DocumentSecurityConfigDtoArray");

	for (var index = 0; index < usersProcess.size(); index++) {
		var security = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.DocumentSecurityConfigDto");
		security.setAttributionType(1) // 1 - usuário; 2 - grupo; 3 - todos  
		security.setAttributionValue(usersProcess.get(index)) // id do usuário
		security.setCompanyId(1)
		security.setDocumentId(documentDto.getDocumentId())
		security.setDownloadEnabled(true)
		security.setInheritSecurity(false)
		security.setSecurityLevel(2) // 0 - todo; 2 -  modificar; 3 - todos
		security.setSecurityVersion(true)
		security.setPermission(true)
		security.setShowContent(true)
		security.setVersion(documentDto.getVersion())
		documentSecurityConfigDtoArray.getItem().add(security);
	}

	var approverDtoArray = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.ApproverDtoArray");
	var relatedDocumentDtoArray = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.RelatedDocumentDtoArray");
	var response = service.updateDocument('fluig', '1', 1, documentDtoArray, attachmentArray, documentSecurityConfigDtoArray, approverDtoArray, relatedDocumentDtoArray);
	return response;
}

function getAttachments(docDto) {
	var attachment = docAPI.newAttachment();
	attachment.setFileName(docDto.getPhisicalFile());
	attachment.setPrincipal(true);
	attachment.setAttach(false);
	return attachment;
}

function getUsersProcess(processInstanceId) {
	var datasetProcessTask = DatasetFactory.getDataset('processTask', null, new Array(
		DatasetFactory.createConstraint('processTaskPK.processInstanceId', processInstanceId, processInstanceId, ConstraintType.MUST)
	), null);
	var users = new java.util.ArrayList();
	// users.add(getValue("WKUser"));
	users.add("admin");
	for (var index = 0; index < datasetProcessTask.rowsCount; index++) {
		var colleagueId = String(datasetProcessTask.getValue(index, 'processTaskPK.colleagueId'));
		var choosedColleagueId = String(datasetProcessTask.getValue(index, 'choosedColleagueId'));
		var completeColleagueId = String(datasetProcessTask.getValue(index, 'completeColleagueId'));
		if (users.contains(colleagueId) == false && isValidUserToCreateDoc(colleagueId)) { users.add(colleagueId); }
		if (users.contains(choosedColleagueId) == false && isValidUserToCreateDoc(choosedColleagueId)) { users.add(choosedColleagueId); }
		if (users.contains(completeColleagueId) == false && isValidUserToCreateDoc(completeColleagueId)) { users.add(completeColleagueId); }
	}
	return users;
}

function isValidUserToCreateDoc(user) {
	user = String(user);
	var response = false
	if (user.indexOf(':') < 0 && user.length > 0) response = true;
	return response
}

function getFoldersOC() {
	var colunasDocument = new Array('documentPK.documentId', 'documentDescription');
	var datasetDocument = DatasetFactory.getDataset('document', colunasDocument, new Array(
		// DatasetFactory.createConstraint('sqlLimit', '2', '2', ConstraintType.MUST),
		DatasetFactory.createConstraint('parentDocumentId', '88200', '88200', ConstraintType.MUST)
	), ['documentPK.documentId;desc']);
	return datasetDocument;
}

function getDocsOC(parentDocumentId) {
	var colunasDocument = new Array('documentPK.documentId', 'documentDescription');
	var datasetDocument = DatasetFactory.getDataset('document', colunasDocument, new Array(
		DatasetFactory.createConstraint('parentDocumentId', parentDocumentId, parentDocumentId, ConstraintType.MUST)
	), ['documentPK.documentId;desc']);
	return datasetDocument;
}


function getParentName(documentId) {
	var colunasDocument = new Array('documentPK.documentId', 'documentDescription');
	var datasetDocument = DatasetFactory.getDataset('document', colunasDocument, new Array(
		DatasetFactory.createConstraint('documentPK.documentId', documentId, documentId, ConstraintType.MUST)
	), ['documentPK.documentId;desc']);
	return datasetDocument.getValue(0, 'documentDescription');
}