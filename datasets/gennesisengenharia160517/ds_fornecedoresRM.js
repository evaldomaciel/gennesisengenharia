function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    try {
        var filtro = "0001";
        if (constraints != null) {
            for (var a = 0; a < constraints.length; a++) {
                filtro = constraints[a].fieldName == "FILTRO" ? constraints[a].initialValue : filtro;
                filtro = constraints[a].fieldName == "BUSCAFILTRO" ? constraints[a].initialValue : filtro;
            }
        }
        var filtroUri = encodeURI(filtro);
        var filter = "?parameters=FILTRO%3D" + String(filtroUri)
        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId: getValue('WKCompany') + '',
            serviceCode: 'RestRM',
            endpoint: '/ZZZ.FORNECEDORES/0/T' + filter,
            method: 'GET',
            timeoutService: '120', // segundos
            options: {
                encoding: 'UTF-8',
                mediaType: 'application/json'
            },
            //params: json
        }
        log.info("ENDPOINT -- > " + data.endpoint);
        var vo = clientService.invoke(JSONUtil.toJSON(data));
        var status = String(vo.getHttpStatusResult())
        var ret = JSON.parse(vo.getResult());
        if (status == 200 || status == 201) {
            if (ret.length > 0) {
                dataset.addColumn("status");
                //Passar os primeiros objetos do array para buscar os cabeçalhos e resolver um bug do rest que qual o valor é nulo não traz o nome da coluna.
                var objCols = [];
                var size = ret.length;
                if (size > 30) { size = 30 };
                for (var r = 0; r < size; r++) {
                    var tmpCols = Object.keys(ret[r]);
                    objCols.push({ pos: r, size: tmpCols.length });
                }
                var maxFound = objCols.sort(function (b, c) { return c.size - b.size });
                maxFound = maxFound[0].pos;
                var cols = Object.keys(ret[maxFound]);
                //Cria as colunas com o retorno obtido
                for (var c = 0; c < cols.length; c++) {
                    dataset.addColumn(cols[c]);
                }
                for (var i = 0; i < ret.length; i++) {
                    var dataArr = [];
                    dataArr.push(status);
                    for (var c = 0; c < cols.length; c++) {
                        if (ret[i][cols[c]] == undefined) {
                            dataArr.push('');
                        } else {
                            dataArr.push(ret[i][cols[c]]);
                        }
                    }
                    dataset.addRow(dataArr);
                }
            }
        } else {
            dataset = DatasetBuilder.newDataset();
            log.error('Erro ao buscar funcionário');
            log.error(JSON.stringify(ret));
            dataset.addColumn("status");
            dataset.addColumn("erro");
            dataset.addRow([
                status,
                ret.message
            ]);
        }
    } catch (e) {
        dataset = DatasetBuilder.newDataset();
        log.error("Erro ao buscar Funcionário: " + e)
        dataset.addColumn("status");
        dataset.addColumn("erro");
        dataset.addRow(['error', String(e)]);
    }
    return dataset;
}
