function createDataset(fields, constraints, sortFields) {
	try {
		return processResult(callService(fields, constraints, sortFields));
	} catch (e) {
		return processErrorResult(e, constraints);
	}
}

function callService(fields, constraints, sortFields) {
	var serviceData = data();
	var params = serviceData.inputValues;
	var assigns = serviceData.inputAssignments;
	var properties = {};
	properties["log.soap.messages"] = "false";
	properties["disable.chunking"] = "false";
	properties["use.ssl"] = "false";
	properties["basic.authorization"] = "true";
	properties["basic.authorization.username"] = getConstante('rm_usuario');
	properties["basic.authorization.password"] = getConstante('rm_senha');

	verifyConstraints(serviceData.inputValues, constraints);

	var serviceHelper = ServiceManager.getService(serviceData.fluigService);
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	var service = serviceLocator.getRMIwsDataServer();
	var headers = getSOAPHeaders(serviceHelper, serviceData.extraParams.headers);
	var customClient = serviceHelper.getCustomClient(service, properties, headers);
	var response = customClient.readView(
		getParamValue(params.dataServerName, assigns.dataServerName),
		getParamValue(params.filtro, assigns.filtro),
		getParamValue(params.contexto, assigns.contexto));
	return response;
}

function verifyConstraints(params, constraints) {
	var filtro = new Array();
	var contexto = new Array();
	filtro.push("ATIVO=1");
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			try {
				if (String(constraints[i].fieldName).toUpperCase() == "CODCOLIGADA") {
					filtro.push([constraints[i].fieldName] + " = '" + constraints[i].initialValue + "'");
					contexto.push("CODCOLIGADA=" + constraints[i].initialValue)
				}
				else if (String(constraints[i].fieldName).toUpperCase() == "CODUSUARIO") {
					contexto.push("CODUSUARIO=" + constraints[i].initialValue)
				}
				else if (String(constraints[i].fieldName).toUpperCase() != "SQLLIMIT") {
					filtro.push([constraints[i].fieldName] + " = '" + constraints[i].initialValue + "'");
				}

			} catch (e) {
				params[constraints[i].fieldName] = constraints[i].initialValue;
			}
		}
	}
	params.filtro = filtro.join(" AND ");
	if (contexto.length == 0) params.contexto = "CODCOLIGADA=2";
	else params.contexto = contexto.join(";");
}

function processResult(result) {
	var dataset = DatasetBuilder.newDataset();
	var columns = new Array();
	var factory = javax.xml.parsers.DocumentBuilderFactory.newInstance();
	var parser = factory.newDocumentBuilder();
	var source = new org.xml.sax.InputSource(new java.io.StringReader(result));
	var xmlResponse = parser.parse(source);
	var nodes = xmlResponse.getElementsByTagName("FDadosPgto");

	for (var i = 0; i < nodes.getLength(); i++) {
		var children = nodes.item(i).getChildNodes();
		for (var j = 0; j < children.getLength(); j++) {
			if (children.item(j) instanceof org.w3c.dom.Element) {
				var column = children.item(j).getNodeName();
				if (columns.indexOf(column) < 0) {
					columns.push(column);
					dataset.addColumn(column);
				}
			}
		}
	}
	for (var i = 0; i < nodes.getLength(); i++) {
		var datasetRow = new Array();
		var children = nodes.item(i).getChildNodes();
		for (var j = 0; j < columns.length; j++) {
			var node = children.getElementsByTagName(columns[j]);
			if (node.getLength() > 0 && node.item(0).hasChildNodes && node.item(0).getFirstChild() != null) {
				datasetRow.push(node.item(0).getFirstChild().getTextContent());
			} else {
				datasetRow.push("");
			}
		}
		dataset.addRow(datasetRow);
	}

	return dataset;
}

function processErrorResult(error, constraints) {
	var dataset = DatasetBuilder.newDataset();
	var params = data().inputValues;
	verifyConstraints(params, constraints);
	dataset.addColumn('error');
	dataset.addColumn('dataServerName');
	dataset.addColumn('filtro');
	dataset.addColumn('contexto');
	var dataServerName = isPrimitive(params.dataServerName) ? params.dataServerName : JSONUtil.toJSON(params.dataServerName);
	var filtro = isPrimitive(params.filtro) ? params.filtro : JSONUtil.toJSON(params.filtro);
	var contexto = isPrimitive(params.contexto) ? params.contexto : JSONUtil.toJSON(params.contexto);
	dataset.addRow([error.message, dataServerName, filtro, contexto]);
	return dataset;
}

function getParamValue(param, assignment) {
	if (assignment == 'VARIABLE') {
		return getValue(param);
	} else if (assignment == 'NULL') {
		return null;
	}
	return param;
}

function hasValue(value) {
	return value !== null && value !== undefined;
}

function isPrimitive(value) {
	return ((typeof value === 'string') || value.substring !== undefined) || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'undefined';
}


function getObjectFactory(serviceHelper) {
	var objectFactory = serviceHelper.instantiate("com.totvs.ObjectFactory");
	return objectFactory;
}

function getSOAPHeaders(serviceHelper, headers) {
	var soapHeaders = [];
	return soapHeaders;
}

function data() {
	return {
		"fluigService": "RMWsDataServer",
		"operation": "readView",
		"soapService": "WsDataServer",
		"portType": "IwsDataServer",
		"locatorClass": "com.totvs.WsDataServer",
		"portTypeMethod": "getRMIwsDataServer",
		"parameters": [],
		"inputValues": {
			"dataServerName": "FinDADOSPGTODataBR",
			"filtro": "1=1",
			"contexto": "CODCOLIGADA=2"
		},
		"inputAssignments": {
			"dataServerName": "VALUE",
			"filtro": "VALUE",
			"contexto": "VALUE"
		},
		"outputValues": {},
		"outputAssignments": {},
		"extraParams": {
			"disableChunking": false,
			"useSSL": false,
			"basicAuthentication": true,
			"basicAuthenticationUsername": getConstante('rm_usuario'),
			"basicAuthenticationPassword": getConstante('rm_senha'),
			"parseResult": true,
			"headers": [],
			"datasetkeys": [],
			"parserType": "XML",
			"mainNode": "FDadosPgto",
			"enabled": true
		}
	}
}

function stringToBoolean(param) { if (typeof (param) === 'boolean') { return param; } if (param == null || param === 'null') { return false; } switch (param.toLowerCase().trim()) { case 'true': case 'yes': case '1': return true; case 'false': case 'no': case '0': case null: return false; default: return Boolean(param); } }

function getConstante(param) {
	var aConstraint = [];
	aConstraint.push(DatasetFactory.createConstraint('id', param, param, ConstraintType.MUST));
	var oConstantes = DatasetFactory.getDataset('ds_Constantes', null, null, null);
	for (var i = 0; i < oConstantes.rowsCount; i++) {
		if (oConstantes.getValue(i, "id").trim() == param.trim()) {
			return oConstantes.getValue(i, "Valor").trim();
		}
	}
	return '0';
}