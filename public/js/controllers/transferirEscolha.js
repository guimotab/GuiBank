import { InformacoesApi } from "../utils/InformacoesApi.js"
import { ListaAmigos } from "../utils/criaPerfisAmigos.js"
import { RedirecionaBotoes } from "../utils/redirecionaBotoesAside.js"
(async()=>{
    const [contasApi, usuario] = await InformacoesApi.pegaInformacoes()

    const listaAmigosUl = document.getElementById('contas-ul')
    const contasAmigosLi = document.querySelectorAll('#contas-li')

    try {
        ListaAmigos.criaPerfisAmigos(contasApi, usuario, listaAmigosUl, contasAmigosLi)
    } catch {
        ListaAmigos.criaLiSemPerfis(listaAmigosUl)
    }

    RedirecionaBotoes.redireciona(usuario)
})()