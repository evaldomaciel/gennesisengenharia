function createDataset(fields, constraints, sortFields) {
    try {
        var filterDef = [];
        var filterValue = [];
        var filter = [];
        if (constraints != null) {
            for (var index = 0; index < constraints.length; index++) {
                var element = constraints[index];
                var fieldName = String(element.fieldName).toUpperCase();
                var initialValue = element.initialValue;
                if (fieldName == "CODCOLIGADA") filterDef.push('GFILIAL.CODCOLIGADA=:CODCOLIGADA'), filterValue.push(initialValue);
                if (fieldName == "CODFILIAL") filterDef.push('GFILIAL.CODFILIAL=:CODFILIAL'), filterValue.push(initialValue);
            }
        }

        if (filterDef.length > 0) filter = '[\'' + String(filterDef.join(' AND ')) + '\',' + filterValue.join(',') + ']';

        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId: String(getValue('WKCompany')),
            serviceCode: 'Rest_RMWsDataServer',
            // endpoint: '/FisFilialDataBR',
            endpoint: '/FisFilialDataBR?filter=' + encodeURI(filter),
            method: 'GET',
            timeoutService: '120', // segundos
            options: {
                encoding: 'UTF-8',
                mediaType: 'application/json'
            },
            // params: null
        }

        var vo = clientService.invoke(JSONUtil.toJSON(data));
        var status = String(vo.getHttpStatusResult())
        var ret = JSON.parse(vo.getResult());
        if (status == 200 || status == 201) {
            if (ret.data.length > 0) {
                dataset.addColumn("status");
                //Passar os primeiros objetos do array para buscar os cabeçalhos e resolver um bug do rest que qual o valor é nulo não traz o nome da coluna.
                var objCols = [];
                var size = ret.data.length;
                if (size > 30) { size = 30 };
                for (var r = 0; r < size; r++) {
                    var tmpCols = Object.keys(ret.data[r]);
                    objCols.push({ pos: r, size: tmpCols.length });
                }
                var maxFound = objCols.sort(function (b, c) { return c.size - b.size });
                maxFound = maxFound[0].pos;
                var cols = Object.keys(ret.data[maxFound]);
                //Cria as colunas com o retorno obtido
                for (var c = 0; c < cols.length; c++) {
                    dataset.addColumn(cols[c]);
                }

                for (var i = 0; i < ret.data.length; i++) {
                    var dataArr = [];
                    dataArr.push(status);
                    for (var c = 0; c < cols.length; c++) {
                        if (ret.data[i][cols[c]] == undefined) {
                            dataArr.push('');
                        } else {
                            dataArr.push(ret.data[i][cols[c]]);
                        }
                    }
                    dataset.addRow(dataArr);
                }
            }
        } else {
            log.error('Erro ao buscar dados');
            log.error(JSON.stringify(ret));
            dataset.addColumn("status");
            dataset.addColumn("erro");
            dataset.addRow([
                status,
                JSON.stringify(ret)
            ]);
        }
        return dataset;
    } catch (e) {
        log.error("Erro ao buscar dados: " + String(e))
        dataset = DatasetBuilder.newDataset();
        dataset.addColumn("status");
        dataset.addColumn("erro");
        dataset.addRow(['error', String(e.lineNumber) + ": " + String(e)]);
        return dataset;
    }
}
