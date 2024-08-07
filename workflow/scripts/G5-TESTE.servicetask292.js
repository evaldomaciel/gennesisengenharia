function servicetask292(attempt, message) {
  var valores = {
    "CODCOLIGADA": hAPI.getCardValue("coligada"),
    "CODCFO": hAPI.getCardValue("hidden_codigo_cli_for"),
    "CODCOLCFO": hAPI.getCardValue("hidden_coligada_cli_for"),
    "IDPGTO": hAPI.getCardValue("cad_referencia_fin"),
    "CGCCFO": capta_Cpf_Cnpj(hAPI.getCardValue("categoria_fin")),
    "DESCRICAO": hAPI.getCardValue("hidden_desc_fpgmto"),
    "FORMAPAGAMENTO": hAPI.getCardValue("hidden_forma_pgmto"),
    "FAVORECIDO": hAPI.getCardValue("favorecido_fin"),
    "CGCFAVORECIDO": hAPI.getCardValue("CpfCnpj_favorecido_fin"),
    "ATIVO": hAPI.getCardValue("status_tipo_cliente_fin"),
    "CHAVE": captaChavePix(hAPI.getCardValue("tipo_chave_pix_fin")),
    "TIPOPIX": hAPI.getCardValue("tipo_chave_pix_fin"),
    "NUMEROBANCO": hAPI.getCardValue("NUMEROBANCO"),
    "CODIGOAGENCIA": hAPI.getCardValue("agencia"),
    "DIGITOAGENCIA": hAPI.getCardValue("digito"),
    "CONTACORRENTE": hAPI.getCardValue("conta_corrente") ,
    "DIGITOCONTA": hAPI.getCardValue("digito_conta_corrente"),
    "TIPOCONTA": hAPI.getCardValue("TIPOCONTA") == "conta_corrente" ? "1" : "2"
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

  var dtsIntegracao = DatasetFactory.getDataset("ds_cadastraDadosFinRM", null, cst, null)

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


function capta_Cpf_Cnpj(tipo_pessoa) {
  if (tipo_pessoa == "F") {
    return hAPI.getCardValue("CPF_fin");
  }
  if (tipo_pessoa == "J") {
    return hAPI.getCardValue("CNPJ_fin");
  }
}

function captaChavePix(tipo_chave) {
  if (hAPI.getCardValue("hidden_forma_pgmto") == "S" || hAPI.getCardValue("hidden_forma_pgmto") == "Q") {
    if (tipo_chave == "1") {
      return hAPI.getCardValue("chave_celular_fin");
    }
    if (tipo_chave == "2") {
      return hAPI.getCardValue("chave_email_fin");
    }
    if (tipo_chave == "3") {
      return hAPI.getCardValue("chave_CPF_fin");
    }
    if (tipo_chave == "4") {
      return hAPI.getCardValue("chave_CNPJ_fin");
    }
    if (tipo_chave == "5") {
      return hAPI.getCardValue("chave_aleatoria_fin");
    }
  } else {
    return "";
  }
}
