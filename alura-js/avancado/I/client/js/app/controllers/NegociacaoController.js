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

        // Passando como parâmetro uma função com comportamento a ser executado quando ListaNegociacoes for construída
        // Parâmetro "this" no caso é o NegociacaoController
        // Preciso usar reflection dentro do ListaNegociacoes para trabahar com o contexto de NegociocaoController
        /*
        this._listaNegociacoes = new ListaNegociacoes(this, function(model){            
            this._negociacoesView.update(model);
        });
        */

        // Utilizando aerofunction o escopo do "this" é léxico e não dinâmico
        // Não preciso usar reflection dentro do ListaNegociacoes
        this._listaNegociacoes = new ListaNegociacoes(model =>            
            this._negociacoesView.update(model)
        );        

        this._negociacoesView = new NegociacoesView($("#negociacoesView"));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($("#mensagemView"));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event){

        event.preventDefault();

        // Adicionar a negociação em uma lista
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem = new Mensagem("Negociação adicionada com sucesso.");        
        
        // Não necessita mais ser chamado pois o update está sendo chamado no construtor do ListaNegociacoes
        // this._negociacoesView.update(this._listaNegociacoes);
        
        // Caso o get negociacoes não seja tratado, essa linha de código cria indevidamente uma negociação
        // this._listaNegociacoes.negociacoes.push(this._criaNegociacao());

        this._limpaFormulario();
    }

    apaga(){

        this._listaNegociacoes.esvazia();
        
        // Não necessita mais ser chamado pois o update está sendo chamado no construtor do ListaNegociacoes
        // this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem.texto = 'Negociações apagadas com sucesso';
        this._mensagemView.update(this._mensagem);
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