import { InformacoesApi } from "../class/InformacoesApi.js"

export async function verificaLogin(){
    try {
    const [contasApi, usuario] = await InformacoesApi.pegaInformacoes()
        return usuario
    } catch {
        window.location.href = './login.html'
    }
    
}
