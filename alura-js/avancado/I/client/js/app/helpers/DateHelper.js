class DateHelper{

    constructor(){
        // Lançando erro pois a classe DateHelper não deve ser instanciada
        throw Error("Esta classe não pode ser instanciada");
    }

    // Método estático
    static dataParaTexto(data){

        // return data.getDate() + '/' + (data.getMonth()+1) + '/' + data.getFullYear();
        // Utilizando template String
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }

    // Método estático
    static textoParaData(texto){

        // Validação para o formato da data
        if (!/\d{4}-\d{2}-\d{2}/.test(texto)) 
            throw new Error ('Deve estar no formato AAAA-MM-DD')

        // ** Trabalhando com data **

        // A data chega do form como String
        // console.log(typeof(this._inputData.value));        

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
        /** 
        let data = new Date(...
            //this._inputData.value.split('-').map((item, indice) =>{return item - indice % 2;})
            // Como o aerofunction possui somente um retorno, as aspas podem ser retiradas
            this._inputData.value.split('-').map((item, indice) => item - indice % 2)
            );
                */

        // ** Trabalhando com data (fim) **

        return new Date(...texto.split('-').map((item, indice) => item - indice % 2));
    }

}