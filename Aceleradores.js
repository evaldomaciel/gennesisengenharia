
var lista = getDefaultValues();

var novoObj = new Array();
lista.forEach(element => {
    novoObj.push([
        element[0] + "-" + element[2], // id
        element[0], // setor
        element[2], // codigo
        element[1].split("-")[1], // descrição
        element[1], // filtro
    ]);
});

console.log(novoObj)