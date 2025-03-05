function VerificarValorMapaDeCotacao() {
    try {
        var Filial = hAPI.getCardValue("filial") || "";
        var FilialFormatada = Filial.split(" - ")[0].trim(); 
        var Empresa = parseInt(hAPI.getCardValue("CodColigada")) || 0; 
        var valorLiquido = hAPI.getCardValue("valorLiquido");

        log.info("-----> valor liquido: " + valorLiquido);

        log.info("-----> valor FilialFormatada: " + FilialFormatada);
        log.info("-----> valor Filial: " + Filial);
        log.info("-----> valor Empresa: " + Empresa);

        var valorSemRS = valorLiquido.replace("R$", "").trim();
        var valorCorrigido = valorSemRS.replace(".", "").replace(",", ".");
        var ValorLiquidoFORMATADO = parseFloat(valorCorrigido);

        log.info("-----> valor liquido formatado: " + ValorLiquidoFORMATADO);

        if (isNaN(ValorLiquidoFORMATADO)) {
            throw new Error("Valor não é um número válido.");
        }

        if ((Empresa == 1 && (FilialFormatada == 1 || FilialFormatada == 5)) || 
            (Empresa == 3 && FilialFormatada == 2)) {
            return false; 
        }	

        return ValorLiquidoFORMATADO >= 3000;

    } catch (e) {
        log.error("Erro ao verificar o valor do campo: " + e.message);
        return false; 
    }
}
