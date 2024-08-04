function servicetask202(attempt, message) {
var valores = {
    // "CODEXTERNO": hAPI.getCardValue("idDoCampo"),
    "CODCOLIGADA": hAPI.getCardValue("coligada"),
    "NOMEFANTASIA": hAPI.getCardValue("nome_social"),
    "NOME": hAPI.getCardValue("nome"),
    // "CGCCFO": hAPI.getCardValue("idDoCampo"),
    "PAGREC": hAPI.getCardValue("pagar_receber"),
    "RUA": hAPI.getCardValue("rua"),
    "NUMERO": hAPI.getCardValue("numero"),
    "BAIRRO": hAPI.getCardValue("bairro"),
    // "CIDADE": hAPI.getCardValue("idDoCampo"),
    // "CODETD": hAPI.getCardValue("idDoCampo"),
    "CEP": hAPI.getCardValue("CEP"),
    "TELEFONE": hAPI.getCardValue("telefone"),
    "EMAIL": hAPI.getCardValue("email"),
    "CONTATO": hAPI.getCardValue("contato"),
    "ATIVO": hAPI.getCardValue("status_tipo_cliente"),
    // "LIMITECREDITO": hAPI.getCardValue("idDoCampo"),
    // "DATAULTALTERACAO": hAPI.getCardValue("idDoCampo"),
    // "DATACRIACAO": hAPI.getCardValue("idDoCampo"),
    // "DATAULTMOVIMENTO": hAPI.getCardValue("idDoCampo"),
    // "VALOROP1": hAPI.getCardValue("idDoCampo"),
    // "VALOROP2": hAPI.getCardValue("idDoCampo"),
    // "VALOROP3": hAPI.getCardValue("idDoCampo"),
    // "PATRIMONIO": hAPI.getCardValue("idDoCampo"),
    // "NUMFUNCIONARIOS": hAPI.getCardValue("idDoCampo"),
    "CODMUNICIPIO": hAPI.getCardValue("codigo_municipio"),
    "PESSOAFISOUJUR": hAPI.getCardValue("categoria"),
    "PAIS": hAPI.getCardValue("pais"),
    // "CONTRIBUINTE": hAPI.getCardValue("idDoCampo"),
    // "CFOIMOB": hAPI.getCardValue("idDoCampo"),
    // "VALFRETE": hAPI.getCardValue("idDoCampo"),
    // "TPTOMADOR": hAPI.getCardValue("idDoCampo"),
    // "CONTRIBUINTEISS": hAPI.getCardValue("idDoCampo"),
    // "NUMDEPENDENTES": hAPI.getCardValue("idDoCampo"),
    // "USUARIOALTERACAO": hAPI.getCardValue("idDoCampo"),
    // "ORGAOPUBLICO": hAPI.getCardValue("idDoCampo"),
    "CAIXAPOSTAL": hAPI.getCardValue("caixa_postal"),
    // "CATEGORIAAUTONOMO": hAPI.getCardValue("idDoCampo"),
    // "IDCFO": hAPI.getCardValue("idDoCampo"),
    // "VROUTRASDEDUCOESIRRF": hAPI.getCardValue("idDoCampo"),
    // "RAMOATIV": hAPI.getCardValue("idDoCampo"),
    // "OPTANTEPELOSIMPLES": hAPI.getCardValue("idDoCampo"),
    "TIPORUA": hAPI.getCardValue("tipo_rua"),
    "TIPOBAIRRO": hAPI.getCardValue("tipo_bairro"),
    // "REGIMEISS": hAPI.getCardValue("idDoCampo"),
    // "RETENCAOISS": hAPI.getCardValue("idDoCampo"),
    "USUARIOCRIACAO": hAPI.getCardValue("solicitante"),
    // "PORTE": hAPI.getCardValue("idDoCampo"),
    // "TIPOOPCOMBUSTIVEL": hAPI.getCardValue("idDoCampo"),
    "IDPAIS": hAPI.getCardValue("id_pais"),
    "NACIONALIDADE": hAPI.getCardValue("nacionalidade"),
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
    "APOSENTADOOUPENSIONISTA": hAPI.getCardValue("aposentado_pensionista"),
    // "SOCIOCOOPERADO": hAPI.getCardValue("idDoCampo"),
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
