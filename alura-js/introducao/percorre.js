function percorreArray(trsPacientes, comportamento){
    
    // O parâmetro "comportamento" é uma função. Em Javascript podemos ter funções passadas como parâmetro.
    for(var posicaoAtual = 0; posicaoAtual <= trsPacientes.length-1; posicaoAtual++){
        var pacienteTrAtual = trsPacientes[posicaoAtual];
        comportamento(pacienteTrAtual);
    }

}