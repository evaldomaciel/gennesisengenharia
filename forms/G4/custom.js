/***********************************************************************************************
 * @author 		TBNE - Angelo Barcelos - Desenvolvedor FLUIG angelo.barcelos@totvs.com.br
 * @data   		03/07/2023
 * @Versao RM   12.1.2302.160
 * @Descricao	Dados Ordem de Compra
 ***********************************************************************************************/
var G4 = {
    returnMessage: function (title, msg, tipo, time) {
        FLUIGC.toast({
            title: title,
            message: msg,
            type: tipo,
            timeout: time,
        });
    },
    formatDateMask: function (data) {
        var partes = data.split("T")[0].split("-");
        var ano = partes[0];
        var mes = partes[1];
        var dia = partes[2];
        return dia + "/" + mes + "/" + ano;
    },
    // breakLastPurchases: function (el) {
    //     var hoje = new Date()
    //     hoje.toISOString().substr(0, 10).split('-').reverse().join('/')
    //     var dataRecebimento = FLUIGC.calendar('#' + el.id, {
    //         language: 'pt',
    //         pickDate: true,
    //         useCurrent: false
    //     })
    //     var dataPagamento = FLUIGC.calendar('#' + el.id, {
    //         language: 'pt',
    //         pickDate: true,
    //         useCurrent: false
    //     })
    //     var dataVencimento = FLUIGC.calendar('#' + el.id, {
    //         language: 'pt',
    //         pickDate: true,
    //         useCurrent: false,
    //     })
    // },
    breakLastPurchases: function (el) {
        FLUIGC.calendar('#' + el.id, {
            language: 'pt',
            pickDate: true,
            useCurrent: false
        })
    },
    dateNormal: function () {
        var hoje = new Date()
        hoje.toISOString().substr(0, 10).split('-').reverse().join('/')
        var dataEntrega = FLUIGC.calendar('#dataEntrega', {
            language: 'pt',
            pickDate: true,
            useCurrent: false
        })
    },
    possuiParecer: function (el) {
        try {
            var result = $("#" + el.id).val();
            var index = el.id.split("___")[1];
            var divAvo = $("#valorOriginal___" + index).parent().parent().parent();
            var divAvo2 = $("#valorPago___" + index).parent().parent().parent();
            var divAvo3 = $("#valorJuros___" + index).parent().parent().parent();
            $('[id^="valorOriginal"]').mask("00.000.000.000.000,00", {reverse: true});
            $('[id^="valorPago"]').mask("00.000.000.000.000,00", {reverse: true});
            $('[id^="valorJuros"]').mask("00.000.000.000.000,00", {reverse: true});
            $("#valorPago___" + index).on("change", function () {
                var juros = parseFloat($("#valorPago___" + index).val().replace(".", "").replace(",", ".")) - parseFloat($("#valorOriginal___" + index).val().replace(".", "").replace(",", "."));
                $("#valorJuros___" + index).val(parseFloat(juros).toFixed(2).replace(".", ","));
                $('[id^="valorJuros"]').mask("00.000.000.000.000", {reverse: true});
                $('[id^="valorJuros"]').mask("00.000.000.000.000,00", {reverse: true});
            })
            divAvo.toggle(result === "sim");
            divAvo2.toggle(result === "sim");
            divAvo3.toggle(result === "sim");
        } catch (e) {
            G4.returnMessage('possuiParecer', e.toString(), 'warning', 9000);
        }
    },
    possuiParecerConferencia: function () {
        try {
            $("#aprovacaoComprovantes").on("change", function () {
                if ($("#aprovacaoComprovantes").val() == "Reprovado") {
                    $('#obs_compras').show();
                    $('#statusAprovacao').val("Reprovado");
                } else {
                    $('#obs_compras').hide();
                    $('#statusAprovacao').val("Aprovado");
                }
            });
        } catch (e) {
            G4.returnMessage('possuiParecerConferencia', e.toString(), 'warning', 9000);
        }
    },
    formatNumber: function (numero) {
        if (typeof numero === 'number' || typeof numero === 'string') {
            numero = parseFloat(numero);
            if (isNaN(numero)) {
                return numero.toString();
            }
            if (numero % 1 !== 0) {
                numero = Math.round((numero + Number.EPSILON) * 100) / 100;
                var numeroString = numero.toString();
                if (numeroString.indexOf('.') !== -1 && numeroString.split('.')[1].length < 2) {
                    numeroString += '0';
                }
                return numeroString;
            }
            return numero.toString();
        }
        return numero;
    },
    formatCurrency: function (valor) {
        if (typeof valor === 'string') {
            valor = parseFloat(valor.replace(',', '.'));
        }
        if (isNaN(valor)) {
            return valor;
        }
        var valorFormatado = valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        return valorFormatado;
    },
    searchDataProduct: function () {
        try {
            var codcoligada = $("#CodColigada").val();
            var idMov = $("#IdMov").val();
            var qtd = 0;
            var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codcoligada, codcoligada, ConstraintType.MUST);
            var c2 = DatasetFactory.createConstraint("IDMOV", idMov, idMov, ConstraintType.MUST);
            var constraints = [c1, c2];
            var dataset = DatasetFactory.getDataset("ds_totvs_rm_oc", null, constraints, null);
            $('[name^="centroCusto___"]').each(() => {
                qtd++;
            });
            if (qtd > 0) $("table[tablename=tabela_produtos] tbody tr").not(":first").remove();

            if (dataset && dataset.values?.length > 0) {
                dataset.values.forEach(function (value) {
                    var index = wdkAddChild("tabela_produtos");
                    var nomeProduto = value.NOME_PRODUTO?.toString() ?? "";
                    var unidade = value.CODUND?.toString() ?? "";
                    var quantidade = value.QUANTIDADEORIGINAL?.toString() ?? value.QUANTIDADE?.toString() ?? "";
                    var precoUnidade = value.PRECOUNITARIO?.toString() ?? "";
                    var descontoItem = value.DESCONTO_ITEM?.toString() ?? "";
                    var totalProduto = value.VALORBRUTOITEMORIG?.toString() ?? value.VALORBRUTOITEM?.toString() ?? "";
                    $("#sequencia___" + index).val(index);
                    $("#produto___" + index).val(nomeProduto);
                    $("#unidade___" + index).val(unidade);
                    $("#quantidade___" + index).val(G4.formatNumber(quantidade));
                    $("#precoUnidade___" + index).val(G4.formatCurrency(precoUnidade));
                    $("#descontoItem___" + index).val(G4.formatCurrency(descontoItem));
                    $("#totalProduto___" + index).val(G4.formatCurrency(totalProduto));
                });
            }
        } catch (e) {
            G4.returnMessage("searchDataProduct" + e.toString(), "warning", 40000);
        }
    },
    searchApportionmentData: function () {
        try {
            var codcoligada = $("#CodColigada").val();
            var idMov = $("#IdMov").val();
            var qtd = 0;
            var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codcoligada, codcoligada, ConstraintType.MUST);
            var c2 = DatasetFactory.createConstraint("IDMOV", idMov, idMov, ConstraintType.MUST);
            var constraints = [c1, c2];
            var dataset = DatasetFactory.getDataset("ds_totvs_rm_oc", null, constraints, null);
            $('[name^="produto___"]').each(() => {
                qtd++;
            });
            if (qtd > 0) $("table[tablename=tabela_rateios] tbody tr").not(":first").remove();
            if (dataset && dataset.values?.length > 0) {
                var value = dataset.values[0];
                var index = wdkAddChild("tabela_rateios");
                var centroCusto = value.CENTRO_CUSTO?.toString() ?? "";
                var valorBruto = value.VALORBRUTO?.toString() ?? "";
                $("#centroCusto___" + index).val(centroCusto);
                $("#valor___" + index).val(G4.formatCurrency(valorBruto));
            }
        } catch (e) {
            G4.returnMessage("searchApportionmentData" + e.toString(), "warning", 40000);
        }
    },
    checkExtraOrder: function () {
        try {
            var codcoligada = $("#CodColigada").val();
            var idMov = $("#IdMov").val();
            var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codcoligada, codcoligada, ConstraintType.MUST);
            var c2 = DatasetFactory.createConstraint("IDMOV", idMov, idMov, ConstraintType.MUST);
            var constraints = [c1, c2];
            var dataset = DatasetFactory.getDataset("ds_totvs_rm_extra_normal", null, constraints, null);
            if (dataset && dataset.values?.length > 0) {
                dataset.values.forEach(function (value) {
                    var extra = value.EXTRAOUNAO?.toString() ?? "";
                    $("#pedidoExtra").val(extra);
                })
            }
        } catch (e) {
            G4.returnMessage("checkExtraOrder" + e.toString(), "warning", 40000);
        }
    },
    dynamicFieldFunction: function () {
        try {
            G4.checkExtraOrder();
            var pedidoExtra = $("#pedidoExtra").val();
            if (pedidoExtra) {
                $(".dynamicField").show();
                $(".col-xs-12.col-sm-12.col-lg-6.col-md-6").removeClass("col-xs-12 col-sm-12 col-lg-6 col-md-6").addClass("col-xs-12 col-sm-12 col-lg-4 col-md-4");
                $(".dynamicField").removeClass("dynamicField").addClass("col-xs-12 col-sm-12 col-lg-4 col-md-4");
            } else {
                $(".dynamicField").hide();
            }
        } catch (e) {
            G4.returnMessage("dynamicFieldFunction" + e.toString(), "warning", 40000);
        }
    },
    insertTable: function (tableName, tipo, element) {
        try {
            var index = wdkAddChild(tableName);
            console.log("-----> " + $(element).parent().parent().parent().parent().find(".descAnexo").val(tipo + index));
            $('[name^="fnPropostaDeFornecedores___"]').each(() => {
                $(element).parent().parent().parent().parent().find(".descAnexo").val(tipo + index);
            });

            if(tableName == "tabela_boleto"){
                G4.breakLastPurchases($("#dataVencimento___"+index)[0])
            }
            if(tableName == "tabela_comprovante"){
                G4.breakLastPurchases($("#dataPagamento___"+index)[0])
            }
            if(tableName == "tabela_nota_fiscal"){
                G4.breakLastPurchases($("#dataRecebimento___"+index)[0])
            }
        } catch (e) {
            G4.returnMessage("insertTable" + e.toString(), "warning", 40000);
        }
    },
    removeTable: function (tableName) {
        try {
            if ($(tableName).attr("id").indexOf("dataVencimento") >= 0) {
                var index = $('[name^="dataVencimento___"]').attr('id').split('___')[1];
                var data = $("#dataVencimento___" + index).val().trim();
                var dataArr = $("#dataVencimentoArr").val().trim();
                var dataArray = dataArr.split(" | ").map(function (item) {
                    return item.trim();
                });
                var indexToRemove = dataArray.findIndex(function (item) {
                    return item === data;
                });
                if (indexToRemove !== -1) {
                    dataArray.splice(indexToRemove, 1);
                }
                dataArray = dataArray.map(function (item) {
                    return item.replace(/^\s*\|\s*|\s*\|\s*$/g, '');
                });
                var newDataArr = dataArray.join(" | ");
                $("#dataVencimentoArr").val(newDataArr);
            }
            setTimeout(function () {
                fnWdkRemoveChild(tableName);
            }, 100);
        } catch (e) {
            G4.returnMessage("removeTable" + e.toString(), "warning", 40000);
        }
    },
    identificaRetorno: function () {
        try {
            var numProcess = getNumProces();
            var c1 = DatasetFactory.createConstraint("processHistoryPK.processInstanceId", numProcess, numProcess, ConstraintType.MUST);
            var c2 = DatasetFactory.createConstraint("returnLink", true, true, ConstraintType.MUST);
            var constraints = new Array(c1, c2);
            var ds = DatasetFactory.getDataset("processHistory", null, constraints, null);
            if (ds != null && ds != "undefined" && typeof ds.values != "undefined") {
                if ($('#statusAprovacao').val() == 'Reprovado') {
                    $("#obs_compras").show(600);
                    $("#setor_compras_conferencia").show(600);
                    $("#parecerCompras").prop('readonly', true);
                } else {
                    $("#obs_compras").hide(600);
                }
            }
        } catch (e) {
            G4.returnMessage('ERRO>identificaRetorno', e.toString(), 'warning', 9000);
        }
    },
    tipoEntrega: function () {
        try {
            $("#materialParcial").on("click", function () {
                $("#itens_recebimento").show(500);
                $("#tipoEntrega").val("Parcial");
            })
            $("#materialTotal").on("click", function () {
                $("#itens_recebimento").hide(500);
                $("#tipoEntrega").val("Total");
            })
        } catch (e) {
            G4.returnMessage('ERRO>tipoEntrega', e.toString(), 'warning', 9000);
        }
    },
    getEndDate: function (el) {
        try {
            var data = $("#" + el.id).val();
            var dataArr = $("#dataVencimentoArr").val();
            $("#dataVencimentoArr").val(dataArr + " | " + data);
        } catch (e) {
            G4.returnMessage('ERRO>tipoEntrega', e.toString(), 'warning', 9000);
        }
    },
    verificaTipoDemanda: function () {
        var tipoDemanda = $("#tipoDemanda").val();
        if (tipoDemanda == "estorno total" || tipoDemanda == "estorno parcial") {
            $("#tipoDemanda_comprovante").show();
        } else {
            $("#tipoDemanda_comprovante").hide();
        }
        if (tipoDemanda == "crédito total" || tipoDemanda == "crédito parcial") {
            $("#obs_credito").show();
        } else {
            $("#obs_credito").hide();
        }
    },
    taskBPM: function () {
        try {
            $("#div_atribuicoes").hide();
            $('[id^="fdRelatorioFotografico___"]').val("RelatorioFotografico");
            var atividade = parseInt(getWKNumState());
            if (getAdmin()) {
                $("#div_atribuicoes").show();
            }
            $("#setor_compras_conferencia").hide();
            $("#tipoDemanda").on("change", function () {
                G4.verificaTipoDemanda();
                $("#parecerCredito").val("");
                if ($("#fnMapaTipoDemanda").val() != "" && $("#fnMapaTipoDemanda").val() != null) {
                    var inputFile = $("#button_upRm").parent().parent().find(".inputAnexo")[0];
                    var fileDescription = $("button_upRm").parent().parent().find(".descAnexo").val();
                    removeFile(fileDescription);
                    setFilePhisicalName(inputFile.id, "");
                    btnState(inputFile.id, "upload", "download");
                }
            });
            if (atividade == 6 || atividade == 0 || atividade == 4) {
                $("#sec_anexar_comprovantes").hide();
            } else if (atividade == 14) {
                $("#setor_financeiro_comprovantes").hide();
                $("#setor_financeiro_notaFiscal").hide();
                $("#parecerCompras").prop('disabled', false);
                $("#parecerFinanceiro").prop('disabled', true);
                $("#parecerEstoque").prop('disabled', true);
            } else if (atividade == 16) {
                $("#setor_compras_conferencia").show();
                $("#setor_financeiro_notaFiscal").hide();
                $('[id^="div_delete_comprovante"]').hide();
                $('[id^="div_add_comprovante"]').hide();
                $("#tipoDemanda").on("change", function () {
                    $("#valueTipoDemandaCompras").val($(this).val());
                });
            } else if (atividade == 12) {
                G4.identificaRetorno();
                $("#tipoDemanda_comprovante").hide();
                $("#obs_credito").hide();
                $("#setor_financeiro_notaFiscal").hide();
                $("#parecerCompras").prop('disabled', true);
                $("#parecerFinanceiro").prop('disabled', false);
                $("#parecerEstoque").prop('disabled', true);
                $('[id^="div_delete_boleto"]').hide();
                $("#div_add_boleto").hide();
            } else if (atividade == 22) {
                $("#materialParcial").on("click", function () {
                    $("#valueRadioParcial").val($("#materialParcial").val());
                })
                $("#materialTotal").on("click", function () {
                    $("#valueRadioParcial").val($("#materialTotal").val());
                })
                $('[id^="div_delete_comprovante"]').hide();
                $("#div_add_comprovante").hide();
                $('[id^="div_delete_boleto"]').hide();
                $("#div_add_boleto").hide();
                $("#setor_compras_conferencia").show();
                $("#parecerCompras").prop('disabled', true);
                $("#parecerFinanceiro").prop('disabled', true);
                $("#parecerEstoque").prop('disabled', false);
            } else {
                $('[id^="div_delete_comprovante"]').hide();
                $("#div_add_comprovante").hide();
                $('[id^="div_delete_boleto"]').hide();
                $("#div_add_boleto").hide();
                $("#div_add_notaFiscal").hide();
                $('[id^="div_delete_notaFiscal"]').hide();
            }

            /** Negações */
            if (atividade != 22) {
                $('[id^="btnAddNotaFiscal"]').hide();
            }
            if (atividade != 119) {
                $("#div_estornos").hide();
            }
            if (atividade != 120) {
                $("#div_creditos").hide();
            }

            if(atividade == 24){
                $("#div_estornos").show();
            }
        } catch (e) {
            G4.returnMessage("taskBPM" + e.toString(), "warning", 40000);
        }
    },
    init: function () {
        G4.taskBPM();
        G4.searchDataProduct();
        G4.searchApportionmentData();
        G4.dynamicFieldFunction();
        G4.possuiParecerConferencia();
        G4.dateNormal();
        G4.tipoEntrega();
        G4.verificaTipoDemanda();
        displayBtnFiles();
    }
};
$(document).ready(function () {
    G4.init();

    let state = getWKNumState();
    if(state != 14){
        $(".deleteTableBoletoBtn").map((index, item) => { if(index > 0) $(item).hide()})
        $("#btnAddBoleto").hide()
    }
    if(state != 12){
        $(".deleteTableComprovanteBtn").map((index, item) => { if(index > 0) $(item).hide()})
        $("#btnAddComprovante").hide()
    }
});

window.onload = function ConsultaCentroDeCusto() {

    var codcoligada = $("#CodColigada").val();
    var idMov = $("#IdMov").val();
    var centroCusto = $("#CentroDeCustoMecanismo").val();

    console.log('PASSOU AQUI', codcoligada);
    console.log('PASSOU AQUI 2', idMov);
    console.log('PASSOU AQUI 3', centroCusto);


    var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codcoligada, codcoligada, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("IDMOV", idMov, idMov, ConstraintType.MUST);

    var constraints = [c1, c2];
    var dataset = DatasetFactory.getDataset("ds_totvs_rm_oc", null, constraints, null);

   /* if (dataset && dataset.values?.length > 0) {
        dataset.values.forEach(function (value) {
            var centroCusto = value.CENTRO_CUSTO?.toString() ?? "";

            $("#CentroDeCustoMecanismo").val(centroCusto);
        })
    } */
    if (dataset && dataset.values?.length > 0) {
        var value = dataset.values[0];
        var centroCusto = value.CENTRO_CUSTO?.toString() ?? "";

        var numeroCentroCusto = centroCusto.split(" - ")[0];

        console.log(numeroCentroCusto);

        $("#CentroDeCustoMecanismo").val(numeroCentroCusto);
    }


    return 0;
 }