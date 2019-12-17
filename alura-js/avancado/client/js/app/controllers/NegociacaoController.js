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

        /** Estratégias para atualizar a View após alterações na ListaNegociacoes */

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
        /**
        this._listaNegociacoes = new ListaNegociacoes(model =>            
            this._negociacoesView.update(model)
        );  
        */      

        /** Utilizando proxy 
        
        // Estratégia utilizando padrão de projeto Proxy
        // Não é boa prática utilizar "armadilhas" dentro do modelo (no caso, da ListaNegociacoes)
        // Será criado um proxy para o ListaNegociacoes, onde poderemos disparar as "armadilhas" antes de chamar o objeto ListaNegociacoes
                
        this._listaNegociacoes = ProxyFactory.create(
            new ListaNegociacoes(), ['adiciona', 'esvazia'], model => this._negociacoesView.update(model));

        this._negociacoesView = new NegociacoesView($("#negociacoesView"));
        // Preciso chamar pela primeira vez
        // this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = ProxyFactory.create(
            new Mensagem(), ['texto'], model => this._mensagemView.update(model));

        this._mensagemView = new MensagemView($("#mensagemView"));
        // Preciso chamar pela primeira vez
        // this._mensagemView.update(this._mensagem);

        */

        // Utilizando estratégia de Binding
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia');
        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

        /** Utilizando um único "then"
        ConnectionFactory.getConnection()
            .then(connection => {
                new NegociacaoDao(connection)
                ._listaTodos()
                    .then(negociacoes => {
                        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                })        
            });
        */

        ConnectionFactory.getConnection()
            .then (connection => new NegociacaoDao(connection))
            .then (dao => dao.listaTodos())
            .then (negociacoes => negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
            .catch(error => this._mensagem.texto = error);
    }

    adiciona(event){

        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then(connection => {
                let negociacao = this._criaNegociacao();        
                
                new NegociacaoDao(connection)
                    .adiciona(negociacao)
                    .then(() => {
                        this._listaNegociacoes.adiciona(negociacao);
                        this._mensagem.texto = "Negociação adicionada com sucesso";
                        this._limpaFormulario();
                    })                    
            })
            .catch(error => this._mensagem.texto = error);
        
        // Não necessita mais ser chamado pois o update está sendo chamado no construtor do ListaNegociacoes
        // this._negociacoesView.update(this._listaNegociacoes);
        
        // Caso o get negociacoes não seja tratado, essa linha de código cria indevidamente uma negociação
        // this._listaNegociacoes.negociacoes.push(this._criaNegociacao());

        // this._mensagemView.update(this._mensagem);

        // this._limpaFormulario();
    }

    apaga(){

        ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            })
            .catch(error => this._mensagem.texto = error);

        // Não necessita mais ser chamado pois o update está sendo chamado no construtor do ListaNegociacoes
        // this._negociacoesView.update(this._listaNegociacoes);

        //this._mensagemView.update(this._mensagem);
    }

    importaNegociacoes(){    

        let service = new NegociacaoService();

        // Pyramid of Doom - Problema característico de requisições assíncronas Ajax
        // As requisições foram aninhadas para serem chamadas uma após a outra (se fossem chamadas aleatoriamente os dados poderiam ficar fora de ordem)
        /**
        service.obterNegociacaoesDaSemana((erro, negociacoes) => {

            if (erro){
                this._mensagem.texto = erro;
                return;
            }
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

            service.obterNegociacaoesDaSemanaAnterior((erro, negociacoes) => {

                if (erro){
                    this._mensagem.texto = erro;
                    return;
                }
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

                service.obterNegociacaoesDaSemanaRetrasada((erro, negociacoes) => {

                    if (erro){
                        this._mensagem.texto = erro;
                        return;
                    }    
                    negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                    this._mensagem.texto = "Negociações importadas com sucesso."
                });                                
            });                    
        });
        */

        // Utilizando o padrão de projeto Promise
        // obterNegociacaoesDaSemana faz uma "promessa" de obter esses dados (Obs: O método não recebe mais o callback)
        // Se essa promessa for cumprida, o código será executado

        let promise = new NegociacaoService();

        // Método all chama os métodos na ordem
        Promise.all([service.obterNegociacaoesDaSemana(), 
                    service.obterNegociacaoesDaSemanaAnterior(), 
                    service.obterNegociacaoesDaSemanaRetrasada()]
        ).then(negociacoes => {   
            
            // Transformando array com 3 arrays (um em cada posição) para um array só (array achatado) utilizando o reduce
            negociacoes
                .reduce ((arrayAchatado, array) => arrayAchatado.concat(array), [])
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));

            this._mensagem.texto = "Negociações importadas com sucesso."
        }).catch(erro => this._mensagem.texto = erro);

    }        

    _criaNegociacao(){

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value), 
            parseInt(this._inputQuantidade.value), 
            parseFloat(this._inputValor.value)); 
    }

    _limpaFormulario(){

        this._inputData.value = '';
        this._inputQuantidade.value = '1';
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

}