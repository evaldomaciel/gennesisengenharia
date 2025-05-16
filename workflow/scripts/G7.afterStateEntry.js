function afterStateEntry(sequenceId) {
    if (sequenceId == 16) {
        try {
            var assunto = hAPI.getCardValue("processo_origem") + " - " + hAPI.getCardValue("solicitacao_origem") + " - Comprovante de Pagamento";

            // Coleta e-mail
            if (hAPI.getCardValue('processo_origem') == "G5") {
                var ds_G5 = DatasetFactory.getDataset('ds_G5',
                    new Array('email_solicitante', 'copia_email_solicitante'),
                    new Array(
                        DatasetFactory.createConstraint('sqlLimit', '1', '1', ConstraintType.MUST),
                        DatasetFactory.createConstraint('numero_solicitacao', hAPI.getCardValue("solicitacao_origem"), hAPI.getCardValue("solicitacao_origem"), ConstraintType.MUST)
                    ),
                    null
                );

                if (ds_G5 && ds_G5.rowsCount > 0) {
                    hAPI.setCardValue('email_solicitante', ds_G5.getValue(0, 'email_solicitante'));
                    hAPI.setCardValue('copia_email_solicitante', ds_G5.getValue(0, 'copia_email_solicitante'));
                }
            } else if (hAPI.getCardValue('processo_origem') == "G3") {
                var ds_G3 = DatasetFactory.getDataset('DSG3',
                    new Array('nomeComprador'),
                    new Array(
                        DatasetFactory.createConstraint('sqlLimit', '1', '1', ConstraintType.MUST),
                        DatasetFactory.createConstraint('IdentificadorFluig', hAPI.getCardValue("solicitacao_origem"), hAPI.getCardValue("solicitacao_origem"), ConstraintType.MUST)
                    ),
                    null
                );

                if (ds_G3 && ds_G3.rowsCount > 0) {
                    // Coleta Email por nome do comprador
                    hAPI.setCardValue('nomeComprador', ds_G3.getValue(0, 'nomeComprador'));
                    var userEmail = hAPI.getCardValue("nomeComprador");
                    var c1 = DatasetFactory.createConstraint('login', userEmail, userEmail, ConstraintType.MUST);
                    var dataset = DatasetFactory.getDataset("colleague", null, [c1], null);
                    hAPI.setCardValue("email_solicitante", dataset.getValue(0, "mail"));
                }
            }

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
                var data = {
                    companyId: String(getValue("WKCompany")),
                    serviceCode: 'api-fluig',
                    endpoint: "/api/public/2.0/documents/getDownloadURL/"+documentId,
                    method: 'GET',
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
                log.info("Email enviado com sucesso!");
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
