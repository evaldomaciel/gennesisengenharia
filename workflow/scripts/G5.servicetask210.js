function servicetask210(attempt, message) {

  var valores = {
      "CODCOLIGADA": hAPI.getCardValue("hidden_coligada_cli_for"),
      "NOMEFANTASIA": hAPI.getCardValue("nome_social_fin"),
      "NOME": hAPI.getCardValue("nome_fin"),
      "CGCCFO": capta_Cpf_Cnpj(hAPI.getCardValue("categoria_fin")),
      "PAGREC": hAPI.getCardValue("pagar_receber"),
      "RUA": hAPI.getCardValue("rua_fin"),
      "NUMERO": hAPI.getCardValue("numero_fin"),
      "BAIRRO": hAPI.getCardValue("bairro_fin"),
      "CODETD": hAPI.getCardValue("sigla_estado_fin"),
      "CEP": hAPI.getCardValue("cep_fin"),
      "TELEFONE": hAPI.getCardValue("hidden_telefone"),
      "EMAIL": hAPI.getCardValue("email_fin"),
      "CONTATO": hAPI.getCardValue("contato_fin"),
      "ATIVO": hAPI.getCardValue("status_tipo_cliente_fin"),
      "CODMUNICIPIO": hAPI.getCardValue("codigo_municipio_fin"),
      "PESSOAFISOUJUR": hAPI.getCardValue("categoria_fin"),
      "PAIS": hAPI.getCardValue("pais_fin"),
      "NUMDEPENDENTES": hAPI.getCardValue("numero_dependentes_fin"),
      "CAIXAPOSTAL": hAPI.getCardValue("caixa_postal_fin"),
      "TIPORUA": hAPI.getCardValue("tipo_rua_fin"),
      "TIPOBAIRRO": hAPI.getCardValue("tipo_bairro_fin"),
      "USUARIOCRIACAO": "suporte.totvs",
      "IDPAIS": hAPI.getCardValue("id_pais_fin"),
      "NACIONALIDADE": hAPI.getCardValue("nacionalidade_fin"),
      "APOSENTADOOUPENSIONISTA": hAPI.getCardValue("aposen_pensionista_fin"),
  };



  log.info("VALORES --> ")
  log.dir(valores)

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
          var id = dtsIntegracao.getValue(0, "Mensagem");
          id = id.split(";")[1]
          hAPI.setCardValue("hidden_codigo_cli_for", id);
          return true
      } else {
          throw dtsIntegracao.getValue(0, "Mensagem")
      }
  } else {
      throw "Não retornou resultado da integração"
  }
}

function capta_Cpf_Cnpj(tipo_pessoa) {
  if (tipo_pessoa == "F") {
    return hAPI.getCardValue("CPF_fin");
  }
  if (tipo_pessoa == "J") {
    return hAPI.getCardValue("CNPJ_fin");
  }
}
