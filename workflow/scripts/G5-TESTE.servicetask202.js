function servicetask202(attempt, message) {
  var valores = {
    "CODCOLIGADA": hAPI.getCardValue("coligada"),
    "NOMEFANTASIA": hAPI.getCardValue("nome_social"),
    "NOME": hAPI.getCardValue("nome"),
    "PAGREC": hAPI.getCardValue("pagar_receber"),
    "RUA": hAPI.getCardValue("rua"),
    "NUMERO": hAPI.getCardValue("numero"),
    "BAIRRO": hAPI.getCardValue("bairro"),
    "CEP": hAPI.getCardValue("CEP"),
    "TELEFONE": hAPI.getCardValue("telefone"),
    "EMAIL": hAPI.getCardValue("email"),
    "CONTATO": hAPI.getCardValue("contato"),
    "ATIVO": hAPI.getCardValue("status_tipo_cliente"),
    "CODMUNICIPIO": hAPI.getCardValue("codigo_municipio"),
    "PESSOAFISOUJUR": hAPI.getCardValue("categoria"),
    "PAIS": hAPI.getCardValue("pais"),
    "CAIXAPOSTAL": hAPI.getCardValue("caixa_postal"),
    "TIPORUA": hAPI.getCardValue("tipo_rua"),
    "TIPOBAIRRO": hAPI.getCardValue("tipo_bairro"),
    "USUARIOCRIACAO": hAPI.getCardValue("solicitante"),
    "IDPAIS": hAPI.getCardValue("id_pais"),
    "NACIONALIDADE": hAPI.getCardValue("nacionalidade"),
    "APOSENTADOOUPENSIONISTA": hAPI.getCardValue("aposentado_pensionista"),
  };

  log.info("VALORES --> ")
  log.dir(valores)

  // Objeto para armazenar os valores não nulos
  var valoresNaoNulos = {};

  // Itera sobre as chaves do objeto valores
  for (var key in valores) {
    if (valores.hasOwnProperty(key) && valores[key] !== null) {
      valoresNaoNulos[key] = valores[key]; // Adiciona ao objeto valoresNaoNulos se não for null
    }
  }

  // Agora valoresNaoNulos contém apenas os valores não nulos
  log.info("VALORES NAO NULOS -->");
  log.dir(valoresNaoNulos)

  var cst = []

  for (var propriedade in valores) {
    if (valores.hasOwnProperty(propriedade)) {
      if (valores[propriedade] != "") {
        cst.push(DatasetFactory.createConstraint(propriedade, valores[propriedade], valores[propriedade], ConstraintType.MUST));
      }
    }
  }

  var dtsIntegracao = DatasetFactory.getDataset("ds_novoFornecedor", null, cst, null)

  if (dtsIntegracao.rowsCount > 0) {
    if (dtsIntegracao.getValue(0, "Retorno") == "OK") {
      return true
    } else {
      throw dtsIntegracao.getValue(0, "Mensagem")
    }
  } else {
    throw "Não retornou resultado da integração"
  }
}
