import IUserBase from "../interfaces/IUserBase.js"
import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { UsuariosApi } from "../services/UsuariosApi.js"
export class RedirecionaBotoes {
    static redireciona(contasApi: IUserBase[], usuario: InformacoesUsuario) {

        const botaoSair = document.getElementById('deslogar') as HTMLInputElement
        const botoesAside = document.querySelectorAll('[data-aside]')!
        const botoesCard = document.querySelectorAll('[data-card]')!

        this.botaoDeslogar(contasApi, botaoSair, usuario)
        this.redirecionaAside(usuario, botoesAside)
        this.redirecionaCard(usuario, botoesCard)
    }

    static redirecionaCard(usuario: InformacoesUsuario, botoesCard: any) {
        const location = window.location.pathname
        for (let i = 0; i < botoesCard.length; i++) {
            const buttons = botoesCard[i].attributes[0].value
            botoesCard[i].addEventListener('click', () => {
            if (location != `/public/routes/${buttons}.html` || location != `/routes/${buttons}.html`) {
                    window.location.href = `./${buttons}.html?id=${usuario.id}`
                }
            })
        }
    }

    static redirecionaAside(usuario: InformacoesUsuario, botoesAside: any) {
        const location = window.location.pathname
        for (let i = 0; i < botoesAside.length; i++) {
            const buttons = botoesAside[i].attributes[1].value
            botoesAside[i].addEventListener('click', () => {
                if (location != `/public/routes/${buttons}.html` || location != `/routes/${buttons}.html`) {
                    window.location.href = `./${buttons}.html?id=${usuario.id}`
                }
            })
        }
    }

    static botaoDeslogar(contasApi: IUserBase[], botaoSair: HTMLInputElement, usuario: InformacoesUsuario) {
        botaoSair.addEventListener("click", async () => {
            usuario.logado = false
            await UsuariosApi.put(contasApi, usuario.id, usuario.devolveInformacoes())
            window.location.href = "./login.html"
        })
    }

}