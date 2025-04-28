function createDataset(fields, constraints, sortFields) {

    var newDataset = DatasetBuilder.newDataset();
    var minhaQuery = []
    var dataSource = "/jdbc/AppDS";
    var conn = null;
    var stmt = null;
    var rs = null;
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;


    var documentId = 65616;

    if (constraints && constraints.length > 0) {
        for (var index = 0; index < constraints.length; index++) {
            var element = constraints[index];
            var fieldName = String(element.fieldName).toLowerCase();
            documentId = ['documentId', 'nr_documento'].indexOf(fieldName) >= 0 ? element.initialValue : documentId;
        }
    }


    minhaQuery.push("SELECT * FROM DOCUMENTO WHERE NR_DOCUMENTO = " + documentId + " AND VERSAO_ATIVA = true LIMIT 10")


    try {
        newDataset = DatasetBuilder.newDataset();

        for (var index = 0; index < minhaQuery.length; index++) {
            var element = minhaQuery[index];
            conn = ds.getConnection(); /* java.sql.DriverManager */
            stmt = conn.createStatement();
            if (element.indexOf("DELETE") >= 0 || element.indexOf("UPDATE") >= 0) {
                if (!created) {
                    newDataset.addColumn("REGISTROS_ATUALIZADOS");
                    newDataset.addColumn("QUERY");
                    created = true;
                };
                rs = stmt.executeUpdate(element);
                newDataset.addRow([String(rs), element]);
            }
            else {
                rs = stmt.executeQuery(element);
                var columnCount = rs.getMetaData().getColumnCount();
                while (rs.next()) {
                    if (!created) {
                        for (var i = 1; i <= columnCount; i++) {
                            newDataset.addColumn(rs.getMetaData().getColumnName(i));
                        }
                        newDataset.addColumn("QUERY");
                        created = true;
                    }
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
                    Arr.push(element)
                    newDataset.addRow(Arr);
                }
            }
        }
        if (rs != null && rs.close != undefined) rs.close();
        if (stmt != null && stmt.close != undefined) stmt.close();
        if (conn != null && conn.close != undefined) conn.close();
    } catch (e) {
        newDataset = DatasetBuilder.newDataset();
        newDataset.addColumn("QUERY");
        newDataset.addColumn("ERROR");
        newDataset.addRow([query, String("ERRO: " + e.message + " - Linha: " + e.lineNumber)]);
    }
    return newDataset;
}