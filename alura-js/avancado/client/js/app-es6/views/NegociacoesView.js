import {View} from './View';
import {DateHelper} from '../helpers/DateHelper';
import {currentInstance} from '../controllers/NegociacaoController';

export class NegociacoesView extends View{

    constructor(elemento){
        super(elemento);
    }    

    // "model" recebe um objeto ListaNegociacoes
    template(model){
        // Utilizando template string
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>                
                <tbody>
                    ${model.negociacoes.map((negociacao) => `

                            <tr>
                                <td>${DateHelper.dataParaTexto(negociacao.data)}</td>
                                <td>${negociacao.quantidade}</td>
                                <td>${negociacao.valor}</td>
                                <td>${negociacao.volume}</td>
                            </tr>

                        `
                    ).join('')}
                </tbody>                
                <tfoot>
                    <td colspan="3"></td>
                    <td>
                    ${
                        model.negociacoes.reduce((total, negociacao) => total + negociacao.volume, 0.0)
                    }
                    </td>
                </tfoot>
            </table>
        `;
    }

}

// Formas de totalizar o volume

/** 
 *                 <tfoot>
                    <td colspan="3"></td>
                    <td>${
                        (function(){
                            let total = 0;
                            model.negociacoes.forEach(n => total += n.volume);
                            return total;
                        })()
                    }
                    </td>
                </tfoot>
 * * 
 */

 /**
  *                 <tfoot>
                    <td colspan="3"></td>
                    <td>
                    ${
                        model.negociacoes.reduce(function(total, negociacao) {
                            return total + negociacao.volume;
                        }, 0.0)
                    }
                    </td>
                </tfoot>

  */