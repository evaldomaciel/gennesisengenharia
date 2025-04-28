function servicetask41(attempt, message) {
	try {
		if (hAPI.getCardValue('solicitacao_origem') == 0) {
			hAPI.setCardValue('solicitacao_origem', "");
		}

		var cancSolDuplicada = cancelaSolAberta();
		var gerPDF = geraPdf();

		var G3 = getG3(hAPI.getCardValue('id_movimento'))
		if (G3 && G3.rowsCount > 0) {
			hAPI.setCardValue('solicitacao_origem', G3.getValue(0, 'IdentificadorFluig'));
			hAPI.setCardValue('processo_origem', 'G3');
			return true;
		}

		var G5 = getG5(hAPI.getCardValue('id_titulo'))
		if (G5 && G5.rowsCount > 0) {
			hAPI.setCardValue('solicitacao_origem', G5.getValue(0, 'numero_solicitacao'));
			hAPI.setCardValue('processo_origem', 'G5');
			return true;
		}

	}
	catch (error) {
		throw error;
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

function geraPdf() {
	try {
		// Gerar e anexar PDF
		// Coletar hora atual
		var data = new Date();
		var horas = ("0" + data.getHours()).slice(-2);
		var minutos = ("0" + data.getMinutes()).slice(-2);
		var horaFormatada = horas + ":" + minutos;

		var valor_titulo = parseFloat((hAPI.getCardValue("valor_titulo").replace(',', '.')));
		var valor_original = parseFloat((hAPI.getCardValue("valor_original").replace(',', '.')));
		var acre_desc = (valor_titulo - valor_original);

		var codigo_autenticacao = "";

		if (hAPI.getCardValue("codigo_autenticacao") != "") {
			codigo_autenticacao =
				"<tr>" +
				"<td style='border-color: white;'><b>Autenticação:</b> " + hAPI.getCardValue("codigo_autenticacao") + "</td>" +
				"</tr>";
		}

		var conteudoHTML =
			"<!DOCTYPE html>" +
			"<html lang='pt-br'>" +
			"<head>" +
			"    <meta charset='UTF-8'/>" +
			"    <title>Comprovante</title>" +
			"    <style>" +
			"        h2 { text-align: center; font-weight: bold; }" +
			"        .linha { margin-bottom: 10px; margin-left: 50px; font-size: 18px; }" +
			"        .titulo { font-weight: bold; margin-top: 20px; margin-bottom: 20px; font-size: 18px; }" +
			"    </style>" +
			"</head>" +
			"<body>" +
			"    <div align='center' width='690'>" +
			"        <h2>COMPROVANTE</h2>" +
			"        <p class='titulo'>Dados do pagador</p>" +
			"        <p class='linha'>Nome do pagador: <b> " + hAPI.getCardValue("id_fornecedor") + " </b></p>" +
			"        <p class='linha'>CPF/CNPJ do pagador: <b>123.456.789-10</b></p>" +
			"        <p class='linha'>Agência/Conta: <b>12356-7</b></p>" +
			"        <p class='titulo'>Dados do recebedor</p>" +
			"        <p class='linha'>Nome do recebedor: <b>Teste</b></p>" +
			"        <p class='linha'>Chave: <b>123.456.789-10</b></p>" +
			"        <p class='linha'>CPF/CNPJ do recebedor: <b>123.456.789-10</b></p>" +
			"        <p class='linha'>Instituição: <b>Itau</b></p>" +
			"        <p class='titulo'>Dados da transação</p>" +
			"        <p class='linha'>Valor: <b>" + valor_titulo.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') + "</b></p>" +
			"        <p class='linha'>Data da transferência: <b>" + hAPI.getCardValue("data_pagamento").substring(0, 10) + "</b></p>" +
			"        <p class='linha'>Tipo de pagamento: <b>" + hAPI.getCardValue("forma_de_pagamento") + "</b></p>" +
			"    </div>" +
			"</body>" +
			"</html>";

		// Nome do arquivo que será salvo no servidor
		var nomeArquivo = "comprovante_pagamento" + hAPI.getCardValue("id_titulo") + ".pdf";

		// Importando as classes do iText
		var Document = Packages.com.itextpdf.text.Document;
		var PdfWriter = Packages.com.itextpdf.text.pdf.PdfWriter;
		var StringReader = Packages.java.io.StringReader;
		var XMLWorkerHelper = Packages.com.itextpdf.tool.xml.XMLWorkerHelper;

		// Criar documento PDF
		var document = new Document();
		var fileOutputStream = new java.io.FileOutputStream(nomeArquivo);
		var pdfWriter = PdfWriter.getInstance(document, fileOutputStream);

		// Abrindo o documento antes de adicionar o conteúdo
		document.open();

		// Convertendo HTML para PDF
		XMLWorkerHelper.getInstance().parseXHtml(
			pdfWriter,
			document,
			new StringReader(conteudoHTML)
		);

		document.close();
		fileOutputStream.close();


		// Transformar arquivo em bytes
		var file = new java.io.File(nomeArquivo);
		var is = new java.io.FileInputStream(file);
		var bytesBuffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 8192);
		var baos = new java.io.ByteArrayOutputStream();
		var len = 0;

		while ((len = is.read(bytesBuffer, 0, bytesBuffer.length)) != -1) {
			baos.write(bytesBuffer, 0, len);
		}

		var fileContents = baos.toByteArray();
		baos.close();

		log.info("PDF criado com sucesso em: " + nomeArquivo);

		// Salvar arquivo no GED
		var FOLDER_FORM_PDF = 64569; // ID da pasta onde salvará o PDF
		var serviceHelper = ServiceManager.getService("ECMDocumentService").getBean();
		var service = serviceHelper
			.instantiate("com.totvs.technology.ecm.dm.ws.ECMDocumentServiceService")
			.getDocumentServicePort();

		if (service == null) {
			log.error("Erro ao carregar ECMDocumentService");
			throw "Erro ao gerar PDF do formulário";
		}

		var attachment = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.Attachment");
		attachment.setFileName(nomeArquivo);
		attachment.setFileSize(1);
		attachment.setAttach(true);
		attachment.setEditing(false);
		attachment.setPrincipal(true);
		attachment.setFilecontent(fileContents);

		var attachmentArray = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.AttachmentArray");
		attachmentArray.getItem().add(attachment);

		var user = getConstante('fluig_usuario');
		var pass = getConstante('fluig_senha');

		var result = service.createSimpleDocument(
			user, // Login do usuário
			pass, // Senha do usuário
			1,
			FOLDER_FORM_PDF,
			"admin",
			nomeArquivo,
			attachmentArray
		);

		// Anexar arquivo
		hAPI.attachDocument(result.getItem().get(0).getDocumentId());
		return result.getItem().get(0).getDocumentId();
	} catch (err) {
		log.error(err);
		throw "Erro ao gerar PDF do formulário: " + err;
	}
}

function cancelaSolAberta() {
	try {

		/** Cancela solicitações abertas anteriormente */
		function cancelaSol(cardDocumentId) {
			log.info('Documento  ' + cardDocumentId)
			var colunasWorkflowProcess = new Array('workflowProcessPK.processInstanceId');
			var datasetWorkflowProcess = DatasetFactory.getDataset('workflowProcess', colunasWorkflowProcess, new Array(
				DatasetFactory.createConstraint('cardDocumentId', cardDocumentId, cardDocumentId, ConstraintType.MUST),
				DatasetFactory.createConstraint('status', 0, 0, ConstraintType.MUST)
			), null);

			if (datasetWorkflowProcess.rowsCount > 0) {
				log.info('Vamos cancelar a solicitação ' + datasetWorkflowProcess.getValue(0, 'workflowProcessPK.processInstanceId'))
				return DatasetFactory.getDataset('dsCancelaSolicitacoes', null, new Array(
					DatasetFactory.createConstraint('processInstanceId', datasetWorkflowProcess.getValue(0, 'workflowProcessPK.processInstanceId'), datasetWorkflowProcess.getValue(0, 'workflowProcessPK.processInstanceId'), ConstraintType.MUST)
				), null);
			}
			log.info('Documento  ' + cardDocumentId + " não tinha uma solicitação vinculada para cancelar!")
			return false;

		}

		var id_titulo = hAPI.getCardValue('id_titulo');
		var processInstanceId = getValue('WKNumProces')

		var constraintDs_G71 = DatasetFactory.createConstraint('id_titulo', id_titulo, id_titulo, ConstraintType.MUST);
		var constraintDs_G72 = DatasetFactory.createConstraint('processInstanceId', processInstanceId, processInstanceId, ConstraintType.MUST_NOT);
		var datasetDs_G7 = DatasetFactory.getDataset('ds_G7', null, new Array(constraintDs_G71, constraintDs_G72), null);

		for (var indexG7 = 0; indexG7 < datasetDs_G7.rowsCount; indexG7++) {
			log.info(datasetDs_G7.getValue(indexG7, 'documentid'))
			var cancelou = cancelaSol(datasetDs_G7.getValue(indexG7, 'documentid'))
			log.dir(cancelou);
		}

		return true;
	}
	catch (e) {
		if (e == null) e = "Erro desconhecido!";
		var mensagemErro = "Ocorreu um erro ao salvar dados no RM: " + String(e) + ". Linha: " + String(e.lineNumber);
		throw mensagemErro;
	}
}

function atualizaLan() {
	/** Atualiza o registro no RM */
	var user = getConstante('rm_usuario')
	var pass = getConstante('rm_senha')
	var idLan = hAPI.getCardValue('id_titulo');
	var codColigada = hAPI.getCardValue('cod_coligada');
	var context = String("CODSISTEMA=G;CODCOLIGADA=" + codColigada + ";CODUSUARIO=" + user);
	var primaryKey = String(codColigada + ";" + idLan);
	var authService = getWebService(user, pass, 'RMWsDataServer', 'com.totvs.WsDataServer', 'com.totvs.IwsDataServer');

	var text = new String(authService.readRecord("FinLanDataBR", primaryKey, context));

	log.info(text);

	if (String(text).indexOf("FLAN") > 0) {
		text = formatStringToXML(text);

		var solicitacao_origem = getNodeValue(text, "IDFLUIG");

		hAPI.setCardValue("solicitacao_origem", solicitacao_origem);
		hAPI.setCardValue("id_fornecedor", getNodeValue(text, "CODCFO"));
		hAPI.setCardValue("data_vencimento", getNodeValue(text, "DATAVENCIMENTO"));
		hAPI.setCardValue("data_pagamento", new Date());
		hAPI.setCardValue("valor_titulo", getNodeValue(text, "VALOR"));
		hAPI.setCardValue("codigo_autenticacao", getNodeValue(text, "CODCFO"));
		hAPI.setCardValue("valor_original", getNodeValue(text, "VALORORIGINAL"));

		// Precisa mesmo salvar???

		// text = removeNode(text, "FLAN");
		// text = removeNode(text, "FLANRATCCU");
		// text = removeNode(text, "FLANCOMPL");
		// text = removeNode(text, "_x0024_IMAGES");

		// var FLAN = "<FLAN>";
		// FLAN += "	<CODCOLIGADA>" + codColigada + "</CODCOLIGADA>";
		// FLAN += "	<IDLAN>" + idLan + "</IDLAN>";
		// FLAN += "</FLAN>";
		// FLAN += "<FLANCOMPL>";
		// FLAN += "	<CODCOLIGADA>" + codColigada + "</CODCOLIGADA>";
		// FLAN += "	<IDLAN>" + idLan + "</IDLAN>";
		// FLAN += "	<IDFLUIG>" + getValue('WKNumProces') + "</IDFLUIG>";
		// FLAN += "</FLANCOMPL>";

		// text = addItem(text, "</FinLAN>", FLAN);

		// text = new XML(text);
		// log.info("XML atualizado: " + text);

		// // // Está gerando 2 processos G7
		// var result = new String(authService.saveRecord("FinLanDataBR", text, context));
		// log.info("Result: " + result);
		// checkIsPK(result, 2);

		// log.info("Lançamento atualizado no RM");
	} else {
		throw "Não foi possível obter os dados do movimento: " + idLan + "!";
	}
}


function getG3(IdMov) {
	if (parseInt(IdMov) > 0) {
		var datasetDSG3 = DatasetFactory.getDataset('DSG3',
			new Array('IdMov', 'IdentificadorFluig', 'IdentificadorFluigAnexo', 'nomeComprador'),
			new Array(
				DatasetFactory.createConstraint('sqlLimit', '1', '1', ConstraintType.MUST),
				DatasetFactory.createConstraint('IdMov', IdMov, IdMov, ConstraintType.MUST)
			),
			new Array('IdentificadorFluig;desc')
		);
		if (datasetDSG3 && datasetDSG3.rowsCount > 0) return datasetDSG3;
	}
	return false;
}


function getG5(idLan) {
	if (parseInt(idLan) > 0) {
		var datasetDs_G5 = DatasetFactory.getDataset('ds_G5',
			new Array('idLan', 'numero_solicitacao', 'email_solicitante', 'copia_email_solicitante'),
			new Array(
				DatasetFactory.createConstraint('sqlLimit', '1', '1', ConstraintType.MUST),
				DatasetFactory.createConstraint('idLan', idLan, idLan, ConstraintType.MUST)
			),
			new Array('numero_solicitacao;desc')
		);
		if (datasetDs_G5 && datasetDs_G5.rowsCount > 0) return datasetDs_G5;
	}
	return false;
}