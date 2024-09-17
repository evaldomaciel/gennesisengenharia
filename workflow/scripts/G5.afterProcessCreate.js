function afterProcessCreate(processId) {
    log.info("============= inicio afterProcessCreate G5 " + getValue("WKNumProces") + "============= ");
    try {
        var destinatarios = new Array();

        if (hAPI.getCardValue("email_solicitante") != "" && hAPI.getCardValue("email_solicitante") != null) destinatarios.push(hAPI.getCardValue("email_solicitante"));
        if (hAPI.getCardValue("copia_email_solicitante") != "" && hAPI.getCardValue("copia_email_solicitante") != null) destinatarios.push(hAPI.getCardValue("copia_email_solicitante"));

        var msg = '';
        msg += '<html>'
        msg += '	<body>'
        msg += '	<h2> Olá, ' + getColleagueName(getValue("WKUser")) + '</h2>';
        msg += '	<p> Informamos que a solicitação ' + String(getValue('WKNumProces')) + ' foi iniciada no Fluig.';
        msg += '   	<p> Título : ' + hAPI.getCardValue("titulo_solicitacao") + '</p>';
        msg += '	<p>Atenciosamente, Gestão</p>'
        msg += '	</body>'
        msg += '</html>'
        var obj = new com.fluig.foundation.mail.service.EMailServiceBean();

        for (var x = 0; x < destinatarios.length; x++) {
            var envido = obj.simpleEmail(1, 'Início - Solicitação: ' + String(getValue("WKNumProces")), "suportefluig@engpac.com.br", destinatarios[x], msg, "text/html");
        }

    } catch (e) {
        log.error("dentro do catch");
        log.error("Linha do erro" + e.lineNumber);
        log.error(String(e));
        throw new Error(e);
    }
    log.info("============= fim afterProcessCreate g5" + String(getValue("WKNumProces")) + "============= ");
}