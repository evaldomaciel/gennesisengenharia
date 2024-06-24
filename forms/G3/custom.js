/***********************************************************************************************
 * @author 		TBNE - Angelo Barcelos - Desenvolvedor FLUIG angelo.barcelos@totvs.com.br
 * @data   		03/07/2023
 * @Versao RM   12.1.2302.160
 * @Descricao	Dados Ordem de Compra
 ***********************************************************************************************/
var G3 = {
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
    breakLastPurchases: function () {
        var hoje = new Date()
        hoje.toISOString().substr(0, 10).split('-').reverse().join('/')
        var dataInicio = FLUIGC.calendar('#dataInicio', {
          language: 'pt',
          pickDate: true,
          useCurrent: false
        })
        var dataFim = FLUIGC.calendar('#dataFim', {
          language: 'pt',
          pickDate: true,
          useCurrent: false
        })
    },
    formatNumber: function(numero) {
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
    formatCurrency: function(valor) {
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
                    $("#quantidade___" + index).val(G3.formatNumber(quantidade));
                    $("#precoUnidade___" + index).val(G3.formatCurrency(precoUnidade));
                    $("#descontoItem___" + index).val(G3.formatCurrency(descontoItem));
                    $("#totalProduto___" + index).val(G3.formatCurrency(totalProduto));
                });
            }
        } catch (e) {
            G3.returnMessage("searchDataProduct" + e.toString(), "warning", 40000);
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
                $("#valor___" + index).val(G3.formatCurrency(valorBruto));
            }
        } catch (e) {
            G3.returnMessage("searchApportionmentData" + e.toString(), "warning", 40000);
        }
    },

    checkExtraOrder: function(){
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
            G3.returnMessage("checkExtraOrder" + e.toString(), "warning", 40000);
        }
    },
    
    dynamicFieldFunction: function() {
        try {
            G3.checkExtraOrder();

            var pedidoExtra = $("#pedidoExtra").val();
            
            if (pedidoExtra) {
                $(".dynamicField").show();
                $(".col-xs-12.col-sm-12.col-lg-6.col-md-6").removeClass("col-xs-12 col-sm-12 col-lg-6 col-md-6").addClass("col-xs-12 col-sm-12 col-lg-4 col-md-4");
                $(".dynamicField").removeClass("dynamicField").addClass("col-xs-12 col-sm-12 col-lg-4 col-md-4");
            } else {
                $(".dynamicField").hide();
            }

        } catch (e) {
            G3.returnMessage("dynamicFieldFunction" + e.toString(), "warning", 40000);
        }
    },

    init: function () {            
            G3.searchDataProduct();
            G3.searchApportionmentData();    
            G3.breakLastPurchases();            
        	G3.dynamicFieldFunction();    
    }
};

$(document).ready(function () {
    G3.init();
});