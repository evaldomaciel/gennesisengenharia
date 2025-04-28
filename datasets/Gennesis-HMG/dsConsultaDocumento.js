function createDataset(fields, constraints, sortFields) {
	try {
		return processResult(callService(fields, constraints, sortFields));
	} catch(e) {
		return processErrorResult(e, constraints);
	}
}

function callService(fields, constraints, sortFields) {
	var serviceData = data();
	var params = serviceData.inputValues;
	var assigns = serviceData.inputAssignments;

	verifyConstraints(serviceData.inputValues, constraints);

	var serviceHelper = ServiceManager.getService(serviceData.fluigService);
	var serviceLocator = serviceHelper.instantiate(serviceData.locatorClass);
	var service = serviceLocator.getDocumentServicePort();
	var response = service.updateDocument(getParamValue(params.username, assigns.username), getParamValue(params.password, assigns.password), 
		getParamValue(params.companyId, assigns.companyId), fillDocumentDtoArray(serviceHelper, params.document, assigns.document), 
		fillAttachmentArray(serviceHelper, params.attachments, assigns.attachments), fillDocumentSecurityConfigDtoArray(serviceHelper, params.security, assigns.security), 
		fillApproverDtoArray(serviceHelper, params.approvers, assigns.approvers), fillRelatedDocumentDtoArray(serviceHelper, params.relatedDocuments, assigns.relatedDocuments)
		);

	return response;
}

function defineStructure() {
		addColumn("companyId");
	addColumn("documentDescription");
	addColumn("documentId");
	addColumn("foo");
	addColumn("version");
	addColumn("webServiceMessage");
}

function onSync(lastSyncDate) {
	var serviceData = data();
	var synchronizedDataset = DatasetBuilder.newDataset();

	try {
		var resultDataset = processResult(callService());
		if (resultDataset != null) {
			var values = resultDataset.getValues();
			for (var i = 0; i < values.length; i++) {
				synchronizedDataset.addRow(values[i]);
			}
		}

	} catch(e) {
		log.info('Dataset synchronization error : ' + e.message);

	}
	return synchronizedDataset;
}

function verifyConstraints(params, constraints) {
	if (constraints != null) {
		for (var i = 0; i < constraints.length; i++) {
			try {
				params[constraints[i].fieldName] = JSON.parse(constraints[i].initialValue);
			} catch(e) {
				params[constraints[i].fieldName] = constraints[i].initialValue;
			}
		}
	}
}

function processResult(result) {
	var dataset = DatasetBuilder.newDataset();

	result = result.getItem();

		dataset.addColumn("companyId");
	dataset.addColumn("documentDescription");
	dataset.addColumn("documentId");
	dataset.addColumn("foo");
	dataset.addColumn("version");
	dataset.addColumn("webServiceMessage");

	for (var i = 0; i < result.size(); i++) {
		dataset.addRow([result.get(i).getCompanyId(), result.get(i).getDocumentDescription(), result.get(i).getDocumentId(), JSONUtil.toJSON(result.get(i).getFoo()), result.get(i).getVersion(), result.get(i).getWebServiceMessage()]);
	}

	return dataset;
}

function processErrorResult(error, constraints) {
	var dataset = DatasetBuilder.newDataset();

	var params = data().inputValues;
verifyConstraints(params, constraints);

dataset.addColumn('error');
	dataset.addColumn('password');
	dataset.addColumn('companyId');
	dataset.addColumn('security');
	dataset.addColumn('attachments');
	dataset.addColumn('document');
	dataset.addColumn('relatedDocuments');
	dataset.addColumn('approvers');
	dataset.addColumn('username');

	var password = isPrimitive(params.password) ? params.password : JSONUtil.toJSON(params.password);
	var companyId = isPrimitive(params.companyId) ? params.companyId : JSONUtil.toJSON(params.companyId);
	var security = isPrimitive(params.security) ? params.security : JSONUtil.toJSON(params.security);
	var attachments = isPrimitive(params.attachments) ? params.attachments : JSONUtil.toJSON(params.attachments);
	var document = isPrimitive(params.document) ? params.document : JSONUtil.toJSON(params.document);
	var relatedDocuments = isPrimitive(params.relatedDocuments) ? params.relatedDocuments : JSONUtil.toJSON(params.relatedDocuments);
	var approvers = isPrimitive(params.approvers) ? params.approvers : JSONUtil.toJSON(params.approvers);
	var username = isPrimitive(params.username) ? params.username : JSONUtil.toJSON(params.username);

	dataset.addRow([error.message, password, companyId, security, attachments, document, relatedDocuments, approvers, username]);

	return dataset;
}

