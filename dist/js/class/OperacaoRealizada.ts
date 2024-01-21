import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { InsereExtratos } from "./InsereExtratos.js"
export class OperacaoRealizada {

    static criaTexto(tipoExtrato: string, valorExtrato: string, usuario: InformacoesUsuario) {
        const titulo = document.getElementById('titulo-operacao')!
        const frase = document.getElementById('frase-operacao')!
        const saldoUsuario = usuario.saldo.toFixed(2).toString()
        if (tipoExtrato == "Depósito") {
            this.opcaoDeposito(titulo, frase, valorExtrato, saldoUsuario, usuario)
        } else if (tipoExtrato == "Saque") {
            this.opcaoSaque(titulo, frase, valorExtrato, saldoUsuario)
        } else if (tipoExtrato == "Transferência Enviada") {
            this.opcaoTransferencia(titulo, frase, valorExtrato, saldoUsuario)
        }
    }
    
    static opcaoDeposito(titulo: HTMLElement, frase: HTMLElement, valorExtrato: string, saldoUsuario: string, usuario: InformacoesUsuario) {
        if (parseFloat(valorExtrato) > 8000) {
            titulo.innerText = 'DEPÓSITO FEITO COM SUCESSO!'
            frase.innerHTML = `<p>Você depositou <strong>R$${valorExtrato.replace('.', ',')}</strong> 
                e isso é um valor muito alto!</p> <p>99,99% desse valor foi doado para uma caridade.</p> 
                <p>Você recebeu <strong>R$${(parseFloat(valorExtrato) * 0.001).toFixed(2).replace('.', ',')}</strong>. 
                Seu saldo agora é de <strong>R$${saldoUsuario.replace('.', ',')}</strong></p>`
            valorExtrato = (parseFloat(valorExtrato) * 0.001).toFixed(2)
            InsereExtratos.extratoEspecialDep(usuario, valorExtrato)
        } else {
            titulo.innerText = 'DEPÓSITO FEITO COM SUCESSO!'
            frase.innerHTML = `<p2>Você depositou <strong>R$${valorExtrato.replace('.', ',')}</strong>. 
                Seu saldo agora é de <strong>R$${saldoUsuario.replace('.', ',')}</strong></p2>`
        }
    }
    static opcaoSaque(titulo: HTMLElement, frase: HTMLElement, valorExtrato: string, saldoUsuario: string) {
        titulo.innerText = 'SAQUE FEITO COM SUCESSO!'
        frase.innerHTML = `<p>Você sacou <strong>R$${(parseFloat(valorExtrato)-3.30).toFixed(2).replace('.', ',')}</strong>. 
            Seu saldo agora é de <strong>R$${saldoUsuario.replace('.', ',')}</strong></p>`
    }
    static opcaoTransferencia(titulo: HTMLElement, frase: HTMLElement, valorExtrato: string, saldoUsuario: string) {
        titulo.innerText = 'TRANSFERÊNCIA FEITA COM SUCESSO!'
        frase.innerHTML = `<p>Você transferiu <strong>R$${(parseFloat(valorExtrato)-9.30).toFixed(2).replace('.', ',')}</strong>. 
            Seu saldo agora é de <strong>R$${saldoUsuario.replace('.', ',')}</strong></p>`
    }
}