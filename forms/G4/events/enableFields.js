// function enableFields(form) {
//    form.setEnabled("pagamentosParciaisObs", false);
//    var numTask = parseInt(getValue("WKNumState"));
//    var indexes = form.getChildrenIndexes("tabela_boleto");
//    var indexes1 = form.getChildrenIndexes("tabela_comprovante");
//    var indexes2 = form.getChildrenIndexes("tabela_nota_fiscal");

//    if ([14].indexOf(numTask) > -1) {
//       comprovante(form, indexes1, false);
//       notaFiscal(form, indexes2, false);
//    }
//    if ([12].indexOf(numTask) > -1) {
//       notaFiscal(form, indexes2, false);
//       boleto(form, indexes, false);
//       conferenciaComprovantes(form, false);
//    }
//    if ([16].indexOf(numTask) > -1) {
//       comprovante(form, indexes1, false);
//       notaFiscal(form, indexes2, false);
//    }
//    if ([22].indexOf(numTask) > -1) {
//       comprovante(form, indexes1, false);
//       boleto(form, indexes, false);
//       conferenciaComprovantes(form, false);
//    }
//    if ([24].indexOf(numTask) > -1) {
//       comprovante(form, indexes1, false);
//       boleto(form, indexes, false);
//       conferenciaComprovantes(form, false);
//       notaFiscal(form, indexes2, false);
//    }

//    if ([112].indexOf(numTask) > -1) {
//       form.setEnabled("pagamentosParciaisObs", true);
//    }

   

// }

// function boleto(form, indexes, enable) {
//    form.setEnhancedSecurityHiddenInputs(true);
//    //form.setEnabled("tipoDemanda", enable); 
//    //form.setEnabled("dataEntrega", enable); 
//    form.setEnabled("btnAddBoleto", enable);

//    for (var i = 0; i < indexes.length; i++) {
//       form.setEnabled("dataVencimento___" + indexes[i], enable);
//       form.setEnabled("deleteTableBoleto___" + indexes[i], enable);
//    }
// }

// function comprovante(form, indexes, enable) {
//    form.setEnhancedSecurityHiddenInputs(true);
//    form.setEnabled("btnAddComprovante", enable);

//    for (var i = 0; i < indexes.length; i++) {
//       form.setEnabled("dataPagamento___" + indexes[i], enable);
//       form.setEnabled("juros___" + indexes[i], enable);
//       form.setEnabled("parecerFinanceiro___" + indexes[i], enable);
//       form.setEnabled("valorOriginal___" + indexes[i], enable);
//       form.setEnabled("valorPago___" + indexes[i], enable);
//       form.setEnabled("deleteTableComprovante___" + indexes[i], enable);
//    }
// }

// function conferenciaComprovantes(form, enable) {
//    form.setEnhancedSecurityHiddenInputs(true);
//    form.setEnabled("aprovacaoComprovantes", enable);
//    form.setEnabled("parecerCompras", enable);
// }

// function notaFiscal(form, indexes, enable) {
//    form.setEnhancedSecurityHiddenInputs(true);
//    form.setEnabled("material", enable);
//    form.setEnabled("responsavelPeloRecebimento", enable);
//    form.setEnabled("notacoesMaterialParcial", enable);
//    form.setEnabled("btnAddNotaFiscal", enable);

//    for (var i = 0; i < indexes.length; i++) {
//       form.setEnabled("dataRecebimento___" + indexes[i], enable);
//    }
// }