function servicetask344(attempt, message) {
    //Disparo de email
    log.info('servicetask344 344 rodando...')

    var emails = [hAPI.getCardValue('email_solicitante'), hAPI.getCardValue('copia_email_solicitante')];
    var contentEmail = '';
    contentEmail += '<html>'
    contentEmail += '	<body>'
    contentEmail += '	<h2> Olá, ' + getColleagueName(getValue("WKUser")) + '</h2>';
    contentEmail += '	<p> Informamos que a solicitação ' + String(getValue("WKNumProces")) + ' foi paga e finalizada !</p>'
    contentEmail += '<br><p>Seguem os comprovantes de pagamento:</p><br>'

    var indexes = hAPI.getChildrenIndexes("table_pagamento_unico")

    for (var i = 0; i < indexes.length; i++) {
        var attachmentLink = getAttchment(hAPI.getCardValue('anexo_pu___' + indexes[i]))
        if (attachmentLink) {
            contentEmail += attachmentLink
        }
    }

    contentEmail += '	</body>'
    contentEmail += '</html>'

    var obj = new com.fluig.foundation.mail.service.EMailServiceBean();

    for (var x = 0; x < emails.length; x++) {
        obj.simpleEmail(1, 'Comprovantes do pagamento - Solicitação: ' + String(getValue("WKNumProces")), "suportefluig@engpac.com.br", emails[x], contentEmail, "text/html");
    }
}

function getAttchment(description) {
    var pageService = fluigAPI.getPageService();
    var urlFluig = pageService.getServerURL();
    var attachments = hAPI.listAttachments();
    for (var i = 0; i < attachments.size(); i++) {
        var attachment = attachments.get(i);
        if (attachment.getPhisicalFile() == description) {
            return '<p><a href="' + urlFluig + '/portal/p/1/ecmnavigation?app_ecm_navigation_doc=' + attachment.getDocumentId() + '">' + attachment.getDocumentDescription() + '</a></p><br>'
        }
    }
}
