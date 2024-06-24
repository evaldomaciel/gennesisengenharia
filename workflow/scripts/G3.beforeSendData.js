function beforeSendData(customFields, customFacts) {
    log.info("BEGIN beforeSendData>G3############################");

    var valorLiquido = hAPI.getCardValue("valorLiquido");
    log.info("-----> valor liquido: " + valorLiquido);
    log.info("-----> valor liquido sem R$: " + valorLiquido.replace("R$", ""));
    log.info("-----> valor liquido formatado: " + valorLiquido.replace("R$", "").replace(",", "."));

    var unidadeCampoOculto = hAPI.getCardValue("unidadeCampoOculto");
    log.info("-----> Unidade: " + unidadeCampoOculto);
    log.info("-----> Unidade sem R$: " + unidadeCampoOculto.replace("R$", ""));
    log.info("-----> Unidade formatado: " + unidadeCampoOculto.replace("R$", "").replace(",", "."));

    var quantidadeCampoOculto = hAPI.getCardValue("quantidadeCampoOculto");
    log.info("-----> Quantidade: " + quantidadeCampoOculto);
    log.info("-----> Quantidade sem R$: " + quantidadeCampoOculto.replace("R$", ""));
    log.info("-----> Quantidade formatado: " + quantidadeCampoOculto.replace("R$", "").replace(",", "."));

    var precoUnitarioCampoOculto = hAPI.getCardValue("precoUnitarioCampoOculto");
    log.info("-----> Preco: " + precoUnitarioCampoOculto);
    log.info("-----> Preco sem R$: " + precoUnitarioCampoOculto.replace("R$", ""));
    log.info("-----> Preco formatado: " + precoUnitarioCampoOculto.replace("R$", "").replace(",", "."));

    var descontoCampoOculto = hAPI.getCardValue("descontoCampoOculto");
    log.info("-----> Desconto: " + descontoCampoOculto);
    log.info("-----> Desconto sem R$: " + descontoCampoOculto.replace("R$", ""));
    log.info("-----> Desconto formatado: " + descontoCampoOculto.replace("R$", "").replace(",", "."));

    var totalCampoOculto = hAPI.getCardValue("totalCampoOculto");
    log.info("-----> Total : " + totalCampoOculto);
    log.info("-----> Total sem R$: " + totalCampoOculto.replace("R$", ""));
    log.info("-----> Total formatado: " + totalCampoOculto.replace("R$", "").replace(",", "."));

    customFields[0] = hAPI.getCardValue("nomeComprador");
    customFields[1] = hAPI.getCardValue("CodColigada");
    customFields[2] = hAPI.getCardValue("IdMov");
    customFields[3] = hAPI.getCardValue("numeroMov");
    customFields[4] = hAPI.getCardValue("dataEmissao");
    customFields[5] = hAPI.getCardValue("localEstoque");
    customFields[6] = hAPI.getCardValue("filial");
    customFields[7] = hAPI.getCardValue("observacao");
    customFields[8] = hAPI.getCardValue("historico");
    customFields[9] = hAPI.getCardValue("produtosMobile");
    customFields[10] = hAPI.getCardValue("fornecedor");
    customFields[11] = hAPI.getCardValue("centroCustoCampoOculto");
    customFields[12] = hAPI.getCardValue("valorCampoOculto");
    customFields[13] = hAPI.getCardValue("produtoCampoOculto");

    customFacts[0] = convertToDouble(valorLiquido);
    customFacts[1] = convertToDouble(unidadeCampoOculto);
    customFacts[2] = convertToDouble(quantidadeCampoOculto);
    customFacts[3] = convertToDouble(precoUnitarioCampoOculto);
    customFacts[4] = convertToDouble(descontoCampoOculto);
    customFacts[5] = convertToDouble(totalCampoOculto);


    log.info("END beforeSendData>G3############################");
}

function convertToDouble(valor) {
    try {
        var valueless = valor.replace("R$", "").replace(",", ".");
        valueless = valueless.trim();
        var n = parseFloat(valueless);

        if (isNaN(n)) {
            throw new Error("Valor não é um número válido.");
        }

        return java.lang.Double.parseDouble(n.toFixed(2));
    } catch (e) {
        log.error("ERRO:" + e.toString());
        log.error("ERRO:LINE: " + e.lineNumber);
        return 0.0;
    }
}
