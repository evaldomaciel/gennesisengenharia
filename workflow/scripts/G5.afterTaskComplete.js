function afterTaskComplete(colleagueId, nextSequenceId, userList) {
    log.info("afterTaskComplete => nextSequenceId => " + nextSequenceId)
    var activity = getValue("WKNumState");
    var proxima = getValue("WKNextState");
    var nSolicitacao = getValue("WKNumProces");
    nSolicitacao = nSolicitacao.toString();

    if (activity == 0 || activity == 76) {
        log.info("inicio task 76");

        log.info("inicio do try-catch");
        try {
            log.info("dentro do try");

            var dataParamsEmail = {
                usuario             : getValue("WKUser"),
                assunto             : "CANCELAMENTO - FASE APROV. GESTOR",
                titulo_solicitacao  : hAPI.getCardValue("titulo_solicitacao"),
                atendente           : "Gestão",
                num_solicitacao     : hAPI.getCardValue("numero_solicitacao")
            }    

            log.info("DADOS EMAILS")
            log.dir(dataParamsEmail)
        
           /// Get Dataset para uma variavel;
            var parametros = new java.util.HashMap();

            parametros.put("ASSUNTO", dataParamsEmail.assunto);
            parametros.put("USUARIO", dataParamsEmail.usuario);
            parametros.put("TITULO_SOLICITACAO", dataParamsEmail.titulo_solicitacao);
            parametros.put("ATENDENTE", dataParamsEmail.atendente);
            parametros.put("SOLICITACAO", dataParamsEmail.num_solicitacao);



            var destinatarios = new java.util.ArrayList();
            var email = "soaresgui.dev@gmail.com";
            destinatarios.add(email);

            notifier.notify(getValue("WKUser"), "template_email_engpac", parametros, destinatarios, "text/html");
        } catch(e) {
            log.info("dentro do catch");
            log.info(e);
        }
        log.info("fim do try-catch");
        
        log.info('## SIMPLES');

		var obj = new com.fluig.foundation.mail.service.EMailServiceBean();
		 
		for (var i in destinatario){
	        obj.simpleEmail(1 , 'ENGPAC - G5', "fluig", destinatario[i], '', "text/html");
		}
            
    }
    if (activity == 79) {
        log.info("inicio task 79");

        log.info("inicio do try-catch");
        try {
            log.info("dentro do try");

            var dataParamsEmail = {
                usuario             : getValue("WKUser"),
                assunto             : "CANCELAMENTO - FASE APROV. DIRETORIA",
                titulo_solicitacao  : hAPI.getCardValue("titulo_solicitacao"),
                atendente           : "Diretoria",
                num_solicitacao     : hAPI.getCardValue("numero_solicitacao")
            }    

            log.info("DADOS EMAILS")
            log.dir(dataParamsEmail)
        
           /// Get Dataset para uma variavel;
            var parametros = new java.util.HashMap();

            parametros.put("ASSUNTO", dataParamsEmail.assunto);
            parametros.put("USUARIO", dataParamsEmail.usuario);
            parametros.put("TITULO_SOLICITACAO", dataParamsEmail.titulo_solicitacao);
            parametros.put("ATENDENTE", dataParamsEmail.atendente);
            parametros.put("SOLICITACAO", dataParamsEmail.num_solicitacao);


            var destinatarios = new java.util.ArrayList();
            var email = "soaresgui.dev@gmail.com";
            destinatarios.add(email);

            notifier.notify(getValue("WKUser"), "template_email_engpac", parametros, destinatarios, "text/html");
        } catch(e) {
            log.info("dentro do catch");
            log.info(e);
        }
        log.info("fim do try-catch");
        
        log.info('## SIMPLES');

		var obj = new com.fluig.foundation.mail.service.EMailServiceBean();
		 
		for (var i in destinatario){
	        obj.simpleEmail(1 , 'ENGPAC - G5', "fluig", destinatario[i], '', "text/html");
		}
            
    }
    if (activity == 119) {
        log.info("inicio task 119");

        log.info("inicio do try-catch");
        try {
            log.info("dentro do try");

            var dataParamsEmail = {
                usuario             : getValue("WKUser"),
                assunto             : "PAGAMENTO REALIZADO - FASE ENVIAR COMPROVANTE",
                titulo_solicitacao  : hAPI.getCardValue("titulo_solicitacao"),
                atendente           : "Departamento Financeiro",
                num_solicitacao     : hAPI.getCardValue("numero_solicitacao")
            }    

            log.info("DADOS EMAILS")
            log.dir(dataParamsEmail)
        
           /// Get Dataset para uma variavel;
            var parametros = new java.util.HashMap();

            parametros.put("ASSUNTO", dataParamsEmail.assunto);
            parametros.put("USUARIO", dataParamsEmail.usuario);
            parametros.put("TITULO_SOLICITACAO", dataParamsEmail.titulo_solicitacao);
            parametros.put("ATENDENTE", dataParamsEmail.atendente);
            parametros.put("SOLICITACAO", dataParamsEmail.num_solicitacao);


            var destinatarios = new java.util.ArrayList();
            var email = "soaresgui.dev@gmail.com";
            destinatarios.add(email);

            notifier.notify(getValue("WKUser"), "template_email_engpac", parametros, destinatarios, "text/html");
        } catch(e) {
            log.info("dentro do catch");
            log.info(e);
        }
        log.info("fim do try-catch");
        
        log.info('## SIMPLES');

		var obj = new com.fluig.foundation.mail.service.EMailServiceBean();
		 
		for (var i in destinatario){
	        obj.simpleEmail(1 , 'ENGPAC - G5', "fluig", destinatario[i], '', "text/html");
		}
            
    }
    if (activity == 287) {
        log.info("inicio task 287");

        log.info("inicio do try-catch");
        try {
            log.info("dentro do try");

            var dataParamsEmail = {
                usuario             : getValue("WKUser"),
                assunto             : "CANCELAMENTO - QUALQUER FASE DO FINANCEIRO",
                titulo_solicitacao  : hAPI.getCardValue("titulo_solicitacao"),
                num_solicitacao     : hAPI.getCardValue("numero_solicitacao")
            }    

            log.info("DADOS EMAILS")
            log.dir(dataParamsEmail)
        
           /// Get Dataset para uma variavel;
            var parametros = new java.util.HashMap();  
            
            parametros.put("ASSUNTO", dataParamsEmail.assunto);
            parametros.put("USUARIO", dataParamsEmail.usuario);
            parametros.put("TITULO_SOLICITACAO", dataParamsEmail.titulo_solicitacao);
            parametros.put("ATENDENTE", dataParamsEmail.atendente);
            parametros.put("SOLICITACAO", dataParamsEmail.num_solicitacao);

            var destinatarios = new java.util.ArrayList();
            var email = "soaresgui.dev@gmail.com";
            destinatarios.add(email);

            notifier.notify(getValue("WKUser"), "template_email_engpac", parametros, destinatarios, "text/html");
        } catch(e) {
            log.info("dentro do catch");
            log.info(e);
        }
        log.info("fim do try-catch");
        
        log.info('## SIMPLES');

		var obj = new com.fluig.foundation.mail.service.EMailServiceBean();
		 
		for (var i in destinatario){
	        obj.simpleEmail(1 , 'ENGPAC - G5', "fluig", destinatario[i], '', "text/html");
		}
            
    }
}

function horaAtual(){
    var data = new Date()
    var dia = data.getDate() < 10 ? "0"+data.getDate() : data.getDate()
    var mes = data.getMonth() < 10 ? "0"+(data.getMonth() + 1) : (data.getMonth() + 1)
    var ano = data.getFullYear() < 10 ? "0"+data.getFullYear() : data.getFullYear()
    var hora = data.getHours() < 10 ? "0"+data.getHours() : data.getHours()
    var minutos = data.getMinutes() < 10 ? "0"+data.getMinutes() : data.getMinutes()

    data = dia+'/'+mes+'/'+ano+" "+hora+":"+minutos

    return data
}

function getAtribuicoes(atribuicao) {
    var constraintAtribuicao = DatasetFactory.createConstraint("ID_ATV", atribuicao, atribuicao, ConstraintType.MUST)
    var dtsAtribuicoes = DatasetFactory.getDataset("dts_consultaCadastroAtribuicoes", null, [constraintAtribuicao], null)
    if (dtsAtribuicoes.rowsCount > 0) {
        return dtsAtribuicoes.getValue(0, "hd_cod_user_atv")
    } else {
        return ""
    }
}



















