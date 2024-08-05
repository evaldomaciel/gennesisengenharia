
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



$('html, body').animate({ scrollTop: $('[name="dados_pagamento_analise"]').offset().top }, 1000);




DatasetFactory.getDataset('dsRMFinTDODataBR', null, new Array(
    DatasetFactory.createConstraint('filtro', 'CODCOLIGADA=3', 'CODCOLIGADA = 3 AND FTDO.INATIVO = 0 AND FTDO.PAGREC IN (2, 3)', ConstraintType.MUST)
), null);
