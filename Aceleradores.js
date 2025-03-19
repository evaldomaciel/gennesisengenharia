
var lista = getDefaultValues();

var novoObj = new Array();
lista.forEach(element => {
	novoObj.push([
		element[0] + "-" + element[2], // id
		element[0], // setor
		element[2], // codigo
		element[1].split("-")[1], // descrição
		element[1], // filtro
	]);
});

console.log(novoObj)




$(":hidden").show()
$("script,style,title").hide()
$(".bootstrap-datetimepicker-widget").hide()



var datasetDsReadRecord = DatasetFactory.getDataset('dsReadRecord', null, new Array(
	DatasetFactory.createConstraint('dataServer', 'FinCxaDataBR', null, ConstraintType.MUST),
	DatasetFactory.createConstraint('primaryKey', '1;150379-1', null, ConstraintType.MUST),
	DatasetFactory.createConstraint('mainTag', 'FCxa', null, ConstraintType.MUST)
), null);

$('html, body').animate({ scrollTop: $('[name="CODCCUSTO"]').offset().top }, 1000);



function cancelaSol(cardDocumentId) {
	var colunasWorkflowProcess = new Array('workflowProcessPK.processInstanceId');
	var datasetWorkflowProcess = DatasetFactory.getDataset('workflowProcess', colunasWorkflowProcess, new Array(
		DatasetFactory.createConstraint('cardDocumentId', cardDocumentId, cardDocumentId, ConstraintType.MUST)
	), null);

	log.info('Vamos cancelar a solicitação ' + datasetWorkflowProcess.getValue(0, 'processInstanceId'))

	return DatasetFactory.getDataset('dsCancelaSolicitacoes', null, new Array(
		DatasetFactory.createConstraint('processInstanceId', datasetWorkflowProcess.getValue(0, 'processInstanceId'), datasetWorkflowProcess.getValue(0, 'processInstanceId'), ConstraintType.MUST)
	), null);
}

var id_titulo = 63;
var processInstanceId = 0

var constraintDs_G71 = DatasetFactory.createConstraint('id_titulo', id_titulo, id_titulo, ConstraintType.MUST);
var constraintDs_G72 = DatasetFactory.createConstraint('processInstanceId', processInstanceId, processInstanceId, ConstraintType.MUST_NOT);
var datasetDs_G7 = DatasetFactory.getDataset('ds_G7', null, new Array(constraintDs_G71, constraintDs_G72), null);

for (var index = 0; index < datasetDs_G7.values.length; index++) {
	const element = datasetDs_G7.values[index];
	console.log(element.documentid)
	// cancelaSol(element.documentid) 

}


metadata#id 64800
documentid 64774

47869


DatasetFactory.getDataset('dsCancelaSolicitacoes', null, new Array(
	DatasetFactory.createConstraint('filtro', 'CODCOLIGADA=3', 'CODCOLIGADA = 3 AND FTDO.INATIVO = 0 AND FTDO.PAGREC IN (2, 3)', ConstraintType.MUST)
), null);

function vamosOcultar(params) {
	var vamosOcultar = "";
	$("[name]").each((i, e) => {
		vamosOcultar += '\n form.setEnabled("' + $(e).attr('name') + '", false);'
	})
	return vamosOcultar
}

vamosOcultar()

var constraintProcessHistory1 = DatasetFactory.createConstraint('sqlLimit', '100', '100', ConstraintType.MUST);
var constraintProcessHistory2 = DatasetFactory.createConstraint('processHistoryPK.processInstanceId', '44128', '44128', ConstraintType.MUST);
var datasetProcessHistory = DatasetFactory.getDataset('processHistory', ['processHistoryPK.processInstanceId', 'processHistoryPK.movementSequence'], new Array(constraintProcessHistory1, constraintProcessHistory2), null);
datasetProcessHistory.values



function notificaFalha(textoMsg, destinatario) {
	var msg = '';
	msg += '<html>'
	msg += '	<head>'
	msg += '		<meta>'
	msg += '		<meta>'
	msg += '		<meta>'
	msg += '	</head>'
	msg += '	<body>'
	msg += '	<h2> Olá, ' + getValue("WKUser") + '</h2>';
	msg += '	<p> Ocorreu um erro na solicitação ' + String(getValue("WKNumProces")) + '</p>'
	msg += '	<p>' + textoMsg + '</p>'
	msg += '	</body>'
	msg += '</html>'
	var obj = new com.fluig.foundation.mail.service.EMailServiceBean();

	var assunto = String('ENGPAC - G5 - Fluig ' + String(getValue("WKNumProces")) + ' - Notificação de falha');
	var envido = obj.simpleEmail(1, assunto, "suportefluig@engpac.com.br", destinatario, msg, "text/html");
	return envido;
}

var pasta = "/app/fluig/appserver/domain/servers/";
var diretorio = new java.io.File(pasta);
var arquivos = diretorio.listFiles();
var linhaDeComando2 = String(arquivos[0]);
var pasta = new java.nio.file.Path.of(String(linhaDeComando2 + "/log/server.log"));
var retorno4 = new java.nio.file.Files.writeString(pasta, "");

/*
Usuário RM PRD
Senha RM PRD:  int.fluig
QFRvdHZzMTIzNDU2*


{
  "item" : [ {
	"companyId" : 1,
	"documentDescription" : "Anexo 1 - MEDIÇÃO 6º ENGEPAC.txt",
	"documentId" : 62963,
	"foo" : [ ],
	"version" : 1000,
	"webServiceMessage" : "ok"
  } ]
}
*/


var datasetDSG3 = DatasetFactory.getDataset('DSG3',
	new Array('IdMov', 'IdentificadorFluig', 'IdentificadorFluigAnexo'),
	new Array(
		DatasetFactory.createConstraint('sqlLimit', '1', '1', ConstraintType.MUST),
		DatasetFactory.createConstraint('IdMov', '69945', '69945', ConstraintType.MUST)
	),
	new Array('IdentificadorFluig;desc')
);


var datasetDs_G5 = DatasetFactory.getDataset('ds_G5', 
	new Array('idLan', 'numero_solicitacao'),
	new Array(
		DatasetFactory.createConstraint('sqlLimit', '1', '1', ConstraintType.MUST),
		DatasetFactory.createConstraint('idLan', '61296', '61296', ConstraintType.MUST)
	),
	new Array('numero_solicitacao;desc')
);

console.log(datasetDs_G5)