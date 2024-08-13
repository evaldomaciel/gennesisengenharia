function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/AppDS"
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    
    var documentId = 45;

    dataset.addColumn('result');
    
    var mySelect = 'SELECT NUM_VERS_PROPRIED from documento '+ 
			       'WHERE NUM_DOCTO_PROPRIED = '+ documentId + ' '+
			       'AND VERSAO_ATIVA = 1 '+
			       'AND TP_DOCUMENTO = 4 ';

    var myQuery = mySelect;

    try {
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        while (rs.next()) {
        	
            var num_dcto = String( rs.getObject("NUM_VERS_PROPRIED") );
            
            var myUpdate =  'update documento '+ 
				            'SET NUM_VERS_PROPRIED = '+ num_dcto + ' '+
				            'WHERE NUM_DOCTO_PROPRIED = '+ documentId + ' '+
				            'AND VERSAO_ATIVA = 1 '+
				            'AND TP_DOCUMENTO = 5';
            
            var stmt2 = conn.prepareStatement(myUpdate);
            var rs2 = stmt2.executeUpdate();
            dataset.addRow([ rs2 ]);
            
        }
    } catch (e) {
        dataset.addRow([e.toString()])
    } finally {
        if (rs != null) {
            rs.close();
        }
        if (stmt != null) {
            stmt.close();
        }
        if (rs2 != null) {
            rs.close();
        }
        if (stmt2 != null) {
            stmt2.close();
        }
        if (conn != null) {
            conn.close();
        }
    }
    return dataset;
	
	
}
function onMobileSync(user) {

}