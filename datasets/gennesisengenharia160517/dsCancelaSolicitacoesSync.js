function defineStructure() {
	addColumn("vl_num_solicitacao", DatasetFieldType.STRING)
	addColumn("cancelamento", DatasetFieldType.STRING)
	setKey(["vl_num_solicitacao"]);
	addIndex(["vl_num_solicitacao", "cancelamento"]);
}
function onSync(lastSyncDate) {
	return geraDataset(true);
}

function createDataset(fields, constraints, sortFields) {
	return geraDataset(false);
}

function geraDataset(sync) {
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("vl_num_solicitacao");
	newDataset.addColumn("cancelamento");

	try {
		var processos = obtemProcessos('01/07/2020', dataSemanaAtras());
		for (var index = 0; index < processos.rowsCount; index++) {
			// for (var index = 0; index < 10; index++) {
			// var vl_num_solicitacao = index;
			var vl_num_solicitacao = processos.getValue(index, 'workflowProcessPK.processInstanceId');
			var cancelText = "Teste";
			var cancelamento = cancelarSol(vl_num_solicitacao, cancelText);

			var row = [vl_num_solicitacao, cancelamento]
			if (sync) newDataset.addOrUpdateRow(row);
			else newDataset.addRow(row);
		}

	} catch (e) {
		newDataset = DatasetBuilder.newDataset();
		newDataset.addColumn('QUERY');
		newDataset.addColumn('ERROR');
		if (sync) newDataset.addOrUpdateRow([e.message, e.lineNumber]);
		else newDataset.addRow([e.message, e.lineNumber]);
	}
	return newDataset;
}

function obtemProcessos(dtIni, dtFim) {
	var status = DatasetFactory.createConstraint('status', 0, 0, ConstraintType.MUST);
	var sqlLimit = DatasetFactory.createConstraint('sqlLimit', 5000, 5000, ConstraintType.MUST);
	var dt = DatasetFactory.createConstraint('startDateProcess', dtIni, dtFim, ConstraintType.MUST);
	var datasetWorkflowProcess = DatasetFactory.getDataset('workflowProcess', null, new Array(status, sqlLimit, dt), null);
	if (datasetWorkflowProcess.rowsCount > 0) {
		return datasetWorkflowProcess;
	} else {
		return false;
	}
}

function dataSemanaAtras() {
	var hoje = new Date();
	var semanaAtras = new Date(hoje);
	semanaAtras.setDate(hoje.getDate() - 7);
	var dia = semanaAtras.getDate().toString();
	if (dia.length < 2) { dia = '0' + dia; }
	var mes = (semanaAtras.getMonth() + 1).toString();
	if (mes.length < 2) { mes = '0' + mes; }
	var ano = semanaAtras.getFullYear();
	return dia + '/' + mes + '/' + ano;
}

function cancelarSol(processInstanceId, cancelText) {
	var retornoDataset = DatasetFactory.getDataset('dsCancelaSolicitacoes', null, new Array(
		DatasetFactory.createConstraint('processInstanceId', processInstanceId, processInstanceId, ConstraintType.MUST),
		DatasetFactory.createConstraint('cancelText', cancelText, cancelText, ConstraintType.MUST)
	), null);
	if (retornoDataset.rowsCount > 0) return retornoDataset.getValue(0, 'response');
	else "Erro ao excluir a solicitação " + String(processInstanceId);
}