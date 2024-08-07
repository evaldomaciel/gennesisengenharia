function createDataset(fields, constraints, sortFields) {

    var ds = DatasetBuilder.newDataset();
    ds.addColumn("CODCOLIGADA");
    ds.addColumn("CCUSTO");
    ds.addColumn("NOMECCUSTO");
    ds.addColumn("CODFILIAL")
    ds.addColumn("TODOS");

    var tempDataset = getDefaultValues(); // Consulta a fonte de dados do dataset
    var codColigada;
    var cCusto;
    var nome_cCusto;
    var codfilial;
    var todos;

    if (constraints != null && constraints.length && constraints[0].fieldName != "sqlLimit") { //se tiver constraint filtra
        for (var index = 0; index < constraints.length; index++) {
            codColigada = constraints[index].fieldName == "CODCOLIGADA" ? constraints[0].initialValue : codColigada; // Se o CCusto for informado, é valor é atribuído a variável
            cCusto = constraints[index].fieldName == "CCUSTO" ? constraints[0].initialValue : cCusto; // Se o CCusto for informado, é valor é atribuído a variável
            nome_cCusto = constraints[index].fieldName == "NOMECCUSTO" ? constraints[0].initialValue : nome_cCusto; // Se o Nome_cCusto for informado, é valor é atribuído a variável
            codfilial = constraints[index].fieldName == "CODFILIAL" ? constraints[0].initialValue : codfilial; // Se o codFilial for informado, é valor é atribuído a variável
            todos = constraints[index].fieldName == "TODOS" ? constraints[0].initialValue : todos; // Se o todos for informado, é valor é atribuído a variável
        }
        /* Implemente o filtro que foi definido, somente 1 por consulta*/
        if (codColigada != undefined) { ds = getMatchValue(tempDataset, codColigada, 0) }
        else if (cCusto != undefined) { ds = getMatchValue(tempDataset, cCusto, 1); }
        else if (nome_cCusto != undefined) { ds = getMatchValue(tempDataset, nome_cCusto, 2); }
        else if (codfilial != undefined) { ds = getMatchValue(tempDataset, codfilial, 3); }
        else if (todos != undefined) { ds = getMatchValue(tempDataset, todos, 4); }
    } else { // se não tiver constraint adiciona todas as linhas do objeto no retorno
        for (var a = 0; a < tempDataset.length; a++) {
            ds.addRow(tempDataset[a]);
        }
    }
    return ds;
}

/**
 * Monta o novo dataset com base nos parâmetros definidos
 * @param {object} list espera um objeto ou array de objetos 
 * @param {string} filter espera o valor que foi passado via constraint do dataset 
 * @param {int} position a posição onde o valor alvo será validado
 * @returns retorna uma novo dataset com os valores que atendam a condição
 */
function getMatchValue(list, filter, position) {
    var ds = DatasetBuilder.newDataset();
    ds.addColumn("CODCOLIGADA");
    ds.addColumn("CCUSTO");
    ds.addColumn("NOMECCUSTO");
    ds.addColumn("CODFILIAL");
    ds.addColumn("TODOS");
    for (var a = 0; a < list.length; a++) {
        /**  Irá adicionar ao dataset somente as linhas que atenderem a condição
         * Por estarmos usando indexOf, vai função vai trabalhar como um '%like%' no banco de dados */
        if (String(list[a][position]).toLocaleUpperCase().indexOf(String(filter).toLocaleUpperCase()) >= 0) {
            ds.addRow(list[a]);
        }
    }
    return ds;
}

/**
 * Lista de objetos a ser retornada pelo dataset 
 * @returns lista
 */
