function createDataset(fields, constraints, sortFields) {

    var ds = DatasetBuilder.newDataset();
    ds.addColumn("Nome");
    ds.addRow(new Array("RH"));
    ds.addRow(new Array("Compras"));
    ds.addRow(new Array("Administrativo"));
    ds.addRow(new Array("Departamento Pessoal"));
    ds.addRow(new Array("Licitações"));
    ds.addRow(new Array("Contratos"));
    ds.addRow(new Array("Logística"));
    ds.addRow(new Array("Almoxarifado"));
    ds.addRow(new Array("Engenharia"));
    ds.addRow(new Array("Segurança do Trabalho"));
    ds.addRow(new Array("Assistência diretoria"));
    ds.addRow(new Array("Financeiro"));
    ds.addRow(new Array("Faturamento"));
    ds.addRow(new Array("Jurídico"));
    ds.addRow(new Array("Projetos"));
    return ds;
}

function onMobileSync(user) {

}