import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { Horario } from "./criaHorario.js"
import { verificaExtratoExiste } from "./criaObjetoExtrato.js"
export function insereExtratoDepositar(indexId, valor){
    try{
        indexId.transacoes.forEach( (elemento) => {
            if (elemento.periodo.dia == Horario.criaMesDia()){
                elemento.periodo.tipos.push("Depósito")
                elemento.periodo.valores.push(`${valor}`)
                elemento.periodo.horarios.push(`${Horario.criaHoraMin()}`)
            }
        })
    } catch {
        verificaExtratoExiste(indexId)
    }
}
export function insereExtratoEspecialDep(indexId, valor){
    try{
        indexId.transacoes.forEach( (elemento) => {
            if (elemento.periodo.dia == Horario.criaMesDia()){
                elemento.periodo.valores.pop()
                elemento.periodo.valores.push(`${valor}`)
            }
        })
    } catch {
        verificaExtratoExiste(indexId)
    }
}
