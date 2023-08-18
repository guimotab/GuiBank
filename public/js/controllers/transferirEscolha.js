var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { InformacoesApi } from "../class/InformacoesApi.js";
import abreAside from "../utils/abreAside.js";
import { ListaAmigos } from "../utils/criaPerfisAmigos.js";
import { RedirecionaBotoes } from "../utils/redirecionaBotoesAside.js";
import { verificaLogin } from "../utils/verificaLogin.js";
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield verificaLogin();
    const [contasApi, usuario] = yield InformacoesApi.pegaInformacoes();
    const listaAmigosUl = document.getElementById('contas-ul');
    const contasAmigosLi = document.querySelectorAll('#contas-li');
    try {
        ListaAmigos.criaPerfisAmigos(contasApi, usuario, listaAmigosUl, contasAmigosLi);
    }
    catch (_a) {
        ListaAmigos.criaLiSemPerfis(listaAmigosUl);
    }
    abreAside();
    RedirecionaBotoes.redireciona(contasApi, usuario);
}))();
