function createDataset(fields, constraints, sortFields) {
    var newDataset = DatasetBuilder.newDataset();

    var pasta = "/app/fluig/appserver/domain/servers/";
    var diretorio = new java.io.File(pasta);
    var arquivos = diretorio.listFiles();
    var linhaDeComando2 = String(arquivos[0]);
    var pasta = new java.nio.file.Path.of(String(linhaDeComando2 + "/log/server.log"));
    var retorno4 = new java.nio.file.Files.writeString(pasta, "");





    var minhaQuery = "SELECT 'CONSULTA' AS 'QUERY';";
    var minhaQuery1 = "";
    var minhaQuery2 = "";
    var minhaQuery3 = "";
    var minhaQuery4 = "";
    var minhaQuery5 = "";
    if (constraints != null) {
        minhaQuery = constraints[0].fieldName == "QUERY" ? constraints[0].initialValue : minhaQuery;
    }

    var dataSource = "/jdbc/AppDS";

    var conn = null;
    var stmt = null;
    var rs1 = null;
    var rs2 = null;
    var rs3 = null;
    var rs4 = null;
    var rs5 = null;
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;

    /*
    minhaQuery = "SELECT MAX(NUM_SEQ_MOVTO) AS MAX_NUM_SEQ_MOVTO, NUM_PROCES, LOG_ATIV, histor_proces.* "
    
    */
    // minhaQuery = "SELECT * FROM FDN_USERTENANT WHERE LOGIN LIKE '%FLUIG%' "
    // // minhaQuery1 = "UPDATE FDN_USERTENANT SET PASSWORD = 'c4ca4238a0b923820dcc509a6f75849b' WHERE LOGIN = 'bi-20240401' ; "

    // minhaQuery1 = "UPDATE PROCES_WORKFLOW SET NUM_VERS = 17 WHERE  STATUS = 0 AND COD_DEF_PROCES = 'contrato_apr_ordem_compras' and NUM_VERS > 1 ;"

    // minhaQuery2 = "DELETE FROM fdn_datasethistory WHERE DATASET_ID IN ('dsConsulta', 'dsConsulta3', 'dsConsultaChamado');"
    // minhaQuery3 = "DELETE FROM serv_dataset WHERE COD_DATASET IN ('dsConsulta', 'dsConsulta3', 'dsConsultaChamado');"

    var linha = ""


    try {

        var pageService = fluigAPI.getPageService();
        newDataset.addColumn("QUERY");
        newDataset.addRow([pageService.getServerURL()]);
        return newDataset;

        conn = ds.getConnection();
        stmt = conn.createStatement();
        if (minhaQuery1.indexOf("DELETE") == 0 || minhaQuery1.indexOf("INSERT") == 0 || minhaQuery1.indexOf("UPDATE") == 0) {
            rs1 = minhaQuery1 != "" ? parseInt(stmt.executeUpdate(minhaQuery1)) : null;
            rs2 = minhaQuery2 != "" ? parseInt(stmt.executeUpdate(minhaQuery2)) : null;
            rs3 = minhaQuery3 != "" ? parseInt(stmt.executeUpdate(minhaQuery3)) : null;
            rs4 = minhaQuery4 != "" ? parseInt(stmt.executeUpdate(minhaQuery4)) : null;
            rs5 = minhaQuery5 != "" ? parseInt(stmt.executeUpdate(minhaQuery5)) : null;

            newDataset = DatasetBuilder.newDataset();
            newDataset.addColumn("CAMPO");
            newDataset.addColumn("REGISTROS_ATUALIZADOS");
            if (rs1) newDataset.addRow(["rs1", parseInt(rs1)]);
            if (rs2) newDataset.addRow(["rs2", parseInt(rs2)]);
            if (rs3) newDataset.addRow(["rs3", parseInt(rs3)]);
            if (rs4) newDataset.addRow(["rs4", parseInt(rs4)]);
            if (rs5) newDataset.addRow(["rs5", parseInt(rs5)]);
        } else {
            rs = stmt.executeQuery(minhaQuery);

            var columnCount = rs.getMetaData().getColumnCount();
            for (var i = 1; i <= columnCount; i++) {
                newDataset.addColumn(rs.getMetaData().getColumnName(i));
            }
            newDataset.addColumn("QUERY");
            newDataset.addColumn("LINHA");



            while (rs.next()) {
                var Arr = new Array();
                for (var i = 1; i <= columnCount; i++) {
                    var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                    if (null != obj) {
                        Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                        if (rs.getMetaData().getColumnName(i) == "NUM_PROCES") linha += String(Arr[i - 1]) + ", ";
                    }
                    else {
                        Arr[i - 1] = "null";
                    }
                }
                Arr.push(minhaQuery);
                Arr.push(linha);
                newDataset.addRow(Arr);
            }
        }
    } catch (e) {
        newDataset.addColumn("QUERY");
        newDataset.addRow(["ERRO: " + String(e) + " - Linha: " + e.lineNumber]);
    } finally {
        try {
            if (rs1 != null && rs1 < 0) rs.close();
            if (stmt != null) stmt.close();
            if (conn != null) conn.close();
        } catch (er) {
            newDataset.addColumn("QUERY");
            newDataset.addRow(["ERRO: " + String(er) + " - Linha: " + er.lineNumber]);
        }
    }
    return newDataset;
}