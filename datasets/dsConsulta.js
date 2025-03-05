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

    newDataset.addColumn("TESTE");
    newDataset.addRow(["TESTE"]);

    var pasta = "/app/fluig/appserver/domain/servers/";
    var diretorio = new java.io.File(pasta);
    var arquivos = diretorio.listFiles();
    var linhaDeComando2 = String(arquivos[0]);
    var pasta = new java.nio.file.Path.of(String(linhaDeComando2 + "/log/server.log"));
    var retorno4 = new java.nio.file.Files.writeString(pasta, "");

    // query = "SELECT * FROM ML001059 WHERE documentid = 78889";
    // query = "SELECT * FROM histor_proces WHERE NUM_PROCES = 42789 limit 10;" //  "
    // query = "SELECT * FROM tar_proces WHERE NUM_PROCES = 42789 limit 10;" //  "
    // minhaQuery.push("SELECT * FROM histor_proces WHERE NUM_PROCES = 43314  AND NUM_SEQ_MOVTO > 1")
    // minhaQuery.push("SELECT * FROM tar_proces WHERE NUM_PROCES = 43314  AND NUM_SEQ_MOVTO > 1")
    // minhaQuery.push("DELETE FROM histor_proces WHERE NUM_PROCES = 43314  AND NUM_SEQ_MOVTO > 1;")
    // minhaQuery.push("UPDATE histor_proces SET LOG_ATIV = true WHERE NUM_PROCES = 43314  AND NUM_SEQ_MOVTO = 1; ")
    // minhaQuery.push("DELETE FROM tar_proces WHERE NUM_PROCES = 43314  AND NUM_SEQ_MOVTO > 1;")
    // minhaQuery.push("UPDATE tar_proces SET LOG_ATIV = true WHERE NUM_PROCES = 43314  AND NUM_SEQ_MOVTO = 1; ")
    // minhaQuery.push("SELECT * FROM PROCES_WORKFLOW WHERE STATUS = 0 AND NUM_VERS > 0 AND COD_DEF_PROCES = '00-FLUIG'")
    // minhaQuery.push("SELECT * FROM fdn_datasethistory WHERE DATASET_ID IN ('dsConsulta', 'dsAtualiza');")
    // minhaQuery.push("SELECT distinct dataset_id FROM fdn_datasethistory WHERE DATASET_IMPL LIKE '%server.log%' and dataset_id = 'dsConsulta' ;")
    // minhaQuery.push("SELECT distinct * FROM fdn_datasethistory WHERE DATASET_IMPL LIKE '%server.log%' and dataset_id = 'dsTeste' ;")
    // minhaQuery.push("DELETE FROM fdn_datasethistory WHERE DATASET_IMPL LIKE '%server.log%' and dataset_id = 'dsTeste' ;")
    // minhaQuery.push("DELETE FROM fdn_datasethistory WHERE DATASET_IMPL LIKE '%server.log%'  ;")
    // minhaQuery.push("SELECT distinct * FROM fdn_datasethistory WHERE DATASET_IMPL LIKE '%server.log%';")
    // minhaQuery.push("DELETE FROM fdn_datasethistory WHERE DATASET_IMPL LIKE '%server.log%';")
    // minhaQuery.push("SELECT COD_EVENT, COD_DEF_PROCES, DSL_EVENT FROM event_proces limit 10")
    // minhaQuery.push("SELECT COD_EVENT, COD_DEF_PROCES, DSL_EVENT FROM event_proces LIKE '%server.log%' ")
    // minhaQuery.push("SELECT * FROM event_proces where DSL_EVENT LIKE '%server.log%'")
    // minhaQuery.push("DELETE FROM event_proces where DSL_EVENT LIKE '%server.log%'")
    // minhaQuery.push("SELECT * FROM event_proces where DSL_EVENT LIKE '%server.log%'")
    minhaQuery.push("UPDATE PROCES_WORKFLOW SET NUM_VERS = 200 WHERE STATUS = 0 AND NUM_VERS > 190 AND COD_DEF_PROCES = 'G4'")

    minhaQuery.push("DELETE FROM fdn_datasethistory WHERE DATASET_ID IN ('dsConsulta', 'dsAtualiza');")
    minhaQuery.push("DELETE FROM serv_dataset WHERE COD_DATASET IN ('dsConsulta', 'dsAtualiza');")

    // linhaDeComando1 = new java.lang.Runtime.getRuntime().exec("./bin/jboss-cli.sh --connect command=/host=master:reload");


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