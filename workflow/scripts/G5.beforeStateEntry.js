function beforeStateEntry(sequenceId) {
  try {
    /* APROVAÇÃO GESTOR - APROVADA */
    if (sequenceId == 227) {
      hAPI.setCardValue("aprovacao_gestor", "aprovado");
      hAPI.setCardValue("mensagem_cancel_gestor", "Aprovado pelo Gestor");
    }
    /* APROVAÇÃO GESTOR - REPROVADA */
    if (sequenceId == 228) {
      hAPI.setCardValue("aprovacao_gestor", "reprovado");
      hAPI.setCardValue("mensagem_cancel_gestor", "Reprovado pelo Gestor");
    }
    /* APROVAÇÃO DIRETORIA - APROVADA */
    if (sequenceId == 233) {
      hAPI.setCardValue("aprovacao_diretoria", "aprovado");
      hAPI.setCardValue("mensagem_cancel_diretoria", "Aprovado pela Diretoria");
    }
    /* APROVAÇÃO DIRETORIA - REPROVADA */
    if (sequenceId == 234) {
      hAPI.setCardValue("aprovacao_diretoria", "reprovado");
      hAPI.setCardValue("mensagem_cancel_diretoria", "Reprovado pela Diretoria");
    }
    /* AGUARDANDO VENCIMENTO */
    if (sequenceId == 246) {
      hAPI.setCardValue("seleciona_fase_envio", "aguardando_vencimento");
    }
    /* PAGAMENTO ÚNICO */
    if (sequenceId == 247) {
      hAPI.setCardValue("seleciona_fase_envio", "pagamento_unico");
    }
    /* PAGAMENTO PARCIAL */
    if (sequenceId == 248) {
      hAPI.setCardValue("seleciona_fase_envio", "pagamento_parcial");
    }

    /** Atividades */
    var stateName = getStateName(getValue('WKNextState'), getValue('WKDef'), getValue('WKVersDef'));
    if (stateName) {
      hAPI.setCardValue('numAtividadeAnterior', hAPI.getCardValue('numAtividadeAtual'));
      hAPI.setCardValue('numAtividadeAtual', getValue('WKNextState'));
    }
  } catch (error) {
    throw error;
  }
}

/**
* Informações da atividade 
* @param {Number} activity número da atividade  
* @param {String} processId código do processo
* @returns {String} descrição do nome da atividade 
*/
function getStateName(activity, processId, version) {
  try {
    var datasetProcessState = DatasetFactory.getDataset('processState', [
      'stateName', 'stateDescription', 'bpmnType'
    ], new Array(
      DatasetFactory.createConstraint('sqlLimit', 1, 1, ConstraintType.MUST),
      DatasetFactory.createConstraint('bpmnType', '10', '10', ConstraintType.SHOULD),
      DatasetFactory.createConstraint('bpmnType', '60', '60', ConstraintType.SHOULD),
      DatasetFactory.createConstraint('bpmnType', '80', '80', ConstraintType.SHOULD),
      DatasetFactory.createConstraint('processStatePK.version', version, version, ConstraintType.MUST),
      DatasetFactory.createConstraint('processStatePK.processId', processId, processId, ConstraintType.MUST),
      DatasetFactory.createConstraint('processStatePK.sequence', activity, activity, ConstraintType.MUST)
    ), ["processStatePK.version;desc"]);
    if (datasetProcessState.rowsCount > 0) return datasetProcessState.getValue(0, "stateName");
    return false;
  } catch (error) {
    throw error;
  }
}