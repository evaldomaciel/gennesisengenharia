function createDataset(fields, constraints, sortFields) {
    var newDataset = DatasetBuilder.newDataset();
    newDataset.addColumn("conta");
    newDataset.addColumn("destinatario");
    newDataset.addColumn("numProcess");
    newDataset.addColumn("assunto");
    newDataset.addColumn("msg");
    newDataset.addColumn("user");
    newDataset.addColumn("base64Anexo");
    newDataset.addColumn("base64AnexoNome");
    newDataset.addColumn("result");

    var destinatario = "alguem@gmail.com";
    var msg = "Não definida";
    var assunto = "E-mail enviado via dataset";
    var numProcess = 123;
    var conta = 1;
    var user;
    var pass;
    var base64Anexo;
    var base64AnexoNome;
    if (constraints !== null) {
        for (let index = 0; index < constraints.length; index++) {
            let field = String(constraints[index].fieldName).toLowerCase();
            destinatario = field == "destinatario" ? constraints[index].initialValue : destinatario;
            numProcess = field == "numprocess" ? constraints[index].initialValue : numProcess;
            msg = field == "msg" ? constraints[index].initialValue : msg;
            assunto = field == "assunto" ? constraints[index].initialValue : assunto;
            conta = field == "conta" ? parseInt(constraints[index].initialValue) : conta;
            base64Anexo = field == "base64anexo" ? constraints[index].initialValue : base64Anexo;
            base64AnexoNome = field == "base64anexonome" ? constraints[index].initialValue : base64AnexoNome;
        }
    }

    try {
        var props = new java.util.Properties();
        if (conta == 1) {
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.host", "smtp.office365.com");
            props.put("mail.smtp.port", "587");
            user = "fluig2@grupodecio.com.br";
            pass = "Wnuf2020%";
        } else if (conta == 2) {
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.host", "smtp.office365.com");
            props.put("mail.smtp.port", "587");
            user = "fluig@grupodecio.com.br";
            pass = "Wnuf2020%";
        }

        var session = javax.mail.Session.getInstance(props, null);
        var mimeMessage = new javax.mail.internet.MimeMessage(session);
        mimeMessage.setFrom(user);
        mimeMessage.setRecipients(javax.mail.Message.RecipientType.TO, String(destinatario));
        mimeMessage.setSubject(assunto);
        mimeMessage.setSentDate(new Date());

        // Criando o corpo do e-mail
        var bodyPart = new javax.mail.internet.MimeBodyPart();
        bodyPart.setText("<p>" + msg + "</p>\n", "UTF-8", "HTML");

        // Juntando as partes no e-mail
        var multipart = new javax.mail.internet.MimeMultipart();
        multipart.addBodyPart(bodyPart);
        if (base64Anexo) {
            // Criando a parte do anexo, se tiver anexo
            var attachmentPart = new javax.mail.internet.MimeBodyPart();
            var decodedBytes = java.util.Base64.getDecoder().decode(base64Anexo);
            var dataSource = new javax.mail.util.ByteArrayDataSource(decodedBytes, "application/octet-stream");
            attachmentPart.setDataHandler(new javax.activation.DataHandler(dataSource));
            attachmentPart.setFileName(base64AnexoNome);  // Defina o nome do arquivo
            multipart.addBodyPart(attachmentPart);
        }
        mimeMessage.setContent(multipart);

        // Enviando o e-mail
        javax.mail.Transport.send(mimeMessage, user, pass);
        newDataset.addRow([conta, destinatario, numProcess, assunto, msg, String(getValue("WKUser")), base64Anexo, base64AnexoNome, "Enviado com sucesso"]);
    } catch (e) {
        log.error("Deu erro no envio de e-mail");
        log.error(e);
        newDataset = DatasetBuilder.newDataset();
        newDataset.addColumn("ERROR");
        newDataset.addColumn("LINHA");
        newDataset.addRow([String(e), e.lineNumber]);
    }
    return newDataset;
}