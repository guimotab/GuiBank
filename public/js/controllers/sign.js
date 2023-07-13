import mostraSenha from "../utils/mostraSenha.js"
import { verificaCampos } from "../utils/verificaCampos.js"
import { Usuario } from "../models/Usuario.js"
import { hashSenha } from "../utils/criptografaSenha.js"
import { verificaSign } from "../utils/verificaSign.js"
import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { UsuariosApi } from "../services/UsuariosApi.js"

(async() => {
    const contas = await UsuariosApi.get()
    
    const olho = document.querySelector('[data-id]')
    const form = document.getElementById('formulario')
    const botaoSubmit = document.getElementById('botao-submit')
    const campoPrimeiroNome = document.getElementById('primeiroNome')
    const campoSegundoNome = document.getElementById('segundoNome')
    const campoCPF = document.getElementById('cpf')
    const campoEmail = document.getElementById('email')
    const campoTelefone = document.getElementById('telefone')
    const campoSenha1 = document.getElementById('campo-senha')
    const campoSenha2 = document.getElementById('campo-senha2')

    // verificaMissMatch()
    campoPrimeiroNome.addEventListener("blur", evento =>{
        const erroPrimeiroNomeObg = document.getElementById("erro-primeiroNome-obrigatorio")
        const erroPrimeiroNomeLen = document.getElementById("erro-primeiroNome-length")
        const erroPrimeiroNomeEsc = document.getElementById("erro-primeiroNome-escrita")
        verificaCampos.verificaCampoNome(campoPrimeiroNome, erroPrimeiroNomeObg, erroPrimeiroNomeLen, erroPrimeiroNomeEsc)
        consertaAutoComplete(campoPrimeiroNome)
    })
    campoSegundoNome.addEventListener("blur", evento =>{
        const erroSegundoNomeObg = document.getElementById("erro-segundoNome-obrigatorio")
        const erroSegundoNomeLen = document.getElementById("erro-segundoNome-length")
        const erroSegundoNomeEsc = document.getElementById("erro-segundoNome-escrita")
        verificaCampos.verificaCampoNome(campoSegundoNome, erroSegundoNomeObg, erroSegundoNomeLen, erroSegundoNomeEsc)
        consertaAutoComplete(campoSegundoNome)
    })
    campoCPF.addEventListener("blur", evento =>{
        consertaAutoComplete(campoCPF)
        const erroCpfObg = document.getElementById("erro-cpf-obrigatorio")
        const erroCpfInv = document.getElementById("erro-cpf-invalido")
        const erroCpfExi = document.getElementById("erro-cpf-existe")
        const erroCpfEsc = document.getElementById("erro-cpf-escrita")
        verificaCampos.verificaCampoCPF(campoCPF, erroCpfObg, erroCpfInv, erroCpfExi, erroCpfEsc, contas)
    })
    campoEmail.addEventListener("blur", evento =>{
        const erroEmailObg = document.getElementById("erro-email-obrigatorio")
        const erroEmailEsc = document.getElementById("erro-email-escrita")
        verificaCampos.verificaCampoEmail(campoEmail, erroEmailObg, erroEmailEsc)
        consertaAutoComplete(campoEmail)
    })
    campoTelefone.addEventListener("blur", evento =>{
        const erroTelefoneObg = document.getElementById("erro-telefone-obrigatorio")
        const erroTelefoneEsc = document.getElementById("erro-telefone-escrita")
        const erroTelefoneInv = document.getElementById("erro-telefone-invalido")
        verificaCampos.verificaCampoTelefone(campoTelefone, erroTelefoneObg, erroTelefoneEsc, erroTelefoneInv)
        consertaAutoComplete(campoTelefone)
    })
    campoSenha1.addEventListener("blur", evento =>{
        const erroSenhaObg = document.getElementById("erro-senha-obrigatorio")
        const erroSenhaEsc = document.getElementById("erro-senha-escrita")
        const erroSenhaInv = document.getElementById("erro-senha-invalido")
        const erroSenhaDif = document.getElementById("erro-senhas-diferentes")
        verificaCampos.verificaCampoSenha(campoSenha1, erroSenhaObg, erroSenhaEsc, erroSenhaInv)
        verificaCampos.comparaSenha(campoSenha1, campoSenha2, erroSenhaDif)
        consertaAutoComplete(campoSenha1)
    })
    campoSenha2.addEventListener("blur", evento =>{
        const erroSenhaDif = document.getElementById("erro-senhas-diferentes")
        verificaCampos.comparaSenha(campoSenha1, campoSenha2, erroSenhaDif)
        consertaAutoComplete(campoSenha2)
    })
    
    olho.addEventListener("mousedown", (evento) =>{
        let clicouOlho = evento.target
        mostraSenha.verSenha(clicouOlho)
    
    })
    olho.addEventListener("mouseup", (evento) =>{
        let clicouOlho = evento.target
        mostraSenha.fecharSenha(clicouOlho)
    })
    
    form.addEventListener("submit", async evento=>{
        evento.preventDefault()
        const conta = new Usuario(contas, campoPrimeiroNome.value, campoSegundoNome.value, campoCPF.value, campoEmail.value, campoTelefone.value, hashSenha.transformaHash(campoSenha1.value))
        if(!verificaCampos.verificaCamposErros([campoPrimeiroNome, campoSegundoNome, campoCPF, campoEmail, campoSenha1, campoSenha2])){ 
            botaoSubmit.innerHTML = `<div class="mx-8 h-7 w-7 border-4 border-cor-carregamento border-t-white rounded-full animate-spin">`
            botaoSubmit.className = `flex w-fit bg-cor-terciaria px-7 py-2 text-white font-medium text-lg rounded-xl`
            await UsuariosApi.post(conta.devolveInformacoes(contas))
            const usuario = new InformacoesUsuario(await verificaSign(campoCPF.value))
            window.location.href = `./home.html?id=${usuario.id}`
        }
    })

    function consertaAutoComplete(campo){
        const valor = campo.value
        campo.value = ""
        campo.value = valor
    }
})()