function getParamValue(param, assignment) {
	if (assignment == 'VARIABLE') {
		return getValue(param);
	} else if (assignment == 'NULL') {
		return null;
	}
	return param;
}

function hasValue(value) {
	return value !== null && value !== undefined;
}

function isPrimitive(value) {
	return ((typeof value === 'string') || value.substring !== undefined) || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'undefined';
}


function fillSociableDocumentDto(serviceHelper, params, assigns) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.SociableDocumentDto");

	var commented = getParamValue(params.commented, assigns.commented);
	if (hasValue(commented)) { result.setCommented(commented); }
	var denounced = getParamValue(params.denounced, assigns.denounced);
	if (hasValue(denounced)) { result.setDenounced(denounced); }
	var documentId = getParamValue(params.documentId, assigns.documentId);
	if (hasValue(documentId)) { result.setDocumentId(documentId); }
	var following = getParamValue(params.following, assigns.following);
	if (hasValue(following)) { result.setFollowing(following); }
	var liked = getParamValue(params.liked, assigns.liked);
	if (hasValue(liked)) { result.setLiked(liked); }
	var numberComments = getParamValue(params.numberComments, assigns.numberComments);
	if (hasValue(numberComments)) { result.setNumberComments(numberComments); }
	var numberDenouncements = getParamValue(params.numberDenouncements, assigns.numberDenouncements);
	if (hasValue(numberDenouncements)) { result.setNumberDenouncements(numberDenouncements); }
	var numberFollows = getParamValue(params.numberFollows, assigns.numberFollows);
	if (hasValue(numberFollows)) { result.setNumberFollows(numberFollows); }
	var numberLikes = getParamValue(params.numberLikes, assigns.numberLikes);
	if (hasValue(numberLikes)) { result.setNumberLikes(numberLikes); }
	var numberShares = getParamValue(params.numberShares, assigns.numberShares);
	if (hasValue(numberShares)) { result.setNumberShares(numberShares); }
	var shared = getParamValue(params.shared, assigns.shared);
	if (hasValue(shared)) { result.setShared(shared); }
	var sociableId = getParamValue(params.sociableId, assigns.sociableId);
	if (hasValue(sociableId)) { result.setSociableId(sociableId); }
	var version = getParamValue(params.version, assigns.version);
	if (hasValue(version)) { result.setVersion(version); }
	
	return result;
}

