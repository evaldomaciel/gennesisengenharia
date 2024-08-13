/* function createDataset(fields, constraints, sortFields) {	
    //Busca o dataset
    let dataset = DatasetFactory.getDataset("ds_CadastroItens", null, null, null);
    return dataset;

} 

function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetBuilder.newDataset();
		dataset.addColumn("InformaçõesDoCadastro");
		dataset.addColumn("LocalDeObraApartirDoLocalDeChegada");
			
		var usuario = DatasetFactory.getDataset("ds_CadastroItens", null, null, null);
	   
	    for (var i = 0; i < usuario.rowsCount; i++) {
			dataset.addRow([usuario.getValue(i, "LocalDeChegada") + " - " + usuario.getValue(i, "CentroDeCustoInputChegada")]);
		}
    
    return dataset;
}


function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("LocalDeObra");

	dataset.addColumn("LocalDeObraApartirDoLocalDeChegada");
	
	var filtroLocaldeChegada = '';
	
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
			if ( constraints[i].fieldName == 'CentroDeCustoInputChegada' ){
				filtroLocaldeChegada = constraints[i].initialValue;
			}
        }
    }

	var ct = [];

	if ( filtroLocaldeChegada != '' ){
		ct.push( DatasetFactory.createConstraint("CentroDeCustoInputChegada", filtroLocaldeChegada, filtroLocaldeChegada, ConstraintType.MUST) )
	}

	var usuario = DatasetFactory.getDataset("ds_CadastroItens", null, ct, null);
	var coluna2 = DatasetFactory.getDataset("ds_CadastroItens",null, ct, null);
	
	for (var i = 0; i < usuario.rowsCount; i++) {
		dataset.addRow([usuario.getValue(i, "CentroDeCustoInputChegada")]);
	}
	for (var j = 0; j < coluna2.rowsCount; j++) {
		dataset.addRow([coluna2.getValue(j, "LocalDeChegada")]);
	}
    
    return dataset;
}*/

function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("LocalDeObra");
    dataset.addColumn("LocalDeObraApartirDoLocalDeChegada");

    var filtroLocaldeChegada = 'MACAIBA SMS - MANUTENÇÃO';

    var ct = [];
    if (filtroLocaldeChegada != '') {
        ct.push(DatasetFactory.createConstraint("CentroDeCustoInputChegada", filtroLocaldeChegada, filtroLocaldeChegada, ConstraintType.MUST));
    }

    var usuario = DatasetFactory.getDataset("ds_CadastroItens", null, ct, null);
    
    for (var i = 0; i < usuario.rowsCount; i++) {
        var localDeObra = usuario.getValue(i, "CentroDeCustoInputChegada");
        var localDeObraApartirDoLocalDeChegada = usuario.getValue(i, "LocalDeChegada");
        
        dataset.addRow([localDeObra, localDeObraApartirDoLocalDeChegada]);
    }
    
    return dataset;
}
