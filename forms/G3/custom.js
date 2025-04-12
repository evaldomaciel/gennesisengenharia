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
                </button>
                <button type="button" class="btn btn-info " 
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal3"
                        onclick="ModalFD();" style="margin-left: 10px;">
                        Ficha De Demanda
                </button>
                <button type="button" class="btn btn-warning " 
                        onclick="MapaDeCotacao()" style="margin-left: 10px;">
                        Mapa De Cotação
                </button>
                `
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
    
                    var BotaoHTML = `
                <div class="d-flex gap-2 position-relative">
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

//Relatório Da Ficha de demanda
function gerarPDFFD(dadosJSON) {
    let NUMERO = "000015";
    var IDPRJ = 193;
    var CODCOLIGADA = 2; 
    var PEDIDO = NUMERO;

    var c1 = DatasetFactory.createConstraint("IDPRJ", IDPRJ, IDPRJ, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("CODCOLIGADA", CODCOLIGADA, CODCOLIGADA, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("PEDIDO", PEDIDO, PEDIDO, ConstraintType.MUST);

    var constraints = [c1, c2, c3];
    var dataset = DatasetFactory.getDataset("Ds_G3_FD_pdf", null, constraints, null);
    console.log('Dataset retornado:', dataset);

    if (dataset && dataset.values?.length > 0) {
        var linha = "";

        dataset.values.forEach((item, i) => {
            console.log(`Linha ${i}:`, item);

            const { jsPDF } = window.jspdf;
            const dados = JSON.parse(decodeURIComponent(dadosJSON));
            var teste = dados.COD_PEDIDO;
            console.log('Dados recebidos:', dados);
            console.log('Teste:', teste);
      
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: [297, 420],
                putOnlyUsedFonts: true
            });
    
            try { 
                const header = [
                    [
                        { content: "FICHA DE DEMANDA MATERIAL", colSpan: 5, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5 } },
                        { content: "CENTRAL DE CUSTOS", colSpan: 2, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5 } },
                        { content: item.CENTRO_DE_CUSTO, colSpan: 4, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5 } },
                        { content: "ESTADO", colSpan: 2, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5 } },
                        { content: item.PROJETO_ESTADO, colSpan: 2, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5 } }
                    ],
                    [
                        { content: "DESCRIÇÃO", colSpan: 1, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: item.PROJETO_DESCRICAO, colSpan: 4, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: "OS", colSpan: 2, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: item.PROJETO_COD, colSpan: 4, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: "MUNICÍPIO", colSpan: 2, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: item.PROJETO_MUNICIPIO, colSpan: 2, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5} }
                    ],
                    [
                        { content: "DATA SOLICITAÇÃO", colSpan: 1, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: item.RM_DATA_CRIACAO, colSpan: 1, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: "DATA ATENDIMENTO", colSpan: 2, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: item.RM_DATA_NECESSIDADE, colSpan: 2, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: "RESPONSÁVEL", colSpan: 2, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: "PROJETO_RESPONSAVEL", colSpan: 5, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: "RUA", colSpan: 2, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: "PROJETO_RUA", colSpan: 2, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5} }
                    ],
                    [
                        { content: "ITEM", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: "SERVIÇO", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: "PRODUTO", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: "UN INS", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: "QUANT ORÇADA", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: "PREÇO UNT ORÇ", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: "SUBTOTAL ORÇ", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: "PEDIDO", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: "TIPO MOV", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: "CUSTO UNT", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: "UN PRD", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: "QUANT COMPRA", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} },
                        { content: "SUBTOTAL COMPRA", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: "(%COMPRA/ORÇADO)", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} }, 
                        { content: "%INSUMO COMP/INSUMO ORÇ", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} }
                    ]
                ];

            
                const groupedItems = dataset.values.reduce((acc, item) => {
                   
                    if (item.TAREFA_COD) {
                        const tarefaRow = [
                            { content: item.TAREFA_COD ?? "", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} },
                            { content: item.NOME_TAREFA ?? "", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} },
                            { content: "", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} },
                            { content: item.TAREFA_UNIDADE ?? "", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} },
                            { content: item.TAREFA_QUANTIDADE ?? "", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} },
                            { content: item.TAREFA_VALOR_UNITARIO ?? "", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} },
                            { content: item.TAREFA_VALOR_FATURAMENTO ?? "", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} },
                            { content: "", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} },
                            { content: "", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} },
                            { content: "", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} },
                            { content: "", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} },
                            { content: "", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} },
                            { content: item.OC_TOTAL_TAREFA ?? "", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} },
                            { content: "", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} },
                            { content: "", colSpan: 1, styles: { halign: "center", fillColor: [128, 128, 128], textColor: [0,0,0], lineWidth: 0.5} }
                        ];
                        acc.tarefas.push(tarefaRow);
                    }

                    if (item.INSUMO_COD) {
                        const insumoRow = [
                            item.INSUMO_COD ?? "N/A",
                            item.INSUMO_NOME ?? "N/A",
                            item.PRODUTO_PEDIDO ?? "N/A",
                            item.INSUMO_UNIDADE ?? "N/A",
                            item.QTDENECESSIDADE ?? "N/A",
                            { content: item.INSUMO_VALOR ?? "", colSpan: 1, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5}},
                            { content: item.INSUMO_FATURAMENTO ?? "", colSpan: 1, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5}},
                            item.CODIGO_PEDIDO ?? "N/A",
                            item.SERIE ?? "N/A",
                            item.OC_VALOR_UNITARIO ?? "N/A",
                            item.PRODUTO_OC_UND ?? "N/A",
                            item.OC_QUANTIDADE ?? "N/A",
                            item.OC_VALORTOTAL_ITEM ?? "N/A",
                            { content: dados.CODGIS ?? "", colSpan: 1, styles: { halign: "center", fillColor: [255, 255, 255], textColor: [0,0,0], lineWidth: 0.5}}
                        ];
                        acc.insumos.push(insumoRow);
                    }

                    return acc;
                }, { tarefas: [], insumos: [] });

                const body = [...groupedItems.tarefas, ...groupedItems.insumos];
                console.log('Body completo:', body);

                doc.autoTable({
                    head: header,
                    body: body,
                    startY: 20,
                    theme: "grid",
                    styles: { 
                        fontSize: 8,
                        cellPadding: 2,
                        overflow: 'linebreak',
                        cellWidth: 'auto'
                    },
                    columnStyles: {
                        0: {cellWidth: 20}, 
                        1: {cellWidth: 40}, 
                        2: {cellWidth: 40}, 
                        3: {cellWidth: 15}, 
                        4: {cellWidth: 25}, 
                        5: {cellWidth: 25}, 
                        6: {cellWidth: 25}, 
                        7: {cellWidth: 20}, 
                        8: {cellWidth: 20}, 
                        9: {cellWidth: 25}, 
                        10: {cellWidth: 15},
                        11: {cellWidth: 25},
                        12: {cellWidth: 30},
                        13: {cellWidth: 30},
                        14: {cellWidth: 30} 
                    },
                    headStyles: { 
                        fillColor: [220, 220, 220],
                        fontSize: 8
                    },
                    showHead: 'firstPage',
                    margin: { left: 10, right: 10 }
                });

                const pdfBlob = doc.output('blob');
                const pdfUrl = URL.createObjectURL(pdfBlob);
                
                const width = window.innerWidth * 0.95; 
                const height = window.innerHeight * 0.95; 
                const features = `width=${width},height=${height},scrollbars=yes,resizable=yes,status=no,location=no,toolbar=no,menubar=no`;
                window.open(pdfUrl, '_blank', features);
            } catch (error) {
                console.error("Erro ao gerar PDF", error);
                alert("Erro ao carregar dados. Verifique o console");
            }
        });
    }
}

