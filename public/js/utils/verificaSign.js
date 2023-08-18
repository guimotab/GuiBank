import { UsuariosApi } from "../services/UsuariosApi.js";
export function verificaSign(cpf) {
    const contasApi = UsuariosApi.get();
    try {
        return contasApi.find(elemento => elemento.cpf == cpf && elemento.logado == true);
    }
    catch (_a) {
        return undefined;
    }
}
