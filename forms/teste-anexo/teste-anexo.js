//data:@file/plain;base64,QW5leG8gMg==
function uploadFileWithFormData(formData) {
	try {
		var element = null;
		if (parent && parent.document) {
			element = parent.document.getElementById("ecm-navigation-inputFile-clone");
		} else {
			element = document.getElementById("ecm-navigation-inputFile-clone");
		}
		if (element) {
			var file = formData.get('file');
			var dataTransfer = new DataTransfer();
			var fileInput = new File([file], file.name, { type: file.type });
			dataTransfer.items.add(fileInput);
			element.files = dataTransfer.files;
			var event = new Event('change', { bubbles: true });
			element.dispatchEvent(event);
			console.log(`Arquivo ${file.name} anexado com sucesso.`);
		} else {
			console.error("Elemento de upload de arquivo não encontrado.");
		}
	} catch (e) {
		console.error("Houve um erro ao anexar o arquivo");
		console.error(e);
	}
}

// Captura do evento de mudança no input de arquivo original
document.getElementById('inputFile').addEventListener('change', function (event) {
    const inputFile = event.target.files[0]; // Obtém o arquivo selecionado
    if (inputFile) {
        const formData = new FormData(); 
        formData.append('file', inputFile); // Adiciona o arquivo ao FormData

        // Chama a função com o FormData como argumento
        uploadFileWithFormData(formData);
    }
});