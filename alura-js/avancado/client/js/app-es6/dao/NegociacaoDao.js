import {Negociacao} from '../models/Negociacao';

export class NegociacaoDao{

    constructor(connection){

        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao){

        return new Promise((resolve, reject) => {    

            let request = this._connection
                .transaction([this._store],'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = e => {
                resolve();
            }

            request.onerror = e => {
                reject(e.target.error);
            }
        })
    }

    listaTodos(){

        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._store],'readwrite')
                .objectStore(this._store)
                .openCursor();  
            
            let negociacoes = [];

            cursor.onsuccess = evento => { 

                // ponteiro
                let atual = evento.target.result;
                if (atual){
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    // chama mais uma vez o onsucess mas o ponteiro será a próxima negociação
                    atual.continue();
                }else{
                    resolve(negociacoes);
                }
            }

            cursor.onerror = e => {
                reject(e.target.error);
            }            
        })
    }

    apagaTodos(){
        
        new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store],'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => {
                resolve();
            }

            request.onerror = e => {
                reject(e.target.error);
            }
            
        })
    }

}