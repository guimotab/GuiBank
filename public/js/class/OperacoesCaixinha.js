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
import { Horario } from "../utils/criaHorario.js";
export class OperacoesCaixinha {
    static depositar(contasApi, usuario, inputDepositar, rendimentosUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            this.contas = contasApi;
            const erroSaldoInsuficienteDep = document.getElementById('erroInsuficiente-depositar');
            const valorInput = parseFloat(inputDepositar.value.replace(",", "."));
            const arrayUltimoValor = rendimentosUsuario.length - 1;
            const valoresSomados = rendimentosUsuario[arrayUltimoValor] + valorInput;
            if (valorInput <= usuario.saldo) {
                usuario.saldo -= valorInput;
                if (rendimentosUsuario.length == 3 || rendimentosUsuario[0] == 0) {
                    rendimentosUsuario.shift();
                }
                usuario.rendimentos.dia = Horario.criaDateCaixinha();
                rendimentosUsuario.push(valoresSomados);
                yield UsuariosApi.put(this.contas, usuario.id, usuario.devolveInformacoes());
                window.location.href = `./caixinha.html?id=${usuario.id}`;
            }
            else {
                erroSaldoInsuficienteDep.className = "frase-erro-conta";
            }
        });
    }
    static sacar(contas, usuario, inputSacar, rendimentosUsuario) {
        const erroSaldoInsuficienteSac = document.getElementById('erroInsuficiente-sacar');
        const ultimoValor = rendimentosUsuario.length - 1;
        const valorInput = parseFloat(inputSacar.value.replace(",", "."));
        if (valorInput < rendimentosUsuario[ultimoValor]) {
            usuario.saldo += valorInput;
            usuario.rendimentos.dia = Horario.criaDateCaixinha();
            rendimentosUsuario[ultimoValor] -= valorInput;
            if (rendimentosUsuario.length != 1) {
                for (let i = 0; i < (rendimentosUsuario.length); i++) {
                    rendimentosUsuario.shift();
                }
            }
            UsuariosApi.put(contas, usuario.id, usuario.devolveInformacoes());
            window.location.href = `./caixinha.html?id=${usuario.id}`;
        }
        else if (valorInput == rendimentosUsuario[ultimoValor]) {
            usuario.saldo += valorInput;
            usuario.rendimentos.dia = "";
            for (let i = 0; i < (rendimentosUsuario.length + 2); i++) {
                rendimentosUsuario.shift();
            }
            usuario.rendimentos.valores = [0];
            UsuariosApi.put(contas, usuario.id, usuario.devolveInformacoes());
            window.location.href = `./caixinha.html?id=${usuario.id}`;
        }
        else {
            erroSaldoInsuficienteSac.className = "frase-erro-conta";
        }
    }
}
