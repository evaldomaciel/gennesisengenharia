function defineStructure() {
    addColumn("SETOR", DatasetFieldType.STRING);
    addColumn("NATUREZA", DatasetFieldType.STRING);
    setKey(["SETOR"]);
    addIndex(["SETOR"]);
}

function onSync(lastSyncDate) {
    var ds = DatasetBuilder.newDataset();
    var tempDataset = getDefaultValues(); // consulta a fonte de dados do dataset
    for (var a = 0; a < tempDataset.length; a++) {
        ds.addRow(tempDataset[a]);
    }
    return ds;
}

function createDataset(fields, constraints, sortFields) {

    var ds = DatasetBuilder.newDataset();
    ds.addColumn("SETOR");
    ds.addColumn("NATUREZA");

    var tempDataset = getDefaultValues(); // consulta a fonte de dados do dataset
    var setor;
    var natureza;

    if (constraints != null && constraints.length && constraints[0].fieldName != "sqlLimit") { //se tiver constraint filtra
        console.log("ds_natureza_financeira constraints:")
        console.dir(constraints);

        for (var index = 0; index < constraints.length; index++) {
            setor = constraints[index].fieldName == "SETOR" ? constraints[index].initialValue : setor; // Se o Setor for informado, é valor é atribuído a variável
            console.log('ds_natureza_financeira setor -> ' + setor);
            natureza = constraints[index].fieldName == "NATUREZA" ? constraints[index].initialValue : natureza; // Se a Natureza for informada, é valor é atribuído a variável
            console.log('ds_natureza_financeira natureza -> ' + natureza);
        }
        /* Implemente o filtro que foi definido, somente 1 por consulta*/
        if (setor != undefined) {
            ds = getMatchValue(tempDataset, setor, 0);
        }
        else if (natureza != undefined) {
            ds = getMatchValue(tempDataset, natureza, 1)

        }
    } else { // se não tiver constraint adiciona todas as linhas do objeto no retorno
        for (var a = 0; a < tempDataset.length; a++) {
            ds.addRow(tempDataset[a]);
        }
    }
    return ds;
}

/**
 * Monta o novo dataset com base nos parâmetros definidos
 * @param {object} list espera um objeto ou array de objetos 
 * @param {string} filter espera o valor que foi passado via constraint do dataset 
 * @param {int} position a posição onde o valor alvo será validado
 * @returns retorna uma novo dataset com os valores que atendam a condição
 */
function getMatchValue(list, filter, position) {
    var ds = DatasetBuilder.newDataset();
    ds.addColumn("SETOR");
    ds.addColumn("NATUREZA");
    for (var a = 0; a < list.length; a++) {
        /**  Irá adicionar ao dataset somente as linhas que atenderem a condição
         * Por estarmos usando indexOf, vai função vai trabalhar como um '%like%' no banco de dados */
        if (String(list[a][position]).toLocaleUpperCase().indexOf(String(filter).toLocaleUpperCase()) >= 0) {
            ds.addRow(list[a]);
        }
    }
    return ds;
}

/**
 * Lista de objetos a ser retornada pelo dataset 
 * @returns lista
 */
