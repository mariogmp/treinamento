class MensagemView extends View{

    constructor(elemento){
        super(elemento);
    }

    // "model" recebe um objeto Mensagem
    template(model){
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>`:'<p></p>';
    }

}