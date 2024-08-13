function defineStructure() {
    addColumn("TIPO");
    addColumn("CODCCUSTO");
    addColumn("CODCOLIGADA");
    addColumn("CENTRO DE CUSTO");
    addColumn("SETOR SOLICITANTE");
    addColumn("APROVADOR");
    addColumn("TODOS", DatasetFieldType.STRING);
    setKey(["TODOS"]);
    addIndex(["TODOS"]);
}

function onSync(lastSyncDate) {
    var ds = DatasetBuilder.newDataset();
    var tempDataset = getDefaultValues(); // consulta a fonte de dados do dataset
    for (var a = 0; a < tempDataset.length; a++) {
        ds.addRow(tempDataset[a]);
    }
    return ds;
}

function createDataset(fields, constraints, sortFields) {

    var ds = DatasetBuilder.newDataset();
    ds.addColumn("TIPO");
    ds.addColumn("CODCCUSTO");
    ds.addColumn("CODCOLIGADA");
    ds.addColumn("CENTRO DE CUSTO");
    ds.addColumn("SETOR SOLICITANTE");
    ds.addColumn("APROVADOR");
    ds.addColumn("TODOS");

    var tempDataset = getDefaultValues(); // consulta a fonte de dados do dataset
    var tipo;
    var codccusto;
    var codcoligada;
    var ccusto;
    var setor_solicitante;
    var aprovador;
    var todos;
    
    if (constraints != null && constraints.length && constraints[0].fieldName != "sqlLimit") { //se tiver constraint filtra
        console.log("ds_fornecedores constraints:")
        console.dir(constraints);

        for (var index = 0; index < constraints.length; index++) {
            tipo = constraints[index].fieldName == "TIPO" ? constraints[index].initialValue : tipo; // Se o Nome for informado, é valor é atribuído a variável
            console.log('ds_fornecedores TIPO -> ' + tipo);
            codccusto = constraints[index].fieldName == "CODCCUSTO" ? constraints[index].initialValue : codccusto; // Se a Nome Social for informada, é valor é atribuído a variável
            console.log('ds_fornecedores CODCCUSTO -> ' + codccusto);
            codcoligada = constraints[index].fieldName == "CODCOLIGADA" ? constraints[index].initialValue : codcoligada; // Se a CPF/CNPJ for informada, é valor é atribuído a variável
            console.log('ds_fornecedores CODCOLIGADA -> ' + codcoligada);
            ccusto = constraints[index].fieldName == "CENTRO DE CUSTO" ? constraints[index].initialValue : ccusto; // Se a CPF/CNPJ for informada, é valor é atribuído a variável
            console.log('ds_fornecedores CENTRO DE CUSTO -> ' + ccusto);
            setor_solicitante = constraints[index].fieldName == "SETOR SOLICITANTE" ? constraints[index].initialValue : setor_solicitante; // Se a CPF/CNPJ for informada, é valor é atribuído a variável
            console.log('ds_fornecedores SETOR SOLICITANTE -> ' + setor_solicitante);
            aprovador = constraints[index].fieldName == "APROVADOR" ? constraints[index].initialValue : aprovador; // Se a CPF/CNPJ for informada, é valor é atribuído a variável
            console.log('ds_fornecedores CENTRO DE CUSTO -> ' + ccusto);
            todos = constraints[index].fieldName == "TODOS" ? constraints[index].initialValue : todos; // Se a CPF/CNPJ for informada, é valor é atribuído a variável
            console.log('ds_fornecedores TODOS -> ' + todos);
        }
        /* Implemente o filtro que foi definido, somente 1 por consulta*/
        if (tipo != undefined) {
            ds = getMatchValue(tempDataset, tipo, 0);
        }
        if (codccusto != undefined) {
            ds = getMatchValue(tempDataset, codccusto, 1);
        }
        if (codcoligada != undefined) {
            ds = getMatchValue(tempDataset, codcoligada, 2);
        }
        if (ccusto != undefined) {
            ds = getMatchValue(tempDataset, ccusto, 3);
        }
        if (setor_solicitante != undefined) {
            ds = getMatchValue(tempDataset, setor_solicitante, 4);
        }
        if (aprovador != undefined) {
            ds = getMatchValue(tempDataset, aprovador, 5);
        }
        if (todos != undefined) {
            ds = getMatchValue(tempDataset, todos, 6);
        }
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
    ds.addColumn("TIPO");
    ds.addColumn("CODCCUSTO");
    ds.addColumn("CODCOLIGADA");
    ds.addColumn("CENTRO DE CUSTO");
    ds.addColumn("SETOR SOLICITANTE");
    ds.addColumn("APROVADOR");
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

function getDefaultValues() {
    return [
        ['Gestor', '1', '02.01.01.01.002', 'UNB - CMI', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.01.01.01.002 - UNB - CMI - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.01.01.01.003', 'UNB - CMP', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.01.01.01.003 - UNB - CMP - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.01.01.01.004', 'UNB - CAR', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.01.01.01.004 - UNB - CAR - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.01.01.01.005', 'UNB - SB', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.01.01.01.005 - UNB - SB - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.01.01.01.006', 'UNB - MUTIRAO', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.01.01.01.006 - UNB - MUTIRAO - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.01.01.01.007', 'CRO11', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.01.01.01.007 - CRO11 - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.01.01.01.008', 'HFA - SERVIÇOS EVENTUAIS', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.01.01.01.008 - HFA - SERVIÇOS EVENTUAIS - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.01.01.01.009', 'HFA - MÃO DE OBRA', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.01.01.01.009 - HFA - MÃO DE OBRA - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.01.01.01.010', 'CODEVASF', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.01.01.01.010 - CODEVASF - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.01.01.01.011', 'ITAMARATY - MÃO DE OBRA', 'ENGENHARIA', 'amanda.almeida', 'Gestor - 1 - 02.01.01.01.011 - ITAMARATY - MÃO DE OBRA - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.01.01.01.012', 'ITAMARATY - SERVIÇOS EVENTUAIS', 'ENGENHARIA', 'amanda.almeida', 'Gestor - 1 - 02.01.01.01.012 - ITAMARATY - SERVIÇOS EVENTUAIS - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.01.01.01.013', 'SEDES', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.01.01.01.013 - SEDES - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.01.01.01.014', 'SARAH', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.01.01.01.014 - SARAH - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.01.01.01.016', 'PGR', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.01.01.01.016 - PGR - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.01.01.01.017', 'EMBRAPA BSB', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.01.01.01.017 - EMBRAPA BSB - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.01.01.01.018', 'SES GDF - LOTE 10', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.01.01.01.018 - SES GDF - LOTE 10 - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.01.01.01.019', 'SES GDF - LOTE 12', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.01.01.01.019 - SES GDF - LOTE 12 - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.01.01.01.020', 'SES GDF - LOTE 14', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.01.01.01.020 - SES GDF - LOTE 14 - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.01.01.01.021', 'SES GDF - LOTE 17', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.01.01.01.021 - SES GDF - LOTE 17 - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.01.01.01.022', 'MDR', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.01.01.01.022 - HFA - SERVIÇOS EVENTUAIS - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.01.01.01.025', 'DF - ADM LOCAL', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.01.01.01.025 - HFA - SERVIÇOS EVENTUAIS - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.01.01.01.027', 'SEDES NORTE', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.01.01.01.027 - HFA - SERVIÇOS EVENTUAIS - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.02.01.01.001', 'RN - ADM LOCAL', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.02.01.01.001 - RN - ADM LOCAL - ENGENHARIA - Ciro.farias'],
        ['Gestor', '1', '02.02.01.01.004', 'SMS NATAL', 'ENGENHARIA', 'Ciro.farias', 'Gestor - 1 - 02.02.01.01.004 - SMS NATAL - ENGENHARIA - Ciro.farias'],
        
    ]
}