import { Horario } from "../utils/criaHorario.js"
import { verificaExtratoExiste } from "../utils/criaExtratoUsuario.js"
import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
export class InsereExtratos {
    static extratoDepositar(indexId: InformacoesUsuario, valor: string) {
        try {
            indexId.transacoes.forEach((elemento) => {
                if (elemento.periodo.dia == Horario.criaMesDia()) {
                    elemento.periodo.tipos.push("Depósito")
                    elemento.periodo.valores.push(`${valor}`)
                    elemento.periodo.horarios.push(`${Horario.criaHoraMin()}`)
                }
            })
        } catch {
            verificaExtratoExiste(indexId)
        }
    }
    static extratoEspecialDep(indexId: InformacoesUsuario, valor: string) {
        try {
            indexId.transacoes.forEach((elemento) => {
                if (elemento.periodo.dia == Horario.criaMesDia()) {
                    elemento.periodo.valores.pop()
                    elemento.periodo.valores.push(`${valor}`)
                }
            })
        } catch {
            verificaExtratoExiste(indexId)
        }
    }
    static extratoSacar(indexId: InformacoesUsuario, valor: string) {
        try {
            indexId.transacoes.forEach((elemento) => {
                if (elemento.periodo.dia == Horario.criaMesDia()) {
                    elemento.periodo.tipos.push("Saque")
                    elemento.periodo.valores.push(`${valor}`)
                    elemento.periodo.horarios.push(`${Horario.criaHoraMin()}`)
                }
            })
        } catch {
            verificaExtratoExiste(indexId)
        }
    }

    static extratoTransferir(indexId: InformacoesUsuario, valor: string, indexDestinatario: InformacoesUsuario) {
        try {
            indexId.transacoes.forEach((elemento) => {
                if (elemento.periodo.dia == Horario.criaMesDia()) {
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
        indexDestinatario.transacoes.forEach((elemento) => {
            if (elemento.periodo.dia == Horario.criaMesDia()) {
                elemento.periodo.tipos.push("Transferência Recebida")
                elemento.periodo.valores.push(`${valor}`)
                elemento.periodo.horarios.push(`${Horario.criaHoraMin()}`)
            } else {
                verificaExtratoExiste(indexDestinatario)
            }
        })

    }

}
