var G4 = {
    getDados: function () {
        try {
            var formData = new java.util.HashMap();

            var CodColigada = hAPI.getCardValue("CodColigada");
            var idmov = hAPI.getCardValue("IdMov");
            var pedidoExtra = hAPI.getCardValue("pedidoExtra");
            var nomeComprador = hAPI.getCardValue("nomeComprador");
            var urgencia = hAPI.getCardValue("urgencia");
            var tipoMovimento = hAPI.getCardValue("tipoMovimento");
            var numeroMov = hAPI.getCardValue("numeroMov");
            var dataEmissao = hAPI.getCardValue("dataEmissao");
            var filial = hAPI.getCardValue("filial");
            var fornecedor = hAPI.getCardValue("fornecedor");
            var desconto = hAPI.getCardValue("desconto");
            var valueFrete = hAPI.getCardValue("valueFrete");
            var valorLiquido = hAPI.getCardValue("valorLiquido");
            var codPagamento = hAPI.getCardValue("codPagamento");
            var localEstoque = hAPI.getCardValue("localEstoque");
            var historico = hAPI.getCardValue("historico");
            var observacao = hAPI.getCardValue("observacao");
            var dadosBancarios = hAPI.getCardValue("dadosBancarios");
            var produtos = hAPI.getCardValue("produtosMobile");
            var CC = hAPI.getCardValue("CC_mobile");

            formData.put("CodColigada", CodColigada);
            formData.put("IdMov", idmov);
            formData.put("pedidoExtra", pedidoExtra);
            formData.put("nomeComprador", nomeComprador);
            formData.put("urgencia", urgencia);
            formData.put("tipoMovimento", tipoMovimento);
            formData.put("numeroMov", numeroMov);
            formData.put("dataEmissao", dataEmissao);
            formData.put("filial", filial);
            formData.put("fornecedor", fornecedor);
            formData.put("desconto", desconto);
            formData.put("valueFrete", valueFrete);
            formData.put("valorLiquido", valorLiquido);
            formData.put("codPagamento", codPagamento);
            formData.put("localEstoque", localEstoque);
            formData.put("historico", historico);
            formData.put("observacao", observacao);
            formData.put("dadosBancarios", dadosBancarios);
            formData.put("produtosMobile", produtos);
            formData.put("CC_mobile", CC);

            return formData;
        } catch (e) {
            throw "Erro ao capturar dados G3 - G4: " + e;
        }
    },
    start: function () {
        try {
            var users = new java.util.ArrayList();
            users.add("4ef20412-7687-40a4-b1c8-095c0a92503e");

            var data = G4.getDados();

            var subProcess = hAPI.startProcess('G4', 6, users, "Solicitação inicializada pela função hAPI", false, data, false);
            if (subProcess) hAPI.setCardValue("IdentificadorFluigAnexo", subProcess.get('iProcess'));
        } catch (e) {
            throw "Erro ao iniciar o processo G4: " + e;
        }
    }
}