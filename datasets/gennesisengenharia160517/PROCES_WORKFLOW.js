function createDataset(fields, constraints, sortFields) {
	try {
		return processResult(callService(fields, constraints, sortFields));
	} catch(e) {
		return processErrorResult(e, constraints);
	}
}

function callService(fields, constraints, sortFields) {
	var databaseData = data();
	var resultFields, queryClauses;

	resultFields = getOutputFields(databaseData.outputValues);
	queryClauses = verifyConstraints(databaseData, constraints);

	var result = DatabaseManager.select(databaseData.fluigService, databaseData.operation, resultFields, queryClauses, databaseData.extraParams);

	return result;
}

function defineStructure() {
	var databaseData = data();
	var columns = getOutputFields(databaseData.outputValues);

	for (column in columns) {
		var columnName = removeInvalidChars(columns[column]);
		if (!DatabaseManager.isReservedWord(columnName)) {
			addColumn(columnName);
		} else {
			addColumn('ds_' + columnName);
		}
	}
	if (databaseData.extraParams.key) {
		setKey([databaseData.extraParams.key]);
	}
}

function onSync(lastSyncDate) {
	var databaseData = data();
	var synchronizedDataset = DatasetBuilder.newDataset();

	try {
		var resultDataset = processResult(callService());
		if (resultDataset != null) {
			var values = resultDataset.getValues();
			for (var i = 0; i < values.length; i++) {
				if (databaseData.extraParams.key) {
					synchronizedDataset.addOrUpdateRow(values[i]);
				} else {
					synchronizedDataset.addRow(values[i]);
				}
			}
		}

	} catch(e) {
		log.info('Dataset synchronization error : ' + e.message);

	}
	return synchronizedDataset;
}

function verifyConstraints(params, constraints) {
	var allConstraints = new Array();

	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			if (constraints[i].getFieldName().toLowerCase() == 'sqllimit') {
				params.extraParams['limit'] = constraints[i].getInitialValue();
			} else {
				allConstraints.push(constraints[i]);
			}
		}
	}

	if (allConstraints.length == 0) {
		for (i in params.inputValues) {
			for (j in params.inputValues[i]) {
				var param = params.inputValues[i][j];
				var constraint = DatasetFactory.createConstraint(param.fieldName, param.initialValue, param.finalValue, param.constraintType);
				constraint.setLikeSearch(param.likeSearch);
				constraint.setFieldType(DatasetFieldType.valueOf(param.fieldType));
				allConstraints.push(constraint);
			}
		}
	}
	return allConstraints;
}

function getOutputFields(outputValues) {
	var outputFields = new Array();
	if (outputValues != null) {
		for (field in outputValues) {
			if (outputValues[field].result) {
				outputFields.push(field);
			}
		}
	}
	return outputFields;
}

function processResult(result) {
	var databaseData = data();
	var dataset = DatasetBuilder.newDataset();
	var columns = getOutputFields(databaseData.outputValues);

	for (column in columns) {
		dataset.addColumn(columns[column]);
	}

	for (var i = 0; i < result.size(); i++) {
		var datasetRow = new Array();
		var item = result.get(i);
		for (param in columns) {
			datasetRow.push(item.get(columns[param]));
		}
		dataset.addRow(datasetRow);
	}

	return dataset;
}

function processErrorResult(error, constraints) {
	var dataset = DatasetBuilder.newDataset();

	dataset.addColumn('error');
	dataset.addRow([error.message]);

	return dataset;
}

function removeInvalidChars(columnName) {
	var invalidChars = '#';
	var newChar = '_';
	for (var i = 0; i < invalidChars.length; i++) {
		columnName = columnName.split(invalidChars[i]).join(newChar);
	}

	return columnName;
}

