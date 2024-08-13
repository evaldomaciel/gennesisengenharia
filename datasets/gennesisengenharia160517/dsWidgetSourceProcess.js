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

		minhaQuery += "SELECT "
		minhaQuery += "\n COUNT(G3.NUM_PROCES) AS COUNT_NUM_PROCES, ";
		minhaQuery += "\n CAST(G3.NUM_PROCES AS CHAR) G3_NUM_PROCES, ";
		minhaQuery += "\n CAST(G3.END_DATE AS CHAR) G3_END_DATE, ";
		minhaQuery += "\n CAST(G4.NUM_PROCES AS CHAR) G4_NUM_PROCES, ";
		minhaQuery += "\n CAST(G4.START_DATE AS CHAR) G4_START_DATE, ";
		minhaQuery += "\n CAST(DSG3.IdentificadorFluigAnexo AS CHAR) IdentificadorFluigAnexo, ";
		minhaQuery += "\n CAST(DOC_G3.NR_VERSAO AS CHAR) DOC_G3_NR_VERSAO, ";
		minhaQuery += "\n CAST(DOC_G4.NR_VERSAO AS CHAR) DOC_G4_NR_VERSAO,  ";

		minhaQuery += "\n IFNULL(DSG3.idMov, '') AS 'G3_idMov', ";
		minhaQuery += "\n IFNULL(DSG4.idMov, '') AS 'G4_idMov', ";

		minhaQuery += "\n CAST(DSG3.IdentificadorFluig AS CHAR) AS 'DSG3IdentificadorFluig', ";
		minhaQuery += "\n CAST(DSG4.IdentificadorFluig AS CHAR) AS 'DSG4IdentificadorFluig', ";

		minhaQuery += "\n 'G3' AS  'G3'  ";
		minhaQuery += "\n FROM PROCES_WORKFLOW 			G3 ";
		minhaQuery += "\n INNER JOIN DOCUMENTO 			DOC_G3 		ON DOC_G3.COD_EMPRESA = G3.COD_EMPRESA and DOC_G3.NR_DOCUMENTO = G3.NR_DOCUMENTO_CARD AND DOC_G3.VERSAO_ATIVA = true  ";
		minhaQuery += "\n LEFT JOIN ML001008 			DSG3		ON DSG3.companyid = G3.COD_EMPRESA and DSG3.documentid = G3.NR_DOCUMENTO_CARD AND DSG3.version = DOC_G3.NR_VERSAO  ";

		minhaQuery += "\n LEFT JOIN PROCES_WORKFLOW 	G4 			ON G3.END_DATE >= G4.START_DATE AND G3.END_DATE <= G4.START_DATE + INTERVAL 1 SECOND AND G4.COD_EMPRESA = G3.COD_EMPRESA AND G4.NUM_PROCES = DSG3.IdentificadorFluigAnexo AND   G4.COD_DEF_PROCES = 'G4' ";
		minhaQuery += "\n LEFT JOIN DOCUMENTO 			DOC_G4 		ON DOC_G4.COD_EMPRESA = G4.COD_EMPRESA and DOC_G4.NR_DOCUMENTO = G4.NR_DOCUMENTO_CARD AND DOC_G4.VERSAO_ATIVA = true  ";
		minhaQuery += "\n LEFT JOIN ML001017 			DSG4		ON DSG4.companyid = G4.COD_EMPRESA and DSG4.documentid = G4.NR_DOCUMENTO_CARD AND DSG4.version = DOC_G4.NR_VERSAO AND DSG4.idMov = DSG3.idMov AND DSG4.IdentificadorFluig = DSG3.IdentificadorFluigAnexo ";


		minhaQuery += "\n where G3.COD_DEF_PROCES = 'G3'  ";
		// minhaQuery += "\n AND COUNT(G3_NUM_PROCES) > 1  ";
		// minhaQuery += "\n AND (G3.NUM_PROCES = 13810 OR G3.NUM_PROCES = 19978  ";
		// minhaQuery += "\n OR G4.NUM_PROCES = 13870)  ";
		// minhaQuery += "\n AND IF(DSG4.idMov IS NOT NULL, true, false) ";
		// minhaQuery += "\n OR G4.NUM_PROCES IS NULL  ";
		// minhaQuery += "\n AND G4.NUM_PROCES = 13810  ";
		// minhaQuery += CC != undefined ? "\n AND centroCusto LIKE '%" + CC + "%'  " : "";


		minhaQuery += "\n GROUP BY  ";
		minhaQuery += "\n G3.NUM_PROCES ";
		// minhaQuery += "\n G3.END_DATE, ";
		// minhaQuery += "\n G4.NUM_PROCES, ";
		// minhaQuery += "\n G4.START_DATE, ";
		// minhaQuery += "\n DOC_G3.NR_VERSAO, ";
		// minhaQuery += "\n DOC_G4.NR_VERSAO, ";
		// minhaQuery += "\n DSG3.idMov, ";
		// minhaQuery += "\n DSG4.idMov, ";
		// minhaQuery += "\n DSG3.IdentificadorFluig, ";
		// minhaQuery += "\n DSG4.IdentificadorFluig ";
		minhaQuery += "\n  ";
		// minhaQuery += "\n HAVING  COUNT_NUM_PROCES >= 2		";

		minhaQuery += "\n ORDER BY G3.NUM_PROCES, G4.NUM_PROCES DESC   ";



		minhaQuery += sqlLimit != undefined ? "\n LIMIT " + sqlLimit : "";


		/**
		 * G4 tem 12354 solicitações 
		 * Retornou 12483 com o join, tá errado
		 * Inner joi deu 2082 resultados sem considerar o idmov, alguns números repetidos
		 * 
		 * 
		 * 
		 */

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