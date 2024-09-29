function afterTaskSave(colleagueId, nextSequenceId, userList) {
  /* PROVISIONAMENTO */
  if (nextSequenceId == 7) {
    dadosRateio();
  }
  /* DADOS DO FORNECEDOR */
  else if (nextSequenceId == 274) {
    dadosDoFornecedor();
  }

  else if (getValue("WKNumState") == 274 && nextSequenceId == 14) {
    hAPI.setCardValue('vincular_fornecedor_analise', '');
    hAPI.setCardValue('dados_pagamento_analise', '');
    hAPI.setCardValue('nome_cli_fornecedor_analise', '');
    hAPI.setCardValue('CpfCnpj_analise', '');
    hAPI.setCardValue('cod_boleto_analise', '');
  }

  else if (nextSequenceId == 128 || nextSequenceId == 127) {
    var table_pagamento_unico_idx = hAPI.getChildrenIndexes("table_pagamento_unico");
    if (table_pagamento_unico_idx.length == 0) {
      var vencimentoPU = new java.util.HashMap();
      vencimentoPU.put("data_vencimento_pu", hAPI.getCardValue('data_vencimento_analise'));
      hAPI.addCardChild("table_pagamento_unico", vencimentoPU);
    }
  }
}

function dadosDoFornecedor() {
  dadosCadastroFornecedor();
  dadosCadastroBancario();
  dadosRateio();
}

function dadosCadastroFornecedor() {
  /* CADASTRO DE FORNECEDOR */
  hAPI.setCardValue("cliente_global_fin", hAPI.getCardValue("cliente_global"));
  hAPI.setCardValue("data_nascimento_fin", hAPI.getCardValue("data_nascimento"));
  hAPI.setCardValue("estado_civil_fin", hAPI.getCardValue("estado_civil"));
  hAPI.setCardValue("nome_fin", hAPI.getCardValue("nome"));
  hAPI.setCardValue("nome_cli_fornecedor_analise", hAPI.getCardValue("nome"));
  hAPI.setCardValue("nome_social_fin", hAPI.getCardValue("nome_social"));
  hAPI.setCardValue("classificacao_fin", hAPI.getCardValue("classificacao"));
  hAPI.setCardValue("categoria_fin", hAPI.getCardValue("categoria"));
  hAPI.setCardValue("CPF_fin", hAPI.getCardValue("CPF"));
  hAPI.setCardValue("CNPJ_fin", hAPI.getCardValue("CNPJ"));
  hAPI.setCardValue("CpfCnpj_analise", capta_Cpf_Cnpj(hAPI.getCardValue("categoria_fin")));
  hAPI.setCardValue("inscricao_estadual_fin", hAPI.getCardValue("inscricao_estadual"));
  hAPI.setCardValue("inscricao_municipal_fin", hAPI.getCardValue("inscricao_municipal"));
  hAPI.setCardValue("nome_cliente_forn_fin", hAPI.getCardValue("nome_cliente_forn"));
  hAPI.setCardValue("status_tipo_cliente_fin", hAPI.getCardValue("status_tipo_cliente"));

  /* IDENTIDADE */
  hAPI.setCardValue("identidade_fin", hAPI.getCardValue("identidade"));
  hAPI.setCardValue("orgao_emissor_fin", hAPI.getCardValue("orgao_emissor"));
  hAPI.setCardValue("estado_emissor_fin", hAPI.getCardValue("estado_emissor"));
  hAPI.setCardValue("numero_dependentes_fin", hAPI.getCardValue("numero_dependentes"));
  hAPI.setCardValue("aposen_pensionista_fin", hAPI.getCardValue("aposen_pensionista"));
  hAPI.setCardValue("nacionalidade_fin", hAPI.getCardValue("nacionalidade"));
  hAPI.setCardValue("CEP_fin", hAPI.getCardValue("CEP"));
  hAPI.setCardValue("tipo_rua_fin", hAPI.getCardValue("tipo_rua"));
  hAPI.setCardValue("rua_fin", hAPI.getCardValue("rua"));
  hAPI.setCardValue("numero_fin", hAPI.getCardValue("numero"));
  hAPI.setCardValue("complemento_fin", hAPI.getCardValue("complemento"));
  hAPI.setCardValue("tipo_bairro_fin", hAPI.getCardValue("tipo_bairro"));
  hAPI.setCardValue("bairro_fin", hAPI.getCardValue("bairro"));
  hAPI.setCardValue("id_pais_fin", hAPI.getCardValue("id_pais"));
  hAPI.setCardValue("pais_fin", hAPI.getCardValue("pais"));
  hAPI.setCardValue("sigla_estado_fin", hAPI.getCardValue("sigla_estado"));
  hAPI.setCardValue("nome_estado_fin", hAPI.getCardValue("nome_estado"));
  hAPI.setCardValue("codigo_municipio_fin", hAPI.getCardValue("codigo_municipio"));
  hAPI.setCardValue("nome_municipio_fin", hAPI.getCardValue("nome_municipio"));
  hAPI.setCardValue("caixa_postal_fin", hAPI.getCardValue("caixa_postal"));
  hAPI.setCardValue("cep_caixa_postal_fin", hAPI.getCardValue("cep_caixa_postal"));
  hAPI.setCardValue("telefone_fin", hAPI.getCardValue("telefone"));
  hAPI.setCardValue("celular_fin", hAPI.getCardValue("celular"));
  hAPI.setCardValue("telefone_comercial", hAPI.getCardValue("telefone_comercial"));
  hAPI.setCardValue("fax_fin", hAPI.getCardValue("fax"));
  hAPI.setCardValue("fax_dedicado_fin", hAPI.getCardValue("fax_dedicado"));
  hAPI.setCardValue("email_fin", hAPI.getCardValue("email"));
  hAPI.setCardValue("contato_fin", hAPI.getCardValue("contato"));
  hAPI.setCardValue('vincular_fornecedor_analise', hAPI.getCardValue('vincular_fornecedor'));

}

