import IUserBase from "../interfaces/IUserBase"
import { InformacoesUsuario } from "../models/InformacoesUsuario"
import { InformacoesApi } from "./InformacoesApi"

export class VerificacoesUsuario{
    static existeUsuario(contasApi: IUserBase[], campo: HTMLInputElement, usuario: InformacoesUsuario){
        const valorDoCampo = campo.value
        const existe = contasApi.find(conta => conta.usuario == valorDoCampo && usuario.usuario != valorDoCampo)
        
        if (existe) {
            return true
        } else {
            return false
        }
    }
    static corrigeUsuario(campo: HTMLInputElement){
        let valorDoCampo = campo.value[0]
        if(valorDoCampo == "@"){
            return true
        } else {
            return campo.value = "@" + campo.value
        }

    }
}