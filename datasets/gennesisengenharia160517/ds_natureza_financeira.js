function defineStructure() {
    addColumn("IDENTIFICADOR", DatasetFieldType.STRING);
    addColumn("SETOR", DatasetFieldType.STRING);
    addColumn("CODTBORCAMENTO", DatasetFieldType.STRING);
    addColumn("DESCRICAO", DatasetFieldType.STRING);
    addColumn("NATUREZA", DatasetFieldType.STRING);
    setKey(["IDENTIFICADOR"]);
    addIndex(["IDENTIFICADOR", "NATUREZA"]);
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
    ds.addColumn("IDENTIFICADOR");
    ds.addColumn("SETOR");
    ds.addColumn("CODTBORCAMENTO");
    ds.addColumn("DESCRICAO");
    ds.addColumn("NATUREZA");

    var tempDataset = getDefaultValues(); // consulta a fonte de dados do dataset
    var setor;
    var natureza;
    var conta;

    if (constraints != null && constraints.length && constraints[0].fieldName != "sqlLimit") { //se tiver constraint filtra
        console.log("ds_natureza_financeira constraints:")
        console.dir(constraints);

        for (var index = 0; index < constraints.length; index++) {
            setor = constraints[index].fieldName == "SETOR" ? constraints[index].initialValue : setor; // Se o Setor for informado, é valor é atribuído a variável
            console.log('ds_natureza_financeira setor -> ' + setor);
            natureza = constraints[index].fieldName == "NATUREZA" ? constraints[index].initialValue : natureza; // Se a Natureza for informada, é valor é atribuído a variável
            console.log('ds_natureza_financeira natureza -> ' + natureza);
            conta = constraints[index].fieldName == "CONTA" ? constraints[index].initialValue : conta; // Se a conta for informada, é valor é atribuído a variável
        }
        /* Implemente o filtro que foi definido, somente 1 por consulta*/
        if (setor != undefined) {
            ds = getMatchValue(tempDataset, setor, 0);
        }
        else if (natureza != undefined) {
            ds = getMatchValue(tempDataset, natureza, 1)
        }
        else if (conta != undefined) {
            ds = getMatchValue(tempDataset, conta, 2)
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
    ds.addColumn("IDENTIFICADOR");
    ds.addColumn("SETOR");
    ds.addColumn("NATUREZA");
    ds.addColumn("DESCRICAO");
    ds.addColumn("FILTRO");
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
    return [["Faturamento-1.01.01.01", "Faturamento", "1.01.01.01", "RECEITA ", "1.01.01.01-RECEITA - CONSTRUCAO PREDIAL"],
    ["Faturamento-1.01.01.02", "Faturamento", "1.01.01.02", "RECEITA ", "1.01.01.02-RECEITA - MANUTENCAO"],
    ["Faturamento-1.01.01.03", "Faturamento", "1.01.01.03", "RECEITA ", "1.01.01.03-RECEITA - REFORMA PREDIAL"],
    ["Faturamento-1.01.01.04", "Faturamento", "1.01.01.04", "RECEITA ", "1.01.01.04-RECEITA - TERCEIRIZACAO MAO DE OBRA"],
    ["Faturamento-1.02.01.06", "Faturamento", "1.02.01.06", "REPASSE AO ADM ", "1.02.01.06-REPASSE AO ADM - ENTRADA"],
    ["Faturamento-1.06.01.02", "Faturamento", "1.06.01.02", "EMPRESTIMO ENTRE PROJETOS ", "1.06.01.02-EMPRESTIMO ENTRE PROJETOS - ENTRADA"],
    ["Faturamento-1.06.01.06", "Faturamento", "1.06.01.06", "EMPRESTIMO DE SOCIOS ", "1.06.01.06-EMPRESTIMO DE SOCIOS - ENTRADA"],
    ["Faturamento-2.01.01.01", "Faturamento", "2.01.01.01", "PIS", "2.01.01.01-PIS"],
    ["Faturamento-2.01.01.02", "Faturamento", "2.01.01.02", "COFINS", "2.01.01.02-COFINS"],
    ["Faturamento-2.01.01.03", "Faturamento", "2.01.01.03", "ISS", "2.01.01.03-ISS"],
    ["Faturamento-2.01.01.04", "Faturamento", "2.01.01.04", "IMPOSTO DE RENDA ", "2.01.01.04-IMPOSTO DE RENDA - IRPJ"],
    ["Faturamento-2.01.01.06", "Faturamento", "2.01.01.06", "CSLL", "2.01.01.06-CSLL"],
    ["Faturamento-2.01.01.07", "Faturamento", "2.01.01.07", "FAC PB ", "2.01.01.07-FAC PB - RETIDO"],
    ["Faturamento-2.01.01.08", "Faturamento", "2.01.01.08", "INSS ", "2.01.01.08-INSS - RETIDO"],
    ["Faturamento-2.01.01.09", "Faturamento", "2.01.01.09", "ISS ", "2.01.01.09-ISS - RETIDO"],
    ["Faturamento-2.02.01.01", "Faturamento", "2.02.01.01", "GLOSA", "2.02.01.01-GLOSA"],
    ["Faturamento-2.02.01.02", "Faturamento", "2.02.01.02", "RETENCAO CONTRATUAL", "2.02.01.02-RETENCAO CONTRATUAL"],
    ["Faturamento-3.10.01.01", "Faturamento", "3.10.01.01", "REPASSE AO ADM ", "3.10.01.01-REPASSE AO ADM - SAIDA"],
    ["Faturamento-3.23.01.03", "Faturamento", "3.23.01.03", "EMPRESTIMO ENTRE PROJETOS ", "3.23.01.03-EMPRESTIMO ENTRE PROJETOS - SAIDA"],
    ["Faturamento-3.23.01.07", "Faturamento", "3.23.01.07", "EMPRESTIMO DE SOCIOS ", "3.23.01.07-EMPRESTIMO DE SOCIOS - SAIDA"],
    ["Faturamento-1.03.01.03", "Faturamento", "1.03.01.03", "REVERSAO DE GLOSAS E RETENCOES", "1.03.01.03-REVERSAO DE GLOSAS E RETENCOES"],
    ["Faturamento-1.06.01.07", "Faturamento", "1.06.01.07", "APLICACAO FINANCEIRA ", "1.06.01.07-APLICACAO FINANCEIRA - ENTRADA"],
    ["Faturamento-1.06.01.08", "Faturamento", "1.06.01.08", "REEMBOLSO ENTRE CONTRATOS ", "1.06.01.08-REEMBOLSO ENTRE CONTRATOS - ENTRADA"],
    ["Financeiro-1.03.01.01", "Financeiro", "1.03.01.01", "DEVOLUCAO PAGAMENTO INDEVIDO", "1.03.01.01-DEVOLUCAO PAGAMENTO INDEVIDO"],
    ["Financeiro-1.03.01.02", "Financeiro", "1.03.01.02", "RESSARCIMENTO COLIGADA ", "1.03.01.02-RESSARCIMENTO COLIGADA - ENTRADA"],
    ["Financeiro-1.04.01.01", "Financeiro", "1.04.01.01", "RENDIMENTOS DE APLICACOES FINANCEIRAS", "1.04.01.01-RENDIMENTOS DE APLICACOES FINANCEIRAS"],
    ["Financeiro-1.06.01.04", "Financeiro", "1.06.01.04", "TRANSFERENCIA ", "1.06.01.04-TRANSFERENCIA - ENTRADA"],
    ["Financeiro-1.06.01.05", "Financeiro", "1.06.01.05", "EMPRESTIMO BANCARIO ", "1.06.01.05-EMPRESTIMO BANCARIO - ENTRADA"],
    ["Financeiro-3.05.01.09", "Financeiro", "3.05.01.09", "DESPESAS E TARIFAS BANCARIAS", "3.05.01.09-DESPESAS E TARIFAS BANCARIAS"],
    ["Financeiro-3.17.01.01", "Financeiro", "3.17.01.01", "REPASSE A PARCEIROS E CONSORCIADOS", "3.17.01.01-REPASSE A PARCEIROS E CONSORCIADOS"],
    ["Financeiro-3.20.01.01", "Financeiro", "3.20.01.01", "PAGAMENTO INDEVIDO", "3.20.01.01-PAGAMENTO INDEVIDO"],
    ["Financeiro-3.21.01.01", "Financeiro", "3.21.01.01", "MULTAS E JUROS DE MORA", "3.21.01.01-MULTAS E JUROS DE MORA"],
    ["Financeiro-3.21.01.02", "Financeiro", "3.21.01.02", "JUROS FINANCIAMENTOS", "3.21.01.02-JUROS FINANCIAMENTOS"],
    ["Financeiro-3.21.01.03", "Financeiro", "3.21.01.03", "IOF E OUTRAS DESPESAS DE FINANCIAMENTO", "3.21.01.03-IOF E OUTRAS DESPESAS DE FINANCIAMENTO"],
    ["Financeiro-3.22.01.01", "Financeiro", "3.22.01.01", "INVESTIMENTO EM IMOVEIS", "3.22.01.01-INVESTIMENTO EM IMOVEIS"],
    ["Financeiro-3.22.01.06", "Financeiro", "3.22.01.06", "AQUISICAO DE EMPRESAS", "3.22.01.06-AQUISICAO DE EMPRESAS"],
    ["Financeiro-3.23.01.01", "Financeiro", "3.23.01.01", "CONSORCIO", "3.23.01.01-CONSORCIO"],
    ["Financeiro-3.23.01.02", "Financeiro", "3.23.01.02", "EMPRESTIMO BANCARIO ", "3.23.01.02-EMPRESTIMO BANCARIO - SAIDA"],
    ["Financeiro-3.23.01.04", "Financeiro", "3.23.01.04", "TRANSFERENCIA ", "3.23.01.04-TRANSFERENCIA - SAIDA"],
    ["Financeiro-3.23.01.05", "Financeiro", "3.23.01.05", "DISTRIBUICAO DE LUCROS", "3.23.01.05-DISTRIBUICAO DE LUCROS"],
    ["Financeiro-3.23.01.06", "Financeiro", "3.23.01.06", "PARCELAMENTO DE TRIBUTOS", "3.23.01.06-PARCELAMENTO DE TRIBUTOS"],
    ["Financeiro-3.23.01.10", "Financeiro", "3.23.01.10", "REEMBOLSO ENTRE CONTRATOS ", "3.23.01.10-REEMBOLSO ENTRE CONTRATOS - SAIDA"],
    ["Financeiro-3.22.01.08", "Financeiro", "3.22.01.08", "APLICACAO FINANCEIRA ", "3.22.01.08-APLICACAO FINANCEIRA - SAIDA"],
    ["Financeiro-2.01.01.10", "Financeiro", "2.01.01.10", "SIMPLES NACIONAL", "2.01.01.10-SIMPLES NACIONAL"],
    ["Assistência Diretoria-1.02.01.03", "Assistência Diretoria", "1.02.01.03", "VENDAS DE SUCATAS", "1.02.01.03-VENDAS DE SUCATAS"],
    ["Assistência Diretoria-1.02.01.05", "Assistência Diretoria", "1.02.01.05", "ALUGUEL DE SALA", "1.02.01.05-ALUGUEL DE SALA"],
    ["Assistência Diretoria-1.05.01.01", "Assistência Diretoria", "1.05.01.01", "VENDA DE ATIVO PERMANENTE", "1.05.01.01-VENDA DE ATIVO PERMANENTE"],
    ["Assistência Diretoria-1.05.01.02", "Assistência Diretoria", "1.05.01.02", "OUTRAS RECEITAS NAO OPERACIONAIS", "1.05.01.02-OUTRAS RECEITAS NAO OPERACIONAIS"],
    ["Assistência Diretoria-3.01.01.01", "Assistência Diretoria", "3.01.01.01", "ENERGIA ELETRICA", "3.01.01.01-ENERGIA ELETRICA"],
    ["Assistência Diretoria-3.01.01.02", "Assistência Diretoria", "3.01.01.02", "AGUA E ESGOTO", "3.01.01.02-AGUA E ESGOTO"],
    ["Assistência Diretoria-3.01.01.03", "Assistência Diretoria", "3.01.01.03", "TELEFONE", "3.01.01.03-TELEFONE"],
    ["Assistência Diretoria-3.01.01.04", "Assistência Diretoria", "3.01.01.04", "INTERNET", "3.01.01.04-INTERNET"],
    ["Assistência Diretoria-3.01.01.05", "Assistência Diretoria", "3.01.01.05", "ALUGUEL E CONDOMINIO CASA OU CONTEINER CANTEIRO", "3.01.01.05-ALUGUEL E CONDOMINIO CASA OU CONTEINER CANTEIRO"],
    ["Assistência Diretoria-3.01.01.06", "Assistência Diretoria", "3.01.01.06", "MATERIAL CONSUMO", "3.01.01.06-MATERIAL CONSUMO"],
    ["Assistência Diretoria-3.01.01.07", "Assistência Diretoria", "3.01.01.07", "MATERIAL EXPEDIENTE", "3.01.01.07-MATERIAL EXPEDIENTE"],
    ["Assistência Diretoria-3.01.01.08", "Assistência Diretoria", "3.01.01.08", "MOVEIS E UTENSILIOS", "3.01.01.08-MOVEIS E UTENSILIOS"],
    ["Assistência Diretoria-3.01.01.10", "Assistência Diretoria", "3.01.01.10", "SEGURO IMOVEL", "3.01.01.10-SEGURO IMOVEL"],
    ["Assistência Diretoria-3.01.01.11", "Assistência Diretoria", "3.01.01.11", "SEGURANCA/VIGILANCIA", "3.01.01.11-SEGURANCA/VIGILANCIA"],
    ["Assistência Diretoria-3.01.01.12", "Assistência Diretoria", "3.01.01.12", "IPTU", "3.01.01.12-IPTU"],
    ["Assistência Diretoria-3.01.01.13", "Assistência Diretoria", "3.01.01.13", "MANUTENCAO PREDIAL", "3.01.01.13-MANUTENCAO PREDIAL"],
    ["Assistência Diretoria-3.03.01.08", "Assistência Diretoria", "3.03.01.08", "ACOES TRABALHISTAS/ INDENIZACOES/CUSTAS", "3.03.01.08-ACOES TRABALHISTAS/ INDENIZACOES/CUSTAS"],
    ["Assistência Diretoria-3.03.01.15", "Assistência Diretoria", "3.03.01.15", "DIARIAS", "3.03.01.15-DIARIAS"],
    ["Assistência Diretoria-3.03.01.18", "Assistência Diretoria", "3.03.01.18", "FARDAMENTOS", "3.03.01.18-FARDAMENTOS"],
    ["Assistência Diretoria-3.03.01.23", "Assistência Diretoria", "3.03.01.23", "COMPRA DE MEDICAMENTOS", "3.03.01.23-COMPRA DE MEDICAMENTOS"],
    ["Assistência Diretoria-3.03.01.25", "Assistência Diretoria", "3.03.01.25", "CURSOS E TREINAMENTOS", "3.03.01.25-CURSOS E TREINAMENTOS"],
    ["Assistência Diretoria-3.03.01.29", "Assistência Diretoria", "3.03.01.29", "FESTA E EVENTOS", "3.03.01.29-FESTA E EVENTOS"],
    ["Assistência Diretoria-3.03.01.33", "Assistência Diretoria", "3.03.01.33", "VIAGENS DE COLABORADORES ", "3.03.01.33-VIAGENS DE COLABORADORES - TRANSPORTE"],
    ["Assistência Diretoria-3.03.01.34", "Assistência Diretoria", "3.03.01.34", "VIAGENS DE COLABORADORES ", "3.03.01.34-VIAGENS DE COLABORADORES - HOSPEDAGEM E DIARIAS"],
    ["Assistência Diretoria-3.03.01.35", "Assistência Diretoria", "3.03.01.35", "VIAGENS DE COLABORADORES ", "3.03.01.35-VIAGENS DE COLABORADORES - ALIMENTACAO"],
    ["Assistência Diretoria-3.04.01.08", "Assistência Diretoria", "3.04.01.08", "SEGURANCA DO TRABALHO", "3.04.01.08-SEGURANCA DO TRABALHO"],
    ["Assistência Diretoria-3.09.01.01", "Assistência Diretoria", "3.09.01.01", "MARKETING E PUBLICIDADE", "3.09.01.01-MARKETING E PUBLICIDADE"],
    ["Assistência Diretoria-3.09.01.02", "Assistência Diretoria", "3.09.01.02", "PATROCINIO", "3.09.01.02-PATROCINIO"],
    ["Assistência Diretoria-3.15.01.01", "Assistência Diretoria", "3.15.01.01", "LICENÇA E MENSALIDADE DE SOFTWARE", "3.15.01.01-LICENÇA E MENSALIDADE DE SOFTWARE"],
    ["Assistência Diretoria-3.15.01.02", "Assistência Diretoria", "3.15.01.02", "MANUTENCAO DE HARDWARE / SOFTWARE", "3.15.01.02-MANUTENCAO DE HARDWARE / SOFTWARE"],
    ["Assistência Diretoria-3.15.01.03", "Assistência Diretoria", "3.15.01.03", "DESENVOLVIMENTO DE SOFTWARE", "3.15.01.03-DESENVOLVIMENTO DE SOFTWARE"],
    ["Assistência Diretoria-3.16.01.01", "Assistência Diretoria", "3.16.01.01", "ASSESSORIA JURIDICA TRABALHISTA", "3.16.01.01-ASSESSORIA JURIDICA TRABALHISTA"],
    ["Assistência Diretoria-3.16.01.02", "Assistência Diretoria", "3.16.01.02", "CONTABILIDADE", "3.16.01.02-CONTABILIDADE"],
    ["Assistência Diretoria-3.16.01.03", "Assistência Diretoria", "3.16.01.03", "ASSESSORIA GERENCIAL", "3.16.01.03-ASSESSORIA GERENCIAL"],
    ["Assistência Diretoria-3.16.01.05", "Assistência Diretoria", "3.16.01.05", "ASSESSORIA JURIDICA NAO TRABALHISTA", "3.16.01.05-ASSESSORIA JURIDICA NAO TRABALHISTA"],
    ["Assistência Diretoria-3.24.01.01", "Assistência Diretoria", "3.24.01.01", "PLANO DE SAUDE DIRETORIA", "3.24.01.01-PLANO DE SAUDE DIRETORIA"],
    ["Assistência Diretoria-3.24.01.02", "Assistência Diretoria", "3.24.01.02", "PLANO DENTARIO DIRETORIA", "3.24.01.02-PLANO DENTARIO DIRETORIA"],
    ["Assistência Diretoria-3.24.01.03", "Assistência Diretoria", "3.24.01.03", "PREVIDENCIA PRIVADA DA DIRETORIA", "3.24.01.03-PREVIDENCIA PRIVADA DA DIRETORIA"],
    ["Assistência Diretoria-3.24.01.04", "Assistência Diretoria", "3.24.01.04", "PRO", "3.24.01.04-PRO-LABORE"],
    ["Assistência Diretoria-3.24.01.05", "Assistência Diretoria", "3.24.01.05", "SEGURO PATRONAL DA DIRETORIA", "3.24.01.05-SEGURO PATRONAL DA DIRETORIA"],
    ["Assistência Diretoria-3.24.01.06", "Assistência Diretoria", "3.24.01.06", "AUXILIO ALIMENTAÇÃO DIRETORIA", "3.24.01.06-AUXILIO ALIMENTAÇÃO DIRETORIA"],
    ["Assistência Diretoria-3.24.01.07", "Assistência Diretoria", "3.24.01.07", "OUTROS BENEFICIOS DA DIRETORIA", "3.24.01.07-OUTROS BENEFICIOS DA DIRETORIA"],
    ["Assistência Diretoria-3.23.01.09", "Assistência Diretoria", "3.23.01.09", "REPASSES A DEMANDAS DA DIRETORIA", "3.23.01.09-REPASSES A DEMANDAS DA DIRETORIA"],
    ["Segurança Do Trabalho-3.01.01.01", "Segurança Do Trabalho", "3.01.01.01", "ENERGIA ELETRICA", "3.01.01.01-ENERGIA ELETRICA"],
    ["Segurança Do Trabalho-3.01.01.02", "Segurança Do Trabalho", "3.01.01.02", "AGUA E ESGOTO", "3.01.01.02-AGUA E ESGOTO"],
    ["Segurança Do Trabalho-3.01.01.03", "Segurança Do Trabalho", "3.01.01.03", "TELEFONE", "3.01.01.03-TELEFONE"],
    ["Segurança Do Trabalho-3.01.01.04", "Segurança Do Trabalho", "3.01.01.04", "INTERNET", "3.01.01.04-INTERNET"],
    ["Segurança Do Trabalho-3.01.01.05", "Segurança Do Trabalho", "3.01.01.05", "ALUGUEL E CONDOMINIO CASA OU CONTEINER CANTEIRO", "3.01.01.05-ALUGUEL E CONDOMINIO CASA OU CONTEINER CANTEIRO"],
    ["Segurança Do Trabalho-3.01.01.06", "Segurança Do Trabalho", "3.01.01.06", "MATERIAL CONSUMO", "3.01.01.06-MATERIAL CONSUMO"],
    ["Segurança Do Trabalho-3.01.01.07", "Segurança Do Trabalho", "3.01.01.07", "MATERIAL EXPEDIENTE", "3.01.01.07-MATERIAL EXPEDIENTE"],
    ["Segurança Do Trabalho-3.01.01.08", "Segurança Do Trabalho", "3.01.01.08", "MOVEIS E UTENSILIOS", "3.01.01.08-MOVEIS E UTENSILIOS"],
    ["Segurança Do Trabalho-3.01.01.10", "Segurança Do Trabalho", "3.01.01.10", "SEGURO IMOVEL", "3.01.01.10-SEGURO IMOVEL"],
    ["Segurança Do Trabalho-3.01.01.11", "Segurança Do Trabalho", "3.01.01.11", "SEGURANCA/VIGILANCIA", "3.01.01.11-SEGURANCA/VIGILANCIA"],
    ["Segurança Do Trabalho-3.01.01.12", "Segurança Do Trabalho", "3.01.01.12", "IPTU", "3.01.01.12-IPTU"],
    ["Segurança Do Trabalho-3.01.01.13", "Segurança Do Trabalho", "3.01.01.13", "MANUTENCAO PREDIAL", "3.01.01.13-MANUTENCAO PREDIAL"],
    ["Segurança Do Trabalho-3.05.01.12", "Segurança Do Trabalho", "3.05.01.12", "CORREIOS", "3.05.01.12-CORREIOS"],
    ["Departamento Pessoal-3.03.01.01", "Departamento Pessoal", "3.03.01.01", "RETENCAO DE INSS", "3.03.01.01-RETENCAO DE INSS"],
    ["Departamento Pessoal-3.03.01.04", "Departamento Pessoal", "3.03.01.04", "SALARIO", "3.03.01.04-SALARIO"],
    ["Departamento Pessoal-3.03.01.05", "Departamento Pessoal", "3.03.01.05", "FERIAS", "3.03.01.05-FERIAS"],
    ["Departamento Pessoal-3.03.01.06", "Departamento Pessoal", "3.03.01.06", "AUXILIO TRANSPORTE", "3.03.01.06-AUXILIO TRANSPORTE"],
    ["Departamento Pessoal-3.03.01.07", "Departamento Pessoal", "3.03.01.07", "13º SALARIO", "3.03.01.07-13º SALARIO"],
    ["Departamento Pessoal-3.03.01.08", "Departamento Pessoal", "3.03.01.08", "ACOES TRABALHISTAS/ INDENIZACOES/CUSTAS", "3.03.01.08-ACOES TRABALHISTAS/ INDENIZACOES/CUSTAS"],
    ["Departamento Pessoal-3.03.01.09", "Departamento Pessoal", "3.03.01.09", "INSS", "3.03.01.09-INSS"],
    ["Departamento Pessoal-3.03.01.10", "Departamento Pessoal", "3.03.01.10", "FGTS", "3.03.01.10-FGTS"],
    ["Departamento Pessoal-3.03.01.12", "Departamento Pessoal", "3.03.01.12", "RESCISAO PESSOAL", "3.03.01.12-RESCISAO PESSOAL"],
    ["Departamento Pessoal-3.03.01.14", "Departamento Pessoal", "3.03.01.14", "IMPOSTO DE RENDA S/ FOLHA", "3.03.01.14-IMPOSTO DE RENDA S/ FOLHA"],
    ["Departamento Pessoal-3.03.01.15", "Departamento Pessoal", "3.03.01.15", "DIARIAS", "3.03.01.15-DIARIAS"],
    ["Departamento Pessoal-3.03.01.16", "Departamento Pessoal", "3.03.01.16", "GRATIFICACOES/COMISSOES", "3.03.01.16-GRATIFICACOES/COMISSOES"],
    ["Departamento Pessoal-3.03.01.17", "Departamento Pessoal", "3.03.01.17", "ASO E EXAMES MEDICOS", "3.03.01.17-ASO E EXAMES MEDICOS"],
    ["Departamento Pessoal-3.03.01.18", "Departamento Pessoal", "3.03.01.18", "FARDAMENTOS", "3.03.01.18-FARDAMENTOS"],
    ["Departamento Pessoal-3.03.01.19", "Departamento Pessoal", "3.03.01.19", "PENSAO ALIMENTICIA", "3.03.01.19-PENSAO ALIMENTICIA"],
    ["Departamento Pessoal-3.03.01.20", "Departamento Pessoal", "3.03.01.20", "AUXILIO ALIMENTACAO", "3.03.01.20-AUXILIO ALIMENTACAO"],
    ["Departamento Pessoal-3.03.01.21", "Departamento Pessoal", "3.03.01.21", "PLANO DE SAUDE", "3.03.01.21-PLANO DE SAUDE"],
    ["Departamento Pessoal-3.03.01.22", "Departamento Pessoal", "3.03.01.22", "SEGURO FUNCIONARIOS", "3.03.01.22-SEGURO FUNCIONARIOS"],
    ["Departamento Pessoal-3.03.01.23", "Departamento Pessoal", "3.03.01.23", "COMPRA DE MEDICAMENTOS", "3.03.01.23-COMPRA DE MEDICAMENTOS"],
    ["Departamento Pessoal-3.03.01.24", "Departamento Pessoal", "3.03.01.24", "BONIFICACAO META", "3.03.01.24-BONIFICACAO META"],
    ["Departamento Pessoal-3.03.01.25", "Departamento Pessoal", "3.03.01.25", "CURSOS E TREINAMENTOS", "3.03.01.25-CURSOS E TREINAMENTOS"],
    ["Departamento Pessoal-3.03.01.26", "Departamento Pessoal", "3.03.01.26", "SINDICATO", "3.03.01.26-SINDICATO"],
    ["Departamento Pessoal-3.03.01.29", "Departamento Pessoal", "3.03.01.29", "FESTA E EVENTOS", "3.03.01.29-FESTA E EVENTOS"],
    ["Departamento Pessoal-3.03.01.30", "Departamento Pessoal", "3.03.01.30", "VALE REFEIÇÃO", "3.03.01.30-VALE REFEIÇÃO"],
    ["Departamento Pessoal-3.03.01.31", "Departamento Pessoal", "3.03.01.31", "VALE TRANSPORTE", "3.03.01.31-VALE TRANSPORTE"],
    ["Departamento Pessoal-3.03.01.32", "Departamento Pessoal", "3.03.01.32", "SALARIOS E ENCARGOS ", "3.03.01.32-SALARIOS E ENCARGOS - COLIGADA"],
    ["Departamento Pessoal-3.08.01.03", "Departamento Pessoal", "3.08.01.03", "CAIXA ", "3.08.01.03-CAIXA - FUNDO FIXO ADM DP"],
    ["Departamento Pessoal-3.03.01.33", "Departamento Pessoal", "3.03.01.33", "VIAGENS DE COLABORADORES ", "3.03.01.33-VIAGENS DE COLABORADORES - TRANSPORTE"],
    ["Departamento Pessoal-3.03.01.34", "Departamento Pessoal", "3.03.01.34", "VIAGENS DE COLABORADORES ", "3.03.01.34-VIAGENS DE COLABORADORES - HOSPEDAGEM E DIARIAS"],
    ["Departamento Pessoal-3.03.01.35", "Departamento Pessoal", "3.03.01.35", "VIAGENS DE COLABORADORES ", "3.03.01.35-VIAGENS DE COLABORADORES - ALIMENTACAO"],
    ["Departamento Pessoal-3.03.01.36", "Departamento Pessoal", "3.03.01.36", "BOLSAS E OUTROS GASTOS COM ESTAGIARIOS", "3.03.01.36-BOLSAS E OUTROS GASTOS COM ESTAGIARIOS"],
    ["Departamento Pessoal-3.03.01.28", "Departamento Pessoal", "3.03.01.28", "DISTRATO DE CONTRATO PRESTADOR", "3.03.01.28-DISTRATO DE CONTRATO PRESTADOR"],
    ["Departamento Pessoal-3.03.01.03", "Departamento Pessoal", "3.03.01.03", "TERCEIRIZADOS PF", "3.03.01.03-TERCEIRIZADOS PF"],
    ["Departamento Pessoal-3.03.01.37", "Departamento Pessoal", "3.03.01.37", "ADIANTAMENTO SALARIAL", "3.03.01.37-ADIANTAMENTO SALARIAL"],
    ["Departamento Pessoal-3.03.01.38", "Departamento Pessoal", "3.03.01.38", "ACRESCIMOS (PESSOAL)", "3.03.01.38-ACRESCIMOS (PESSOAL)"],
    ["RH-3.03.01.01", "RH", "3.03.01.01", "RETENCAO DE INSS", "3.03.01.01-RETENCAO DE INSS"],
    ["RH-3.03.01.04", "RH", "3.03.01.04", "SALARIO", "3.03.01.04-SALARIO"],
    ["RH-3.03.01.05", "RH", "3.03.01.05", "FERIAS", "3.03.01.05-FERIAS"],
    ["RH-3.03.01.06", "RH", "3.03.01.06", "AUXILIO TRANSPORTE", "3.03.01.06-AUXILIO TRANSPORTE"],
    ["RH-3.03.01.07", "RH", "3.03.01.07", "13º SALARIO", "3.03.01.07-13º SALARIO"],
    ["RH-3.03.01.08", "RH", "3.03.01.08", "ACOES TRABALHISTAS/ INDENIZACOES/CUSTAS", "3.03.01.08-ACOES TRABALHISTAS/ INDENIZACOES/CUSTAS"],
    ["RH-3.03.01.09", "RH", "3.03.01.09", "INSS", "3.03.01.09-INSS"],
    ["RH-3.03.01.10", "RH", "3.03.01.10", "FGTS", "3.03.01.10-FGTS"],
    ["RH-3.03.01.12", "RH", "3.03.01.12", "RESCISAO PESSOAL", "3.03.01.12-RESCISAO PESSOAL"],
    ["RH-3.03.01.14", "RH", "3.03.01.14", "IMPOSTO DE RENDA S/ FOLHA", "3.03.01.14-IMPOSTO DE RENDA S/ FOLHA"],
    ["RH-3.03.01.15", "RH", "3.03.01.15", "DIARIAS", "3.03.01.15-DIARIAS"],
    ["RH-3.03.01.16", "RH", "3.03.01.16", "GRATIFICACOES/COMISSOES", "3.03.01.16-GRATIFICACOES/COMISSOES"],
    ["RH-3.03.01.17", "RH", "3.03.01.17", "ASO E EXAMES MEDICOS", "3.03.01.17-ASO E EXAMES MEDICOS"],
    ["RH-3.03.01.18", "RH", "3.03.01.18", "FARDAMENTOS", "3.03.01.18-FARDAMENTOS"],
    ["RH-3.03.01.19", "RH", "3.03.01.19", "PENSAO ALIMENTICIA", "3.03.01.19-PENSAO ALIMENTICIA"],
    ["RH-3.03.01.20", "RH", "3.03.01.20", "AUXILIO ALIMENTACAO", "3.03.01.20-AUXILIO ALIMENTACAO"],
    ["RH-3.03.01.21", "RH", "3.03.01.21", "PLANO DE SAUDE", "3.03.01.21-PLANO DE SAUDE"],
    ["RH-3.03.01.22", "RH", "3.03.01.22", "SEGURO FUNCIONARIOS", "3.03.01.22-SEGURO FUNCIONARIOS"],
    ["RH-3.03.01.23", "RH", "3.03.01.23", "COMPRA DE MEDICAMENTOS", "3.03.01.23-COMPRA DE MEDICAMENTOS"],
    ["RH-3.03.01.24", "RH", "3.03.01.24", "BONIFICACAO META", "3.03.01.24-BONIFICACAO META"],
    ["RH-3.03.01.25", "RH", "3.03.01.25", "CURSOS E TREINAMENTOS", "3.03.01.25-CURSOS E TREINAMENTOS"],
    ["RH-3.03.01.26", "RH", "3.03.01.26", "SINDICATO", "3.03.01.26-SINDICATO"],
    ["RH-3.03.01.29", "RH", "3.03.01.29", "FESTA E EVENTOS", "3.03.01.29-FESTA E EVENTOS"],
    ["RH-3.03.01.30", "RH", "3.03.01.30", "VALE REFEIÇÃO", "3.03.01.30-VALE REFEIÇÃO"],
    ["RH-3.03.01.31", "RH", "3.03.01.31", "VALE TRANSPORTE", "3.03.01.31-VALE TRANSPORTE"],
    ["RH-3.03.01.32", "RH", "3.03.01.32", "SALARIOS E ENCARGOS ", "3.03.01.32-SALARIOS E ENCARGOS - COLIGADA"],
    ["RH-3.03.01.33", "RH", "3.03.01.33", "VIAGENS DE COLABORADORES ", "3.03.01.33-VIAGENS DE COLABORADORES - TRANSPORTE"],
    ["RH-3.03.01.34", "RH", "3.03.01.34", "VIAGENS DE COLABORADORES ", "3.03.01.34-VIAGENS DE COLABORADORES - HOSPEDAGEM E DIARIAS"],
    ["RH-3.03.01.35", "RH", "3.03.01.35", "VIAGENS DE COLABORADORES ", "3.03.01.35-VIAGENS DE COLABORADORES - ALIMENTACAO"],
    ["RH-3.08.01.03", "RH", "3.08.01.03", "CAIXA ", "3.08.01.03-CAIXA - FUNDO FIXO ADM DP"],
    ["RH-3.03.01.36", "RH", "3.03.01.36", "BOLSAS E OUTROS GASTOS COM ESTAGIARIOS", "3.03.01.36-BOLSAS E OUTROS GASTOS COM ESTAGIARIOS"],
    ["Engenharia-3.01.01.01", "Engenharia", "3.01.01.01", "ENERGIA ELETRICA", "3.01.01.01-ENERGIA ELETRICA"],
    ["Engenharia-3.01.01.02", "Engenharia", "3.01.01.02", "AGUA E ESGOTO", "3.01.01.02-AGUA E ESGOTO"],
    ["Engenharia-3.01.01.03", "Engenharia", "3.01.01.03", "TELEFONE", "3.01.01.03-TELEFONE"],
    ["Engenharia-3.01.01.04", "Engenharia", "3.01.01.04", "INTERNET", "3.01.01.04-INTERNET"],
    ["Engenharia-3.01.01.05", "Engenharia", "3.01.01.05", "ALUGUEL E CONDOMINIO CASA OU CONTEINER CANTEIRO", "3.01.01.05-ALUGUEL E CONDOMINIO CASA OU CONTEINER CANTEIRO"],
    ["Engenharia-3.01.01.06", "Engenharia", "3.01.01.06", "MATERIAL CONSUMO", "3.01.01.06-MATERIAL CONSUMO"],
    ["Engenharia-3.01.01.07", "Engenharia", "3.01.01.07", "MATERIAL EXPEDIENTE", "3.01.01.07-MATERIAL EXPEDIENTE"],
    ["Engenharia-3.02.01.18", "Engenharia", "3.02.01.18", "COMBUSTIVEL PARA EQUIPAMENTOS", "3.02.01.18-COMBUSTIVEL PARA EQUIPAMENTOS"],
    ["Engenharia-3.02.01.21", "Engenharia", "3.02.01.21", "CAIXA ", "3.02.01.21-CAIXA - FUNDO FIXO OBRA"],
    ["Engenharia-3.03.01.03", "Engenharia", "3.03.01.03", "TERCEIRIZADOS PF", "3.03.01.03-TERCEIRIZADOS PF"],
    ["Engenharia-3.03.01.15", "Engenharia", "3.03.01.15", "DIARIAS", "3.03.01.15-DIARIAS"],
    ["Engenharia-3.03.01.28", "Engenharia", "3.03.01.28", "DISTRATO DE CONTRATO PRESTADOR", "3.03.01.28-DISTRATO DE CONTRATO PRESTADOR"],
    ["Engenharia-3.03.01.32", "Engenharia", "3.03.01.32", "SALARIOS E ENCARGOS ", "3.03.01.32-SALARIOS E ENCARGOS - COLIGADA"],
    ["Engenharia-3.04.01.02", "Engenharia", "3.04.01.02", "ALUGUEL DE MAQUINAS E EQUIPAMENTOS ", "3.04.01.02-ALUGUEL DE MAQUINAS E EQUIPAMENTOS - OBRA"],
    ["Engenharia-3.04.01.03", "Engenharia", "3.04.01.03", "IMPRESSAO E PLOTAGEM", "3.04.01.03-IMPRESSAO E PLOTAGEM"],
    ["Engenharia-3.04.01.04", "Engenharia", "3.04.01.04", "SERVICOS TOMADOS", "3.04.01.04-SERVICOS TOMADOS"],
    ["Engenharia-3.04.01.05", "Engenharia", "3.04.01.05", "ABASTECIMENTO DE AGUA", "3.04.01.05-ABASTECIMENTO DE AGUA"],
    ["Engenharia-3.04.01.06", "Engenharia", "3.04.01.06", "ESGOTAMENTO SANITARIO", "3.04.01.06-ESGOTAMENTO SANITARIO"],
    ["Engenharia-3.04.01.09", "Engenharia", "3.04.01.09", "REMOCAO DE ENTULHO", "3.04.01.09-REMOCAO DE ENTULHO"],
    ["Engenharia-3.04.01.11", "Engenharia", "3.04.01.11", "MANUTENCAO DE MAQUINAS E EQUIPAMENTOS", "3.04.01.11-MANUTENCAO DE MAQUINAS E EQUIPAMENTOS"],
    ["Engenharia-3.04.01.12", "Engenharia", "3.04.01.12", "PODA/RETIRADA DE ARVORES", "3.04.01.12-PODA/RETIRADA DE ARVORES"],
    ["Engenharia-3.04.01.13", "Engenharia", "3.04.01.13", "PROJETOS DE ARQUITETURA / ENGENHARIA", "3.04.01.13-PROJETOS DE ARQUITETURA / ENGENHARIA"],
    ["Engenharia-3.04.01.14", "Engenharia", "3.04.01.14", "PRESTADORES DE SERVICO ENGENHARIA (PF / PJ)", "3.04.01.14-PRESTADORES DE SERVICO ENGENHARIA (PF / PJ)"],
    ["Engenharia-3.04.01.15", "Engenharia", "3.04.01.15", "SERVICO INSTALACAO DE GAS", "3.04.01.15-SERVICO INSTALACAO DE GAS"],
    ["Engenharia-3.05.01.02", "Engenharia", "3.05.01.02", "ART", "3.05.01.02-ART"],
    ["Engenharia-3.05.01.03", "Engenharia", "3.05.01.03", "RRT CAU", "3.05.01.03-RRT CAU"],
    ["Engenharia-3.05.01.04", "Engenharia", "3.05.01.04", "RRT CRA", "3.05.01.04-RRT CRA"],
    ["Engenharia-3.05.01.05", "Engenharia", "3.05.01.05", "ANUIDADE CAU", "3.05.01.05-ANUIDADE CAU"],
    ["Engenharia-3.05.01.06", "Engenharia", "3.05.01.06", "ANUIDADE CRA", "3.05.01.06-ANUIDADE CRA"],
    ["Engenharia-3.05.01.07", "Engenharia", "3.05.01.07", "ANUIDADE CREA", "3.05.01.07-ANUIDADE CREA"],
    ["Engenharia-3.05.01.08", "Engenharia", "3.05.01.08", "ATESTADO DE CAPACIDADE TECNICA / CAT", "3.05.01.08-ATESTADO DE CAPACIDADE TECNICA / CAT"],
    ["Compras-1.03.01.01", "Compras", "1.03.01.01", "DEVOLUCAO PAGAMENTO INDEVIDO", "1.03.01.01-DEVOLUCAO PAGAMENTO INDEVIDO"],
    ["Compras-3.02.01.01", "Compras", "3.02.01.01", "INSUMOS ", "3.02.01.01-INSUMOS - VIDRACARIA"],
    ["Compras-3.02.01.02", "Compras", "3.02.01.02", "INSUMOS ", "3.02.01.02-INSUMOS - SERRALHERIA E FERRAGENS"],
    ["Compras-3.02.01.03", "Compras", "3.02.01.03", "INSUMOS ", "3.02.01.03-INSUMOS - MARCENARIA"],
    ["Compras-3.02.01.04", "Compras", "3.02.01.04", "INSUMOS ", "3.02.01.04-INSUMOS - ELETRICA"],
    ["Compras-3.02.01.05", "Compras", "3.02.01.05", "INSUMOS ", "3.02.01.05-INSUMOS - TELECOMUNICACOES"],
    ["Compras-3.02.01.06", "Compras", "3.02.01.06", "INSUMOS ", "3.02.01.06-INSUMOS - HIDRAULICA"],
    ["Compras-3.02.01.07", "Compras", "3.02.01.07", "INSUMOS ", "3.02.01.07-INSUMOS - ALVENARIA"],
    ["Compras-3.02.01.08", "Compras", "3.02.01.08", "INSUMOS ", "3.02.01.08-INSUMOS - IMPERMEABILIZACAO"],
    ["Compras-3.02.01.09", "Compras", "3.02.01.09", "INSUMOS ", "3.02.01.09-INSUMOS - PINTURA"],
    ["Compras-3.02.01.10", "Compras", "3.02.01.10", "INSUMOS ", "3.02.01.10-INSUMOS - EPI / EPC"],
    ["Compras-3.02.01.11", "Compras", "3.02.01.11", "INSUMOS ", "3.02.01.11-INSUMOS - PAISAGISMO"],
    ["Compras-3.02.01.12", "Compras", "3.02.01.12", "INSUMOS ", "3.02.01.12-INSUMOS - MADEIRAMENTO"],
    ["Compras-3.02.01.13", "Compras", "3.02.01.13", "INSUMOS ", "3.02.01.13-INSUMOS - FERRAMENTAS EQUIP E MAQ"],
    ["Compras-3.02.01.14", "Compras", "3.02.01.14", "INSUMOS ", "3.02.01.14-INSUMOS - REVESTIMENTOS"],
    ["Compras-3.02.01.15", "Compras", "3.02.01.15", "INSUMOS ", "3.02.01.15-INSUMOS - FORRO"],
    ["Compras-3.02.01.16", "Compras", "3.02.01.16", "INSUMOS ", "3.02.01.16-INSUMOS - MATERIAL DE LIMPEZA DE OBRA"],
    ["Compras-3.02.01.17", "Compras", "3.02.01.17", "INSUMOS ", "3.02.01.17-INSUMOS - CONTROLE DE PRAGAS"],
    ["Compras-3.02.01.18", "Compras", "3.02.01.18", "COMBUSTIVEL PARA EQUIPAMENTOS", "3.02.01.18-COMBUSTIVEL PARA EQUIPAMENTOS"],
    ["Compras-3.02.01.19", "Compras", "3.02.01.19", "ICMS ", "3.02.01.19-ICMS - DIFAL"],
    ["Compras-3.02.01.20", "Compras", "3.02.01.20", "FRETE SOBRE COMPRAS", "3.02.01.20-FRETE SOBRE COMPRAS"],
    ["Compras-3.02.01.21", "Compras", "3.02.01.21", "CAIXA ", "3.02.01.21-CAIXA - FUNDO FIXO OBRA"],
    ["Compras-3.02.01.22", "Compras", "3.02.01.22", "COBERTURA/CALHA", "3.02.01.22-COBERTURA/CALHA"],
    ["Compras-3.02.01.24", "Compras", "3.02.01.24", "DIVISORIAS", "3.02.01.24-DIVISORIAS"],
    ["Compras-3.02.01.25", "Compras", "3.02.01.25", "ESQUADRIAS (EXCETO FERRO)", "3.02.01.25-ESQUADRIAS (EXCETO FERRO)"],
    ["Compras-3.02.01.26", "Compras", "3.02.01.26", "ESQUADRIAS DE FERRO", "3.02.01.26-ESQUADRIAS DE FERRO"],
    ["Compras-3.02.01.27", "Compras", "3.02.01.27", "LOUCAS E METAIS", "3.02.01.27-LOUCAS E METAIS"],
    ["Compras-3.02.01.28", "Compras", "3.02.01.28", "MARMORE/GRANITO", "3.02.01.28-MARMORE/GRANITO"],
    ["Compras-3.02.01.29", "Compras", "3.02.01.29", "MATERIAL BRUTO DE CONSTRUCAO (CIMENTO, AREIA, BRITA E TIJOLO)", "3.02.01.29-MATERIAL BRUTO DE CONSTRUCAO (CIMENTO, AREIA, BRITA E TIJOLO)"],
    ["Compras-3.02.01.30", "Compras", "3.02.01.30", "MATERIAL INSTALACAO DE GAS", "3.02.01.30-MATERIAL INSTALACAO DE GAS"],
    ["Compras-3.02.01.31", "Compras", "3.02.01.31", "PAVIMENTACAO", "3.02.01.31-PAVIMENTACAO"],
    ["Compras-3.02.01.32", "Compras", "3.02.01.32", "PRE", "3.02.01.32-PRE-MOLDADOS"],
    ["Compras-3.02.01.33", "Compras", "3.02.01.33", "SINALIZACAO", "3.02.01.33-SINALIZACAO"],
    ["Compras-3.02.01.34", "Compras", "3.02.01.34", "MATERIAL DE CLIMATIZACAO", "3.02.01.34-MATERIAL DE CLIMATIZACAO"],
    ["Compras-3.02.01.35", "Compras", "3.02.01.35", "INSUMOS ", "3.02.01.35-INSUMOS - CONCRETO"],
    ["Compras-3.03.01.18", "Compras", "3.03.01.18", "FARDAMENTOS", "3.03.01.18-FARDAMENTOS"],
    ["Compras-3.04.01.02", "Compras", "3.04.01.02", "ALUGUEL DE MAQUINAS E EQUIPAMENTOS ", "3.04.01.02-ALUGUEL DE MAQUINAS E EQUIPAMENTOS - OBRA"],
    ["Compras-3.04.01.03", "Compras", "3.04.01.03", "IMPRESSAO E PLOTAGEM", "3.04.01.03-IMPRESSAO E PLOTAGEM"],
    ["Compras-3.04.01.04", "Compras", "3.04.01.04", "SERVICOS TOMADOS", "3.04.01.04-SERVICOS TOMADOS"],
    ["Compras-3.04.01.05", "Compras", "3.04.01.05", "ABASTECIMENTO DE AGUA", "3.04.01.05-ABASTECIMENTO DE AGUA"],
    ["Compras-3.04.01.06", "Compras", "3.04.01.06", "ESGOTAMENTO SANITARIO", "3.04.01.06-ESGOTAMENTO SANITARIO"],
    ["Compras-3.04.01.08", "Compras", "3.04.01.08", "SEGURANCA DO TRABALHO", "3.04.01.08-SEGURANCA DO TRABALHO"],
    ["Compras-3.04.01.09", "Compras", "3.04.01.09", "REMOCAO DE ENTULHO", "3.04.01.09-REMOCAO DE ENTULHO"],
    ["Compras-3.04.01.11", "Compras", "3.04.01.11", "MANUTENCAO DE MAQUINAS E EQUIPAMENTOS", "3.04.01.11-MANUTENCAO DE MAQUINAS E EQUIPAMENTOS"],
    ["Compras-3.04.01.12", "Compras", "3.04.01.12", "PODA/RETIRADA DE ARVORES", "3.04.01.12-PODA/RETIRADA DE ARVORES"],
    ["Compras-3.04.01.13", "Compras", "3.04.01.13", "PROJETOS DE ARQUITETURA / ENGENHARIA", "3.04.01.13-PROJETOS DE ARQUITETURA / ENGENHARIA"],
    ["Compras-3.04.01.14", "Compras", "3.04.01.14", "PRESTADORES DE SERVICO ENGENHARIA (PF / PJ)", "3.04.01.14-PRESTADORES DE SERVICO ENGENHARIA (PF / PJ)"],
    ["Compras-3.04.01.15", "Compras", "3.04.01.15", "SERVICO INSTALACAO DE GAS", "3.04.01.15-SERVICO INSTALACAO DE GAS"],
    ["Compras-3.21.01.01", "Compras", "3.21.01.01", "MULTAS E JUROS DE MORA", "3.21.01.01-MULTAS E JUROS DE MORA"],
    ["Compras-3.22.01.04", "Compras", "3.22.01.04", "COMPRA DE MAQUINAS E EQUIPAMENTOS", "3.22.01.04-COMPRA DE MAQUINAS E EQUIPAMENTOS"],
    ["Compras-3.22.01.05", "Compras", "3.22.01.05", "COMPRA DE COMPUTADORES E PERIFERICOS", "3.22.01.05-COMPRA DE COMPUTADORES E PERIFERICOS"],
    ["Compras-3.04.01.10", "Compras", "3.04.01.10", "LOCACAO DE MAQUINAS E EQUPAMENTOS ", "3.04.01.10-LOCACAO DE MAQUINAS E EQUPAMENTOS - MANUTENCAO"],
    ["Compras-3.04.01.16", "Compras", "3.04.01.16", "CONFECCAO DE PERSIANAS", "3.04.01.16-CONFECCAO DE PERSIANAS"],
    ["Compras-3.04.01.17", "Compras", "3.04.01.17", "RECARGA DE EXTINTORES", "3.04.01.17-RECARGA DE EXTINTORES"],
    ["Contratos-3.05.01.01", "Contratos", "3.05.01.01", "SEGURO DE OBRA", "3.05.01.01-SEGURO DE OBRA"],
    ["Contratos-3.05.01.02", "Contratos", "3.05.01.02", "ART", "3.05.01.02-ART"],
    ["Contratos-3.05.01.03", "Contratos", "3.05.01.03", "RRT CAU", "3.05.01.03-RRT CAU"],
    ["Contratos-3.05.01.04", "Contratos", "3.05.01.04", "RRT CRA", "3.05.01.04-RRT CRA"],
    ["Contratos-3.05.01.05", "Contratos", "3.05.01.05", "ANUIDADE CAU", "3.05.01.05-ANUIDADE CAU"],
    ["Contratos-3.05.01.06", "Contratos", "3.05.01.06", "ANUIDADE CRA", "3.05.01.06-ANUIDADE CRA"],
    ["Contratos-3.05.01.07", "Contratos", "3.05.01.07", "ANUIDADE CREA", "3.05.01.07-ANUIDADE CREA"],
    ["Contratos-3.05.01.08", "Contratos", "3.05.01.08", "ATESTADO DE CAPACIDADE TECNICA / CAT", "3.05.01.08-ATESTADO DE CAPACIDADE TECNICA / CAT"],
    ["Contratos-3.05.01.10", "Contratos", "3.05.01.10", "TAXA DE LOCALIZACAO E FUNCIONAMENTO ", "3.05.01.10-TAXA DE LOCALIZACAO E FUNCIONAMENTO - ALVARA"],
    ["Contratos-3.05.01.11", "Contratos", "3.05.01.11", "TAXAS E EMOLUMENTOS", "3.05.01.11-TAXAS E EMOLUMENTOS"],
    ["Contratos-3.16.01.05", "Contratos", "3.16.01.05", "ASSESSORIA JURIDICA NAO TRABALHISTA", "3.16.01.05-ASSESSORIA JURIDICA NAO TRABALHISTA"],
    ["Licitações-3.09.01.03", "Licitações", "3.09.01.03", "DESPESA COM LICITACAO", "3.09.01.03-DESPESA COM LICITACAO"],
    ["Licitações-3.16.01.05", "Licitações", "3.16.01.05", "ASSESSORIA JURIDICA NAO TRABALHISTA", "3.16.01.05-ASSESSORIA JURIDICA NAO TRABALHISTA"],
    ["Licitações-3.09.01.04", "Licitações", "3.09.01.04", "SEGURO EM PROPOSTAS LICITATORIAS", "3.09.01.04-SEGURO EM PROPOSTAS LICITATORIAS"],
    ["Jurídico-3.01.01.07", "Jurídico", "3.01.01.07", "MATERIAL EXPEDIENTE", "3.01.01.07-MATERIAL EXPEDIENTE"],
    ["Jurídico-3.03.01.03", "Jurídico", "3.03.01.03", "TERCEIRIZADOS PF", "3.03.01.03-TERCEIRIZADOS PF"],
    ["Jurídico-3.03.01.04", "Jurídico", "3.03.01.04", "SALARIO", "3.03.01.04-SALARIO"],
    ["Jurídico-3.03.01.05", "Jurídico", "3.03.01.05", "FERIAS", "3.03.01.05-FERIAS"],
    ["Jurídico-3.03.01.08", "Jurídico", "3.03.01.08", "ACOES TRABALHISTAS/ INDENIZACOES/CUSTAS", "3.03.01.08-ACOES TRABALHISTAS/ INDENIZACOES/CUSTAS"],
    ["Jurídico-3.03.01.09", "Jurídico", "3.03.01.09", "INSS", "3.03.01.09-INSS"],
    ["Jurídico-3.03.01.10", "Jurídico", "3.03.01.10", "FGTS", "3.03.01.10-FGTS"],
    ["Jurídico-3.03.01.12", "Jurídico", "3.03.01.12", "RESCISAO PESSOAL", "3.03.01.12-RESCISAO PESSOAL"],
    ["Jurídico-3.03.01.25", "Jurídico", "3.03.01.25", "CURSOS E TREINAMENTOS", "3.03.01.25-CURSOS E TREINAMENTOS"],
    ["Jurídico-3.03.01.26", "Jurídico", "3.03.01.26", "SINDICATO", "3.03.01.26-SINDICATO"],
    ["Jurídico-3.03.01.33", "Jurídico", "3.03.01.33", "VIAGENS DE COLABORADORES ", "3.03.01.33-VIAGENS DE COLABORADORES - TRANSPORTE"],
    ["Jurídico-3.03.01.34", "Jurídico", "3.03.01.34", "VIAGENS DE COLABORADORES ", "3.03.01.34-VIAGENS DE COLABORADORES - HOSPEDAGEM E DIARIAS"],
    ["Jurídico-3.03.01.35", "Jurídico", "3.03.01.35", "VIAGENS DE COLABORADORES ", "3.03.01.35-VIAGENS DE COLABORADORES - ALIMENTACAO"],
    ["Jurídico-3.05.01.01", "Jurídico", "3.05.01.01", "SEGURO DE OBRA", "3.05.01.01-SEGURO DE OBRA"],
    ["Jurídico-3.05.01.05", "Jurídico", "3.05.01.05", "ANUIDADE CAU", "3.05.01.05-ANUIDADE CAU"],
    ["Jurídico-3.05.01.06", "Jurídico", "3.05.01.06", "ANUIDADE CRA", "3.05.01.06-ANUIDADE CRA"],
    ["Jurídico-3.05.01.07", "Jurídico", "3.05.01.07", "ANUIDADE CREA", "3.05.01.07-ANUIDADE CREA"],
    ["Jurídico-3.05.01.11", "Jurídico", "3.05.01.11", "TAXAS E EMOLUMENTOS", "3.05.01.11-TAXAS E EMOLUMENTOS"],
    ["Jurídico-3.05.01.12", "Jurídico", "3.05.01.12", "CORREIOS", "3.05.01.12-CORREIOS"],
    ["Jurídico-3.15.01.01", "Jurídico", "3.15.01.01", "LICENÇA E MENSALIDADE DE SOFTWARE", "3.15.01.01-LICENÇA E MENSALIDADE DE SOFTWARE"],
    ["Jurídico-3.15.01.02", "Jurídico", "3.15.01.02", "MANUTENCAO DE HARDWARE / SOFTWARE", "3.15.01.02-MANUTENCAO DE HARDWARE / SOFTWARE"],
    ["Jurídico-3.16.01.01", "Jurídico", "3.16.01.01", "ASSESSORIA JURIDICA TRABALHISTA", "3.16.01.01-ASSESSORIA JURIDICA TRABALHISTA"],
    ["Jurídico-3.16.01.02", "Jurídico", "3.16.01.02", "CONTABILIDADE", "3.16.01.02-CONTABILIDADE"],
    ["Jurídico-3.16.01.03", "Jurídico", "3.16.01.03", "ASSESSORIA GERENCIAL", "3.16.01.03-ASSESSORIA GERENCIAL"],
    ["Jurídico-3.16.01.05", "Jurídico", "3.16.01.05", "ASSESSORIA JURIDICA NAO TRABALHISTA", "3.16.01.05-ASSESSORIA JURIDICA NAO TRABALHISTA"],
    ["Logística-3.04.01.07", "Logística", "3.04.01.07", "FRETES E CARREGOS", "3.04.01.07-FRETES E CARREGOS"],
    ["Logística-3.02.01.20", "Logística", "3.02.01.20", "FRETE SOBRE COMPRAS", "3.02.01.20-FRETE SOBRE COMPRAS"],
    ["Logística-3.02.01.18", "Logística", "3.02.01.18", "COMBUSTIVEL PARA EQUIPAMENTOS", "3.02.01.18-COMBUSTIVEL PARA EQUIPAMENTOS"],
    ["Logística-3.04.01.02", "Logística", "3.04.01.02", "ALUGUEL DE MAQUINAS E EQUIPAMENTOS ", "3.04.01.02-ALUGUEL DE MAQUINAS E EQUIPAMENTOS - OBRA"],
    ["Logística-3.04.01.11", "Logística", "3.04.01.11", "MANUTENCAO DE MAQUINAS E EQUIPAMENTOS", "3.04.01.11-MANUTENCAO DE MAQUINAS E EQUIPAMENTOS"],
    ["Logística-3.06.01.01", "Logística", "3.06.01.01", "COMBUSTIVEL DE VEICULOS", "3.06.01.01-COMBUSTIVEL DE VEICULOS"],
    ["Logística-3.06.01.02", "Logística", "3.06.01.02", "ALUGUEL DE CARRO", "3.06.01.02-ALUGUEL DE CARRO"],
    ["Logística-3.06.01.03", "Logística", "3.06.01.03", "MANUTENCAO DE VEICULOS", "3.06.01.03-MANUTENCAO DE VEICULOS"],
    ["Logística-3.06.01.04", "Logística", "3.06.01.04", "IPVA E TAXAS DE LECENCIAMENTOS DE VEICULOS", "3.06.01.04-IPVA E TAXAS DE LECENCIAMENTOS DE VEICULOS"],
    ["Logística-3.06.01.07", "Logística", "3.06.01.07", "MULTAS DE TRANSITO VEICULOS", "3.06.01.07-MULTAS DE TRANSITO VEICULOS"],
    ["Logística-3.06.01.08", "Logística", "3.06.01.08", "RASTREADOR DE VEICULOS", "3.06.01.08-RASTREADOR DE VEICULOS"],
    ["Logística-3.06.01.09", "Logística", "3.06.01.09", "SEGUROS VEICULOS", "3.06.01.09-SEGUROS VEICULOS"],
    ["Logística-3.22.01.02", "Logística", "3.22.01.02", "AQUISICAO DE FROTA ", "3.22.01.02-AQUISICAO DE FROTA - VEICULOS PESADOS"],
    ["Logística-3.22.01.03", "Logística", "3.22.01.03", "AQUISICAO DE FROTA ", "3.22.01.03-AQUISICAO DE FROTA - VEICULOS LEVES"],
    ["Logística-3.06.01.11", "Logística", "3.06.01.11", "CAIXA ", "3.06.01.11-CAIXA - FUNDO FIXO - LOGISTICA"],
    ["Administrativo-3.01.01.01", "Administrativo", "3.01.01.01", "ENERGIA ELETRICA", "3.01.01.01-ENERGIA ELETRICA"],
    ["Administrativo-3.01.01.02", "Administrativo", "3.01.01.02", "AGUA E ESGOTO", "3.01.01.02-AGUA E ESGOTO"],
    ["Administrativo-3.01.01.03", "Administrativo", "3.01.01.03", "TELEFONE", "3.01.01.03-TELEFONE"],
    ["Administrativo-3.01.01.04", "Administrativo", "3.01.01.04", "INTERNET", "3.01.01.04-INTERNET"],
    ["Administrativo-3.01.01.05", "Administrativo", "3.01.01.05", "ALUGUEL E CONDOMINIO CASA OU CONTEINER CANTEIRO", "3.01.01.05-ALUGUEL E CONDOMINIO CASA OU CONTEINER CANTEIRO"],
    ["Administrativo-3.01.01.06", "Administrativo", "3.01.01.06", "MATERIAL CONSUMO", "3.01.01.06-MATERIAL CONSUMO"],
    ["Administrativo-3.01.01.07", "Administrativo", "3.01.01.07", "MATERIAL EXPEDIENTE", "3.01.01.07-MATERIAL EXPEDIENTE"],
    ["Administrativo-3.01.01.08", "Administrativo", "3.01.01.08", "MOVEIS E UTENSILIOS", "3.01.01.08-MOVEIS E UTENSILIOS"],
    ["Administrativo-3.01.01.10", "Administrativo", "3.01.01.10", "SEGURO IMOVEL", "3.01.01.10-SEGURO IMOVEL"],
    ["Administrativo-3.01.01.11", "Administrativo", "3.01.01.11", "SEGURANCA/VIGILANCIA", "3.01.01.11-SEGURANCA/VIGILANCIA"],
    ["Administrativo-3.01.01.12", "Administrativo", "3.01.01.12", "IPTU", "3.01.01.12-IPTU"],
    ["Administrativo-3.01.01.13", "Administrativo", "3.01.01.13", "MANUTENCAO PREDIAL", "3.01.01.13-MANUTENCAO PREDIAL"],
    ["Administrativo-3.05.01.12", "Administrativo", "3.05.01.12", "CORREIOS", "3.05.01.12-CORREIOS"],
    ["Administrativo-3.08.01.03", "Administrativo", "3.08.01.03", "CAIXA ", "3.08.01.03-CAIXA - FUNDO FIXO ADM DP"],
    ["Administrativo-3.16.01.01", "Administrativo", "3.16.01.01", "ASSESSORIA JURIDICA TRABALHISTA", "3.16.01.01-ASSESSORIA JURIDICA TRABALHISTA"],
    ["Administrativo-3.16.01.02", "Administrativo", "3.16.01.02", "CONTABILIDADE", "3.16.01.02-CONTABILIDADE"],
    ["Administrativo-3.16.01.03", "Administrativo", "3.16.01.03", "ASSESSORIA GERENCIAL", "3.16.01.03-ASSESSORIA GERENCIAL"],
    ["Administrativo-3.16.01.05", "Administrativo", "3.16.01.05", "ASSESSORIA JURIDICA NAO TRABALHISTA", "3.16.01.05-ASSESSORIA JURIDICA NAO TRABALHISTA"],
    ["Administrativo-3.15.01.01", "Administrativo", "3.15.01.01", "LICENÇA E MENSALIDADE DE SOFTWARE", "3.15.01.01-LICENÇA E MENSALIDADE DE SOFTWARE"],
    ["Administrativo-3.01.01.14", "Administrativo", "3.01.01.14", "ALUGUEL DE MAQUINAS E EQUIPAMENTOS ", "3.01.01.14-ALUGUEL DE MAQUINAS E EQUIPAMENTOS - ADM"],
    ["Administrativo-3.22.01.07", "Administrativo", "3.22.01.07", "COMPRAS DE MOVEIS E INSTALACOES PREDIAIS", "3.22.01.07-COMPRAS DE MOVEIS E INSTALACOES PREDIAIS"]
    ]
}