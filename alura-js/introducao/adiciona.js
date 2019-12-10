// O "#" sinaliza que o parâmetro refere-se a um id
var botao = document.querySelector("#adicionar-paciente");

botao.addEventListener("click", function(){

    // Impede o comportamento padrão (submissão do form no clique do botão) de ser executado
    // Caso o form seja submetido a linha do paciente novo aparecerá na tabela mas será excluído logo depois
    event.preventDefault();

    var campoNome = document.querySelector("#campo-nome");
    var campoPeso = document.querySelector("#campo-peso");
    var campoAltura = document.querySelector("#campo-altura");

    var pacienteNovo = "<tr class='paciente'>"+
    "<td class='info-nome'>" + campoNome.value + "</td>"+
    "<td class='info-peso'>" + campoPeso.value + "</td>"+
    "<td class='info-altura'>" + campoAltura.value + "</td>"+
    "<td class='info-imc'></td>"+
    "</tr>"

    // Retorna a primeira "table" (posição 0)                
    //var tabela = document.getElementsByName("table")[0];

    // Retorna todos as "table" encontradas no html
    // document.querySelectorAll("table")

    // Retorna a primeira "table" encontrada no html
    var tabela = document.querySelector("table");

    // Concatena o conteúdo da table existente com o paciente novo criado
    tabela.innerHTML = tabela.innerHTML + pacienteNovo;    

    campoNome.value = "";
    campoPeso.value = "";
    campoAltura.value = "";

})
