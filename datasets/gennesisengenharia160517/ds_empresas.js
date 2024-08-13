function createDataset(fields, constraints, sortFields) {

    var ds = DatasetBuilder.newDataset();
    ds.addColumn("ID");
    ds.addColumn("Nome");

    var tempDataset = getDefaultValues(); // Consulta a fonte de dados do dataset
    var idBusca;
    var nome;

    if (constraints != null && constraints.length && constraints[0].fieldName != "sqlLimit") { //se tiver constraint filtra
        for (var index = 0; index < constraints.length; index++) {
            idBusca = constraints[index].fieldName == "ID" ? constraints[0].initialValue : idBusca; // Se o ID for informado, é valor é atribuído a variável
            nome = constraints[index].fieldName == "Nome" ? constraints[0].initialValue : nome; // Se o nome for informado, é valor é atribuído a variável
        }
        /* Implemente o filtro que foi definido, somente 1 por consulta*/
        if (idBusca != undefined) { ds = getMatchValue(tempDataset, idBusca, 0); }
        else if (nome != undefined) { ds = getMatchValue(tempDataset, nome, 1); }
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
    ds.addColumn("ID");
    ds.addColumn("Nome");
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
        ['01','ENGPAC'],
        ['02','GÊNNESIS'],
        ['03','ECONTECX'],
        ['04','T2'],
        ['05','MÉTRICA'],
        ['06','TESLA'],
        ['07','ABRASIL'],
        ['08','ENGTHA'],
        ['09','BIOTREAT'],
        ['10','GAIA'],
    ]    
}
