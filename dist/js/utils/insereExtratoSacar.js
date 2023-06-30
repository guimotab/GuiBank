import { Horario } from "./criaHorario.js"
import { verificaExtratoExiste } from "./criaObjetoExtrato.js"
export function insereExtratoSacar(indexId, valor){
    try{
        indexId.transacoes.forEach( (elemento ) => {
            if (elemento.periodo.dia == Horario.criaMesDia()){
                elemento.periodo.tipos.push("Saque")
                elemento.periodo.valores.push(`${valor}`)
                elemento.periodo.horarios.push(`${Horario.criaHoraMin()}`)
            }
        })
    } catch {
        verificaExtratoExiste(indexId)
    }
}