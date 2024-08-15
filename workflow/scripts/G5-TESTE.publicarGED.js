/**
 * Publica os anexos processo na pasta de destino definida
 * @param {String|Number} pastaDeDestino código da pasta de destino 
 * @returns lista de anexos publicados
 */
function publicarGED(pastaDeDestino) {
	var docsField = [];
	try {
		var workflowAttachments = hAPI.listAttachments();
		for (var i = 0; i < workflowAttachments.size(); i++) {
			var docDto = workflowAttachments.get(i);
			/** Se o tipo do documento for diferente de 5 (formulário do fluig) */
			if (docDto.getDocumentType() != 5) {
				var attachments = getAttachments(docDto);
				log.dir({
					"docDto.getDocumentType()": docDto.getDocumentType(),
					"docDto.getDocumentId()": docDto.getDocumentId(),
				});
				docAPI.copyDocumentToUploadArea(docDto.getDocumentId(), docDto.getVersion());
				docDto.setParentDocumentId(pastaDeDestino);
				docDto.setInheritSecurity(true);
				docDto.setKeyWord('');
				docDto.setVersionDescription('Anexado via processo');
				docDto.setActiveVersion(true);
				docDto.setColleagueId(getValue("WKUser")); // Informar o usuário logado.
				docDto.setPublisherId(getValue("WKUser")); // Informar o publicador.
				var doc = docAPI.createDocument(docDto, attachments, null, null, null);
				docsField.push(doc.getDocumentId());
			}
		}
		return docsField;
	}
	catch (e) {
		log.dir({ "message": e.message, "lineNumber": e.lineNumber });
		throw "Erro ao publicar o documento, por favor, contate o administrador.<br/><br/> " + e;
	}
}

/**
 * Obtém os detalhes dos anexos de acordo com o ID do documento informado
 * @param {String|Number} docDto código do documento 
 * @returns array de informações sobre o documento solicitado
 */
function getAttachments(docDto) {
	var attachmentArray = new java.util.ArrayList();
	var attachment = docAPI.newAttachment();
	attachment.setFileName(docDto.getPhisicalFile());
	attachment.setPrincipal(true);
	attachment.setAttach(false);
	attachmentArray.add(attachment);
	return attachmentArray;
}

/**
 * Cria uma nova pasta no GED
 * @param {Number} pastaPai número da pasta pai 
 * @param {String} nome nome para a pasta
 * @returns {String} o ID da pasta criada
 */
function criaPasta(pastaPai, nome) {
	try {
		var dto = docAPI.newDocumentDto();
		dto.setDocumentDescription(nome);
		dto.setDocumentType("1");
		dto.setParentDocumentId(pastaPai);
		dto.setDocumentTypeId("");

		var folder = docAPI.createFolder(dto, null, null);
		log.info("PASTA CRIADA COM O ID :" + folder.getDocumentId());
		return parseInt(folder.getDocumentId());
	} catch (error) {
		throw new Error("Não foi possível criar a pasta! " + String(error));
	}
}

function getConstante(param) {
	var aConstraint = [];
	aConstraint.push(DatasetFactory.createConstraint('id', param, param, ConstraintType.MUST));
	var oConstantes = DatasetFactory.getDataset('ds_Constantes', null, null, null);
	for (var i = 0; i < oConstantes.rowsCount; i++) {
		if (oConstantes.getValue(i, "id").trim() == param.trim()) {
			return oConstantes.getValue(i, "Valor").trim();
		}
	}
	return '0';
}