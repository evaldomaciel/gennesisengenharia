function onNotify(subject, receivers, template, params) {
  var numProcess = params.get("WDK_TaskNumber");
	log.info("onNotify G5: " + String(template));
	log.info("taskAtual: " + hAPI.getCardValue("hidden_task_atual") + " WDK_TaskNumber: " + numProcess);

	if (template.equals("TPLPROCESS_CANCELED") != null) {
		// var emailDest = hAPI.getCardValue("email_solicitante");
		var emailDest = "soaresgui.dev@gmail.com"; 
    
		/** Aqui vamos mandar e-mail pelo dataset, através de outra conta */
		var assunto = "CANCELAMENTO DA SOLICITAÇÃO - G5";
		var msg = '';
		msg += '<html>'
		msg += '	<head>'
		msg += '		<meta>'
		msg += '		<meta>'
		msg += '		<meta>'
		msg += '	</head>'
		msg += '	<body>'
		msg += '	<h2> Olá, ' + hAPI.getCardValue("solicitante") + '</h2>';
		msg += '	<p> Informamos que a solicitação' + hAPI.getCardValue("titulo_solicitacao")
		msg += '	    foi cancelada pelo departamento financeiro pelos seguintes motivos: [motivo do cancelamento]. </p>'
		msg += '	</body>'
		msg += '</html>'

		if (emailDest) {
			receivers.add(emailDest);
			mandaEmail(emailDest, assunto, msg, numProcess);
		}
	}
}

function mandaEmail(destinatario, assunto, msg, numProcess) {
	
	var datasetDsMandaEmail2 = DatasetFactory.getDataset('dsMandaEmail', null, new Array(
		DatasetFactory.createConstraint('destinatario', 'agcoimbra@gmail.com', '', ConstraintType.MUST),
		DatasetFactory.createConstraint('assunto', assunto, '', ConstraintType.MUST),
		DatasetFactory.createConstraint('msg', msg, '', ConstraintType.MUST),
		DatasetFactory.createConstraint('numProcess', numProcess, '', ConstraintType.MUST),
		DatasetFactory.createConstraint('conta', '1', '', ConstraintType.MUST)
	), null);

	var datasetDsMandaEmail = DatasetFactory.getDataset('dsMandaEmail', null, new Array(
		DatasetFactory.createConstraint('destinatario', destinatario, '', ConstraintType.MUST),
		DatasetFactory.createConstraint('assunto', assunto, '', ConstraintType.MUST),
		DatasetFactory.createConstraint('msg', msg, '', ConstraintType.MUST),
		DatasetFactory.createConstraint('numProcess', numProcess, '', ConstraintType.MUST),
		DatasetFactory.createConstraint('conta', '1', '', ConstraintType.MUST)
	), null);
	return datasetDsMandaEmail;
}
