function createDataset(fields, constraints, sortFields) {

    var dataset = DatasetBuilder.newDataset();

    try {

        var cgc = "0001"

        if (constraints != null) {
            for (var a = 0; a < constraints.length; a++) {

                if (constraints[a].fieldName == 'CGC') {
                    cgc = constraints[a].initialValue;
                }
            }
        }

        var filter = "?parameters=CGC%3D" + cgc + ""

        var clientService = fluigAPI.getAuthorizeClientService();

        var data = {
            companyId: getValue('WKCompany') + '',
            serviceCode: 'RestRM',
            endpoint: '/ZZZ.FORNECEDORES/0/M' + filter,
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
                dataset.addColumn("pesquisa_campos");

                //Passar os primeiros objetos do array para buscar os cabeçalhos e resolver um bug do rest que qual o valor é nulo não traz o nome da coluna.
                var objCols = [];
                var size = ret.length;
                if (size > 31) { size = 31 };

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

                    //    dataArr.push(email);
                    dataArr.push(status);
                    // Insere no campos_pesquisa os campos pro DisplayKey
                    var campos = ret[i][cols[2]] + ", " + ret[i][cols[3]] + ", " + ret[i][cols[4]];
                    dataArr.push(campos);

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

            log.error('Erro ao buscar funcionário');
            log.error(JSON.stringify(ret));

            dataset.addColumn("status");
            dataset.addColumn("erro");

            dataset.addRow([
                status,
                ret.Message
            ]);

        }

        return dataset;


    } catch (e) {

        log.error("Erro ao buscar Funcionário: " + e)

        dataset.addColumn("status");
        dataset.addColumn("erro");
        dataset.addRow(['error', e]);

        return dataset;

    }

}
