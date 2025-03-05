function decisionMaker(){
    var estoqueColig_2 = ["01.001","01.002","01.003","02.001","02.002", "01.025","01.026","01.027","01.028","01.029","02.017","02.018","01.006","01.030","01.032","01.012","01.013","01.035","01.036"];
    var estoqueColig_1 = ["01.001","01.002","01.006","01.007","01.008","01.009","01.010","03.001","04.001","05.001","01.011","05.002","02.001","02.004","03.012","04.005","05.007", "05.011","05.012", "05.013"];
    
    var estoque = hAPI.getCardValue("localEstoque").split('-');
    estoque = estoque[0].trim();
    var coligada = hAPI.getCardValue("CodColigada");
    
    log.info("-----> coligada estoque getway " + coligada);
    log.info("-----> localEstoque estoque getway TESTE " + estoque);

    var foundInColig_1 = arrayContainsValue(estoqueColig_1, estoque);
    var foundInColig_2 = arrayContainsValue(estoqueColig_2, estoque);

    if(coligada == 2){
        log.info("-----> entrou if coligada 2");
        if(foundInColig_2){
        	log.info("-----> entrou if coligada 2 TRUE");
            return true;
        }
    } else if(coligada == 1){
    	log.info("-----> entrou if coligada 1");
        if(foundInColig_1){
        	log.info("-----> entrou if coligada 1 TRUE");
            return true;
        }
    }
    return false;
}

function arrayContainsValue(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) {
            return true;
        }
    }
    return false;
}