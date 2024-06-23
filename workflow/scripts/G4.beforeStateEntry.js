function beforeStateEntry(sequenceId) {
	try {
		var task = getValue("WKNumState");

		if (task == 14) {
			hAPI.setCardValue("processHistory", 14);
			validateAnexoProcess();
		} else if (sequenceId == 16) {
			if (hAPI.getCardValue("processHistory") == 14) {
				validateAnexoProcess2();
			} else {
				validateAnexoProcess();
			}
		} else if (sequenceId == 22) {
			if (hAPI.getCardValue("statusAprovacao") == 'Reprovado') {
				throw "Comprovante não aprovado, impossível de seguir com o fluxo."
			}
		} else if (sequenceId == 24) {
			if (hAPI.getCardValue("processHistory") == 14) {
				validateAnexoProcess3();
			} else {
				validateAnexoProcess2();
			}
			createFolderClifor();
		}

		if ([39, 53, 60, 74, 67].indexOf(sequenceId) != -1) {
			//var usuarioNotific = String( hAPI.getCardValue("cTask039Group") );
			//hAPI.setCardValue("encerraLoopNotifi", "false");
			//if ( usuarioNotific == "" ){
			//		usuarioNotific = getAtribuicao();
			//	}
			/*
			var usuarioNotific = getAtribuicao();

			if(usuarioNotific == ""){
				hAPI.setCardValue("encerraLoopNotifi", "true");
			}else{
				hAPI.setCardValue("encerraLoopNotifi", "false");
			}

			if (usuarioNotific.indexOf("Pool:Group:") != -1) {
				hAPI.setCardValue("cTask039Group", usuarioNotific)
			}else{
				hAPI.setCardValue("cTask039", usuarioNotific)
			}*/


			//usersNotification( usuarioNotific );
			var posicao = hAPI.getCardValue("txt_posicaoNotificacao")
			if (posicao == "") {
				posicao = 0
			} else {
				posicao = parseInt(posicao)
			}


			var indexes = hAPI.getChildrenIndexes("tabela_usrNotif");
		

			if (indexes.length > posicao) {
				hAPI.setCardValue("txt_posicaoNotificacao", posicao + 1)
			}else{
				hAPI.setCardValue("txt_posicaoNotificacao", "")
				hAPI.setCardValue("encerraLoopNotifi", "true");
			}


		}

	} catch (e) {
		throw "beforeStateEntry>" + e.toString();
	}

	//	throw "Teste de Erro!"
}

function validateAnexoProcess() {
	log.info("-----> validateAnexoProcess1");
	var total = hAPI.getChildrenIndexes("tabela_boleto").length <= 1 ? 1 : hAPI.getChildrenIndexes("tabela_boleto").length;
	log.info("------> total1 " + total);

	var attachments = hAPI.listAttachments();
	var qtdAnexados = attachments.size();

	if (qtdAnexados < total) {
		log.info("-----> validateAnexoProcess1");

		throw "Obrigatório anexar os arquivos correspondente aos itens marcado no checklist: Qtd exigida no checklist: " + total + " Qtd. Anexada: " + qtdAnexados;
	}
}

function validateAnexoProcess2() {
	log.info("-----> validateAnexoProcess2");
	var total = hAPI.getChildrenIndexes("tabela_comprovante").length <= 2 ? 2 : hAPI.getChildrenIndexes("tabela_comprovante").length;
	log.info("------> total2 " + total);
	var attachments = hAPI.listAttachments();
	var qtdAnexados = attachments.size();

	if (qtdAnexados < total) {
		log.info("-----> validateAnexoProcess2");
		throw "Obrigatório anexar os arquivos correspondente aos itens marcado no checklist: Qtd exigida no checklist: " + total + " Qtd. Anexada: " + qtdAnexados;
	}
}

function validateAnexoProcess3() {
	log.info("-----> validateAnexoProcess3");
	var total = hAPI.getChildrenIndexes("tabela_nota_fiscal").length <= 3 ? 3 : hAPI.getChildrenIndexes("tabela_nota_fiscal").length;
	log.info("------> total3 " + total);

	var attachments = hAPI.listAttachments();
	var qtdAnexados = attachments.size();

	if (qtdAnexados < total) {
		throw "Obrigatório anexar os arquivos correspondente aos itens marcado no checklist: Qtd exigida no checklist: " + total + " Qtd. Anexada: " + qtdAnexados;
	}
}


function createFolderClifor() {
	try {

		var codcoligada, idmov, numProces, descCodColigada;

		codcoligada = hAPI.getCardValue("codColigada");
		idmov = hAPI.getCardValue("IdMov");
		numProces = getValue("WKNumProces");

		if (codcoligada == '1') {
			descCodColigada = 'Gennesis'
		} else if (codcoligada == '2') {
			descCodColigada = 'EngPac'
		}


		if (numProces == "") {
			throw "Não é permitido criar pasta sem um número de documento";
		}

		folder = createFolderIfDoesNotExist(129, descCodColigada + '_OC_ID_' + idmov);

		//	  hAPI.setCardValue("pastaDoc", folder);
		publishDocuments(folder, numProces, idmov, codcoligada);


	} catch (e) {
		throw "createFolderClifor>" + e.toString();
	}
}

