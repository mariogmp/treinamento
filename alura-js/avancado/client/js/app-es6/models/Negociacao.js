export class Negociacao{

    // Toda classe que possui o método 'constructor()' só poder ser chamada com a utilização de 'new'
    constructor(data, quantidade, valor){

        // O 'new' fará com que os 'this' aponte para a instância da classe que está sendo executada no momento.
        // O '_' na frente do atributo é uma convenção que indica que os atributos não poderão ser modificados fora da classe.

        // Caso o objeto seja montando como abaixo, a data ainda é passível de alteração
        // this._data = data (obs 01);
        // Para evitar esse comportamento, deve-se retornar o data com "new"
        this._data = new Date (data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;

        // Congela o objeto que acabou de ser construído
        // Protege os atributos da classe de serem modificados posteriormente
        // Congela somente as propriedades do objeto (Ex: as propriedades da data,
        // montada a partir de um "new Date()" continuam podendo ser alteradas), caso a data não seja tratada no getData()
        Object.freeze(this);
    }

    // Forma mais prática de construir métodos de acesso a atributos
    get volume(){
        return this._quantidade * this._valor;
    }

    get data(){
        // Caso a data seja retornada desta forma, ela continuará passível de alteração, mesmo que o objeto esteja congelada (obs 02)
        //return this._data;

        // Retornando a data com "new" para evitar que os atributos de Date sejam alterados pois o freeze congela apenas os atributos do próprio objeto
        // Obs: Freeze é "raso", não atua em subníveis de objetos do objeto
        return new Date(this._data.getTime());
    }

    get quantidade(){
        return this._quantidade;
    }

    get valor(){
        return this._valor;
    }

    // Forma "padrão" para construir métodos de acesso a atributos

    /** 
    getVolume(){
        return this._quantidade * this._valor;
    }

    getData(){
        return this._data;
    }

    getQuantidade(){
        return this._quantidade;
    }

    getValor(){
        return this._valor;
    }
    */

}