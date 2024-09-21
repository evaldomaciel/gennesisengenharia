function defineStructure() {
	addColumn("colleagueId");
	addColumn("_id");
	addColumn("Matou");
	addColumn("Retorno");
	addColumn("StringT");
	setKey(["colleagueId", "_id"]);
	addIndex(["colleagueId", "_id"]);
}
function onSync(lastSyncDate) {
	return montaDataset(null, null, null, true);
}

function createDataset(fields, constraints, sortFields) {
	return montaDataset(fields, constraints, sortFields, false);
}

function montaDataset(fields, constraints, sortFields, sync) {
	let newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("colleagueId");
	newDataset.addColumn("_id");
	newDataset.addColumn("Matou");
	newDataset.addColumn("Retorno"); 
	newDataset.addColumn("StringT");
	let retorno;
	try {
		var threads = new java.lang.Thread.getAllStackTraces().keySet()

		var it = threads.iterator();
		while (it.hasNext()) {
			var thread = it.next();
			var threadName = thread.getName();
			var matou = [
				'default task-11842',
				'JSChronos.CustomizationManagerImpl.invokeFunction.createDataset',
				'MySQL Statement Cancellation Timer'
			].indexOf(String(thread.getName())) >= 0 ? "Sim" : "Não";
			if (matou == "Sim") {
				try {
					thread.stop();
					thread.interrupt();
					thread.sleep(100);
					if (thread.isAlive()) {
						thread.stop();
						thread.interrupt();
					}
					retorno = "Interrompido";
				} catch (e) {
					retorno = "Erro ao interromper: " + e.message;
				}
			} else {
				retorno = "Não interrompido";
			}
			if (sync) newDataset.addOrUpdateRow([threadName, parseInt(thread.getId()), matou, retorno, thread.toString()]);
			else newDataset.addRow([threadName, parseInt(thread.getId()), matou, retorno, thread.toString()]);
		}
		return newDataset;

	} catch (error) {
		newDataset = DatasetBuilder.newDataset();
		if (sync) newDataset.addOrUpdateRow([threadName, parseInt(thread.getId()), matou, retorno, thread.toString()]);
		else newDataset.addRow([threadName, parseInt(thread.getId()), matou, retorno, thread.toString()]);
		return newDataset;
	}
}
