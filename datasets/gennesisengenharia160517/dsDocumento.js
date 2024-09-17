function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	try {
		//Cria as colunas
		dataset.addColumn("documentid");
		dataset.addColumn("retorno");

		var lista = getG5Lista();
		if (lista.size() > 0) {
			var serviceHelper = ServiceManager.getService("ECMDocumentService");
			var serviceLocator = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.ECMDocumentServiceService");
			var service = serviceLocator.getDocumentServicePort();

			for (var index = 0; index < lista.size(); index++) {
				var element = parseInt(lista.get(index));
				var response = service.deleteDocument("fluig", "1", 1, element, "4ef20412-7687-40a4-b1c8-095c0a92503e");
				dataset.addRow([element, JSONUtil.toJSON(response)]);
			}
		}
		else {
			dataset.addRow([0, 'Nada a apagar']);
		}

	} catch (e) {
		dataset = DatasetBuilder.newDataset();
		dataset.addColumn("retorno");
		dataset.addRow([String(e)]);
	}
	return dataset;
}

function getG5Lista() {
	try {
		var colunasDs_G5 = new Array('documentid');
		var datasetDs_G5 = DatasetFactory.getDataset('ds_G5', colunasDs_G5, [
			DatasetFactory.createConstraint('sqlLimit', '1000', '1000', ConstraintType.MUST)
		], null);

		var lista = new java.util.ArrayList();

		for (var index = 0; index < datasetDs_G5.rowsCount; index++) {
			var documentid = datasetDs_G5.getValue(index, 'documentid');
			if (!lista.contains(documentid)) lista.add(documentid);
		}
		if (lista.size() > 0) {
			return lista;
		}
		return false;
	} catch (error) {
		throw new Error(error);
	}
}