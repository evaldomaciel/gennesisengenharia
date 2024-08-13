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
        ['0','Sem Classificação'],
        ['1','Devolução'],
        ['2','Adiantamento'],
        ['3','Nota de Crédito'],
        ['4','Previsão'],
        ['5','Lançamento Gerador de IRRF'],
        ['6','Lançamento Gerador de IRRF gerado por Pessoa Jurídica'],
        ['7','Lançamento Gerador de IRRF gerado por Pessoa Física'],
        ['8','Lançamento gerado como parcela de adiantamento'],
        ['9','Lançamento Gerador de INSS'],
        ['10','Lançamento Gerador de INSS e IRRF'],
        ['11','Lançamento de INSS - Empregado'],
        ['12','Lançamento de INSS - Empregador'],
        ['13','Lançamento de IRRF gerado pelo RM Labore'],
        ['14','Lançamento de Tributi gerado na Baixa de um NF'],
        ['15','Lançamento gerado por Acordo'],
        ['16','Lançamento gerado por Empréstimo'],
        ['17','Lançamento de IOF a receber gerado pelo Empréstimo'],
        ['18','Lançamento de Tributo (CSLL) gerado na Baixa de uma NF'],
        ['19','Lançamento de Tributo (PIS) gerado na Baixa de uma NF'],
        ['20','Lançamento de Tributo (CONFINS) gerado na Baixa de uma NF '],
        ['21','Lançamento de Tributo agrupado gerado na Baixa de uma NF'],
        ['22','Lançamento de IOF a pagar para a Receita Federal'],
        ['23','Lançamento de Líquido de Rescisão gerado pelo RM Labore'],
        ['24','Lançamento de Total da GRFC gerado pelo RM Labore'],
        ['25','Lançamento que compõe a base para geração de IR'],
        ['26','Lançamento de SEST/SENAT (INSS transportadoras)'],
        ['30','Lançamento que compõe a base para geração de IR e é gerador de INSS'],
        ['31','Lançamento de INSS gerado pelo RM Liber (Pessoa Jurídica)'],
        ['32','Lançamento de IRFF gerado pelo RM Liber'],
        ['33','Financiamento'],
        ['34','Crédito de Adiantamento'],
        ['35','Vendor'],
        ['36','Líquido Salarial Labore'],
        ['37','Líquido Férias Labore'],
        ['38','INSS a Pagar Labore'],
        ['39','FGTS Labore'],
        ['40','Fórmula Labore'],
        ['41','IRRF Férias Labore'],
        ['42','IRRF Rescisão Labore'],
        ['43','FGTS 13 Salário Labore'],
        ['44','INSS 13 Salário Labore'],
        ['45','IRRF 13 Salário Labore'],
        ['46','Pensão Total Labore'],
        ['47','FGTS SEFIP Labore'],
        ['48','Pensão Folha Labore'],
        ['49','Pensão Férias Labore'],
        ['50','Pensão 13 Salário Labore'],
        ['51','Pensão PL Labore'],
        ['52','IRRF Total Labore']
    ]    
}
