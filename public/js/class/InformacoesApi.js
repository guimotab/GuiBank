import { UsuariosApi } from "../services/UsuariosApi.js";
import { InformacoesUsuario } from "../models/InformacoesUsuario.js";
export class InformacoesApi {
    static pegaInformacoes() {
        if (this.contasUsuariosApi && this.usuarioLogado) {
            return [this.contasUsuariosApi, this.usuarioLogado];
        }
        else {
            this.contasUsuariosApi = this.chamaContasApi();
            this.usuarioLogado = this.encontraUsuario();
            return [this.contasUsuariosApi, this.usuarioLogado];
        }
    }
    static chamaContasApi() {
        return UsuariosApi.get();
    }
    static encontraUsuario() {
        const pegaUrl = new URL(window.location.href);
        const idUrl = pegaUrl.searchParams.get('id');
        const user = this.contasUsuariosApi.find((elemento) => elemento.id == idUrl);
        if (user) {
            return new InformacoesUsuario(user);
        }
    }
}
// const [
//     contasUsuariosApi, 
//     usuarioLogado
// ] = await Promise.all([
//     this.chamaContasApi(),
//     this.chamaContaUsuario()
// ]);