function getDefaultValues() {
    return [
        ['1','01.01.01.01.002','ADMINISTRAÇÃO CENTRAL','1','01.01.01.01.002 - ADMINISTRAÇÃO CENTRAL'],
        ['1','02.01.01.01.002','UNB - CMI','1','02.01.01.01.002 - UNB - CMI'],
        ['1','02.01.01.01.003','UNB - CMP','1','02.01.01.01.003 - UNB - CMP'],
        ['1','02.01.01.01.004','UNB - CAR','1','02.01.01.01.004 - UNB - CAR'],
        ['1','02.01.01.01.005','UNB - SB ','1','02.01.01.01.005 - UNB - SB '],
        ['1','02.01.01.01.006','UNB - MUTIRAO','1','02.01.01.01.006 - UNB - MUTIRAO'],
        ['1','02.01.01.01.007','CRO11','1','02.01.01.01.007 - CRO11'],
        ['1','02.01.01.01.008','HFA - SERVIÇOS EVENTUAIS','1','02.01.01.01.008 - HFA - SERVIÇOS EVENTUAIS'],
        ['1','02.01.01.01.009','HFA - MÃO DE OBRA','1','02.01.01.01.009 - HFA - MÃO DE OBRA'],
        ['1','02.01.01.01.010','CODEVASF','1','02.01.01.01.010 - CODEVASF'],
        ['1','02.01.01.01.011','ITAMARATY - MÃO DE OBRA','1','02.01.01.01.011 - ITAMARATY - MÃO DE OBRA'],
        ['1','02.01.01.01.012','ITAMARATY - SERVIÇOS EVENTUAIS','1','02.01.01.01.012 - ITAMARATY - SERVIÇOS EVENTUAIS'],
        ['1','02.01.01.01.013','SEDES','1','02.01.01.01.013 - SEDES'],
        ['1','02.01.01.01.014','SARAH','1','02.01.01.01.014 - SARAH'],
        ['1','02.01.01.01.016','PGR','1','02.01.01.01.016 - PGR'],
        ['1','02.01.01.01.017','EMBRAPA BSB','1','02.01.01.01.017 - EMBRAPA BSB'],
        ['1','02.01.01.01.018','SES GDF - LOTE 10','1','02.01.01.01.018 - SES GDF - LOTE 10'],
        ['1','02.01.01.01.019','SES GDF - LOTE 12','1','02.01.01.01.019 - SES GDF - LOTE 12'],
        ['1','02.01.01.01.020','SES GDF - LOTE 14','1','02.01.01.01.020 - SES GDF - LOTE 14'],
        ['1','02.01.01.01.021','SES GDF - LOTE 17','1','02.01.01.01.021 - SES GDF - LOTE 17'],
        ['1','02.01.01.01.022','MDR','1','02.01.01.01.022 - MDR'],
        ['1','02.01.01.01.025','DF - ADM LOCAL','1','02.01.01.01.025 - DF - ADM LOCAL'],
        ['1','02.01.01.01.027','SEDES NORTE','1','02.01.01.01.027 - SEDES NORTE'],
        ['1','02.02.01.01.001','RN - ADM LOCAL','3','02.02.01.01.001 - RN - ADM LOCAL'],
        ['1','02.02.01.01.004','SMS NATAL','3','02.02.01.01.004 - SMS NATAL'],
        ['1','02.02.01.01.006','UFRN - IMPERMEABILIZAÇÃO','3','02.02.01.01.006 - UFRN - IMPERMEABILIZAÇÃO'],
        ['1','02.02.01.01.007','UFRN - PINTURA','3','02.02.01.01.007 - UFRN - PINTURA'],
        ['1','02.02.01.01.008','INCRA - MÃO DE OBRA','3','02.02.01.01.008 - INCRA - MÃO DE OBRA'],
        ['1','02.02.01.01.009','INCRA - SERVIÇOS EVENTUAIS','3','02.02.01.01.009 - INCRA - SERVIÇOS EVENTUAIS'],
        ['1','02.02.01.01.010','BASE CONTAINER UPA SATELITE','3','02.02.01.01.010 - BASE CONTAINER UPA SATELITE'],
        ['1','02.02.01.04.001','FUNDASE - RN','3','02.02.01.04.001 - FUNDASE - RN'],
        ['1','02.03.01.01.001','RECEITA FEDERAL - MÃO DE OBRA','3','02.03.01.01.001 - RECEITA FEDERAL - MÃO DE OBRA'],
        ['1','02.03.01.01.002','UFPE IMPERMEABILIZAÇÃO','3','02.03.01.01.002 - UFPE IMPERMEABILIZAÇÃO'],
        ['1','02.03.01.01.003','UFPE PINTURA','3','02.03.01.01.003 - UFPE PINTURA'],
        ['1','02.04.01.01.001','RS - ADM LOCAL ','2','02.04.01.01.001 - RS - ADM LOCAL '],
        ['1','02.04.01.01.002','CORREIOS 12','2','02.04.01.01.002 - CORREIOS 12'],
        ['1','02.04.01.01.003','CORREIOS 17','2','02.04.01.01.003 - CORREIOS 17'],
        ['1','02.04.01.01.005','CORREIOS 43','2','02.04.01.01.005 - CORREIOS 43'],
        ['1','02.04.01.01.006','GEOINFORMAÇÕES','2','02.04.01.01.006 - GEOINFORMAÇÕES'],
        ['1','02.04.01.01.009','GRUPO HOSPITALAR DA CONCEIÇÃO','2','02.04.01.01.009 - GRUPO HOSPITALAR DA CONCEIÇÃO'],
        ['1','02.04.01.01.010','CORREIOS 18 - NOVO HAMBURGO','2','02.04.01.01.010 - CORREIOS 18 - NOVO HAMBURGO'],
        ['1','02.04.01.01.011','CORREIOS 18 - SÃO LEOPOLDO','2','02.04.01.01.011 - CORREIOS 18 - SÃO LEOPOLDO'],
        ['1','02.04.01.01.012','CORREIOS 18 - SANTANA DO LIVRAMENTO','2','02.04.01.01.012 - CORREIOS 18 - SANTANA DO LIVRAMENTO'],
        ['1','02.04.01.01.013','CORREIOS 18 - SÃO GABRIEL','2','02.04.01.01.013 - CORREIOS 18 - SÃO GABRIEL'],
        ['1','02.04.01.01.014','CORREIOS 18 - SOLEDADE','2','02.04.01.01.014 - CORREIOS 18 - SOLEDADE'],
        ['1','02.04.01.01.015','CORREIOS - 824','2','02.04.01.01.015 - CORREIOS - 824'],
        ['1','02.04.01.01.016','TRE - RS','2','02.04.01.01.016 - TRE - RS'],
        ['1','02.04.01.01.017','SERPRO - RS','2','02.04.01.01.017 - SERPRO - RS'],
        ['1','02.04.01.01.018','CORSAN - RS','2','02.04.01.01.018 - CORSAN - RS'],
        ['1','02.04.01.01.019','BANRISUL - LOTE 1','2','02.04.01.01.019 - BANRISUL - LOTE 1'],
        ['1','02.04.01.01.020','BANRISUL - LOTE 2','2','02.04.01.01.020 - BANRISUL - LOTE 2'],
        ['1','02.04.01.01.021','INMETRO - RS','2','02.04.01.01.021 - INMETRO - RS'],
        ['1','02.05.01.01.001','PARQUE TRES RUAS - JOAO PESSOA','4','02.05.01.01.001 - PARQUE TRES RUAS - JOAO PESSOA'],
        ['1','02.05.01.01.003','SEINFRA - PAVIMENTACAO','4','02.05.01.01.003 - SEINFRA - PAVIMENTACAO'],
        ['1','02.06.01.01.001','TJ 1A - GOIANIA - PREVENTIVA','5','02.06.01.01.001 - TJ 1A - GOIANIA - PREVENTIVA'],
        ['1','02.06.01.01.002','TJ 1B - ANÁPOLIS - PREVENTIVA','5','02.06.01.01.002 - TJ 1B - ANÁPOLIS - PREVENTIVA'],
        ['1','02.06.01.01.003','JUSTIÇA FEDERAL DE GOIÁS','5','02.06.01.01.003 - JUSTIÇA FEDERAL DE GOIÁS'],
        ['1','02.06.01.01.004','TJGO RETROFIT - LOTE 1','5','02.06.01.01.004 - TJGO RETROFIT - LOTE 1'],
        ['1','02.06.01.01.005','GO - ADM LOCAL','5','02.06.01.01.005 - GO - ADM LOCAL'],
        ['1','02.06.01.01.006','BBGO - MANUTENÇÃO','5','02.06.01.01.006 - BBGO - MANUTENÇÃO'],
        ['1','02.06.01.01.007','TJGO RETROFIT PARCEIROS - LOTE 5','5','02.06.01.01.007 - TJGO RETROFIT PARCEIROS - LOTE 5'],
        ['1','02.06.01.01.008','TJ 1A - GOIANIA - CORRETIVA','5','02.06.01.01.008 - TJ 1A - GOIANIA - CORRETIVA'],
        ['1','02.06.01.01.009','TJ 1B - ANÁPOLIS - CORRETIVA','5','02.06.01.01.009 - TJ 1B - ANÁPOLIS - CORRETIVA'],
        ['1','02.06.01.01.010','TJ MANUTENÇÃO RIO VERDE - CORRETIVA','5','02.06.01.01.010 - TJ MANUTENÇÃO RIO VERDE - CORRETIVA'],
        ['1','02.06.01.01.011','TJ MANUTENÇÃO CALDAS NOVAS - CORRETIVA','5','02.06.01.01.011 - TJ MANUTENÇÃO CALDAS NOVAS - CORRETIVA'],
        ['2','01.01.01.01.001','ADM CENTRAL ENGPAC','1','01.01.01.01.001 - ADM CENTRAL ENGPAC'],
        ['2','02.01.01.01.001','ADM REGIONAL JOAO PESSOA','2','02.01.01.01.001 - ADM REGIONAL JOAO PESSOA'],
        ['2','02.01.01.01.003','SEECT PB ITEM 1','2','02.01.01.01.003 - SEECT PB ITEM 1'],
        ['2','02.01.01.01.004','SEECT PB ITEM 2','2','02.01.01.01.004 - SEECT PB ITEM 2'],
        ['2','02.01.01.01.006','HOSPITAL UNIVERSITARIO LAURO WANDERLEY','2','02.01.01.01.006 - HOSPITAL UNIVERSITARIO LAURO WANDERLEY'],
        ['2','02.01.01.01.007','15º BATALHÃO','2','02.01.01.01.007 - 15º BATALHÃO'],
        ['2','02.01.01.01.008','ADM REGIONAL PARAIBA','2','02.01.01.01.008 - ADM REGIONAL PARAIBA'],
        ['2','02.01.01.01.009','BRILHANTE - ICMBIO','2','02.01.01.01.009 - BRILHANTE - ICMBIO'],
        ['2','02.01.01.01.010','SEINFRA PB - REFORMA ESCOLAS','2','02.01.01.01.010 - SEINFRA PB - REFORMA ESCOLAS'],
        ['2','02.01.01.01.011','ICMBIO - PB','2','02.01.01.01.011 - ICMBIO - PB'],
        ['2','02.01.01.01.012','SUPLAN - PB','2','02.01.01.01.012 - SUPLAN - PB'],
        ['2','02.01.01.02.001','ADM REGIONAL CAMPINA GRANDE','2','02.01.01.02.001 - ADM REGIONAL CAMPINA GRANDE'],
        ['2','02.01.01.02.003','SEECT PB ITEM 3','2','02.01.01.02.003 - SEECT PB ITEM 3'],
        ['2','02.01.01.02.004','SEECT PB ITEM 4','2','02.01.01.02.004 - SEECT PB ITEM 4'],
        ['2','02.01.01.02.005','SEECT PB ITEM 5','2','02.01.01.02.005 - SEECT PB ITEM 5'],
        ['2','02.01.01.02.006','EMBRAPA ALGODAO - CAMPINA GRANDE','2','02.01.01.02.006 - EMBRAPA ALGODAO - CAMPINA GRANDE'],
        ['2','02.01.01.02.007','SEDUC - PB','2','02.01.01.02.007 - SEDUC - PB'],
        ['2','02.02.01.01.001','ADM REGIONAL NATAL','1','02.02.01.01.001 - ADM REGIONAL NATAL'],
        ['2','02.02.01.01.002','BASE NAVAL','1','02.02.01.01.002 - BASE NAVAL'],
        ['2','02.02.01.01.003','SME - ZONA NORTE LOTE I - MANUTENÇÃO','1','02.02.01.01.003 - SME - ZONA NORTE LOTE I - MANUTENÇÃO'],
        ['2','02.02.01.01.004','SME -ZONA OESTE LOTE IV - MANUTENÇÃO','1','02.02.01.01.004 - SME -ZONA OESTE LOTE IV - MANUTENÇÃO'],
        ['2','02.02.01.01.005','SPU E ESTACIONAMENTO','1','02.02.01.01.005 - SPU E ESTACIONAMENTO'],
        ['2','02.02.01.01.006','CMEI MONTE CARMELO','1','02.02.01.01.006 - CMEI MONTE CARMELO'],
        ['2','02.02.01.01.007','CMEI BOI SURUBIM','1','02.02.01.01.007 - CMEI BOI SURUBIM'],
        ['2','02.02.01.01.009','E.M PROF ANTONIO SEVERIANO','1','02.02.01.01.009 - E.M PROF ANTONIO SEVERIANO'],
        ['2','02.02.01.01.010','SEEC PROJETOS RN','1','02.02.01.01.010 - SEEC PROJETOS RN'],
        ['2','02.02.01.01.012','SME NATAL 062 - EMERGENCIAL','1','02.02.01.01.012 - SME NATAL 062 - EMERGENCIAL'],
        ['2','02.02.01.01.013','ICMBIO - RN','1','02.02.01.01.013 - ICMBIO - RN'],
        ['2','02.02.01.01.014','SPDA WALFREDO GURGEL','1','02.02.01.01.014 - SPDA WALFREDO GURGEL'],
        ['2','02.02.01.01.015','CODERN NATAL - BALANÇA','1','02.02.01.01.015 - CODERN NATAL - BALANÇA'],
        ['2','02.02.01.01.016','ESCRITORIO CARLOS','1','02.02.01.01.016 - ESCRITORIO CARLOS'],
        ['2','02.02.01.02.001','SME MOSSORÓ - MANUTENÇÃO','1','02.02.01.02.001 - SME MOSSORÓ - MANUTENÇÃO'],
        ['2','02.02.01.02.002','ADM REGIONAL MOSSORO','1','02.02.01.02.002 - ADM REGIONAL MOSSORO'],
        ['2','02.02.01.02.005','GENNESIS - FUNDASE RN','1','02.02.01.02.005 - GENNESIS - FUNDASE RN'],
        ['2','02.02.01.03.001','MACAIBA SMS - MANUTENÇÃO','1','02.02.01.03.001 - MACAIBA SMS - MANUTENÇÃO'],
        ['2','02.02.01.03.002','MACAIBA SME - MANUTENÇÃO','1','02.02.01.03.002 - MACAIBA SME - MANUTENÇÃO'],
        ['2','02.02.01.03.004','ADM REGIONAL MACAIBA','1','02.02.01.03.004 - ADM REGIONAL MACAIBA'],
        ['2','02.02.01.04.001','CODERN - PORTO ILHA','1','02.02.01.04.001 - CODERN - PORTO ILHA'],
        ['2','02.02.01.05.001','SEEC RN NOVA CRUZ','1','02.02.01.05.001 - SEEC RN NOVA CRUZ'],
        ['2','02.02.01.06.001','SEEC RN PAU DOS FERROS','1','02.02.01.06.001 - SEEC RN PAU DOS FERROS'],
        ['2','02.03.01.01.001','EMBRAPA RS','4','02.03.01.01.001 - EMBRAPA RS'],
        ['2','02.03.01.01.002','CELIC RS - VERANOPOLIS','4','02.03.01.01.002 - CELIC RS - VERANOPOLIS'],
        ['2','02.03.01.01.003','CELIC RS - PELOTAS','4','02.03.01.01.003 - CELIC RS - PELOTAS'],
        ['2','02.04.01.01.001','ICMBIO - PE','1','02.04.01.01.001 - ICMBIO - PE'],
        ['2','02.05.01.01.001','ADM REGIONAL BELO HORIZONTE','3','02.05.01.01.001 - ADM REGIONAL BELO HORIZONTE'],
        ['2','02.05.01.01.002','SMOBI BH - OESTE','3','02.05.01.01.002 - SMOBI BH - OESTE'],
        ['2','02.05.01.01.003','SMOBI BH - NORDESTE','3','02.05.01.01.003 - SMOBI BH - NORDESTE'],
        ['2','02.05.01.01.004','SMOBI BH - CENTRO-SUL','3','02.05.01.01.004 - SMOBI BH - CENTRO-SUL'],
        ['2','02.05.01.01.005','SMOBI BH - LESTE','3','02.05.01.01.005 - SMOBI BH - LESTE'],
        ['3','02.01.01.01.001','EMBRAPA BSB','2','02.01.01.01.001 - EMBRAPA BSB'],
        ['3','02.02.01.01.001','SEFAZ PB - LOTE 1','1','02.02.01.01.001 - SEFAZ PB - LOTE 1'],
        ['3','02.02.01.01.002','SEFAZ PB - LOTE 2','1','02.02.01.01.002 - SEFAZ PB - LOTE 2'],
        ['3','02.02.01.02.001','SEFAZ PB - LOTE 3','1','02.02.01.02.001 - SEFAZ PB - LOTE 3'],
        ['3','02.02.01.02.002','SEFAZ PB - LOTE 4','1','02.02.01.02.002 - SEFAZ PB - LOTE 4'],
        ['3','02.02.01.02.003','SEFAZ PB - LOTE 5','1','02.02.01.02.003 - SEFAZ PB - LOTE 5']
    ]    
}
