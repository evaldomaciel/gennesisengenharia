function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetBuilder.newDataset();
		dataset.addColumn("Veículo - Filial");
		
			
		var usuario = DatasetFactory.getDataset("ds_Cadastro De Veículos", null, null, null);
	   
	    for (var i = 0; i < usuario.rowsCount; i++) {
			dataset.addRow([usuario.getValue(i, "Veiculo") + " - " + usuario.getValue(i, "polo")]);
		}
    
    return dataset;
}