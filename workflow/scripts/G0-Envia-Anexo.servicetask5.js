function servicetask5(attempt, message) {
	// Inicialização das variáveis e configuração do e-mail
	try {
		var textoMsg = "";
		var attachments = hAPI.listAttachments();
		var pageService = fluigAPI.getPageService();
		var urlFluig = pageService.getServerURL();
		for (var i = 0; i < attachments.size(); i++) {
			var attachment = attachments.get(i);
			textoMsg += '<p><a href="' + urlFluig + '/portal/p/1/ecmnavigation?app_ecm_navigation_doc=' + attachment.getDocumentId() + '">' + attachment.getDocumentDescription() + '</a></p>'
		}

		var msg = '';
		msg += '<html>'
		msg += '	<body>'
		msg += '	<h2> Olá, ' + getValue("WKUser") + '</h2>';
		msg += '	<p> Seguem anexos do processo ' + String(getValue("WKNumProces")) + '</p>'
		msg += '	<p>' + textoMsg + '</p>'
		msg += '	</body>'
		msg += '</html>'
		var obj = new com.fluig.foundation.mail.service.EMailServiceBean();

		var destinatario = 'evaldomaciel17@gmail.com';
		var assunto = String('ENGPAC - G5 - Fluig ' + String(getValue("WKNumProces")) + ' - Envio de anexos');
		var envido = obj.simpleEmail(1, assunto, "suportefluig@engpac.com.br", destinatario, msg, "text/html");

	} catch (error) {
		throw new Error(error);

	}

	return true;
}


function getBase64(username, password, companyId, documentId, colleagueId, documentoVersao, nomeArquivo) {
	try {
		var serviceHelper = ServiceManager.getService("ECMDocumentService");
		var serviceLocator = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.ECMDocumentServiceService");
		var service = serviceLocator.getDocumentServicePort();
		var response = service.getDocumentContent(username, password, companyId, documentId, colleagueId, documentoVersao, nomeArquivo);

		return response;
	} catch (error) {
		throw new Error(error);
	}
}


/*
var result64 = getBase64('fluig2', '1', 1, attachment.getDocumentId(), 'fluig2', attachment.getVersion(), attachment.getDocumentDescription())
log.dir("result64")
log.dir(result64)

var base64Anexo = "";
for (var i = 0; i < result64.length; ++i) {
	base64Anexo += (String.fromCharCode(result64[i]));
}
log.info("String(base64Anexo)")
log.info(base64Anexo)
var datasetDsMandaEmailComAnexo = DatasetFactory.getDataset('dsMandaEmailComAnexo',
	null,
	new Array(
		DatasetFactory.createConstraint('destinatario', 'evaldomaciel17@gmail.com', null, ConstraintType.MUST),
		DatasetFactory.createConstraint('assunto', 'Vamos mandar via processo ' + getValue('WKNumProces') + " - " + attachment.getDocumentDescription(), null, ConstraintType.MUST),
		DatasetFactory.createConstraint('numProcess', getValue('WKNumProces'), null, ConstraintType.MUST),
		DatasetFactory.createConstraint('msg', 'Não tem mensagem, veja o anexo!', null, ConstraintType.MUST),
		DatasetFactory.createConstraint('conta', 1, 1, ConstraintType.MUST),
		DatasetFactory.createConstraint('base64AnexoNome', attachment.getDocumentDescription(), null, ConstraintType.MUST),
		DatasetFactory.createConstraint('base64Anexo', base64Anexo, null, ConstraintType.MUST)),
	null);
*/