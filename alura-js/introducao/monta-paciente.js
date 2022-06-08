function montaPaciente(pacienteTr){

    // A variável passada como parâmetro é a tag html <tr>
    var tdNome = pacienteTr.getElementsByClassName("info-nome")[0];
    var tdAltura = pacienteTr.getElementsByClassName("info-altura")[0];
    var tdPeso = pacienteTr.getElementsByClassName("info-peso")[0];

    var pacienteAtual = {nome: tdNome.textContent, 

        // Retornando a propriedade "textContent" da tag <tr>
        altura: tdAltura.textContent, 
        peso: tdPeso.textContent,
        pegaImc: function(){
           if (this.altura > 0){
               var imc = this.peso / (this.altura = this.altura);        
           }else{
               // Imprime no console do navegador
               console.log("Não é possível dividir por zero.")
           }                        
           return imc;
        }};
    return pacienteAtual;
}