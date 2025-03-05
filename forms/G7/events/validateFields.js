function validateForm(form) {
    var activity = getValue("WKNumState");
    var msg = "";

    /* ETAPA 015 - IDENTIFICACAO */
    if (activity == 15) {
        if (campoVazio(form, "cancelado")) msg += getMsgObg('Cancelar a Solicitação?');
        if(form.getValue("cancelado") == "Não") {
            if (campoVazio(form, "solicitacao_origem")) msg += getMsgObg('Nº Solicitação Origem');
        }
    }

    /* ETAPA 29 - AVALIAR ATENDIMENTO */
    if (activity == 29) {
        if (campoVazio(form, "Avaliado")) msg += getMsgObg('Classifique o seu nivel de satisfação com a atuação?');
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