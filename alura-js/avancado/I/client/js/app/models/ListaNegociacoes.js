class ListaNegociacoes {

    constructor(){

        this._negociacoes = [];
    }

    adiciona(negociacao){

        this._negociacoes.push(negociacao);
    }

    get negociacoes(){

        // Retornando um novo array concatenado com o array de negociações atual
        // Serve para evitar que o array seja modificado indevidamente
        return [].concat(this._negociacoes);
    }
}