import mostraSenha from "../utils/mostraSenha.js"
import { ListaAmigos } from "../utils/criaPerfisAmigos.js"
import { ExtratoMain } from "../class/ExtratoMain.js"
import { InformacoesApi } from "../class/InformacoesApi.js"
import { RedirecionaBotoes } from "../utils/redirecionaBotoesAside.js"
import { verificaLogin } from "../utils/verificaLogin.js";
import abreAside from "../utils/abreAside.js"
verificaLogin()
const [contasApi, usuario] = InformacoesApi.pegaInformacoes()

const fotoPerfil = document.getElementById('foto-perfil')!
const primeiroNomeInnerHTML = document.getElementById('nome')!
const segundoNomeInnerHTML = document.getElementById('nome')!
const usuarioInnerHTML = document.getElementById('usuario')!
const saldoInnerHTML = document.getElementById('saldo')!
const fraseBemVindo = document.getElementById('texto-bem-vindo')!

const verSaldo = document.getElementById('olhoSaldo')!

const extratoUl = document.getElementById("extrato-ul")!
const listaAmigosUl = document.getElementById('contas-ul')!
const contasAmigosLi = document.querySelectorAll('#contas-li')!

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

ExtratoMain.constroiExtrato(usuario, extratoUl)

verSaldo.addEventListener("click", () => {
    if (saldoInnerHTML.style.display == "none" || saldoInnerHTML.style.display == "") {
        mostraSenha.mostraSaldo(verSaldo, saldoInnerHTML)
    } else {
        mostraSenha.escondeSaldo(verSaldo)
    }
})
abreAside()
RedirecionaBotoes.redireciona(contasApi, usuario)
