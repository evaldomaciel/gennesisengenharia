function servicetask114(attempt, message) {
  /**
   * Criada pasta "Anexos Jurídico" na raiz do GED com o ID 13590 ou 467649
   * HMG: gennesisengenharia160517 - pasta : 61248
   * PRD: gennesisengenharia160516 - pasta : 88200
   */

  var nomeDaPasta = "G5-" + String(getValue('WKNumProces'));

  try {
    var pageService = fluigAPI.getPageService();
    var urlDoServidor = String(pageService.getServerURL());
    var pastaPai = urlDoServidor.indexOf('gennesisengenharia160516') >= 0 ? 88200 : 61248;
    var NumeroDaSolicitacao = hAPI.getCardValue("numero_solicitacao");

    var cCusto = hAPI.getCardValue("centro_de_custo");
    var TabelaRateioCC = hAPI.getChildrenIndexes("table_rateio_ccusto");

    for (var i = 0; i < TabelaRateioCC.length; i++) {
      var NaturezaPreenchida = hAPI.getCardValue("coluna_natureza___" + TabelaRateioCC[i]);
      if (!NaturezaPreenchida || NaturezaPreenchida.trim() === "") {
        throw "O campo natureza está vazio ou não foi preenchido.";
      }

      var centroDeCusto_hAPI = cCusto.split(" - ");
      var centroDeCusto = centroDeCusto_hAPI.length > 1 ? centroDeCusto_hAPI[1].trim() : cCusto.trim();

      if (!centroDeCusto || centroDeCusto === "") {
        throw "Erro ao validar o centro de custo. O campo não foi preenchido.";
      }
      nomeDaPasta = "G5-" + centroDeCusto + "-" + NumeroDaSolicitacao + "-" + NaturezaPreenchida;
    }

    var pastaCriada = criaPasta(pastaPai, nomeDaPasta);
    var listaDeDocumento = publicarGED(pastaCriada);
    if (listaDeDocumento.length > 0) hAPI.setCardValue("anexos", String(listaDeDocumento.join(",")))

    return true;
  } catch (error) {
    throw String(error.lineNumber) + " - " + String(error);
  }
}