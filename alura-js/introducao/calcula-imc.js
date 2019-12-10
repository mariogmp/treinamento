function calculaTodosImcs(){

    var trsPacientes = document.getElementsByClassName("paciente");

    percorreArray(trsPacientes, function(pacienteTr){

        var pacienteAtual = montaPaciente(pacienteTr);
    
        var imc = pacienteAtual.pegaImc(); 
    
        var tdImc = pacienteTr.getElementsByClassName("info-imc")[0];
        tdImc.textContent = imc;
    
        console.log(imc);
    });
}

var botao = document.getElementById("calcula-imcs");


/**
botao.onclick = calculaTodosImcs;

botao.onclick - function(){
    console.log("Calculando imcs");
    // Nesse caso somente este último método onclick será executado - Desvantagem da utilização do onclick
}
*/

botao.addEventListener("click", calculaTodosImcs);

botao.addEventListener("click", function(){
    console.log("calculando imcs...");
    //
});
