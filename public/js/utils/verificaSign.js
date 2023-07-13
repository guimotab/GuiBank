import { UsuariosApi } from "../services/UsuariosApi.js"

export async function verificaSign(cpf){
    const contasApi = await UsuariosApi.get()
    
    try {
        return contasApi.find(elemento => elemento.cpf == cpf && elemento.logado == true)
    } catch {
        return false
    }
    
}
