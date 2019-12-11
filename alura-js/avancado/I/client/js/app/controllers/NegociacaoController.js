class NegociacaoController{

    constructor(){

        // Forma mais verbosa de se acessar os atributos do html
        // let inputData = document.querySelector("#data");
        // let inputQuantidade = document.querySelector("#quantidade");
        // let inputValor = document.querySelector("#valor");

        // Coloca uma função dentro da variável "$" (Parecido com o jQuery)
        // Não funciona da forma abaixo pois o método "querySelector" só funciona dentro do objeto "document"
        // let $ = document.querySelector;        
        // Faz com que o método "querySelector" seja possível de ser acessado dentro da variável "$".
        let $ = document.querySelector.bind(document);

        // Criando as variáveis como atributos da instância evita que a cada submissão do form o DOM seja necessite ser varrido
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._listaNegociacaoes = new ListaNegociacoes();
    }

    adiciona(event){

        event.preventDefault();

        // Adicionar a negociação em uma lista
        this._listaNegociacaoes.adiciona(this._criaNegociacao());
        
        // Caso o get negociacoes não seja tratado, essa linha de código cria indevidamente uma negociação
        // this._listaNegociacaoes.negociacoes.push(this._criaNegociacao());

        this._limpaFormulario();

        console.log(this._listaNegociacaoes.negociacoes);

    }

    _criaNegociacao(){

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value), 
            this._inputQuantidade.value, 
            this._inputValor.value); 
    }

    _limpaFormulario(){

        this._inputData.value = '';
        this._inputQuantidade.value = '1';
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }


}