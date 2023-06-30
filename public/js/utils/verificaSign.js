import { getUsuariosApi } from "../services/usuarios.js"

export async function verificaSign(cpf){
    const contasApi = await getUsuariosApi()
    
    try {
        return contasApi.find(elemento => elemento.cpf == cpf && elemento.logado == true)
    } catch {
        return false
    }
    
}
