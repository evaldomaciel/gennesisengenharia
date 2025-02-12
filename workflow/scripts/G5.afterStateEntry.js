function afterStateEntry(sequenceId) {
    var numeroFluxo = parseInt(getValue("WKNumProces"));
    var NumDaSolicitacao = hAPI.getCardValue("numero_solicitacao");
    var emailDestinatario = hAPI.getCardValue("email_solicitante");

    var assunto = "G5 - Solicitação De Pagamentos Avulsos, Solicitacao Numero:" + numeroFluxo;
    var corpoEmail = "Olá, sua solicitação foi enviada para a fase de ajuste, por favor confire as informações no FLUIG "
        + "<br> Atenciosamente;" + " <br> Departamento Financeiro.";

    function RetornoParaOsolicitante(emailDestinatario, assunto, corpoEmail) {
        log.dir(emailDestinatario);
        log.info('o e-mail == ' + emailDestinatario);

        try {
            var parametros = new java.util.HashMap();
            parametros.put("subject", assunto);
            parametros.put("corpoEmail", corpoEmail);

            var destinatarios = new java.util.ArrayList();
            destinatarios.add(emailDestinatario);

            log.info("enviarEmail >> parametros " + parametros);

            notifier.notify('admin', "template_blank2.html", parametros, destinatarios, "text/html");
        } catch (err) {
            log.info("########### ERRO AO EMAIL CUSTOMIZADO ###########");
            log.error(err);
            throw (err);
        }
    }

    if ( sequenceId == 91 ) { // Retorno Para o solicitante
        RetornoParaOsolicitante(emailDestinatario, assunto, corpoEmail);
    } else if ( sequenceId == 7 ) { // Retorno Para o solicitante
        RetornoParaOsolicitante(emailDestinatario, assunto, corpoEmail);
    } 
}
