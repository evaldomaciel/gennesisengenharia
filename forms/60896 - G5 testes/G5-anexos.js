/**
 * Toda a lógica para o correto funcionamento desse componente foi feito em cima das classes abaixo:
 * .componentAnexo, .descAnexo, .inputAnexo, .btnUpFile, .btnViewerFile, .btnDownloadFile e o atributo data-acao
 * Sem elas o código não irá funcionar, então se por acaso você quiser alterar os nomes dessas classes
 * lembre-se de alterar nas funções desse arquivo e também no css
 */

/**
 * Direciona para cada função correspondente ao valor que esta no atributo data-acao do botão
 * @param {object} event Parâmetro obrigatório, o própio elemento que sofreu o evento click
 * @return {void} 
 * @author Sérgio Machado
 */
function anexo(event) {
	try {
		console.log("TESTE");
		const acao = event.currentTarget.getAttribute("data-acao");
		const inputFile = $(event.currentTarget).parent().parent().find(".inputAnexo")[0]
		const fileDescription = $(event.currentTarget).parent().parent().find(".descAnexo").val()
		if (acao == "upload") {
			console.log("TESTE 2");
			console.log("------> " + inputFile + " -----> " + fileDescription);

			// const id = $(event.target.parentElement.parentElement.parentElement).find('.inputAnexo')[0].id.split('___')[1]
			// JSInterface.showCamera(`Anexo_pagamento_unico___${id}`);

			// setTimeout(() => {
            //     window.parent.$('#formTab').children()[0].click()
            // }, 1000)
            // setTimeout(() => {
            //     $('html, body').animate({
            //         scrollTop: $("#table_pagamento_unico").offset().top
            //     }, 600);
            // }, 2000)

			// $(`#anexo_pu___${id}`).val(`Anexo_pagamento_unico___${id}`)
			uploadFile(fileDescription, inputFile.id)
		}
		if (acao == "viewer") {
			viewerFile(fileDescription)
		}
		if (acao == "download") {
			downloadFile(fileDescription, inputFile.id)
		}
		if (acao == "delete") {
			removeFileConfirm(fileDescription, inputFile.id)
		}
	} catch (e) {
		console.error("Houve um erro inesperado na função anexo")
		console.error(e)
	}
}


/**
 * Envia arquivos para a aba Anexos do Fluig
 * Função adaptada por Sérgio Machado
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do arquivo que ficará na aba anexos do Fluig
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @return {void} 
 */
function uploadFile(fileDescription, idInput) {
	try {
		var tabAttachments = parent.document.getElementById("tab-attachments");
		if (tabAttachments) {
			//Verifica se o navegador é o Ie9 para realizar o devido tratamento
			if (parent.WCMAPI.isIe9()) {
				$(".ecm-navigation-silverlight", parent.document).show("fade").css("top", 0);
				$("#ecm-navigation-silverlight", parent.document).attr({
					"data-on-camera": "true", "data-file-name-camera": fileDescription, "data-inputNameFile": idInput
				});
				$(parent.document).on("keyup", this.actionKeyup)
			} else {
				var element = parent.document.getElementById("ecm-navigation-inputFile-clone");
				if (element && document.createEvent) {
					element.setAttribute("data-on-camera", "true");
					if (fileDescription && idInput) {
						element.setAttribute("data-file-name-camera", fileDescription)
						element.setAttribute("data-inputNameFile", idInput)
					}
					//Realiza o click no botão "Carregar arquivos" que tem na aba de anexos
					element.click();
				}
			}
		}
	} catch (e) {
		console.error("Houve um erro inesperado na função uploadFile")
		console.error(e)
	}
}

function setNameFileInput(fileName){
	Array.from($('[id*=anexo_pu]')).forEach((element, index) => {
		if(index > 0){
			if(element.value == ''){
				element.value = fileName;
				return
			}
		}
	})
}

/**
 * Função executada após a escolha do arquivo a ser enviado para o Fluig.
 * Verifica se o anexo já existe, seta o valor do arquivo fisico no campo e altera o estado dos botões
 * @return {void} 
 */
