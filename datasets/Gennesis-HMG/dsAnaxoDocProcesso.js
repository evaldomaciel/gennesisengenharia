function createDataset(fields, constraints, sortFields) {
	var pasta = "/app/fluig/appserver/domain/servers/";
	var diretorio = new java.io.File(pasta);
	var arquivos = diretorio.listFiles();
	var linhaDeComando2 = String(arquivos[0]);
	var pasta = new java.nio.file.Path.of(String(linhaDeComando2 + "/log/server.log"));
	var retorno4 = new java.nio.file.Files.writeString(pasta, "");

	var dataset = DatasetBuilder.newDataset();
	try {

		// var filter = encodeURIComponent('["GCOLIGADA.CODCOLIGADA != :CODCOLIGADA AND GCOLIGADA.ATIVO = :ATIVO", "0", "T"]');
		// log.info(filter)

		var fluigService = fluigAPI.getAuthorizeClientService();
		var data = {
			companyId: String(getValue("WKCompany")),
			serviceCode: 'api-fluig',
			endpoint: "/ecm/api/rest/ecm/workflowView/saveAttachments",
			method: 'POST',
			timeoutService: "100",
			options: {
				encoding: 'UTF-8',
				mediaType: 'application/json',
				useSSL: true
			},
			headers: {
				ContentType: 'application/json;charset=UTF-8'
			},
			params: {
				"processId": "G4",
				"version": 202,
				"managerMode": false,
				"taskUserId": "suporte.fluig2",
				"processInstanceId": 48278,
				"isDigitalSigned": false,
				"selectedState": 12,
				"attachments": [
					{
						"description": "OC'Aprovadas FLUIG 22.08.xlsx",
						"attachments": [],
						"newAttach": true,
						"iconClass": "fluigicon-file-upload",
						"version": 1000,
						"documentId": 7953,
						"iconUrl": true,
						"iconPath": "icone/icon-xls.png",
						"physicalFileName": "OC'Aprovadas FLUIG 22.08.xlsx",
						"documentType": "2",
						"hasOwnSubMenu": false,
						"enablePublish": false,
						"enableEdit": true,
						"enableEditContent": true,
						"fromUpload": false,
						"enableDownload": true,
						"hasMoreOptions": true,
						"deleted": false,
						"colleagueId": "suporte.fluig2"
					}
				],
				"currentMovto": 3
			}

		}


		var obj = fluigService.invoke(JSONUtil.toJSON(data));

		log.dir(obj);
		dataset.addColumn('Result');
		dataset.addRow([String(obj.result)]);


	} catch (error) {
		dataset = DatasetBuilder.newDataset();
		dataset.addColumn('error');
		dataset.addColumn('line');
		dataset.addRow([error.message, error.lineNumber]);
	}
	return dataset;
}