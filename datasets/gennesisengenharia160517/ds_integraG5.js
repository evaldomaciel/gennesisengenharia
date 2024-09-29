function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("Retorno");
	dataset.addColumn("Mensagem");
	var contexto = 'CODCOLIGADA='
	var valores = getConstraints(constraints);
	try {
		var wsUpdate_RM = ServiceManager.getService('RMWsDataServer');
		var serviceLocator = wsUpdate_RM.instantiate('com.totvs.WsDataServer');
		var service = serviceLocator.getRMIwsDataServer();
		var serviceHelper = wsUpdate_RM.getBean();
		var dataServerName = 'FinLanDataBR'

		var XML = "<FinLAN> " +
			"    <FLAN>" +
			("CODCOLIGADA" in valores ? "        <CODCOLIGADA>" + valores.CODCOLIGADA + "</CODCOLIGADA>" : "") +
			"        <IDLAN>-1</IDLAN>" +
			("NUMERODOCUMENTO" in valores ? "        <NUMERODOCUMENTO>" + valores.NUMERODOCUMENTO + "</NUMERODOCUMENTO>" : "") +
			("NFOUDUP" in valores ? "        <NFOUDUP>" + valores.NFOUDUP + "</NFOUDUP>" : "") +
			("CLASSIFICACAO" in valores ? "        <CLASSIFICACAO>" + valores.CLASSIFICACAO + "</CLASSIFICACAO>" : "") +
			("PAGREC" in valores ? "        <PAGREC>" + valores.PAGREC + "</PAGREC>" : "") +
			("STATUSLAN" in valores ? "        <STATUSLAN>" + valores.STATUSLAN + "</STATUSLAN>" : "") +
			("CODAPLICACAO" in valores ? "        <CODAPLICACAO>" + valores.CODAPLICACAO + "</CODAPLICACAO>" : "") +
			("CODCCUSTO" in valores ? "        <CODCCUSTO>" + valores.CODCCUSTO + "</CODCCUSTO>" : "") +
			("HISTORICO" in valores ? "        <HISTORICO>" + valores.HISTORICO + "</HISTORICO>" : "") +
			("DATACRIACAO" in valores ? "        <DATACRIACAO>" + valores.DATACRIACAO + "</DATACRIACAO>" : "") +
			("DATAVENCIMENTO" in valores ? "        <DATAVENCIMENTO>" + valores.DATAVENCIMENTO + "</DATAVENCIMENTO>" : "") +
			("DATAEMISSAO" in valores ? "        <DATAEMISSAO>" + valores.DATAEMISSAO + "</DATAEMISSAO>" : "") +
			("DATABAIXA" in valores ? "        <DATABAIXA>" + valores.DATABAIXA + "</DATABAIXA>" : "") +
			("DATAPREVBAIXA" in valores ? "        <DATAPREVBAIXA>" + valores.DATAPREVBAIXA + "</DATAPREVBAIXA>" : "") +
			("DATAPAG" in valores ? "        <DATAPAG>" + valores.DATAPAG + "</DATAPAG>" : "") +
			("VALORORIGINAL" in valores ? "        <VALORORIGINAL>" + valores.VALORORIGINAL + "</VALORORIGINAL>" : "") +
			("VALORBAIXADO" in valores ? "        <VALORBAIXADO>" + valores.VALORBAIXADO + "</VALORBAIXADO>" : "") +
			("VALORCAP" in valores ? "        <VALORCAP>" + valores.VALORCAP + "</VALORCAP>" : "") +
			("VALORJUROS" in valores ? "        <VALORJUROS>" + valores.VALORJUROS + "</VALORJUROS>" : "") +
			("VALORDESCONTO" in valores ? "        <VALORDESCONTO>" + valores.VALORDESCONTO + "</VALORDESCONTO>" : "") +
			("VALORCHEQUE" in valores ? "        <VALORCHEQUE>" + valores.VALORCHEQUE + "</VALORCHEQUE>" : "") +
			("VALOROP1" in valores ? "        <VALOROP1>" + valores.VALOROP1 + "</VALOROP1>" : "") +
			("VALOROP2" in valores ? "        <VALOROP2>" + valores.VALOROP2 + "</VALOROP2>" : "") +
			("VALOROP3" in valores ? "        <VALOROP3>" + valores.VALOROP3 + "</VALOROP3>" : "") +
			("VALOROP4" in valores ? "        <VALOROP4>" + valores.VALOROP4 + "</VALOROP4>" : "") +
			("VALOROP5" in valores ? "        <VALOROP5>" + valores.VALOROP5 + "</VALOROP5>" : "") +
			("VALOROP6" in valores ? "        <VALOROP6>" + valores.VALOROP6 + "</VALOROP6>" : "") +
			("VALOROP7" in valores ? "        <VALOROP7>" + valores.VALOROP7 + "</VALOROP7>" : "") +
			("VALOROP8" in valores ? "        <VALOROP8>" + valores.VALOROP8 + "</VALOROP8>" : "") +
			("VALORMULTA" in valores ? "        <VALORMULTA>" + valores.VALORMULTA + "</VALORMULTA>" : "") +
			("VALORAUXILIAR" in valores ? "        <VALORAUXILIAR>" + valores.VALORAUXILIAR + "</VALORAUXILIAR>" : "") +
			("VALORBASEIRRF" in valores ? "        <VALORBASEIRRF>" + valores.VALORBASEIRRF + "</VALORBASEIRRF>" : "") +
			("VALORIRRF" in valores ? "        <VALORIRRF>" + valores.VALORIRRF + "</VALORIRRF>" : "") +
			("VALORREPASSE" in valores ? "        <VALORREPASSE>" + valores.VALORREPASSE + "</VALORREPASSE>" : "") +
			("VALORVENCIMENTOANTECIP" in valores ? "        <VALORVENCIMENTOANTECIP>" + valores.VALORVENCIMENTOANTECIP + "</VALORVENCIMENTOANTECIP>" : "") +
			("VALORNOTACREDITO" in valores ? "        <VALORNOTACREDITO>" + valores.VALORNOTACREDITO + "</VALORNOTACREDITO>" : "") +
			("VALORADIANTAMENTO" in valores ? "        <VALORADIANTAMENTO>" + valores.VALORADIANTAMENTO + "</VALORADIANTAMENTO>" : "") +
			("VALORDEVOLUCAO" in valores ? "        <VALORDEVOLUCAO>" + valores.VALORDEVOLUCAO + "</VALORDEVOLUCAO>" : "") +
			("JUROSDIA" in valores ? "        <JUROSDIA>" + valores.JUROSDIA + "</JUROSDIA>" : "") +
			("CAPMENSAL" in valores ? "        <CAPMENSAL>" + valores.CAPMENSAL + "</CAPMENSAL>" : "") +
			("TAXASVENDOR" in valores ? "        <TAXASVENDOR>" + valores.TAXASVENDOR + "</TAXASVENDOR>" : "") +
			("JUROSVENDOR" in valores ? "        <JUROSVENDOR>" + valores.JUROSVENDOR + "</JUROSVENDOR>" : "") +
			("CODCOLCFO" in valores ? "        <CODCOLCFO>" + valores.CODCOLCFO + "</CODCOLCFO>" : "") +
			("CODCFO" in valores ? "        <CODCFO>" + valores.CODCFO + "</CODCFO>" : "") +
			("CODCOLCXA" in valores ? "        <CODCOLCXA>" + valores.CODCOLCXA + "</CODCOLCXA>" : "") +
			("CODCXA" in valores ? "        <CODCXA>" + valores.CODCXA + "</CODCXA>" : "") +
			("IDPGTO" in valores ? "        <IDPGTO>" + valores.IDPGTO + "</IDPGTO>" : "") +
			("CODTDO" in valores ? "        <CODTDO>" + valores.CODTDO + "</CODTDO>" : "") +
			("CODFILIAL" in valores ? "        <CODFILIAL>" + valores.CODFILIAL + "</CODFILIAL>" : "") +
			("SERIEDOCUMENTO" in valores ? "        <SERIEDOCUMENTO>" + valores.SERIEDOCUMENTO + "</SERIEDOCUMENTO>" : "") +
			("TIPOCONTABILLAN" in valores ? "        <TIPOCONTABILLAN>" + valores.TIPOCONTABILLAN + "</TIPOCONTABILLAN>" : "") +
			("CODMOEVALORORIGINAL" in valores ? "        <CODMOEVALORORIGINAL>" + valores.CODMOEVALORORIGINAL + "</CODMOEVALORORIGINAL>" : "") +
			("LIBAUTORIZADA" in valores ? "        <LIBAUTORIZADA>" + valores.LIBAUTORIZADA + "</LIBAUTORIZADA>" : "") +
			("STATUSEXPORTACAO" in valores ? "        <STATUSEXPORTACAO>" + valores.STATUSEXPORTACAO + "</STATUSEXPORTACAO>" : "") +
			("NUMLOTECONTABIL" in valores ? "        <NUMLOTECONTABIL>" + valores.NUMLOTECONTABIL + "</NUMLOTECONTABIL>" : "") +
			("VINCULADO" in valores ? "        <VINCULADO>" + valores.VINCULADO + "</VINCULADO>" : "") +
			("STATUSEXTRATO" in valores ? "        <STATUSEXTRATO>" + valores.STATUSEXTRATO + "</STATUSEXTRATO>" : "") +
			("CNABACEITE" in valores ? "        <CNABACEITE>" + valores.CNABACEITE + "</CNABACEITE>" : "") +
			("CNABSTATUS" in valores ? "        <CNABSTATUS>" + valores.CNABSTATUS + "</CNABSTATUS>" : "") +
			("CNABBANCO" in valores ? "        <CNABBANCO>" + valores.CNABBANCO + "</CNABBANCO>" : "") +
			("REEMBOLSAVEL" in valores ? "        <REEMBOLSAVEL>" + valores.REEMBOLSAVEL + "</REEMBOLSAVEL>" : "") +
			("USUARIO" in valores ? "        <USUARIO>" + valores.USUARIO + "</USUARIO>" : "") +
			("BAIXAAUTORIZADA" in valores ? "        <BAIXAAUTORIZADA>" + valores.BAIXAAUTORIZADA + "</BAIXAAUTORIZADA>" : "") +
			("TEMCHEQUEPARCIAL" in valores ? "        <TEMCHEQUEPARCIAL>" + valores.TEMCHEQUEPARCIAL + "</TEMCHEQUEPARCIAL>" : "") +
			("JAIMPRIMIU" in valores ? "        <JAIMPRIMIU>" + valores.JAIMPRIMIU + "</JAIMPRIMIU>" : "") +
			("NUMBLOQUEIOS" in valores ? "        <NUMBLOQUEIOS>" + valores.NUMBLOQUEIOS + "</NUMBLOQUEIOS>" : "") +
			("COTACAOINCLUSAO" in valores ? "        <COTACAOINCLUSAO>" + valores.COTACAOINCLUSAO + "</COTACAOINCLUSAO>" : "") +
			("COTACAOBAIXA" in valores ? "        <COTACAOBAIXA>" + valores.COTACAOBAIXA + "</COTACAOBAIXA>" : "") +
			("CARENCIAJUROS" in valores ? "        <CARENCIAJUROS>" + valores.CARENCIAJUROS + "</CARENCIAJUROS>" : "") +
			("TIPOJUROSDIA" in valores ? "        <TIPOJUROSDIA>" + valores.TIPOJUROSDIA + "</TIPOJUROSDIA>" : "") +
			("USUARIOCRIACAO" in valores ? "        <USUARIOCRIACAO>" + valores.USUARIOCRIACAO + "</USUARIOCRIACAO>" : "") +
			("DATAALTERACAO" in valores ? "        <DATAALTERACAO>" + valores.DATAALTERACAO + "</DATAALTERACAO>" : "") +
			("ALTERACAOBLOQUEADA" in valores ? "        <ALTERACAOBLOQUEADA>" + valores.ALTERACAOBLOQUEADA + "</ALTERACAOBLOQUEADA>" : "") +
			("MULTADIA" in valores ? "        <MULTADIA>" + valores.MULTADIA + "</MULTADIA>" : "") +
			("VALOROPERACAODESCONTO" in valores ? "        <VALOROPERACAODESCONTO>" + valores.VALOROPERACAODESCONTO + "</VALOROPERACAODESCONTO>" : "") +
			("DESCONTADO" in valores ? "        <DESCONTADO>" + valores.DESCONTADO + "</DESCONTADO>" : "") +
			("VALORINSS" in valores ? "        <VALORINSS>" + valores.VALORINSS + "</VALORINSS>" : "") +
			("VALORDEDUCAO" in valores ? "        <VALORDEDUCAO>" + valores.VALORDEDUCAO + "</VALORDEDUCAO>" : "") +
			("APLICFORMULA" in valores ? "        <APLICFORMULA>" + valores.APLICFORMULA + "</APLICFORMULA>" : "") +
			("INSSEMOUTRAEMPRESA" in valores ? "        <INSSEMOUTRAEMPRESA>" + valores.INSSEMOUTRAEMPRESA + "</INSSEMOUTRAEMPRESA>" : "") +
			("PERCENTBASEINSS" in valores ? "        <PERCENTBASEINSS>" + valores.PERCENTBASEINSS + "</PERCENTBASEINSS>" : "") +
			("OCAUTONOMO" in valores ? "        <OCAUTONOMO>" + valores.OCAUTONOMO + "</OCAUTONOMO>" : "") +
			("PERCBASEINSSEMPREGADO" in valores ? "        <PERCBASEINSSEMPREGADO>" + valores.PERCBASEINSSEMPREGADO + "</PERCBASEINSSEMPREGADO>" : "") +
			("INSSEDITADO" in valores ? "        <INSSEDITADO>" + valores.INSSEDITADO + "</INSSEDITADO>" : "") +
			("IRRFEDITADO" in valores ? "        <IRRFEDITADO>" + valores.IRRFEDITADO + "</IRRFEDITADO>" : "") +
			("REUTILIZACAO" in valores ? "        <REUTILIZACAO>" + valores.REUTILIZACAO + "</REUTILIZACAO>" : "") +
			("CATEGORIAAUTONOMO" in valores ? "        <CATEGORIAAUTONOMO>" + valores.CATEGORIAAUTONOMO + "</CATEGORIAAUTONOMO>" : "") +
			("VALORSESTSENAT" in valores ? "        <VALORSESTSENAT>" + valores.VALORSESTSENAT + "</VALORSESTSENAT>" : "") +
			("CONVENIO" in valores ? "        <CONVENIO>" + valores.CONVENIO + "</CONVENIO>" : "") +
			("DIGCONVENIO" in valores ? "        <DIGCONVENIO>" + valores.DIGCONVENIO + "</DIGCONVENIO>" : "") +
			("PERCJUROS" in valores ? "        <PERCJUROS>" + valores.PERCJUROS + "</PERCJUROS>" : "") +
			("PERCDESCONTO" in valores ? "        <PERCDESCONTO>" + valores.PERCDESCONTO + "</PERCDESCONTO>" : "") +
			("PERCMULTA" in valores ? "        <PERCMULTA>" + valores.PERCMULTA + "</PERCMULTA>" : "") +
			("PERCCAP" in valores ? "        <PERCCAP>" + valores.PERCCAP + "</PERCCAP>" : "") +
			("PERCOP1" in valores ? "        <PERCOP1>" + valores.PERCOP1 + "</PERCOP1>" : "") +
			("PERCOP2" in valores ? "        <PERCOP2>" + valores.PERCOP2 + "</PERCOP2>" : "") +
			("PERCOP3" in valores ? "        <PERCOP3>" + valores.PERCOP3 + "</PERCOP3>" : "") +
			("PERCOP4" in valores ? "        <PERCOP4>" + valores.PERCOP4 + "</PERCOP4>" : "") +
			("PERCOP5" in valores ? "        <PERCOP5>" + valores.PERCOP5 + "</PERCOP5>" : "") +
			("PERCOP6" in valores ? "        <PERCOP6>" + valores.PERCOP6 + "</PERCOP6>" : "") +
			("PERCOP7" in valores ? "        <PERCOP7>" + valores.PERCOP7 + "</PERCOP7>" : "") +
			("PERCOP8" in valores ? "        <PERCOP8>" + valores.PERCOP8 + "</PERCOP8>" : "") +
			("PERCCAPMENSAL" in valores ? "        <PERCCAPMENSAL>" + valores.PERCCAPMENSAL + "</PERCCAPMENSAL>" : "") +
			("PERCJUROSVENDOR" in valores ? "        <PERCJUROSVENDOR>" + valores.PERCJUROSVENDOR + "</PERCJUROSVENDOR>" : "") +
			("CODLOCALORIGEM" in valores ? "        <CODLOCALORIGEM>" + valores.CODLOCALORIGEM + "</CODLOCALORIGEM>" : "") +
			("TIPOJUROS" in valores ? "        <TIPOJUROS>" + valores.TIPOJUROS + "</TIPOJUROS>" : "") +
			("VALORCHEQUERECOMP" in valores ? "        <VALORCHEQUERECOMP>" + valores.VALORCHEQUERECOMP + "</VALORCHEQUERECOMP>" : "") +
			("VALORJUROSRECOMP" in valores ? "        <VALORJUROSRECOMP>" + valores.VALORJUROSRECOMP + "</VALORJUROSRECOMP>" : "") +
			("VALORBAIXARECOMP" in valores ? "        <VALORBAIXARECOMP>" + valores.VALORBAIXARECOMP + "</VALORBAIXARECOMP>" : "") +
			("CODLOTE" in valores ? "        <CODLOTE>" + valores.CODLOTE + "</CODLOTE>" : "") +
			("CODMOTISTOQUE" in valores ? "        <CODMOTISTOQUE>" + valores.CODMOTISTOQUE + "</CODMOTISTOQUE>" : "") +
			("VALORIRRFOUTRAEMPRESA" in valores ? "        <VALORIRRFOUTRAEMPRESA>" + valores.VALORIRRFOUTRAEMPRESA + "</VALORIRRFOUTRAEMPRESA>" : "") +
			("PERCBASEIRRFOUTRAEMPRESA" in valores ? "        <PERCBASEIRRFOUTRAEMPRESA>" + valores.PERCBASEIRRFOUTRAEMPRESA + "</PERCBASEIRRFOUTRAEMPRESA>" : "") +
			("LOTEEXPORTADO" in valores ? "        <LOTEEXPORTADO>" + valores.LOTEEXPORTADO + "</LOTEEXPORTADO>" : "") +
			("VALORCANCELADO" in valores ? "        <VALORCANCELADO>" + valores.VALORCANCELADO + "</VALORCANCELADO>" : "") +
			("CONTADEDUCAO" in valores ? "        <CONTADEDUCAO>" + valores.CONTADEDUCAO + "</CONTADEDUCAO>" : "") +
			("VALOREM" in valores ? "        <VALOREM>" + valores.VALOREM + "</VALOREM>" : "") +
			("VALOREMDEDUCAO" in valores ? "        <VALOREMDEDUCAO>" + valores.VALOREMDEDUCAO + "</VALOREMDEDUCAO>" : "") +
			("EMEDITADO" in valores ? "        <EMEDITADO>" + valores.EMEDITADO + "</EMEDITADO>" : "") +
			("DATAEMISSAOCALCULADA" in valores ? "        <DATAEMISSAOCALCULADA>" + valores.DATAEMISSAOCALCULADA + "</DATAEMISSAOCALCULADA>" : "") +
			("NOME" in valores ? "        <NOME>" + valores.NOME + "</NOME>" : "") +
			("DATAPROGRAMADA" in valores ? "        <DATAPROGRAMADA>" + valores.DATAPROGRAMADA + "</DATAPROGRAMADA>" : "") +
			("CODCOLCOPIADO" in valores ? "        <CODCOLCOPIADO>" + valores.CODCOLCOPIADO + "</CODCOLCOPIADO>" : "") +
			("IDLANCOPIADO" in valores ? "        <IDLANCOPIADO>" + valores.IDLANCOPIADO + "</IDLANCOPIADO>" : "") +
			("CODCOLIGADADESTINO" in valores ? "        <CODCOLIGADADESTINO>" + valores.CODCOLIGADADESTINO + "</CODCOLIGADADESTINO>" : "") +
			("CODFILIALDESTINO" in valores ? "        <CODFILIALDESTINO>" + valores.CODFILIALDESTINO + "</CODFILIALDESTINO>" : "") +
			("CODCPG" in valores ? "        <CODCPG>" + valores.CODCPG + "</CODCPG>" : "") +
			("VALOROUTRADESP" in valores ? "        <VALOROUTRADESP>" + valores.VALOROUTRADESP + "</VALOROUTRADESP>" : "") +
			("VALOROUTRACRED" in valores ? "        <VALOROUTRACRED>" + valores.VALOROUTRACRED + "</VALOROUTRACRED>" : "") +
			("INTEGRAFINANCEIRO" in valores ? "        <INTEGRAFINANCEIRO>" + valores.INTEGRAFINANCEIRO + "</INTEGRAFINANCEIRO>" : "") +
			("INTEGRASALDOFINANC" in valores ? "        <INTEGRASALDOFINANC>" + valores.INTEGRASALDOFINANC + "</INTEGRASALDOFINANC>" : "") +
			("INTEGRARECURSOS" in valores ? "        <INTEGRARECURSOS>" + valores.INTEGRARECURSOS + "</INTEGRARECURSOS>" : "") +
			("INTEGRABENS" in valores ? "        <INTEGRABENS>" + valores.INTEGRABENS + "</INTEGRABENS>" : "") +
			("INTEGRACARTAO" in valores ? "        <INTEGRACARTAO>" + valores.INTEGRACARTAO + "</INTEGRACARTAO>" : "") +
			("DOCORIGEM" in valores ? "        <DOCORIGEM>" + valores.DOCORIGEM + "</DOCORIGEM>" : "") +
			("STATUS" in valores ? "        <STATUS>" + valores.STATUS + "</STATUS>" : "") +
			("TIPO" in valores ? "        <TIPO>" + valores.TIPO + "</TIPO>" : "") +
			("CODMODALIDADE" in valores ? "        <CODMODALIDADE>" + valores.CODMODALIDADE + "</CODMODALIDADE>" : "") +
			("DATAVENCIMENTOINSS" in valores ? "        <DATAVENCIMENTOINSS>" + valores.DATAVENCIMENTOINSS + "</DATAVENCIMENTOINSS>" : "") +
			("DATAVENCIMENTOIRRF" in valores ? "        <DATAVENCIMENTOIRRF>" + valores.DATAVENCIMENTOIRRF + "</DATAVENCIMENTOIRRF>" : "") +
			("DATAVENCIMENTOINSSRF" in valores ? "        <DATAVENCIMENTOINSSRF>" + valores.DATAVENCIMENTOINSSRF + "</DATAVENCIMENTOINSSRF>" : "") +
			("GERARDOCUMENTOBAIXA" in valores ? "        <GERARDOCUMENTOBAIXA>" + valores.GERARDOCUMENTOBAIXA + "</GERARDOCUMENTOBAIXA>" : "") +
			("CODFUNCIONARIO" in valores ? "        <CODFUNCIONARIO>" + valores.CODFUNCIONARIO + "</CODFUNCIONARIO>" : "") +
			("MODELOCONTABILIZACAO" in valores ? "        <MODELOCONTABILIZACAO>" + valores.MODELOCONTABILIZACAO + "</MODELOCONTABILIZACAO>" : "") +
			("MODELOCONTABILIZACAOBAIXA" in valores ? "        <MODELOCONTABILIZACAOBAIXA>" + valores.MODELOCONTABILIZACAOBAIXA + "</MODELOCONTABILIZACAOBAIXA>" : "") +
			"    </FLAN>" +
			"</FinLAN>";

		var authenticatedService = serviceHelper.getBasicAuthenticatedClient(service, "com.totvs.IwsDataServer", getConstante('rm_usuario'), getConstante('rm_senha'));
		var result = authenticatedService.saveRecord(dataServerName.toString(), XML.toString(), (contexto + "CODCOLIGADA" in valores ? valores.CODCOLIGADA : "1"));
		var resultMsg = result.toString()
		if (resultMsg.split(";").length == 1) {
			dataset.addRow(['NOK', result.toString()])
		} else {
			dataset.addRow(['OK', result.toString()])
		}
		return dataset
	} catch (e) {
		dataset.addRow(['ERRO' + e.lineNumber, e.toString()]);
		return dataset
	}
}

function getConstraints(constraints) {
	var objRetorno = {}
	if (constraints != null && constraints.length > 0) {
		for (var c = 0; c < constraints.length; c++) {
			if (constraints[c].fieldName.toUpperCase() != "SQLLIMIT") {
				objRetorno[constraints[c].fieldName.toUpperCase()] = constraints[c].initialValue
			}
		}
	}
	return objRetorno;
}

function getConstante(param) {
	var aConstraint = [];
	aConstraint.push(DatasetFactory.createConstraint('id', param, param, ConstraintType.MUST));
	var oConstantes = DatasetFactory.getDataset('ds_Constantes', null, null, null);
	for (var i = 0; i < oConstantes.rowsCount; i++) {
		if (oConstantes.getValue(i, "id").trim() == param.trim()) {
			return oConstantes.getValue(i, "Valor").trim();
		}
	}
	return '0';
}