import mostraSenha from "../utils/mostraSenha.js"
import { ListaAmigos } from "../utils/criaPerfisAmigos.js"
import { ExtratoMain } from "../utils/ExtratoMain.js"
import { InformacoesApi } from "../utils/InformacoesApi.js"
import { redirecionaBotoesAside } from "../utils/redirecionaBotoesAside.js"
//guardo o usário para poder alterar
(async () => {
    const [contasApi, usuario] = await InformacoesApi.pegaInformacoes()

    const botoesRedirecionar = document.querySelectorAll('[data-lista]')

    const fotoPerfil = document.getElementById('foto-perfil')
    const primeiroNomeInnerHTML = document.getElementById('nome')
    const segundoNomeInnerHTML = document.getElementById('nome')
    const usuarioInnerHTML = document.getElementById('usuario')
    const saldoInnerHTML = document.getElementById('saldo')
    const botaoSair = document.getElementById('deslogar')
    const fraseBemVindo = document.getElementById('texto-bem-vindo')

    const verSaldo = document.getElementById('olhoSaldo')

    const listaAmigosUl = document.getElementById('contas-ul')
    const contasAmigosLi = document.querySelectorAll('#contas-li')

    async function insereInformacoesNoPerfil() {
        fotoPerfil.setAttribute("src", usuario.foto)
        fraseBemVindo.innerText = "Olá, " + usuario.primeiroNome
        primeiroNomeInnerHTML.innerText = usuario.primeiroNome
        segundoNomeInnerHTML.innerText += " " + usuario.segundoNome
        usuarioInnerHTML.innerText = usuario.usuario
        saldoInnerHTML.innerText = `R$${usuario.saldo.toFixed(2)}`.replace(".", ",")
    }
    insereInformacoesNoPerfil()

    try {
        ListaAmigos.criaPerfisAmigos(contasApi, usuario, listaAmigosUl, contasAmigosLi)
    } catch {
        ListaAmigos.criaLiSemPerfis(listaAmigosUl)
    }

    const extratoUl = document.getElementById("extrato-ul")
    ExtratoMain.constroiExtrato(usuario, extratoUl)

    verSaldo.addEventListener("click", () => {
        if (saldoInnerHTML.style.display == "none" || saldoInnerHTML.style.display == "" ) {
            mostraSenha.mostraSaldo(verSaldo, saldoInnerHTML)
        } else {
            mostraSenha.escondeSaldo(verSaldo)
        }
    })

    redirecionaBotoesAside(botaoSair, usuario, botoesRedirecionar)
})()
