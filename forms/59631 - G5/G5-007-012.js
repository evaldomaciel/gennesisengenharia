/* FUNÇÕES ETAPA 007 - APROVAÇÃO GESTOR */
function toggleMotivoCancelGestor(respostaGestor) {
  if (respostaGestor == "aprovado") {
    $("#div_motivo_cancel_gestor").hide(400);
  }
  if (respostaGestor == "reprovado") {
    $("#div_motivo_cancel_gestor").show(400);
  }
}

/* FUNÇÕES ETAPA 012 - APROVAÇÃO DIRETORIA */
function toggleMotivoCancelDiretoria(respostaDiretoria) {
  if (respostaDiretoria == "aprovado") {
    $("#div_motivo_cancel_diretoria").hide(400);
  }
  if (respostaDiretoria == "reprovado") {
    $("#div_motivo_cancel_diretoria").show(400);
  }
}

