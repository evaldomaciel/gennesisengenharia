function createDataset(fields, constraints, sortFields) {

    var ds = DatasetBuilder.newDataset();
    ds.addColumn("Nome");

    ds.addRow(new Array("Preencher os dados em ds_tipo_lancamento"));
    return ds;
}

function onMobileSync(user) {

}