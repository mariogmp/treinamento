const stores = ['negociacoes'];
const version = 4;
const dbName = 'aluraframe';

let connection = null;

let close = null;

export class ConnectionFactory {

    constructor() {

        throw new Error('Não é possível criar instâncias de ConnectionFactory');
    }

    static getConnection() {
        
        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = e => {

                ConnectionFactory._createStores(e.target.result);

            };

            openRequest.onsuccess = e => {

                if(!connection) {
                    connection = e.target.result;
                    close = connection.close.bind(connection);
                    connection.close = function() {
                        throw new Error('Você não pode fechar diretamente a conexão');
                    };
                }
                resolve(connection);

            };

            openRequest.onerror = e => {

                console.log(e.target.error);

                reject(e.target.error.name);
            };

        });
    }

    static _createStores(connection) {

        stores.forEach(store => {

            if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
            connection.createObjectStore(store, { autoIncrement: true});

        });

    }

    static closeConnection() {

        if(connection) {
            close();
            connection = null;
            close = null;
        }
    }
}

/**
// Implementando o padrão Module (maneira de tornar atributos privados)

// Função autoinvocada. Ela vai ser carrega e executada ao mesmo tempo.
// A variável ConnectionFactory estará no escopo global mas o restante, não.
var ConnectionFactory = (function(){

    const stores = ['negociacoes'];
    const version = 4;
    const dbName = 'aluraframe';

    var connection = null;
    var close = null;

    return class ConnectionFactory{

        constructor(){
            throw new Error('Não é possível criar instâncias de ConnectionFactory.');
        }

        static getConnection(){

            return new Promise((resolve, reject) => {

                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = evento => {
                    _createStore(evento.target.result);
                }

                openRequest.onsuccess = evento => {
                    if (!connection){
                        connection = evento.target.result;
                        // Implementando o padrão Monkey Patch (sobrescrita de um método) para impedir que o método close seja chamado indevidamente
                        // Ex: ConnectionFactory.getConnection().then(connection => console.log(connection.close()));
                        // O bind serve para levar a referência ao  connection
                        close = connection.close.bind(connection);
                        connection.close = function(){ 
                            throw new Error('A conexão não pode ser fechada diretamente');
                        }
                    } 
                    resolve(connection);
                }

                openRequest.onerror = evento => {
                    console.log(evento.target.error);
                    reject(evento.target.error.name);
                }
            })
        }

        static _createStore(connection){
            stores.forEach(store => {
                if (connection.objectStoreName.contains(store)){
                    connection.deleteObjectStore(store);
                }else{
                    connection.createObjectStore(store, {autoIncrement: true});
                }
            })
        }

        static closeConnection(){
            if (connection){
                close();
                connection = null;
            }
        }
    }
}
)();
*/