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
  "operation" : "estado_proces",
  "tableType" : "TABLE",
  "parameters" : [ ],
  "inputValues" : {
    "COD_EMPRESA" : [ ],
    "COD_DEF_PROCES" : [ ],
    "NUM_SEQ" : [ ],
    "NUM_VERS" : [ ],
    "NUM_PERC_CSENSO" : [ ],
    "NUM_HRS_TOLERA_RESPONS" : [ ],
    "NUM_HRS_TOLERA_GESTOR" : [ ],
    "NUM_HRS_TOLERA_REQUISIT" : [ ],
    "LOG_DECIS_AUTOM" : [ ],
    "IDI_TIP_BPMN" : [ ],
    "LOG_CANCELA_SUBPROC" : [ ],
    "LOG_SOLICIT_CONTRA_SENHA" : [ ],
    "DEADLINE_FORM_FIELDNAME" : [ ],
    "NUM_HRS_PRAZ" : [ ],
    "LOG_SOLICIT_ASS_DIGITAL" : [ ],
    "DSL_CONFIGUR_MECAN_ATRIBUIC" : [ ],
    "COD_MECAN_ATRIBUIC" : [ ],
    "TIPO_EXEC" : [ ],
    "NUM_ESFOR_PREVIS" : [ ],
    "IDI_CALC_ESFOR" : [ ],
    "NUM_PASTA_FORM" : [ ],
    "NUM_HRS_FREQ_RESPONS" : [ ],
    "NUM_HRS_FREQ_GESTOR" : [ ],
    "NUM_HRS_FREQ_REQUISIT" : [ ],
    "LOG_INIBE_TRANSF" : [ ],
    "LOG_ESTADO_INICIAL" : [ ],
    "DSL_INSTRUC" : [ ],
    "LOG_CONJTA" : [ ],
    "NUM_HRS_EXPIRAC_RESPONS" : [ ],
    "NUM_HRS_EXPIRAC_GESTOR" : [ ],
    "NUM_HRS_EXPIRAC_REQUISIT" : [ ],
    "LOG_NOTIF_RESPONS_ATRASO" : [ ],
    "LOG_NOTIF_RESPONS_ACOMPTO" : [ ],
    "LOG_NOTIF_GESTOR_ATRASO" : [ ],
    "LOG_NOTIF_GESTOR_ACOMP" : [ ],
    "LOG_NOTIF_REQUISIT_ATRASO" : [ ],
    "LOG_NOTIF_REQUISIT_ACOMPTO" : [ ],
    "NUM_SEQ_PAI" : [ ],
    "COD_PERIOD_EXPED" : [ ],
    "NUM_POS_X" : [ ],
    "NUM_POS_Y" : [ ],
    "IDI_ASSUME_COLAB" : [ ],
    "LOG_ENVIA_ATIV_SUB" : [ ],
    "COD_SINAL" : [ ],
    "DES_ESTADO" : [ ],
    "NOM_ESTADO" : [ ],
    "IDI_TIP_ESTADO" : [ ],
    "LOG_SUB_PROCES" : [ ],
    "COD_DEF_SUB_PROCES" : [ ],
    "LOG_TRANSF_ANEXO" : [ ]
  },
  "inputAssignments" : { },
  "outputValues" : {
    "COD_EMPRESA" : {
      "result" : true,
      "type" : "bigint"
    },
    "COD_DEF_PROCES" : {
      "result" : true,
      "type" : "varchar"
    },
    "NUM_SEQ" : {
      "result" : true,
      "type" : "int"
    },
    "NUM_VERS" : {
      "result" : true,
      "type" : "int"
    },
    "NUM_PERC_CSENSO" : {
      "result" : true,
      "type" : "int"
    },
    "NUM_HRS_TOLERA_RESPONS" : {
      "result" : true,
      "type" : "int"
    },
    "NUM_HRS_TOLERA_GESTOR" : {
      "result" : true,
      "type" : "int"
    },
    "NUM_HRS_TOLERA_REQUISIT" : {
      "result" : true,
      "type" : "int"
    },
    "LOG_DECIS_AUTOM" : {
      "result" : true,
      "type" : "bit"
    },
    "IDI_TIP_BPMN" : {
      "result" : true,
      "type" : "int"
    },
    "LOG_CANCELA_SUBPROC" : {
      "result" : true,
      "type" : "bit"
    },
    "LOG_SOLICIT_CONTRA_SENHA" : {
      "result" : true,
      "type" : "bit"
    },
    "DEADLINE_FORM_FIELDNAME" : {
      "result" : true,
      "type" : "varchar"
    },
    "NUM_HRS_PRAZ" : {
      "result" : true,
      "type" : "int"
    },
    "LOG_SOLICIT_ASS_DIGITAL" : {
      "result" : true,
      "type" : "bit"
    },
    "DSL_CONFIGUR_MECAN_ATRIBUIC" : {
      "result" : true,
      "type" : "longtext"
    },
    "COD_MECAN_ATRIBUIC" : {
      "result" : true,
      "type" : "varchar"
    },
    "TIPO_EXEC" : {
      "result" : true,
      "type" : "int"
    },
    "NUM_ESFOR_PREVIS" : {
      "result" : true,
      "type" : "int"
    },
    "IDI_CALC_ESFOR" : {
      "result" : true,
      "type" : "int"
    },
    "NUM_PASTA_FORM" : {
      "result" : true,
      "type" : "int"
    },
    "NUM_HRS_FREQ_RESPONS" : {
      "result" : true,
      "type" : "int"
    },
    "NUM_HRS_FREQ_GESTOR" : {
      "result" : true,
      "type" : "int"
    },
    "NUM_HRS_FREQ_REQUISIT" : {
      "result" : true,
      "type" : "int"
    },
    "LOG_INIBE_TRANSF" : {
      "result" : true,
      "type" : "bit"
    },
    "LOG_ESTADO_INICIAL" : {
      "result" : true,
      "type" : "bit"
    },
    "DSL_INSTRUC" : {
      "result" : true,
      "type" : "longtext"
    },
    "LOG_CONJTA" : {
      "result" : true,
      "type" : "bit"
    },
    "NUM_HRS_EXPIRAC_RESPONS" : {
      "result" : true,
      "type" : "int"
    },
    "NUM_HRS_EXPIRAC_GESTOR" : {
      "result" : true,
      "type" : "int"
    },
    "NUM_HRS_EXPIRAC_REQUISIT" : {
      "result" : true,
      "type" : "int"
    },
    "LOG_NOTIF_RESPONS_ATRASO" : {
      "result" : true,
      "type" : "bit"
    },
    "LOG_NOTIF_RESPONS_ACOMPTO" : {
      "result" : true,
      "type" : "bit"
    },
    "LOG_NOTIF_GESTOR_ATRASO" : {
      "result" : true,
      "type" : "bit"
    },
    "LOG_NOTIF_GESTOR_ACOMP" : {
      "result" : true,
      "type" : "bit"
    },
    "LOG_NOTIF_REQUISIT_ATRASO" : {
      "result" : true,
      "type" : "bit"
    },
    "LOG_NOTIF_REQUISIT_ACOMPTO" : {
      "result" : true,
      "type" : "bit"
    },
    "NUM_SEQ_PAI" : {
      "result" : true,
      "type" : "int"
    },
    "COD_PERIOD_EXPED" : {
      "result" : true,
      "type" : "varchar"
    },
    "NUM_POS_X" : {
      "result" : true,
      "type" : "int"
    },
    "NUM_POS_Y" : {
      "result" : true,
      "type" : "int"
    },
    "IDI_ASSUME_COLAB" : {
      "result" : true,
      "type" : "int"
    },
    "LOG_ENVIA_ATIV_SUB" : {
      "result" : true,
      "type" : "bit"
    },
    "COD_SINAL" : {
      "result" : true,
      "type" : "int"
    },
    "DES_ESTADO" : {
      "result" : true,
      "type" : "varchar"
    },
    "NOM_ESTADO" : {
      "result" : true,
      "type" : "varchar"
    },
    "IDI_TIP_ESTADO" : {
      "result" : true,
      "type" : "int"
    },
    "LOG_SUB_PROCES" : {
      "result" : true,
      "type" : "bit"
    },
    "COD_DEF_SUB_PROCES" : {
      "result" : true,
      "type" : "varchar"
    },
    "LOG_TRANSF_ANEXO" : {
      "result" : true,
      "type" : "bit"
    }
  },
  "outputAssignments" : { },
  "extraParams" : { }
};
}