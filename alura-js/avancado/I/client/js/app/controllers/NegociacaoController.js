class NegociacaoController{

    constructor(){

        // Coloca uma função dentro da variável "$" (Parecido com o jQuery)
        // Não funciona da forma abaixo pois o método "querySelector" só funciona dentro do objeto "document"
        // let $ = document.querySelector;        
        // Faz com que o método "querySelector" seja possível de ser acessado dentro da variável "$".
        let $ = document.querySelector.bind(document);

        // Criando as variáveis como atributos da instância evita que a cada submissão do form o DOM seja necessite ser varrido
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
    }

    adiciona(event){

        event.preventDefault();        
        // Forma mais verbosa de se acessar os atributos do html
        // let inputData = document.querySelector("#data");
        // let inputQuantidade = document.querySelector("#quantidade");
        // let inputValor = document.querySelector("#valor");

        // Exibindo valores dos formulários
        //console.log(inputData.value)
        //console.log(inputQuantidade.value)
        //console.log(inputValor.value)

        console.log(this._inputData.value);
        console.log(this._inputQuantidade.value);
        console.log(this._inputValor.value);

        // Trabalhando com data

        // A data chega do form como String
        console.log(typeof(this._inputData.value));        

        // Convertendo a data para objeto Date usando split
        // let data = new Date(this._inputData.value.split('-'));      

        // Convertendo a data para objeto Date Usando expressão regular  
        // let data = new Date(this._inputData.value.replace(/-/g, ','));      

        // Construindo a data utilizando o spread operator ("...") e utilizando map para incrementar o month da data

        // Utilizando function
        /**
        let data = new Date(...
            this._inputData.value.split('-').map(function(item, indice){
                return item - indice % 2;
                })
            );
        */

        // Utilizando aerofunction
        let data = new Date(...
            //this._inputData.value.split('-').map((item, indice) =>{return item - indice % 2;})
            // Como o aerofunction possui somente um retorno, as aspas podem ser retiradas
            this._inputData.value.split('-').map((item, indice) => item - indice % 2)
            );
        
        let negociacao = new Negociacao(
            data, 
            this._inputQuantidade.value, 
            this._inputValor.value);

        console.log(negociacao);

        // Adicionar a negociação em uma lista

    }

}