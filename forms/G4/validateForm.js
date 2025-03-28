function validateForm(form) {
    var atividade = parseInt(getValue("WKNumState"));
    var info_campos_obrigatorios = "";
    var valor_campo = null;

    if ([14, 16].indexOf(atividade) > -1) {
        valor_campo = form.getValue("tipoDemanda");
        if (!preenchimentoValidoSelect(valor_campo)) {
            info_campos_obrigatorios = info_campos_obrigatorios + "- Tipo Demanda (Boleto)<br>";
        }

        valor_campo = form.getValue("dataEntrega");
        if (!preenchimentoValido(valor_campo)) {
            info_campos_obrigatorios = info_campos_obrigatorios + "- Data Entrega (Boleto) <br>";
        }
    }

    if ([14].indexOf(atividade) > -1) {
        var indexes1 = form.getChildrenIndexes("tabela_boleto");
        for (var i = 0; i < indexes1.length; i++) {
            valor_campo = form.getValue("dataVencimento___" + indexes1[i]);
            if (!preenchimentoValido(valor_campo)) {
                info_campos_obrigatorios = info_campos_obrigatorios + "- Data Vencimento (linha " + (i + 1) + ") <br>";
            }
        }
    }

    if ([16].indexOf(atividade) > -1) {
        valor_campo = form.getValue("aprovacaoComprovantes");
        if (valor_campo != 'Aprovado' && valor_campo != 'Reprovado') 
        {
            if ( getValue("WKNextState") != 12 )
            {
                info_campos_obrigatorios = info_campos_obrigatorios + "- Aprovação Comprovantes <br>";
            }
        } else if (valor_campo == 'Reprovado') {
            valor_campo = form.getValue("parecerCompras");
            if (!preenchimentoValido(valor_campo)) {
                info_campos_obrigatorios = info_campos_obrigatorios + "- Parecer Compra <br>";
            }

        }
    }
    if ([12].indexOf(atividade) > -1) {
        var indexes2 = form.getChildrenIndexes("tabela_comprovante");
        for (var i = 0; i < indexes2.length; i++) {
            valor_campo = form.getValue("dataPagamento___" + indexes2[i]);
            if (!preenchimentoValido(valor_campo)) {
                info_campos_obrigatorios = info_campos_obrigatorios + "- Data Pagamento (linha " + (i + 1) + ") <br>";
            }
            valor_campo = form.getValue("juros___" + indexes2[i]);
            if (!preenchimentoValido(valor_campo)) {
                info_campos_obrigatorios = info_campos_obrigatorios + "- Juros (linha " + (i + 1) + ") <br>";
            }
        }
    }
    if ([22].indexOf(atividade) > -1 && parseInt(getValue("WKNextState")) != 16) {
        var indexes3 = form.getChildrenIndexes("tabela_nota_fiscal");
        valor_campo = form.getValue("responsavelPeloRecebimento");
        if (!preenchimentoValido(valor_campo)) {
            info_campos_obrigatorios = info_campos_obrigatorios + "- Responsável pelo Recebimento <br>";
            // info_campos_obrigatorios = info_campos_obrigatorios + "- Nota Fiscal <br>";
        }
        if (form.getValue("valueRadioParcial") == "parcial") {
            valor_campo = form.getValue("notacoesMaterialParcial");
            if (!preenchimentoValido(valor_campo)) {
                info_campos_obrigatorios = info_campos_obrigatorios + "- Notação Material Parcial <br>";
            }
        } else if (form.getValue("valueRadioParcial") != "total" && form.getValue("valueRadioParcial") != "parcial") {
            info_campos_obrigatorios = info_campos_obrigatorios + "- Entrega do Material <br>";
        }
        for (var i = 0; i < indexes3.length; i++) {
            valor_campo = form.getValue("dataRecebimento___" + indexes3[i]);
            if (!preenchimentoValido(valor_campo)) {
                info_campos_obrigatorios = info_campos_obrigatorios + "- Data de Recebimento (linha " + (i + 1) + ") <br>";
            }
            var relatorioFotografico = form.getValue("fnRelatorioFotografico___" + indexes3[i]);
            if (!preenchimentoValido(relatorioFotografico)) {
                info_campos_obrigatorios = info_campos_obrigatorios + "- Relatório Fotográfico (linha " + (i + 1) + ") <br>";
            }
            var notaFiscal = form.getValue("fnPropostaDeFornecedores___" + indexes3[i]);
            if (!preenchimentoValido(notaFiscal)) {
                info_campos_obrigatorios = info_campos_obrigatorios + "- Nota Fiscal (linha " + (i + 1) + ") <br>";
            }
        }
    }

    if (info_campos_obrigatorios != "") {
        throw "Seguintes Campos são obrigatórios: <br>" + info_campos_obrigatorios;
    }
}

function preenchimentoValido(campo) {
    return campo != null && campo != "";
}

function preenchimentoValidoSelect(campo) {
    log.info("preenchimentoValidoSelect_096");
    log.info(campo)

    return campo != null && campo != "" && campo != "-";
}