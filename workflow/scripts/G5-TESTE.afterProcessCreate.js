function afterProcessCreate(processId) 
{
    log.info("============= inicio afterProcessCreate G5 " + getValue("WKNumProces") + "============= ");
    try {
        var parametros = new java.util.HashMap();
        parametros.put("ASSUNTO", "Inicio");
        parametros.put("subject", "Inicio");
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
        
        destinatarios.add('agcoimbra@gmail.com');
        log.info("afterProcessCreate g5 028")
        log.dir(parametros)
        log.info("afterProcessCreate g5 030")
        log.dir(destinatarios)
        notifier.notify(getValue("WKUser"), "template_email_engpac", parametros, destinatarios, "text/html");
        log.info("afterProcessCreate g5 033")
        
        
        
    } catch (e) {
        log.error("dentro do catch");
        log.error("Linha do erro" + e.lineNumber);
        log.error(String(e));
        throw new Error(e);
    }
    log.info("============= fim afterProcessCreate g5" + String(getValue("WKNumProces")) + "============= ");
}