function createDataset(fields, constraints, sortFields) {
    log.info('=====DTS INTEGRACAO DADOSFIN=====')
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("Retorno");
    dataset.addColumn("Mensagem");


    var valores = getConstraints(constraints);

    try {
        var wsUpdate_RM = ServiceManager.getService('RMWsDataServer');
        var serviceLocator = wsUpdate_RM.instantiate('com.totvs.WsDataServer');
        var service = serviceLocator.getRMIwsDataServer();
        var serviceHelper = wsUpdate_RM.getBean();
        var dataServerName = 'FinCxaDataBR'

        
        var XML = "<FCXA> " +
            ("CODCOLIGADA" in valores ? "<CODCOLIGADA>" + valores.CODCOLIGADA + "</CODCOLIGADA>" : "") +
            ("CODCXA" in valores ? "<CODCXA>" + valores.CODCXA + "</CODCXA>" : "") +
            ("DESCRICAO" in valores ? "<DESCRICAO>" + valores.DESCRICAO + "</DESCRICAO>" : "") +
            ("SALDOINSTANTANEO" in valores ? "<SALDOINSTANTANEO>" + valores.SALDOINSTANTANEO + "</SALDOINSTANTANEO>" : "") +
            ("SALDODATABASE" in valores ? "<SALDODATABASE>" + valores.SALDODATABASE + "</SALDODATABASE>" : "") +
            ("DATABASECXA" in valores ? "<DATABASECXA>" + valores.DATABASECXA + "</DATABASECXA>" : "") +
            ("CODCOLPROP" in valores ? "<CODCOLPROP>" + valores.CODCOLPROP + "</CODCOLPROP>" : "") +
            ("NUMBANCO" in valores ? "<NUMBANCO>" + valores.NUMBANCO + "</NUMBANCO>" : "") +
            ("NUMAGENCIA" in valores ? "<NUMAGENCIA>" + valores.NUMAGENCIA + "</NUMAGENCIA>" : "") +
            ("NROCONTA" in valores ? "<NROCONTA>" + valores.NROCONTA + "</NROCONTA>" : "") +
            ("SALDONAOCOMPENSADO" in valores ? "<SALDONAOCOMPENSADO>" + valores.SALDONAOCOMPENSADO + "</SALDONAOCOMPENSADO>" : "") +
            ("CODMOEDA" in valores ? "<CODMOEDA>" + valores.CODMOEDA + "</CODMOEDA>" : "") +
            ("ATIVA" in valores ? "<ATIVA>" + valores.ATIVA + "</ATIVA>" : "") +
            ("SALDODATACORTE" in valores ? "<SALDODATACORTE>" + valores.SALDODATACORTE + "</SALDODATACORTE>" : "") +
            ("SALDOTOTAL" in valores ? "<SALDOTOTAL>" + valores.SALDOTOTAL + "</SALDOTOTAL>" : "") +
            " </FCXA> "


        log.info('XML========= \n' + XML + "\n")
        log.info("======================INSTANCIANDO")
        var authenticatedService = serviceHelper.getBasicAuthenticatedClient(service, "com.totvs.IwsDataServer", 'suporte.totvs', 'Suporte#5');
        log.info('AUTH +++ ' + authenticatedService.toString())
        var result = authenticatedService.saveRecord(dataServerName.toString(), XML.toString(), "CODCOLIGADA=0");

        log.info('RESULT +++ ' + result.toString())
        var resultMsg = result.toString()

        if (resultMsg.split(";").length == 1) {
            dataset.addRow(['NOK', result.toString()])
        } else {
            dataset.addRow(['OK', result.toString()])
        }


        return dataset
    } catch (e) {
        dataset.addRow(['ERRO' + e.lineNumber, e.toString()]);
        return dataset
    }
}



function getConstraints(constraints) {
    var objRetorno = {}

    if (constraints != null && constraints.length > 0) {
        for (var c = 0; c < constraints.length; c++) {
            if (constraints[c].fieldName.toUpperCase() != "SQLLIMIT") {
                objRetorno[constraints[c].fieldName.toUpperCase()] = constraints[c].initialValue
            }
        }
    }

    return objRetorno;
}