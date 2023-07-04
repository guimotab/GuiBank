import { InformacoesApi } from "../utils/InformacoesApi.js"
import { ListaAmigos } from "../utils/criaPerfisAmigos.js"
import { redirecionaBotoesAside } from "../utils/redirecionaBotoesAside.js"
(async()=>{
    const [contasApi, usuario] = await InformacoesApi.pegaInformacoes()

    const botaoSair = document.getElementById('deslogar')
    const botoesRedirecionar = document.querySelectorAll('[data-lista]')

    const listaAmigosUl = document.getElementById('contas-ul')
    const contasAmigosLi = document.querySelectorAll('#contas-li')

    try {
        ListaAmigos.criaPerfisAmigos(contasApi, usuario, listaAmigosUl, contasAmigosLi)
    } catch {
        ListaAmigos.criaLiSemPerfis(listaAmigosUl)
    }

    redirecionaBotoesAside(botaoSair, usuario, botoesRedirecionar)
})()