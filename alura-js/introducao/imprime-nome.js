var trsPacientes = document.getElementsByClassName("paciente");

percorreArray(trsPacientes, function(pacienteTr){

    // "Função Anônima" pode ser passada como parâmetro em Javascript
                         
    var pacienteAtual = montaPaciente(pacienteTr);

    console.log(pacienteAtual.nome);    
});