import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { Horario } from "../utils/criaHorario.js"

export class Rendimentos {

    static criaLiRendimentos(rendimentosUsuario: number[], divRendimentos: HTMLElement, ulRendimentos: HTMLElement) {
        if (rendimentosUsuario[0] == 0) {
            throw Error
        }
        const tamanhoRendimento = rendimentosUsuario.length
        const ultimaPosicaoArray = rendimentosUsuario.length - 1
        const size = "max-w-lg"
        const barraDivisaoPontilhada = `<div class="relative -top-32 z-0 w-full ${size} mt-7 h-0.5 border-dashed border-2 border-cor-rendimento"></div>`
        const legenda = ` 
        <div class="flex flex-col gap-3"> 
            <div>
                <p class="font-medium">Rendimento:</p> 
                <div class="h-1 w-10 bg-cor-terciaria"></div>
            </div>
            <div>
                <p class="font-medium">Expectativa:</p> 
                <div class="w-10 h-0.5 border-dashed border-2 border-cor-rendimento"></div>
            </div>
        </div>
        `
        const qtdExpectativaRendimento = 6 - tamanhoRendimento
        let taxa = 1.03

        const div = this.valoresRendimentos(tamanhoRendimento, divRendimentos, rendimentosUsuario)

        for (let i = 0; i < qtdExpectativaRendimento; i++) {
            this.valoresExpectativaRendimentos(ultimaPosicaoArray, i, taxa, divRendimentos, rendimentosUsuario)
        }
        ulRendimentos.innerHTML += legenda
        ulRendimentos.innerHTML += barraDivisaoPontilhada
        ulRendimentos.innerHTML += div
    }

    static valoresRendimentos(quantidade: number, divRendimentos: HTMLElement, rendimentosUsuario: number[]) {
        let div
        if (quantidade == 1) {
            div = ` 
            <div class="relative -top-[10.75rem] z-10 w-full max-w-[2rem] mt-7 h-1 bg-cor-terciaria"></div>
            `
        } else if (quantidade == 2) {
            div = `
            <div class="relative grow -top-[10.75rem] z-10 w-full max-w-[7rem] mt-7 h-1 bg-cor-terciaria"></div>
            `
        } else if (quantidade == 3) {
            div = ` 
                <div class="relative -top-[10.75rem] z-10 w-full max-w-[11rem] mt-7 h-1 bg-cor-terciaria"></div>
            `
        }
        for (let posicao = 0; posicao < quantidade; posicao++) {
            const liRendimentos = ` 
                <li class="flex flex-col items-center z-10">
                    <p class="font-medium">R$${(rendimentosUsuario[posicao]).toFixed(2).replace(".", ",")}</p>
                <div class="h-3 w-3 rounded-full bg-cor-terciaria"></div>
            </li>`
            divRendimentos.innerHTML += liRendimentos
        }
        return div
    }
    static valoresExpectativaRendimentos(ultimaPosicao: number, posicao: number, taxa: number, divRendimentos: HTMLElement, rendimentosUsuario: number[]) {
        const expoente = posicao + 1
        const liRendimentosFuturos = `
            <li class="flex flex-col items-center z-10">
                <p class="font-medium text-cor-secundaria">
                    R$${(rendimentosUsuario[ultimaPosicao] * Math.pow(taxa, expoente)).toFixed(2).replace(".", ",")}</p>
                <div class="h-3 w-3 rounded-full bg-cor-secundaria"></div>
            </li>`
        divRendimentos.innerHTML += liRendimentosFuturos
    }
    static atualizaRendimentos(rendimentosUsuario: number[], usuario: InformacoesUsuario) {
        const rendimento = Horario.checaDateCaixinha(usuario) / 86400000
        const ultimoValor = rendimentosUsuario.length - 1
        const arrayRendimento = []

        if (rendimento == 1) {
            const valorRendido = (rendimentosUsuario[ultimoValor] * Math.pow(1.03, 1)).toFixed(2)
            if (rendimentosUsuario.length == 3) {
                rendimentosUsuario.shift()
            }
            rendimentosUsuario.push(parseFloat(valorRendido))
        } else if (rendimento == 2) {
            for (let i = 0; i < rendimento; i++) {
                const valorRendido = (rendimentosUsuario[ultimoValor] * Math.pow(1.03, 2 - i)).toFixed(2)

                arrayRendimento.push(parseFloat(valorRendido))
            }
            if (rendimentosUsuario.length != 1) {
                rendimentosUsuario.shift()
                if (rendimentosUsuario.length == 2) {
                    rendimentosUsuario.shift()
                }
            }
            rendimentosUsuario.push(...arrayRendimento.reverse())

        } else if (rendimento >= 3) {
            for (let i = 0; i < 3; i++) {
                const valorRendido = (rendimentosUsuario[ultimoValor] * Math.pow(1.03, (rendimento - i))).toFixed(2)
                arrayRendimento.push(parseFloat(valorRendido))
            }
            for (let i = 0; i < 3; i++) {
                rendimentosUsuario.shift()
            }
            rendimentosUsuario.push(...arrayRendimento.reverse())
        }
    }
}