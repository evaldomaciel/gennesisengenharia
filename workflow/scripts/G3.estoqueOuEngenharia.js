function decisionMaker(){
    var estoqueColig_2 = [
        "01.001", "01.002", "01.003", "02.001", "02.002", "01.025", "01.026", 
        "01.027", "01.028", "01.029", "02.017", "02.018", "01.006", "01.030", 
        "01.032", "01.012", "01.013", "01.035", "01.036", "01.014", "01.018", 
        "01.021", "01.022", "01.041", "01.046", "01.047", "02.008", "02.009", 
        "02.026", "02.032", "03.003", "03.010", "04.002", "04.007", "04.012", 
        "05.003", "05.006", "05.007", "05.029", "05.032", "05.035", "06.004", 
        "03.008", "04.004", "04.009", "05.010", "05.011", "05.012", "06.002", 
        "02.014", "03.001", "04.001", "04.006", "05.001", "05.004", "05.005", 
        "06.001", "02.029", "02.030", "02.031", "02.032", "02.033"
    ];
      
      var estoqueColig_1 = [
        "01.001", "01.002", "01.006", "01.007", "01.008", "01.009", "01.010", 
        "03.001", "04.001", "05.001", "01.011", "05.002", "02.001", "02.004", 
        "03.012", "04.005", "05.007", "05.011", "05.012", "05.013", 
        "05.017", "05.016", "05.018", "02.002", "03.007", "03.008", "04.003", 
        "03.013", "01.012", "01.013", "01.030", "01.031", "01.032", "01.033", 
        "01.034", "01.035", "01.036", "05.006"
    ];

    var estoqueColig_3 = [
        "01.003", "01.009", "01.012", "01.013", "02.002", "02.005", "01.004", 
        "01.010", "03.003", "03.008", "03.010"
    ];
    
    var estoque = hAPI.getCardValue("localEstoque").split('-');
    estoque = estoque[0].trim();
    var coligada = hAPI.getCardValue("CodColigada");

    var foundInColig_1 = arrayContainsValue(estoqueColig_1, estoque);
    var foundInColig_2 = arrayContainsValue(estoqueColig_2, estoque);
    var foundInColig_3 = arrayContainsValue(estoqueColig_3, estoque);

    if(coligada == 2){
   
        if(foundInColig_2){
        	
            return true;
        }
    } else if(coligada == 1){
    	
        if(foundInColig_1){
        	
            return true;
        }
    } else if (coligada == 3){
        if(foundInColig_3){
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