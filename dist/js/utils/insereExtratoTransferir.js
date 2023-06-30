import { Horario } from "./criaHorario.js"
import { verificaExtratoExiste } from "./criaObjetoExtrato.js"
export function insereExtratoTransferir(indexId, valor , indexDestinatario){
    try{
        indexId.transacoes.forEach( (elemento) => {
            if (elemento.periodo.dia == Horario.criaMesDia()){
                elemento.periodo.tipos.push("Transferência Enviada")
                elemento.periodo.valores.push(`${(parseFloat(valor) + 9.30).toFixed(2)}`)
                elemento.periodo.horarios.push(`${Horario.criaHoraMin()}`)
            } else {
                verificaExtratoExiste(indexId)
            }
        })
    } catch { 
        verificaExtratoExiste(indexId)
    }
    verificaExtratoExiste(indexDestinatario)
    indexDestinatario.transacoes.forEach((elemento)=>{
        if (elemento.periodo.dia == Horario.criaMesDia()){
            elemento.periodo.tipos.push("Transferência Recebida")
            elemento.periodo.valores.push(`${valor}`)
            elemento.periodo.horarios.push(`${Horario.criaHoraMin()}`)
        } else {
            verificaExtratoExiste(indexDestinatario)
        }
    })

}