function fillDocumentDto(serviceHelper, params, assigns) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.DocumentDto");

	var accessCount = getParamValue(params.accessCount, assigns.accessCount);
	if (hasValue(accessCount)) { result.setAccessCount(accessCount); }
	var activeUserApprover = getParamValue(params.activeUserApprover, assigns.activeUserApprover);
	if (hasValue(activeUserApprover)) { result.setActiveUserApprover(activeUserApprover); }
	var activeVersion = getParamValue(params.activeVersion, assigns.activeVersion);
	if (hasValue(activeVersion)) { result.setActiveVersion(activeVersion); }
	var additionalComments = getParamValue(params.additionalComments, assigns.additionalComments);
	if (hasValue(additionalComments)) { result.setAdditionalComments(additionalComments); }
	var allowMuiltiCardsPerUser = getParamValue(params.allowMuiltiCardsPerUser, assigns.allowMuiltiCardsPerUser);
	if (hasValue(allowMuiltiCardsPerUser)) { result.setAllowMuiltiCardsPerUser(allowMuiltiCardsPerUser); }
	var approvalAndOr = getParamValue(params.approvalAndOr, assigns.approvalAndOr);
	if (hasValue(approvalAndOr)) { result.setApprovalAndOr(approvalAndOr); }
	var approved = getParamValue(params.approved, assigns.approved);
	if (hasValue(approved)) { result.setApproved(approved); }
	var approvedDate = serviceHelper.getDate(getParamValue(params.approvedDate, assigns.approvedDate));
	if (hasValue(approvedDate)) { result.setApprovedDate(approvedDate); }
	var articleContent = getParamValue(params.articleContent, assigns.articleContent);
	if (hasValue(articleContent)) { result.setArticleContent(articleContent); }
	var atualizationId = getParamValue(params.atualizationId, assigns.atualizationId);
	if (hasValue(atualizationId)) { result.setAtualizationId(atualizationId); }
	var backgroundColor = getParamValue(params.backgroundColor, assigns.backgroundColor);
	if (hasValue(backgroundColor)) { result.setBackgroundColor(backgroundColor); }
	var backgroundImage = getParamValue(params.backgroundImage, assigns.backgroundImage);
	if (hasValue(backgroundImage)) { result.setBackgroundImage(backgroundImage); }
	var bannerImage = getParamValue(params.bannerImage, assigns.bannerImage);
	if (hasValue(bannerImage)) { result.setBannerImage(bannerImage); }
	var cardDescription = getParamValue(params.cardDescription, assigns.cardDescription);
	if (hasValue(cardDescription)) { result.setCardDescription(cardDescription); }
	var colleagueId = getParamValue(params.colleagueId, assigns.colleagueId);
	if (hasValue(colleagueId)) { result.setColleagueId(colleagueId); }
	var colleagueName = getParamValue(params.colleagueName, assigns.colleagueName);
	if (hasValue(colleagueName)) { result.setColleagueName(colleagueName); }
	var companyId = getParamValue(params.companyId, assigns.companyId);
	if (hasValue(companyId)) { result.setCompanyId(companyId); }
	var convertDocumentType = getParamValue(params.convertDocumentType, assigns.convertDocumentType);
	if (hasValue(convertDocumentType)) { result.setConvertDocumentType(convertDocumentType); }
	var crc = getParamValue(params.crc, assigns.crc);
	if (hasValue(crc)) { result.setCrc(crc); }
	var createDate = serviceHelper.getDate(getParamValue(params.createDate, assigns.createDate));
	if (hasValue(createDate)) { result.setCreateDate(createDate); }
	var createDateInMilliseconds = getParamValue(params.createDateInMilliseconds, assigns.createDateInMilliseconds);
	if (hasValue(createDateInMilliseconds)) { result.setCreateDateInMilliseconds(createDateInMilliseconds); }
	var datasetName = getParamValue(params.datasetName, assigns.datasetName);
	if (hasValue(datasetName)) { result.setDatasetName(datasetName); }
	var dateFormStarted = getParamValue(params.dateFormStarted, assigns.dateFormStarted);
	if (hasValue(dateFormStarted)) { result.setDateFormStarted(dateFormStarted); }
	var deleted = getParamValue(params.deleted, assigns.deleted);
	if (hasValue(deleted)) { result.setDeleted(deleted); }
	var documentDescription = getParamValue(params.documentDescription, assigns.documentDescription);
	if (hasValue(documentDescription)) { result.setDocumentDescription(documentDescription); }
	var documentId = getParamValue(params.documentId, assigns.documentId);
	if (hasValue(documentId)) { result.setDocumentId(documentId); }
	var documentKeyWord = getParamValue(params.documentKeyWord, assigns.documentKeyWord);
	if (hasValue(documentKeyWord)) { result.setDocumentKeyWord(documentKeyWord); }
	var documentPropertyNumber = getParamValue(params.documentPropertyNumber, assigns.documentPropertyNumber);
	if (hasValue(documentPropertyNumber)) { result.setDocumentPropertyNumber(documentPropertyNumber); }
	var documentPropertyVersion = getParamValue(params.documentPropertyVersion, assigns.documentPropertyVersion);
	if (hasValue(documentPropertyVersion)) { result.setDocumentPropertyVersion(documentPropertyVersion); }
	var documentType = getParamValue(params.documentType, assigns.documentType);
	if (hasValue(documentType)) { result.setDocumentType(documentType); }
	var documentTypeId = getParamValue(params.documentTypeId, assigns.documentTypeId);
	if (hasValue(documentTypeId)) { result.setDocumentTypeId(documentTypeId); }
	var downloadEnabled = getParamValue(params.downloadEnabled, assigns.downloadEnabled);
	if (hasValue(downloadEnabled)) { result.setDownloadEnabled(downloadEnabled); }
	var draft = getParamValue(params.draft, assigns.draft);
	if (hasValue(draft)) { result.setDraft(draft); }
	var expirationDate = serviceHelper.getDate(getParamValue(params.expirationDate, assigns.expirationDate));
	if (hasValue(expirationDate)) { result.setExpirationDate(expirationDate); }
	var expiredForm = getParamValue(params.expiredForm, assigns.expiredForm);
	if (hasValue(expiredForm)) { result.setExpiredForm(expiredForm); }
	var expires = getParamValue(params.expires, assigns.expires);
	if (hasValue(expires)) { result.setExpires(expires); }
	var externalDocumentId = getParamValue(params.externalDocumentId, assigns.externalDocumentId);
	if (hasValue(externalDocumentId)) { result.setExternalDocumentId(externalDocumentId); }
	var favorite = getParamValue(params.favorite, assigns.favorite);
	if (hasValue(favorite)) { result.setFavorite(favorite); }
	var fileURL = getParamValue(params.fileURL, assigns.fileURL);
	if (hasValue(fileURL)) { result.setFileURL(fileURL); }
	var folderId = getParamValue(params.folderId, assigns.folderId);
	if (hasValue(folderId)) { result.setFolderId(folderId); }
	var forAproval = getParamValue(params.forAproval, assigns.forAproval);
	if (hasValue(forAproval)) { result.setForAproval(forAproval); }
	var hashAnnotations = getParamValue(params.hashAnnotations, assigns.hashAnnotations);
	if (hasValue(hashAnnotations)) { result.setHashAnnotations(hashAnnotations); }
	var iconId = getParamValue(params.iconId, assigns.iconId);
	if (hasValue(iconId)) { result.setIconId(iconId); }
	var iconPath = getParamValue(params.iconPath, assigns.iconPath);
	if (hasValue(iconPath)) { result.setIconPath(iconPath); }
	var imutable = getParamValue(params.imutable, assigns.imutable);
	if (hasValue(imutable)) { result.setImutable(imutable); }
	var indexed = getParamValue(params.indexed, assigns.indexed);
	if (hasValue(indexed)) { result.setIndexed(indexed); }
	var inheritApprovers = getParamValue(params.inheritApprovers, assigns.inheritApprovers);
	if (hasValue(inheritApprovers)) { result.setInheritApprovers(inheritApprovers); }
	var inheritSecurity = getParamValue(params.inheritSecurity, assigns.inheritSecurity);
	if (hasValue(inheritSecurity)) { result.setInheritSecurity(inheritSecurity); }
	var internalVisualizer = getParamValue(params.internalVisualizer, assigns.internalVisualizer);
	if (hasValue(internalVisualizer)) { result.setInternalVisualizer(internalVisualizer); }
	var isEncrypted = getParamValue(params.isEncrypted, assigns.isEncrypted);
	if (hasValue(isEncrypted)) { result.setIsEncrypted(isEncrypted); }
	var keyWord = getParamValue(params.keyWord, assigns.keyWord);
	if (hasValue(keyWord)) { result.setKeyWord(keyWord); }
	var languageId = getParamValue(params.languageId, assigns.languageId);
	if (hasValue(languageId)) { result.setLanguageId(languageId); }
	var languageIndicator = getParamValue(params.languageIndicator, assigns.languageIndicator);
	if (hasValue(languageIndicator)) { result.setLanguageIndicator(languageIndicator); }
	var lastModifiedDate = serviceHelper.getDate(getParamValue(params.lastModifiedDate, assigns.lastModifiedDate));
	if (hasValue(lastModifiedDate)) { result.setLastModifiedDate(lastModifiedDate); }
	var lastModifiedTime = getParamValue(params.lastModifiedTime, assigns.lastModifiedTime);
	if (hasValue(lastModifiedTime)) { result.setLastModifiedTime(lastModifiedTime); }
	var metaListId = getParamValue(params.metaListId, assigns.metaListId);
	if (hasValue(metaListId)) { result.setMetaListId(metaListId); }
	var metaListRecordId = getParamValue(params.metaListRecordId, assigns.metaListRecordId);
	if (hasValue(metaListRecordId)) { result.setMetaListRecordId(metaListRecordId); }
	var newStructure = getParamValue(params.newStructure, assigns.newStructure);
	if (hasValue(newStructure)) { result.setNewStructure(newStructure); }
	var notificationDays = getParamValue(params.notificationDays, assigns.notificationDays);
	if (hasValue(notificationDays)) { result.setNotificationDays(notificationDays); }
	var onCheckout = getParamValue(params.onCheckout, assigns.onCheckout);
	if (hasValue(onCheckout)) { result.setOnCheckout(onCheckout); }
	var parentDocumentId = getParamValue(params.parentDocumentId, assigns.parentDocumentId);
	if (hasValue(parentDocumentId)) { result.setParentDocumentId(parentDocumentId); }
	var pdfRenderEngine = getParamValue(params.pdfRenderEngine, assigns.pdfRenderEngine);
	if (hasValue(pdfRenderEngine)) { result.setPdfRenderEngine(pdfRenderEngine); }
	var permissionType = getParamValue(params.permissionType, assigns.permissionType);
	if (hasValue(permissionType)) { result.setPermissionType(permissionType); }
	var phisicalFile = getParamValue(params.phisicalFile, assigns.phisicalFile);
	if (hasValue(phisicalFile)) { result.setPhisicalFile(phisicalFile); }
	var phisicalFileSize = getParamValue(params.phisicalFileSize, assigns.phisicalFileSize);
	if (hasValue(phisicalFileSize)) { result.setPhisicalFileSize(phisicalFileSize); }
	var priority = getParamValue(params.priority, assigns.priority);
	if (hasValue(priority)) { result.setPriority(priority); }
	var privateColleagueId = getParamValue(params.privateColleagueId, assigns.privateColleagueId);
	if (hasValue(privateColleagueId)) { result.setPrivateColleagueId(privateColleagueId); }
	var privateDocument = getParamValue(params.privateDocument, assigns.privateDocument);
	if (hasValue(privateDocument)) { result.setPrivateDocument(privateDocument); }
	var protectedCopy = getParamValue(params.protectedCopy, assigns.protectedCopy);
	if (hasValue(protectedCopy)) { result.setProtectedCopy(protectedCopy); }
	var publicDocument = getParamValue(params.publicDocument, assigns.publicDocument);
	if (hasValue(publicDocument)) { result.setPublicDocument(publicDocument); }
	var publisherId = getParamValue(params.publisherId, assigns.publisherId);
	if (hasValue(publisherId)) { result.setPublisherId(publisherId); }
	var publisherName = getParamValue(params.publisherName, assigns.publisherName);
	if (hasValue(publisherName)) { result.setPublisherName(publisherName); }
	var quota = getParamValue(params.quota, assigns.quota);
	if (hasValue(quota)) { result.setQuota(quota); }
	var relatedFiles = getParamValue(params.relatedFiles, assigns.relatedFiles);
	if (hasValue(relatedFiles)) { result.setRelatedFiles(relatedFiles); }
	var restrictionType = getParamValue(params.restrictionType, assigns.restrictionType);
	if (hasValue(restrictionType)) { result.setRestrictionType(restrictionType); }
	var rowId = getParamValue(params.rowId, assigns.rowId);
	if (hasValue(rowId)) { result.setRowId(rowId); }
	var searchNumber = getParamValue(params.searchNumber, assigns.searchNumber);
	if (hasValue(searchNumber)) { result.setSearchNumber(searchNumber); }
	var securityLevel = getParamValue(params.securityLevel, assigns.securityLevel);
	if (hasValue(securityLevel)) { result.setSecurityLevel(securityLevel); }
	var siteCode = getParamValue(params.siteCode, assigns.siteCode);
	if (hasValue(siteCode)) { result.setSiteCode(siteCode); }
	result.setSociableDocumentDto(fillSociableDocumentDto(serviceHelper, params.sociableDocumentDto, assigns.sociableDocumentDto));
	var socialDocument = getParamValue(params.socialDocument, assigns.socialDocument);
	if (hasValue(socialDocument)) { result.setSocialDocument(socialDocument); }
	var tool = getParamValue(params.tool, assigns.tool);
	if (hasValue(tool)) { result.setTool(tool); }
	var topicId = getParamValue(params.topicId, assigns.topicId);
	if (hasValue(topicId)) { result.setTopicId(topicId); }
	var translated = getParamValue(params.translated, assigns.translated);
	if (hasValue(translated)) { result.setTranslated(translated); }
	var uUID = getParamValue(params.uUID, assigns.uUID);
	if (hasValue(uUID)) { result.setUUID(uUID); }
	var updateIsoProperties = getParamValue(params.updateIsoProperties, assigns.updateIsoProperties);
	if (hasValue(updateIsoProperties)) { result.setUpdateIsoProperties(updateIsoProperties); }
	var userAnswerForm = getParamValue(params.userAnswerForm, assigns.userAnswerForm);
	if (hasValue(userAnswerForm)) { result.setUserAnswerForm(userAnswerForm); }
	var userNotify = getParamValue(params.userNotify, assigns.userNotify);
	if (hasValue(userNotify)) { result.setUserNotify(userNotify); }
	var userPermission = getParamValue(params.userPermission, assigns.userPermission);
	if (hasValue(userPermission)) { result.setUserPermission(userPermission); }
	var validationStartDate = serviceHelper.getDate(getParamValue(params.validationStartDate, assigns.validationStartDate));
	if (hasValue(validationStartDate)) { result.setValidationStartDate(validationStartDate); }
	var version = getParamValue(params.version, assigns.version);
	if (hasValue(version)) { result.setVersion(version); }
	var versionDescription = getParamValue(params.versionDescription, assigns.versionDescription);
	if (hasValue(versionDescription)) { result.setVersionDescription(versionDescription); }
	var versionOption = getParamValue(params.versionOption, assigns.versionOption);
	if (hasValue(versionOption)) { result.setVersionOption(versionOption); }
	var visualization = getParamValue(params.visualization, assigns.visualization);
	if (hasValue(visualization)) { result.setVisualization(visualization); }
	var volumeId = getParamValue(params.volumeId, assigns.volumeId);
	if (hasValue(volumeId)) { result.setVolumeId(volumeId); }
	var watermarkId = getParamValue(params.watermarkId, assigns.watermarkId);
	if (hasValue(watermarkId)) { result.setWatermarkId(watermarkId); }
	
	return result;
}

