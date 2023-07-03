import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { getUsuariosApi } from "../services/usuarios.js"
import { verificaLogin } from "./verificaLogin.js"

export class InformacoesApi {
    static async pegaInformacoes(){
        const [
            contasUsuariosApi, 
            usuarioLogado
        ] = await Promise.all([
            this.chamaContasApi(),
            this.chamaContaUsuario()
        ]);
        return [contasUsuariosApi, usuarioLogado]
    }

    static usuariosDaApi
    static async chamaContasApi() {
        if (!this.usuariosDaApi) {
            return this.usuariosDaApi = await getUsuariosApi()
        } else {
            return this.usuariosDaApi
        }
    }
    
    static usuarioLogado
    static async chamaContaUsuario() {
        if (!this.usuarioLogado) {
            return this.usuarioLogado = new InformacoesUsuario(await verificaLogin())
        } else {
            return this.usuarioLogado
        }
    }

    static encontraUsuario(usuariosApi, url) {
        const pegaUrl = new URL(url)
        const idUrl = pegaUrl.searchParams.get('id')
        return usuariosApi.find((elemento) => elemento._id == idUrl)
    }
}