function ModalFD(index) {
    try {
       // let NUMERO = "000010";
        var IDMOV = 46786;
        var Coligada = 2; 
       // var CODIGO = NUMERO;
       
        $("#itemTableBody3").empty(); 

        var c1 = DatasetFactory.createConstraint("IDMOV", IDMOV, IDMOV, ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("COLIGADA", Coligada, Coligada, ConstraintType.MUST);
       // var c3 = DatasetFactory.createConstraint("CODIGO", CODIGO, CODIGO, ConstraintType.MUST);

        var constraints = [c1, c2];
        var dataset = DatasetFactory.getDataset("Ds_G3FD", null, constraints, null);
        console.log('Dataset retornado:', dataset);

        if (dataset && dataset.values?.length > 0) {
            var rows = "";

            dataset.values.forEach((item, i) => {
                console.log(`Linha ${i}:`, item);

                var Coligada = item.COLIGADA ?? "";
                var ID_PROJETO = item.ID_PROJETO ?? "";
                var COD_PROJETO = item.COD_PEDIDO ?? "";
                var TIPO_DE_PEDIDO = item.TIPO_DE_PEDIDO ?? "";
                var N_OS = item.N_OS ?? "";
                var RM_FATURAMENTO_DO_SERVIÇO = item.RM_FATURAMENTO_DO_SERVIÇO ?? "";
                var SEP_ID_MOV = item.SP_ID_MOV ?? "";
                var SEP_DATA_DA_EMISSAO = item.SEP_DATA_DA_EMISSAO ?? "";
                var SC_DATA_CRIAÇÃO = item.SC_DATA_CRIAÇÃO ?? "";
                var SC_ID_MOV = item.SC_ID_MOV ?? "";
                var OC_DATA_DE_EMISSAO = item.OC_DATA_DE_EMISSAO ?? "";
                var OC_ID_MOV = item.OC_ID_MOV ?? "";
                var DATA_DE_VENCIMENTO = item.DATA_DE_VENCIMENTO ?? "";
                var ID_NF = item.ID_NF ?? ""
    
                var botaoHTML = `
                    <button class="btn btn-sm btn-danger" 
                            onclick="gerarPDFFD(decodeURIComponent('${encodeURIComponent(JSON.stringify(item))}'))" style="margin-top: 10px; heigth: 5px; width: 90px;">
                        <i class="fa fa-file-pdf"></i> Acessar FD
                    </button>
                `;
                
                rows += `
                    <tr style="text-align: center; vertical-align: middle;">
                        <td>${Coligada}</td>
                        <td>${ID_PROJETO}</td>
                        <td>${COD_PROJETO}</td>
                        <td>${TIPO_DE_PEDIDO}</td>
                        <td>${N_OS}</td>
                        <td>${RM_FATURAMENTO_DO_SERVIÇO}</td>
                        
                        <td>${botaoHTML}</td>
                    </tr>
                `;
            });

            if (rows.trim() !== "") {
                $("#itemTableBody3").append(rows);
                console.log("Dados adicionados à tabela com sucesso.");
            } 
        } 
    } catch (e) {
        console.error("Erro na função DetalharValor: ", e);
    }
}

async function MapaDeCotacao() {
    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet("Mapa de Cotação"); 

    const imageUrl1 = "data:image/png;base64,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"; 
    const imageUrl2 = "data:image/png;base64,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";

    const response1 = await fetch(imageUrl1);
    const imageBuffer1 = await response1.arrayBuffer();
    const imageId1 = workbook.addImage({
        buffer: imageBuffer1,
        extension: "png"
    });

    const response2 = await fetch(imageUrl2);
    const imageBuffer2 = await response2.arrayBuffer();
    const imageId2 = workbook.addImage({
        buffer: imageBuffer2,
        extension: "png"
    });

    worksheet.addImage(imageId1, {
        tl: { col: 0, row: 0 }, // EngPac
        ext: { width: 75, height: 75 }
    });

    worksheet.addImage(imageId2, {
        tl: { col: 3, row: 0 }, // Gennêsis
        ext: { width: 75, height: 75 }
    });

    worksheet.getCell("A5").value = "ENGPAC, ENGENHARIA DE AVALIAÇÕES, PERÍCIAS E CONSTRUÇÕES LTDA";
    worksheet.getCell("A5").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("A5").font = { bold: true, size: 12 };
    worksheet.getCell("A6").value = "Número da SC:";
    worksheet.getCell("A6").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("A6").font = { bold: true, size: 12, color: { argb: "FFFFFF" } };
    worksheet.getCell("A6").fill = { 
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "006663" } 
    };
    worksheet.getCell("A7").fill = { 
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "708090" } 
    };
    worksheet.getCell("I7").fill = { 
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "C10000" } 
    };
    worksheet.getCell("L7").fill = { 
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "EB7034" } 
    };
    worksheet.getCell("O7").fill = { 
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "C10000" } 
    };
    worksheet.getCell("R7").fill = { 
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "C10000" } 
    };
    worksheet.getCell("G1").value = "Setor de suprimentos mapa comparativo de preços";
    worksheet.getCell("G1").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("G1").font = { bold: true, size: 12, color: { argb: "000000" } };
    worksheet.getCell("G1").fill = { 
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "006663" } 
    };
    


    worksheet.getCell("A8").value = "DESCRIÇÃO";
    worksheet.getCell("A8").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("A8").font = { bold: true, size: 10, color: { argb: "FFFFFF" } };

    worksheet.getCell("G8").value = "UND";
    worksheet.getCell("G8").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("G8").font = { bold: true, size: 10, color: { argb: "FFFFFF" } };

    worksheet.getCell("H8").value = "Quantidade";
    worksheet.getCell("H8").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("H8").font = { bold: true, size: 10, color: { argb: "FFFFFF" } };

    
    worksheet.getCell("A8").fill = { 
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "006663" } 
    };
    worksheet.getCell("G8").fill = { 
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "006663" } 
    };
    worksheet.getCell("H8").fill = { 
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "006663" } 
    };

    worksheet.getCell("I6").value = "Centro de Custo";
    worksheet.getCell("I6").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("I6").font = { bold: true, size: 12, color: { argb: "FFFFFF" } };
    worksheet.getCell("I6").fill = { 
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "006663" } 
    };
    worksheet.getCell("I5").fill = { 
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "006663" } 
    };
    
    worksheet.getCell("L6").fill = { 
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "DAD8D9" } 
    };
    worksheet.getCell("I9").value = "Vlr Unit R$";
    worksheet.getCell("I9").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("I9").font = { bold: true, size: 10, color: { argb: "000000" } };

    worksheet.getCell("J9").value = " Desc %";
    worksheet.getCell("J9").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("J9").font = { bold: true, size: 10, color: { argb: "000000" } };

    worksheet.getCell("K9").value = " QTDE";
    worksheet.getCell("K9").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("K9").font = { bold: true, size: 10, color: { argb: "000000" } };

    worksheet.getCell("L9").value = "Vlr Total R$";
    worksheet.getCell("L9").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("L9").font = { bold: true, size: 10, color: { argb: "000000" } };

    worksheet.getCell("M9").value = "Vlr Unit R$";
    worksheet.getCell("M9").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("M9").font = { bold: true, size: 10, color: { argb: "000000" } };

    worksheet.getCell("N9").value = " Desc %";
    worksheet.getCell("N9").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("N9").font = { bold: true, size: 10, color: { argb: "000000" } };

    worksheet.getCell("O9").value = "QTDE";
    worksheet.getCell("O9").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("O9").font = { bold: true, size: 10, color: { argb: "000000" } };

    worksheet.getCell("P9").value = "Vlr Total R$";
    worksheet.getCell("P9").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("P9").font = { bold: true, size: 10, color: { argb: "000000" } };

    worksheet.getCell("Q9").value = " Vlr Unit R$";
    worksheet.getCell("Q9").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("Q9").font = { bold: true, size: 10, color: { argb: "000000" } };

    worksheet.getCell("R9").value = "Desc %";
    worksheet.getCell("R9").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("R9").font = { bold: true, size: 10, color: { argb: "000000" } };

    worksheet.getCell("S9").value = "QTDE";
    worksheet.getCell("S9").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("S9").font = { bold: true, size: 10, color: { argb: "000000" } };

    worksheet.getCell("T9").value = " Vlr Total R$ ";
    worksheet.getCell("T9").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("T9").font = { bold: true, size: 10, color: { argb: "000000" } };

    worksheet.getCell("U9").value = "Vlr Unit R$";
    worksheet.getCell("U9").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("U9").font = { bold: true, size: 10, color: { argb: "000000" } };

    worksheet.getCell("V9").value = "Desc %";
    worksheet.getCell("V9").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("V9").font = { bold: true, size: 10, color: { argb: "000000" } };

    worksheet.getCell("W9").value = "QTDE";
    worksheet.getCell("W9").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("W9").font = { bold: true, size: 10, color: { argb: "000000" } };

    worksheet.getCell("X9").value = "Vlr Total R$";
    worksheet.getCell("X9").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("X9").font = { bold: true, size: 10, color: { argb: "000000" } };

    worksheet.getCell("Y9").value = "Vlr Unit R$";
    worksheet.getCell("Y9").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("Y9").font = { bold: true, size: 10, color: { argb: "000000" } };

    worksheet.getCell("Z9").value = "Desc %";
    worksheet.getCell("Z9").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("Z9").font = { bold: true, size: 10, color: { argb: "000000" } };

    worksheet.getCell("AA9").value = "QTDE";
    worksheet.getCell("AA9").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("AA9").font = { bold: true, size: 10, color: { argb: "000000" } };

    worksheet.getCell("AB9").value = "Vlr Total R$";
    worksheet.getCell("AB9").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("AB9").font = { bold: true, size: 10, color: { argb: "000000" } };
   

    worksheet.getCell("M8").value = "Campo Dinâmico";
    worksheet.getCell("M8").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("M8").font = { bold: true, size: 10, color: { argb: "000000" } };
    worksheet.getCell("M8").fill = { 
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "DAD8D9" } 
    };
    worksheet.getCell("Q8").value = "Campo Dinâmico";
    worksheet.getCell("Q8").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("Q8").font = { bold: true, size: 10, color: { argb: "000000" } };
    worksheet.getCell("Q8").fill = { 
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "DAD8D9" } 
    };

    worksheet.getCell("U8").value = "Campo Dinâmico";
    worksheet.getCell("U8").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("U8").font = { bold: true, size: 10, color: { argb: "000000" } };
    worksheet.getCell("U8").fill = { 
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "DAD8D9" } 
    };
    worksheet.getCell("Y8").value = "Campo Dinâmico";
    worksheet.getCell("Y8").alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getCell("Y8").font = { bold: true, size: 10, color: { argb: "000000" } };
    worksheet.getCell("Y8").fill = { 
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "DAD8D9" } 
    };
    

    worksheet.mergeCells('A1:F4');
    worksheet.mergeCells('G1:AB4');
    worksheet.mergeCells('A5:H5');
    worksheet.mergeCells('A6:F6');
    worksheet.mergeCells('A7:H7');
    worksheet.mergeCells('I6:K6');
    worksheet.mergeCells('I5:AB5');
    worksheet.mergeCells('I7:L7');
    worksheet.mergeCells('L6:AB6');
    worksheet.mergeCells('I8:L8');
    worksheet.mergeCells('M7:P7');
    worksheet.mergeCells('M8:P8');
    worksheet.mergeCells('Q7:T7');
    worksheet.mergeCells('Q8:T8');
    worksheet.mergeCells('U7:X7');
    worksheet.mergeCells('U8:X8');
    worksheet.mergeCells('Y7:AB7');
    worksheet.mergeCells('Y8:AB8');
    worksheet.mergeCells('A8:F9');
    worksheet.mergeCells('G8:G9');
    worksheet.mergeCells('G6:H6');
    worksheet.mergeCells('H8:H9');

    let range = [
        "A1:F4", "G1:Y4", "A5:H5", "A6:F6", "A7:H7", "I7:K7",
        "I8:K8", "L7:N7", "L8:N8", "O7:Q7", "O8:Q8", "R7:T7",
        "R8:T8", "A8:F9", "G8:G9", "H8:H9", "A12:H12", "A13:H13",
        "A14:H14", "A15:H15", "A16:H16", "A17:H17", "A18:H18",
        "A19:H19", "A20:H20", "A21:H21", "A22:H27","I9", "J9", "K9",
        "L9", "M9", "N9", "O9", "P9", "Q9", "R9", "S9", "T9",
        "A10","B10","C10","D10","E10","F10","G10","H10",
        "I10","J10","K10","L10","M10","N10","O10","P10",
        "U7:X7", "U8:X8", "Y7:AB7", "Y8:AB8","U9","V9","W9",
        "X9","Y9","Z9","AA9","AB9","L6:AB6", "I6:K6",
        "I5:AB5", "G6:H6",

    ];
    range.forEach(cell => {
        worksheet.getCell(cell).border = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" }
        };
    });
   
        var numero = "000001";
        var COTACAO_PARTE1 = 2023;
        var COTACAO_PARTE2 = numero;

        var Filtro1 = DatasetFactory.createConstraint("COTACAO_PARTE1", COTACAO_PARTE1, COTACAO_PARTE1, ConstraintType.MUST);
        var Filtro2 = DatasetFactory.createConstraint("COTACAO_PARTE2", COTACAO_PARTE2, COTACAO_PARTE2, ConstraintType.MUST);

        var filtros = [Filtro1, Filtro2];
        var Dataset = DatasetFactory.getDataset("Ds_G3MapaCotacao", null, filtros, null);

        if (Dataset && Dataset.values?.length > 0) {
            let linhaAtual = 10;
            Dataset.values.forEach((item) => {

                worksheet.getCell("I8").value = Dataset.values[1]?.FORNECEDOR_1 || "CAMPO SEM VALOR";
                worksheet.getCell("I8").alignment = { horizontal: "center", vertical: "middle" };
                worksheet.getCell("I8").font = { bold: true, size: 10, color: { argb: "000000" } };
                worksheet.getCell("I8").fill = { 
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "DAD8D9" } 
                };

                worksheet.getCell("I7").value = Dataset.values[0]?.TIPO_FORNECEDOR_1 || "CAMPO SEM VALOR";
                worksheet.getCell("I7").alignment = { horizontal: "center", vertical: "middle", color: { argb: "FFFFFF" }};
                worksheet.getCell("I7").fill = { 
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "C20000" } 
                };
            
                worksheet.getCell("M7").value = Dataset.values[0]?.TIPO_FORNECEDOR_2 || "CAMPO SEM VALOR";
                worksheet.getCell("M7").alignment = { horizontal: "center", vertical: "middle", color: { argb: "FFFFFF" } };
                worksheet.getCell("M7").fill = { 
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "E97131" } 
                };
            
                worksheet.getCell("Q7").value = Dataset.values[0]?.TIPO_FORNECEDOR_3 || "CAMPO SEM VALOR";
                worksheet.getCell("Q7").alignment = { horizontal: "center", vertical: "middle", color: { argb: "FFFFFF" } };
                worksheet.getCell("Q7").fill = { 
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "C20000" } 
                };
            
                worksheet.getCell("U7").value = Dataset.values[0]?.TIPO_FORNECEDOR_4 || "CAMPO SEM VALOR";
                worksheet.getCell("U7").alignment = { horizontal: "center", vertical: "middle", color: { argb: "FFFFFF" } };
                worksheet.getCell("U7").fill = { 
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "C20000" } 
                };
            
                worksheet.getCell("Y7").value = Dataset.values[0]?.TIPO_FORNECEDOR_5 || "CAMPO SEM VALOR";
                worksheet.getCell("Y7").alignment = { horizontal: "center", vertical: "middle", color: { argb: "FFFFFF" } };
                worksheet.getCell("Y7").fill = { 
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "C20000" } 
                };
        
                worksheet.mergeCells(`A${linhaAtual}:F${linhaAtual}`);
                
                const celulaDescricao = worksheet.getCell(`B${linhaAtual}`);
                const celulaUND = worksheet.getCell(`G${linhaAtual}`);
                const celulaQUANTIDADE = worksheet.getCell(`H${linhaAtual}`);
                const celulaVlrUnit1 = worksheet.getCell(`I${linhaAtual}`);
                const celulaVlrUnit2 = worksheet.getCell(`M${linhaAtual}`);
                const celulaVlrUnit3 = worksheet.getCell(`Q${linhaAtual}`);
                const celulaVlrUnit4 = worksheet.getCell(`U${linhaAtual}`);
                const celulaVlrUnit5 = worksheet.getCell(`Y${linhaAtual}`);
                const celulaDesc1 = worksheet.getCell(`J${linhaAtual}`);
                const celulaDesc2 = worksheet.getCell(`N${linhaAtual}`);
                const celulaDesc3 = worksheet.getCell(`R${linhaAtual}`);
                const celulaDesc4 = worksheet.getCell(`V${linhaAtual}`);
                const celulaDesc5 = worksheet.getCell(`Z${linhaAtual}`);
                const celulaQTDE1 = worksheet.getCell(`K${linhaAtual}`);
                const celulaQTDE2 = worksheet.getCell(`O${linhaAtual}`);
                const celulaQTDE3 = worksheet.getCell(`S${linhaAtual}`);
                const celulaQTDE4 = worksheet.getCell(`W${linhaAtual}`);
                const celulaQTDE5 = worksheet.getCell(`AA${linhaAtual}`);
                const celulaTotal1 = worksheet.getCell(`L${linhaAtual}`);
                const celulaTotal2 = worksheet.getCell(`P${linhaAtual}`);
                const celulaTotal3 = worksheet.getCell(`T${linhaAtual}`);
                const celulaTotal4 = worksheet.getCell(`X${linhaAtual}`);
                const celulaTotal5 = worksheet.getCell(`AB${linhaAtual}`);
               

                celulaDescricao.value = item.DESCRICAO_PRODUTO ?? "SEM VALOR";
                celulaUND.value = item.UNIDADE ?? "SEM VALOR";
                celulaQUANTIDADE.value = item.QUANTIDADE_NEGOCIADA ?? "SEM VALOR";
                celulaVlrUnit1.value = item.V_UNITARIO_1 ?? "SEM VALOR";
                celulaVlrUnit2.value = item.V_UNITARIO_2 ?? "SEM VALOR";
                celulaVlrUnit3.value = item.V_UNITARIO_3 ?? "SEM VALOR";
                celulaVlrUnit4.value = item.V_UNITARIO_4 ?? "SEM VALOR";
                celulaVlrUnit5.value = item.V_UNITARIO_5 ?? "SEM VALOR";
                celulaDesc1.value = item.DESCONTO_1 ?? "SEM VALOR";
                celulaDesc2.value = item.DESCONTO_2 ?? "SEM VALOR";
                celulaDesc3.value = item.DESCONTO_3 ?? "SEM VALOR";
                celulaDesc4.value = item.DESCONTO_4 ?? "SEM VALOR";
                celulaDesc5.value = item.DESCONTO_5 ?? "SEM VALOR";
                celulaQTDE1.value = item.QUANTIDADE_1 ?? "SEM VALOR";
                celulaQTDE2.value = item.QUANTIDADE_2 ?? "SEM VALOR";
                celulaQTDE3.value = item.QUANTIDADE_3 ?? "SEM VALOR";
                celulaQTDE4.value = item.QUANTIDADE_4 ?? "SEM VALOR";
                celulaQTDE5.value = item.QUANTIDADE_5 ?? "SEM VALOR";
                celulaTotal1.value = item.V_TOTAL_1 ?? "SEM VALOR";
                celulaTotal2.value = item.V_TOTAL_2 ?? "SEM VALOR";
                celulaTotal3.value = item.V_TOTAL_3 ?? "SEM VALOR";
                celulaTotal4.value = item.V_TOTAL_4 ?? "SEM VALOR";
                celulaTotal5.value = item.V_TOTAL_5 ?? "SEM VALOR";
               
                
                celulaDescricao.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaDescricao.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaDescricao.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };

                celulaUND.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaUND.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaUND.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };

                celulaQUANTIDADE.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaQUANTIDADE.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaQUANTIDADE.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };
                
                celulaVlrUnit1.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaVlrUnit1.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaVlrUnit1.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };
                
                celulaVlrUnit2.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaVlrUnit2.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaVlrUnit2.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };

                celulaVlrUnit3.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaVlrUnit3.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaVlrUnit3.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };

                celulaVlrUnit4.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaVlrUnit4.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaVlrUnit4.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };

                celulaVlrUnit5.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaVlrUnit5.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaVlrUnit5.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };

                celulaDesc1.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaDesc1.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaDesc1.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };

                celulaDesc2.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaDesc2.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaDesc2.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };

                celulaDesc3.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaDesc3.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaDesc3.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };

                celulaDesc4.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaDesc4.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaDesc4.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };

                celulaDesc5.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaDesc5.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaDesc5.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };

                celulaQTDE1.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaQTDE1.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaQTDE1.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };

                celulaQTDE2.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaQTDE2.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaQTDE2.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };

                celulaQTDE3.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaQTDE3.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaQTDE3.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };

                celulaQTDE4.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaQTDE4.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaQTDE4.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };

                celulaQTDE5.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaQTDE5.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaQTDE5.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };
                celulaTotal1.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaTotal1.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaTotal1.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };

                celulaTotal2.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaTotal2.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaTotal2.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };

                celulaTotal3.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaTotal3.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaTotal3.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };

                celulaTotal4.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaTotal4.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaTotal4.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };

                celulaTotal5.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFFFF" }
                };
                celulaTotal5.alignment = {
                    horizontal: "left",
                    vertical: "middle",
                    wrapText: true
                };
                celulaTotal5.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };
                
                linhaAtual++;
            });

            const totaisDeFretes = {
                frete1: Dataset.values.reduce((sum, item) => sum + (Number(item.FRETE_1) || 0), 0),
                frete2: Dataset.values.reduce((sum, item) => sum + (Number(item.FRETE_2) || 0), 0),
                frete3: Dataset.values.reduce((sum, item) => sum + (Number(item.FRETE_3) || 0), 0),
                frete4: Dataset.values.reduce((sum, item) => sum + (Number(item.FRETE_4) || 0), 0),
                frete5: Dataset.values.reduce((sum, item) => sum + (Number(item.FRETE_5) || 0), 0),
            };
            const Totaisdescontos = {
                Desconto1: Dataset.values.reduce((sum, item) => sum + (Number(item.DESCONTO_1) || 0), 0),
                Desconto2: Dataset.values.reduce((sum, item) => sum + (Number(item.DESCONTO_2) || 0), 0),
                Desconto3: Dataset.values.reduce((sum, item) => sum + (Number(item.DESCONTO_3) || 0), 0),
                Desconto4: Dataset.values.reduce((sum, item) => sum + (Number(item.DESCONTO_4) || 0), 0),
                Desconto5: Dataset.values.reduce((sum, item) => sum + (Number(item.DESCONTO_5) || 0), 0),
            };
            const TotaisDeCadaIten = {
                Item1: Dataset.values.reduce((sum, item) => sum + (Number(item.V_UNITARIO_1) || 0), 0),
                Item2: Dataset.values.reduce((sum, item) => sum + (Number(item.V_UNITARIO_2) || 0), 0),
                Item3: Dataset.values.reduce((sum, item) => sum + (Number(item.V_UNITARIO_3) || 0), 0),
                Item4: Dataset.values.reduce((sum, item) => sum + (Number(item.V_UNITARIO_4) || 0), 0),
                Item5: Dataset.values.reduce((sum, item) => sum + (Number(item.V_UNITARIO_5) || 0), 0),
            };
        
            const camposFinanceiros = [
                { 
                    label: "Valor Total desconto", 
                    row: linhaAtual++,
                    hasValues: true,
                    values: {
                        Desconto1: Totaisdescontos.Desconto1,
                        Desconto2: Totaisdescontos.Desconto2,
                        Desconto3: Totaisdescontos.Desconto3,
                        Desconto4: Totaisdescontos.Desconto4,
                        Desconto5: Totaisdescontos.Desconto5,
                    }
                },
                { label: "Valor do frete (R$)", 
                    row: linhaAtual++,
                    hasValues: true,
                    values: {
                        ColI: totaisDeFretes.frete1,
                        ColM: totaisDeFretes.frete2,
                        ColQ: totaisDeFretes.frete3,
                        ColU: totaisDeFretes.frete4,
                        ColY: totaisDeFretes.frete5
                    } 
                },
                { label: "Somatorio dos valores de cada item", 
                        row: linhaAtual++, 
                        hasValues: true, 
                        values: {
                        Item1: TotaisDeCadaIten.Item1,
                        Item2: TotaisDeCadaIten.Item2,
                        Item3: TotaisDeCadaIten.Item3,
                        Item4: TotaisDeCadaIten.Item4,
                        Item5: TotaisDeCadaIten.Item5
                    }
                 },
                { label: "Condição de pagamento (R$)", row: linhaAtual++, hasValues: false, value: "" },
                { label: "Tipo de frete (CIF/FOB)", row: linhaAtual++, hasValues: false, value: "" },
                { label: "Prazo de entrega", row: linhaAtual++, hasValues: false, value: "" },
                { label: "Nome Vendedor", row: linhaAtual++, hasValues: false, value: "" },
                { label: "Contato do vendedor (+55)", row: linhaAtual++, hasValues: false, value: "" },
            ];
    
            camposFinanceiros.forEach(campo => {
            
                worksheet.mergeCells(`A${campo.row}:H${campo.row}`);
                worksheet.mergeCells(`I${campo.row}:L${campo.row}`);
                worksheet.mergeCells(`M${campo.row}:P${campo.row}`);
                worksheet.mergeCells(`Q${campo.row}:T${campo.row}`);
                worksheet.mergeCells(`U${campo.row}:X${campo.row}`);
                worksheet.mergeCells(`Y${campo.row}:AB${campo.row}`);

                const desconto = worksheet.getCell(`B${campo.row}`);
                const descontoI = worksheet.getCell(`I${campo.row}`);  
                const descontoM = worksheet.getCell(`M${campo.row}`);
                const descontoQ = worksheet.getCell(`Q${campo.row}`);
                const descontoU = worksheet.getCell(`U${campo.row}`);
                const descontoY = worksheet.getCell(`Y${campo.row}`);
                
                const celula = worksheet.getCell(`B${campo.row}`);
                const celulaColI = worksheet.getCell(`I${campo.row}`);  
                const celulaColM = worksheet.getCell(`M${campo.row}`);
                const celulaColQ = worksheet.getCell(`Q${campo.row}`);
                const celulaColU = worksheet.getCell(`U${campo.row}`);
                const celulaColY = worksheet.getCell(`Y${campo.row}`);

                const item = worksheet.getCell(`B${campo.row}`);
                const itemI = worksheet.getCell(`I${campo.row}`);  
                const itemM = worksheet.getCell(`M${campo.row}`);
                const itemQ = worksheet.getCell(`Q${campo.row}`);
                const itemU = worksheet.getCell(`U${campo.row}`);
                const itemY = worksheet.getCell(`Y${campo.row}`);

                celula.value = campo.label;
                celula.alignment = { horizontal: "right", vertical: "middle" };

                if (campo.hasValues) {
                    celulaColI.value = campo.values.ColI;
                    celulaColM.value = campo.values.ColM;
                    celulaColQ.value = campo.values.ColQ;
                    celulaColU.value = campo.values.ColU;
                    celulaColY.value = campo.values.ColY;

                }else if (campo.value !== undefined) {
                
                    celulaColI.value = campo.value;
                }

                if( campo.label === "Somatorio dos valores de cada item") {
                    itemI.value = campo.values.Item1;
                    itemM.value = campo.values.Item2;
                    itemQ.value = campo.values.Item3;
                    itemU.value = campo.values.Item4;
                    itemY.value = campo.values.Item5;
                }
                if( campo.label === "Valor Total desconto") {
                    descontoI.value = campo.values.Desconto1;
                    descontoM.value = campo.values.Desconto2;
                    descontoQ.value = campo.values.Desconto3;
                    descontoU.value = campo.values.Desconto4;
                    descontoY.value = campo.values.Desconto5;
                }
                if (campo.label === "Nome Vendedor") {
                    celulaColI.value = Dataset.values[1]?.VENDEDOR_1 || "Valor não encontrado"; 
                    celulaColM.value = Dataset.values[1]?.VENDEDOR_2 || "Valor não encontrado"; 
                    celulaColQ.value = Dataset.values[1]?.VENDEDOR_3 || "Valor não encontrado"; 
                    celulaColU.value = Dataset.values[1]?.VENDEDOR_4 || "Valor não encontrado"; 
                    celulaColY.value = Dataset.values[1]?.VENDEDOR_5 || "Valor não encontrado"; 
                } 
                if (campo.label === "Contato do vendedor (+55)") {
                    celulaColI.value = Dataset.values[1]?.TELEFONE_1 || "Valor não encontrado"; 
                    celulaColM.value = Dataset.values[1]?.TELEFONE_2 || "Valor não encontrado"; 
                    celulaColQ.value = Dataset.values[1]?.TELEFONE_3 || "Valor não encontrado"; 
                    celulaColU.value = Dataset.values[1]?.TELEFONE_4 || "Valor não encontrado"; 
                    celulaColY.value = Dataset.values[1]?.TELEFONE_5 || "Valor não encontrado"; 
                } 
                if (campo.label === "Prazo de entrega") {
                    celulaColI.value = Dataset.values[1]?.PRAZO_1 || "Valor não encontrado"; 
                    celulaColM.value = Dataset.values[1]?.PRAZO_2 || "Valor não encontrado"; 
                    celulaColQ.value = Dataset.values[1]?.PRAZO_3 || "Valor não encontrado"; 
                    celulaColU.value = Dataset.values[1]?.PRAZO_4 || "Valor não encontrado"; 
                    celulaColY.value = Dataset.values[1]?.PRAZO_5 || "Valor não encontrado"; 
                } 
                if (campo.label === "Tipo de frete (CIF/FOB)") {
                    celulaColI.value = Dataset.values[1]?.FRETE_1 || "Valor não encontrado"; 
                    celulaColM.value = Dataset.values[1]?.FRETE_2 || "Valor não encontrado"; 
                    celulaColQ.value = Dataset.values[1]?.FRETE_3 || "Valor não encontrado"; 
                    celulaColU.value = Dataset.values[1]?.FRETE_4 || "Valor não encontrado"; 
                    celulaColY.value = Dataset.values[1]?.FRETE_5 || "Valor não encontrado"; 
                } 
                if (campo.label === "Condição de pagamento (R$)") {
                    celulaColI.value = Dataset.values[1]?.TIPO_PAGAMENTO_1 || "Valor não encontrado"; 
                    celulaColM.value = Dataset.values[1]?.TIPO_PAGAMENTO_2 || "Valor não encontrado"; 
                    celulaColQ.value = Dataset.values[1]?.TIPO_PAGAMENTO_3 || "Valor não encontrado"; 
                    celulaColU.value = Dataset.values[1]?.TIPO_PAGAMENTO_4 || "Valor não encontrado"; 
                    celulaColY.value = Dataset.values[1]?.TIPO_PAGAMENTO_5 || "Valor não encontrado"; 
                } 
                if (campo.label === "Somatorio dos valores de cada iten") {
                    celula.font = { bold: true, color: { argb: "FFFFFF" } };
                    celula.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "006663" } };
                } else {
                    celula.font = { bold: true, color: { argb: "000000" } };
                    celula.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "DAD8D9" } };
                }
                
                celula.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };
                celulaColI.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };
                celulaColM.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };
                celulaColQ.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };
                celulaColU.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };
                celulaColY.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" }
                };
            });
    
            /*worksheet.mergeCells(`B${linhaAtual}:H${linhaAtual+5}`); 
            worksheet.mergeCells(`I${linhaAtual-1}:K${linhaAtual+5}`);
            worksheet.mergeCells(`L${linhaAtual-1}:N${linhaAtual+5}`);
            worksheet.mergeCells(`O${linhaAtual-1}:Q${linhaAtual+5}`);
            worksheet.mergeCells(`R${linhaAtual-1}:T${linhaAtual+5}`); */
        }
    

        workbook.xlsx.writeBuffer().then((buffer) => {
            let blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            let link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "MapaDeCotacao.xlsx";
            link.click();
        });
    }