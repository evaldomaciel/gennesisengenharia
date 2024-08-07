function createDataset(fields, constraints, sortFields) {
    log.info('=====DTS INTEGRACAO G5=====')
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("Retorno");
    dataset.addColumn("Mensagem");

    var valores = getConstraints(constraints);

    try {
        var wsUpdate_RM = ServiceManager.getService('RMWsDataServer');
        var serviceLocator = wsUpdate_RM.instantiate('com.totvs.WsDataServer');
        var service = serviceLocator.getRMIwsDataServer();
        var serviceHelper = wsUpdate_RM.getBean();
        var dataServerName = 'FinDADOSPGTODataBR'

        var XML = "<FDadosPgto> " +
            ("CODCOLIGADA" in valores ? "<CODCOLIGADA>" + valores.CODCOLIGADA + "</CODCOLIGADA>" : "") +
            ("CODCOLCFO" in valores ? "<CODCOLCFO>" + valores.CODCOLCFO + "</CODCOLCFO>" : "") +
            ("CODCFO" in valores ? "<CODCFO>" + valores.CODCFO + "</CODCFO>" : "") +
            ("IDPGTO" in valores ? "<IDPGTO>" + valores.IDPGTO + "</IDPGTO>" : "") +
            ("DESCRICAO" in valores ? "<DESCRICAO>" + valores.DESCRICAO + "</DESCRICAO>" : "") +
            ("FORMAPAGAMENTO" in valores ? "<FORMAPAGAMENTO>" + valores.FORMAPAGAMENTO + "</FORMAPAGAMENTO>" : "") +
            ("FAVORECIDO" in valores ? "<FAVORECIDO>" + valores.FAVORECIDO + "</FAVORECIDO>" : "") +
            ("CGCFAVORECIDO" in valores ? "<CGCFAVORECIDO>" + valores.CGCFAVORECIDO + "</CGCFAVORECIDO>" : "") +
            ("ATIVO" in valores ? "<ATIVO>" + valores.ATIVO + "</ATIVO>" : "") +
            ("CHAVE" in valores ? "<CHAVE>" + valores.CHAVE + "</CHAVE>" : "") +
            ("TIPOPIX" in valores ? "<TIPOPIX>" + valores.TIPOPIX + "</TIPOPIX>" : "") +
            ("NUMEROBANCO" in valores ? "<NUMEROBANCO>" + valores.NUMEROBANCO + "</NUMEROBANCO>" : "") +
            ("CODIGOAGENCIA" in valores ? "<CODIGOAGENCIA>" + valores.CODIGOAGENCIA + "</CODIGOAGENCIA>" : "") +
            ("DIGITOAGENCIA" in valores ? "<CODIGOAGENCIA>" + valores.CODIGOAGENCIA + "</CODIGOAGENCIA>" : "") +
            ("CONTACORRENTE" in valores ? "<CONTACORRENTE>" + valores.CONTACORRENTE + "</CONTACORRENTE>" : "") +
            ("DIGITOCONTA " in valores ? "<CONTACORRENTE>" + valores.CONTACORRENTE + "</CONTACORRENTE>" : "") +
            ("TIPOCONTA" in valores ? "<TIPOCONTA>" + valores.TIPOCONTA + "</TIPOCONTA>" : "") +
            " </FDadosPgto> "


        log.info('XML========= \n' + XML + "\n")
        log.info("======================INSTANCIANDO")
        var authenticatedService = serviceHelper.getBasicAuthenticatedClient(service, "com.totvs.IwsDataServer", 'suporte.totvs', 'Suporte#5');
        log.info('AUTH +++ ' + authenticatedService.toString())
        var result = authenticatedService.saveRecord(dataServerName.toString(), XML.toString(), "CODCOLIGADA=" + valores.CODCOLIGADA);

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