$(function () {
	try {
		window.parent.$("#ecm-navigation-inputFile-clone").on('change', function (e) {
			const inputNameFile = this.getAttribute("data-inputNameFile");
			const fileDescription = this.getAttribute("data-file-name-camera");
			const filePhisical = this.files[0].name;
			setNameFileInput(filePhisical)
			if (fileDescription && fileDescription) {
				/**
				 * O trecho de código abaixo percorre os anexos do Fluig e caso já exista um anexo com a mesma descrição, ele será removido. 
				 * Em seguida limpa o campo onde é armazenado o nome fisico do arquivo
				 */
				$.each(parent.ECM.attachmentTable.getData(), function (i, attachment) {
					var descricao = attachment.description;
					if (fileDescription == descricao) {
						parent.WKFViewAttachment.removeAttach([i]);
						setFilePhisicalName(inputNameFile, "");
					}
				});
				setFilePhisicalName(inputNameFile, filePhisical)
				if (getMode() == "ADD") {
					btnState(inputNameFile, 'delete', 'download');
				}
				if (getMode() == "MOD") {
					btnState(inputNameFile, 'delete', 'viewer');
				}
			}
		});
	} catch (e) {
		console.error("Houve um erro inesperado ao selecionar o arquivo")
		console.error(e)
	}
});


/**
 * Visualizar arquivos que esta na aba Anexos do Fluig
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do anexo
 * @return {void} 
 */
function viewerFile(fileDescription) {
	try {
		if (hasFileFluig(fileDescription)) {
			const anexos = parent.ECM.attachmentTable.getData();
			for (let i = 0; i < anexos.length; i++) {
				var descricao = anexos[i].description;
				if (fileDescription == descricao) {
					parent.WKFViewAttachment.openAttachmentView('adm', anexos[i].documentId);
					return
				}
			}
		} else {
			FLUIGC.toast({
				title: "Atenção",
				message: "Anexo não encontrado",
				type: "warning"
			});
		}
	} catch (e) {
		console.error("Houve um erro inesperado na função viewerFile")
		console.error(e)
	}
}


/**
 * Realiza o download do arquivo que esta na aba Anexos do Fluig
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do arquivo que esta na aba anexos do Fluig
 * @return {void} 
 */
function downloadFile(fileDescription, idInput) {
	try {
		const filename = getMode() == "VIEW" ? $(`#${idInput}`).text() : $(`#${idInput}`).val()
		FLUIGC.message.confirm({
			message: `Deseja baixar o anexo <b>${filename}</b>?`,
			title: 'Confirmação',
			labelYes: 'Sim, quero baixar',
			labelNo: 'Não, quero cancelar',
		}, function (result) {
			if (result) {
				$.each(parent.ECM.attachmentTable.getData(), function (i, attachment) {
					var descricao = attachment.description;
					if (fileDescription == descricao) {
						parent.WKFViewAttachment.downloadAttach([i]);
					}
				});
			}
		});
	} catch (e) {
		console.error("Houve um erro inesperado na função downloadFile")
		console.error(e)
	}
}

/**
 * Confirmação para Remove arquivo que esta na aba Anexos do Fluig
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do arquivo que esta na aba anexos do Fluig
 * @return {void} 
 * @author Sérgio Machado
 */
function removeFileConfirm(fileDescription, idInput) {
	try {
		const filename = $(`#${idInput}`).val()
		FLUIGC.message.confirm({
			message: `Deseja remover o anexo <b>${filename}</b>?`,
			title: 'Confirmação',
			labelYes: 'Sim, quero remover',
			labelNo: 'Não, quero cancelar',
		}, function (result) {
			if (result) {
				removeFile(fileDescription)
				setFilePhisicalName(idInput, "")
				btnState(idInput, "upload", "download")
			}
		});
	} catch (e) {
		console.error("Houve um erro inesperado na função removeFileConfirm")
		console.error(e)
	}
}

/**
 * Remove arquivo que esta na aba Anexos do Fluig
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do arquivo que esta na aba anexos do Fluig
 * @return {void} 
 * @author Sérgio Machado
 */
