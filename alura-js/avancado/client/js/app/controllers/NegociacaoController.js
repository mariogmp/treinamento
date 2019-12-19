'use strict';

System.register(['../models/ListaNegociacoes', '../models/Mensagem', '../views/NegociacoesView', '../views/MensagemView', '../services/NegociacaoService', '../helpers/DateHelper', '../helpers/Bind', '../models/Negociacao'], function (_export, _context) {
    "use strict";

    var ListaNegociacoes, Mensagem, NegociacoesView, MensagemView, NegociacaoService, DateHelper, Bind, Negociacao, _createClass, NegociacaoController, negociacaoController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsListaNegociacoes) {
            ListaNegociacoes = _modelsListaNegociacoes.ListaNegociacoes;
        }, function (_modelsMensagem) {
            Mensagem = _modelsMensagem.Mensagem;
        }, function (_viewsNegociacoesView) {
            NegociacoesView = _viewsNegociacoesView.NegociacoesView;
        }, function (_viewsMensagemView) {
            MensagemView = _viewsMensagemView.MensagemView;
        }, function (_servicesNegociacaoService) {
            NegociacaoService = _servicesNegociacaoService.NegociacaoService;
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
        }, function (_helpersBind) {
            Bind = _helpersBind.Bind;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            NegociacaoController = function () {
                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    this._service = new NegociacaoService();

                    // Forma mais verbosa de se acessar os atributos do html
                    // let inputData = document.querySelector("#data");
                    // let inputQuantidade = document.querySelector("#quantidade");
                    // let inputValor = document.querySelector("#valor");

                    // Coloca uma função dentro da variável "$" (Parecido com o jQuery)
                    // Não funciona da forma abaixo pois o método "querySelector" só funciona dentro do objeto "document"
                    // let $ = document.querySelector;        
                    // Faz com que o método "querySelector" seja possível de ser acessado dentro da variável "$".
                    var $ = document.querySelector.bind(document);

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

                    this._init();
                }

                _createClass(NegociacaoController, [{
                    key: '_init',
                    value: function _init() {
                        var _this = this;

                        this._service.lista().then(function (negociacoes) {
                            return negociacoes.forEach(function (negociacao) {
                                return _this._listaNegociacoes.adiciona(negociacao);
                            });
                        }).catch(function (error) {
                            return _this._mensagem.texto = error;
                        });

                        setInterval(function () {
                            return _this.importaNegociacoes();
                        }, 3000);
                    }
                }, {
                    key: 'adiciona',
                    value: function adiciona(event) {
                        var _this2 = this;

                        event.preventDefault();

                        var negociacao = this._criaNegociacao();

                        this._service.cadastra(negociacao).then(function (mensagem) {
                            _this2._listaNegociacoes.adiciona(negociacao);
                            _this2._mensagem.texto = mensagem;
                            _this2._limpaFormulario();
                        }).catch(function (error) {
                            return _this2._mensagem.texto = error;
                        });

                        // Não necessita mais ser chamado pois o update está sendo chamado no construtor do ListaNegociacoes
                        // this._negociacoesView.update(this._listaNegociacoes);

                        // Caso o get negociacoes não seja tratado, essa linha de código cria indevidamente uma negociação
                        // this._listaNegociacoes.negociacoes.push(this._criaNegociacao());

                        // this._mensagemView.update(this._mensagem);

                        // this._limpaFormulario();
                    }
                }, {
                    key: 'apaga',
                    value: function apaga() {
                        var _this3 = this;

                        this._service.apaga().then(function (mensagem) {
                            _this3._mensagem.texto = mensagem;
                            _this3._listaNegociacoes.esvazia();
                        }).catch(function (error) {
                            return _this3._mensagem.texto = error;
                        });

                        // Não necessita mais ser chamado pois o update está sendo chamado no construtor do ListaNegociacoes
                        // this._negociacoesView.update(this._listaNegociacoes);

                        //this._mensagemView.update(this._mensagem);
                    }
                }, {
                    key: 'importaNegociacoes',
                    value: function importaNegociacoes() {
                        var _this4 = this;

                        // Pyramid of Doom - Problema característico de requisições assíncronas Ajax
                        // As requisições foram aninhadas para serem chamadas uma após a outra (se fossem chamadas aleatoriamente os dados poderiam ficar fora de ordem)
                        /**
                        let service = new NegociacaoService();
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

                        this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                            return negociacoes.forEach(function (negociacao) {
                                _this4._listaNegociacoes.adiciona(negociacao);
                                _this4._mensagem.texto = 'Negociações importadas com sucesso.';
                            });
                        }).catch(function (erro) {
                            return _this4._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: '_criaNegociacao',
                    value: function _criaNegociacao() {

                        return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
                    }
                }, {
                    key: '_limpaFormulario',
                    value: function _limpaFormulario() {

                        this._inputData.value = '';
                        this._inputQuantidade.value = '1';
                        this._inputValor.value = 0.0;
                        this._inputData.focus();
                    }
                }]);

                return NegociacaoController;
            }();

            negociacaoController = new NegociacaoController();
            function currentInstance() {

                return negociacaoController;
            }

            _export('currentInstance', currentInstance);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map