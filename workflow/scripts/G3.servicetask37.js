/***********************************************************************************************
 * @author 		TBNE - Angelo Barcelos - Desenvolvedor FLUIG angelo.barcelos@totvs.com.br
 * @data   		03/07/2023
 * @Versao RM   12.1.2302.160
 * @Descricao	Dados Ordem de Compra
 ***********************************************************************************************/
function servicetask37() {
    try {
        
        var codcoligada = hAPI.getCardValue('CodColigada').toString();
        var idMov = hAPI.getCardValue('IdMov').toString();
        
        loadDS(codcoligada,idMov);
//        loadRequester(codcoligada,idMov);
        
    } catch (e) {
        throw "Error servicetask37 " + e;
    }
}

function loadDS(codcoligada,idMov) {
    try {      
        var stringProduct = "";
        
        var c1 = DatasetFactory.createConstraint("CODCOLIGADA", codcoligada, codcoligada, ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("IDMOV", idMov, idMov, ConstraintType.MUST);

        var constraints = [c1, c2];
        var dataset = DatasetFactory.getDataset("ds_totvs_rm_oc", null, constraints, null);

        if (dataset != null && dataset.rowsCount > 0) {
            for (var i = 0; i < dataset.rowsCount; i++) {
                var centroCusto = dataset.getValue(i, "CENTRO_CUSTO").toString().trim();
                var nomeProduto = dataset.getValue(i, "NOME_PRODUTO").toString().trim();
                var valorLiquido = dataset.getValue(i, "VALORLIQUIDO").toString().trim();   
                var tipoMovimento = dataset.getValue(i, "CODTMV").toString().trim();  
                var fornecedor = dataset.getValue(i, "FORNECEDOR").toString().trim();
                var codPagamento = dataset.getValue(i, "TIPO_PAGAMENTO").toString().trim();
                var localEstoque = dataset.getValue(i, "LOCAL_ESTOQUE").toString().trim();
                var historico = dataset.getValue(i, "HISTORICOCURTO").toString().trim();                
                var numeroMov = dataset.getValue(i, "NUMEROMOV").toString().trim();
                var tipoMovimento = dataset.getValue(i, "CODTMV").toString().trim();                
                var dataEmissao = dataset.getValue(i, "DATAEMISSAO").toString().trim();                
                var filial = dataset.getValue(i, "FILIAL").toString().trim();                
                var frete = dataset.getValue(i, "VALORDESP").toString().trim();
                var desconto = dataset.getValue(i, "DESCONTO_OC").toString().trim();                
                var observacao = dataset.getValue(i, "OBSERVACAO").toString().trim();
                var comprador = dataset.getValue(i, "NOME_COMPRADOR").toString().trim();   
                var dadosBancarios = dataset.getValue(i, "DADOSBANCARIOS").toString().trim();      
                var numOs = dataset.getValue(i, "NUMOS").toString().trim();      
                
                centroCusto = centroCusto != null ? centroCusto.toString().trim() : " ";
                nomeProduto = nomeProduto != null ? nomeProduto.toString().trim() : " ";
                valorLiquido = valorLiquido != null ? valorLiquido.toString().trim() : " ";
                tipoMovimento = tipoMovimento != null ? tipoMovimento.toString().trim() : " ";
                fornecedor = fornecedor != null ? fornecedor.toString().trim() : " ";
                codPagamento = codPagamento != null ? codPagamento.toString().trim() : " ";
                localEstoque = localEstoque != null ? localEstoque.toString().trim() : " ";
                historico = historico != null ? historico.toString().trim() : " ";
                numeroMov = numeroMov != null ? numeroMov.toString().trim() : " ";
                dataEmissao = dataEmissao != null ? dataEmissao.toString().trim() : " ";
                filial = filial != null ? filial.toString().trim() : " ";
                frete = frete != null ? frete.toString().trim() : " ";
                desconto = desconto != null ? desconto.toString().trim() : " ";
                observacao = observacao != null ? observacao.toString().trim() : " ";
                comprador = comprador != null ? comprador.toString().trim() : " ";
                dadosBancarios = dadosBancarios != null ? dadosBancarios.toString().trim() : " ";
                     
                var urgencia = dataset.getValue(i, "URGENCIA").toString().trim();
                urgencia = (urgencia == "1") ? "Normal" : (urgencia == "2") ? "Urgente" : "Não informado";
                
                stringProduct += nomeProduto + " | ";
                
                var cc_mobile = centroCusto.split('-');               
                
                
                hAPI.setCardValue('nomeComprador', comprador);                
                hAPI.setCardValue('numeroMov', numeroMov);
                hAPI.setCardValue('tipoMovimento', tipoMovimento);                
                hAPI.setCardValue('dataEmissao', formatDate(dataEmissao));                
                hAPI.setCardValue('filial', filial);                
                hAPI.setCardValue('valueFrete', formatCurrency2(parseFloat(frete)));
                hAPI.setCardValue('desconto', formatCurrency2(parseFloat(desconto)));                
                hAPI.setCardValue('observacao', observacao);
                hAPI.setCardValue('historico', historico);
                hAPI.setCardValue('localEstoque', localEstoque);
                hAPI.setCardValue('codPagamento', codPagamento);
                hAPI.setCardValue('fornecedor', fornecedor);
                hAPI.setCardValue('urgencia', urgencia);
                hAPI.setCardValue('CC', centroCusto);
                hAPI.setCardValue('CC_mobile', cc_mobile[1]);
                hAPI.setCardValue('valorLiquido', formatCurrency2(parseFloat(valorLiquido)));
                hAPI.setCardValue('tipoMovimento', tipoMovimento);
                hAPI.setCardValue('dadosBancarios', dadosBancarios);
                hAPI.setCardValue('numOs', numOs);
            }
        }
        hAPI.setCardValue('produtosMobile', stringProduct);
    } catch (e) {
        throw "Erro ao carregar ds_rm_totvs_oc " + e;
    }
}

function loadRequester(codcoligada,idMov) {
	try{
        var c1 = DatasetFactory.createConstraint("CODCOLIGADAOC", codcoligada, codcoligada, ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("IDMOVOC", idMov, idMov, ConstraintType.MUST);

        var constraints = [c1, c2];
        var dataset = DatasetFactory.getDataset("ds_totvs_rm_solicitante", null, constraints, null);

        if (dataset != null && dataset.rowsCount > 0) {
            for (var i = 0; i < dataset.rowsCount; i++) {
                var solicitanteRM = dataset.getValue(i, "REQUISITANTE_RM").toString().trim();
                var solicitanteSC = dataset.getValue(i, "REQUISITANTE_SC").toString().trim();
                
                solicitanteRM = solicitanteRM != null ? solicitanteRM.toString().trim() : " ";
                solicitanteSC = solicitanteSC != null ? solicitanteSC.toString().trim() : " ";
                
                if (solicitanteRM != " " && solicitanteRM != undefined) {
                	hAPI.setCardValue('nomeSolicitante', solicitanteSC);
                	log.info("----> 2 " + solicitanteSC)                	                    
                } else {
                	log.info("----> 1 " + solicitanteRM)
                	hAPI.setCardValue('nomeSolicitante', solicitanteRM);
                }                                               
            }
        }
	}catch(e){
		throw "loadRequester " + e;
	}
}

function formatCurrency(valor) {
    try {
        var format = java.text.NumberFormat.getCurrencyInstance(new java.util.Locale('pt', 'BR'));
        var formattedValue = format.format(valor);

        return formattedValue;
    } catch (e) {
        throw "formatCurrency " + e;
    }
}

function formatDate(rawDate) {
    var inputFormat = new java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
    var outputFormat = new java.text.SimpleDateFormat("dd/MM/yyyy");

    try {
        var inputDate = inputFormat.parse(rawDate);
        var formattedDate = outputFormat.format(inputDate);
        return formattedDate;
    } catch (e) {
        return "Erro ao formatar a data: " + e.message;
    }
}





function formatCurrency2(value) {
    try {
        // Garantir que o valor seja uma string e tenha pelo menos duas casas decimais
        var valueStr = parseFloat(value).toFixed(2);

        // Separar a parte inteira da parte decimal
        var parts = valueStr.split('.');
        var integerPart = parts[0];
        var decimalPart = parts[1];

        //log.info("INTEGER PART -> " + integerPart)
        //log.info("decimalPart -> " + decimalPart)
        // Adicionar separador de milhar
        var withThousandSeparators = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        // Juntar a parte inteira e a parte decimal novamente
        var formattedValue = withThousandSeparators + ',' + decimalPart;
        //log.info("formattedValue -> " + formattedValue)

        // Adicionar o símbolo de moeda "R$"
        return 'R$ ' + formattedValue;
    } catch (e) {
        throw new Error("formatCurrency " + e);
    }
}