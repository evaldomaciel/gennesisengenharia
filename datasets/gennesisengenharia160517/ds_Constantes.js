function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    //Cria as colunas
    dataset.addColumn("id");
    dataset.addColumn("Valor");
    dataset.addColumn("descrição");

    dataset.addRow(new Array('Cor_Fundo_Ativa', '#98E1BD', 'Cor de Fundo Divisão ativa do HTML'));
    dataset.addRow(new Array('Cor_Fundo_Inativa', '#DBDBDB', 'Cor de Fundo Divisão Inativa do HTML'));
    dataset.addRow(new Array('Cor_Fundo_Consulta', '#87CEFA', 'Cor de Fundo Divisão Encerrada'));
 
    return dataset;
}