function data() {
	return {
  "fluigService" : "AppDS",
  "operation" : "proces_workflow",
  "tableType" : "TABLE",
  "parameters" : [ ],
  "inputValues" : {
    "COD_EMPRESA" : [ ],
    "NUM_PROCES" : [ {
      "fieldName" : "NUM_PROCES",
      "initialValue" : "105",
      "finalValue" : "105",
"constraintType" :  ConstraintType.MUST,
      "likeSearch" : false,
      "fieldType" : "NUMBER"
    } ],
    "LOG_ATIV" : [ ],
    "NUM_SEQ_ANEXO_PRINC" : [ ],
    "NR_DOCUMENTO_CARD" : [ ],
    "NR_DOCUMENTO_CARD_INDEX" : [ ],
    "CLOSURE_STATUS" : [ ],
    "DEADLINE_DATE" : [ ],
    "END_DATE" : [ ],
    "NOTIFY_DELAY" : [ ],
    "PERIOD_ID" : [ ],
    "COD_DEF_PROCES" : [ ],
    "COD_MATR_REQUISIT" : [ ],
    "NUM_PROCES_ORIG" : [ ],
    "NUM_SEQ_THREAD_ORIG" : [ ],
    "START_DATE" : [ ],
    "STATUS" : [ ],
    "TOTAL_DEADLINE" : [ ],
    "TOTAL_RUNTIME" : [ ],
    "TOTAL_WARNING" : [ ],
    "COD_UUID" : [ ],
    "NUM_VERS" : [ ],
    "WARNING_DATE" : [ ],
    "SCRIPT_VERSION" : [ ]
  },
  "inputAssignments" : { },
  "outputValues" : {
    "COD_EMPRESA" : {
      "result" : true,
      "type" : "bigint"
    },
    "NUM_PROCES" : {
      "result" : true,
      "type" : "int"
    },
    "LOG_ATIV" : {
      "result" : true,
      "type" : "bit"
    },
    "NUM_SEQ_ANEXO_PRINC" : {
      "result" : true,
      "type" : "int"
    },
    "NR_DOCUMENTO_CARD" : {
      "result" : true,
      "type" : "int"
    },
    "NR_DOCUMENTO_CARD_INDEX" : {
      "result" : true,
      "type" : "int"
    },
    "CLOSURE_STATUS" : {
      "result" : true,
      "type" : "int"
    },
    "DEADLINE_DATE" : {
      "result" : true,
      "type" : "datetime"
    },
    "END_DATE" : {
      "result" : true,
      "type" : "datetime"
    },
    "NOTIFY_DELAY" : {
      "result" : true,
      "type" : "bit"
    },
    "PERIOD_ID" : {
      "result" : true,
      "type" : "varchar"
    },
    "COD_DEF_PROCES" : {
      "result" : true,
      "type" : "varchar"
    },
    "COD_MATR_REQUISIT" : {
      "result" : true,
      "type" : "varchar"
    },
    "NUM_PROCES_ORIG" : {
      "result" : true,
      "type" : "int"
    },
    "NUM_SEQ_THREAD_ORIG" : {
      "result" : true,
      "type" : "int"
    },
    "START_DATE" : {
      "result" : true,
      "type" : "datetime"
    },
    "STATUS" : {
      "result" : true,
      "type" : "int"
    },
    "TOTAL_DEADLINE" : {
      "result" : true,
      "type" : "int"
    },
    "TOTAL_RUNTIME" : {
      "result" : true,
      "type" : "bigint"
    },
    "TOTAL_WARNING" : {
      "result" : true,
      "type" : "int"
    },
    "COD_UUID" : {
      "result" : true,
      "type" : "varchar"
    },
    "NUM_VERS" : {
      "result" : true,
      "type" : "int"
    },
    "WARNING_DATE" : {
      "result" : true,
      "type" : "datetime"
    },
    "SCRIPT_VERSION" : {
      "result" : true,
      "type" : "int"
    }
  },
  "outputAssignments" : { },
  "extraParams" : { }
}
;
}