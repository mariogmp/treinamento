import {ProxyFactory} from '../services/ProxyFactory';

export class Bind{

    constructor(model, view, ...props){

        let proxy = ProxyFactory.create(model, props, model => view.update(model));

        view.update(model);

        // Em JS um construtor pode devolver qualquer coisa e não somente uma instância de sua classe
        return proxy;
    }
}
