function servicetask176(attempt, message) {
  log.info("Incio Serviço de atribuição");
  /** Vamos colocar mais complexidade no 176 */
  var CODCCUSTO = hAPI.getCardValue('CODCCUSTO');
  var SETOR_SOLICITANTE = String(hAPI.getCardValue('SETORSOLICITANTE')).toUpperCase();
  var CODCOLIGADA = hAPI.getCardValue('CODCOLIGADA');

  /** Aprovação do Gestor */
  hAPI.setCardValue("cTask007", getAprovadorAtv(CODCCUSTO, SETOR_SOLICITANTE, CODCOLIGADA, 'Gestor'));

  /** Aprovação da diretoria */
  hAPI.setCardValue("cTask012", getAprovadorAtv(CODCCUSTO, SETOR_SOLICITANTE, CODCOLIGADA, 'Diretor'));

  /** Revisar solicitação */
  hAPI.setCardValue('cTask034', getValue('WKUser'));

  /** Etapas do financeiro */
  //hAPI.setCardValue('cTask274', getAtribuicoes('G5-274'));
  //hAPI.setCardValue('cTask014', getAtribuicoes('G5-014'));
  //hAPI.setCardValue('cTask097', getAtribuicoes('G5-097'));
  //hAPI.setCardValue('cTask127', getAtribuicoes('G5-127'));
  //hAPI.setCardValue('cTask128', getAtribuicoes('G5-128'));
  
  /** Etapas do financeiro */
  hAPI.setCardValue('cTask274', getAtribuicoes('G5-274', hAPI.getCardValue('CODCOLIGADA'), hAPI.getCardValue('CODCCUSTO')));
  hAPI.setCardValue('cTask014', getAtribuicoes('G5-014', hAPI.getCardValue('CODCOLIGADA'), hAPI.getCardValue('CODCCUSTO')));
  hAPI.setCardValue('cTask097', getAtribuicoes('G5-097', hAPI.getCardValue('CODCOLIGADA'), hAPI.getCardValue('CODCCUSTO')));
  hAPI.setCardValue('cTask127', getAtribuicoes('G5-127', hAPI.getCardValue('CODCOLIGADA'), hAPI.getCardValue('CODCCUSTO')));
  hAPI.setCardValue('cTask128', getAtribuicoes('G5-128', hAPI.getCardValue('CODCOLIGADA'), hAPI.getCardValue('CODCCUSTO')));


  /** Tratar erro */
  hAPI.setCardValue('cTask221', getAtribuicoes('G5-221'));
  hAPI.setCardValue('cTask216', getAtribuicoes('G5-216'));
  hAPI.setCardValue('cTask295', getAtribuicoes('G5-295'));
  hAPI.setCardValue('cTask223', getAtribuicoes('G5-223'));
  
  log.info("Fim Serviço de atribuição");
  return true;
}

function getAprovadorAtv(CODCCUSTO, SETOR_SOLICITANTE, CODCOLIGADA, TIPO) {
  var msgFalha = String("Não foi encontrado um aprovador no dataset 'ds_G5-Aprovar' com os parâmetros: CODCCUSTO: " + CODCCUSTO + ", SETOR_SOLICITANTE: " + SETOR_SOLICITANTE + ", CODCOLIGADA: " + CODCOLIGADA + ", TIPO: " + TIPO);
  try {
    var constraintDs_G5_CODCCUSTO = DatasetFactory.createConstraint('CODCCUSTO', CODCCUSTO, CODCCUSTO, ConstraintType.MUST);
    var constraintDs_G5_SETOR_SOLICITANTE = DatasetFactory.createConstraint('SETOR_SOLICITANTE', SETOR_SOLICITANTE, SETOR_SOLICITANTE, ConstraintType.MUST);
    var constraintDs_G5_CODCOLIGADA = DatasetFactory.createConstraint('CODCOLIGADA', CODCOLIGADA, CODCOLIGADA, ConstraintType.MUST);
    var constraintDs_G5_TIPO = DatasetFactory.createConstraint('TIPO', TIPO, TIPO, ConstraintType.MUST);
    constraintDs_G5_SETOR_SOLICITANTE.setLikeSearch(true);
    constraintDs_G5_TIPO.setLikeSearch(true);
    var constraints = new Array(constraintDs_G5_CODCCUSTO, constraintDs_G5_SETOR_SOLICITANTE, constraintDs_G5_CODCOLIGADA, constraintDs_G5_TIPO)
    var datasetAprovador = DatasetFactory.getDataset('ds_G5-Aprovar', null, constraints, null);
    if (datasetAprovador != null && datasetAprovador != undefined && datasetAprovador.rowsCount > 0) {
      return datasetAprovador.getValue(0, 'APROVADOR');
    } else {
      hAPI.setTaskComments(getValue("WKUser"), getValue("WKNumProces"), 0, msgFalha);
      return "Pool:Group:G5-APROVAR";
    }
  } catch (error) {
    throw new Error(error);
  }
}

function getAtribuicoes(idAtv, codColigada, centroCusto) {
  var filtroSemCC = idAtv + "-" + codColigada;
  var filtroComCC = filtroSemCC + "-" + centroCusto;
  var constraintAtribuicao = DatasetFactory.createConstraint('ID_ATV', filtroComCC, filtroComCC, ConstraintType.MUST)
  var dtsAtribuicoes = DatasetFactory.getDataset('dts_consultaCadastroAtribuicoes', null, [constraintAtribuicao], null)
  if (dtsAtribuicoes.rowsCount > 0) {
    return dtsAtribuicoes.getValue(0, 'hd_cod_user_atv');
  }
  else {
    constraintAtribuicao = DatasetFactory.createConstraint('ID_ATV', filtroSemCC, filtroSemCC, ConstraintType.MUST)
    dtsAtribuicoes = DatasetFactory.getDataset('dts_consultaCadastroAtribuicoes', null, [constraintAtribuicao], null)
    if (dtsAtribuicoes.rowsCount > 0) {
      return dtsAtribuicoes.getValue(0, 'hd_cod_user_atv')
    }
    else {
      constraintAtribuicao = DatasetFactory.createConstraint('ID_ATV', idAtv, idAtv, ConstraintType.MUST)
      dtsAtribuicoes = DatasetFactory.getDataset('dts_consultaCadastroAtribuicoes', null, [constraintAtribuicao], null)
      if (dtsAtribuicoes.rowsCount > 0) {
        return dtsAtribuicoes.getValue(0, 'hd_cod_user_atv')
      }
    }
  }
  var paramsInfo = [];
  if (idAtv) paramsInfo.push("Atividade: " + idAtv)
  if (codColigada) paramsInfo.push("Coligada: " + codColigada)
  if (centroCusto) paramsInfo.push("centroCusto: " + centroCusto)
  hAPI.setTaskComments(getValue("WKUser"), getValue("WKNumProces"), 0, "Não foi possível definir um aprovador com os parâmetros informados no formulário: [" + paramsInfo.join(" | ") + "]");
  return getValue('WKUser');
}