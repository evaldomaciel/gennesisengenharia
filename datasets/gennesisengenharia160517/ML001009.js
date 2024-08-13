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

		minhaQuery += "SELECT * FROM ML001009 where  documentid = 22148"
		minhaQuery += "\n UNION SELECT * FROM ML001012 where  documentid = 22148"
		minhaQuery += "\n UNION SELECT * FROM ML001006 where  documentid = 22148"
		minhaQuery += "\n UNION SELECT * FROM ML001008 where  documentid = 22148"
		minhaQuery += "\n UNION SELECT * FROM ML001015 where  documentid = 22148"
		minhaQuery += "\n UNION SELECT * FROM ML001018 where  documentid = 22148"
		minhaQuery += "\n ORDER BY documentid DESC   ";



		minhaQuery += sqlLimit != undefined ? "\n LIMIT " + sqlLimit : "";




		var dataSource = "/jdbc/AppDS";

		var conn = null;
		var stmt = null;
		var rs = null;
		var ic = new javax.naming.InitialContext();
		var ds = ic.lookup(dataSource);

		conn = ds.getConnection(); /* java.sql.DriverManager */
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
					Arr[i - 1] = 'null';
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


function teste() {

	var datasetDsWidgetSourceProcess = DatasetFactory.getDataset('dsWidgetSourceProcess', null, new Array(
		DatasetFactory.createConstraint('sqlLimit', '300000', '300000', ConstraintType.MUST)
	), null);

	console.log(datasetDsWidgetSourceProcess)

}