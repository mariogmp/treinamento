class View {

    constructor(elemento){
        this._elemento = elemento;
    }

    template(){
        // Artifício para tentar lembrar ao desenvolvedor que ele precisa sobrescrever este método nas classes filhas
        throw new Error ("O método template deve ser implementado");
    }

    update(model){
        this._elemento.innerHTML = this.template(model);
    }
}