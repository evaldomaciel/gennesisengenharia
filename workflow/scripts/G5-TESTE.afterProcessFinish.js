function afterProcessFinish(processId)
{
	log.info("============= inicio afterProcessFinish 00-FLUIG " + getValue("WKNumProces") + "============= ");
	try {
		var parametros = new java.util.HashMap();
		parametros.put("ASSUNTO", "FinaL do processo");
		parametros.put("subject", "FinaL do processo");
		parametros.put("USUARIO", getValue("WKUser"));
		parametros.put("TITULO_SOLICITACAO", String(getValue("WKNumProces")));
		parametros.put("ATENDENTE", "Gestão");
		parametros.put("SOLICITACAO", String(getValue("WKNumProces")));

		var destinatarios = new java.util.ArrayList();

		
		var Email1 = hAPI.getCardValue("email_solicitante");
		var Email2 = hAPI.getCardValue("copia_email_solicitante");
		if ( Email1 != "" && Email1 != null)
		{
			destinatarios.add(Email1);
		}
		if ( Email2 != "" && Email2 != null)
		{
			destinatarios.add(Email2);
		}
		
		
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
		msg += '	    foi Finalizada!.</p>'
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
	log.info("============= fim afterProcessFinish 00-FLUIG " + String(getValue("WKNumProces")) + "============= ");
}