function fillDocumentDtoArray(serviceHelper, params, assigns) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.DocumentDtoArray");

	for (var i = 0; i < params.length; i++) {
		result.getItem().add(fillDocumentDto(serviceHelper, params[i], assigns[i]));
	}

	return result;
}

function fillAttachment(serviceHelper, params, assigns) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.Attachment");

	var attach = getParamValue(params.attach, assigns.attach);
	if (hasValue(attach)) { result.setAttach(attach); }
	var descriptor = getParamValue(params.descriptor, assigns.descriptor);
	if (hasValue(descriptor)) { result.setDescriptor(descriptor); }
	var editing = getParamValue(params.editing, assigns.editing);
	if (hasValue(editing)) { result.setEditing(editing); }
	var fileName = getParamValue(params.fileName, assigns.fileName);
	if (hasValue(fileName)) { result.setFileName(fileName); }
	result.setFileSelected(fillAttachment(serviceHelper, params.fileSelected, assigns.fileSelected));
	var fileSize = getParamValue(params.fileSize, assigns.fileSize);
	if (hasValue(fileSize)) { result.setFileSize(fileSize); }
	var filecontent = getParamValue(params.filecontent, assigns.filecontent);
	if (hasValue(filecontent)) { result.setFilecontent(filecontent); }
	var fullPatch = getParamValue(params.fullPatch, assigns.fullPatch);
	if (hasValue(fullPatch)) { result.setFullPatch(fullPatch); }
	var iconPath = getParamValue(params.iconPath, assigns.iconPath);
	if (hasValue(iconPath)) { result.setIconPath(iconPath); }
	var mobile = getParamValue(params.mobile, assigns.mobile);
	if (hasValue(mobile)) { result.setMobile(mobile); }
	var pathName = getParamValue(params.pathName, assigns.pathName);
	if (hasValue(pathName)) { result.setPathName(pathName); }
	var principal = getParamValue(params.principal, assigns.principal);
	if (hasValue(principal)) { result.setPrincipal(principal); }
	var supportedNewViewer = getParamValue(params.supportedNewViewer, assigns.supportedNewViewer);
	if (hasValue(supportedNewViewer)) { result.setSupportedNewViewer(supportedNewViewer); }
	
	return result;
}

