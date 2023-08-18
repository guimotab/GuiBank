import { InformacoesApi } from "../class/InformacoesApi.js";
import { Rendimentos } from "../class/Rendimentos.js";
import { RedirecionaBotoes } from "../utils/redirecionaBotoesAside.js";
import { verificaLogin } from "../utils/verificaLogin.js";
import { OperacoesCaixinha } from "../class/OperacoesCaixinha.js";
import abreAside from "../utils/abreAside.js";
verificaLogin();
const [contasApi, usuario] = InformacoesApi.pegaInformacoes();
const saldoDisponivel = document.getElementById('saldo-disponivel');
const divRendimentos = document.getElementById('div-rendimentos');
const ulRendimentos = document.getElementById('ul-rendimentos');
const formularioDepositar = document.getElementById('formulario-depositar');
const inputDepositar = document.getElementById('input-depositar');
const formularioSacar = document.getElementById('formulario-sacar');
const inputSacar = document.getElementById('input-sacar');
const erroSaldoInsuficienteSac = document.getElementById('erroInsuficiente-sacar');
const erroSaldoInsuficienteDep = document.getElementById('erroInsuficiente-depositar');
const rendimentosUsuario = usuario.rendimentos.valores;
try {
    Rendimentos.atualizaRendimentos(rendimentosUsuario, usuario);
    Rendimentos.criaLiRendimentos(rendimentosUsuario, divRendimentos, ulRendimentos);
    const ultimoValor = rendimentosUsuario.length - 1;
    saldoDisponivel.innerHTML = `R$${rendimentosUsuario[ultimoValor].toFixed(2).replace(".", ",")}`;
}
catch (_a) {
    saldoDisponivel.innerHTML = "R$0,00";
    divRendimentos.innerHTML = `<div class="text-lg font-medium">Sem rendimentos ainda...<br>Adicione dinheiro à sua caixinha!</div>`;
    console.log("oi");
}
inputDepositar.addEventListener("blur", evento => {
    blurInputs(inputDepositar, erroSaldoInsuficienteDep);
});
inputSacar.addEventListener("blur", evento => {
    blurInputs(inputSacar, erroSaldoInsuficienteSac);
});
formularioSacar.addEventListener('submit', evento => {
    evento.preventDefault();
    OperacoesCaixinha.sacar(contasApi, usuario, inputSacar, rendimentosUsuario);
});
formularioDepositar.addEventListener('submit', evento => {
    evento.preventDefault();
    OperacoesCaixinha.depositar(contasApi, usuario, inputDepositar, rendimentosUsuario);
});
function blurInputs(tipoInput, classInput) {
    const valorInput = parseFloat(tipoInput.value);
    if (tipoInput.id == "input-depositar") {
        if (valorInput > usuario.saldo) {
            classInput.className = "frase-erro-conta";
        }
        else {
            classInput.className = "hidden";
        }
    }
    else if (tipoInput.id == "input-sacar") {
        console.log("🚀 ~ file: caixinha.ts:61 ~ blurInputs ~ rendimentosUsuario[0]:", rendimentosUsuario[0]);
        if (rendimentosUsuario[0] == 0 && valorInput) {
            classInput.className = "frase-erro-conta";
        }
        else if (usuario.rendimentos) {
            const ultimoValor = rendimentosUsuario.length - 1;
            if (valorInput > rendimentosUsuario[ultimoValor]) {
                classInput.className = "frase-erro-conta";
            }
            else {
                classInput.className = "hidden";
            }
        }
        else {
            classInput.className = "hidden";
        }
    }
}
abreAside();
RedirecionaBotoes.redireciona(contasApi, usuario);
