import { verificaCampos } from "../utils/verificaCampos.js";
import { hashSenha } from "../utils/criptografaSenha.js";
import { UsuariosApi } from "../services/UsuariosApi.js";
import { RedirecionaBotoes } from "../utils/redirecionaBotoesAside.js";
import { InformacoesApi } from "../class/InformacoesApi.js";
import { verificaLogin } from "../utils/verificaLogin.js";
import abreAside from "../utils/abreAside.js";
verificaLogin();
const [contasApi, usuario] = InformacoesApi.pegaInformacoes();
const buscarFoto = document.getElementById('buscar-foto');
const campoPrimeiroNome = document.getElementById('primeiroNome');
const campoSegundoNome = document.getElementById('segundoNome');
const campoUsuario = document.getElementById('usuario');
const campoEmail = document.getElementById('email');
const campoTelefone = document.getElementById('telefone');
const campoSenha1 = document.getElementById('campo-senha1');
const campoSenha2 = document.getElementById('campo-senha2');
const botaoSubmit = document.getElementById('botao-submit');
const fotoPerfil = document.getElementById('foto-perfil');
const primeiroNomeInput = document.getElementById('primeiroNome');
const segundoNomeInput = document.getElementById('segundoNome');
const usuarioInput = document.getElementById('usuario');
const cpfInput = document.getElementById('cpf');
const emailInput = document.getElementById('email');
const telefoneInput = document.getElementById('telefone');
const agenciaInput = document.getElementById('agencia');
const numeroBancoInput = document.getElementById('numeroBanco');
const form = document.getElementById('formulario');
fotoPerfil.setAttribute("src", usuario.foto);
primeiroNomeInput.value = usuario.primeiroNome;
segundoNomeInput.value = usuario.segundoNome;
usuarioInput.value = usuario.usuario;
cpfInput.value = usuario.cpf;
emailInput.value = usuario.email;
telefoneInput.value = usuario.telefone;
agenciaInput.value = usuario.agencia.toString();
numeroBancoInput.value = usuario.numeroBanco.toString();
buscarFoto.addEventListener("change", evento => {
    const target = evento.target;
    const file = target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', evento => {
            fotoPerfil.src = reader.result;
        });
        reader.readAsDataURL(file);
    }
});
form.addEventListener('submit', evento => {
    evento.preventDefault();
    usuario.foto = fotoPerfil.src;
    usuario.primeiroNome = primeiroNomeInput.value;
    usuario.segundoNome = segundoNomeInput.value;
    usuario.usuario = usuarioInput.value;
    usuario.email = emailInput.value;
    usuario.telefone = telefoneInput.value;
    if (!(campoSenha1.value == "")) {
        let senhaHash = hashSenha.transformaHash(campoSenha1.value);
        usuario.senha = senhaHash;
    }
    if (!verificaCampos.verificaCamposErros([campoPrimeiroNome, campoSegundoNome, campoUsuario, campoEmail, campoTelefone, campoSenha1, campoSenha2])) {
        botaoSubmit.innerHTML = `
            <div class="mx-12 h-7 w-7 border-4 border-cor-carregamento border-t-white rounded-full animate-spin">
            </div>`;
        UsuariosApi.put(contasApi, usuario.id, usuario.devolveInformacoes());
        window.location.href = `./conta.html?id=${usuario.id}`;
    }
});
campoPrimeiroNome.addEventListener("blur", evento => {
    const erroPrimeiroNomeObg = document.getElementById("erroPrimeiroNome-obrigatorio");
    const erroPrimeiroNomeLen = document.getElementById("erroPrimeiroNome-length");
    const erroPrimeiroNomeInv = document.getElementById("erroPrimeiroNome-invalido");
    const resultado = verificaCampos.verificaCampoNome(campoPrimeiroNome, erroPrimeiroNomeObg, erroPrimeiroNomeLen, erroPrimeiroNomeInv); //
    refazClassInput(campoPrimeiroNome, resultado);
});
campoSegundoNome.addEventListener("blur", evento => {
    const erroSegundoNomeObg = document.getElementById("erroSegundoNome-obrigatorio");
    const erroSegundoNomeLen = document.getElementById("erroSegundoNome-length");
    const erroSegundoNomeInv = document.getElementById("erroSegundoNome-invalido");
    const resultado = verificaCampos.verificaCampoNome(campoSegundoNome, erroSegundoNomeObg, erroSegundoNomeLen, erroSegundoNomeInv); //
    refazClassInput(campoSegundoNome, resultado);
});
campoUsuario.addEventListener("blur", evento => {
    const erroCpfObg = document.getElementById("erroUsuario-obrigatorio");
    const erroCpfInv = document.getElementById("erroUsuario-invalido");
    const erroCpfExi = document.getElementById("erroUsuario-existe");
    const resultado = verificaCampos.verificaCampoUsuario(campoUsuario, erroCpfObg, erroCpfInv, erroCpfExi, contasApi, usuario); //
    refazClassInput(campoUsuario, resultado);
});
campoEmail.addEventListener("blur", evento => {
    const erroEmailObg = document.getElementById("erroEmail-obrigatorio");
    const erroEmailInv = document.getElementById("erroEmail-invalido");
    const resultado = verificaCampos.verificaCampoEmail(campoEmail, erroEmailObg, erroEmailInv); //
    refazClassInput(campoEmail, resultado);
});
campoTelefone.addEventListener("blur", evento => {
    const erroTelefoneObg = document.getElementById("erroTelefone-obrigatorio");
    const erroTelefoneInv = document.getElementById("erroTelefone-invalido");
    const erroTelefoneFor = document.getElementById("erroTelefone-formato");
    const resultado = verificaCampos.verificaCampoTelefone(campoTelefone, erroTelefoneObg, erroTelefoneInv, erroTelefoneFor); //
    refazClassInput(campoTelefone, resultado);
});
const erroSenhaDif = document.getElementById("erroSenha-naoIgual");
campoSenha1.addEventListener("blur", evento => {
    const erroSenhaLen = document.getElementById("erroSenha-length");
    const erroSenhaInv = document.getElementById("erroSenha-invalido");
    const resultado = verificaCampos.verificaCampoSenhaConta(campoSenha1, erroSenhaLen, erroSenhaInv); //
    verificaCampos.comparaSenha(campoSenha1, campoSenha2, erroSenhaDif);
    refazClassInput(campoSenha1, resultado);
});
campoSenha2.addEventListener("blur", evento => {
    const resultado = verificaCampos.comparaSenha(campoSenha1, campoSenha2, erroSenhaDif);
    refazClassInput(campoSenha2, resultado);
});
RedirecionaBotoes.redireciona(contasApi, usuario);
abreAside();
function refazClassInput(campo, resultado) {
    if (resultado) {
        campo.className = " border-2 border-cor-outline rounded-lg px-2 py-1 h-fit font-medium focus:outline-none focus:border-cor-hover";
    }
    else {
        campo.className = " border-2 border-cor-erro rounded-lg px-2 py-1 h-fit font-medium focus:outline-none focus:border-cor-erro";
    }
}
