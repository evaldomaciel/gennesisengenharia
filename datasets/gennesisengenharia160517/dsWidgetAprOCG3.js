function createDataset(fields, constraints, sortFields) {
	newDataset = DatasetBuilder.newDataset();
	try {
		var minhaQuery = "\n";
		var sqlLimit = 100;
		var NUM_PROCES;
		var STATUS;
		var CC;
		var IDMOV;
		var CENTRO_CUSTO;
		var NUMOS;
		var TIPO_DE_MANDA;
		var VENCIMENTO_INI;
		var VENCIMENTO_FIM;
		var DATA_EMISSAO_INI;
		var DATA_EMISSAO_FIM;
		var DATA_ENTREGA_INI;
		var DATA_ENTREGA_FIM;
		var START_DATE_INI = getDateSQL(-5);
		var START_DATE_FIM = getDateSQL(1);
		var PRODUTO;
		var NUM_SEQ_ESTADO;

		if (constraints != null) {
			if (constraints.length > 0) {
				for (var index = 0; index < constraints.length; index++) {
					var element = constraints[index];
					element.fieldName = String(element.fieldName).toUpperCase();
					sqlLimit = element.fieldName == 'SQLLIMIT' ? element.initialValue : sqlLimit;
					NUM_PROCES = element.fieldName == 'NUM_PROCES' ? element.initialValue : NUM_PROCES;
					STATUS = element.fieldName == 'STATUS' ? element.initialValue : STATUS;
					CC = element.fieldName == 'CC' ? element.initialValue : CC;
					IDMOV = element.fieldName == 'IDMOV' ? element.initialValue : IDMOV;
					CENTRO_CUSTO = element.fieldName == 'CENTROCUSTO' ? element.initialValue : CENTRO_CUSTO;
					NUMOS = element.fieldName == 'NUMOS' ? element.initialValue : NUMOS;
					VENCIMENTO_INI = element.fieldName == 'VENCIMENTOINI' ? element.initialValue : VENCIMENTO_INI;
					VENCIMENTO_FIM = element.fieldName == 'VENCIMENTOFIM' ? element.initialValue : VENCIMENTO_FIM;
					START_DATE_INI = element.fieldName == 'START_DATE' ? element.initialValue : START_DATE_INI;
					START_DATE_FIM = element.fieldName == 'START_DATE' ? element.finalValue : START_DATE_FIM;
					PRODUTO = element.fieldName == 'PRODUTO' ? element.initialValue : PRODUTO;
					NUM_SEQ_ESTADO = element.fieldName == 'NUM_SEQ_ESTADO' ? element.initialValue : NUM_SEQ_ESTADO;
				}
			}
		}

		minhaQuery += "SELECT ";
		minhaQuery += "\n G3.NUM_PROCES, ";

		minhaQuery += "\n EP.DES_ESTADO, ";
		minhaQuery += "\n IFNULL(DATE_FORMAT(G3.END_DATE, '%d/%m/%Y'), '') AS 'DATA_DE_APROVAO', ";
		minhaQuery += "\n DSG3.dataEmissao, ";
		minhaQuery += "\n IFNULL(DSG3.tipoMovimento, '') AS 'tipoMovimento', ";
		minhaQuery += "\n IFNULL(DSG3.idMov, '') AS 'idMov', ";
		minhaQuery += "\n IFNULL(DSG3.numeroMov, '') AS 'numeroMov', ";
		minhaQuery += "\n IFNULL(DSG3.localEstoque, '') AS 'localEstoque', ";
		minhaQuery += "\n IFNULL(RATEIOS.centroCusto, '') AS 'centroCusto', ";
		minhaQuery += "\n IFNULL(DSG3.fornecedor, '') AS 'fornecedor', ";
		minhaQuery += "\n IFNULL(DSG3.valorLiquido, '') AS 'valorLiquido', ";
		minhaQuery += "\n IFNULL(DSG3.codPagamento, '') AS 'codPagamento', ";
		minhaQuery += "\n IFNULL(DSG3.historico, '') AS 'historico', ";
		minhaQuery += "\n IFNULL(DSG3.numos, '') AS 'numOs', ";

		minhaQuery += "\n IFNULL(PRODUTOS.CONCATENATED_VALUES, '') AS 'CONCATENATED_VALUES', ";

		minhaQuery += "\n G3.START_DATE, ";
		minhaQuery += "\n G3.STATUS, ";
		minhaQuery += "\n HP.NUM_SEQ_ESTADO, ";
		minhaQuery += "\n CAST(HP.NUM_SEQ_MOVTO AS CHAR) AS MAX_NUM_SEQ_MOVTO, ";
		minhaQuery += "\n 'G3' AS  'G3'  ";
		minhaQuery += "\n FROM PROCES_WORKFLOW 			G3 ";
		minhaQuery += "\n INNER JOIN DOCUMENTO 			DOC_G3 		ON DOC_G3.COD_EMPRESA = G3.COD_EMPRESA and DOC_G3.NR_DOCUMENTO = G3.NR_DOCUMENTO_CARD AND DOC_G3.VERSAO_ATIVA = true  ";
		minhaQuery += "\n INNER JOIN ML001008 			DSG3		ON DSG3.companyid = G3.COD_EMPRESA and DSG3.documentid = G3.NR_DOCUMENTO_CARD AND DSG3.version = DOC_G3.NR_VERSAO  ";

		minhaQuery += "\n INNER JOIN def_proces 		DP 			ON DP.COD_DEF_PROCES = G3.COD_DEF_PROCES AND DP.COD_EMPRESA = G3.COD_EMPRESA  ";
		minhaQuery += "\n INNER JOIN fdn_usertenant 	UT 			ON UT.USER_CODE = G3.COD_MATR_REQUISIT AND UT.TENANT_ID = 1  ";
		minhaQuery += "\n INNER JOIN fdn_user 			UU 			ON UU.USER_ID = UT.USER_ID ";
		minhaQuery += "\n INNER JOIN histor_proces 		HP 			ON HP.COD_EMPRESA = G3.COD_EMPRESA AND HP.NUM_PROCES = G3.NUM_PROCES AND HP.NUM_SEQ_MOVTO = (SELECT MAX(NUM_SEQ_MOVTO) FROM histor_proces WHERE NUM_PROCES = HP.NUM_PROCES AND COD_EMPRESA = HP.COD_EMPRESA LIMIT 1) ";
		minhaQuery += "\n INNER JOIN estado_proces 		EP	 		ON EP.COD_DEF_PROCES = DP.COD_DEF_PROCES and EP.NUM_VERS = G3.NUM_VERS AND EP.NUM_SEQ = HP.NUM_SEQ_ESTADO AND EP.COD_EMPRESA = 1  ";

		minhaQuery += "\n LEFT JOIN ML001009 			RATEIOS 	ON RATEIOS.companyid = DSG3.companyid and RATEIOS.documentid = DSG3.documentid AND RATEIOS.version = DSG3.version  ";
		minhaQuery += "\n LEFT JOIN ML001025 			BOLETO 		ON BOLETO.companyid = DSG3.companyid and BOLETO.documentid = DSG3.documentid AND BOLETO.version = DSG3.version  ";
		minhaQuery += "\n LEFT JOIN ML001026 			COMPROVANTE ON COMPROVANTE.companyid = DSG3.companyid and COMPROVANTE.documentid = DSG3.documentid AND COMPROVANTE.version = DSG3.version  ";
		minhaQuery += "\n LEFT JOIN ML001027 			NF 			ON NF.companyid = DSG3.companyid and NF.documentid = DSG3.documentid AND NF.version = DSG3.version  ";
		minhaQuery += "\n LEFT JOIN (SELECT  ";
		minhaQuery += "\n 			     documentid, ";
		minhaQuery += "\n 			     version, ";
		minhaQuery += "\n 			     companyid, ";
		minhaQuery += "\n 			     GROUP_CONCAT(CONCAT(sequencia, ' - ', produto, ' - (', quantidade, ' itens) - ', totalProduto) ORDER BY documentid SEPARATOR ' | \r\n') AS CONCATENATED_VALUES ";
		minhaQuery += "\n 			FROM ML001010 ";
		minhaQuery += "\n 			GROUP BY documentid, version, companyid  ";
		minhaQuery += "\n ) 							PRODUTOS	ON PRODUTOS.companyid = DSG3.companyid and PRODUTOS.documentid = DSG3.documentid AND PRODUTOS.version = DSG3.version ";
		minhaQuery += "\n WHERE DP.COD_EMPRESA = 1 ";
		minhaQuery += "\n AND DSG3.IdMov is not null AND DSG3.IdMov <> ''  ";
		minhaQuery += STATUS != undefined ? "\n AND G3.STATUS = '" + STATUS + "'" : "\n AND G3.STATUS <> 1 ";
		minhaQuery += NUM_SEQ_ESTADO != undefined ? "\n AND EP.NUM_SEQ = '" + NUM_SEQ_ESTADO + "'" : "";
		minhaQuery += NUM_PROCES != undefined ? "\n AND G3.NUM_PROCES = '" + NUM_PROCES + "'" : "";
		minhaQuery += IDMOV != undefined ? "\n AND DSG3.IdMov = '" + IDMOV + "'" : "";
		minhaQuery += CENTRO_CUSTO != undefined ? "\n AND RATEIOS.centroCusto like '%" + CENTRO_CUSTO + "%'" : "";
		minhaQuery += NUMOS != undefined ? "\n AND DSG3.NUMOS in ('" + NUMOS.replace(",", "','") + "')" : "";
		minhaQuery += START_DATE_INI != undefined && START_DATE_FIM != undefined ? "\n AND G3.START_DATE BETWEEN '" + START_DATE_INI + "' AND '" + START_DATE_FIM + " 23:59:59'" : "";
		minhaQuery += DATA_EMISSAO_INI != undefined && DATA_EMISSAO_FIM != undefined ? "\n AND STR_TO_DATE(DSG3.dataEmissao, '%d/%m/%Y') BETWEEN '" + DATA_EMISSAO_INI + "' AND '" + DATA_EMISSAO_FIM + " 23:59:59'" : "";
		minhaQuery += PRODUTO != undefined ? "\n AND PRODUTOS.CONCATENATED_VALUES like '%" + PRODUTO + "%'" : "";
		// minhaQuery += "\n AND G3.NUM_PROCES = 19932  ";
		minhaQuery += "\n ORDER BY G3.NUM_PROCES DESC ";

		minhaQuery += sqlLimit != undefined ? "\n LIMIT " + sqlLimit : "";

		log.info(minhaQuery);

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

function retornaTabelas(dataset, codTable) {
	try {
		var newDataset = DatasetBuilder.newDataset();

		var dataSource = "/jdbc/AppDS";
		var ic = new javax.naming.InitialContext();
		var ds = ic.lookup(dataSource);
		var myQuery = "SELECT " +
			"\n 	NM_DATASET, " +
			"\n 	NR_VERSAO, " +
			"\n 	COD_LISTA_PAI, " +
			"\n 	CONVERT( " +
			"\n 		CONCAT( " +
			"\n 			'ML', " +
			"\n 			CONCAT( " +
			"\n 				LPAD(DOCUMENTO.COD_EMPRESA, 3, '0'), " +
			"\n 				LPAD(DOCUMENTO.COD_LISTA, 3, '0') " +
			"\n 			) " +
			"\n 		), " +
			"\n 		CHAR " +
			"\n 	) AS TABELA_PRINCIPAL, " +
			"\n 	COD_LISTA_FILHO, " +
			"\n 	CONVERT( " +
			"\n 		CONCAT( " +
			"\n 			'ML', " +
			"\n 			CONCAT( " +
			"\n 				LPAD(META_LISTA_REL.COD_EMPRESA, 3, '0'), " +
			"\n 				LPAD(META_LISTA_REL.COD_LISTA_FILHO, 3, '0') " +
			"\n 			) " +
			"\n 		), " +
			"\n 		CHAR " +
			"\n 	) AS TABELA_FILHO, " +
			"\n 	META_LISTA_REL.COD_TABELA " +
			"\n FROM " +
			"\n 	DOCUMENTO " +
			"\n 	LEFT JOIN META_LISTA_REL ON META_LISTA_REL.COD_EMPRESA = DOCUMENTO.COD_EMPRESA " +
			"\n	AND META_LISTA_REL.COD_LISTA_PAI = DOCUMENTO.COD_LISTA " +

			"";
		myQuery += "\n WHERE NM_DATASET in ('" + dataset + "') AND VERSAO_ATIVA = 1 ";
		myQuery += codTable ? "\n AND META_LISTA_REL.COD_TABELA = '" + codTable + "' " : "";

		var conn = ds.getConnection();
		var stmt = conn.createStatement();
		var rs = stmt.executeQuery(myQuery);
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
	} catch (error) {
		newDataset = DatasetBuilder.newDataset();
		newDataset.addColumn("ERROR");
		newDataset.addRow([error]);
	} finally {
		if (rs != null)
			rs.close();

		if (stmt != null)
			stmt.close();

		if (conn != null)
			conn.close();

		return newDataset;
	}
}

function getDateSQL(addMonths) {
	addMonths = addMonths ? addMonths : 0;
	var date = new Date();
	date.setMonth(date.getMonth() + addMonths);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	if (month < 10) { month = '0' + month; }
	if (day < 10) { day = '0' + day; }
	return String(year) + String(month) + String(day);
}

function addDays(addDays) {
	addDays = addDays ? addDays : 0;
	var date = new Date();
	date.setMonth(date.getDay() + addDays);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	if (month < 10) { month = '0' + month; }
	if (day < 10) { day = '0' + day; }
	return String(year) + String(month) + String(day);
}