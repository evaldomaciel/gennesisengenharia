function enableFields(form) {
	form.setEnabled("pagamentosParciaisObs", false);
	var numTask = parseInt(getValue("WKNumState"));
	var tabela_boleto = form.getChildrenIndexes("tabela_boleto");
	var tabela_comprovante = form.getChildrenIndexes("tabela_comprovante");
	var tabela_nota_fiscal = form.getChildrenIndexes("tabela_nota_fiscal");

	if ([14].indexOf(numTask) > -1) {
		comprovante(form, tabela_comprovante, false);
	}
	else if ([12].indexOf(numTask) > -1) {
		boleto(form, tabela_boleto, true);
		conferenciaComprovantes(form, true);
	}
	else if ([16].indexOf(numTask) > -1) {
		comprovante(form, tabela_comprovante, false);
	}
	else if ([22].indexOf(numTask) > -1) {
		comprovante(form, tabela_comprovante, false);
		boleto(form, tabela_boleto, false);
		conferenciaComprovantes(form, false);
	}
	else if ([24].indexOf(numTask) > -1) {
		comprovante(form, tabela_comprovante, false);
		boleto(form, tabela_boleto, false);
		conferenciaComprovantes(form, false);
	}
	else if ([112].indexOf(numTask) > -1) {
		form.setEnabled("pagamentosParciaisObs", true);
	}
	else if ([119, 120].indexOf(numTask) > -1) {
		comprovante(form, tabela_comprovante, false);
		boleto(form, tabela_boleto, false);
		conferenciaComprovantes(form, false);
	}

	/** Negações */
	if (numTask != 22) {
		notaFiscal(form, tabela_nota_fiscal, false);
	}
}

function boleto(form, indexes, enable) {
	form.setEnhancedSecurityHiddenInputs(true);
	form.setEnabled("tipoDemanda", enable);
	form.setEnabled("dataEntrega", enable);
	form.setEnabled("btnAddBoleto", enable);

	for (var i = 0; i < indexes.length; i++) {
		form.setEnabled("dataVencimento___" + indexes[i], enable);
		form.setEnabled("deleteTableBoleto___" + indexes[i], enable);
	}
}

function comprovante(form, indexes, enable) {
	form.setEnhancedSecurityHiddenInputs(true);
	form.setEnabled("btnAddComprovante", enable);

	for (var i = 0; i < indexes.length; i++) {
		form.setEnabled("dataPagamento___" + indexes[i], enable);
		form.setEnabled("juros___" + indexes[i], enable);
		form.setEnabled("parecerFinanceiro___" + indexes[i], enable);
		form.setEnabled("valorOriginal___" + indexes[i], enable);
		form.setEnabled("valorPago___" + indexes[i], enable);
		form.setEnabled("deleteTableComprovante___" + indexes[i], enable);
	}
}

function conferenciaComprovantes(form, enable) {
	form.setEnhancedSecurityHiddenInputs(true);
	form.setEnabled("aprovacaoComprovantes", enable);
	form.setEnabled("parecerCompras", enable);
}

function notaFiscal(form, indexes, enable) {
	form.setEnhancedSecurityHiddenInputs(true);
	form.setEnabled("material", enable);
	form.setEnabled("tipoRecebimento", enable);
	form.setEnabled("responsavelPeloRecebimento", enable);
	form.setEnabled("notacoesMaterialParcial", enable);
	form.setEnabled("btnAddNotaFiscal", enable);

	for (var i = 0; i < indexes.length; i++) {
		form.setEnabled("dataRecebimento___" + indexes[i], enable);
		form.setEnabled("parecerEstoque___" + indexes[i], enable);
	}
}