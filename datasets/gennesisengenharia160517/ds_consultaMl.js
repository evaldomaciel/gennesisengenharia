function createDataset(fields, constraints, sorts) {
    var dataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/AppDS"
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;

    var mySelect = "SELECT DISTINCT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS "
    var myWhere = " WHERE 1=1 "

    if (constraints != null && constraints.length > 0) {
        for (var c = 0; c < constraints.length; c++) {
            if (constraints[c].fieldName.toUpperCase() != "SQLLIMIT") {
                if (constraints[c].fieldName.toUpperCase() == "CAMPO") {
                    myWhere += " AND COLUMN_NAME IN ('"+ constraints[c].initialValue +"')"
                }
            }
        }
    }

    var myQuery = mySelect + myWhere

    try {
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        while (rs.next()) {
            if (!created) {
                for (var i = 1; i <= columnCount; i++) {
                    dataset.addColumn(rs.getMetaData().getColumnName(i));
                }
                created = true;
            }
            var Arr = new Array();
            for (var i = 1; i <= columnCount; i++) {
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                if (null != obj) {
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                } else {
                    Arr[i - 1] = "null";
                }
            }
            dataset.addRow(Arr);
        }
    } catch (e) {
        log.error("ERRO==============> " + e.message);
        // dataset.addColumn('Error')
        // dataset.addRow([e.message])
    } finally {
        if (rs != null) {
            rs.close();
        }
        if (stmt != null) {
            stmt.close();
        }
        if (conn != null) {
            conn.close();
        }
    }
    return dataset;
}