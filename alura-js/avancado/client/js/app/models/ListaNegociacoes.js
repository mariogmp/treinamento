"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, ListaNegociacoes;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            _export("ListaNegociacoes", ListaNegociacoes = function () {

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

                function ListaNegociacoes() {
                    _classCallCheck(this, ListaNegociacoes);

                    this._negociacoes = [];
                }

                _createClass(ListaNegociacoes, [{
                    key: "adiciona",
                    value: function adiciona(negociacao) {

                        this._negociacoes.push(negociacao);

                        // Necessito utilizar apenas caso a função "armadilha" seja montado utilizando function
                        // Parâmetros: Método que quero chamar, contexto de execução, parâmetros passados para o método
                        // Contexto de execução será o "NegociacaoController"
                        // Reflect.apply(this._armadilha, this._contexto, [this]);

                        // Consigo acessar o this somente se o "armadilha" for montado utilizando aerofunction
                        // No aerofunction o contexto do this é léxico e não dinâmico
                        // this._armadilha(this); 
                    }
                }, {
                    key: "esvazia",
                    value: function esvazia() {

                        this._negociacoes = [];

                        // Necessito utilizar apenas caso a função "armadilha" seja montado utilizando function
                        // Parâmetros: Método que quero chamar, contexto de execução, parâmetros passados para o método
                        // Contexto de execução será o "NegociacaoController"
                        // Reflect.apply(this._armadilha, this._contexto, [this]);

                        // Consigo acessar o this somente se o "armadilha" for montado utilizando aerofunction
                        // No aerofunction o contexto do this é léxico e não dinâmico
                        // this._armadilha(this);
                    }
                }, {
                    key: "negociacoes",
                    get: function get() {

                        // Retornando um novo array concatenado com o array de negociações atual
                        // Serve para evitar que o array seja modificado indevidamente
                        return [].concat(this._negociacoes);
                    }
                }]);

                return ListaNegociacoes;
            }());

            _export("ListaNegociacoes", ListaNegociacoes);
        }
    };
});
//# sourceMappingURL=ListaNegociacoes.js.map