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
    
            if (qtd > 0) {
                $("table[tablename=tabela_produtos] tbody tr").not(":first").remove();
            }
    
            var Botao = $(".panel-heading .form-group");
            Botao.empty(); 
    
            var BotaoDinamico = $(
                `<button type="button" class="btn btn-danger col-xs-12 col-sm-12 col-lg-5 col-md-6" onclick="AtualizarMenorCompra();">
                    Atualizar Preços Médios
                </button>`
            );
    
            Botao.append(BotaoDinamico);
    
            if (dataset && dataset.values?.length > 0) {
                for (let i = dataset.values.length - 1; i >= 0; i--) {
                    var value = dataset.values[i];
                    var index = wdkAddChild("tabela_produtos");
    
                    var nomeProduto = value.NOME_PRODUTO?.toString() ?? "";
                    var IDPRD = value.IDPRD?.toString() ?? "";
                    var unidade = value.CODUND?.toString() ?? "";
                    var quantidade = value.QUANTIDADEORIGINAL?.toString() ?? value.QUANTIDADE?.toString() ?? "";
                    var precoUnidade = value.PRECOUNITARIO?.toString() ?? "";
                    var descontoItem = value.DESCONTO_ITEM?.toString() ?? "";
                    var totalProduto = value.VALORBRUTOITEMORIG?.toString() ?? value.VALORBRUTOITEM?.toString() ?? "";
    
                    $("#sequencia___" + index).val(index);
                    $("#produto___" + index).val(nomeProduto);
                    $("#IDPRD___" + index).val(IDPRD);
                    $("#unidade___" + index).val(unidade);
                    $("#quantidade___" + index).val(G3.formatNumber(quantidade));
                    $("#precoUnidade___" + index).val(G3.formatCurrency(precoUnidade));
                    $("#descontoItem___" + index).val(G3.formatCurrency(descontoItem));
                    $("#totalProduto___" + index).val(G3.formatCurrency(totalProduto));
    
                    var BotaoHTML = `<div class="d-flex gap-2 position-relative">
                    <button type="button" class="btn btn-primary tooltip-button" 
                        data-tooltip="Detalhamento do Valor" 
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal" 
                        onclick="DetalharValor(${index});">
                        <i class="flaticon flaticon-cash-transfer icon-md" aria-hidden="true"></i>
                    </button>
                    <button type="button" class="btn btn-primary tooltip-button " 
                        data-tooltip="Detalhamento do Produto" 
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal2" 
                        onclick="DetalharProduto(${index});">
                        <i class="flaticon flaticon-add-shop icon-md" aria-hidden="true"></i>
                    </button>
                </div>`;
    
                    $("#Detalhamentos___" + index).html(BotaoHTML);
                }
            }
        } catch (e) {
            G3.returnMessage("searchDataProduct: " + e.toString(), "warning", 40000);
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
            G3.returnMessage("checkExtraOrder" + e.toString(), "warning", 40000);
        }
    },

    dynamicFieldFunction: function () {
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


function ConsultaCentroDeCusto() {

    var codcoligada = $("#CodColigada").val();
    var idMov = $("#IdMov").val();

    console.log('PASSOU AQUI', codcoligada);
    console.log('PASSOU AQUI 2', idMov);


    var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codcoligada, codcoligada, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("IDMOV", idMov, idMov, ConstraintType.MUST);

    var constraints = [c1, c2];
    var dataset = DatasetFactory.getDataset("ds_totvs_rm_oc", null, constraints, null);

    if (dataset && dataset.values?.length > 0) {
        var value = dataset.values[0];
        var centroCusto = value.CENTRO_CUSTO?.toString() ?? "";

        $("#CentroDeCustoMecanismo").val(centroCusto);
    }

    return valorAtualStatus;
}

function AtualizarMenorCompra() {
    try {
        var idMov = $("#IdMov").val();
        var CodColigada = $("#CodColigada").val();

        var c1 = DatasetFactory.createConstraint("IDMOV", idMov, idMov, ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("COLIGADA", CodColigada, CodColigada, ConstraintType.MUST);

        var constraints = [c1, c2];
        var dataset = DatasetFactory.getDataset("G3ValorMedio", null, constraints, null);

        console.log('Valor do dataset é:', dataset);

        if (dataset && dataset.values?.length > 0) {
            
            $('[name^="produto___"]').each(function (index, element) {
                var linhaIndex = $(this).attr('id').split("___")[1]; 
                
                var value = dataset.values[index];
                if (value) {
                    var precoUnitarioMedio = value.PRECO_UNITARIO_MEDIO ? value.PRECO_UNITARIO_MEDIO.toString() : "";
                    var menorValor = value.MENOR_VALOR ? value.MENOR_VALOR.toString() : "";
                    
                    $("#PrecoMedio___" + linhaIndex).val(precoUnitarioMedio);
                    $("#MenorCompra___" + linhaIndex).val(menorValor);
                } else {
                    console.warn(`Nenhum dado correspondente encontrado para a linha ${index}`);
                }
            });
        } 
    } catch (e) {
        console.error("Erro na função AtualizarMenorCompra: ", e);
    }
}

function DetalharProduto(index) {
    try {
        var idMov = $("#IdMov").val();
        var CodColigada = $("#CodColigada").val();
        var Filial = $("#filial").val();
       
        $("#itemTableBody2").empty(); 
    
        var IDPRD = $("#IDPRD___" + index).val();
        console.log('O valor do IDPRD é --->', IDPRD);

        var c1 = DatasetFactory.createConstraint("IDPRD", IDPRD, IDPRD, ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("CODCOLIGADA", CodColigada, CodColigada, ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("CODFILIAL", Filial.split(" - ")[0].trim(), Filial.split(" - ")[0].trim(), ConstraintType.MUST);

        var constraints = [c1, c2, c3];
        var dataset = DatasetFactory.getDataset("G3_DetalheProduto", null, constraints, null);
        console.log('Dataset retornado:', dataset);

        if (dataset && dataset.values?.length > 0) {
            var rows = "";

            dataset.values.forEach((item, i) => {
                console.log(`Linha ${i}:`, item);

                console.log("Coligada:", item.CODCOLIGADA);
                console.log("IDMOV:", item.IDMOV);
                console.log("IDPRDsql:", item.IDPRD);
                console.log("Fornecedor:", item.FORNECEDOR);
                console.log("Data da Compra:", item.DATA_DA_COMPRA);
                console.log("Quantidade:", item.QUANTIDADE);
                console.log("Valor Unitário Final:", item.VALOR_UNITARIO_FINAL);
                console.log("Comprador:", item.COMPRADOR);
                console.log("Centro de Custo:", item.CENTRO_DE_CUSTO);

                var Coligada = item.CODCOLIGADA ?? "";
                var IDMOV = item.IDMOV ?? "";
                //var IDPRDsql = item.IDPRD ?? "";
                var Fornecedor = item.FORNECEDOR ?? "";
                var DataCompra = item.DATA_DA_COMPRA ?? "";
                var quantidade = item.QUANTIDADE ?? "";
                var TipoDeFornecedor = item.TIPO_FORNECEDOR ?? "";
                var ValorUniFinal = item.VALOR_UNITARIO_FINAL ?? "";
                var comprador = item.COMPRADOR ?? "";
              //  var CentroDeCusto = item.CENTRO_DE_CUSTO ?? "";

                rows += `
                    <tr>
                        <td>${Coligada}</td>
                        <td>${IDMOV}</td>
                        <td>${Fornecedor}</td>
                        <td>${TipoDeFornecedor}</td>
                        <td>${DataCompra}</td>
                        <td>${quantidade}</td>
                        <td>${comprador}</td>
                        <td>${ValorUniFinal}</td>
                    </tr>
                `;
            });

            if (rows.trim() !== "") {
                $("#itemTableBody2").append(rows);
                console.log("Dados adicionados à tabela com sucesso.");
            } 
        } 
    } catch (e) {
        console.error("Erro na função DetalharValor: ", e);
        
    }
}

function DetalharValor(index) {
    try {
  
        var CodColigada = $("#CodColigada").val();
        var Filial = $("#filial").val();

        $("#itemTableBody").empty();

        var IDPRD = $("#IDPRD___" + index).val();

        var c1 = DatasetFactory.createConstraint("IDPRD", IDPRD, IDPRD, ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("CODCOLIGADA", CodColigada, CodColigada, ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("CODFILIAL", Filial.split(" - ")[0].trim(), Filial.split(" - ")[0].trim(), ConstraintType.MUST);

        var constraints = [c1, c2, c3];
        var dataset = DatasetFactory.getDataset("G3_DetalharProduto2", null, constraints, null);
        console.log('Dataset retornado:', dataset);

        if (dataset && dataset.values?.length > 0) {
            var rows = "";

            for (var i = 0; i < dataset.values.length; i++) {
                var Coligada = dataset.values[i].CODCOLIGADA ?? "";
                var IDMOV = dataset.values[i].IDMOV ?? "";
                var IDPRDsql = dataset.values[i].IDPRD ?? "";
                var Fornecedor = dataset.values[i].FORNECEDOR ?? "";
                var TipoDeFornecedor = dataset.values[i].TIPO_FORNECEDOR ?? "";
                var precoUnitario = dataset.values[i].DATA_DA_COMPRA ?? "";
                var quantidade = dataset.values[i].QUANTIDADE ?? "";
                var ValorFinal = dataset.values[i].VALOR_UNITARIO_FINAL ?? "";
                var comprador = dataset.values[i].COMPRADOR ?? "";
                var CentroDeCusto = dataset.values[i].CENTRO_DE_CUSTO ?? "";

                rows += `
                    <tr> 
                        <td>${Coligada}</td>
                        <td>${IDMOV}</td>
                        <td>${IDPRDsql}</td>
                        <td>${Fornecedor}</td>
                        <td>${TipoDeFornecedor}</td>
                        <td>${quantidade}</td>
                        <td>${precoUnitario}</td>
                        <td>${ValorFinal}</td>
                        <td>${comprador}</td>
                        <td>${CentroDeCusto}</td>
                    </tr>
                `;
            }

            $("#itemTableBody").append(rows);
        } else {
            alert("Dados não encontrados no dataset para IDPRD: " + IDPRD);
        }
    } catch (e) {
        console.error("Erro na função DetalharProduto: ", e);
    }
}

$(document).ready(function () {
    $('#searchInput').on('keyup', function () {
        var value = $(this).val().toLowerCase();
        $('#itemTableBody tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});



var INICIO = 1
var APROVACAO = 4

$(document).ready(function () {

    // Caso queira remover a aba de anexos
    //window.parent.$("#processTabs").find("li").last().hide();

    if (getAtividade() != INICIO) {
        invisibleBtnUpload("fnRegistroNascimento")
        invisibleBtnUpload("fnCpf")
    }

    if (getAtividade() != APROVACAO) {
        invisibleBtnUpload("fnFoto")
        invisibleBtnUpload("fnComprovante")
    }

});


/**
 * Adiciona uma nova linha na tabela pai e filho de dependentes
 * @return {void} 
 * @author Sérgio Machado
 */
function addNewRowDependente() {
    try {
        const tablename = "dependentes"
        const idByTimestamp = (new Date().getTime()).toString(32);
        const indice = wdkAddChild(tablename);
        $(`#dependenteCodigo___${indice}`).val(idByTimestamp).prop("readonly", true);
        $(`#fdRegistroNascDep___${indice}`).val(`Registro de anexo ${idByTimestamp}`);
        tableLineCount(tablename)
    } catch (e) {
        console.error("Houve um erro inesperado na função addNewRowDependente")
        console.error(e)
    }
}

function addNewRowDependente2() {
    try {
        const tablename = "dependentes2"
        const idByTimestamp = (new Date().getTime()).toString(32);
        const indice = wdkAddChild(tablename);
        $(`#dependenteCodigo___${indice}`).val(idByTimestamp).prop("readonly", true);
        $(`#fdRegistroNascDep2___${indice}`).val(`Registro de anexo ${idByTimestamp}`);
        tableLineCount(tablename)
    } catch (e) {
        console.error("Houve um erro inesperado na função addNewRowDependente")
        console.error(e)
    }
}


/**
 * Delete uma linha da tabela pai e filho de dependentes e remove o anexo caso exista
 * @return {void} 
 * @author Sérgio Machado
 */
function destroyRowDependente(event) {
    try {
        const tabela = $(event).closest('table')[0];
        const tablename = tabela.getAttribute("tablename");
        const indice = getIndice($(event).closest('tr').find("input")[0].id);
        const codigo = $(`#dependenteCodigo___${indice}`).val() || "Código em branco";
        const inputFileName = $(event).closest('tr').find(".inputAnexo").val();
        const inputFileDesc = $(event).closest('tr').find(".descAnexo").val();
        FLUIGC.message.confirm({
            message: `Deseja remover o dependente de código <b>${codigo}</b>?`,
            title: 'Confirmação',
            labelYes: 'Sim, quero remover',
            labelNo: 'Não, quero cancelar',
        }, function (result) {
            if (result) {
                fnWdkRemoveChild(event)
                if (inputFileName && inputFileDesc) {
                    removeFile(inputFileDesc)
                }
                tableLineCount(tablename)
            }
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função destroyRowDependente")
        console.error(e)
    }
}
function destroyRowDependente2(event) {
    try {
        const tabela = $(event).closest('table')[0];
        const tablename = tabela.getAttribute("tablename");
        const indice = getIndice($(event).closest('tr').find("input")[0].id);
        const codigo = $(`#dependenteCodigo___${indice}`).val() || "Código em branco";
        const inputFileName = $(event).closest('tr').find(".inputAnexo").val();
        const inputFileDesc = $(event).closest('tr').find(".descAnexo").val();
        FLUIGC.message.confirm({
            message: `Deseja remover o dependente de código <b>${codigo}</b>?`,
            title: 'Confirmação',
            labelYes: 'Sim, quero remover',
            labelNo: 'Não, quero cancelar',
        }, function (result) {
            if (result) {
                fnWdkRemoveChild(event)
                if (inputFileName && inputFileDesc) {
                    removeFile(inputFileDesc)
                }
                tableLineCount(tablename)
            }
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função destroyRowDependente")
        console.error(e)
    }
}

/**
 * Retorna o índice da linha da tabela pai e filho com base em uma string que pode ser o name ou id de um campo qualquer 
 * @param {String} id Parâmetro obrigatório, id ou name de um campo qualquer da tabela pai e filho
 * @example
 * getIndice("dependenteNome___8") - Retorna o índice 8
 * @return {String}
 * @author Sérgio Machado
 */
function getIndice(id) {
    return id.split('___').pop();
}


/**
 * Insere a numeração correspondente a cada linha da tabela pai e filho de forma automática.
 * @param {String} tablename Parâmetro obrigatório, tablename da tabela pai e filho.
 * Quando informado um valor válido para tablename, o script irá percorre apenas as linhas da própia tabela.
 * Se informar o valor false para o parâmetro tablename, o script irá percorrer todas as tabelas. Recomendado apenas para o carregamento do formulário.
 * @return {void} 
 * @author Sérgio Machado
 */
function tableLineCount(tablename) {
    try {
        let atributo = "[tablename]";
        if (tablename) {
            atributo = `[tablename='${tablename}']`
        }
        $.each($(atributo), function (index) {
            const tabelaRow = $(this).find('tbody tr').not(':first');
            tabelaRow.each(function (i) {
                tabelaRow.eq(i).find('td.count').html(`<span>${i + 1}</span>`);
            });
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função tableLineCount")
        console.error(e)
    }
}



/**
 * Exemplo de validação de anexos usando o beforeSendValidate
 * Nestes exemplos abaixo eu não estou obrigando o campo do anexo, isso eu estou realizando no validateForm
 * Imagine a seguinte situação, digamos que você obrigue um determinado campo de anexo no validateForm, mas por algum motivo
 * que seja por algum erro de script ou ação de usuário, tenha removido este anexo da aba de anexos do Fluig
 * Quando chegar no validateForm ele vai deixar passar já que é analizado apenas o valor do campo
 *
 * Mas se você preferir pode realizar essa validação em eventos de processos como beforeTaskSave, inclusive eu acho a melhor alternativa
 * Apenas demonstrei aqui que também é possivel realizar essa validação direto no front-end.
 */

var beforeSendValidate = function (numState, nextState) {
    let hasError = "";

    if (numState == INICIO && nextState == APROVACAO) {
        if (invalidFile("fnRegistroNascimento")) {
            hasError += "<li style='margin-bottom: 5px;'>Anexo <b>Registro Nascimento</b> não encontrado.</li>";
        }

        hasError += invalidFilesTable("dependentes", "fnRegistroNascDep")

    }

    if (hasError) {
        let aviso = "A solicitação não pode ser enviada pois apresenta os seguintes erros:"
        let erros = `<br/><br/><ul style='padding-left: 17px;color: red;list-style: disc;'>${hasError}</ul><br/>`;
        throw (`<b>${aviso}</b>${erros}`);
    }
}
