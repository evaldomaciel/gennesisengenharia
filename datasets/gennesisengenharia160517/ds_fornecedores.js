function defineStructure() {
    addColumn("Nome");
    addColumn("Nome Social");
    addColumn("CPF/CNPJ");
    addColumn("Nome - Nome Social - CPF/CNPJ", DatasetFieldType.STRING);
    setKey(["Nome - Nome Social - CPF/CNPJ"]);
    addIndex(["Nome - Nome Social - CPF/CNPJ"]);
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
    ds.addColumn("Nome");
    ds.addColumn("Nome Social");
    ds.addColumn("CPF/CNPJ");
    ds.addColumn("Nome - Nome Social - CPF/CNPJ");

    var tempDataset = getDefaultValues(); // consulta a fonte de dados do dataset
    var nome;
    var nome_social;
    var cpf_cnpj;
    var todos;
    if (constraints != null && constraints.length && constraints[0].fieldName != "sqlLimit") { //se tiver constraint filtra
        console.log("ds_fornecedores constraints:")
        console.dir(constraints);

        for (var index = 0; index < constraints.length; index++) {
            nome = constraints[index].fieldName == "Nome" ? constraints[index].initialValue : nome; // Se o Nome for informado, é valor é atribuído a variável
            console.log('ds_fornecedores nome -> ' + nome);
            nome_social = constraints[index].fieldName == "Nome Social" ? constraints[index].initialValue : nome_social; // Se a Nome Social for informada, é valor é atribuído a variável
            console.log('ds_fornecedores nome social -> ' + nome_social);
            cpf_cnpj = constraints[index].fieldName == "CPF/CNPJ" ? constraints[index].initialValue : cpf_cnpj; // Se a CPF/CNPJ for informada, é valor é atribuído a variável
            console.log('ds_fornecedores cpf/cnpj -> ' + cpf_cnpj);
            todos = constraints[index].fieldName == "Nome - Nome Social - CPF/CNPJ" ? constraints[index].initialValue : todos; // Se a CPF/CNPJ for informada, é valor é atribuído a variável
            console.log('ds_fornecedores todos -> ' + todos);
        }
        /* Implemente o filtro que foi definido, somente 1 por consulta*/
        if (nome != undefined) {
            ds = getMatchValue(tempDataset, nome, 0);
        }
        if (nome_social != undefined) {
            ds = getMatchValue(tempDataset, nome_social, 1);
        }
        if (cpf_cnpj != undefined) {
            ds = getMatchValue(tempDataset, cpf_cnpj, 2);
        }
        if (todos != undefined) {
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
    ds.addColumn("Nome");
    ds.addColumn("Nome Social");
    ds.addColumn("CPF/CNPJ");
    ds.addColumn("Nome - Nome Social - CPF/CNPJ");
 
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
        ['Carlos', 'Rosangela', '472.123.523-42', 'Carlos - Rosangela - 472.123.523-42'],
        ['Maria', 'Marco Aurelio', '923.123.523-98', 'Maria - Marco Aurelio - 923.123.523-98'],
        ['Antonio', 'Madalena', '123.423.623-85','Antonio - Madalena - 123.423.623-85']
    ]
}