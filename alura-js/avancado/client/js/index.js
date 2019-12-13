// Esse código será evoluído para um modelo MVC

var campos = [
    // Permite buscar elementos da página em css também
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor'),
];

var tBody = document.querySelector('table tbody');

document.querySelector(".form").addEventListener('submit', function(event){

    event.preventDefault();

    var tr = document.createElement('tr');

    campos.forEach(function(campo){

        var td = document.createElement('td');
        td.textContent = campo.value;
        tr.appendChild(td);        
    });

    var tdVolume = document.createElement('td');
    tdVolume.textContent = campos[1].value * campos[2].value;
    tr.appendChild(tdVolume);

    tBody.appendChild(tr);

    // Resetando os campos do form
    campos[0].value = "";
    campos[1].value = "1";
    campos[2].value = "0";
    campos[0].focus();

});


// Outra forma de adicionar um elemento na table
/**
var data = document.querySelector("#data");
var quantidade = document.querySelector("#quantidade");
var valor = document.querySelector("#valor");

var tr = "<tr>"+
         "<th>"+ data.value +"</th>"+
         "<th>"+ quantidade.value +"</th>"+
         "<th>"+ valor.value +"</th>"+
         "<th>"+  +"</th>"+
         "</tr>"

var table = document.querySelector("table");

table.innerHTML = table.innerHTML + tr;
*/
