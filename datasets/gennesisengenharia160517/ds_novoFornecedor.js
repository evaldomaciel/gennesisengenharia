function createDataset(fields, constraints, sortFields) {
    log.info('=====DTS INTEGRACAO G5=====')
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("Retorno");
    dataset.addColumn("Mensagem");

    var contexto = 'CODCOLIGADA='

    var valores = getConstraints(constraints);

    try {
        var wsUpdate_RM = ServiceManager.getService('RMWsDataServer');
        var serviceLocator = wsUpdate_RM.instantiate('com.totvs.WsDataServer');
        var service = serviceLocator.getRMIwsDataServer();
        var serviceHelper = wsUpdate_RM.getBean();
        var dataServerName = 'FinCFODataBR'


        var XML = "<NewDataSet>" +
            "<FCFO>" +
            ("CODEXTERNO" in valores ? "<CODEXTERNO>" + valores.CODEXTERNO + "</CODEXTERNO>" : "") +
            ("CODCOLIGADA" in valores ? "<CODCOLIGADA>" + valores.CODCOLIGADA + "</CODCOLIGADA>" : "") +
            "<CODCFO>-1</CODCFO>" +
            ("NOMEFANTASIA" in valores ? "<NOMEFANTASIA>" + valores.NOMEFANTASIA + "</NOMEFANTASIA>" : "") +
            ("NOME" in valores ? "<NOME>" + valores.NOME + "</NOME>" : "") +
            ("CGCCFO" in valores ? "<CGCCFO>" + valores.CGCCFO + "</CGCCFO>" : "") +
            ("PAGREC" in valores ? "<PAGREC>" + valores.PAGREC + "</PAGREC>" : "") +
            ("RUA" in valores ? "<RUA>" + valores.RUA + "</RUA>" : "") +
            ("NUMERO" in valores ? "<NUMERO>" + valores.NUMERO + "</NUMERO>" : "") +
            ("BAIRRO" in valores ? "<BAIRRO>" + valores.BAIRRO + "</BAIRRO>" : "") +
            ("CIDADE" in valores ? "<CIDADE>" + valores.CIDADE + "</CIDADE>" : "") +
            ("CODETD" in valores ? "<CODETD>" + valores.CODETD + "</CODETD>" : "") +
            ("CEP" in valores ? "<CEP>" + valores.CEP + "</CEP>" : "") +
            ("TELEFONE" in valores ? "<TELEFONE>" + valores.TELEFONE + "</TELEFONE>" : "") +
            ("EMAIL" in valores ? "<EMAIL>" + valores.EMAIL + "</EMAIL>" : "") +
            ("CONTATO" in valores ? "<CONTATO>" + valores.CONTATO + "</CONTATO>" : "") +
            ("ATIVO" in valores ? "<ATIVO>" + valores.ATIVO + "</ATIVO>" : "") +
            ("LIMITECREDITO" in valores ? "<LIMITECREDITO>" + valores.LIMITECREDITO + "</LIMITECREDITO>" : "") +
            ("DATAULTALTERACAO" in valores ? "<DATAULTALTERACAO>" + valores.DATAULTALTERACAO + "</DATAULTALTERACAO>" : "") +
            ("DATACRIACAO" in valores ? "<DATACRIACAO>" + valores.DATACRIACAO + "</DATACRIACAO>" : "") +
            ("DATAULTMOVIMENTO" in valores ? "<DATAULTMOVIMENTO>" + valores.DATAULTMOVIMENTO + "</DATAULTMOVIMENTO>" : "") +
            ("VALOROP1" in valores ? "<VALOROP1>" + valores.VALOROP1 + "</VALOROP1>" : "") +
            ("VALOROP2" in valores ? "<VALOROP2>" + valores.VALOROP2 + "</VALOROP2>" : "") +
            ("VALOROP3" in valores ? "<VALOROP3>" + valores.VALOROP3 + "</VALOROP3>" : "") +
            ("PATRIMONIO" in valores ? "<PATRIMONIO>" + valores.PATRIMONIO + "</PATRIMONIO>" : "") +
            ("NUMFUNCIONARIOS" in valores ? "<NUMFUNCIONARIOS>" + valores.NUMFUNCIONARIOS + "</NUMFUNCIONARIOS>" : "") +
            ("CODMUNICIPIO" in valores ? "<CODMUNICIPIO>" + valores.CODMUNICIPIO + "</CODMUNICIPIO>" : "") +
            ("PESSOAFISOUJUR" in valores ? "<PESSOAFISOUJUR>" + valores.PESSOAFISOUJUR + "</PESSOAFISOUJUR>" : "") +
            ("PAIS" in valores ? "<PAIS>" + valores.PAIS + "</PAIS>" : "") +
            ("CONTRIBUINTE" in valores ? "<CONTRIBUINTE>" + valores.CONTRIBUINTE + "</CONTRIBUINTE>" : "") +
            ("CFOIMOB" in valores ? "<CFOIMOB>" + valores.CFOIMOB + "</CFOIMOB>" : "") +
            ("VALFRETE" in valores ? "<VALFRETE>" + valores.VALFRETE + "</VALFRETE>" : "") +
            ("TPTOMADOR" in valores ? "<TPTOMADOR>" + valores.TPTOMADOR + "</TPTOMADOR>" : "") +
            ("CONTRIBUINTEISS" in valores ? "<CONTRIBUINTEISS>" + valores.CONTRIBUINTEISS + "</CONTRIBUINTEISS>" : "") +
            ("NUMDEPENDENTES" in valores ? "<NUMDEPENDENTES>" + valores.NUMDEPENDENTES + "</NUMDEPENDENTES>" : "") +
            ("ORGAOPUBLICO" in valores ? "<ORGAOPUBLICO>" + valores.ORGAOPUBLICO + "</ORGAOPUBLICO>" : "") +
            ("CAIXAPOSTAL" in valores ? "<CAIXAPOSTAL>" + valores.CAIXAPOSTAL + "</CAIXAPOSTAL>" : "") +
            ("CATEGORIAAUTONOMO" in valores ? "<CATEGORIAAUTONOMO>" + valores.CATEGORIAAUTONOMO + "</CATEGORIAAUTONOMO>" : "") +
            ("IDCFO" in valores ? "<IDCFO>" + valores.IDCFO + "</IDCFO>" : "") +
            ("VROUTRASDEDUCOESIRRF" in valores ? "<VROUTRASDEDUCOESIRRF>" + valores.VROUTRASDEDUCOESIRRF + "</VROUTRASDEDUCOESIRRF>" : "") +
            ("RAMOATIV" in valores ? "<RAMOATIV>" + valores.RAMOATIV + "</RAMOATIV>" : "") +
            ("OPTANTEPELOSIMPLES" in valores ? "<OPTANTEPELOSIMPLES>" + valores.OPTANTEPELOSIMPLES + "</OPTANTEPELOSIMPLES>" : "") +
            ("TIPORUA" in valores ? "<TIPORUA>" + valores.TIPORUA + "</TIPORUA>" : "") +
            ("TIPOBAIRRO" in valores ? "<TIPOBAIRRO>" + valores.TIPOBAIRRO + "</TIPOBAIRRO>" : "") +
            ("REGIMEISS" in valores ? "<REGIMEISS>" + valores.REGIMEISS + "</REGIMEISS>" : "") +
            ("RETENCAOISS" in valores ? "<RETENCAOISS>" + valores.RETENCAOISS + "</RETENCAOISS>" : "") +
            "<USUARIOCRIACAO>suporte.totvs</USUARIOCRIACAO>" +
            ("PORTE" in valores ? "<PORTE>" + valores.PORTE + "</PORTE>" : "") +
            ("TIPOOPCOMBUSTIVEL" in valores ? "<TIPOOPCOMBUSTIVEL>" + valores.TIPOOPCOMBUSTIVEL + "</TIPOOPCOMBUSTIVEL>" : "") +
            ("IDPAIS" in valores ? "<IDPAIS>" + valores.IDPAIS + "</IDPAIS>" : "") +
            ("NACIONALIDADE" in valores ? "<NACIONALIDADE>" + valores.NACIONALIDADE + "</NACIONALIDADE>" : "") +
            ("CALCULAAVP" in valores ? "<CALCULAAVP>" + valores.CALCULAAVP + "</CALCULAAVP>" : "") +
            ("CODUSUARIOACESSO" in valores ? "<CODUSUARIOACESSO>" + valores.CODUSUARIOACESSO + "</CODUSUARIOACESSO>" : "") +
            ("RECCREATEDBY" in valores ? "<RECCREATEDBY>" + valores.RECCREATEDBY + "</RECCREATEDBY>" : "") +
            ("RECCREATEDON" in valores ? "<RECCREATEDON>" + valores.RECCREATEDON + "</RECCREATEDON>" : "") +
            ("RECMODIFIEDBY" in valores ? "<RECMODIFIEDBY>" + valores.RECMODIFIEDBY + "</RECMODIFIEDBY>" : "") +
            ("RECMODIFIEDON" in valores ? "<RECMODIFIEDON>" + valores.RECMODIFIEDON + "</RECMODIFIEDON>" : "") +
            ("TIPORENDIMENTO" in valores ? "<TIPORENDIMENTO>" + valores.TIPORENDIMENTO + "</TIPORENDIMENTO>" : "") +
            ("FORMATRIBUTACAO" in valores ? "<FORMATRIBUTACAO>" + valores.FORMATRIBUTACAO + "</FORMATRIBUTACAO>" : "") +
            ("SITUACAONIF" in valores ? "<SITUACAONIF>" + valores.SITUACAONIF + "</SITUACAONIF>" : "") +
            ("ISTOTVSMESSAGE" in valores ? "<ISTOTVSMESSAGE>" + valores.ISTOTVSMESSAGE + "</ISTOTVSMESSAGE>" : "") +
            ("INOVAR_AUTO" in valores ? "<INOVAR_AUTO>" + valores.INOVAR_AUTO + "</INOVAR_AUTO>" : "") +
            ("APLICFORMULA" in valores ? "<APLICFORMULA>" + valores.APLICFORMULA + "</APLICFORMULA>" : "") +
            ("CODCFOCOLINTEGRACAO" in valores ? "<CODCFOCOLINTEGRACAO>" + valores.CODCFOCOLINTEGRACAO + "</CODCFOCOLINTEGRACAO>" : "") +
            ("DIGVERIFICDEBAUTOMATICO" in valores ? "<DIGVERIFICDEBAUTOMATICO>" + valores.DIGVERIFICDEBAUTOMATICO + "</DIGVERIFICDEBAUTOMATICO>" : "") +
            ("ENTIDADEEXECUTORAPAA" in valores ? "<ENTIDADEEXECUTORAPAA>" + valores.ENTIDADEEXECUTORAPAA + "</ENTIDADEEXECUTORAPAA>" : "") +
            ("APOSENTADOOUPENSIONISTA" in valores ? "<APOSENTADOOUPENSIONISTA>" + valores.APOSENTADOOUPENSIONISTA + "</APOSENTADOOUPENSIONISTA>" : "") +
            ("SOCIOCOOPERADO" in valores ? "<SOCIOCOOPERADO>" + valores.SOCIOCOOPERADO + "</SOCIOCOOPERADO>" : "") +
            "</FCFO>" +
            "</NewDataSet>";

        log.info('XML========= \n' + XML + "\n")
        log.info("======================INSTANCIANDO")
        var usuario = getConstante('rm_usuario')
        var senha = getConstante('rm_senha')
        var authenticatedService = serviceHelper.getBasicAuthenticatedClient(service, "com.totvs.IwsDataServer", usuario, senha);
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