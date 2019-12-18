class Mensagem {

    // Atribui valor padrão para o parâmetro texto
    // Caso nada seja passado como parâmetro, '' será utilizado
    // constructor(texto='') {
        constructor(texto) {
        this._texto = texto;
    }

    get texto(){
        return this._texto;
    }

    set texto(texto){
        this._texto = texto;
    }
}