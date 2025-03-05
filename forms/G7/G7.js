$(document).ready(function () {
});

function setSelectedZoomItem(selectedItem) {
    if (selectedItem.inputId == "zTask015") {
        $("#cTask015").val(selectedItem["colleagueId"]);
    }
    if (selectedItem.inputId == "zTask016") {
        $("#cTask016").val(selectedItem["colleagueId"]);
    }
    if (selectedItem.inputId == "zTask021") {
        $("#cTask021").val(selectedItem["colleagueId"]);
    }
    if (selectedItem.inputId == "zTask029") {
        $("#cTask029").val(selectedItem["colleagueId"]);
    }
}

function removedZoomItem(removedItem) {
    if (removedItem.inputId == "zTask015") {
        $("#cTask015").val("");
    }
    if (removedItem.inputId == "zTask016") {
        $("#cTask016").val("");
    }
    if (removedItem.inputId == "zTask021") {
        $("#cTask021").val("");
    }
    if (removedItem.inputId == "zTask029") {
        $("#cTask029").val("");
    }
}

function gerarComprovante() {
    var doc = new jsPDF();
    doc.text("Comprovante de Pagamento", 105, 20, "center");
    doc.text("ID do Título: " + $("#id_titulo").val(), 20, 40);
    doc.text("ID do Fornecedor: " + $("#id_fornecedor").val(), 20, 50);
    doc.text("Data de Vencimento: " + $("#data_vencimento").val(), 20, 60);
    doc.text("Data de Pagamento: " + $("#data_pagamento").val(), 20, 70);
    doc.text("Valor do Título: " + $("#valor_titulo").val(), 20, 80);
    doc.text("Codigo de autenticação: " + $("#codigo_autenticacao").val(), 20, 90);
    doc.save("a4.pdf");
    console.log(doc)
}