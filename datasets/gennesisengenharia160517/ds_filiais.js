function defineStructure() {
    addColumn("COLIGADA", DatasetFieldType.STRING);
    addColumn("FILIAL", DatasetFieldType.STRING);
    addColumn("NOME", DatasetFieldType.STRING);
    addColumn("TODOS", DatasetFieldType.STRING);
    setKey(["COLIGADA"]);
    addIndex(["COLIGADA"]);
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
    ds.addColumn("COLIGADA");
    ds.addColumn("FILIAL");
    ds.addColumn("NOME");
    ds.addColumn("TODOS");

    var tempDataset = getDefaultValues(); // consulta a fonte de dados do dataset
    var coligada;
    var filial;
    var nome;
    var todos;
    
    if (constraints != null && constraints.length && constraints[0].fieldName != "sqlLimit") { //se tiver constraint filtra
        console.log("ds_filiais constraints:")
        console.dir(constraints);

        for (var index = 0; index < constraints.length; index++) {
            coligada = constraints[index].fieldName == "COLIGADA" ? constraints[index].initialValue : coligada; // Se Coligada for informado, é valor é atribuído a variável
            console.log('ds_filiais coligada -> ' + coligada);
            filial = constraints[index].fieldName == "FILIAL" ? constraints[index].initialValue : filial; // Se Filial for informada, é valor é atribuído a variável
            console.log('ds_filiais filial -> ' + filial);
            nome = constraints[index].fieldName == "NOME" ? constraints[index].initialValue : nome; // Se Filial for informada, é valor é atribuído a variável
            console.log('ds_filiais nome -> ' + nome);
            todos = constraints[index].fieldName == "TODOS" ? constraints[index].initialValue : todos; // Se Filial for informada, é valor é atribuído a variável
            console.log('ds_filiais nome -> ' + todos);
        }
        /* Implemente o filtro que foi definido, somente 1 por consulta*/
        if (coligada != undefined) {
            ds = getMatchValue(tempDataset, coligada, 0);
        } else if (filial != undefined) {
            ds = getMatchValue(tempDataset, filial, 1);
        } else if (nome != undefined) {
            ds = getMatchValue(tempDataset, nome, 2);
        } else if (todos != undefined) {
            ds = getMatchValue(tempDataset, todos, 3);
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
    ds.addColumn("COLIGADA");
    ds.addColumn("FILIAL");
    ds.addColumn("NOME");
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
        ['1', '1', 'DF', 'COL 1 - FILIAL 1 - DF'],
        ['1', '2', 'RS', 'COL 1 - FILIAL 2 - RS'],
        ['1', '3', 'RN', 'COL 1 - FILIAL 3 - RN'],
        ['1', '4', 'PB', 'COL 1 - FILIAL 4 - PB'],
        ['1', '5', 'GO', 'COL 1 - FILIAL 5 - GO'],
        ['2', '1', 'RN', 'COL 2 - FILIAL 1 - RN'],
        ['2', '2', 'PB', 'COL 2 - FILIAL 2 - PB'],
        ['2', '3', 'RS', 'COL 2 - FILIAL 3 - RS'],
        ['2', '4', 'MG', 'COL 2 - FILIAL 4 - MG'],
        ['3', '1', 'PB', 'COL 3 - FILIAL 1 - PB'],
        ['3', '2', 'DF', 'COL 3 - FILIAL 2 - DF']
    ];
}