function fillAttachmentArray(serviceHelper, params, assigns) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.AttachmentArray");

	for (var i = 0; i < params.length; i++) {
		result.getItem().add(fillAttachment(serviceHelper, params[i], assigns[i]));
	}

	return result;
}

function fillDocumentSecurityConfigDto(serviceHelper, params, assigns) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.DocumentSecurityConfigDto");

	var attributionType = getParamValue(params.attributionType, assigns.attributionType);
	if (hasValue(attributionType)) { result.setAttributionType(attributionType); }
	var attributionValue = getParamValue(params.attributionValue, assigns.attributionValue);
	if (hasValue(attributionValue)) { result.setAttributionValue(attributionValue); }
	var companyId = getParamValue(params.companyId, assigns.companyId);
	if (hasValue(companyId)) { result.setCompanyId(companyId); }
	var documentId = getParamValue(params.documentId, assigns.documentId);
	if (hasValue(documentId)) { result.setDocumentId(documentId); }
	var downloadEnabled = getParamValue(params.downloadEnabled, assigns.downloadEnabled);
	if (hasValue(downloadEnabled)) { result.setDownloadEnabled(downloadEnabled); }
	var inheritSecurity = getParamValue(params.inheritSecurity, assigns.inheritSecurity);
	if (hasValue(inheritSecurity)) { result.setInheritSecurity(inheritSecurity); }
	var permission = getParamValue(params.permission, assigns.permission);
	if (hasValue(permission)) { result.setPermission(permission); }
	var securityLevel = getParamValue(params.securityLevel, assigns.securityLevel);
	if (hasValue(securityLevel)) { result.setSecurityLevel(securityLevel); }
	var securityVersion = getParamValue(params.securityVersion, assigns.securityVersion);
	if (hasValue(securityVersion)) { result.setSecurityVersion(securityVersion); }
	var sequence = getParamValue(params.sequence, assigns.sequence);
	if (hasValue(sequence)) { result.setSequence(sequence); }
	var showContent = getParamValue(params.showContent, assigns.showContent);
	if (hasValue(showContent)) { result.setShowContent(showContent); }
	var version = getParamValue(params.version, assigns.version);
	if (hasValue(version)) { result.setVersion(version); }
	
	return result;
}