function getDefaultValues() {
    return [
        ['Faturamento', '1.01 - RECEITAS OPERACIONAIS - RECEITA - CONSTRUCAO PREDIAL'],
        ['Faturamento', '1.01 - RECEITAS OPERACIONAIS - RECEITA - MANUTENCAO'],
        ['Faturamento', '1.01 - RECEITAS OPERACIONAIS - RECEITA - REFORMA PREDIAL'],
        ['Faturamento', '1.01 - RECEITAS OPERACIONAIS - RECEITA - TERCEIRIZACAO MAO DE OBRA'],
        ['Faturamento', '1.02 - RECEITAS NAO OPERACIONAIS - RATEIO DO ADM - ENTRADA'],
        ['Faturamento', '1.06 - RECEITA COM ATIVIDADES DE FINANCIAMENTOS - EMPRESTIMO ENTRE PROJETOS - ENTRADA'],
        ['Faturamento', '1.06 - RECEITA COM ATIVIDADES DE FINANCIAMENTOS - EMPRESTIMO DE SOCIOS - ENTRADA'],
        ['Faturamento', '2.01 - TRIBUTOS - PIS'],
        ['Faturamento', '2.01 - TRIBUTOS - COFINS'],
        ['Faturamento', '2.01 - TRIBUTOS - ISS'],
        ['Faturamento', '2.01 - TRIBUTOS - IMPOSTO DE RENDA'],
        ['Faturamento', '2.01 - TRIBUTOS - CSLL'],
        ['Faturamento', '2.01 - TRIBUTOS - FAC PB - RETIDO'],
        ['Faturamento', '2.01 - TRIBUTOS - INSS - RETIDO'],
        ['Faturamento', '2.01 - TRIBUTOS - ISS - RETIDO'],
        ['Faturamento', '2.02 - OUTRAS DEDUCOES - GLOSA'],
        ['Faturamento', '2.02 - OUTRAS DEDUCOES - RETENCAO CONTRATUAL'],
        ['Faturamento', '3.10 - PAGAMENTO RATEIO ADM - RATEIO DO ADM - SAIDA'],
        ['Faturamento', '3.23 - DESPESAS COM FINANCIAMENTOS - EMPRESTIMO ENTRE PROJETOS - SAIDA'],
        ['Faturamento', '3.23 - DESPESAS COM FINANCIAMENTOS - EMPRESTIMO DE SÓCIOS - SAÍDA'],
        ['Financeiro', '1.03 - RESSARCIMENTOS - DEVOLUCAO PAGAMENTO INDEVIDO'],
        ['Financeiro', '1.03 - RESSARCIMENTOS - RESSARCIMENTO COLIGADA'],
        ['Financeiro', '1.04 - RECEITAS FINANCEIRAS - RENDIMENTOS DE APLICACOES FINANCEIRAS'],
        ['Financeiro', '1.06 - RECEITA COM ATIVIDADES DE FINANCIAMENTOS - APORTE DE CAPITAL DE SOCIOS'],
        ['Financeiro', '1.06 - RECEITA COM ATIVIDADES DE FINANCIAMENTOS - OBTENCAO DE EMPRESTIMOS'],
        ['Financeiro', '1.06 - RECEITA COM ATIVIDADES DE FINANCIAMENTOS - TRANSFERENCIA - ENTRADA'],
        ['Financeiro', '1.06 - RECEITA COM ATIVIDADES DE FINANCIAMENTOS - EMPRESTIMO BANCARIO - ENTRADA'],
        ['Financeiro', '3.05 - TAXAS E TARIFAS - DESPESAS E TARIFAS BANCARIAS'],
        ['Financeiro', '3.17 - SERVIÇOS PARCEIROS - REPASSE A PARCEIROS E CONSORCIADOS'],
        ['Financeiro', '3.20 - DESPESAS NAO OPERACIONAIS  - PAGAMENTO INDEVIDO'],
        ['Financeiro', '3.21 - DESPESAS FINANCEIRAS - MULTAS E JUROS DE MORA'],
        ['Financeiro', '3.21 - DESPESAS FINANCEIRAS - JUROS FINANCIAMENTOS'],
        ['Financeiro', '3.21 - DESPESAS FINANCEIRAS - IOF E OUTRAS DESPESAS DE FINANCIAMENTO'],
        ['Financeiro', '3.22 - DESPESAS COM INVESTIMENTOS - INVESTIMENTO EM IMOVEIS'],
        ['Financeiro', '3.22 - DESPESAS COM INVESTIMENTOS - AQUISICAO DE EMPRESAS'],
        ['Financeiro', '3.23 - DESPESAS COM FINANCIAMENTOS - CONSORCIO'],
        ['Financeiro', '3.23 - DESPESAS COM FINANCIAMENTOS - EMPRESTIMO BANCARIO - SAIDA'],
        ['Financeiro', '3.23 - DESPESAS COM FINANCIAMENTOS - TRANSFERENCIA - SAIDA'],
        ['Financeiro', '3.23 - DESPESAS COM FINANCIAMENTOS - DISTRIBUICAO DE LUCROS'],
        ['Financeiro', '3.23 - DESPESAS COM FINANCIAMENTOS - PARCELAMENTO DE TRIBUTOS'],
        ['Assistência Diretoria', '1.02 - RECEITAS NAO OPERACIONAIS - VENDAS DE SUCATAS'],
        ['Assistência Diretoria', '1.02 - RECEITAS NAO OPERACIONAIS - ALUGUEL DE SALA'],
        ['Assistência Diretoria', '1.05 - RECEITA COM ATIVIDADES DE INVESTIMENTOS - VENDA DE ATIVO PERMANENTE'],
        ['Assistência Diretoria', '1.05 - RECEITA COM ATIVIDADES DE INVESTIMENTOS - OUTRAS RECEITAS NAO OPERACIONAIS'],
        ['Assistência Diretoria', '3.01 - UTILIDADES E PREDIAL - ENERGIA ELETRICA'],
        ['Assistência Diretoria', '3.01 - UTILIDADES E PREDIAL - AGUA E ESGOTO'],
        ['Assistência Diretoria', '3.01 - UTILIDADES E PREDIAL - TELEFONE'],
        ['Assistência Diretoria', '3.01 - UTILIDADES E PREDIAL - INTERNET'],
        ['Assistência Diretoria', '3.01 - UTILIDADES E PREDIAL - ALUGUEL E CONDOMINIO CASA OU CONTEINER CANTEIRO'],
        ['Assistência Diretoria', '3.01 - UTILIDADES E PREDIAL - MATERIAL CONSUMO'],
        ['Assistência Diretoria', '3.01 - UTILIDADES E PREDIAL - MATERIAL EXPEDIENTE E LIMPEZA'],
        ['Assistência Diretoria', '3.01 - UTILIDADES E PREDIAL - MOVEIS E UTENSILIOS'],
        ['Assistência Diretoria', '3.01 - UTILIDADES E PREDIAL - SEGURO IMOVEL'],
        ['Assistência Diretoria', '3.01 - UTILIDADES E PREDIAL - SEGURANCA/VIGILANCIA'],
        ['Assistência Diretoria', '3.01 - UTILIDADES E PREDIAL - IPTU'],
        ['Assistência Diretoria', '3.01 - UTILIDADES E PREDIAL - MANUTENCAO PREDIAL'],
        ['Assistência Diretoria', '3.03 - PESSOAL - ACOES TRABALHISTAS/ INDENIZACOES/CUSTAS'],
        ['Assistência Diretoria', '3.03 - PESSOAL - DIARIAS SALARIAIS'],
        ['Assistência Diretoria', '3.03 - PESSOAL - FARDAMENTOS'],
        ['Assistência Diretoria', '3.03 - PESSOAL - COMPRA DE MEDICAMENTOS'],
        ['Assistência Diretoria', '3.03 - PESSOAL - CURSOS E TREINAMENTOS'],
        ['Assistência Diretoria', '3.03 - PESSOAL - FESTA E EVENTOS'],
        ['Assistência Diretoria', '3.03 - PESSOAL - VIAGENS DE COLABORADORES'],
        ['Assistência Diretoria', '3.04 - SERVIÇOS TERCEIRIZADOS - SEGURANCA DO TRABALHO'],
        ['Assistência Diretoria', '3.09 - COMERCIAL E LICITACAO - MARKETING E PUBLICIDADE'],
        ['Assistência Diretoria', '3.09 - COMERCIAL E LICITACAO - PATROCINIO'],
        ['Assistência Diretoria', '3.15 - TECNOLOGIA - LICENÇA E MENSALIDADE DE SOFTWARE'],
        ['Assistência Diretoria', '3.15 - TECNOLOGIA - MANUTENCAO DE HARDWARE / SOFTWARE'],
        ['Assistência Diretoria', '3.15 - TECNOLOGIA - DESENVOLVIMENTO DE SOFTWARE'],
        ['Assistência Diretoria', '3.16 - TERCEIRIZADOS ADMINSTRATIVOS - ASSESSORIA JURIDICA TRABALHISTA'],
        ['Assistência Diretoria', '3.16 - TERCEIRIZADOS ADMINSTRATIVOS - CONTABILIDADE'],
        ['Assistência Diretoria', '3.16 - TERCEIRIZADOS ADMINSTRATIVOS - ASSESSORIA GERENCIAL'],
        ['Assistência Diretoria', '3.16 - TERCEIRIZADOS ADMINSTRATIVOS - ASSESSORIA JURIDICA NAO TRABALHISTA'],
        ['Assistência Diretoria', '3.24 - DIRETORIA - PLANO DE SAUDE DIRETORIA'],
        ['Assistência Diretoria', '3.24 - DIRETORIA - PLANO DENTARIO DIRETORIA'],
        ['Assistência Diretoria', '3.24 - DIRETORIA - PREVIDENCIA PRIVADA DA DIRETORIA'],
        ['Assistência Diretoria', '3.24 - DIRETORIA - PRO-LABORE'],
        ['Assistência Diretoria', '3.24 - DIRETORIA - SEGURO PATRONAL DA DIRETORIA'],
        ['Assistência Diretoria', '3.24 - DIRETORIA - AUXILIO ALIMENTAÇÃO DIRETORIA'],
        ['Assistência Diretoria', '3.24 - DIRETORIA - OUTROS BENEFICIOS DA DIRETORIA'],
        ['Segurança do Trabalho', '3.01 - UTILIDADES E PREDIAL - ENERGIA ELETRICA'],
        ['Segurança do Trabalho', '3.01 - UTILIDADES E PREDIAL - AGUA E ESGOTO'],
        ['Segurança do Trabalho', '3.01 - UTILIDADES E PREDIAL - TELEFONE'],
        ['Segurança do Trabalho', '3.01 - UTILIDADES E PREDIAL - INTERNET'],
        ['Segurança do Trabalho', '3.01 - UTILIDADES E PREDIAL - ALUGUEL E CONDOMINIO CASA OU CONTEINER CANTEIRO'],
        ['Segurança do Trabalho', '3.01 - UTILIDADES E PREDIAL - MATERIAL CONSUMO'],
        ['Segurança do Trabalho', '3.01 - UTILIDADES E PREDIAL - MATERIAL EXPEDIENTE E LIMPEZA'],
        ['Segurança do Trabalho', '3.01 - UTILIDADES E PREDIAL - MOVEIS E UTENSILIOS'],
        ['Segurança do Trabalho', '3.01 - UTILIDADES E PREDIAL - SEGURO IMOVEL'],
        ['Segurança do Trabalho', '3.01 - UTILIDADES E PREDIAL - SEGURANCA/VIGILANCIA'],
        ['Segurança do Trabalho', '3.01 - UTILIDADES E PREDIAL - IPTU'],
        ['Segurança do Trabalho', '3.01 - UTILIDADES E PREDIAL - MANUTENCAO PREDIAL'],
        ['Segurança do Trabalho', '3.05 - TAXAS E TARIFAS - CORREIOS'],
        ['Departamento Pessoal', '3.03 - PESSOAL - RETENCAO DE INSS'],
        ['Departamento Pessoal', '3.03 - PESSOAL - SALARIO'],
        ['Departamento Pessoal', '3.03 - PESSOAL - FERIAS'],
        ['Departamento Pessoal', '3.03 - PESSOAL - AUXILIO TRANSPORTE'],
        ['Departamento Pessoal', '3.03 - PESSOAL - 13º SALARIO'],
        ['Departamento Pessoal', '3.03 - PESSOAL - ACOES TRABALHISTAS/ INDENIZACOES/CUSTAS'],
        ['Departamento Pessoal', '3.03 - PESSOAL - INSS'],
        ['Departamento Pessoal', '3.03 - PESSOAL - FGTS'],
        ['Departamento Pessoal', '3.03 - PESSOAL - RESCISAO PESSOAL'],
        ['Departamento Pessoal', '3.03 - PESSOAL - IMPOSTO DE RENDA S/ FOLHA'],
        ['Departamento Pessoal', '3.03 - PESSOAL - DIARIAS SALARIAIS'],
        ['Departamento Pessoal', '3.03 - PESSOAL - GRATIFICACOES/COMISSOES'],
        ['Departamento Pessoal', '3.03 - PESSOAL - ASO E EXAMES MEDICOS'],
        ['Departamento Pessoal', '3.03 - PESSOAL - FARDAMENTOS'],
        ['Departamento Pessoal', '3.03 - PESSOAL - PENSAO ALIMENTICIA'],
        ['Departamento Pessoal', '3.03 - PESSOAL - AUXILIO ALIMENTACAO'],
        ['Departamento Pessoal', '3.03 - PESSOAL - PLANO DE SAUDE'],
        ['Departamento Pessoal', '3.03 - PESSOAL - SEGURO FUNCIONARIOS'],
        ['Departamento Pessoal', '3.03 - PESSOAL - COMPRA DE MEDICAMENTOS'],
        ['Departamento Pessoal', '3.03 - PESSOAL - BONIFICACAO META'],
        ['Departamento Pessoal', '3.03 - PESSOAL - CURSOS E TREINAMENTOS'],
        ['Departamento Pessoal', '3.03 - PESSOAL - SINDICATO'],
        ['Departamento Pessoal', '3.03 - PESSOAL - FESTA E EVENTOS'],
        ['Departamento Pessoal', '3.03 - PESSOAL - VALE REFEIÇÃO'],
        ['Departamento Pessoal', '3.03 - PESSOAL - VALE TRANSPORTE'],
        ['Departamento Pessoal', '3.03 - PESSOAL - SALARIO E ENCARGOS - COLIGADA'],
        ['Departamento Pessoal', '3.03 - PESSOAL - VIAGENS DE COLABORADORES'],
        ['Departamento Pessoal', '3.08 - ADMINISTRATIVAS - CAIXA - FUNDO FIXO ADM DP'],
        ['Departamento Pessoal', '3.03 - VIAGENS DE COLABORADORES - TRANSPORTE'],
        ['Departamento Pessoal', '3.03 - VIAGENS DE COLABORADORES - HOSPEDAGEM'],
        ['Departamento Pessoal', '3.03 - VIAGENS DE COLABORADORES - ALIMENTACAO'],
        ['Departamento Pessoal', '3.03 - BOLSAS E OUTROS GASTOS COM ESTAGIARIOS'],
        ['Departamento Pessoal', '3.03 - TERCEIRIZADOS PF - DISTRATO DE CONTRATO PRESTADOR'],
        ['Departamento Pessoal', '3.03 - PESSOAL - TERCEIRIZADOS PF'],
        ['Departamento Pessoal', '3.03 - PESSOAL - ADIANTAMENTO SALARIAL'],
        ['RH', '3.03 - PESSOAL - RETENCAO DE INSS'],
        ['RH', '3.03 - PESSOAL - SALARIO'],
        ['RH', '3.03 - PESSOAL - FERIAS'],
        ['RH', '3.03 - PESSOAL - AUXILIO TRANSPORTE'],
        ['RH', '3.03 - PESSOAL - 13º SALARIO'],
        ['RH', '3.03 - PESSOAL - ACOES TRABALHISTAS/ INDENIZACOES/CUSTAS'],
        ['RH', '3.03 - PESSOAL - INSS'],
        ['RH', '3.03 - PESSOAL - FGTS'],
        ['RH', '3.03 - PESSOAL - RESCISAO PESSOAL'],
        ['RH', '3.03 - PESSOAL - IMPOSTO DE RENDA S/ FOLHA'],
        ['RH', '3.03 - PESSOAL - DIARIAS SALARIAIS'],
        ['RH', '3.03 - PESSOAL - GRATIFICACOES/COMISSOES'],
        ['RH', '3.03 - PESSOAL - ASO E EXAMES MEDICOS'],
        ['RH', '3.03 - PESSOAL - FARDAMENTOS'],
        ['RH', '3.03 - PESSOAL - PENSAO ALIMENTICIA'],
        ['RH', '3.03 - PESSOAL - AUXILIO ALIMENTACAO'],
        ['RH', '3.03 - PESSOAL - PLANO DE SAUDE'],
        ['RH', '3.03 - PESSOAL - SEGURO FUNCIONARIOS'],
        ['RH', '3.03 - PESSOAL - COMPRA DE MEDICAMENTOS'],
        ['RH', '3.03 - PESSOAL - BONIFICACAO META'],
        ['RH', '3.03 - PESSOAL - CURSOS E TREINAMENTOS'],
        ['RH', '3.03 - PESSOAL - SINDICATO'],
        ['RH', '3.03 - PESSOAL - FESTA E EVENTOS'],
        ['RH', '3.03 - PESSOAL - VALE REFEIÇÃO'],
        ['RH', '3.03 - PESSOAL - VALE TRANSPORTE'],
        ['RH', '3.03 - PESSOAL - SALARIO E ENCARGOS - COLIGADA'],
        ['RH', '3.03 - PESSOAL - VIAGENS DE COLABORADORES'],
        ['RH', '3.08 - ADMINISTRATIVAS - CAIXA - FUNDO FIXO ADM DP'],
        ['RH', '3.03 - VIAGENS DE COLABORADORES - TRANSPORTE'],
        ['RH', '3.03 - VIAGENS DE COLABORADORES - HOSPEDAGEM'],
        ['RH', '3.03 - VIAGENS DE COLABORADORES - ALIMENTACAO'],
        ['RH', '3.03 - BOLSAS E OUTROS GASTOS COM ESTAGIARIOS'],
        ['Engenharia', '3.01 - UTILIDADES E PREDIAL - ENERGIA ELETRICA'],
        ['Engenharia', '3.01 - UTILIDADES E PREDIAL - AGUA E ESGOTO'],
        ['Engenharia', '3.01 - UTILIDADES E PREDIAL - TELEFONE'],
        ['Engenharia', '3.01 - UTILIDADES E PREDIAL - INTERNET'],
        ['Engenharia', '3.01 - UTILIDADES E PREDIAL - ALUGUEL E CONDOMINIO CASA OU CONTEINER CANTEIRO'],
        ['Engenharia', '3.01 - UTILIDADES E PREDIAL - MATERIAL CONSUMO'],
        ['Engenharia', '3.01 - UTILIDADES E PREDIAL - MATERIAL EXPEDIENTE E LIMPEZA'],
        ['Engenharia', '3.02 - MATERIAIS - COMBUSTIVEL PARA EQUIPAMENTOS'],
        ['Engenharia', '3.02 - MATERIAIS - CAIXA - FUNDO FIXO'],
        ['Engenharia', '3.03 - PESSOAL - TERCEIRIZADOS PF'],
        ['Engenharia', '3.03 - PESSOAL - DIARIAS SALARIAIS'],
        ['Engenharia', '3.03 - PESSOAL - DISTRATO DE CONTRATO PRESTADOR'],
        ['Engenharia', '3.03 - PESSOAL - SALARIO E ENCARGOS - COLIGADA'],
        ['Engenharia', '3.04 - SERVIÇOS TERCEIRIZADOS - ALUGUEL DE MAQUINAS E EQUIPAMENTOS'],
        ['Engenharia', '3.04 - SERVIÇOS TERCEIRIZADOS - IMPRESSAO E PLOTAGEM'],
        ['Engenharia', '3.04 - SERVIÇOS TERCEIRIZADOS - SERVICOS TOMADOS'],
        ['Engenharia', '3.04 - SERVIÇOS TERCEIRIZADOS - ABASTECIMENTO DE AGUA'],
        ['Engenharia', '3.04 - SERVIÇOS TERCEIRIZADOS - ESGOTAMENTO SANITARIO'],
        ['Engenharia', '3.04 - SERVIÇOS TERCEIRIZADOS - REMOCAO DE ENTULHO'],
        ['Engenharia', '3.04 - SERVIÇOS TERCEIRIZADOS - MANUTENCAO DE MAQUINAS E EQUIPAMENTOS'],
        ['Engenharia', '3.04 - SERVIÇOS TERCEIRIZADOS - PODA/RETIRADA DE ARVORES'],
        ['Engenharia', '3.04 - SERVIÇOS TERCEIRIZADOS - PROJETOS DE ARQUITETURA / ENGENHARIA'],
        ['Engenharia', '3.04 - SERVIÇOS TERCEIRIZADOS - PRESTADORES DE SERVICO ENGENHARIA (PF / PJ)'],
        ['Engenharia', '3.04 - SERVIÇOS TERCEIRIZADOS - SERVIÇO DE INSTALACAO DE GAS'],
        ['Engenharia', '3.05 - TAXAS E TARIFAS - ART'],
        ['Engenharia', '3.05 - TAXAS E TARIFAS - RRT CAU'],
        ['Engenharia', '3.05 - TAXAS E TARIFAS - RRT CRA'],
        ['Engenharia', '3.05 - TAXAS E TARIFAS - ANUIDADE CAU'],
        ['Engenharia', '3.05 - TAXAS E TARIFAS - ANUIDADE CRA'],
        ['Engenharia', '3.05 - TAXAS E TARIFAS - ANUIDADE CREA'],
        ['Engenharia', '3.05 - TAXAS E TARIFAS - ATESTADO DE CAPACIDADE TECNICA / CAT'],
        ['Compras', '1.03 - RESSARCIMENTOS - DEVOLUCAO PAGAMENTO INDEVIDO'],
        ['Compras', '3.02 - MATERIAIS - INSUMOS - VIDRACARIA'],
        ['Compras', '3.02 - MATERIAIS - INSUMOS - SERRALHERIA E FERRAGENS'],
        ['Compras', '3.02 - MATERIAIS - INSUMOS - MARCENARIA'],
        ['Compras', '3.02 - MATERIAIS - INSUMOS - ELETRICA'],
        ['Compras', '3.02 - MATERIAIS - INSUMOS - TELECOMUNICACOES'],
        ['Compras', '3.02 - MATERIAIS - INSUMOS - HIDRAULICA'],
        ['Compras', '3.02 - MATERIAIS - INSUMOS - ALVENARIA'],
        ['Compras', '3.02 - MATERIAIS - INSUMOS - IMPERMEABILIZACAO'],
        ['Compras', '3.02 - MATERIAIS - INSUMOS - PINTURA'],
        ['Compras', '3.02 - MATERIAIS - INSUMOS - EPI / EPC'],
        ['Compras', '3.02 - MATERIAIS - INSUMOS - PAISAGISMO'],
        ['Compras', '3.02 - MATERIAIS - INSUMOS - MADEIRAMENTO'],
        ['Compras', '3.02 - MATERIAIS - INSUMOS - FERRAMENTAS EQUIP E MAQ'],
        ['Compras', '3.02 - MATERIAIS - INSUMOS - REVESTIMENTOS'],
        ['Compras', '3.02 - MATERIAIS - INSUMOS - FORRO'],
        ['Compras', '3.02 - MATERIAIS - INSUMOS - MATERIAL DE LIMPEZA DE OBRA'],
        ['Compras', '3.02 - MATERIAIS - INSUMOS - CONTROLE DE PRAGAS'],
        ['Compras', '3.02 - MATERIAIS - COMBUSTIVEL PARA EQUIPAMENTOS'],
        ['Compras', '3.02 - MATERIAIS - ICMS - DIFAL'],
        ['Compras', '3.02 - MATERIAIS - FRETE SOBRE COMPRAS'],
        ['Compras', '3.02 - MATERIAIS - CAIXA - FUNDO FIXO'],
        ['Compras', '3.02 - MATERIAIS - COBERTURA/CALHA'],
        ['Compras', '3.02 - MATERIAIS - DIVISORIAS'],
        ['Compras', '3.02 - MATERIAIS - ESQUADRIAS (EXCETO FERRO)'],
        ['Compras', '3.02 - MATERIAIS - ESQUADRIAS DE FERRO'],
        ['Compras', '3.02 - MATERIAIS - LOUCAS E METAIS'],
        ['Compras', '3.02 - MATERIAIS - MARMORE/GRANITO'],
        ['Compras', '3.02 - MATERIAIS - MATERIAL BRUTO DE CONSTRUCAO (CIMENTO, AREIA, BRITA E TIJOLO)'],
        ['Compras', '3.02 - MATERIAIS - MATERIAL INSTALACAO DE GAS'],
        ['Compras', '3.02 - MATERIAIS - PAVIMENTACAO'],
        ['Compras', '3.02 - MATERIAIS - PRE-MOLDADOS'],
        ['Compras', '3.02 - MATERIAIS - SINALIZACAO'],
        ['Compras', '3.02 - MATERIAIS - MATERIAL DE CLIMATIZACAO'],
        ['Compras', '3.02 - MATERIAIS - INSUMOS - CONCRETO'],
        ['Compras', '3.03 - PESSOAL - FARDAMENTOS'],
        ['Compras', '3.04 - SERVIÇOS TERCEIRIZADOS - ALUGUEL DE MAQUINAS E EQUIPAMENTOS'],
        ['Compras', '3.04 - SERVIÇOS TERCEIRIZADOS - IMPRESSAO E PLOTAGEM'],
        ['Compras', '3.04 - SERVIÇOS TERCEIRIZADOS - SERVICOS TOMADOS'],
        ['Compras', '3.04 - SERVIÇOS TERCEIRIZADOS - ABASTECIMENTO DE AGUA'],
        ['Compras', '3.04 - SERVIÇOS TERCEIRIZADOS - ESGOTAMENTO SANITARIO'],
        ['Compras', '3.04 - SERVIÇOS TERCEIRIZADOS - SEGURANCA DO TRABALHO'],
        ['Compras', '3.04 - SERVIÇOS TERCEIRIZADOS - REMOCAO DE ENTULHO'],
        ['Compras', '3.04 - SERVIÇOS TERCEIRIZADOS - MANUTENCAO DE MAQUINAS E EQUIPAMENTOS'],
        ['Compras', '3.04 - SERVIÇOS TERCEIRIZADOS - PODA/RETIRADA DE ARVORES'],
        ['Compras', '3.04 - SERVIÇOS TERCEIRIZADOS - PROJETOS DE ARQUITETURA / ENGENHARIA'],
        ['Compras', '3.04 - SERVIÇOS TERCEIRIZADOS - PRESTADORES DE SERVICO ENGENHARIA (PF / PJ)'],
        ['Compras', '3.04 - SERVIÇOS TERCEIRIZADOS - SERVIÇO DE INSTALACAO DE GAS'],
        ['Compras', '3.21 - DESPESAS FINANCEIRAS - MULTAS E JUROS DE MORA'],
        ['Compras', '3.22 - DESPESAS COM INVESTIMENTOS - COMPRA DE MAQUINAS E EQUIPAMENTOS'],
        ['Compras', '3.22 - DESPESAS COM INVESTIMENTOS - COMPRA DE COMPUTADORES E PERIFERICOS'],
        ['Compras', '3.02 - MATERIAIS - CAIXA - FUNDO FIXO'],
        ['Contratos', '3.05 - TAXAS E TARIFAS - SEGURO DE OBRA'],
        ['Contratos', '3.05 - TAXAS E TARIFAS - ART'],
        ['Contratos', '3.05 - TAXAS E TARIFAS - RRT CAU'],
        ['Contratos', '3.05 - TAXAS E TARIFAS - RRT CRA'],
        ['Contratos', '3.05 - TAXAS E TARIFAS - ANUIDADE CAU'],
        ['Contratos', '3.05 - TAXAS E TARIFAS - ANUIDADE CRA'],
        ['Contratos', '3.05 - TAXAS E TARIFAS - ANUIDADE CREA'],
        ['Contratos', '3.05 - TAXAS E TARIFAS - ATESTADO DE CAPACIDADE TECNICA / CAT'],
        ['Contratos', '3.05 - TAXAS E TARIFAS - TAXA DE LOCALIZACAO E FUNCIONAMENTO - ALVARA'],
        ['Contratos', '3.05 - TAXAS E TARIFAS - TAXAS E EMOLUMENTOS'],
        ['Contratos', '3.16 - TERCEIRIZADOS ADMINSTRATIVOS - ASSESSORIA JURIDICA NAO TRABALHISTA'],
        ['Licitações', '3.09 - COMERCIAL E LICITACAO - DESPESA COM LICITACAO'],
        ['Licitações', '3.16 - TERCEIRIZADOS ADMINSTRATIVOS - ASSESSORIA JURIDICA NAO TRABALHISTA'],
        ['Licitações', '3.09 - COMERCIAL E LICITACAO - SEGURO EM PROPOSTAS LICITATORIAS'],
        ['Almoxarifado', '3.02 - MATERIAIS - CAIXA - FUNDO FIXO'],
        ['Jurídico', '3.01 - UTILIDADES E PREDIAL - MATERIAL EXPEDIENTE E LIMPEZA'],
        ['Jurídico', '3.02 - MATERIAIS - CAIXA - FUNDO FIXO - OBRA'],
        ['Jurídico', '3.03 - PESSOAL - TERCEIRIZADOS PF'],
        ['Jurídico', '3.03 - PESSOAL - SALARIO'],
        ['Jurídico', '3.03 - PESSOAL - FERIAS'],
        ['Jurídico', '3.03 - PESSOAL - ACOES TRABALHISTAS/ INDENIZACOES/CUSTAS'],
        ['Jurídico', '3.03 - PESSOAL - INSS'],
        ['Jurídico', '3.03 - PESSOAL - FGTS'],
        ['Jurídico', '3.03 - PESSOAL - RESCISAO PESSOAL'],
        ['Jurídico', '3.03 - PESSOAL - CURSOS E TREINAMENTOS'],
        ['Jurídico', '3.03 - PESSOAL - SINDICATO'],
        ['Jurídico', '3.03 - PESSOAL - VIAGENS DE COLABORADORES - TRANSPORTE'],
        ['Jurídico', '3.03 - PESSOAL - VIAGENS DE COLABORADORES - HOSPEDAGEM E DIARIAS'],
        ['Jurídico', '3.03 - PESSOAL - VIAGENS DE COLABORADORES - ALIMENTACAO'],
        ['Jurídico', '3.05 - TAXAS E TARIFAS - SEGURO DE OBRA'],
        ['Jurídico', '3.05 - TAXAS E TARIFAS - ANUIDADE CAU'],
        ['Jurídico', '3.05 - TAXAS E TARIFAS - ANUIDADE CRA'],
        ['Jurídico', '3.05 - TAXAS E TARIFAS - ANUIDADE CREA'],
        ['Jurídico', '3.05 - TAXAS E TARIFAS - TAXAS E EMOLUMENTOS'],
        ['Jurídico', '3.05 - TAXAS E TARIFAS - CORREIOS'],
        ['Jurídico', '3.15 - TECNOLOGIA - LICENÇA E MENSALIDADE DE SOFTWARE'],
        ['Jurídico', '3.15 - TECNOLOGIA - MANUTENCAO DE HARDWARE / SOFTWARE'],
        ['Jurídico', '3.16 - TERCEIRIZADOS ADMINSTRATIVOS - ASSESSORIA JURIDICA TRABALHISTA'],
        ['Jurídico', '3.16 - TERCEIRIZADOS ADMINSTRATIVOS - CONTABILIDADE'],
        ['Jurídico', '3.16 - TERCEIRIZADOS ADMINSTRATIVOS - ASSESSORIA GERENCIAL'],
        ['Jurídico', '3.16 - TERCEIRIZADOS ADMINSTRATIVOS - ASSESSORIA JURIDICA NAO TRABALHISTA']
    ];
}
