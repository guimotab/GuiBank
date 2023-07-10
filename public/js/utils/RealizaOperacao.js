import { editaUsuario } from "../services/usuarios.js"
import { InsereExtratos } from "./InsereExtratos.js"

export class RealizaOperacao {
    static async adicionaValores(inputValor, usuario, operacao, contasApi){
        if(operacao == "Depósito"){
            this.realizaDepositar(inputValor, usuario)
        } else if(operacao == "Saque"){
            this.realizaSacar(inputValor, usuario)
        } else if(operacao == "Transferência"){
            this.realizaTransferir(inputValor, usuario, contasApi)
        }
    }
    static async realizaDepositar(inputValor, usuario){
        let saldo
        if(parseFloat(inputValor.value) > 8000){
            saldo = inputValor.value.replace(',', '.')*0.001 + usuario.saldo
            InsereExtratos.extratoDepositar(usuario, parseFloat(inputValor.value.replace(',', '.')).toFixed(2))
            usuario.saldo = saldo
        } else {
            saldo = (parseFloat(inputValor.value.replace(',', '.')) + usuario.saldo)
            usuario.saldo = saldo
            InsereExtratos.extratoDepositar(usuario, parseFloat(inputValor.value.replace(',', '.')).toFixed(2))
            
        }
        await editaUsuario(usuario.id, usuario.devolveInformacoes())
        window.location.href = `./operacaoConcluida.html?id=${usuario.id}`
    }
    static async realizaSacar(inputValor, usuario){
        if((parseFloat(inputValor.value) + 3.30) < usuario.saldo){
            let saldo = (usuario.saldo - parseFloat(inputValor.value.replace(',', '.')) - 3.30)
            InsereExtratos.extratoSacar(usuario, (parseFloat(inputValor.value.replace(',', '.')) + 3.30).toFixed(2))
            usuario.saldo = saldo
        }
        await editaUsuario(usuario.id, usuario.devolveInformacoes())

        window.location.href = `./operacaoConcluida.html?id=${usuario.id}`
    }
    static async realizaTransferir(inputValor, usuario, usuarioDestinatario){
        

        if(((parseFloat(inputValor.value)+ 9.30) < usuario.saldo)){
            let saldo = (usuario.saldo - parseFloat(inputValor.value.replace(',', '.')) - 9.30).toFixed(2)
            InsereExtratos.extratoTransferir(usuario, parseFloat(inputValor.value.replace(',', '.')).toFixed(2), usuarioDestinatario)
            usuario.saldo = parseFloat(saldo) 

            usuarioDestinatario.saldo += parseFloat(inputValor.value.replace(',', '.'))
        } else {
            throw new Error("Você não tem saldo suficiente para essa operação") 
        }
        await editaUsuario(usuario.id, usuario.devolveInformacoes())
        await editaUsuario(usuarioDestinatario.id, usuarioDestinatario.devolveInformacoes())
        
        window.location.href = `./operacaoConcluida.html?id=${usuario.id}`
    }
}