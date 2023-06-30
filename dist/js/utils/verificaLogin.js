import { getUsuariosApi } from "../services/usuarios.js"

export async function verificaLogin(){
    const contasApi = await getUsuariosApi()
    const pegaUrl = new URL(window.location.href)
    const idUrl = pegaUrl.searchParams.get('id')
    
    try {
        return contasApi.find(elemento => elemento._id == idUrl && elemento.logado == true)
    } catch {
        return false
    }
    
}
