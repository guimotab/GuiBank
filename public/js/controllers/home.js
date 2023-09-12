var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mostraSenha from "../utils/mostraSenha.js";
import { ListaAmigos } from "../utils/criaPerfisAmigos.js";
import { ExtratoMain } from "../class/ExtratoMain.js";
import { InformacoesApi } from "../class/InformacoesApi.js";
import { RedirecionaBotoes } from "../utils/redirecionaBotoesAside.js";
import { verificaLogin } from "../utils/verificaLogin.js";
verificaLogin();
const [contasApi, usuario] = InformacoesApi.pegaInformacoes();
const fotoPerfil = document.getElementById('foto-perfil');
const primeiroNomeInnerHTML = document.getElementById('nome');
const segundoNomeInnerHTML = document.getElementById('nome');
const usuarioInnerHTML = document.getElementById('usuario');
const saldoInnerHTML = document.getElementById('saldo');
const fraseBemVindo = document.getElementById('texto-bem-vindo');
const menuHamburguer = document.getElementById('menu-hamburguer');
const aside = document.getElementById('aside');
const closeAside = document.getElementById('close-aside');
const verSaldo = document.getElementById('olhoSaldo');
const extratoUl = document.getElementById("extrato-ul");
const listaAmigosUl = document.getElementById('contas-ul');
const contasAmigosLi = document.querySelectorAll('#contas-li');
function insereInformacoesNoPerfil() {
    return __awaiter(this, void 0, void 0, function* () {
        fotoPerfil.setAttribute("src", usuario.foto);
        fraseBemVindo.innerText = "Olá, " + usuario.primeiroNome;
        primeiroNomeInnerHTML.innerText = usuario.primeiroNome;
        segundoNomeInnerHTML.innerText += " " + usuario.segundoNome;
        usuarioInnerHTML.innerText = usuario.usuario;
        saldoInnerHTML.innerText = `R$${usuario.saldo.toFixed(2)}`.replace(".", ",");
    });
}
insereInformacoesNoPerfil();
try {
    ListaAmigos.criaPerfisAmigos(contasApi, usuario, listaAmigosUl, contasAmigosLi);
}
catch (_a) {
    ListaAmigos.criaLiSemPerfis(listaAmigosUl);
}
ExtratoMain.constroiExtrato(usuario, extratoUl);
verSaldo.addEventListener("click", () => {
    if (saldoInnerHTML.style.display == "none" || saldoInnerHTML.style.display == "") {
        mostraSenha.mostraSaldo(verSaldo, saldoInnerHTML);
    }
    else {
        mostraSenha.escondeSaldo(verSaldo);
    }
});
closeAside.addEventListener("click", event => {
    aside.classList.add("hidden");
});
menuHamburguer.addEventListener("click", event => {
    // asideView = "absolute"
    aside.classList.remove("hidden");
    aside.classList.add("fixed");
    //  `flex-col row-start-1 row-end-3 justify-between bg-cor-terciaria text-white text-lg px-4 py-5 h-screen w-52 xl:flex`
});
RedirecionaBotoes.redireciona(contasApi, usuario);
