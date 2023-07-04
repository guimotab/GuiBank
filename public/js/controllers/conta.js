import { verificaCampos } from "../utils/verificaCampos.js"
import { hashSenha } from "../utils/criptografaSenha.js"
import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { editaUsuario } from "../services/usuarios.js"
import { verificaLogin } from "../utils/verificaLogin.js"
import { redirecionaBotoesAside } from "../utils/redirecionaBotoesAside.js"

(async()=>{
    const usuario = new InformacoesUsuario(await verificaLogin())

    const botoesRedirecionar = document.querySelectorAll('[data-lista]')
    const botaoSair = document.getElementById('deslogar')

    const buscarFoto = document.getElementById('buscar-foto')
    const campoPrimeiroNome = document.getElementById('primeiroNome')
    const campoSegundoNome = document.getElementById('segundoNome')
    const campoUsuario = document.getElementById('usuario')
    const campoEmail = document.getElementById('email')
    const campoTelefone = document.getElementById('telefone')
    const campoSenha1 = document.getElementById('campo-senha1')
    const campoSenha2 = document.getElementById('campo-senha2')

    const fotoPerfil = document.getElementById('foto-perfil')
    const primeiroNomeInput = document.getElementById('primeiroNome')
    const segundoNomeInput = document.getElementById('segundoNome')
    const usuarioInput = document.getElementById('usuario')
    const cpfInput = document.getElementById('cpf')
    const emailInput = document.getElementById('email')
    const telefoneInput = document.getElementById('telefone')
    const agenciaInput = document.getElementById('agencia')
    const numeroBancoInput = document.getElementById('numeroBanco')

    const form = document.getElementById('formulario')

    fotoPerfil.setAttribute("src", usuario.foto)
    primeiroNomeInput.value = usuario.primeiroNome
    segundoNomeInput.value = usuario.segundoNome
    usuarioInput.value = usuario.usuario
    cpfInput.value = usuario.cpf
    emailInput.value = usuario.email
    telefoneInput.value = usuario.telefone
    agenciaInput.value = usuario.agencia.toString()
    numeroBancoInput.value = usuario.numeroBanco.toString()

    buscarFoto.addEventListener("change", evento =>{
        const target = evento.target
        const file = target.files[0]
        if (file){
            const reader = new FileReader()
            reader.addEventListener('load', evento =>{
                fotoPerfil.src = reader.result
            })
            reader.readAsDataURL(file)
        }        
    })

    form.addEventListener('submit', async evento=>{
        evento.preventDefault()
        usuario.foto = fotoPerfil.src
        usuario.primeiroNome = primeiroNomeInput.value
        usuario.segundoNome = segundoNomeInput.value
        usuario.usuario = usuarioInput.value
        usuario.email = emailInput.value
        usuario.telefone = telefoneInput.value

        if(!(campoSenha1.value == "")){
            let senhaHash = hashSenha.transformaHash(campoSenha1.value)
            usuario.senha = senhaHash;
        }
        
        if(!verificaCampos.verificaCamposErros([campoPrimeiroNome, campoSegundoNome, campoEmail, campoTelefone, campoSenha1, campoSenha2])){ 
            await editaUsuario(usuario.id, usuario.devolveInformacoes())
            window.location.href = `./conta.html?id=${usuario.id}`
        }
    })

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
    campoUsuario.addEventListener("blur", evento =>{
        // const erroCpfObg = document.querySelector(".erro-cpf-obrigatorio")
        // const erroCpfInv = document.querySelector(".erro-cpf-invalido")
        // const erroCpfExi = document.querySelector(".erro-cpf-existe")
        // const erroCpfEsc = document.querySelector(".erro-cpf-escrita")
        // campoCorreteo = verificaCampos.verificaCampoCPF(campoCPF, erroCpfObg, erroCpfInv, erroCpfExi, erroCpfEsc, contas)
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
    const erroSenhaDif = document.querySelector(".erro-senhas-diferentes")
    campoSenha1.addEventListener("blur", evento =>{
        const erroSenhaInv = document.querySelector(".erro-senha-invalido")
        const erroSenhaEsc = document.querySelector(".erro-senha-escrita")
        verificaCampos.verificaCampoSenhaConta(campoSenha1, erroSenhaEsc, erroSenhaInv)
        verificaCampos.comparaSenha(campoSenha1, campoSenha2, erroSenhaDif)
    })
    campoSenha2.addEventListener("blur", evento =>{
        verificaCampos.comparaSenha(campoSenha1, campoSenha2, erroSenhaDif,)
    })
    redirecionaBotoesAside(botaoSair, usuario, botoesRedirecionar)

})()
