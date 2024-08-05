function createDataset(fields, constraints, sortFields) {

    var dataset = DatasetBuilder.newDataset();

    try {

        var conta = "99441-2"

        if (constraints != null) {
            for (var a = 0; a < constraints.length; a++) {

                if (constraints[a].fieldName == 'CONTA') {
                    conta = constraints[a].initialValue;
                }
            }
        }

        var filter = "?parameters=CODCXA%3D" + conta

        var clientService = fluigAPI.getAuthorizeClientService();

        var data = {
            companyId: getValue('WKCompany') + '',
            serviceCode: 'RestRM',
            endpoint: '/ZZZ.CONTAS/0/M' + filter,
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
        log.info("RETORNO --> ")
        log.dir(ret)

        if (status == 200 || status == 201) {

            if (ret.length > 0) {

                dataset.addColumn("status");

                //Passar os primeiros objetos do array para buscar os cabeçalhos e resolver um bug do rest que qual o valor é nulo não traz o nome da coluna.
                var objCols = [];
                var allCols = {}; // Usamos um objeto para garantir unicidade
                var size = ret.length;
                if (size > 10) { size = 10; }

                for (var r = 0; r < size; r++) {
                    var tmpCols = Object.keys(ret[r]);
                    objCols.push({ pos: r, size: tmpCols.length });

                    // Adiciona todas as colunas ao objeto
                    for (var j = 0; j < tmpCols.length; j++) {
                        allCols[tmpCols[j]] = true;
                    }
                }

                // Converte o objeto de volta para um array
                var cols = [];
                for (var key in allCols) {
                    if (allCols.hasOwnProperty(key)) {
                        cols.push(key);
                    }
                }

                // Cria as colunas no dataset
                for (var c = 0; c < cols.length; c++) {
                    dataset.addColumn(cols[c]);
                }

                // Adiciona as linhas ao dataset
                for (var i = 0; i < ret.length; i++) {
                    var dataArr = [];

                    // dataArr.push(email);
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
