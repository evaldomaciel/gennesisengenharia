function servicetask183(attempt, message) {
    var codCCusto = hAPI.getCardValue("centro_de_custo");
    codCCusto = codCCusto.split(" - ")[0];

    var valorOriginal = hAPI.getCardValue("valor_original_analise")
    valorOriginal = valorOriginal.replace(".", "").replace(",", ".");

    var dataVencimento = hAPI.getCardValue("hidden_data_vencimento");
    dataVencimento = dataVencimento.replace("Z", "");

    var dataEmissao = hAPI.getCardValue("hidden_data_emissao");
    dataEmissao = dataEmissao.replace("Z", "");

    var dataPrevBaixa = hAPI.getCardValue("hidden_data_previabaixa");
    dataPrevBaixa = dataPrevBaixa.replace("Z", "");

    var valores = {
        "CODCOLIGADA": hAPI.getCardValue("coligada"), //"1",
        "IDLAN": "-1",
        "NUMERODOCUMENTO":  hAPI.getCardValue("numero_documento_analise"), //"000046632/09",
        "NFOUDUP": "0",
        "CLASSIFICACAO": "0", //hAPI.getCardValue("classificacao_lancamento"), //"0",
        "PAGREC": hAPI.getCardValue("pagar_receber"), //"2",
        "STATUSLAN": "0",
        "CODAPLICACAO": "F",
        "CODCCUSTO": codCCusto, //"01.01.01.01.002",
        "HISTORICO": hAPI.getCardValue("historico_analise"), //"teste",
        "DATAVENCIMENTO": dataVencimento, //"2024-07-31T00:00:00.000",
        "DATAEMISSAO": dataEmissao, //"2024-07-25T00:00:00.000",
        "DATAPREVBAIXA": dataPrevBaixa, //"2024-07-25T00:00:00.000",
        "VALORORIGINAL": valorOriginal, //hAPI.getCardValue("hidden_valor_original"), //"1.0000",
        "VALORCAPBX": hAPI.getCardValue("hidden_valor_cap"), //"0.0000",
        "VALORJUROS": hAPI.getCardValue("hidden_valor_juros"), //"0.0000",
        "VALORDESCONTO": hAPI.getCardValue("hidden_valor_desconto"), //"0.0000",
        "VALORMULTA": hAPI.getCardValue("hidden_valor_multa"), //"0.0000",
        "VALORAUXILIAR": "0.0000",
        "VALORBASEIRRF": "100.0000",
        "VALORIRRF": "0.0000",
        "VALORREPASSE": "0.0000",
        "VALORVENCIMENTOANTECIP": "0.0000",
        "VALORNOTACREDITO": "0.0000",
        "VALORADIANTAMENTO": "0.0000",
        "VALORDEVOLUCAO": "0.0000",
        "CAPMENSAL": hAPI.getCardValue("cap_mensal_analise"),//"00.00",
        "TAXASVENDOR": "0.0000",
        "JUROSVENDOR": "0.0000",
        "CODCOLCFO": hAPI.getCardValue("hidden_coligada_cli_for"),//"0",
        "CODCFO": hAPI.getCardValue("hidden_codigo_cli_for"),//"000000003",
        "CODCOLCXA": hAPI.getCardValue("coligada"),// "1",
        "CODCXA": hAPI.getCardValue("conta_caixa_analise"),//"99522-9",
        "IDPGTO": "1",
        "CODTDO": hAPI.getCardValue("dados_pagamento_analise"),// "PIX",
        "CODFILIAL": hAPI.getCardValue("filial_analise"),// "1",
        "SERIEDOCUMENTO": "1",//hAPI.getCardValue("serie_documento_analise"),//"1",
        "TIPOCONTABILLAN": "0", // hAPI.getCardValue("tipo_contabil"),//"0",
        "CODMOEVALORORIGINAL": hAPI.getCardValue("tipo_moeda"),//"R$",
        "LIBAUTORIZADA": "0",
        "STATUSEXPORTACAO": "0",
        "NUMLOTECONTABIL": "0",
        "STATUSEXTRATO": "0",
        "CNABACEITE": "0",
        "CNABSTATUS": "0",
        "CNABBANCO": "341",//hAPI.getCardValue("hidden_numbanco"),//"341",
        "REEMBOLSAVEL": "0",//hAPI.getCardValue("reembolsavel_analise"),//"0",
        //"USUARIO": "LUCIANA.S",
        "BAIXAAUTORIZADA": "1",
        "TEMCHEQUEPARCIAL": "0",
        "JAIMPRIMIU": "0",
        "NUMBLOQUEIOS": "0",
        "COTACAOINCLUSAO": "1.000000000",
        "COTACAOBAIXA": "0.000000000",
        "CARENCIAJUROS": hAPI.getCardValue("hidden_valor_carencia"),//"0",
        "TIPOJUROSDIA": "0",
        "USUARIOCRIACAO": "suporte.fluig",
        //"DATAALTERACAO": "2024-03-05T00:00:00",
        "ALTERACAOBLOQUEADA": "0",
        "MULTADIA": hAPI.getCardValue("multa_dia_analise"),//"0.0000",
        "DESCONTADO": "0",
        "VALORINSS": "0.0000",
        "VALORDEDUCAO": "0.0000",
        "APLICFORMULA": "F",
        "INSSEMOUTRAEMPRESA": "0.0000",
        "PERCENTBASEINSS": "0.0000",
        "OCAUTONOMO": "0",
        "PERCBASEINSSEMPREGADO": "0.0000",
        "INSSEDITADO": "0",
        "IRRFEDITADO": "0",
        "REUTILIZACAO": "0",
        "CATEGORIAAUTONOMO": "0",
        "VALORSESTSENAT": "0.0000",
        //"CONVENIO": "99522",
        //"DIGCONVENIO": "9",
        "PERCJUROS": hAPI.getCardValue("percentual_juros_analise"),//"0",
        "PERCDESCONTO":  hAPI.getCardValue("percentual_desc_analise"),//"0",
        "PERCMULTA": hAPI.getCardValue("percentual_multa_analise"),//"0",
        "PERCCAP": hAPI.getCardValue("percentual_cap_analise"),//"0",
        "PERCOP1": "0",
        "PERCOP2": "0",
        "PERCOP3": "0",
        "PERCOP4": "0",
        "PERCOP5": "0",
        "PERCOP6": "0",
        "PERCOP7": "0",
        "PERCOP8": "0",
        "VALORINSSEMPREGADOR": "0",
        "VALORBASEINSSEMPREGADOR": "0",
        "VRBASEINSS": "0",
        "VRBASEIRRF": "0.0000",
        "VALORSERVICO": "0.0000",
        "VRBASEINSSOUTRAEMPRESA": "0.0000",
        //"IDHISTORICO": "6125",
        //"PreencherRatCCusto": "true",
        //"PreencherRatDepto": "true",
        "VALORDEDUCAODEPENDENTES": "0.0000",
        "VRPERDAFINANCEIRA": "0.0000",
        "MODELOCONTABILIZACAO": "1",
        "MODELOCONTABILIZACAOBAIXA": "1",
        "CODCOLCONVENIO": "1",
        "IDCONVENIO": "14",
        "VALORORIGINALBX": "0",
        "VALORDESCONTOBX": "0",
        "VALORJUROSBX": "0",
        "VALORMULTABX": "0",
        "VALORCAPBX": "0",
        "VALOROP1BX": "0,0000",
        "VALOROP2BX": "0,0000",
        "VALOROP3BX": "0,0000",
        "VALOROP4BX": "0,0000",
        "VALOROP5BX": "0,0000",
        "VALOROP6BX": "0,0000",
        "VALOROP7BX": "0,0000",
        "VALOROP8BX": "0,0000",
        "VALORINSSBX": "0",
        "VALORIRRFBX": "0",
        "VALORSESTSENATBX": "0",
        "VALORDEVOLUCAOBX": "0",
        "VALORNOTACREDITOBX": "0",
        "VALORADIANTAMENTOBX": "0",
        "VALORJUROSVENDORBX": "0",
        "VALORRETENCOESBX": "0",
        "STATUSORCAMENTO": "0",
        "BAIXAPENDENTE": "0",
        "CODCOLTOMADOR": "0",
        "VALORDESCONTOACORDO": "0.0000",
        "VALORJUROSACORDO": "0.0000",
        "VALORACRESCIMOACORDO": "0.0000",
        "VALORDEDUCAOVARIAVEL": "0.0000",
        "STATUSLIQDUVIDOSA": "0",
        "VALORVINCULADO": "0",
        "STATUSNEGATIVACAO": "0",
        //"PreencheDadosBancarios": "true",
        "STATUSTERCEIRIZACAO": "0",
        "STATUSAPROVACAO": "0",
        "CODCOLPGTO": "1",
    }

    log.info("VALORES --> ")
    log.dir(valores)

    var cst = []

    for (var propriedade in valores) {
        if (valores.hasOwnProperty(propriedade)) {
            if (valores[propriedade] != "") {
                cst.push(DatasetFactory.createConstraint(propriedade, valores[propriedade], valores[propriedade], ConstraintType.MUST));
            }
        }
    }


    var dtsIntegracao = DatasetFactory.getDataset("ds_integraG5", null, cst, null);

    if (dtsIntegracao.rowsCount > 0) {
        if (dtsIntegracao.getValue(0, "Retorno") == "OK") {
            return true;
        } else {
            throw dtsIntegracao.getValue(0, "Mensagem");
        }
    } else {
        throw "Não retornou resultado da integração";
    }
}
