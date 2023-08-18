import { UsuariosApi } from "../services/UsuariosApi.js"

export function verificaSign(cpf: string){
    const contasApi = UsuariosApi.get()
    
    try {
        return contasApi.find(elemento => elemento.cpf == cpf && elemento.logado == true)
    } catch {
        return undefined
    }
    
}
