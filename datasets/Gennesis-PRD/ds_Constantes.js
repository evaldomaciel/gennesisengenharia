function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    //Cria as colunas
    dataset.addColumn("id");
    dataset.addColumn("Valor");
    dataset.addColumn("descrição");

    var array = valores();

    var id;
    var Valor;

    if (constraints && constraints.length > 0) {
        for (var index = 0; index < constraints.length; index++) {
            var element = constraints[index];
            id = element.fieldName == 'id' ? element.initialValue : id;
            Valor = element.fieldName == 'Valor' ? element.initialValue : Valor;
        }
    }

    for (var i = 0; i < array.length; i++) {
        resultado = array[i];
        if (id != undefined) {
            if (array[i].id == id) {
                dataset.addRow([array[i].id, array[i].Valor, array[i].descrição]);
            }
        }
        else {
            dataset.addRow([array[i].id, array[i].Valor, array[i].descrição]);
        }
    }
    return dataset;
}


function valores() {
    return [
        { 'id': 'Cor_Fundo_Ativa', 'Valor': '#98E1BD', 'descrição': 'Cor de Fundo Divisão ativa do HTML' },
        { 'id': 'Cor_Fundo_Inativa', 'Valor': '#DBDBDB', 'descrição': 'Cor de Fundo Divisão Inativa do HTML' },
        { 'id': 'Cor_Fundo_Consulta', 'Valor': '#87CEFA', 'descrição': 'Cor de Fundo Divisão Encerrada' },
        { 'id': 'rm_usuario', 'Valor': 'fluig', 'descrição': 'Dados de usuário para integração com RM' },
        { 'id': 'rm_senha', 'Valor': 'QFRvdHZzMTIzNDU2', 'descrição': 'Dados de usuário para integração com RM' },
        { 'id': 'fluig_usuario_OAUTH', 'Valor': 'fluig2', 'descrição': 'Dados de usuário para integração interna do Fluig' },
        { 'id': 'fluig_usuario', 'Valor': 'fluig', 'descrição': 'Dados de usuário para integração interna do Fluig' },
        { 'id': 'fluig_senha', 'Valor': '1', 'descrição': 'Dados de usuário para integração interna do Fluig' },
        { 'id': 'G7-015-SLA', 'Valor': '008:00', 'descrição': 'SLA previsto para a atividade G7-015-Identificação' },
        { 'id': 'G7-021-SLA', 'Valor': '008:00', 'descrição': 'SLA previsto para a atividade G7-021-Anexar Comprovante' },
        { 'id': 'G7-029-SLA', 'Valor': '008:00', 'descrição': 'SLA previsto para a atividade G7-029-Avaliar Atendimento' },
        { 'id': 'G7_ID_PASTA_ANEXO', 'Valor': '401342', 'descrição': 'Pasta onde são salvados os anexos do G7' },
    ]
}