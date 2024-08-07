function createDataset(fields, constraints, sortFields) {

    var ds = DatasetBuilder.newDataset();
    ds.addColumn("Valor");
    ds.addColumn("Nome");
    ds.addColumn("Todos");

    var tempDataset = getDefaultValues(); // Consulta a fonte de dados do dataset
    var valor;
    var nome;
    var todos;

    if (constraints != null && constraints.length && constraints[0].fieldName != "sqlLimit") { //se tiver constraint filtra
        for (var index = 0; index < constraints.length; index++) {
            valor = constraints[index].fieldName == "Valor" ? constraints[0].initialValue : valor; // Se o CCusto for informado, é valor é atribuído a variável
            nome = constraints[index].fieldName == "Nome" ? constraints[0].initialValue : nome; // Se o nome for informado, é valor é atribuído a variável
            todos = constraints[index].fieldName == "Todos" ? constraints[0].initialValue : todos; // Se o todos for informado, é valor é atribuído a variável
        }
        /* Implemente o filtro que foi definido, somente 1 por consulta*/
        if (valor != undefined) { ds = getMatchValue(tempDataset, valor, 0) }
        else if (nome != undefined) { ds = getMatchValue(tempDataset, nome, 1); }
        else if (todos != undefined) { ds = getMatchValue(tempDataset, todos, 2); }
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
    ds.addColumn("Valor");
    ds.addColumn("Nome");
    ds.addColumn("Todos");
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
        ['D','DOC (Comp)', 'D - DOC'],
        ['T','Crédito em Conta Corrente no mesmo Banco', 'T - Crédito em Conta Corrente no mesmo Banco'],
        ['C','Cheque Administrativo', 'C - Cheque Administrativo'],
        ['I','Título de Cobrança (Boleto)', 'I - Título de Cobrança (Boleto)'],
        ['N','Pagamento Eletrônico a Concessionários', 'N - Pagamento Eletrônico a Concessionários'],
        ['P','Crédito em Conta de Poupança', 'P - Crédito em Conta de Poupança'],
        ['R','Ordem de Pagamento à disposição', 'R - Ordem de Pagamento à disposição'],
        ['X','Crédito em Conta Real Time', 'X - Crédito em Conta Real Time'],
        ['Y','TEP CIP', 'Y - TEP CIP'],
        ['Z','TED STR', 'Z - TEP STR'],
        ['A','DARF', 'A - DARF'],
        ['G','GPS', 'G - GPS'],
        ['E','Débito Automático', 'E - Débito Automático'],
        ['M','Crédito em Conta Corrente de Mesma Titularidade', 'M - Crédito em Conta Corrente de Mesma Titularidade'],
        ['B','IPTU/ISS/Outros Tributos Municipais', 'B - IPTU/ISS/Outros Tributos Municipais'],
        ['F','DARJ', 'F - DARJ'],
        ['J','GARE - SP ICMS', 'J - GARE - SP ICMS'],
        ['L','FGTS - GFIP', 'L - FGTS - GFIP'],
        ['O','GNRE e Tributos Estaduais c/ Cód. Barras', 'O - DOC'],
        ['S','PIX Transferência', 'S - PIX Transferência'],
        ['Q','PIX QR Code', 'Q - PIX QR Code']
           ]
}