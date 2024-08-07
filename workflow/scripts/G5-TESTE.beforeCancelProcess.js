function beforeCancelProcess(colleagueId, processId) {
    log.info("============= inicio afterTaskComplete 00-FLUIG " + getValue("WKNumProces") + "============= ");
    try {
        var parametros = new java.util.HashMap();
        parametros.put("ASSUNTO", "CANCELAMENTO - FASE APROV. GESTOR");
        parametros.put("subject", "CANCELAMENTO - FASE APROV. GESTOR");
        parametros.put("USUARIO", getValue("WKUser"));
        parametros.put("TITULO_SOLICITACAO", String(getValue("WKNumProces")));
        parametros.put("ATENDENTE", "Gestão");
        parametros.put("SOLICITACAO", String(getValue("WKNumProces")));

        var destinatarios = new java.util.ArrayList();
        destinatarios.add("agcoimbra@gmail.com");
        destinatarios.add("desenvolvimento.fluig@grupodecio.com.br");
        destinatarios.add("evaldomaciel17@gmail.com");

        notifier.notify(getValue("WKUser"), "template_email_engpac", parametros, destinatarios, "text/html");

        /** Personalizado */
        var msg = '';
        msg += '<html>'
        msg += '	<head>'
        msg += '		<meta>'
        msg += '		<meta>'
        msg += '		<meta>'
        msg += '	</head>'
        msg += '	<body>'
        msg += '	<h2> Olá, ' + getValue("WKUser") + '</h2>';
        msg += '	<p> Informamos que a solicitação ' + String(getValue("WKNumProces"))
        msg += '	    foi cancelada!. </p>'
        msg += '	</body>'
        msg += '</html>'
        var obj = new com.fluig.foundation.mail.service.EMailServiceBean();

        var assunto = String('ENGPAC - G5 - Fluig ' + String(getValue("WKNumProces")));
        for (var index = 0; index < destinatarios.size(); index++) {
            var destinatario = String(destinatarios.get(index));
            var envido = obj.simpleEmail(1, assunto, "suportefluig@engpac.com.br", destinatario, msg, "text/html");
            log.info(destinatario + " - " + assunto);
        }
    } catch (e) {
        log.error("dentro do catch");
        log.error("Linha do erro" + e.lineNumber);
        log.error(String(e));
        throw new Error(e);
    }
    log.info("============= fim afterTaskComplete 00-FLUIG " + String(getValue("WKNumProces")) + "============= ");
}