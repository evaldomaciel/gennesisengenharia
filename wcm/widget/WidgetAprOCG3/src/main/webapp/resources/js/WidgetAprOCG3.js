let G3_ccComplete;
let G3_idWidget;
let G3_loading;
let G3_oNewWindow;
let G3_dateExcel = new Array();
let G3_mydata = new Array();
document['G3_instanceId'] = 0;
var ExportaProcessoG3 = SuperWidget.extend({
    //método iniciado quando a widget é carregada
    init: function () {
        document['G3_instanceId'] = this.instanceId;
        G3_idWidget = `ExportaProcessoG3_${this.instanceId}`;
        G3_loading = FLUIGC.loading(`#${G3_idWidget}`);
        /* this.loadTable(); */
        var mySimpleCalendar = FLUIGC.calendar('.calendar');
        this.loadAutocompleteCC();
    },

    //BIND de eventos
    bindings: {
        local: {
            'load-table': ['click_loadTable'],
            'exportar-processos': ['click_exportarProcessos']
        },
        global: {}
    },

    loadAutocompleteCC: function (htmlElement, event) {
        G3_ccComplete = FLUIGC.autocomplete(`#centroCusto_${this.instanceId}`, {
            highlight: true,
            minLength: 0,
            hint: true,
            searchTimeout: 100,
            type: 'tagAutocomplete',
            name: 'dsWidgetCCList',
            tagClass: 'tag-warning',
            // maxTags: 1,
            allowDuplicates: false,
            displayKey: 'centroCusto',
            source: {
                url: '/api/public/ecm/dataset/search?datasetId=dsWidgetCCList&searchField=centroCusto&',
                limit: 10,
                offset: 0,
                limitKey: 'limit',
                patternKey: 'searchValue',
                root: 'content'
            },
            // onMaxTags: function (item, tag) {
            //     alert('Só é permitido selecionar um único centro de custo.', 'warning');
            // },
            tagMaxWidth: 800
        }, function (err, data) {
            // something with err or data.
            if (err) {
                try {
                    errMessage = JSON.parse(err.responseText.message);
                    errMessage = errMessage.message ? err.responseText.message : err.responseText;
                } catch (e) {
                    errMessage = 'Não foi possível listar os centro de custo.';
                }
                alert(errMessage, 'danger');
            } // if
        }); // var lookup  
    },

    exportarProcessos: function (params) {
        filename = 'Relatorio.xlsx';
        var ws = XLSX.utils.json_to_sheet(G3_dateExcel);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Processos");
        XLSX.writeFile(wb, filename);
    },

    processInstanceId: function (documentId) {
        let datasetProcessAttachment = DatasetFactory.getDataset('processAttachment', new Array('processAttachmentPK.processInstanceId'), new Array(
            DatasetFactory.createConstraint('sqlLimit', '1', '1', ConstraintType.MUST),
            DatasetFactory.createConstraint('documentId', documentId, documentId, ConstraintType.MUST)
        ), null);
        if (datasetProcessAttachment.values.length > 0) return datasetProcessAttachment.values[0]["processAttachmentPK.processInstanceId"];
        else return 0
    },

    converterDataFormato: function (dataDDMMAAAA) {
        var partesData = dataDDMMAAAA.split('/');
        var dataFormatoAAAAMMDD = new Date(partesData[2], partesData[1] - 1, partesData[0]);
        var dataAAAAMMDD = dataFormatoAAAAMMDD.toISOString().slice(0, 10).replace(/-/g, '');
        return dataAAAAMMDD;
    },

    mudaStatus: function (params) {
        switch (params) {
            case "0" || 0: return "Aberta";
            case "1" || 1: return "Cancelada";
            case "2" || 2: return "Finalizada";
            default: return "Desconhecido";
        }
    },
    mudaCorStatus: function (params) {
        switch (params) {
            case "0" || 0: return "text-success";
            case "1" || 1: return "text-warning";
            case "2" || 2: return "text-danger";
            default: return params;
        }
    },

    loadTable: function (htmlElement, event) {
        G3_loading.show();
        let that = this;
        G3_dateExcel = new Array();

        let constraints = [];

        let limite = String($(`[name='limite_${this.instanceId}']`).val()).trim();
        let NUM_PROCES = String($(`[name='NUM_PROCES_${this.instanceId}']`).val()).trim();
        let idMov = String($(`[name='idMov_${this.instanceId}']`).val()).trim();
        let centroCusto = String($(`[name='centroCusto_${this.instanceId}']`).val()).trim();
        let numOs = String($(`[name='numOs_${this.instanceId}']`).val()).trim();
        let status = String($(`[name='status_${this.instanceId}']`).val()).trim();
        let produto = String($(`[name='produto_${this.instanceId}']`).val()).trim();
        let START_DATE_INI = String($(`[name='START_DATE_INI_${this.instanceId}']`).val()).trim();
        let START_DATE_FIM = String($(`[name='START_DATE_FIM_${this.instanceId}']`).val()).trim();


        if (limite != "") constraints.push(DatasetFactory.createConstraint('sqlLimit', limite, limite, ConstraintType.MUST, true));
        if (NUM_PROCES != "") constraints.push(DatasetFactory.createConstraint('NUM_PROCES', NUM_PROCES, NUM_PROCES, ConstraintType.MUST));
        if (idMov != "") constraints.push(DatasetFactory.createConstraint('idMov', idMov, idMov, ConstraintType.MUST));
        if (centroCusto != "") constraints.push(DatasetFactory.createConstraint('centroCusto', centroCusto, centroCusto, ConstraintType.MUST));
        if (numOs != "") constraints.push(DatasetFactory.createConstraint('numOs', numOs, numOs, ConstraintType.MUST));
        if (status != "") constraints.push(DatasetFactory.createConstraint('NUM_SEQ_ESTADO', status, status, ConstraintType.MUST));
        if (START_DATE_INI != "" && START_DATE_FIM != "") constraints.push(DatasetFactory.createConstraint('START_DATE', this.converterDataFormato(START_DATE_INI), this.converterDataFormato(START_DATE_FIM), ConstraintType.MUST));
        if (produto != "") constraints.push(DatasetFactory.createConstraint('produto', produto, produto, ConstraintType.MUST));
        if (constraints.length < 2) {
            FLUIGC.toast({
                title: 'Atenção: ',
                message: 'Defina, pelo menos, mais um filtro para fazer a consulta.',
                type: 'warning'
            });
            G3_loading.hide();
            return;
        }
        setTimeout(() => {
            G3_mydata = DatasetFactory.getDataset("dsWidgetAprOCG3", null, constraints, null);

            G3_mydata['values'].forEach(element => {
                G3_loading.show();
                element['CORSTATUS'] = this.mudaCorStatus(element['STATUS']);
                element['STATUS'] = this.mudaStatus(element['STATUS']);
                G3_dateExcel.push({
                    "Status da Aprovação": element['DES_ESTADO'],
                    "Data da aprovação": element['DATA_DE_APROVAO'],
                    "Data de Emissão": element['dataEmissao'],
                    "Tipo de Movimento": element['tipoMovimento'],
                    "Id. Fluig": element['NUM_PROCES'],
                    "Id. Mov": element['idMov'],
                    "Núm. Mov": element['numeroMov'],
                    "Descrição": element['CONCATENATED_VALUES'],
                    "Local do Estoque": element['localEstoque'],
                    "Centro de Custo": element['centroCusto'],
                    "Fornecedor": element['fornecedor'],
                    "Valor Liquido": element['valorLiquido'],
                    "Cod. Pagamento": element['codPagamento'],
                    "Histórico": element['historico'],
                    "Num Os": element['numOs']
                });
            });

            let tpl = $(`.template_datatable_${this.instanceId}`).html()
            let html = Mustache.render(tpl, G3_mydata);
            $(`#mypanel_${this.instanceId}`).html(html);
            G3_loading.hide();
        }, 1000);
    }
});

function verifyInputDateG3(element, tipo) {

    let START_DATE_INI = $(`[name='START_DATE_INI_${document['G3_instanceId']}']`).val()
    let START_DATE_FIM = $(`[name='START_DATE_FIM_${document['G3_instanceId']}']`).val()

    function parseDate(dateString) {
        let parts = dateString.split('/');
        let day = parseInt(parts[0], 10);
        let month = parseInt(parts[1], 10) - 1;
        let year = parseInt(parts[2], 10);

        return new Date(year, month, day);
    }

    function validateDateRange(startDate, endDate) {
        let start = parseDate(startDate);
        let end = parseDate(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return false;
        }

        let timeDiff = end.getTime() - start.getTime();
        let daysDiff = timeDiff / (1000 * 3600 * 24);

        // Retorna verdadeiro se a diferença for de no máximo 31 dias
        return daysDiff >= -31 && daysDiff <= 31;
    }

    if (tipo == "solicitacao") {
        if (START_DATE_INI != "" && START_DATE_FIM != "") {
            if (!validateDateRange(START_DATE_INI, START_DATE_FIM)) {
                alert("O intervalo das datas de início da solicitação deve ser de no máximo 31 dias.");
                element.value = ""
            }
        }
    }
}