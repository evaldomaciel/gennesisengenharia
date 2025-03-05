function validateForm(form){}function validateForm(form) {
	var ATIVIDADE = Number(getValue("WKNumState")) ? Number(getValue("WKNumState")) : INICIO;
	var MODE = form.getFormMode()
	
	var ANEXOMAPADECOTACAO = 82

	var msgErro = "";
	
	if(ATIVIDADE == ANEXOMAPADECOTACAO){
		if (campoVazio(form, "fnRegistroNascDep")) {
			msgErro += "<li style='margin-bottom: 5px;'>Mapa De Cotação</li>";
		} 
		
		var totalDependentes = form.getChildrenIndexes("dependentes");
		for (var i = 0; i < totalDependentes.length; i++) {
			
			if(campoVazio(form, "fnRegistroNascDep___" + totalDependentes[i])){
				msgErro += "<li style='margin-bottom: 5px;'></li>";
			}
		}
	}

}


function campoVazio(form, fieldname) {
	if ((form.getValue(fieldname) == null) || (form.getValue(fieldname) == undefined) || (form.getValue(fieldname).trim() == "")) {
		return true;
	}
	return false;
}

function exibirMensagem(form, mensagem) {
	var mobile = form.getMobile() != null && form.getMobile();

	if (mobile) {
		throw mensagem;
	} else {
		throw "<br/><strong>Atenção:</strong> " + mensagem;
	}
}
