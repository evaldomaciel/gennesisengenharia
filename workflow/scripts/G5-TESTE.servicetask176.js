function servicetask176(attempt, message) {

  /** Aprovação do Gestor */
  hAPI.setCardValue('cTask007', getAtribuicoes('G5-007'), 'aprovar');

  /** Aprovação da diretoria */
  hAPI.setCardValue('cTask012', getAtribuicoes('G5-012'), 'aprovar');

  hAPI.setCardValue('cTask034', getValue('WKUser'));

  hAPI.setCardValue('cTask274', getAtribuicoes('G5-274-' + hAPI.getCardValue('CODCOLIGADA')));
  hAPI.setCardValue('cTask014', getAtribuicoes('G5-014-' + hAPI.getCardValue('CODCOLIGADA')));
  hAPI.setCardValue('cTask097', getAtribuicoes('G5-097-' + hAPI.getCardValue('CODCOLIGADA')));
  hAPI.setCardValue('cTask127', getAtribuicoes('G5-127-' + hAPI.getCardValue('CODCOLIGADA')));
  hAPI.setCardValue('cTask128', getAtribuicoes('G5-128-' + hAPI.getCardValue('CODCOLIGADA')));

  /** Tratar erro */
  hAPI.setCardValue('cTask221', getAtribuicoes('G5-221'));
  hAPI.setCardValue('cTask216', getAtribuicoes('G5-216-' + hAPI.getCardValue('CODCOLIGADA')));
  hAPI.setCardValue('cTask295', getAtribuicoes('G5-295-' + hAPI.getCardValue('CODCOLIGADA')));
  hAPI.setCardValue('cTask223', getAtribuicoes('G5-223-' + hAPI.getCardValue('CODCOLIGADA')));

  return true;
}

function getAtribuicoes(atribuicao, tipoAtividade) {
  var constraintAtribuicao = DatasetFactory.createConstraint('ID_ATV', atribuicao, atribuicao, ConstraintType.MUST)
  var dtsAtribuicoes = DatasetFactory.getDataset('dts_consultaCadastroAtribuicoes', null, [constraintAtribuicao], null)
  if (dtsAtribuicoes.rowsCount > 0) {
    return dtsAtribuicoes.getValue(0, 'hd_cod_user_atv')
  } else {
    if (tipoAtividade == 'aprovar') return 'Pool:Group:G5-APROVAR';
    else return getValue('WKUser');
  }
}