function fillDocumentSecurityConfigDtoArray(serviceHelper, params, assigns) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.DocumentSecurityConfigDtoArray");

	for (var i = 0; i < params.length; i++) {
		result.getItem().add(fillDocumentSecurityConfigDto(serviceHelper, params[i], assigns[i]));
	}

	return result;
}

function fillApproverDto(serviceHelper, params, assigns) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.ApproverDto");

	var approvelMode = getParamValue(params.approvelMode, assigns.approvelMode);
	if (hasValue(approvelMode)) { result.setApprovelMode(approvelMode); }
	var approverType = getParamValue(params.approverType, assigns.approverType);
	if (hasValue(approverType)) { result.setApproverType(approverType); }
	var colleagueId = getParamValue(params.colleagueId, assigns.colleagueId);
	if (hasValue(colleagueId)) { result.setColleagueId(colleagueId); }
	var companyId = getParamValue(params.companyId, assigns.companyId);
	if (hasValue(companyId)) { result.setCompanyId(companyId); }
	var documentId = getParamValue(params.documentId, assigns.documentId);
	if (hasValue(documentId)) { result.setDocumentId(documentId); }
	var levelDescription = getParamValue(params.levelDescription, assigns.levelDescription);
	if (hasValue(levelDescription)) { result.setLevelDescription(levelDescription); }
	var levelId = getParamValue(params.levelId, assigns.levelId);
	if (hasValue(levelId)) { result.setLevelId(levelId); }
	var version = getParamValue(params.version, assigns.version);
	if (hasValue(version)) { result.setVersion(version); }
	
	return result;
}

