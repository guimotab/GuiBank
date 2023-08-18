var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UsuariosApi } from "../services/UsuariosApi.js";
export class RedirecionaBotoes {
    static redireciona(contasApi, usuario) {
        const botaoSair = document.getElementById('deslogar');
        const botoesAside = document.querySelectorAll('[data-aside]');
        const botoesCard = document.querySelectorAll('[data-card]');
        this.botaoDeslogar(contasApi, botaoSair, usuario);
        this.redirecionaAside(usuario, botoesAside);
        this.redirecionaCard(usuario, botoesCard);
    }
    static redirecionaCard(usuario, botoesCard) {
        const location = window.location.pathname;
        for (let i = 0; i < botoesCard.length; i++) {
            const buttons = botoesCard[i].attributes[0].value;
            botoesCard[i].addEventListener('click', () => {
                if (location != `/public/routes/${buttons}.html` || location != `/routes/${buttons}.html`) {
                    window.location.href = `./${buttons}.html?id=${usuario.id}`;
                }
            });
        }
    }
    static redirecionaAside(usuario, botoesAside) {
        const location = window.location.pathname;
        for (let i = 0; i < botoesAside.length; i++) {
            const buttons = botoesAside[i].attributes[1].value;
            botoesAside[i].addEventListener('click', () => {
                if (location != `/public/routes/${buttons}.html` || location != `/routes/${buttons}.html`) {
                    window.location.href = `./${buttons}.html?id=${usuario.id}`;
                }
            });
        }
    }
    static botaoDeslogar(contasApi, botaoSair, usuario) {
        botaoSair.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            usuario.logado = false;
            yield UsuariosApi.put(contasApi, usuario.id, usuario.devolveInformacoes());
            window.location.href = "./login.html";
        }));
    }
}
