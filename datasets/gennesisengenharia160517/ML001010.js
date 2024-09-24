function createDataset(fields, constraints, sortFields) {
	newDataset = DatasetBuilder.newDataset();
	try {
		var minhaQuery = "\n";
		var sqlLimit = 1000;

		if (constraints != null) {
			if (constraints.length > 0) {
				for (var index = 0; index < constraints.length; index++) {
					var element = constraints[index];
					element.fieldName = String(element.fieldName).toUpperCase();
					sqlLimit = element.fieldName == 'SQLLIMIT' ? element.initialValue : sqlLimit;
				}
			}
		}

		minhaQuery += "SELECT ";
		minhaQuery += "\n * FROM ML001010 ";
		minhaQuery += "\n WHERE produto like '%MASSA CORRIDA%' ";

		minhaQuery += sqlLimit != undefined ? "\n LIMIT " + sqlLimit : "";

		log.info(minhaQuery)

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