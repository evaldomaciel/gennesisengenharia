
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




DatasetFactory.getDataset('dsRMFinTDODataBR', null, new Array(
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
var datasetProcessHistory = DatasetFactory.getDataset('processHistory', ['processHistoryPK.processInstanceId' , 'processHistoryPK.movementSequence'], new Array(constraintProcessHistory1, constraintProcessHistory2), null);
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
*/
