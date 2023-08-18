import IUserBase from "../interfaces/IUserBase.js"
import { InformacoesUsuario } from "../models/InformacoesUsuario.js"

export class Operacoes {
    static criaTextos(destinatario?: InformacoesUsuario) {
        const tituloOperacao = document.getElementById('titulo-operacao')!
        const textoTaxa = document.getElementById('texto-taxa')!
        const botaoOperacao = document.getElementById('botao-operacao')!
        const location = window.location.pathname

        if (location == `/public/routes/sacar.html` || location == `/routes/sacar.html`) {
            const taxa = 3.30
            this.sacarTexto(tituloOperacao, textoTaxa, botaoOperacao)
            return taxa

        } else if (location == `/public/routes/transferir.html` || location == `/routes/transferir.html`) {
            const taxa = 9.30
            if (destinatario) {
                this.transferirTexto(tituloOperacao, textoTaxa, botaoOperacao, destinatario.devolveInformacoes())
            }
            return taxa

        } else if (location == `/public/routes/depositar.html` || location == `/routes/depositar.html`) {
            const taxa = 0
            this.depositarTexto(tituloOperacao, textoTaxa, botaoOperacao)
            return taxa
        }
    }
    static sacarTexto(tituloOperacao: HTMLElement, textoTaxa: HTMLElement, botaoOperacao: HTMLElement) {
        tituloOperacao.innerText = 'Qual valor deseja sacar?'
        textoTaxa.innerText = '*Taxa de R$3,30 por saque'
        botaoOperacao.innerText = 'Sacar'
    }
    static transferirTexto(tituloOperacao: HTMLElement, textoTaxa: HTMLElement, botaoOperacao: HTMLElement, destinatario: IUserBase) {
        tituloOperacao.innerText =
            `Qual valor deseja transferir para ${destinatario.primeiroNome} ${destinatario.segundoNome}?`
        textoTaxa.innerText = '*Taxa de R$9,30 por transferência'
        botaoOperacao.innerText = 'Transferir'
    }
    static depositarTexto(tituloOperacao: HTMLElement, textoTaxa: HTMLElement, botaoOperacao: HTMLElement) {
        tituloOperacao.innerText = 'Qual valor deseja depositar?'
        textoTaxa.innerText = ''
        botaoOperacao.innerText = 'Depositar'
    }

    static devolveOperacao() {
        const location  = window.location.pathname
        if (location == `/public/routes/sacar.html` || location == `/routes/sacar.html`) {
            const operacao = 'Saque'
            return operacao

        } else if (location == `/public/routes/transferir.html` || location == `/routes/transferir.html`) {
            const operacao = 'Transferência'
            return operacao

        } else {
            const operacao = 'Depósito' 
            return operacao
        }
    }

    static devolveTaxas() {
        const location = window.location.pathname
        if (location == `/public/routes/sacar.html` || location == `/routes/sacar.html`) {
            const taxa = 3.30
            return taxa

        } else if (location == `/public/routes/transferir.html` || location == `/routes/transferir.html`) {
            const taxa = 9.30
            return taxa

        } else if (location == `/public/routes/depositar.html` || location == `/routes/depositar.html`) {
            const taxa = 0
            return taxa
        }

    }
}