function fillApproverDtoArray(serviceHelper, params, assigns) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.ApproverDtoArray");

	for (var i = 0; i < params.length; i++) {
		result.getItem().add(fillApproverDto(serviceHelper, params[i], assigns[i]));
	}

	return result;
}

function fillRelatedDocumentDto(serviceHelper, params, assigns) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.RelatedDocumentDto");

	var companyId = getParamValue(params.companyId, assigns.companyId);
	if (hasValue(companyId)) { result.setCompanyId(companyId); }
	var documentId = getParamValue(params.documentId, assigns.documentId);
	if (hasValue(documentId)) { result.setDocumentId(documentId); }
	var relatedDocumentId = getParamValue(params.relatedDocumentId, assigns.relatedDocumentId);
	if (hasValue(relatedDocumentId)) { result.setRelatedDocumentId(relatedDocumentId); }
	var version = getParamValue(params.version, assigns.version);
	if (hasValue(version)) { result.setVersion(version); }
	
	return result;
}

function fillRelatedDocumentDtoArray(serviceHelper, params, assigns) {
	if (params == null) {
		return null;
	}

	var result = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.RelatedDocumentDtoArray");

	for (var i = 0; i < params.length; i++) {
		result.getItem().add(fillRelatedDocumentDto(serviceHelper, params[i], assigns[i]));
	}

	return result;
}

