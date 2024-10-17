/**
 * Publica os anexos processo na pasta de destino definida
 * @param {String|Number} pastaDeDestino código da pasta de destino 
 * @returns lista de anexos publicados
 */
function publicarGED(pastaDeDestino) {
  var docsField = [];
  try {
    var workflowAttachments = hAPI.listAttachments();
    for (var i = 0; i < workflowAttachments.size(); i++) {
      var docDto = workflowAttachments.get(i);
      /** Se o tipo do documento for diferente de 5 (formulário do fluig) */
      if (docDto.getDocumentType() != 5) {
        var attachments = getAttachments(docDto);
        docAPI.copyDocumentToUploadArea(docDto.getDocumentId(), docDto.getVersion());
        docDto.setParentDocumentId(pastaDeDestino);
        docDto.setInheritSecurity(false);
        docDto.setKeyWord('');
        docDto.setVersionDescription('Anexado via processo');
        docDto.setActiveVersion(true);
        docDto.setColleagueId(getValue("WKUser")); // Informar o usuário logado.
        docDto.setPublisherId(getValue("WKUser")); // Informar o publicador. Processo lento pra testar! 

        var securityArray = new java.util.ArrayList();
        var usuProcess = getUsersProcess();

        log.dir({
          'users': usuProcess,
          'documentId': docDto.getDocumentId(),
          'parentDocumentId': pastaDeDestino,
        })

        for (var index = 0; index < usuProcess.size(); index++) {
          var security = docAPI.newDocumentSecurityConfigDto();
          security.setAttributionType(1) // 1 - usuário; 2 - grupo; 3 - todos  
          security.setAttributionValue(usuProcess.get(index)) // id do usuário
          security.setCompanyId(1)
          security.setDocumentId(docDto.getDocumentId())
          security.setDownloadEnabled(true)
          security.setInheritSecurity(false)
          security.setSecurityLevel(2) // 0 - todo; 2 -  modificar; 3 - todos
          security.setSecurityVersion(true)
          security.setPermission(true)
          security.setShowContent(true)
          security.setVersion(docDto.getVersion())
          securityArray.add(security);
        }
        var doc = docAPI.createDocument(docDto, attachments, securityArray, null, null);
        docsField.push(doc.getDocumentId());
      }
    }
    return docsField;
  }
  catch (error) {
    throw String(error.lineNumber) + " - " + String(error);
  }
}

/**
 * Obtém os detalhes dos anexos de acordo com o ID do documento informado
 * @param {String|Number} docDto código do documento 
 * @returns array de informações sobre o documento solicitado
 */
function getAttachments(docDto) {
  var attachmentArray = new java.util.ArrayList();
  var attachment = docAPI.newAttachment();
  attachment.setFileName(docDto.getPhisicalFile());
  attachment.setPrincipal(true);
  attachment.setAttach(false);
  attachmentArray.add(attachment);
  return attachmentArray;
}

/**
 * Cria uma nova pasta no GED
 * @param {Number} pastaPai número da pasta pai 
 * @param {String} nome nome para a pasta
 * @returns {String} o ID da pasta criada
 */
function criaPasta(pastaPai, nome) {
  try {
    var dto = docAPI.newDocumentDto();
    dto.setDocumentDescription(nome);
    dto.setDocumentType("1");
    dto.setParentDocumentId(pastaPai);
    dto.setDocumentTypeId("");
    var securityArray = new java.util.ArrayList();
    var usuProcess = getUsersProcess();
    for (var index = 0; index < usuProcess.size(); index++) {
      var security = docAPI.newDocumentSecurityConfigDto();
      security.setAttributionType(1) // 1 - usuário; 2 - grupo; 3 - todos 
      security.setAttributionValue(usuProcess.get(index)) // id do usuário
      security.setCompanyId(1)
      security.setDocumentId(pastaPai)
      security.setDownloadEnabled(true)
      security.setInheritSecurity(false)
      security.setSecurityLevel(2) // 0 - todo; 2 -  modificar; 3 - todos
      security.setSecurityVersion(true)
      security.setShowContent(true)
      security.setPermission(true)
      security.setVersion(100)
      securityArray.add(security);
    }
    var folder = docAPI.createFolder(dto, securityArray, null);
    return parseInt(folder.getDocumentId());
  } catch (error) {
    throw String(error.lineNumber) + " - " + String(error);
  }
}

function getConstante(param) {
  var aConstraint = [];
  aConstraint.push(DatasetFactory.createConstraint('id', param, param, ConstraintType.MUST));
  var oConstantes = DatasetFactory.getDataset('ds_Constantes', null, null, null);
  for (var i = 0; i < oConstantes.rowsCount; i++) {
    if (oConstantes.getValue(i, "id").trim() == param.trim()) {
      return oConstantes.getValue(i, "Valor").trim();
    }
  }
  return '0';
}

function getColleagueName(user) {
  var const1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
  var datasetAttachment = DatasetFactory.getDataset("colleague", null, [const1], null);
  if (datasetAttachment.rowsCount > 0) return datasetAttachment.getValue(0, "colleagueName");
  return user;
}

function getUsersProcess() {
  var datasetProcessTask = DatasetFactory.getDataset('processTask', null, new Array(
    DatasetFactory.createConstraint('processTaskPK.processInstanceId', getValue('WKNumProces'), getValue('WKNumProces'), ConstraintType.MUST)
  ), null);
  var users = new java.util.ArrayList();
  users.add(getValue("WKUser"));
  for (var index = 0; index < datasetProcessTask.rowsCount; index++) {
    var colleagueId = String(datasetProcessTask.getValue(index, 'processTaskPK.colleagueId'));
    var choosedColleagueId = String(datasetProcessTask.getValue(index, 'choosedColleagueId'));
    var completeColleagueId = String(datasetProcessTask.getValue(index, 'completeColleagueId'));
    if (!users.contains(colleagueId) && isValidUserToCreateDoc(colleagueId)) { users.add(colleagueId); }
    if (!users.contains(choosedColleagueId) && isValidUserToCreateDoc(choosedColleagueId)) { users.add(choosedColleagueId); }
    if (!users.contains(completeColleagueId) && isValidUserToCreateDoc(completeColleagueId)) { users.add(completeColleagueId); }
  }
  return users;
}

function isValidUserToCreateDoc(user) {
  user = String(user);
  var response = false
  if (user.indexOf(':') < 0 && user.length > 0) {
    var datasetColleague = DatasetFactory.getDataset('colleague', new Array('active', 'colleaguePK.colleagueId'), new Array(DatasetFactory.createConstraint('colleaguePK.colleagueId', user, user, ConstraintType.MUST)), null);
    if (datasetColleague.rowsCount == 0) response = false;
    else if (datasetColleague.getValue(0, 'active') == 'true' || datasetColleague.getValue(0, 'active') == true) response = true;
  }

  log.dir({
    'isValidUserToCreateDoc': 'isValidUserToCreateDoc',
    'user': user,
    'indexOf': user.indexOf(':'),
    'length': user.length,
    'response': response
  })
  return response
}