function afterTaskComplete(colleagueId, nextSequenceId, userList) {

  var activity = getValue("WKNumState");
  var proxima = getValue("WKNextState");
  var nSolicitacao = getValue("WKNumProces");
  nSolicitacao = nSolicitacao.toString();


  if (activity == 114) {
    try {
      var dataParamsEmail = {
        usuario: getColleagueName(getValue("WKUser")),
        assunto: "PAGAMENTO REALIZADO - FASE ENVIAR COMPROVANTE",
        titulo_solicitacao: hAPI.getCardValue("titulo_solicitacao"),
        atendente: "Departamento Financeiro",
        num_solicitacao: hAPI.getCardValue("numero_solicitacao")
      }
      /// Get Dataset para uma variavel;
      var parametros = new java.util.HashMap();
      parametros.put("ASSUNTO", dataParamsEmail.assunto);
      parametros.put("USUARIO", dataParamsEmail.usuario);
      parametros.put("TITULO_SOLICITACAO", dataParamsEmail.titulo_solicitacao);
      parametros.put("ATENDENTE", dataParamsEmail.atendente);
      parametros.put("SOLICITACAO", dataParamsEmail.num_solicitacao);
      var destinatarios = new java.util.ArrayList();
      var email = "soaresgui.dev@gmail.com";
      destinatarios.add(email);

      notifier.notify(getValue("WKUser"), "template_email_engpac", parametros, destinatarios, "text/html");
    } catch (error) {
      throw error;
    }
    var obj = new com.fluig.foundation.mail.service.EMailServiceBean();
    for (var i in destinatario) {
      obj.simpleEmail(1, 'ENGPAC - G5', "fluig", destinatario[i], '', "text/html");
    }
  }

  if (nextSequenceId == 14) {
    var rateioPF = clearPF("table_rateio_ccusto_fin");
    var rateioInicial = hAPI.getCardData(getValue('WKNumProces'));
    if (rateioInicial) {
      var keys = rateioInicial.keySet().toArray();
      for (var key in keys) {
        var field = keys[key];
        if (field.indexOf("coluna_natureza___") >= 0) {
          var rateioProv = new java.util.HashMap();
          var idPF = field.replace("coluna_natureza___", "");
          rateioProv.put("coluna_natureza_fin", rateioInicial.get(String("coluna_natureza" + "___" + idPF)));
          rateioProv.put("coluna_ccusto_fin", rateioInicial.get(String("coluna_ccusto" + "___" + idPF)));
          rateioProv.put("coluna_valor_fin", rateioInicial.get(String("coluna_valor" + "___" + idPF)));
          rateioProv.put("coluna_percentual_fin", rateioInicial.get(String("coluna_percentual" + "___" + idPF)));
          hAPI.addCardChild("table_rateio_ccusto_fin", rateioProv);
        }
      }
    }
  }
}

function clearPF(tableName) {
  var isCleared = false;
  var tablePF = hAPI.getChildrenIndexes(tableName);
  for (var interaction = tablePF.length - 1; interaction >= 0; interaction--) {
    hAPI.removeCardChild(tableName, tablePF[interaction]);
    isCleared = true;
  }
  return isCleared;
}

function horaAtual() {
  var data = new Date()
  var dia = data.getDate() < 10 ? "0" + data.getDate() : data.getDate()
  var mes = data.getMonth() < 10 ? "0" + (data.getMonth() + 1) : (data.getMonth() + 1)
  var ano = data.getFullYear() < 10 ? "0" + data.getFullYear() : data.getFullYear()
  var hora = data.getHours() < 10 ? "0" + data.getHours() : data.getHours()
  var minutos = data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes()
  data = dia + '/' + mes + '/' + ano + " " + hora + ":" + minutos
  return data
}