function getObjectFactory(serviceHelper) {
	var objectFactory = serviceHelper.instantiate("com.totvs.technology.ecm.dm.ws.ObjectFactory");

	return objectFactory;
}



function data() {
	return {
  "fluigService" : "ECMDocumentService",
  "operation" : "updateDocument",
  "soapService" : "ECMDocumentServiceService",
  "portType" : "DocumentService",
  "locatorClass" : "com.totvs.technology.ecm.dm.ws.ECMDocumentServiceService",
  "portTypeMethod" : "getDocumentServicePort",
  "parameters" : [ ],
  "inputValues" : {
    "password" : "1",
    "companyId" : 1,
    "security" : [ {
      "securityLevel" : 2
    }, {
      "securityLevel" : 3
    } ],
    "attachments" : [ ],
    "document" : [ ],
    "relatedDocuments" : [ ],
    "approvers" : [ ],
    "username" : "fluig"
  },
  "inputAssignments" : {
    "password" : "VALUE",
    "companyId" : "VALUE",
    "security" : [ {
      "securityLevel" : "VALUE"
    }, {
      "securityLevel" : "VALUE"
    } ],
    "attachments" : [ ],
    "document" : [ ],
    "relatedDocuments" : [ ],
    "approvers" : [ ],
    "username" : "VALUE"
  },
  "outputValues" : { },
  "outputAssignments" : { },
  "extraParams" : {
    "enabled" : false
  }
}
}

 function stringToBoolean(param) { if(typeof(param) === 'boolean') {  return param;  }  if (param == null || param === 'null') {  return false;  }  switch(param.toLowerCase().trim()) {  case 'true': case 'yes': case '1': return true;  case 'false': case 'no': case '0': case null: return false;  default: return Boolean(param);  }  } 