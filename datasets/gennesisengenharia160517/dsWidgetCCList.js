function createDataset(fields, constraints, sortFields) {
	newDataset = DatasetBuilder.newDataset();
	try {
		var minhaQuery = "\n";
		var sqlLimit = 1;
		var CC;

		if (constraints != null) {
			if (constraints.length > 0) {
				for (var index = 0; index < constraints.length; index++) {
					var element = constraints[index];
					element.fieldName = String(element.fieldName).toUpperCase();
					sqlLimit = element.fieldName == 'SQLLIMIT' ? element.initialValue : sqlLimit;
					CC = element.fieldName == 'CENTROCUSTO' ? element.initialValue : CC;

				}
			}
		}

		// minhaQuery += "SELECT DISTINCT centroCusto FROM ML001009";
		minhaQuery += "SELECT DISTINCT CAST(CC AS CHAR) centroCusto FROM ML001008";
		minhaQuery += "\n where CC != ''  ";
		// minhaQuery += CC != undefined ? "\n AND centroCusto LIKE '%" + CC + "%'  " : "";
		minhaQuery += CC != undefined ? "\n AND CC LIKE '%" + CC + "%'  " : "";
		minhaQuery += "\n ORDER BY centroCusto  ";
		minhaQuery += sqlLimit != undefined ? "\n LIMIT " + sqlLimit : "";

		var dataSource = "/jdbc/AppDS";

		var conn = null;
		var stmt = null;
		var rs = null;
		var ic = new javax.naming.InitialContext();
		var ds = ic.lookup(dataSource);

		conn = ds.getConnection();
		stmt = conn.createStatement();
		rs = stmt.executeQuery(minhaQuery);
		var columnCount = rs.getMetaData().getColumnCount();
		for (var i = 1; i <= columnCount; i++) {
			newDataset.addColumn(rs.getMetaData().getColumnName(i));
		}
		while (rs.next()) {
			var Arr = new Array();
			for (var i = 1; i <= columnCount; i++) {
				var obj = rs.getObject(rs.getMetaData().getColumnName(i));
				if (null != obj) {
					Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
				}
				else {
					Arr[i - 1] = "null";
				}
			}
			newDataset.addRow(Arr);
		}
		if (rs != null) rs.close();
		if (stmt != null) stmt.close();
		if (conn != null) conn.close();
	} catch (e) {
		newDataset = DatasetBuilder.newDataset();
		newDataset.addColumn("ERRO");
		newDataset.addColumn("QUERY");
		newDataset.addColumn("datasetName");
		newDataset.addColumn("sqlLimit");
		newDataset.addRow(["ERRO: " + e.message + " - Linha: " + e.lineNumber, minhaQuery]);
	} finally {
		if (rs != null) rs.close();
		if (stmt != null) stmt.close();
		if (conn != null) conn.close();
	}
	return newDataset;
}


function getMetaListID(datasetName) {
	var datasetDocument = DatasetFactory.getDataset('document',
		new Array('activeVersion', 'datasetName', 'documentPK.companyId', 'documentPK.documentId', 'metaListId'),
		new Array(
			DatasetFactory.createConstraint('datasetName', datasetName, datasetName, ConstraintType.MUST),
			DatasetFactory.createConstraint('activeVersion', 'true', 'true', ConstraintType.MUST)
		), null);
	if (datasetDocument.rowsCount > 0) return "ML" + String("000" + String(datasetDocument.getValue(0, 'documentPK.companyId'))).slice(-3) + String("000" + String(datasetDocument.getValue(0, 'metaListId'))).slice(-3);
	else return false;
}

function TESTS() {
	var constraintDsProcessHistoryCustom1 = DatasetFactory.createConstraint('sqlLimit', '1', '1', ConstraintType.MUST);
	var constraintDsProcessHistoryCustom2 = DatasetFactory.createConstraint('datasetName', 'DSG4', 'DSG4', ConstraintType.MUST);
	var datasetDsProcessHistoryCustom = DatasetFactory.getDataset('dsProcessHistoryCustom', null, new Array(constraintDsProcessHistoryCustom1, constraintDsProcessHistoryCustom2), null);
	console.log(datasetDsProcessHistoryCustom);

	var datasetName = "DSG3";
	var datasetDocument = DatasetFactory.getDataset('document',
		new Array('activeVersion', 'datasetName', 'documentPK.companyId', 'documentPK.documentId', 'metaListId'),
		new Array(
			DatasetFactory.createConstraint('datasetName', datasetName, datasetName, ConstraintType.MUST),
			DatasetFactory.createConstraint('activeVersion', 'true', 'true', ConstraintType.MUST)
		), null);
	datasetDocument.values
}