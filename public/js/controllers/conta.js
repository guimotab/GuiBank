import { verificaCampos } from "../utils/verificaCampos.js"
import { hashSenha } from "../utils/criptografaSenha.js"
import { editaUsuario } from "../services/usuarios.js"
import { redirecionaBotoesAside } from "../utils/redirecionaBotoesAside.js"
import { InformacoesApi } from "../utils/InformacoesApi.js"

(async()=>{
    const [contasApi, usuario] = await InformacoesApi.pegaInformacoes()

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
        if(!verificaCampos.verificaCamposErros([campoPrimeiroNome, campoSegundoNome, campoUsuario, campoEmail, campoTelefone, campoSenha1, campoSenha2])){ 
            await editaUsuario(usuario.id, usuario.devolveInformacoes())
            window.location.href = `./conta.html?id=${usuario.id}`
        }
    })

    campoPrimeiroNome.addEventListener("blur", evento =>{
        const erroPrimeiroNomeObg = document.getElementById("erroPrimeiroNome-obrigatorio")
        const erroPrimeiroNomeLen = document.getElementById("erroPrimeiroNome-length")
        const erroPrimeiroNomeInv = document.getElementById("erroPrimeiroNome-invalido")
        verificaCampos.verificaCampoNome(campoPrimeiroNome, erroPrimeiroNomeObg, erroPrimeiroNomeLen, erroPrimeiroNomeInv) //
    })
    campoSegundoNome.addEventListener("blur", evento =>{
        const erroSegundoNomeObg = document.getElementById("erroSegundoNome-obrigatorio")
        const erroSegundoNomeLen = document.getElementById("erroSegundoNome-length")
        const erroSegundoNomeInv = document.getElementById("erroSegundoNome-invalido")
        verificaCampos.verificaCampoNome(campoSegundoNome, erroSegundoNomeObg, erroSegundoNomeLen, erroSegundoNomeInv)//

    })
    campoUsuario.addEventListener("blur", evento =>{
        const erroCpfObg = document.getElementById("erroUsuario-obrigatorio")
        const erroCpfInv = document.getElementById("erroUsuario-invalido")
        const erroCpfExi = document.getElementById("erroUsuario-existe")
        verificaCampos.verificaCampoUsuario(campoUsuario, erroCpfObg, erroCpfInv, erroCpfExi, contasApi, usuario) //
    })
    campoEmail.addEventListener("blur", evento =>{
        const erroEmailObg = document.getElementById("erroEmail-obrigatorio")
        const erroEmailInv = document.getElementById("erroEmail-invalido")
        verificaCampos.verificaCampoEmail(campoEmail, erroEmailObg, erroEmailInv)//
    })
    campoTelefone.addEventListener("blur", evento =>{
        const erroTelefoneObg = document.getElementById("erroTelefone-obrigatorio")
        const erroTelefoneInv = document.getElementById("erroTelefone-invalido")
        const erroTelefoneFor = document.getElementById("erroTelefone-formato")
        verificaCampos.verificaCampoTelefone(campoTelefone, erroTelefoneObg, erroTelefoneInv, erroTelefoneFor)//
    })
    const erroSenhaDif = document.getElementById("erroSenha-naoIgual")
    campoSenha1.addEventListener("blur", evento =>{
        const erroSenhaLen = document.getElementById("erroSenha-length")
        const erroSenhaInv = document.getElementById("erroSenha-invalido")
        verificaCampos.verificaCampoSenhaConta(campoSenha1, erroSenhaLen, erroSenhaInv)//
        verificaCampos.comparaSenha(campoSenha1, campoSenha2, erroSenhaDif)
    })
    campoSenha2.addEventListener("blur", evento =>{
        verificaCampos.comparaSenha(campoSenha1, campoSenha2, erroSenhaDif)
    })
    redirecionaBotoesAside(botaoSair, usuario, botoesRedirecionar)

})()
