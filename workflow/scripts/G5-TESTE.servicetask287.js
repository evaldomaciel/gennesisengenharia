function servicetask287(attempt, message) {
	var lancamento = cancelaLancamentoRM(
		parseInt(hAPI.getCardValue('idLan')),
		parseInt(hAPI.getCardValue('CODCOLIGADA')),
		String('Cancelado na solicitação ' + getValue('WKNumProces') + ' do Fluig!')
	);
	return lancamento;
}


function cancelaLancamentoRM(idLan, codColigada, motivo) {
	try {
		var properties = {};
		properties['log.soap.messages'] = 'false';
		properties['disable.chunking'] = 'true';
		properties['use.ssl'] = 'false';
		properties['basic.authorization'] = 'true';
		properties['basic.authorization.username'] = getConstante('rm_usuario')
		properties['basic.authorization.password'] = getConstante('rm_senha')
		var idLanPr = codColigada + ' - ' + idLan;

		var strXmlParams = String('' +
			'<?xml version="1.0" encoding="utf-16"?>' +
			'<FinLanCancelamentoParamsProc z:Id="i1" xmlns="http://www.totvs.com.br/RM/" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:z="http://schemas.microsoft.com/2003/10/Serialization/">' +
			'  <ActionModule xmlns="http://www.totvs.com/">F</ActionModule>' +
			'  <ActionName xmlns="http://www.totvs.com/">FinLanCancelamentoAction</ActionName>' +
			'  <CanParallelize xmlns="http://www.totvs.com/">true</CanParallelize>' +
			'  <CanSendMail xmlns="http://www.totvs.com/">false</CanSendMail>' +
			'  <CanWaitSchedule xmlns="http://www.totvs.com/">false</CanWaitSchedule>' +
			'  <CodUsuario xmlns="http://www.totvs.com/">' + properties['basic.authorization.username'] + '</CodUsuario>' +
			'  <ConnectionId i:nil="true" xmlns="http://www.totvs.com/" />' +
			'  <ConnectionString i:nil="true" xmlns="http://www.totvs.com/" />' +
			'  <Context z:Id="i2" xmlns="http://www.totvs.com/" xmlns:a="http://www.totvs.com.br/RM/">' +
			'	<a:_params xmlns:b="http://schemas.microsoft.com/2003/10/Serialization/Arrays">' +
			'	  <b:KeyValueOfanyTypeanyType>' +
			'		<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$EXERCICIOFISCAL</b:Key>' +
			'		<b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">1</b:Value>' +
			'	  </b:KeyValueOfanyTypeanyType>' +
			'	  <b:KeyValueOfanyTypeanyType>' +
			'		<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODLOCPRT</b:Key>' +
			'		<b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value>' +
			'	  </b:KeyValueOfanyTypeanyType>' +
			'	  <b:KeyValueOfanyTypeanyType>' +
			'		<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODTIPOCURSO</b:Key>' +
			'		<b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value>' +
			'	  </b:KeyValueOfanyTypeanyType>' +
			'	  <b:KeyValueOfanyTypeanyType>' +
			'		<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$EDUTIPOUSR</b:Key>' +
			'		<b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value>' +
			'	  </b:KeyValueOfanyTypeanyType>' +
			'	  <b:KeyValueOfanyTypeanyType>' +
			'		<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODUNIDADEBIB</b:Key>' +
			'		<b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value>' +
			'	  </b:KeyValueOfanyTypeanyType>' +
			'	  <b:KeyValueOfanyTypeanyType>' +
			'		<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODCOLIGADA</b:Key>' +
			'		<b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">' + codColigada + '</b:Value>' +
			'	  </b:KeyValueOfanyTypeanyType>' +
			'	  <b:KeyValueOfanyTypeanyType>' +
			'		<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$RHTIPOUSR</b:Key>' +
			'		<b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value>' +
			'	  </b:KeyValueOfanyTypeanyType>' +
			'	  <b:KeyValueOfanyTypeanyType>' +
			'		<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODIGOEXTERNO</b:Key>' +
			'		<b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value>' +
			'	  </b:KeyValueOfanyTypeanyType>' +
			'	  <b:KeyValueOfanyTypeanyType>' +
			'		<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODSISTEMA</b:Key>' +
			'		<b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">F</b:Value>' +
			'	  </b:KeyValueOfanyTypeanyType>' +
			'	  <b:KeyValueOfanyTypeanyType>' +
			'		<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODUSUARIOSERVICO</b:Key>' +
			'		<b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema" />' +
			'	  </b:KeyValueOfanyTypeanyType>' +
			'	  <b:KeyValueOfanyTypeanyType>' +
			'		<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODUSUARIO</b:Key>' +
			'		<b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">' + properties['basic.authorization.username'] + '</b:Value>' +
			'	  </b:KeyValueOfanyTypeanyType>' +
			'	  <b:KeyValueOfanyTypeanyType>' +
			'		<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$IDPRJ</b:Key>' +
			'		<b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value>' +
			'	  </b:KeyValueOfanyTypeanyType>' +
			'	  <b:KeyValueOfanyTypeanyType>' +
			'		<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CHAPAFUNCIONARIO</b:Key>' +
			'		<b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value>' +
			'	  </b:KeyValueOfanyTypeanyType>' +
			'	  <b:KeyValueOfanyTypeanyType>' +
			'		<b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODFILIAL</b:Key>' +
			'		<b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">1</b:Value>' +
			'	  </b:KeyValueOfanyTypeanyType>' +
			'	</a:_params>' +
			'	<a:Environment>DotNet</a:Environment>' +
			'  </Context>' +
			'  <DisableIsolateProcess xmlns="http://www.totvs.com/">false</DisableIsolateProcess>' +
			'  <DriverType i:nil="true" xmlns="http://www.totvs.com/" />' +
			'  <FriendlyLogs i:nil="true" xmlns="http://www.totvs.com/" />' +
			'  <HideProgressDialog xmlns="http://www.totvs.com/">false</HideProgressDialog>' +
			'  <HostName xmlns="http://www.totvs.com/">' + properties['basic.authorization.username'] + '</HostName>' +
			'  <Initialized xmlns="http://www.totvs.com/">true</Initialized>' +
			'  <IsolateProcess xmlns="http://www.totvs.com/">false</IsolateProcess>' +
			'  <MasterActionName xmlns="http://www.totvs.com/">FinLanAction</MasterActionName>' +
			'  <MaximumQuantityOfPrimaryKeysPerProcess xmlns="http://www.totvs.com/">1000</MaximumQuantityOfPrimaryKeysPerProcess>' +
			'  <MinimumQuantityOfPrimaryKeysPerProcess xmlns="http://www.totvs.com/">1</MinimumQuantityOfPrimaryKeysPerProcess>' +
			'  <NetworkUser xmlns="http://www.totvs.com/">' + properties['basic.authorization.username'] + '</NetworkUser>' +
			'  <NotifyEmail xmlns="http://www.totvs.com/">false</NotifyEmail>' +
			'  <NotifyEmailList i:nil="true" xmlns="http://www.totvs.com/" xmlns:a="http://schemas.microsoft.com/2003/10/Serialization/Arrays" />' +
			'  <NotifyFluig xmlns="http://www.totvs.com/">false</NotifyFluig>' +
			'  <OnlineMode xmlns="http://www.totvs.com/">false</OnlineMode>' +
			'  <PrimaryKeyList xmlns="http://www.totvs.com/" xmlns:a="http://schemas.microsoft.com/2003/10/Serialization/Arrays">' +
			'	<a:ArrayOfanyType>' +
			'	  <a:anyType i:type="b:short" xmlns:b="http://www.w3.org/2001/XMLSchema">' + codColigada + '</a:anyType>' +
			'	  <a:anyType i:type="b:int" xmlns:b="http://www.w3.org/2001/XMLSchema">' + idLan + '</a:anyType>' +
			'	</a:ArrayOfanyType>' +
			'  </PrimaryKeyList>' +
			'  <PrimaryKeyNames xmlns="http://www.totvs.com/" xmlns:a="http://schemas.microsoft.com/2003/10/Serialization/Arrays">' +
			'	<a:string>CODCOLIGADA</a:string>' +
			'	<a:string>IDLAN</a:string>' +
			'  </PrimaryKeyNames>' +
			'  <PrimaryKeyTableName xmlns="http://www.totvs.com/">FLAN</PrimaryKeyTableName>' +
			'  <ProcessName xmlns="http://www.totvs.com/">Cancelar Lançamento</ProcessName>' +
			'  <QuantityOfSplits xmlns="http://www.totvs.com/">0</QuantityOfSplits>' +
			'  <SaveLogInDatabase xmlns="http://www.totvs.com/">true</SaveLogInDatabase>' +
			'  <SaveParamsExecution xmlns="http://www.totvs.com/">false</SaveParamsExecution>' +
			'  <ScheduleDateTime xmlns="http://www.totvs.com/">' + getFormattedDate() + '</ScheduleDateTime>' +
			'  <Scheduler xmlns="http://www.totvs.com/">JobMonitor</Scheduler>' +
			'  <SendMail xmlns="http://www.totvs.com/">false</SendMail>' +
			'  <ServerName xmlns="http://www.totvs.com/">FinLanCancelamentoData</ServerName>' +
			'  <ServiceInterface i:type="b:RuntimeType" z:FactoryType="c:UnitySerializationHolder" xmlns="http://www.totvs.com/" xmlns:a="http://schemas.datacontract.org/2004/07/System" xmlns:b="-mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089-System-System.RuntimeType" xmlns:c="-mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089-System-System.UnitySerializationHolder">' +
			'	<Data i:type="d:string" xmlns="" xmlns:d="http://www.w3.org/2001/XMLSchema">RM.Fin.Lan.IFinLanCancelamentoData</Data>' +
			'	<UnityType i:type="d:int" xmlns="" xmlns:d="http://www.w3.org/2001/XMLSchema">4</UnityType>' +
			'	<AssemblyName i:type="d:string" xmlns="" xmlns:d="http://www.w3.org/2001/XMLSchema">RM.Fin.Lan.Intf, Version=12.1.2402.139, Culture=neutral, PublicKeyToken=null</AssemblyName>' +
			'  </ServiceInterface>' +
			'  <ShouldParallelize xmlns="http://www.totvs.com/">false</ShouldParallelize>' +
			'  <ShowReExecuteButton xmlns="http://www.totvs.com/">true</ShowReExecuteButton>' +
			'  <StatusMessage i:nil="true" xmlns="http://www.totvs.com/" />' +
			'  <SuccessMessage xmlns="http://www.totvs.com/">Processo executado com sucesso</SuccessMessage>' +
			'  <SyncExecution xmlns="http://www.totvs.com/">false</SyncExecution>' +
			'  <UseJobMonitor xmlns="http://www.totvs.com/">true</UseJobMonitor>' +
			'  <UserName xmlns="http://www.totvs.com/">' + properties['basic.authorization.username'] + '</UserName>' +
			'  <WaitSchedule xmlns="http://www.totvs.com/">false</WaitSchedule>' +
			'  <CodColigada>' + codColigada + '</CodColigada>' +
			'  <DataCancelamento>' + getFormattedDate() + '</DataCancelamento>' +
			'  <Historico>' + motivo + '</Historico>' +
			'  <ListaDeLancamentos xmlns:a="http://schemas.microsoft.com/2003/10/Serialization/Arrays">' +
			'	<a:int>' + idLan + '</a:int>' +
			'  </ListaDeLancamentos>' +
			'</FinLanCancelamentoParamsProc>');

		log.info(strXmlParams);

		var serviceHelper = ServiceManager.getService('wsProcess');
		var serviceLocator = serviceHelper.instantiate('com.totvs.WsProcess');
		var service = serviceLocator.getRMIwsProcess();
		var customClient = serviceHelper.getCustomClient(service, properties, []);
		var response = customClient.executeWithXmlParams('FinLanCancelamentoData', strXmlParams);

		log.info('response ' + idLanPr + ' >>>>>> ' + String(response));
		if (String(response) == '1' || String(response).indexOf('Pedido já recebido!') >= 0) {
			hAPI.setTaskComments(getValue('WKUser'), getValue('WKNumProces'), 0, 'Lançamento financeiro ' + idLanPr + ' cancelado com sucesso no Totvs RM.');
			return true;
		} else {
			throw String('Verifique se o laçamento ' + idLanPr + ' esta com o status "em aberto", pois somente nessa condição pode ser cancelado no RM. -> Erro do RM: ' + response);
		}

	} catch (error) {
		throw String(error);
	}
}

function getFormattedDate() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	if (month < 10) { month = '0' + month; }
	if (day < 10) { day = '0' + day; }
	return year + '-' + month + '-' + day;
}

function notificaCancelamento(textoMsg, destinatario) {
	var msg = '';
	msg += '<html>'
	msg += '	<body>'
	msg += '	<h2> Olá, ' + getValue('WKUser') + '</h2>';
	msg += '	<p> Ocorreu um erro na solicitação ' + String(getValue('WKNumProces')) + '</p>'
	msg += '	<p> Informamos que a solicitação ' + String(getValue('WKNumProces')) + 'foi cancelada pelo departamento financeiro pelos seguintes motivos: [motivo do cancelamento].'
	msg += '	<p>Atenciosamente,</p>'
	msg += '	<p>' + textoMsg + '</p>'
	msg += '	</body>'
	msg += '</html>'
	var obj = new com.fluig.foundation.mail.service.EMailServiceBean();

	var assunto = String('ENGPAC - G5 - Fluig ' + String(getValue('WKNumProces')) + ' - Notificação de falha');
	var envido = obj.simpleEmail(1, assunto, 'suportefluig@engpac.com.br', destinatario, msg, 'text/html');
	return envido;
}