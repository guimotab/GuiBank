import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { UsuariosApi } from "../services/UsuariosApi.js";

export class InformacoesApi {
    static contasUsuariosApi
    static usuarioLogado

    static async pegaInformacoes(){
        try{
            if(this.contasUsuariosApi && this.usuarioLogado){
                return [this.contasUsuariosApi, this.usuarioLogado]
            } else {
                this.contasUsuariosApi = await this.chamaContasApi()
                this.usuarioLogado = await this.chamaContaUsuario()

                return [this.contasUsuariosApi, this.usuarioLogado]
            }
        } catch {
            console.log("Houve um erro ao tentar se comunicar com o servidor (lembrar de fazer uma página para esse erro");
        }
    }

    static usuariosDaApi
    static async chamaContasApi() {
        if (!this.usuariosDaApi) {
            return this.usuariosDaApi = await UsuariosApi.get()
        } else {
            return this.usuariosDaApi
        }
    }
    
    static usuarioLogado
    static async chamaContaUsuario() {
        if (!this.usuarioLogado) {
            return this.usuarioLogado = new InformacoesUsuario(this.encontraUsuario())
        } else {
            return this.usuarioLogado
        }
    }
    
    static encontraUsuario() {
        const pegaUrl = new URL(window.location.href)
        const idUrl = pegaUrl.searchParams.get('id')
        return this.usuariosDaApi.find((elemento) => elemento._id == idUrl)
    }
}
    // const [
    //     contasUsuariosApi, 
    //     usuarioLogado
    // ] = await Promise.all([
    //     this.chamaContasApi(),
    //     this.chamaContaUsuario()
    // ]);