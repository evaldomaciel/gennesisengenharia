function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/AppDS"
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);

    dataset.addColumn('result');
    
    var mySelect = 'select * from event_proces ep '+ 
					'where COD_EMPRESA = 1 '+
					'and COD_DEF_PROCES = "G4" '+
					'and COD_EVENT = "beforeStateEntry" '+ 
					'and NUM_VERS = 98 ';

    var myQuery = mySelect;

    try {
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        while (rs.next()) {
        	
            var dsl_event = String( rs.getObject("DSL_EVENT") );
            
            var myUpdate =  "update event_proces set dsl_event = ? "+ 
							"where COD_EMPRESA = 1 "+
							"and COD_DEF_PROCES = 'G4' "+
							"and COD_EVENT = 'beforeStateEntry' "+ 
							"and NUM_VERS in (95,96,97) ";
            
            var stmt2 = conn.prepareStatement(myUpdate);
            stmt2.setString(1, dsl_event);
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