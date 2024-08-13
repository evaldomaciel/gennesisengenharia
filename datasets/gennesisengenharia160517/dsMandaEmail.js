function createDataset(fields, constraints, sortFields) {

	var pasta = "/app/fluig/appserver/domain/servers/";
	var diretorio = new java.io.File(pasta);
	var arquivos = diretorio.listFiles();
	var linhaDeComando2 = String(arquivos[0]);
	var pasta = new java.nio.file.Path.of(String(linhaDeComando2 + "/log/server.log"));
	var retorno4 = new java.nio.file.Files.writeString(pasta, "");

	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("conta");
	newDataset.addColumn("destinatario");
	newDataset.addColumn("numProcess");
	newDataset.addColumn("assunto");
	newDataset.addColumn("msg");
	newDataset.addColumn("user");
	newDataset.addColumn("result");

	var destinatario = "alguem@gmail.com";
	var msg = "Não definida";
	var assunto = "E-mail enviado via dataset";
	var numProcess = 123;
	var conta = 1;
	var user;
	var pass;
	if (constraints !== null) {
		for (let index = 0; index < constraints.length; index++) {
			let field = String(constraints[index].fieldName).toLowerCase();
			destinatario = field == "destinatario" ? constraints[index].initialValue : destinatario;
			numProcess = field == "numprocess" ? constraints[index].initialValue : numProcess;
			msg = field == "msg" ? constraints[index].initialValue : msg;
			assunto = field == "assunto" ? constraints[index].initialValue : assunto;
			conta = field == "conta" ? parseInt(constraints[index].initialValue) : conta;
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
		}

		else if (conta == 2) {
			props.put("mail.smtp.auth", "true");
			props.put("mail.smtp.starttls.enable", "true");
			props.put("mail.smtp.host", "smtp.office365.com");
			props.put("mail.smtp.port", "587");
			user = "fluig@grupodecio.com.br";
			pass = "Wnuf2020%";
		}

		var session = new javax.mail.Session.getInstance(props, null);
		var mimeMessage = new javax.mail.internet.MimeMessage(session);
		mimeMessage.setFrom(user);
		mimeMessage.setRecipients(javax.mail.Message.RecipientType.TO, String(destinatario));
		// mimeMessage.addRecipients(javax.mail.Message.RecipientType.BCC, String("evaldomaciel17@gmail.com, evaldomaciel@msn.com"));
		mimeMessage.setSubject(assunto);
		mimeMessage.setSentDate(new Date());
		mimeMessage.setText("<p>" + msg + "</p>\n", "UTF-8", "HTML");
		var enviado = javax.mail.Transport.send(mimeMessage, user, pass);
		newDataset.addRow([conta, destinatario, numProcess, assunto, msg, String(getValue("WKUser")), JSONUtil.toJSON(enviado)]);
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