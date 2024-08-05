function validateForm(form) {
    var activity = getValue("WKNumState");
    var proxima = getValue("WKNextState");
    var msg = "";

    var table_pagamento_parcial = form.getChildrenIndexes("table_pagamento_parcial");


    /* ETAPA 000 | 004 - INICIO */
    if (activity == 4 || activity == 0) {
        if (form.getValue("empresa") == "" || form.getValue("empresa") == null) {
            msg += '<br><b>O campo <font color="red">Empresa</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("filial") == "" || form.getValue("filial") == null) {
            msg += '<br><b>O campo <font color="red">Filial</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("coligada") == "" || form.getValue("coligada") == null) {
            msg += '<br><b>O campo <font color="red">Coligada</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("centro_de_custo") == "" || form.getValue("centro_de_custo") == null) {
            msg += '<br><b>O campo <font color="red">Centro de Custos</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("setor_solicitante") == "" || form.getValue("setor_solicitante") == null) {
            msg += '<br><b>O campo <font color="red">Setor Solicitante</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("urgencia_solicitacao") == "" || form.getValue("urgencia_solicitacao") == null) {
            msg += '<br><b>O campo <font color="red">Urgência da Solicita\u00e7\u00e3o</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("titulo_solicitacao") == "" || form.getValue("titulo_solicitacao") == null) {
            msg += '<br><b>O campo <font color="red">Título da Solicita\u00e7\u00e3o</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("descricao_solicitacao") == "" || form.getValue("descricao_solicitacao") == null) {
            msg += '<br><b>O campo <font color="red">Descrição da Solicita\u00e7\u00e3o</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("data_vencimento") == "" || form.getValue("data_vencimento") == null) {
            msg += '<br><b>O campo <font color="red">Data de Vencimento</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("responsavel_solicitacao") == "" || form.getValue("responsavel_solicitacao") == null) {
            msg += '<br><b>O campo <font color="red">Responsável pela Solicita\u00e7\u00e3o</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("email_solicitante") == "" || form.getValue("email_solicitante") == null) {
            msg += '<br><b>O campo <font color="red">E-mail do Solicitante</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("copia_email_solicitante") == "" || form.getValue("copia_email_solicitante") == null) {
            msg += '<br><b>O campo <font color="red">Cópia do E-mail do Solicitante</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("teve_juros") == "" || form.getValue("teve_juros") == null) {
            msg += '<br><b>O campo <font color="red">Houve juros no pagamento?</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("teve_juros") == "Sim") {
            if (form.getValue("valor_original") == "" || form.getValue("valor_original") == null) {
                msg += '<br><b>O campo <font color="red">Valor Original</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("valor_juros") == "" || form.getValue("valor_juros") == null) {
                msg += '<br><b>O campo <font color="red">Valor do juros</font> \u00E9 obrigat\u00F3rio!</b>';
            }
        }
        if (form.getValue("Valor") == "" || form.getValue("Valor") == null) {
            msg += '<br><b>O campo <font color="red">Valor total a ser pago</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("fornecedor_cadastrado") == "" || form.getValue("fornecedor_cadastrado") == null) {
            msg += '<br><b>O campo <font color="red">Fornecedor Cadastrado</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("fornecedor_cadastrado") == "Sim") {
            if (form.getValue("vincular_fornecedor") == "" || form.getValue("vincular_fornecedor") == null) {
                msg += '<br><b>O campo <font color="red">Vincular Fornecedor</font> \u00E9 obrigat\u00F3rio!</b>';
            }
        }
        /* VALIDAÇÃO CADASTRO DE FORNECEDOR */
        if (form.getValue("fornecedor_cadastrado") == "Não") {
            if (form.getValue("nome_social") == "" || form.getValue("nome_social") == null) {
                msg += '<br><b>O campo <font color="red">Nome Fantasia/Social</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("nome") == "" || form.getValue("nome") == null) {
                msg += '<br><b>O campo <font color="red">Nome</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("classificacao") == "" || form.getValue("classificacao") == null) {
                msg += '<br><b>O campo <font color="red">Classifica\u00e7\u00e3o</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("categoria") == "" || form.getValue("categoria") == null) {
                msg += '<br><b>O campo <font color="red">Categoria</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("categoria") == "F") {
                if (form.getValue("CPF") == "" || form.getValue("CPF") == null) {
                    msg += '<br><b>O campo <font color="red">CPF</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                /*
                if (form.getValue("nacionalidade") == "" || form.getValue("nacionalidade") == null) {
                    msg += '<br><b>O campo <font color="red">Nacionalidade</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                */
            }
            if (form.getValue("categoria") == "J") {
                if (form.getValue("CNPJ") == "" || form.getValue("CNPJ") == null) {
                    msg += '<br><b>O campo <font color="red">CNPJ</font> \u00E9 obrigat\u00F3rio!</b>';
                }
            }
            /*
            if (form.getValue("aposen_pensionista") == "" || form.getValue("aposen_pensionista") == null) {
                msg += '<br><b>O campo <font color="red">Aposentado/Pensionista</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("numero_dependentes") == "" || form.getValue("numero_dependentes") == null) {
                msg += '<br><b>O campo <font color="red">Número de Dependentes</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            */
            if (form.getValue("CEP") == "" || form.getValue("CEP") == null) {
                msg += '<br><b>O campo <font color="red">CEP</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("status_tipo_cliente") == "" || form.getValue("status_tipo_cliente") == null) {
                msg += '<br><b>O campo <font color="red">Status do Cliente (Ativo ou Bloqueado)</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("tipo_rua") == "" || form.getValue("tipo_rua") == null) {
                msg += '<br><b>O campo <font color="red">Tipo Rua</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("rua") == "" || form.getValue("rua") == null) {
                msg += '<br><b>O campo <font color="red">Rua</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("numero") == "" || form.getValue("numero") == null) {
                msg += '<br><b>O campo <font color="red">Numero</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("tipo_bairro") == "" || form.getValue("tipo_bairro") == null) {
                msg += '<br><b>O campo <font color="red">Bairro</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("bairro") == "" || form.getValue("bairro") == null) {
                msg += '<br><b>O campo <font color="red">Bairro</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("id_pais") == "" || form.getValue("id_pais") == null) {
                msg += '<br><b>O campo <font color="red">ID do País</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("pais") == "" || form.getValue("pais") == null) {
                msg += '<br><b>O campo <font color="red">País</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            /*
            if (form.getValue("codigo_municipio") == "" || form.getValue("codigo_municipio") == null) {
              msg += '<br><b>O campo <font color="red">Código do Municipio</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            */
            if (form.getValue("telefone") == "" || form.getValue("telefone") == null) {
                msg += '<br><b>O campo <font color="red">Telefone</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("email") == "" || form.getValue("email") == null) {
                msg += '<br><b>O campo <font color="red">E-mail</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("contato") == "" || form.getValue("contato") == null) {
                msg += '<br><b>O campo <font color="red">Contato</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            /*
            if (form.getValue("classificacao_default") == "" || form.getValue("classificacao_default") == null) {
                msg += '<br><b>O campo <font color="red">Classificação Default</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("nome_cli_fornecedor_default") == "" || form.getValue("nome_cli_fornecedor_default") == null) {
                msg += '<br><b>O campo <font color="red">Nome do Cliente/Fornecedor Default</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("filial_default") == "" || form.getValue("filial_default") == null) {
                msg += '<br><b>O campo <font color="red">Filial Default</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("nome_filial_default") == "" || form.getValue("nome_filial_default") == null) {
                msg += '<br><b>O campo <font color="red">Nome Filial Default</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("dados_banc_default") == "" || form.getValue("dados_banc_default") == null) {
                msg += '<br><b>O campo <font color="red">Dados Bancários Default</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("nome_dados_banc_default") == "" || form.getValue("nome_dados_banc_default") == null) {
                msg += '<br><b>O campo <font color="red">Nome Dados Bancários Default</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            */
        }
        /* VALIDAÇÃO DO ANEXO */
        var anexoSolicitacao = form.getChildrenIndexes("table_anexo_solicitacao");
        if (anexoSolicitacao.length == 0) {
            msg += '<br><b>A tabela <font color="red">Anexo</font> necessita de pelo menos uma entrada!</b>';
        }

        /* VALIDAÇÃO DA TABELA RATEIO POR CENTRO DE CUSTO */
        var rateioCentroDeCustos = form.getChildrenIndexes("table_rateio_ccusto");
        if (rateioCentroDeCustos.length == 0) {
            msg += '<br><b>A tabela <font color="red">Rateio por centro de custo </font> necessita de pelo menos uma entrada!</b>';
        }
        for (var i = 0; i < rateioCentroDeCustos.length; i++) {
            if (form.getValue("coluna_natureza___" + rateioCentroDeCustos[i]) == "" || form.getValue("coluna_natureza___" + rateioCentroDeCustos[i]) == null) {
                msg += '<br><b>O campo <font color="red">Natureza Orçamentária Financeira ' + (i + 1) + '</font> \u00E9  obrigat\u00F3rio!</b>';
            }
            if (form.getValue("coluna_ccusto___" + rateioCentroDeCustos[i]) == "" || form.getValue("coluna_ccusto___" + rateioCentroDeCustos[i]) == null) {
                msg += '<br><b>O campo <font color="red">Centro de Custo ' + (i + 1) + '</font> \u00E9  obrigat\u00F3rio!</b>';
            }
            if (form.getValue("coluna_valor___" + rateioCentroDeCustos[i]) == "" || form.getValue("coluna_valor___" + rateioCentroDeCustos[i]) == null) {
                msg += '<br><b>O campo <font color="red">Valor ' + (i + 1) + '</font> \u00E9  obrigat\u00F3rio!</b>';
            }
            if (form.getValue("coluna_percentual___" + rateioCentroDeCustos[i]) == "" || form.getValue("coluna_percentual___" + rateioCentroDeCustos[i]) == null) {
                msg += '<br><b>O campo <font color="red">Percentual ' + (i + 1) + '</font> \u00E9  obrigat\u00F3rio!</b>';
            }
        }
        if (form.getValue("valor_total_rateio") > form.getValue("Valor")) {
            msg += '<br><b>O <font color="red"> Valor total </font> do rateio supera o valor total a ser pago!</b>';
        }
        if (form.getValue("valor_total_rateio") < form.getValue("Valor")) {
            msg += '<br><b>O <font color="red"> Valor total </font> do rateio é inferior ao valor total a ser pago!</b>';
        }
        /* ETAPA 014 - PROVISIONAMENTO */
    } else if (activity == 14) {
        if (form.getValue("dados_conformidade") == "" || form.getValue("dados_conformidade") == null) {
            msg += '<br><b>O campo <font color="red">Dados Solicitados em Conformidade?</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("dados_conformidade") == "Nao" || form.getValue("dados_conformidade") == "Cancelar") {
            if (form.getValue("mensagem_solicitacao_ajustes") == "" || form.getValue("mensagem_solicitacao_ajustes") == null) {
                msg += '<br><b>O campo <font color="red">Motivo da Solicitação de Ajustes</font> \u00E9 obrigat\u00F3rio!</b>';
            }
        }
        if (form.getValue("dados_conformidade") == "Sim") {
            if (form.getValue("referencia_analise") == "" || form.getValue("referencia_analise") == null) {
                msg += '<br><b>O campo <font color="red">Ref</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("pagar_receber") == "" || form.getValue("pagar_receber") == null) {
                msg += '<br><b>O campo <font color="red">Pagar ou Receber</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("filial_analise") == "" || form.getValue("filial_analise") == null) {
                msg += '<br><b>O campo <font color="red">Filial</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("nome_filial_analise") == "" || form.getValue("nome_filial_analise") == null) {
                msg += '<br><b>O campo <font color="red">Nome da Filial</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("nome_cli_fornecedor_analise") == "" || form.getValue("nome_cli_fornecedor_analise") == null) {
                msg += '<br><b>O campo <font color="red">Nome do Cliente/Fornecedor</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("CpfCnpj_analise") == "" || form.getValue("CpfCnpj_analise") == null) {
                msg += '<br><b>O campo <font color="red">CPF/CNPJ</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("tipo_documento_analise") == "" || form.getValue("tipo_documento_analise") == null) {
                msg += '<br><b>O campo <font color="red">Tipo de documento</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("nome_tipo_documento") == "" || form.getValue("nome_tipo_documento") == null) {
                msg += '<br><b>O campo <font color="red">Nome tipo de documento</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("numero_documento_analise") == "" || form.getValue("numero_documento_analise") == null) {
                msg += '<br><b>O campo <font color="red">Núm. Documento</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("data_emissao_analise") == "" || form.getValue("data_emissao_analise") == null) {
                msg += '<br><b>O campo <font color="red">Data de Emissão</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("data_vencimento_analise") == "" || form.getValue("data_vencimento_analise") == null) {
                msg += '<br><b>O campo <font color="red">Data de Vencimento</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            /* if (form.getValue("data_baixa_analise") == "" || form.getValue("data_baixa_analise") == null) {
                msg += '<br><b>O campo <font color="red">Data de Baixa</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            */
            if (form.getValue("data_previa_baixa_analise") == "" || form.getValue("data_previa_baixa_analise") == null) {
                msg += '<br><b>O campo <font color="red">Data Prev. Baixa</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("historico_analise") == "" || form.getValue("historico_analise") == null) {
                msg += '<br><b>O campo <font color="red">Histórico</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("serie_documento_analise") == "" || form.getValue("serie_documento_analise") == null) {
                msg += '<br><b>O campo <font color="red">Série do Documento</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("valor_original_analise") == "" || form.getValue("valor_original_analise") == null) {
                msg += '<br><b>O campo <font color="red">Valor Original</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("tipo_moeda") == "" || form.getValue("tipo_moeda") == null) {
                msg += '<br><b>O campo <font color="red">Moeda</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            /*
            if (form.getValue("valor_baixado_analise") == "" || form.getValue("valor_baixado_analise") == null) {
                msg += '<br><b>O campo <font color="red">Valor Baixado</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            */
            if (form.getValue("desconto_analise") == "" || form.getValue("desconto_analise") == null) {
                msg += '<br><b>O campo <font color="red">Desconto</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("percentual_desc_analise") == "" || form.getValue("percentual_desc_analise") == null) {
                msg += '<br><b>O campo <font color="red">% Desconto</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("juros_analise") == "" || form.getValue("juros_analise") == null) {
                msg += '<br><b>O campo <font color="red">Juros</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("percentual_juros_analise") == "" || form.getValue("percentual_juros_analise") == null) {
                msg += '<br><b>O campo <font color="red">% Juros</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("juros_dia_analise") == "" || form.getValue("juros_dia_analise") == null) {
                msg += '<br><b>O campo <font color="red">Juros ao Dia</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("data_valor_liquido") == "" || form.getValue("data_valor_liquido") == null) {
                msg += '<br><b>O campo <font color="red">Data Valor Líquido</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("carencia_juros_analise") == "" || form.getValue("carencia_juros_analise") == null) {
                msg += '<br><b>O campo <font color="red">Carência Juros</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("multa_analise") == "" || form.getValue("multa_analise") == null) {
                msg += '<br><b>O campo <font color="red">Multa</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("percentual_multa_analise") == "" || form.getValue("percentual_multa_analise") == null) {
                msg += '<br><b>O campo <font color="red">% Multa</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("multa_dia_analise") == "" || form.getValue("multa_dia_analise") == null) {
                msg += '<br><b>O campo <font color="red">Multa ao dia (%)</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("capitalizacao_analise") == "" || form.getValue("capitalizacao_analise") == null) {
                msg += '<br><b>O campo <font color="red">Capitalização</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("percentual_cap_analise") == "" || form.getValue("percentual_cap_analise") == null) {
                msg += '<br><b>O campo <font color="red">% Capitalização</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("cap_mensal_analise") == "" || form.getValue("cap_mensal_analise") == null) {
                msg += '<br><b>O campo <font color="red">Cap. Mensal (%)</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            /*
            if (form.getValue("ccusto_analise") == "" || form.getValue("ccusto_analise") == null) {
                msg += '<br><b>O campo <font color="red">Centro de Custo</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("nome_ccusto_analise") == "" || form.getValue("nome_ccusto_analise") == null) {
                msg += '<br><b>O campo <font color="red">Nome do Centro de Custo</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            */
            if (form.getValue("fornecedor_cadastrado") == "" || form.getValue("fornecedor_cadastrado") == null) {
                msg += '<br><b>O campo <font color="red">Fornecedor Cadastrado?</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("fornecedor_cadastrado") == "Sim") {
                if (form.getValue("vincular_fornecedor_analise") == "" || form.getValue("vincular_fornecedor_analise") == null) {
                    msg += '<br><b>O campo <font color="red">Vincular Fornecedor</font> \u00E9 obrigat\u00F3rio!</b>';
                }
            }
            /* VALIDAÇÃO CADASTRO DE FORNECEDOR */
            if (form.getValue("fornecedor_cadastrado") == "Não") {
                if (form.getValue("nome_social") == "" || form.getValue("nome_social") == null) {
                    msg += '<br><b>O campo <font color="red">Nome Fantasia/Social</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("nome") == "" || form.getValue("nome") == null) {
                    msg += '<br><b>O campo <font color="red">Nome</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("classificacao") == "" || form.getValue("classificacao") == null) {
                    msg += '<br><b>O campo <font color="red">Classifica\u00e7\u00e3o</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("categoria") == "" || form.getValue("categoria") == null) {
                    msg += '<br><b>O campo <font color="red">Categoria</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("categoria") == "F") {
                    if (form.getValue("CPF") == "" || form.getValue("CPF") == null) {
                        msg += '<br><b>O campo <font color="red">CPF</font> \u00E9 obrigat\u00F3rio!</b>';
                    }
                    /*
                    if (form.getValue("nacionalidade") == "" || form.getValue("nacionalidade") == null) {
                        msg += '<br><b>O campo <font color="red">Nacionalidade</font> \u00E9 obrigat\u00F3rio!</b>';
                    }
                    */
                }
                if (form.getValue("categoria") == "J") {
                    if (form.getValue("CNPJ") == "" || form.getValue("CNPJ") == null) {
                        msg += '<br><b>O campo <font color="red">CNPJ</font> \u00E9 obrigat\u00F3rio!</b>';
                    }
                }
                /*
                if (form.getValue("aposen_pensionista") == "" || form.getValue("aposen_pensionista") == null) {
                    msg += '<br><b>O campo <font color="red">Aposentado/Pensionista</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("numero_dependentes") == "" || form.getValue("numero_dependentes") == null) {
                    msg += '<br><b>O campo <font color="red">Número de Dependentes</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                */
                if (form.getValue("CEP") == "" || form.getValue("CEP") == null) {
                    msg += '<br><b>O campo <font color="red">CEP</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("status_tipo_cliente") == "" || form.getValue("status_tipo_cliente") == null) {
                    msg += '<br><b>O campo <font color="red">Status do Cliente (Ativo ou Bloqueado)</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("tipo_rua") == "" || form.getValue("tipo_rua") == null) {
                    msg += '<br><b>O campo <font color="red">Tipo Rua</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("rua") == "" || form.getValue("rua") == null) {
                    msg += '<br><b>O campo <font color="red">Rua</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("numero") == "" || form.getValue("numero") == null) {
                    msg += '<br><b>O campo <font color="red">Numero</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("tipo_bairro") == "" || form.getValue("tipo_bairro") == null) {
                    msg += '<br><b>O campo <font color="red">Tipo de Bairro</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("bairro") == "" || form.getValue("bairro") == null) {
                    msg += '<br><b>O campo <font color="red">Bairro</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("id_pais") == "" || form.getValue("id_pais") == null) {
                    msg += '<br><b>O campo <font color="red">ID do País</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("pais") == "" || form.getValue("pais") == null) {
                    msg += '<br><b>O campo <font color="red">País</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                /*
                if (form.getValue("codigo_municipio") == "" || form.getValue("codigo_municipio") == null) {
                  msg += '<br><b>O campo <font color="red">Código do Municipio</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                */
                if (form.getValue("telefone") == "" || form.getValue("telefone") == null) {
                    msg += '<br><b>O campo <font color="red">Telefone</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("email") == "" || form.getValue("email") == null) {
                    msg += '<br><b>O campo <font color="red">E-mail</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("contato") == "" || form.getValue("contato") == null) {
                    msg += '<br><b>O campo <font color="red">Contato</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                /*
                if (form.getValue("classificacao_default") == "" || form.getValue("classificacao_default") == null) {
                    msg += '<br><b>O campo <font color="red">Classificação Default</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("nome_cli_fornecedor_default") == "" || form.getValue("nome_cli_fornecedor_default") == null) {
                    msg += '<br><b>O campo <font color="red">Nome do Cliente/Fornecedor Default</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("filial_default") == "" || form.getValue("filial_default") == null) {
                    msg += '<br><b>O campo <font color="red">Filial Default</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("nome_filial_default") == "" || form.getValue("nome_filial_default") == null) {
                    msg += '<br><b>O campo <font color="red">Nome Filial Default</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("dados_banc_default") == "" || form.getValue("dados_banc_default") == null) {
                    msg += '<br><b>O campo <font color="red">Dados Bancários Default</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("nome_dados_banc_default") == "" || form.getValue("nome_dados_banc_default") == null) {
                    msg += '<br><b>O campo <font color="red">Nome Dados Bancários Default</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                */
            }
            if (form.getValue("fornecedor_cadastrado") == "Sim") {
                if (form.getValue("vincular_fornecedor_analise") == "" || form.getValue("vincular_fornecedor_analise") == null) {
                    msg += '<br><b>O campo <font color="red">Vincular Fornecedor</font> \u00E9 obrigat\u00F3rio!</b>';
                }
            }
            if (form.getValue("tipo_contabil") == "" || form.getValue("tipo_contabil") == null) {
                msg += '<br><b>O campo <font color="red">Tipo Contábil</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("solicitacao_mult_analise") == "" || form.getValue("solicitacao_mult_analise") == null) {
                msg += '<br><b>O campo <font color="red">Solicita\u00e7\u00e3o M\u00faltipla ou Individual</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            /* 
            if (form.getValue("seleciona_fase_envio") == "" || form.getValue("seleciona_fase_envio") == null) {
                msg += '<br><b>O campo <font color="red">Enviar para etapa</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            */
        }
        /* ETAPA 034 - REVISAR SOLICITAÇÃO */
    } else if (activity == 34) {
        if (form.getValue("empresa") == "" || form.getValue("empresa") == null) {
            msg += '<br><b>O campo <font color="red">Empresa</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("filial") == "" || form.getValue("filial") == null) {
            msg += '<br><b>O campo <font color="red">Filial</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("coligada") == "" || form.getValue("coligada") == null) {
            msg += '<br><b>O campo <font color="red">Coligada</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("centro_de_custo") == "" || form.getValue("centro_de_custo") == null) {
            msg += '<br><b>O campo <font color="red">Centro de Custos</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("setor_solicitante") == "" || form.getValue("setor_solicitante") == null) {
            msg += '<br><b>O campo <font color="red">Setor Solicitante</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("urgencia_solicitacao") == "" || form.getValue("urgencia_solicitacao") == null) {
            msg += '<br><b>O campo <font color="red">Urgência da Solicita\u00e7\u00e3o</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("titulo_solicitacao") == "" || form.getValue("titulo_solicitacao") == null) {
            msg += '<br><b>O campo <font color="red">Título da Solicita\u00e7\u00e3o</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("descricao_solicitacao") == "" || form.getValue("descricao_solicitacao") == null) {
            msg += '<br><b>O campo <font color="red">Descrição da Solicita\u00e7\u00e3o</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("data_vencimento") == "" || form.getValue("data_vencimento") == null) {
            msg += '<br><b>O campo <font color="red">Data de Vencimento</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("responsavel_solicitacao") == "" || form.getValue("responsavel_solicitacao") == null) {
            msg += '<br><b>O campo <font color="red">Responsável pela Solicita\u00e7\u00e3o</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("email_solicitante") == "" || form.getValue("email_solicitante") == null) {
            msg += '<br><b>O campo <font color="red">E-mail do Solicitante</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("copia_email_solicitante") == "" || form.getValue("copia_email_solicitante") == null) {
            msg += '<br><b>O campo <font color="red">Cópia do E-mail do Solicitante</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("teve_juros") == "" || form.getValue("teve_juros") == null) {
            msg += '<br><b>O campo <font color="red">Houve juros no pagamento?</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("teve_juros") == "Sim") {
            if (form.getValue("valor_original") == "" || form.getValue("valor_original") == null) {
                msg += '<br><b>O campo <font color="red">Valor Original</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("valor_juros") == "" || form.getValue("valor_juros") == null) {
                msg += '<br><b>O campo <font color="red">Valor do juros</font> \u00E9 obrigat\u00F3rio!</b>';
            }
        }
        if (form.getValue("Valor") == "" || form.getValue("Valor") == null) {
            msg += '<br><b>O campo <font color="red">Valor total a ser pago</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("fornecedor_cadastrado") == "" || form.getValue("fornecedor_cadastrado") == null) {
            msg += '<br><b>O campo <font color="red">Fornecedor Cadastrado</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("fornecedor_cadastrado") == "Sim") {
            if (form.getValue("vincular_fornecedor") == "" || form.getValue("vincular_fornecedor") == null) {
                msg += '<br><b>O campo <font color="red">Vincular Fornecedor</font> \u00E9 obrigat\u00F3rio!</b>';
            }
        }
        if (form.getValue("fornecedor_cadastrado") == "Não") {
            if (form.getValue("nome_social") == "" || form.getValue("nome_social") == null) {
                msg += '<br><b>O campo <font color="red">Nome Fantasia/Social</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("nome") == "" || form.getValue("nome") == null) {
                msg += '<br><b>O campo <font color="red">Nome</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("classificacao") == "" || form.getValue("classificacao") == null) {
                msg += '<br><b>O campo <font color="red">Classifica\u00e7\u00e3o</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("categoria") == "" || form.getValue("categoria") == null) {
                msg += '<br><b>O campo <font color="red">Categoria</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("categoria") == "F") {
                if (form.getValue("CPF") == "" || form.getValue("CPF") == null) {
                    msg += '<br><b>O campo <font color="red">CPF</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                /*
                if (form.getValue("nacionalidade") == "" || form.getValue("nacionalidade") == null) {
                    msg += '<br><b>O campo <font color="red">Nacionalidade</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                */
            }
            if (form.getValue("categoria") == "J") {
                if (form.getValue("CNPJ") == "" || form.getValue("CNPJ") == null) {
                    msg += '<br><b>O campo <font color="red">CNPJ</font> \u00E9 obrigat\u00F3rio!</b>';
                }
            }
            /*
            if (form.getValue("aposen_pensionista") == "" || form.getValue("aposen_pensionista") == null) {
                msg += '<br><b>O campo <font color="red">Aposentado/Pensionista</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("numero_dependentes") == "" || form.getValue("numero_dependentes") == null) {
                msg += '<br><b>O campo <font color="red">Número de Dependentes</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            */
            if (form.getValue("CEP") == "" || form.getValue("CEP") == null) {
                msg += '<br><b>O campo <font color="red">CEP</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("status_tipo_cliente") == "" || form.getValue("status_tipo_cliente") == null) {
                msg += '<br><b>O campo <font color="red">Status do Cliente (Ativo ou Bloqueado)</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("tipo_rua") == "" || form.getValue("tipo_rua") == null) {
                msg += '<br><b>O campo <font color="red">Tipo Rua</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("rua") == "" || form.getValue("rua") == null) {
                msg += '<br><b>O campo <font color="red">Rua</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("numero") == "" || form.getValue("numero") == null) {
                msg += '<br><b>O campo <font color="red">Numero</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("tipo_bairro") == "" || form.getValue("tipo_bairro") == null) {
                msg += '<br><b>O campo <font color="red">Bairro</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("bairro") == "" || form.getValue("bairro") == null) {
                msg += '<br><b>O campo <font color="red">Bairro</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("id_pais") == "" || form.getValue("id_pais") == null) {
                msg += '<br><b>O campo <font color="red">ID do País</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("pais") == "" || form.getValue("pais") == null) {
                msg += '<br><b>O campo <font color="red">País</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            /*
            if (form.getValue("codigo_municipio") == "" || form.getValue("codigo_municipio") == null) {
              msg += '<br><b>O campo <font color="red">Código do Municipio</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            */
            if (form.getValue("telefone") == "" || form.getValue("telefone") == null) {
                msg += '<br><b>O campo <font color="red">Telefone</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("email") == "" || form.getValue("email") == null) {
                msg += '<br><b>O campo <font color="red">E-mail</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("contato") == "" || form.getValue("contato") == null) {
                msg += '<br><b>O campo <font color="red">Contato</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            /*
            if (form.getValue("classificacao_default") == "" || form.getValue("classificacao_default") == null) {
                msg += '<br><b>O campo <font color="red">Classificação Default</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("nome_cli_fornecedor_default") == "" || form.getValue("nome_cli_fornecedor_default") == null) {
                msg += '<br><b>O campo <font color="red">Nome do Cliente/Fornecedor Default</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("filial_default") == "" || form.getValue("filial_default") == null) {
                msg += '<br><b>O campo <font color="red">Filial Default</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("nome_filial_default") == "" || form.getValue("nome_filial_default") == null) {
                msg += '<br><b>O campo <font color="red">Nome Filial Default</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("dados_banc_default") == "" || form.getValue("dados_banc_default") == null) {
                msg += '<br><b>O campo <font color="red">Dados Bancários Default</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("nome_dados_banc_default") == "" || form.getValue("nome_dados_banc_default") == null) {
                msg += '<br><b>O campo <font color="red">Nome Dados Bancários Default</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            */
        }

        /* VALIDAÇÃO DO ANEXO */
        var anexoSolicitacao = form.getChildrenIndexes("table_anexo_solicitacao");
        if (anexoSolicitacao.length == 0) {
            msg += '<br><b>A tabela <font color="red">Anexo</font> necessita de pelo menos uma entrada!</b>';
        }
        /* VALIDAÇÃO DA TABELA RATEIO POR CENTRO DE CUSTO */
        var rateioCentroDeCustos = form.getChildrenIndexes("table_rateio_ccusto");
        if (rateioCentroDeCustos.length == 0) {
            msg += '<br><b>A tabela <font color="red">Rateio por centro de custo </font> necessita de pelo menos uma entrada!</b>';
        }
        for (var i = 0; i < rateioCentroDeCustos.length; i++) {
            if (form.getValue("coluna_natureza___" + rateioCentroDeCustos[i]) == "" || form.getValue("coluna_natureza___" + rateioCentroDeCustos[i]) == null) {
                msg += '<br><b>O campo <font color="red">Natureza Orçamentária Financeira ' + (i + 1) + '</font> \u00E9  obrigat\u00F3rio!</b>';
            }
            if (form.getValue("coluna_ccusto___" + rateioCentroDeCustos[i]) == "" || form.getValue("coluna_ccusto___" + rateioCentroDeCustos[i]) == null) {
                msg += '<br><b>O campo <font color="red">Centro de Custo ' + (i + 1) + '</font> \u00E9  obrigat\u00F3rio!</b>';
            }
            if (form.getValue("coluna_valor___" + rateioCentroDeCustos[i]) == "" || form.getValue("coluna_valor___" + rateioCentroDeCustos[i]) == null) {
                msg += '<br><b>O campo <font color="red">Valor ' + (i + 1) + '</font> \u00E9  obrigat\u00F3rio!</b>';
            }
            if (form.getValue("coluna_percentual___" + rateioCentroDeCustos[i]) == "" || form.getValue("coluna_percentual___" + rateioCentroDeCustos[i]) == null) {
                msg += '<br><b>O campo <font color="red">Percentual ' + (i + 1) + '</font> \u00E9  obrigat\u00F3rio!</b>';
            }
        }
        if (form.getValue("valor_total_rateio") > form.getValue("Valor")) {
            msg += '<br><b>O <font color="red"> Valor total </font> do rateio supera o valor total a ser pago!</b>';
        }
        if (form.getValue("valor_total_rateio") < form.getValue("Valor")) {
            msg += '<br><b>O <font color="red"> Valor total </font> do rateio é inferior ao valor total a ser pago!</b>';
        }

        /* ETAPA 127 - PAGAMENTO ÚNICO */
    } else if (activity == 127) {
        if (form.getValue("pagamento_realizado_pu") == "" || form.getValue("pagamento_realizado_pu") == null) {
            msg += '<br><b>O campo <font color="red">Pagamento Realizado</font> \u00E9 obrigat\u00F3rio!</b>';
        }
        if (form.getValue("pagamento_realizado_pu") == "Sim") {
            if (form.getValue("teve_juros_pu") == "" || form.getValue("teve_juros_pu") == null) {
                msg += '<br><b>O campo <font color="red">Houve juros no pagamento</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("teve_juros_pu") == "Sim") {
                if (form.getValue("valor_original_pu") == "" || form.getValue("valor_original_pu") == null) {
                    msg += '<br><b>O campo <font color="red">Valor Original</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("valor_juros_pu") == "" || form.getValue("valor_juros_pu") == null) {
                    msg += '<br><b>O campo <font color="red">Valor do juros</font> \u00E9 obrigat\u00F3rio!</b>';
                }
            }
            if (form.getValue("valor_pu") == "" || form.getValue("valor_pu") == null) {
                msg += '<br><b>O campo <font color="red">Valor total a ser pago</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("data_pagamento") == "" || form.getValue("data_pagamento") == null) {
                msg += '<br><b>O campo <font color="red">Data de Pagamento</font> \u00E9 obrigat\u00F3rio!</b>';
            }
        }
        /* ETAPA 128 - PAGAMENTO PARCIAL */
    } else if (activity == 128) {
        if (form.getValue("pagamento_realizado_pp") == "Sim") {

            for (var index = 0; index < table_pagamento_parcial.length; index++) {
                var idCampo = table_pagamento_parcial[index];
                if (form.getValue("data_vencimento_pp___" + idCampo) == "") {
                    msg += '<br><b>O campo <font color="red">Data do vencimento</font> é \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("data_pagamento_pp___" + idCampo) == "") {
                    msg += '<br><b>O campo <font color="red">Data do pagamento</font> é \u00E9 obrigat\u00F3rio!</b>';
                }
            }

            if (form.getValue("teve_juros_pp") == "" || form.getValue("teve_juros_pp") == null) {
                msg += '<br><b>O campo <font color="red">Houve juros no pagamento</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("teve_juros_pp") == "Sim") {
                if (form.getValue("valor_original_pp") == "" || form.getValue("valor_original_pp") == null) {
                    msg += '<br><b>O campo <font color="red">Valor Original</font> \u00E9 obrigat\u00F3rio!</b>';
                }
                if (form.getValue("valor_juros_pp") == "" || form.getValue("valor_juros_pp") == null) {
                    msg += '<br><b>O campo <font color="red">Valor do juros</font> \u00E9 obrigat\u00F3rio!</b>';
                }
            }
            if (form.getValue("valor_inicial_pp") == "" || form.getValue("valor_inicial_pp") == null) {
                msg += '<br><b>O campo <font color="red">Valor total a ser pago inicial</font> \u00E9 obrigat\u00F3rio!</b>';
            }
            if (form.getValue("valor_final_pp") == "" || form.getValue("valor_final_pp") == null) {
                msg += '<br><b>O campo <font color="red">Valor total pago final (R$)</font> \u00E9 obrigat\u00F3rio!</b>';
            }
        }
    }

    if (msg != "") {
        throw (
            "<h2 style='color:red' align='center'><b></b> Pendências:<br></b></h2>" +
            msg
        );
    }
}
