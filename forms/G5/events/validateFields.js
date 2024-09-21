function validateForm(form) {
    var activity = getValue("WKNumState");
    var proxima = getValue("WKNextState");
    var msg = "";
    var valor_total_rateio = formatText2Float(form.getValue("valor_total_rateio"));
    var Valor = formatText2Float(form.getValue("Valor"));
    var table_pagamento_parcial = form.getChildrenIndexes("table_pagamento_parcial");
    var table_pagamento_unico = form.getChildrenIndexes("table_pagamento_unico");


    /*** Cancelamento */
    if (proxima == 287) return;

    /* ETAPA 000 | 004 - INICIO | 034 REVISÃO */
    if (activity == 4 || activity == 0 || activity == 34) {
        if (campoVazio(form, "empresa")) msg += getMsgObg('Empresa');
        if (campoVazio(form, "filial")) msg += getMsgObg('Filial');
        if (campoVazio(form, "coligada")) msg += getMsgObg('Coligada');
        if (campoVazio(form, "centro_de_custo")) msg += getMsgObg('Centro de Custos');
        if (campoVazio(form, "setor_solicitante")) msg += getMsgObg('Setor Solicitante');
        if (campoVazio(form, "urgencia_solicitacao")) msg += getMsgObg('Urgência da Solicitação');
        if (campoVazio(form, "titulo_solicitacao")) msg += getMsgObg('Título da Solicitação');
        if (campoVazio(form, "descricao_solicitacao")) msg += getMsgObg('Descrição da Solicitação');
        if (campoVazio(form, "data_vencimento")) msg += getMsgObg('Data de Vencimento');
        if (campoVazio(form, "responsavel_solicitacao")) msg += getMsgObg('Responsável pela Solicitação');
        if (campoVazio(form, "email_solicitante")) msg += getMsgObg('E-mail do Solicitante');
        if (campoVazio(form, "teve_juros")) msg += getMsgObg('Houve juros no pagamento?');
        if (form.getValue("teve_juros") == "Sim") {
            if (campoVazio(form, "valor_original")) msg += getMsgObg('Valor Original');
            if (campoVazio(form, "valor_juros")) msg += getMsgObg('Valor do juros');
        }
        if (campoVazio(form, "fornecedor_cadastrado")) msg += getMsgObg('Fornecedor Cadastrado');
        if (form.getValue("fornecedor_cadastrado") == "Sim") {
            if (campoVazio(form, "vincular_fornecedor_analise")) msg += getMsgObg('Vincular Fornecedor');
            if (campoVazio(form, "dados_pagamento")) msg += getMsgObg('Dados de Pagamento');
        } else if (form.getValue("fornecedor_cadastrado") == "Não") {
            if (campoVazio(form, "nome_social")) msg += getMsgObg('Nome Fantasia/Social');
            if (campoVazio(form, "nome")) msg += getMsgObg('Nome');
            if (campoVazio(form, "classificacao")) msg += getMsgObg('Classificação');
            if (campoVazio(form, "categoria")) msg += getMsgObg('Categoria');
            if (form.getValue("categoria") == "F" && campoVazio(form, "CPF")) msg += getMsgObg('CPF');
            if (form.getValue("categoria") == "J" && campoVazio(form, "CNPJ")) msg += getMsgObg('CNPJ');
            if (campoVazio(form, "CEP")) msg += getMsgObg('CEP');
            if (campoVazio(form, "status_tipo_cliente")) msg += getMsgObg('Status do Cliente (Ativo ou Bloqueado)');
            if (campoVazio(form, "tipo_rua")) msg += getMsgObg('Tipo Rua');
            if (campoVazio(form, "rua")) msg += getMsgObg('Rua');
            if (campoVazio(form, "numero")) msg += getMsgObg('Numero');
            if (campoVazio(form, "tipo_bairro")) msg += getMsgObg('Bairro');
            if (campoVazio(form, "bairro")) msg += getMsgObg('Bairro');
            if (campoVazio(form, "id_pais")) msg += getMsgObg('ID do País');
            if (campoVazio(form, "pais")) msg += getMsgObg('País');
            if (campoVazio(form, "telefone")) msg += getMsgObg('Telefone');
            if (campoVazio(form, "email")) msg += getMsgObg('E-mail');
            if (campoVazio(form, "contato")) msg += getMsgObg('Contato');
            var cpf2 = form.getValue("CpfCnpj_favorecido").replace('.', '');
            cpf2 = cpf2.replace('-','');
            if (form.getValue("CGCCFO") !=  cpf2 ) msg += String('<br/>CPF/CNPJ do Favorecido</font> deve ser igual ao CPF/CNPJ do fornecedor! : ');
        }
        if (campoVazio(form, "valor_total_rateio")) msg += getMsgObg('Valor total a ser pago');

        /* VALIDAÇÃO DO ANEXO */
        var anexoSolicitacao = form.getChildrenIndexes("table_anexo_solicitacao");
        if (anexoSolicitacao.length == 0) { msg += '<br><b>A tabela <font color="red">Anexo</font> necessita de pelo menos uma entrada!</b>'; }

        /* VALIDAÇÃO DA TABELA RATEIO POR CENTRO DE CUSTO */
        var rateioCentroDeCustos = form.getChildrenIndexes("table_rateio_ccusto");
        if (rateioCentroDeCustos.length == 0) { msg += '<br><b>A tabela <font color="red">Rateio por centro de custo</font> necessita de pelo menos uma entrada!</b>'; }

        for (var i = 0; i < rateioCentroDeCustos.length; i++) {
            if (campoVazio(form, "coluna_natureza___" + rateioCentroDeCustos[i])) { msg += getMsgObg('Natureza Orçamentária Financeira ' + (i + 1) + '') }
            if (campoVazio(form, "coluna_ccusto___" + rateioCentroDeCustos[i])) { msg += getMsgObg('Centro de Custo ' + (i + 1) + '') }
            if (campoVazio(form, "coluna_valor___" + rateioCentroDeCustos[i])) { msg += getMsgObg('Valor ' + (i + 1) + '') }
            if (campoVazio(form, "coluna_percentual___" + rateioCentroDeCustos[i])) { msg += getMsgObg('Percentual ' + (i + 1) + '') }
        }

        if (valor_total_rateio > Valor) {
            msg += '<br><b>O <font color="red">Valor total</font> do rateio supera o valor total a ser pago!</b> [' + valor_total_rateio + ' - ' + Valor + ']';
        }
        if (valor_total_rateio < Valor) {
            msg += '<br><b>O <font color="red">Valor total</font> do rateio é inferior ao valor total a ser pago!</b> [' + valor_total_rateio + ' - ' + Valor + ']';
        }
    }
    else if (activity == 14) {
        /* ETAPA 014 - PROVISIONAMENTO */
        if (campoVazio(form, "dados_conformidade")) msg += getMsgObg('Dados Solicitados em Conformidade?');
        if (form.getValue("dados_conformidade") == "Nao" || form.getValue("dados_conformidade") == "Cancelar") {
            if (campoVazio(form, "mensagem_solicitacao_ajustes")) { msg += getMsgObg('Motivo da Solicitação de Ajustes') }
        }
        if (form.getValue("dados_conformidade") == "Sim") {
            if (campoVazio(form, "referencia_analise")) msg += getMsgObg('Ref');
            if (campoVazio(form, "pagar_receber")) msg += getMsgObg('Pagar ou Receber');
            if (campoVazio(form, "filial_analise")) msg += getMsgObg('Filial');
            if (campoVazio(form, "nome_filial_analise")) msg += getMsgObg('Nome da Filial');
            if (campoVazio(form, "nome_cli_fornecedor_analise")) msg += getMsgObg('Nome do Cliente/Fornecedor');
            if (campoVazio(form, "dados_pagamento_analise")) msg += getMsgObg('Dados de Pagamento');
            if (campoVazio(form, "CpfCnpj_analise")) msg += getMsgObg('CPF/CNPJ');
            if (campoVazio(form, "tipo_documento_analise")) msg += getMsgObg('Tipo de documento');
            if (campoVazio(form, "nome_tipo_documento")) msg += getMsgObg('Nome tipo de documento');
            if (campoVazio(form, "numero_documento_analise")) msg += getMsgObg('Núm. Documento');
            if (campoVazio(form, "data_emissao_analise")) msg += getMsgObg('Data de Emissão');
            if (campoVazio(form, "data_vencimento_analise")) msg += getMsgObg('Data de Vencimento');
            if (campoVazio(form, "data_previa_baixa_analise")) msg += getMsgObg('Data Prev. Baixa');
            if (campoVazio(form, "historico_analise")) msg += getMsgObg('Histórico');
            if (campoVazio(form, "serie_documento_analise")) msg += getMsgObg('Série do Documento');
            if (campoVazio(form, "valor_original_analise")) msg += getMsgObg('Valor Original');
            if (campoVazio(form, "conta_caixa_analise")) msg += getMsgObg('Conta/Caixa');
            if (campoVazio(form, "tipo_moeda")) msg += getMsgObg('Moeda');
            if (campoVazio(form, "desconto_analise")) msg += getMsgObg('Desconto');
            if (campoVazio(form, "percentual_desc_analise")) msg += getMsgObg('% Desconto');
            if (campoVazio(form, "juros_analise")) msg += getMsgObg('Juros');
            if (campoVazio(form, "percentual_juros_analise")) msg += getMsgObg('% Juros');
            if (campoVazio(form, "juros_dia_analise")) msg += getMsgObg('Juros ao Dia');
            if (campoVazio(form, "carencia_juros_analise")) msg += getMsgObg('Carência Juros');
            if (campoVazio(form, "multa_analise")) msg += getMsgObg('Multa');
            if (campoVazio(form, "percentual_multa_analise")) msg += getMsgObg('% Multa');
            if (campoVazio(form, "multa_dia_analise")) msg += getMsgObg('Multa ao dia (%)');
            if (campoVazio(form, "capitalizacao_analise")) msg += getMsgObg('Capitalização');
            if (campoVazio(form, "percentual_cap_analise")) msg += getMsgObg('% Capitalização');
            if (campoVazio(form, "cap_mensal_analise")) msg += getMsgObg('Cap. Mensal (%)');

            /* VALIDAÇÃO CADASTRO DE FORNECEDOR */
            if (campoVazio(form, "fornecedor_cadastrado")) msg += getMsgObg('Fornecedor Cadastrado?');
            if (form.getValue("fornecedor_cadastrado") == "Sim") {
                if (campoVazio(form, "vincular_fornecedor_analise")) msg += getMsgObg('Vincular Fornecedor');
                if (campoVazio(form, "dados_pagamento")) msg += getMsgObg('Dados de Pagamento');
            }
            if (form.getValue("fornecedor_cadastrado") == "Não") {
                if (campoVazio(form, "nome_social")) msg += getMsgObg('Nome Fantasia/Social');
                if (campoVazio(form, "nome")) msg += getMsgObg('Nome');
                if (campoVazio(form, "classificacao")) msg += getMsgObg('Classifica\u00e7\u00e3o');
                if (campoVazio(form, "categoria")) msg += getMsgObg('Categoria');
                if (form.getValue("categoria") == "F" && campoVazio(form, "CPF")) msg += getMsgObg('CPF');
                if (form.getValue("categoria") == "J" && campoVazio(form, "CNPJ")) msg += getMsgObg('CNPJ');
                if (campoVazio(form, "CEP")) msg += getMsgObg('CEP');
                if (campoVazio(form, "status_tipo_cliente")) msg += getMsgObg('Status do Cliente (Ativo ou Bloqueado)');
                if (campoVazio(form, "tipo_rua")) msg += getMsgObg('Tipo Rua');
                if (campoVazio(form, "rua")) msg += getMsgObg('Rua');
                if (campoVazio(form, "numero")) msg += getMsgObg('Numero');
                if (campoVazio(form, "tipo_bairro")) msg += getMsgObg('Tipo de Bairro');
                if (campoVazio(form, "bairro")) msg += getMsgObg('Bairro');
                if (campoVazio(form, "id_pais")) msg += getMsgObg('ID do País');
                if (campoVazio(form, "pais")) msg += getMsgObg('País');
                if (campoVazio(form, "telefone")) msg += getMsgObg('Telefone');
                if (campoVazio(form, "email")) msg += getMsgObg('E-mail');
                if (campoVazio(form, "contato")) msg += getMsgObg('Contato');
            }
            if (form.getValue("fornecedor_cadastrado") == "Sim" && campoVazio(form, "vincular_fornecedor_analise")) msg += getMsgObg('Vincular Fornecedor');
            if (campoVazio(form, "tipo_contabil")) msg += getMsgObg('Tipo Contábil');
            if (campoVazio(form, "solicitacao_mult_analise")) msg += getMsgObg('Solicita\u00e7\u00e3o M\u00faltipla ou Individual');
        }
    } else if (activity == 127) {
        /* ETAPA 127 - PAGAMENTO ÚNICO */
        if (campoVazio(form, "pagamento_realizado_pu")) msg += getMsgObg('Pagamento Realizado');
        if (form.getValue("pagamento_realizado_pu") == "Sim") {
            if (campoVazio(form, "teve_juros_pu")) msg += getMsgObg('Houve juros no pagamento');
            if (form.getValue("teve_juros_pu") == "Sim") {
                if (campoVazio(form, "valor_original_pu")) msg += getMsgObg('Valor Original');
                if (campoVazio(form, "valor_juros_pu")) msg += getMsgObg('Valor do juros');
            }
            if (campoVazio(form, "valor_pu")) msg += getMsgObg('Valor total a ser pago');
        }
        for (var index = 0; index < table_pagamento_unico.length; index++) {
            var idCampo = table_pagamento_unico[index];
            if (campoVazio(form, "data_vencimento_pu___" + idCampo)) msg += getMsgObg('Data do vencimento');
            if (campoVazio(form, "data_pagamento_pu___" + idCampo)) msg += getMsgObg('Data do pagamento');
        }
    } else if (activity == 128) {
        /* ETAPA 128 - PAGAMENTO PARCIAL */
        if (form.getValue("pagamento_realizado_pp") == "Sim") {
            if (campoVazio(form, "teve_juros_pp")) { msg += getMsgObg('Houve juros no pagamento') }
            if (form.getValue("teve_juros_pp") == "Sim") {
                if (campoVazio(form, "valor_original_pp")) { msg += getMsgObg('Valor Original') }
                if (campoVazio(form, "valor_juros_pp")) { msg += getMsgObg('Valor do juros') }
            }
            if (campoVazio(form, "valor_inicial_pp")) { msg += getMsgObg('Valor total a ser pago inicial') }
            if (campoVazio(form, "valor_final_pp")) { msg += getMsgObg('Valor total pago final (R$)') }
            for (var index = 0; index < table_pagamento_parcial.length; index++) {
                var idCampo = table_pagamento_parcial[index];
                if (campoVazio(form, "data_vencimento_pp___" + idCampo)) { msg += getMsgObg('Data do vencimento') }
                if (campoVazio(form, "data_pagamento_pp___" + idCampo)) { msg += getMsgObg('Data do pagamento') }
            }
        }
    } else if (activity == 274) {
        var cpf2 = form.getValue("CpfCnpj_favorecido").replace('.', '');
        cpf2 = cpf2.replace('-','');
    
        if (form.getValue("CGCCFO") != cpf2 ) { msg += String('<br/>CPF/CNPJ do Favorecido</font> deve ser igual ao CPF/CNPJ do fornecedor!') }
    }
    /** Retorna mensagem de erro se alguns dos campos não atender as regras */
    if (msg != "") {
        throw (
            "<h2 style='color:red' align='center'><b></b> Pendências:<br></b></h2>" +
            msg
        );
    }
}

function campoVazio(form, campo) {
    if (form.getValue(campo) == "" || form.getValue(campo) == null) return true;
    return false;
}

function getMsgObg(descCampo) {
    return '<br><b>O campo <font color="red">"' + descCampo + '"</font> \u00E9 obrigat\u00F3rio!</b>'
}

function formatText2Float(params) {
    params = String(params);
    var regexExpression = RegExp("\\.", "g");
    params = params.replace(regexExpression, "");
    params = params.replace(",", ".");
    return parseFloat(params);
}