function removeFile(fileDescription) {
	try {
		$.each(parent.ECM.attachmentTable.getData(), function (i, attachment) {
			if (attachment.description == fileDescription) {
				parent.WKFViewAttachment.removeAttach([i]);
			}
		});
	} catch (e) {
		console.error("Houve um erro inesperado na função removeFile")
		console.error(e)
	}
}


/**
 * Seta o nome do arquivo fisico no campo e realiza tratativa caso o campo esteja bloqueado pelo enableFields
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @param {String} filePhisical Parâmetro obrigatório, nome do arquivo fisico
 * @return {void} 
 * @author Sérgio Machado
 */
function setFilePhisicalName(idInput, filePhisical) {
	try {
		if (idInput.indexOf("_") == 0) {
			$("#" + idInput.substring(1)).val(filePhisical);
		}
		$("#" + idInput).val(filePhisical);
	} catch (e) {
		console.error("Houve um erro inesperado na função setFilePhisicalName")
		console.error(e)
	}
}


/**
 * Altera o estado e visibilidade dos botões de anexos
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @param {String} acao Parâmetro obrigatório, ação para ser executada no momento do click, se é delete ou upload
 * @param {String} btn Parâmetro obrigatório, botão secundário que deve sofrer ação de ficar visível ou não. Botão de Download ou Viewer
 * @return {void} 
 * @author Sérgio Machado
 */
function btnState(idInput, acao, btn) {
	try {
		let btnUpFile = $(`#${idInput}`).parent().parent().find(".btnUpFile");
		let btnDownloadFile = $(`#${idInput}`).parent().parent().find(".btnDownloadFile");
		let btnViewerFile = $(`#${idInput}`).parent().parent().find(".btnViewerFile");
		if (acao == "delete") {
			btnUpFile.removeClass("btn-success").addClass("btn-danger");
			btnUpFile.attr('data-acao', acao);
			//btnUpFile.find("i").removeClass("flaticon-upload").addClass("flaticon-trash");
			btnUpFile.find("i").removeClass("flaticon-paperclip").addClass("flaticon-trash");
			btnUpFile.find("span").text("").text(" Remover");
			if (btn == "download") {
				btnDownloadFile.prop("disabled", false);
				btnDownloadFile.show()
			}
			if (btn == "viewer") {
				btnViewerFile.prop("disabled", false);
				btnViewerFile.show()
			}
		}
		if (acao == "upload") {
			btnUpFile.removeClass("btn-danger").addClass("btn-success");
			btnUpFile.attr('data-acao', acao);
			//btnUpFile.find("i").removeClass("flaticon-trash").addClass("flaticon-upload");
			btnUpFile.find("i").removeClass("flaticon-trash").addClass("flaticon-paperclip");
			btnUpFile.find("span").text("").text(" Anexar");
			btnDownloadFile.prop("disabled", true);
			btnDownloadFile.hide()
			btnViewerFile.prop("disabled", true);
			btnViewerFile.hide()
		}
		if (acao == "") {
			btnUpFile.hide()
			btnDownloadFile.prop("disabled", false);
			btnDownloadFile.show()
		}
		
	} catch (e) {
		console.error("Houve um erro inesperado na função btnState")
		console.error(e)
	}
}


/**
 * Faz tratativa nos botões do anexos percorrente cada class .componentAnexo
 * Em modo de visualização o botão de upload é removido, e caso tenha anexo, habilita o botão de visualização do anexo
 * Se em modo de edição e conter anexo o botão de upload é alterado para o botão de deletar anexos e habilita o botão de visualização
 * @return {void} 
 * @author Sérgio Machado
 */
