import { InformacoesApi } from "../class/InformacoesApi.js"
import abreAside from "../utils/abreAside.js";
import { ListaAmigos } from "../utils/criaPerfisAmigos.js"
import { RedirecionaBotoes } from "../utils/redirecionaBotoesAside.js"
import { verificaLogin } from "../utils/verificaLogin.js";
(async()=>{
    await verificaLogin()
    const [contasApi, usuario] = await InformacoesApi.pegaInformacoes()

    const listaAmigosUl = document.getElementById('contas-ul')!
    const contasAmigosLi = document.querySelectorAll('#contas-li')!

    try {
        ListaAmigos.criaPerfisAmigos(contasApi, usuario, listaAmigosUl, contasAmigosLi)
    } catch {
        ListaAmigos.criaLiSemPerfis(listaAmigosUl)
    }
    abreAside()
    RedirecionaBotoes.redireciona(contasApi, usuario)
})()