import IUserBase from "../interfaces/IUserBase.js"
import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { UsuariosApi } from "../services/UsuariosApi.js"
import { InsereExtratos } from "./InsereExtratos.js"

export class RealizaOperacao {
    static contasApi: IUserBase[]
    static async adicionaValores(contas: IUserBase[], inputValor: HTMLInputElement, usuario: InformacoesUsuario, operacao: string, usuarioApi: InformacoesUsuario){
        this.contasApi = contas
        
        if(operacao == "Depósito"){
            this.realizaDepositar(inputValor, usuario)
        } else if(operacao == "Saque"){
            this.realizaSacar(inputValor, usuario)
        } else if(operacao == "Transferência"){
            this.realizaTransferir(inputValor, usuario, usuarioApi)
        }
    }
    static realizaDepositar(inputValor: HTMLInputElement, usuario: InformacoesUsuario){
        let saldo
        if(parseFloat(inputValor.value) > 8000){
            saldo = parseFloat(inputValor.value.replace(',', '.'))*0.001 + usuario.saldo
            InsereExtratos.extratoDepositar(usuario, parseFloat(inputValor.value.replace(',', '.')).toFixed(2))
            usuario.saldo = parseFloat(saldo.toFixed(2))
        } else {
            saldo = (parseFloat(inputValor.value.replace(',', '.')) + usuario.saldo)
            usuario.saldo = saldo
            InsereExtratos.extratoDepositar(usuario, parseFloat(inputValor.value.replace(',', '.')).toFixed(2))
            
        }
        UsuariosApi.put(this.contasApi, usuario.id, usuario.devolveInformacoes())
        window.location.href = `./operacaoConcluida.html?id=${usuario.id}`
    }
    static realizaSacar(inputValor: HTMLInputElement, usuario: InformacoesUsuario){
        if((parseFloat(inputValor.value) + 3.30) < usuario.saldo){
            let saldo = (usuario.saldo - parseFloat(inputValor.value.replace(',', '.')) - 3.30)
            InsereExtratos.extratoSacar(usuario, (parseFloat(inputValor.value.replace(',', '.')) + 3.30).toFixed(2))
            usuario.saldo = saldo
        }
        UsuariosApi.put(this.contasApi, usuario.id, usuario.devolveInformacoes())

        window.location.href = `./operacaoConcluida.html?id=${usuario.id}`
    }
    static realizaTransferir(inputValor: HTMLInputElement, usuario: InformacoesUsuario, usuarioDestinatario: InformacoesUsuario){
        

        if(((parseFloat(inputValor.value)+ 9.30) < usuario.saldo)){
            let saldo = (usuario.saldo - parseFloat(inputValor.value.replace(',', '.')) - 9.30).toFixed(2)
            InsereExtratos.extratoTransferir(usuario, parseFloat(inputValor.value.replace(',', '.')).toFixed(2), usuarioDestinatario)
            usuario.saldo = parseFloat(saldo) 

            usuarioDestinatario.saldo += parseFloat(inputValor.value.replace(',', '.'))
            UsuariosApi.put(this.contasApi, usuario.id, usuario.devolveInformacoes())
            UsuariosApi.put(this.contasApi, usuarioDestinatario.id, usuarioDestinatario.devolveInformacoes())
            
            window.location.href = `./operacaoConcluida.html?id=${usuario.id}`
        }
    }
}