function displayBtnFiles() {
	try {
		$('.componentAnexo').each(function (i, element) {
			let inputFile = $(element).find(".inputAnexo")
			let btnUpFile = $(element).find(".btnUpFile");
			let btnViewerFile = $(element).find(".btnViewerFile");
			if (getMode() == "VIEW") {
				btnUpFile.remove();
				if (inputFile.val() != "") {
					btnViewerFile.prop("disabled", false);
					btnViewerFile.show()
				}
			}
			if (getMode() == "MOD" && inputFile.val() != "") {
				btnState(inputFile[0].id, "")
				// btnState(inputFile[0].id, "delete", "viewer")
				// let state = getWKNumState()
				
				
				// if([12, 16, 22].indexOf(state)){
				// 	if(["fnMapaTipoDemanda"].indexOf(inputFile[0].id) > -1){
				// 		btnState(inputFile[0].id, "")
				// 	} 
				// }

				
			}
		});
	} catch (e) {
		console.error("Houve um erro inesperado na função displayBtnFiles")
		console.error(e)
	}
}


/**
 * Remove o botão de upload/delete
 * @param {String} inputFile Parâmetro obrigatório, Id do campo
 * @return {void} 
 * @author Sérgio Machado
 */
function invisibleBtnUpload(inputFile) {
	try {
		if (getMode() == "MOD" || getMode() == "ADD") {
			if ($(`#_${inputFile}`).length) {
				let btnUpFile = $(`#_${inputFile}`).parent().parent().find(".btnUpFile");
				btnUpFile.remove();
			} else {
				let btnUpFile = $(`#${inputFile}`).parent().parent().find(".btnUpFile");
				btnUpFile.remove();
			}
		}
		if ($(`#_${inputFile}`).length) {
			if ($(`#_${inputFile}`).val() == "") {
				$(`#_${inputFile}`).attr({ placeholder: "Nenhuma anexo encontrado" });
			}
		} else {
			if ($(`#${inputFile}`).val() == "") {
				$(`#${inputFile}`).attr({ placeholder: "Nenhuma anexo encontrado" });
			}
		}
	} catch (e) {
		console.error("Houve um erro inesperado na função invisibleBtnUpload")
		console.error(e)
	}
}


/*COMPONENTES DE ANEXO*/

/**
 * Verifica se o campo do anexo esta preenchido, caso esteja, ele verifica se o anexo esta válido
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @return {Boolean}
 */
function invalidFile(idInput) {
	try {
		const inputNameFile = $(`#${idInput}`).val()
		if (inputNameFile) {
			if ($(`#_${idInput}`).length) {
				let fileDescription = $(`#_${idInput}`).parent().find(".descAnexo").val()
				return !hasFileFluig(fileDescription)
			} else {
				let fileDescription = $(`#${idInput}`).parent().find(".descAnexo").val()
				return !hasFileFluig(fileDescription)
			}
		} else {
			return false
		}
	} catch (e) {
		console.error('Houve um erro inesperado na função validFile')
		console.error(e)
	}
}

/**
 * Verifica se o anexo existe na aba de anexos do Fluig
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do arquivo
 * @return {Boolean} - Retorna verdadeiro caso o arquivo exista
 */
function hasFileFluig(fileDescription) {
	try {
		const anexos = parent.ECM.attachmentTable.getData();
		for (let i = 0; i < anexos.length; i++) {
			var descricao = anexos[i].description;
			if (fileDescription == descricao) {
				return true
			}
		}
		return false
	} catch (e) {
		console.error('Houve um erro inesperado na função validarAnexo')
		console.error(e)
	}
}

var beforeSendValidate = function(numState, nextState) {


    let attachments = parent.ECM.attachmentTable.getData()
    let hasAttachment = attachments.length > 0 ? true : false;    
	
	let hasPictures = $('input[id*="fnRelatorioFotografico___"]').length > 0 ? true : false;

	if($('input[id*="fnRelatorioFotografico___"]').length > 0){
		$('input[id*="fnRelatorioFotografico___"]').map( (index, el) => {
			if(el.value == ""){
				hasPictures = false
			}
		}) 
	}

    if (numState == 22 && nextState == 16) {
        if(!hasAttachment && !hasPictures) {
            throw ('<br><b><font color="red">Registro fotográfico de materiais exige anexos de imagens!</font> </b>');
        }
    }
    return true;
  }
