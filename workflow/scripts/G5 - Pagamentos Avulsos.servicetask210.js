function servicetask210(attempt, message) {

  var valores = {
      // "CODEXTERNO": hAPI.getCardValue("idDoCampo"),
      "CODCOLIGADA": hAPI.getCardValue("hidden_coligada_cli_for"),
      "NOMEFANTASIA": hAPI.getCardValue("nome_social_fin"),
      "NOME": hAPI.getCardValue("nome_fin"),
      "CGCCFO": capta_Cpf_Cnpj(hAPI.getCardValue("categoria_fin")),
      "PAGREC": hAPI.getCardValue("pagar_receber"),
      "RUA": hAPI.getCardValue("rua_fin"),
      "NUMERO": hAPI.getCardValue("numero_fin"),
      "BAIRRO": hAPI.getCardValue("bairro_fin"),
      // "CIDADE": hAPI.getCardValue("idDoCampo"),
      "CODETD": hAPI.getCardValue("sigla_estado_fin"),
      "CEP": hAPI.getCardValue("cep_fin"),
      "TELEFONE": hAPI.getCardValue("hidden_telefone"),
      "EMAIL": hAPI.getCardValue("email_fin"),
      "CONTATO": hAPI.getCardValue("contato_fin"),
      "ATIVO": hAPI.getCardValue("status_tipo_cliente_fin"),
      // "LIMITECREDITO": hAPI.getCardValue("idDoCampo"),
      // "DATAULTALTERACAO": hAPI.getCardValue("idDoCampo"),
      // "DATACRIACAO": hAPI.getCardValue("idDoCampo"),
      // "DATAULTMOVIMENTO": hAPI.getCardValue("idDoCampo"),
      // "VALOROP1": hAPI.getCardValue("idDoCampo"),
      // "VALOROP2": hAPI.getCardValue("idDoCampo"),
      // "VALOROP3": hAPI.getCardValue("idDoCampo"),
      // "PATRIMONIO": hAPI.getCardValue("idDoCampo"),
      // "NUMFUNCIONARIOS": hAPI.getCardValue("idDoCampo"),
      "CODMUNICIPIO": hAPI.getCardValue("codigo_municipio_fin"),
      "PESSOAFISOUJUR": hAPI.getCardValue("categoria_fin"),
      "PAIS": hAPI.getCardValue("pais_fin"),
      // "CONTRIBUINTE": hAPI.getCardValue("idDoCampo"),
      // "CFOIMOB": hAPI.getCardValue("idDoCampo"),
      // "VALFRETE": hAPI.getCardValue("idDoCampo"),
      // "TPTOMADOR": hAPI.getCardValue("idDoCampo"),
      // "CONTRIBUINTEISS": hAPI.getCardValue("idDoCampo"),
      "NUMDEPENDENTES": hAPI.getCardValue("numero_dependentes_fin"),
      // "USUARIOALTERACAO": hAPI.getCardValue("idDoCampo"),
      // "ORGAOPUBLICO": hAPI.getCardValue("idDoCampo"),
      "CAIXAPOSTAL": hAPI.getCardValue("caixa_postal_fin"),
      // "CATEGORIAAUTONOMO": hAPI.getCardValue("idDoCampo"),
      // "IDCFO": hAPI.getCardValue("idDoCampo"),
      // "VROUTRASDEDUCOESIRRF": hAPI.getCardValue("idDoCampo"),
      // "RAMOATIV": hAPI.getCardValue("idDoCampo"),
      // "OPTANTEPELOSIMPLES": hAPI.getCardValue("idDoCampo"),
      "TIPORUA": hAPI.getCardValue("tipo_rua_fin"),
      "TIPOBAIRRO": hAPI.getCardValue("tipo_bairro_fin"),
      // "REGIMEISS": hAPI.getCardValue("idDoCampo"),
      // "RETENCAOISS": hAPI.getCardValue("idDoCampo"),
      "USUARIOCRIACAO": "suporte.totvs",
      // "PORTE": hAPI.getCardValue("idDoCampo"),
      // "TIPOOPCOMBUSTIVEL": hAPI.getCardValue("idDoCampo"),
      "IDPAIS": hAPI.getCardValue("id_pais_fin"),
      "NACIONALIDADE": hAPI.getCardValue("nacionalidade_fin"),
      // "CALCULAAVP": hAPI.getCardValue("idDoCampo"),
      // "CODUSUARIOACESSO": hAPI.getCardValue("idDoCampo"),
      // "RECCREATEDBY": hAPI.getCardValue("idDoCampo"),
      // "RECCREATEDON": hAPI.getCardValue("idDoCampo"),
      // "RECMODIFIEDBY": hAPI.getCardValue("idDoCampo"),
      // "RECMODIFIEDON": hAPI.getCardValue("idDoCampo"),
      // "TIPORENDIMENTO": hAPI.getCardValue("idDoCampo"),
      // "FORMATRIBUTACAO": hAPI.getCardValue("idDoCampo"),
      // "SITUACAONIF": hAPI.getCardValue("idDoCampo"),
      // "ISTOTVSMESSAGE": hAPI.getCardValue("idDoCampo"),
      // "INOVAR_AUTO": hAPI.getCardValue("idDoCampo"),
      // "APLICFORMULA": hAPI.getCardValue("idDoCampo"),
      // "CODCFOCOLINTEGRACAO": hAPI.getCardValue("idDoCampo"),
      // "DIGVERIFICDEBAUTOMATICO": hAPI.getCardValue("idDoCampo"),
      // "ENTIDADEEXECUTORAPAA": hAPI.getCardValue("idDoCampo"),
      "APOSENTADOOUPENSIONISTA": hAPI.getCardValue("aposen_pensionista_fin"),
      // "SOCIOCOOPERADO": hAPI.getCardValue("idDoCampo"),
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
