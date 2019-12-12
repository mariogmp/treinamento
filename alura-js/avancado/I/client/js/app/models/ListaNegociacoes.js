class ListaNegociacoes {

    // "Armadilha" será a função para atualização da view
    // Caso a função passada no parâmetro "armadilha" seja montado utilizando function necessito do contexto
    /**
    constructor(contexto, armadilha){
        this._negociacoes = [];
        this._armadilha = armadilha;
        this._contexto = contexto;
    }
    */

    // Caso "armadilha" seja montado por aerofunction não necessito do contexto
    /** 
    constructor(armadilha){
        this._negociacoes = [];
        this._armadilha = armadilha;
    }
    */

   constructor(){
    this._negociacoes = [];
   }

    adiciona(negociacao){

        this._negociacoes.push(negociacao);        

        // Necessito utilizar apenas caso a função "armadilha" seja montado utilizando function
        // Parâmetros: Método que quero chamar, contexto de execução, parâmetros passados para o método
        // Contexto de execução será o "NegociacaoController"
        // Reflect.apply(this._armadilha, this._contexto, [this]);

        // Consigo acessar o this somente se o "armadilha" for montado utilizando aerofunction
        // No aerofunction o contexto do this é léxico e não dinâmico
        // this._armadilha(this); 
    }

    esvazia(){

        this._negociacoes = [];

        // Necessito utilizar apenas caso a função "armadilha" seja montado utilizando function
        // Parâmetros: Método que quero chamar, contexto de execução, parâmetros passados para o método
        // Contexto de execução será o "NegociacaoController"
        // Reflect.apply(this._armadilha, this._contexto, [this]);

        // Consigo acessar o this somente se o "armadilha" for montado utilizando aerofunction
        // No aerofunction o contexto do this é léxico e não dinâmico
        // this._armadilha(this);
    }

    get negociacoes(){

        // Retornando um novo array concatenado com o array de negociações atual
        // Serve para evitar que o array seja modificado indevidamente
        return [].concat(this._negociacoes);
    }

}