function createFolderIfDoesNotExist(parentId, folderDescription) {
	log.info("INICIO>createFolderIfDoesNotExist###############################################################")
	log.info("parentId >>> " + parentId);
	log.info("folderDescription >> " + folderDescription);
	try {
		var checkFolder = getfolder(parentId, folderDescription);
		log.info("checkFolder >> " + checkFolder);
		if (checkFolder != null) {
			return checkFolder;
		} else {
			var docDto = docAPI.newDocumentDto();
			docDto.setDocumentType(1);
			docDto.setParentDocumentId(parseInt(parentId));
			docDto.setDocumentDescription(folderDescription);
			newDocument = docAPI.createFolder(docDto, null, null);
			return newDocument.getDocumentId();
		}
	} catch (e) {
		throw "createFolderIfDoesNotExist>" + e;
	}
	log.info("FIM>createFolderIfDoesNotExist###############################################################")
}

function getfolder(searchFolderId, requestFolderName) {
	log.info("INICIO getfolder######################################################################################")
	log.info("getfolder>searchFolderId" + searchFolderId)
	log.info("getfolder>requestFolderName" + requestFolderName)
	try {
		var childs = getFolderChilds(searchFolderId);
		for (var j = 0; j < childs.length; j++) {
			if (childs[j]['description'] == requestFolderName)
				return childs[j]['id'];
		}
		log.info("FIM getfolder######################################################################################")
	} catch (e) {
		throw "getfolder>" + e.toString();
	}
	return null;
}

function getFolderChilds(folderId) {
	log.info("INICIO getFolderChilds#########################################################################################")
	log.info("getFolderChilds>folderId" + folderId)
	try {
		var childs = [];
		var fields = ['documentPK.documentId', 'documentDescription'];
		var constraints = [];
		var constraint = DatasetFactory.createConstraint('documentPK.companyId', getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);
		constraints.push(constraint);
		constraint = DatasetFactory.createConstraint('parentDocumentId', folderId, folderId, ConstraintType.MUST);
		constraints.push(constraint);
		constraint = DatasetFactory.createConstraint("userSecurityId", "admin", "admin", ConstraintType.MUST);
		constraints.push(constraint);
		constraint = DatasetFactory.createConstraint('activeVersion', true, true, ConstraintType.MUST);
		constraints.push(constraint);
		constraint = DatasetFactory.createConstraint('documentType', 1, 1, ConstraintType.MUST);
		constraints.push(constraint);
		var dataset = DatasetFactory.getDataset("document", fields, constraints, null);
		for (var i = 0; i < dataset.rowsCount; i++) {
			var id = dataset.getValue(i, 'documentPK.documentId');
			var description = dataset.getValue(i, 'documentDescription');
			var child = {
				'id': id,
				'description': description
			};
			childs.push(child);
		}
		log.info("getFolderChilds>childs" + childs)
		log.info("FIM getFolderChilds#########################################################################################")
	} catch (e) {
		throw "getFolderChilds" + e.toString();
	}
	return childs;
}


function existFolder(parentId, folderDescription) {
	try {
		var fields = new Array(parentId);
		var d = DatasetFactory.getDataset("ds-search-folder", fields, null, null);
		for (var i = 0; i < d.rowsCount; i++) {
			if (d.getValue(i, "DOCUMENT_DESCRIPTION") == folderDescription) {
				return d.getValue(i, "DOCUMENT_ID");
			}
		}
		return null;
	} catch (e) {
		throw "existFolder> " + e;
	}
}


function publishDocuments(folder, numProces, idmov, codcoligada) {
	log.info("INICIO publishDocuments#########################################################################################")
	log.info("parentId: " + folder);
	log.info("fluigid:  " + numProces);
	try {

		var workflowAttachments = hAPI.listAttachments();
		var dtsolicitacao = java.util.Calendar.getInstance().getTime();
		for (var i = 0; i < workflowAttachments.size(); i++) {
			var docDto = workflowAttachments.get(i);
			var attachments = getAttachments(docDto);
			var info = docDto.getDocumentDescription();
			docAPI.copyDocumentToUploadArea(docDto.getDocumentId(), docDto.getVersion());
			docDto.setPublisherId(getValue("WKUser"));
			docDto.setColleagueId(getValue("WKUser"));
			docDto.setDocumentId(0);
			docDto.setInheritSecurity(true);
			docDto.setParentDocumentId(folder);
			docDto.setAdditionalComments(codcoligada + '|' + idmov);
			docDto.setDocumentDescription(info + "_" + idmov);
			docDto.setVersionDescription("Solicita\u00E7\u00E3o: " + getValue("WKNumProces"));
			docAPI.createDocument(docDto, attachments, null, null, null);

		}
		log.info("FIM> publishDocuments#########################################################################################")
	} catch (e) {
		throw "publishDocuments>" + e;
	}
}

function getAttachments(docDto) {
	try {
		var attachmentArray = new java.util.ArrayList();
		var attachment = docAPI.newAttachment();
		attachment.setFileName(docDto.getPhisicalFile());
		attachment.setPrincipal(true);
		attachment.setAttach(false);
		attachmentArray.add(attachment);
		return attachmentArray;
	} catch (e) {
		throw "getAttachments>" + e;
	}
}

function getAtribuicao() {
	var codcoligada = hAPI.getCardValue("CodColigada");
	var filial = hAPI.getCardValue("filial").split(' - ')[0];

	var desc = "G4_NOTIFICA-" + codcoligada + "-" + filial
	var userNotify = "";

	var cst = [DatasetFactory.createConstraint("txt_iden_atividade", desc, desc, ConstraintType.MUST)]
	var dtsAtribuicao = DatasetFactory.getDataset("ds_consultaCadastroAtribuicoes", null, cst, null)

	if (dtsAtribuicao.rowsCount > 0) {
		var userNotify = String(dtsAtribuicao.getValue(0, "hd_cod_user_atv"));
	}

	return userNotify
}