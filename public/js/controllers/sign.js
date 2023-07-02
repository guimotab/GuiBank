import mostraSenha from "../utils/mostraSenha.js"
import { verificaCampos } from "../utils/verificaCampos.js"
import { Usuario } from "../models/Usuario.js"
import { hashSenha } from "../utils/formataSenha.js"
import { cadastraUsuario, getUsuariosApi } from "../services/usuarios.js"
import { verificaSign } from "../utils/verificaSign.js"
import { InformacoesUsuario } from "../models/InformacoesUsuario.js"

(async() => {

    const contas = await getUsuariosApi()
    
    const olho = document.querySelector('[data-id]')
    const form = document.getElementById('formulario')
    const campoPrimeiroNome = document.getElementById('primeiroNome')
    const campoSegundoNome = document.getElementById('segundoNome')
    const campoCPF = document.getElementById('cpf')
    const campoEmail = document.getElementById('email')
    const campoTelefone = document.getElementById('telefone')
    const campoSenha1 = document.getElementById('campo-senha')
    const campoSenha2 = document.getElementById('campo-senha2')

    // verificaMissMatch()
    campoPrimeiroNome.addEventListener("blur", evento =>{
        const erroPrimeiroNomeObg = document.querySelector(".erro-primeiroNome-obrigatorio")
        const erroPrimeiroNomeLen = document.querySelector(".erro-primeiroNome-length")
        const erroPrimeiroNomeEsc = document.querySelector(".erro-primeiroNome-escrita")
        verificaCampos.verificaCampoNome(campoPrimeiroNome, erroPrimeiroNomeObg, erroPrimeiroNomeLen, erroPrimeiroNomeEsc)
    })
    campoSegundoNome.addEventListener("blur", evento =>{
        const erroSegundoNomeObg = document.querySelector(".erro-segundoNome-obrigatorio")
        const erroSegundoNomeLen = document.querySelector(".erro-segundoNome-length")
        const erroSegundoNomeEsc = document.querySelector(".erro-segundoNome-escrita")
        verificaCampos.verificaCampoNome(campoSegundoNome, erroSegundoNomeObg, erroSegundoNomeLen, erroSegundoNomeEsc)
    })
    campoCPF.addEventListener("blur", evento =>{
        const erroCpfObg = document.querySelector(".erro-cpf-obrigatorio")
        const erroCpfInv = document.querySelector(".erro-cpf-invalido")
        const erroCpfExi = document.querySelector(".erro-cpf-existe")
        const erroCpfEsc = document.querySelector(".erro-cpf-escrita")
        verificaCampos.verificaCampoCPF(campoCPF, erroCpfObg, erroCpfInv, erroCpfExi, erroCpfEsc, contas)
    })
    campoEmail.addEventListener("blur", evento =>{
        const erroEmailObg = document.querySelector(".erro-email-obrigatorio")
        const erroEmailEsc = document.querySelector(".erro-email-escrita")
        verificaCampos.verificaCampoEmail(campoEmail, erroEmailObg, erroEmailEsc)
    })
    campoTelefone.addEventListener("blur", evento =>{
        const erroTelefoneObg = document.querySelector(".erro-telefone-obrigatorio")
        const erroTelefoneEsc = document.querySelector(".erro-telefone-escrita")
        const erroTelefoneInv = document.querySelector(".erro-telefone-invalido")
        verificaCampos.verificaCampoTelefone(campoTelefone, erroTelefoneObg, erroTelefoneEsc, erroTelefoneInv)
    })
    campoSenha1.addEventListener("blur", evento =>{
        const erroSenhaObg = document.querySelector(".erro-senha-obrigatorio")
        const erroSenhaEsc = document.querySelector(".erro-senha-escrita")
        const erroSenhaInv = document.querySelector(".erro-senha-invalido")
        const erroSenhaDif = document.querySelector(".erro-senhas-diferentes")
        verificaCampos.verificaCampoSenha(campoSenha1, erroSenhaObg, erroSenhaEsc, erroSenhaInv)
        verificaCampos.comparaSenha(campoSenha1, campoSenha2, erroSenhaDif)
    })
    campoSenha2.addEventListener("blur", evento =>{
        const erroSenhaDif = document.querySelector(".erro-senhas-diferentes")
        verificaCampos.comparaSenha(campoSenha1, campoSenha2, erroSenhaDif)
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
                await cadastraUsuario(conta.devolveInformacoes())
                const usuario = new InformacoesUsuario(await verificaSign(campoCPF.value))
                window.location.href = `./routes/main.html?id=${usuario.id}`
            }
    })
})()
