function createDataset(fields, constraints, sortFields) {

    var ds = DatasetBuilder.newDataset();
    ds.addColumn("Nome");

    ds.addRow(new Array("Liquidação não duvidosa"));
    return ds;
}

function onMobileSync(user) {

}