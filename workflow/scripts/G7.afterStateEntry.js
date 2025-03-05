function afterStateEntry(sequenceId) {
    if (sequenceId == 16) {
        try {
            var assunto = hAPI.getCardValue("processo_origem") + " - " + hAPI.getCardValue("solicitacao_origem") + " - Comprovante de Pagamento";

            var destinatarios = new Array();
            if (hAPI.getCardValue("email_solicitante") != "" && hAPI.getCardValue("email_solicitante") != null) destinatarios.push(hAPI.getCardValue("email_solicitante"));
            if (hAPI.getCardValue("copia_email_solicitante") != "" && hAPI.getCardValue("copia_email_solicitante") != null) destinatarios.push(hAPI.getCardValue("copia_email_solicitante"));

            log.dir(destinatarios);
            log.info('o e-mail == ' + destinatarios);

            // Recuperando os anexos
            var anexos = hAPI.listAttachments();
            var anexo = anexos.get(0);
            var documentId = anexo.getDocumentId();

            // Coletar o link de download do PDF
            try {
                var clientService = fluigAPI.getAuthorizeClientService();
                var url = documentId;
                var data = {
                    companyId: getValue('WKCompany') + '',
                    serviceCode: 'downloadDocument',
                    endpoint: encodeURI(url),
                    method: 'get',
                    options: {
                        encoding: 'UTF-8',
                        mediaType: 'application/json'
                    }
                };

                var response = clientService.invoke(JSON.stringify(data));
                var result = response.getResult();
                var jsonResponse = JSON.parse(result);
                log.info("Resposta da API: " + JSON.stringify(jsonResponse));

                // Verifica o status da resposta
                if (jsonResponse.success != false) {
                    // Coleta o PDF
                    var PDF = jsonResponse.content;
                    log.info("Conteúdo: " + PDF);
                } else {
                    log.error("Erro na requisição: " + jsonResponse);
                }
            } catch (e) {
                log.error("Erro ao fazer a requisição GET: " + e);
            }

            var msg = '';
            msg += '<html>'
            msg += '	<body>'
            msg += '	<h2> Olá, ' + getColleagueName(getValue("WKUser")) + '</h2>';
            msg += '	<p> Segue o comprovante de pagamento realizado no processo <b>' + hAPI.getCardValue("processo_origem") + '</b>, solicitação <a href="https://gennesisengenharia160517.fluig.cloudtotvs.com.br:1650/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + hAPI.getCardValue("solicitacao_origem") + '"><b>' + hAPI.getCardValue("solicitacao_origem") + '</b></a>:</p>';
            msg += '	<a href="' + PDF + '" download>Vizualizar PDF</a>';
            msg += '	</body>'
            msg += '</html>'

            var obj = new com.fluig.foundation.mail.service.EMailServiceBean();

            for (var x = 0; x < destinatarios.length; x++) {
                obj.simpleEmail(1, assunto, "suportefluig@engpac.com.br", destinatarios[x], msg, "text/html");
            }
        } catch (err) {
            log.error(err);
            throw (err);
        }
    }
}

function getColleagueName(user) {
    var const1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
    var datasetAttachment = DatasetFactory.getDataset("colleague", null, [const1], null);
    if (datasetAttachment.rowsCount > 0) return datasetAttachment.getValue(0, "colleagueName");
    return user;
}
