function createDataset(fields, constraints, sortFields) {
	 //Inserir na coluna pass a senha no formato base64
	 var dataset = DatasetBuilder.newDataset();
	 dataset.addColumn("user");
	 dataset.addColumn("pass");
	 
	 dataset.addRow(new Array(
			    "fluig", 
			    "QFRvdHZzMTIzNDU2"
			    )
	 );
	 return dataset
}