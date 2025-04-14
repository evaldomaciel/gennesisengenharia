fetch("/ecm/api/rest/ecm/workflowView/saveAttachments", {
	"headers": {
		"accept": "application/json, text/javascript, */*; q=0.01",
		"accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
		"content-type": "application/json; charset=UTF-8",
		"priority": "u=1, i",
		"sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
		"sec-ch-ua-mobile": "?0",
		"sec-ch-ua-platform": "\"Windows\"",
		"sec-fetch-dest": "empty",
		"sec-fetch-mode": "cors",
		"sec-fetch-site": "same-origin",
		"x-requested-with": "XMLHttpRequest"
	},
	"referrer": "/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=48278",
	"referrerPolicy": "strict-origin-when-cross-origin",
	"body": JSON.stringify(
		{
			"processId": "G4",
			"version": 202,
			"managerMode": false,
			"taskUserId": "suporte.fluig2",
			"processInstanceId": 48278,
			"isDigitalSigned": false,
			"selectedState": 12,
			"attachments": [
				{
					"description": "OC'Aprovadas FLUIG 22.08.xlsx",
					"attachments": [],
					"newAttach": true,
					"iconClass": "fluigicon-file-upload",
					"version": 1000,
					"documentId": 7953,
					"iconUrl": true,
					"iconPath": "icone/icon-xls.png",
					"physicalFileName": "OC'Aprovadas FLUIG 22.08.xlsx",
					"documentType": "2",
					"hasOwnSubMenu": false,
					"enablePublish": false,
					"enableEdit": true,
					"enableEditContent": true,
					"fromUpload": false,
					"enableDownload": true,
					"hasMoreOptions": true,
					"deleted": false,
					"colleagueId": "suporte.fluig2"
				}
			],
			"currentMovto": 3
		}
	),
	"method": "POST",
	"mode": "cors",
	"credentials": "include"
});