import mostraSenha from "../utils/mostraSenha.js"
import { ListaAmigos } from "../utils/criaPerfisAmigos.js"
import { ExtratoMain } from "../utils/ExtratoMain.js"
import { editaUsuario } from "../services/usuarios.js"
import { InformacoesApi } from "../utils/InformacoesApi.js"
//guardo o usário para poder alterar
(async () => {
    const [contasApi, usuario] = await InformacoesApi.pegaInformacoes()

    const botoesRedirecionar = document.querySelectorAll('[data-lista]')
    const botoesRedirecionarIguais = document.querySelectorAll('[data-lista-iguais]')

    const fotoPerfil = document.getElementById('foto-perfil')
    const primeiroNomeInnerHTML = document.getElementById('nome')
    const segundoNomeInnerHTML = document.getElementById('nome')
    const usuarioInnerHTML = document.getElementById('usuario')
    const saldoInnerHTML = document.getElementById('saldo')
    const botaoSair = document.getElementById('deslogar')

    const verSaldo = document.getElementById('olhoSaldo')

    const listaAmigosUl = document.getElementById('contas-ul')
    const contasAmigosLi = document.querySelectorAll('#contas-li')

    async function insereInformacoesNoPerfil() {
        fotoPerfil.setAttribute("src", usuario.foto)
        primeiroNomeInnerHTML.innerHTML = usuario.primeiroNome
        segundoNomeInnerHTML.innerHTML += " " + usuario.segundoNome
        usuarioInnerHTML.innerHTML = usuario.usuario
        saldoInnerHTML.innerHTML = `R$${usuario.saldo.toFixed(2)}`.replace(".", ",")
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
        if (saldoInnerHTML.style.display == "none") {
            mostraSenha.mostraSaldo(verSaldo, saldoInnerHTML)
            cliqueSaldo = 0
        } else {
            mostraSenha.escondeSaldo(verSaldo)
            cliqueSaldo = 1
        }
    })

    botaoSair.addEventListener("click", async () => {
        usuario.logado = false
        await editaUsuario(usuario.id, usuario.devolveInformacoes())

        window.location.href = "./login.html"
    })
    for (let i = 0; i < botoesRedirecionarIguais.length; i++) {
        botoesRedirecionarIguais[i].addEventListener('click', evento => {
            if (botoesRedirecionarIguais[i].attributes[1].value != "main") {
                window.location.href = `./${botoesRedirecionarIguais[i].attributes[1].value}.html?id=${usuario.id}`
            }
        })
    }
    for (let i = 0; i < botoesRedirecionar.length; i++) {
        botoesRedirecionar[i].addEventListener('click', evento => {
            window.location.href = `./main/${botoesRedirecionar[i].attributes[1].value}.html?id=${usuario.id}`
        })
    }
})()
