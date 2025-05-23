function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
    var newDataset = DatasetBuilder.newDataset();
    var datasource = '/jdbc/AppDS' //aponta para o serviço cadastrado no fluig
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(datasource);
    var created = false;

    
    var infosConstraints = {
        idAtribuicao        : "",
        searchAtribuicao    : "",
        matriculaUser       : "",
        groupId             : ""
    }
    
    if(constraints != null){
        
        for (var x = 0; x < constraints.length; x++) {
            if(constraints[x].fieldName == 'ID_ATV'){
                infosConstraints.idAtribuicao = constraints[x].initialValue.trim()
            }
            
            if(constraints[x].fieldName == 'LIKE_ATRIBUICAO'){
                infosConstraints.searchAtribuicao = constraints[x].initialValue.trim()
            }
            
            if(constraints[x].fieldName == 'LIKE_MATRICULA'){
                infosConstraints.matriculaUser = constraints[x].initialValue.trim()
            }
            
            if(constraints[x].fieldName == 'LIKE_GROUPID'){
                infosConstraints.groupId = constraints[x].initialValue.trim()
            }
            
        }

        
    }
    /**
     * Por gentileza, alterar o from para a ML de produção/homologação quando for alterar
     */
    var myQuery = "select documentid, version, txt_iden_atividade, txt_atri_atividade, hd_cod_user_atv, hd_tipo_atribuicao, txt_desc_atv, d.VERSAO_ATIVA " +
    "from ML001023 inner join DOCUMENTO d on documentid = d.NR_DOCUMENTO where 1=1 and d.VERSAO_ATIVA != 'false' "

    if (infosConstraints.idAtribuicao != "") {
        myQuery += " and txt_iden_atividade = '" + infosConstraints.idAtribuicao + "' "
    }

    if (infosConstraints.searchAtribuicao != "") {
        myQuery += " and txt_iden_atividade like '%" + infosConstraints.searchAtribuicao + "%'"
    }
    
    if (infosConstraints.matriculaUser != "") {
        myQuery += " and hd_cod_user_atv = '" + infosConstraints.matriculaUser + "'"
    }
    else if (infosConstraints.groupId != "") {
        myQuery += " and txt_atri_atividade = '" + infosConstraints.groupId + "'"
    }

    try {
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        while (rs.next()) {
            if (!created) {
                for (var i = 1; i <= columnCount; i++) {
                    newDataset.addColumn(rs.getMetaData().getColumnName(i));
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
            newDataset.addRow(Arr);
        }
    } catch (erro) {
        log.info("ERROR")
        log.info(erro)
        newDataset.addColumn("ERROR")
        newDataset.addRow([erro.toString()])
    } finally {
        if(rs != null){
            rs.close()
        }
        if(stmt != null){
            stmt.close();
        }
        if(conn != null){
            conn.close();
        }
    }
    return newDataset;

}function onMobileSync(user) {

}