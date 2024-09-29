function beforeCancelProcess(colleagueId, processId) {
    try {
        var parametros = new java.util.HashMap();
        parametros.put("ASSUNTO", "CANCELAMENTO - FASE APROV. GESTOR");
        parametros.put("subject", "CANCELAMENTO - FASE APROV. GESTOR");
        parametros.put("USUARIO", getColleagueName(getValue("WKUser")));
        parametros.put("TITULO_SOLICITACAO", String(getValue("WKNumProces")));
        parametros.put("ATENDENTE", "Gestão");
        parametros.put("SOLICITACAO", String(getValue("WKNumProces")));
        var destinatarios = new java.util.ArrayList();

        var Email1 = hAPI.getCardValue("email_solicitante");
        var Email2 = hAPI.getCardValue("copia_email_solicitante");
        if (Email1 != "" && Email1 != null) {
            destinatarios.add(Email1);
        }
        if (Email2 != "" && Email2 != null) {
            destinatarios.add(Email2);
        }

        /** Personalizado */
        var msg = '';
        msg += '<html>'
        msg += '	<body>'
        msg += '	<h2> Olá, ' + getColleagueName(getValue("WKUser")) + '</h2>';
        msg += '	<p> Informamos que a solicitação ' + String(getValue("WKNumProces")) + ' foi cancelada!.</p>'
        msg += '    <p> Título : ' + hAPI.getCardValue("titulo_solicitacao"); + '</p>';
        msg += '	</body>'
        msg += '</html>'
        var obj = new com.fluig.foundation.mail.service.EMailServiceBean();

        var assunto = String('ENGPAC - G5 - Fluig ' + String(getValue("WKNumProces")));
        for (var index = 0; index < destinatarios.size(); index++) {
            var destinatario = String(destinatarios.get(index));
            var envido = obj.simpleEmail(1, assunto, "suportefluig@engpac.com.br", destinatario, msg, "text/html");
        }
	} catch (error) {
		throw error;
	}
}