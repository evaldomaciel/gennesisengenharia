function beforeTaskSave(colleagueId, nextSequenceId, userList) {
  if (nextSequenceId == 176 || nextSequenceId == 7) {
    var attachments = hAPI.listAttachments();
    var hasAttachment = false;

    for (var i = 0; i < attachments.size(); i++) {
      var attachment = attachments.get(i);
      if (existeAnexo(attachment.getDocumentDescription())) hasAttachment = true;
    }

    if (!hasAttachment) {
      throw setError("A tabela <font color=\"red\">Anexo</font> necessita de pelo menos uma entrada!");
    }
  }
}

function existeAnexo(descAnexo) {
  var table_anexo_solicitacao_indexes = hAPI.getChildrenIndexes("table_anexo_solicitacao");
  for (var idxAnexo = 0; idxAnexo < table_anexo_solicitacao_indexes.length; idxAnexo++) {
    var idCampo = table_anexo_solicitacao_indexes[idxAnexo];
    if (descAnexo == hAPI.getCardValue('fnInsertAnexoAs___' + idCampo)) return true
  }
  throw setError("Não foi econtrando nenhum anexo com a descrição " + descAnexo + " na seção de anexos!");
}

function setError(msg) {
  return "<h1>Atenção</h1><b>" + msg + "</b>"
}