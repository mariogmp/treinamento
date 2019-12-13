class Mensagem {

    // Atribui valor padrão para o parâmetro texto
    // Caso nada seja passado como parâmetro, '' será utilizado
    // constructor(texto='') {
        constructor(texto) {
        console.log("Construindo mensagem: "+texto);
        this._texto = texto;
    }

    get texto(){
        return this._texto;
    }

    set texto(texto){
        console.log("Setando mensagem: "+texto);
        this._texto = texto;
    }
}