function dadosCadastroBancario() {
  /* Campos comuns */
  hAPI.setCardValue("cad_referencia_fin", hAPI.getCardValue("cad_referencia"));
  hAPI.setCardValue("cod_boleto_analise", hAPI.getCardValue("cod_boleto"));
  hAPI.setCardValue("referencia_analise", hAPI.getCardValue("cad_referencia"));
  hAPI.setCardValue("descricao_fin", hAPI.getCardValue("descricao"));
  hAPI.setCardValue("nome_filial_d_banc_fin", hAPI.getCardValue("nome_filial_d_banc"));
  hAPI.setCardValue("forma_pagamento_fin", hAPI.getCardValue("forma_pagamento"));
  hAPI.setCardValue("banco_fin", hAPI.getCardValue("banco"));
  hAPI.setCardValue("agencia_fin", hAPI.getCardValue("agencia"));
  hAPI.setCardValue("digito_fin", hAPI.getCardValue("digito"));
  hAPI.setCardValue("nome_agencia_fin", hAPI.getCardValue("nome_agencia"));
  hAPI.setCardValue("conta_corrente_fin", hAPI.getCardValue("conta_corrente"));
  hAPI.setCardValue("digito_conta_corrente_fin", hAPI.getCardValue("digito_conta_corrente"));
  hAPI.setCardValue("tipo_conta_fin", hAPI.getCardValue("tipo_conta"));
  hAPI.setCardValue("camara_comp_fin", hAPI.getCardValue("camara_comp"));
  hAPI.setCardValue("favorecido_fin", hAPI.getCardValue("favorecido"));
  hAPI.setCardValue("CpfCnpj_favorecido_fin", hAPI.getCardValue("CpfCnpj_favorecido"));
  hAPI.setCardValue("tipo_chave_pix_fin", hAPI.getCardValue("tipo_chave_pix"));
  hAPI.setCardValue("chave_CPF_fin", hAPI.getCardValue("chave_CPF"));
  hAPI.setCardValue("chave_CNPJ_fin", hAPI.getCardValue("chave_CNPJ"));
  hAPI.setCardValue("chave_email_fin", hAPI.getCardValue("chave_email"));
  hAPI.setCardValue("chave_celular_fin", hAPI.getCardValue("chave_celular"));
  hAPI.setCardValue("chave_aleatoria_fin", hAPI.getCardValue("chave_aleatoria"));

  /* Condicionais */
  if (hAPI.getCardValue("fornecedor_cadastrado") == "Não") {
    hAPI.setCardValue("dados_bancarios_fin", hAPI.getCardValue("dados_bancarios_ativo"));
  } else {
    hAPI.setCardValue("dados_pagamento_analise", hAPI.getCardValue("dados_pagamento"));
  }
}

function dadosRateio() {
  try {

    var indexes = hAPI.getChildrenIndexes("table_rateio_ccusto_fin");
    for (var i = indexes.length - 1; i >= 0; i--) {
      hAPI.removeCardChild("table_rateio_ccusto_fin", indexes[i]);
    }

    var valorTotal = hAPI.getCardValue("valor_total_rateio");
    hAPI.setCardValue("valor_total_rateio_fin", valorTotal);
    var camposProcessoPrincipal = hAPI.getCardData(getValue("WKNumProces"))
    var keys = camposProcessoPrincipal.keySet().toArray();
    for (var key in keys) {
      var field = keys[key];
      if (field.indexOf("coluna_natureza___") >= 0) {
        var novoItem = new java.util.HashMap();
        var idPF = field.replace("coluna_natureza___", "");
        novoItem.put("coluna_natureza_fin", camposProcessoPrincipal.get(String("coluna_natureza" + "___" + idPF)));
        novoItem.put("coluna_ccusto_fin", camposProcessoPrincipal.get(String("coluna_ccusto" + "___" + idPF)));
        novoItem.put("coluna_valor_fin", camposProcessoPrincipal.get(String("coluna_valor" + "___" + idPF)));
        novoItem.put("coluna_percentual_fin", camposProcessoPrincipal.get(String("coluna_percentual" + "___" + idPF)));
        hAPI.addCardChild("table_rateio_ccusto_fin", novoItem);
      }
    }
  } catch (error) {
    throw error;
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