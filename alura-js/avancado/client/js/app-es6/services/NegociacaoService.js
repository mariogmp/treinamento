import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {Negociacao} from '../models/Negociacao';

export class NegociacaoService{

    constructor(){
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana(){        

        return new Promise((resolve, reject) => {
            this._http.get("negociacoes/semana").then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            }).catch(error => {
                console.log(erro);
                reject("Não foi possível obter as negociações da semana");
            })
        })
    }

    obterNegociacoesDaSemanaAnterior(){        

        return new Promise((resolve, reject) => {

            this._http.get("negociacoes/anterior").then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            }).catch(error => {
                console.log(erro);
                reject("Não foi possível obter as negociações da semana anterior");
            })
        })
    }    

    obterNegociacoesDaSemanaRetrasada(){        

        return new Promise((resolve, reject) => {

            this._http.get("negociacoes/anterior").then(negociacoes => {
                resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            }).catch(error => {
                console.log(erro);
                reject("Não foi possível obter as negociações da semana retrasada");
            })
        })
    }        

    _obterNegociacoes() {
        
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), [])
                .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));

            return negociacoes;
        }).catch(erro => {
            throw new Error(erro);
        });
    }
    
    cadastra(negociacao){

        return ConnectionFactory.getConnection()
                .then(connection => new NegociacaoDao(connection))
                .then(dao => dao.adiciona(negociacao))
                .then(() => 'Negociação adicionada com sucesso.')
                .catch((error) => {
                    console.log(error);
                    throw new Error('Erro ao adicionar negociação.');
                });        
    }

    lista() {

        return ConnectionFactory.getConnection()
                .then(connection => new NegociacaoDao(connection))
                .then(dao => dao.listaTodos())
                .catch((error) => {
                    console.log(error);
                    throw new Error('Erro ao listar negociações.');
                });        
    }

    apaga() {

        return ConnectionFactory.getConnection()
                .then(connection => new NegociacaoDao(connection))
                .then(dao => dao.apagaTodos())
                .then(() => 'Negociações apagadas com sucesso.')
                .catch((error) => {
                    console.log(error);
                    throw new Error('Erro ao listar negociações.');
                });
    }

    importa(listaAtual){
        
        return this._obterNegociacoes()
            .then(negociacoes => 
                // Filtrar para adicionar somente negociações que não existam (Não funcionou !!!)
                negociacoes.filter(negociacao => 
                    !listaAtual.some(negociacaoExistente => 
                        JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
            )
            .catch(error => {
                console.log(error);
                throw new Error('Erro ao listar negociações.');
            });
    }

    /**
    obterNegociacaoesDaSemana(callback){

        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/negociacoes/semana');

        // Cada vez que uma requisição Ajax muda de estado, essa função é chamada
        xhr.onreadystatechange = () => {

            // Estados possíveis de uma requisição ajax
            // 0: Requisição não iniciada
            // 1: Conexão com o servidor estabelecida
            // 2: Requisição recebida
            // 3: Processando requisição
            // 4: Requisição concluída e resposta está pronta

            if (xhr.readyState
                 == 4){
                // Verificação realizada para garantir que a requisição obteve sucesso
                if (xhr.status == 200){
                    // JSON transforma o texto da resposta em um objeto Javascript
                    // Retorno o map de objetos criando instâncias de Negociacao
                    // Percorro o map utilizando forEach e adicionando a negociacao na ListaNegociacoes
                    callback(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))

                }else{
                    console.log(xhr.responseText);
                    callback("Não foi possível obter as negociações da semana.", null);
                }
            }
        };
        xhr.send();        
    } */

    /**
    obterNegociacaoesDaSemanaAnterior(){

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/negociacoes/anterior');
    
            xhr.onreadystatechange = () => {
    
                if (xhr.readyState == 4){
                    if (xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
    
                    }else{
                        console.log(xhr.responseText);
                        reject("Não foi possível obter as negociações da semana anterior.");
                    }
                }
            };
            xhr.send();                    
        })
    }*/

    /**
    obterNegociacaoesDaSemanaAnterior(callback){
         
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/negociacoes/anterior');

        xhr.onreadystatechange = () => {

            if (xhr.readyState == 4){
                if (xhr.status == 200){
                    callback(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))

                }else{
                    console.log(xhr.responseText);
                    callback("Não foi possível obter as negociações da semana anterior.", null);
                }
            }
        };
        xhr.send();        
    } */          

    /**
    obterNegociacaoesDaSemanaRetrasada(){

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/negociacoes/retrasada');
    
            xhr.onreadystatechange = () => {
    
                if (xhr.readyState == 4){
                    if (xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
    
                    }else{
                        console.log(xhr.responseText);
                        reject("Não foi possível obter as negociações da semana retrasada.");
                    }
                }
            };
            xhr.send();      
        });                             
    }*/
    
    /**
    obterNegociacaoesDaSemanaRetrasada(callback){
        
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/negociacoes/retrasada');

        xhr.onreadystatechange = () => {

            if (xhr.readyState == 4){
                if (xhr.status == 200){
                    callback(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))

                }else{
                    console.log(xhr.responseText);
                    callback("Não foi possível obter as negociações da semana retrasada.", null);
                }
            }
        };
        xhr.send();        
    } 
    */       
}