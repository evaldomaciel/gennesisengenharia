function createDataset(fields, constraints, sortFields) {
	try {
		return processResult(callService(fields, constraints, sortFields));
	} catch(e) {
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
	properties["basic.authorization.username"] = "fluig";
	properties["basic.authorization.password"] = "1";

	verifyConstraints(serviceData.inputValues, constraints);

	var serviceHelper = ServiceManager.getService(serviceData.fluigService);
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	var service = serviceLocator.getRMIwsDataServer();
	var headers = getSOAPHeaders(serviceHelper, serviceData.extraParams.headers);
	var customClient = serviceHelper.getCustomClient(service, properties, headers);
	var response = customClient.saveRecord(getParamValue(params.dataServerName, assigns.dataServerName), getParamValue(params.xml, assigns.xml), 
		getParamValue(params.contexto, assigns.contexto));

	return response;
}

function defineStructure() {
		addColumn('response');
}

function onSync(lastSyncDate) {
	var serviceData = data();
	var synchronizedDataset = DatasetBuilder.newDataset();

	try {
		var resultDataset = processResult(callService());
		if (resultDataset != null) {
			var values = resultDataset.getValues();
			for (var i = 0; i < values.length; i++) {
				synchronizedDataset.addRow(values[i]);
			}
		}

	} catch(e) {
		log.info('Dataset synchronization error : ' + e.message);

	}
	return synchronizedDataset;
}

function verifyConstraints(params, constraints) {
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			try {
				params[constraints[i].fieldName] = JSON.parse(constraints[i].initialValue);
			} catch(e) {
				params[constraints[i].fieldName] = constraints[i].initialValue;
			}
		}
	}
}

function processResult(result) {
	var dataset = DatasetBuilder.newDataset();

	dataset.addColumn("response");
	dataset.addRow([result]);

	return dataset;
}

function processErrorResult(error, constraints) {
	var dataset = DatasetBuilder.newDataset();

	var params = data().inputValues;
verifyConstraints(params, constraints);

dataset.addColumn('error');
	dataset.addColumn('dataServerName');
	dataset.addColumn('xml');
	dataset.addColumn('contexto');

	var dataServerName = isPrimitive(params.dataServerName) ? params.dataServerName : JSONUtil.toJSON(params.dataServerName);
	var xml = isPrimitive(params.xml) ? params.xml : JSONUtil.toJSON(params.xml);
	var contexto = isPrimitive(params.contexto) ? params.contexto : JSONUtil.toJSON(params.contexto);

	dataset.addRow([error.message, dataServerName, xml, contexto]);

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
  "fluigService" : "RMWsDataServer",
  "operation" : "saveRecord",
  "soapService" : "WsDataServer",
  "portType" : "IwsDataServer",
  "locatorClass" : "com.totvs.WsDataServer",
  "portTypeMethod" : "getRMIwsDataServer",
  "parameters" : [ ],
  "inputValues" : {
    "dataServerName" : "FinLanDataBR",
    "xml" : "fdsfdsfdsfsfsfs",
    "contexto" : "CODCOLIGADA=1"
  },
  "inputAssignments" : {
    "dataServerName" : "VALUE",
    "xml" : "VALUE",
    "contexto" : "VALUE"
  },
  "outputValues" : { },
  "outputAssignments" : { },
  "extraParams" : {
    "disableChunking" : false,
    "useSSL" : false,
    "basicAuthentication" : true,
    "basicAuthenticationUsername" : "fluig",
    "basicAuthenticationPassword" : "1",
    "parseResult" : false,
    "headers" : [ ],
    "datasetkeys" : [ ],
    "enabled" : true
  }
}
}

 function stringToBoolean(param) { if(typeof(param) === 'boolean') {  return param;  }  if (param == null || param === 'null') {  return false;  }  switch(param.toLowerCase().trim()) {  case 'true': case 'yes': case '1': return true;  case 'false': case 'no': case '0': case null: return false;  default: return Boolean(param);  }  } 