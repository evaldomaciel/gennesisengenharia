function createDataset(fields, constraints, sortFields) {

	var pasta = "/app/fluig/appserver/domain/servers/";
	var diretorio = new java.io.File(pasta);
	var arquivos = diretorio.listFiles();
	var linhaDeComando2 = String(arquivos[0]);
	var pasta = new java.nio.file.Path.of(String(linhaDeComando2 + "/log/server.log"));
	var retorno4 = new java.nio.file.Files.writeString(pasta, "");

	var newDataset = DatasetBuilder.newDataset();
	try {
		newDataset.addColumn("QUERY");
		newDataset.addRow([String(rs), element]);

		

	} catch (e) {
		newDataset.addColumn("QUERY");
		newDataset.addColumn("ERROR");
		newDataset.addRow([query, String("ERRO: " + e.message + " - Linha: " + e.lineNumber)]);
	}
	return newDataset;
}

dsConsultaDocumento


function callService(dadosCall) {
	var serviceData = 'ECMDocumentService';

	var serviceHelper = ServiceManager.getService(serviceData.fluigService);
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	var service = serviceLocator.getDocumentServicePort();
	var response = service.updateDocument(params.username, params.password, params.companyId, fillDocumentDtoArray(serviceHelper, params.document, assigns.document),
		fillAttachmentArray(serviceHelper, params.attachments, assigns.attachments), fillDocumentSecurityConfigDtoArray(serviceHelper, params.security, assigns.security),
		fillApproverDtoArray(serviceHelper, params.approvers, assigns.approvers), fillRelatedDocumentDtoArray(serviceHelper, params.relatedDocuments, assigns.relatedDocuments)
	);

	return response;
}