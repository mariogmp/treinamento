export class ProxyFactory{

    static create(objeto, props, acao){

        //console.log("criando proxy para propriedades "+props)

        return new Proxy(objeto, {

            //function: get(target, prop, receiver){
            get(target, prop, receiver){

                // target = ListaNegociacoes
                // props = array de propriedades que quero monitorar
                // receiver = o proxy
                // acao = o que quero executar (ex: renderizar a view)

                if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])){
                    return function(){
                        var retorno = Reflect.apply(target[prop], target, arguments);
                        // Retornando possível retorno da ação que será executada
                        acao(target);
                        return retorno;
                    }
                }          
                return Reflect.get(target, prop, receiver);;
            },

            //function: set(target, prop, value, receiver) {    
            set(target, prop, value, receiver) {    

                let retorno = Reflect.set(target, prop, value, receiver);
                if (props.includes(prop)){
                    acao(target);
                }
                return retorno;                
            }
        });

    }

    static _ehFuncao(func){
        return typeof(func) == typeof(Function);
        //return (typeof (func) == 'undefined' ? 'undefined' : _typeof(func)) == (typeof Function === 'undefined' ? 'undefined' : _typeof(Function));
    }

    
}