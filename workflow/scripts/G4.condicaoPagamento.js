function tipoPagamento() {
    var tipoPagamento = hAPI.getCardValue("codPagamento");

    var contemBoleto = tipoPagamento.indexOf("BOLETO") !== -1;
    log.info("----->  existe boleto  >  " + contemBoleto);
    return contemBoleto;
}