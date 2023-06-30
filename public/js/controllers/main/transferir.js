import { InformacoesUsuario } from "../../models/InformacoesUsuario.js"
import { editaUsuario, getUsuariosApi } from "../../services/usuarios.js"
import { verificaExtratoExiste } from "../../utils/criaObjetoExtrato.js"
import { insereExtratoTransferir } from "../../utils/insereExtratoTransferir.js"
import { verificaCampos } from "../../utils/verificaCampos.js"
import { verificaLogin } from "../../utils/verificaLogin.js"
(async()=>{
    const contasApi = await getUsuariosApi()
    const usuario = new InformacoesUsuario(await verificaLogin())
    
    const pegaUrl = new URL(window.location.href)
    const idRementente = pegaUrl.searchParams.get('remetente') 
    const remetente = contasApi.find( (elemento) => elemento._id == idRementente )
    const usuarioDestinatario = new InformacoesUsuario(remetente)

    const botaoSair = document.getElementById('deslogar')
    const botoesRedirecionar = document.querySelectorAll('[data-lista]') 
    const botoesRedirecionarIguais = document.querySelectorAll('[data-lista-iguais]')

    const frase = document.getElementById('label-frase')
    frase.innerHTML = `Quanto você deseja transferir para ${usuarioDestinatario.primeiroNome + " " + usuarioDestinatario.segundoNome}?`

    const inputValor = document.getElementById('valor')
    const form = document.getElementById('formulario-transfere')

    inputValor.focus()

    inputValor.addEventListener('blur', evento =>{
        verificaCampos.funcoesMain(inputValor)
    })
    form.addEventListener('submit', async evento =>{
        evento.preventDefault()
        verificaExtratoExiste(usuario)
        if(verificaCampos.funcoesMain(inputValor)){
            if(((parseFloat(inputValor.value)+ 9.30) < usuario.saldo)){
                let saldo = (usuario.saldo - parseFloat(inputValor.value.replace(',', '.')) - 9.30).toFixed(2)
                insereExtratoTransferir(usuario, parseFloat(inputValor.value.replace(',', '.')).toFixed(2), usuarioDestinatario)
                usuario.saldo = parseFloat(saldo) 

                usuarioDestinatario.saldo += parseFloat(inputValor.value.replace(',', '.'))
            } else {
                throw new Error("Você não tem saldo suficiente para essa operação") 
            }
            await editaUsuario(usuario.id, usuario.devolveInformacoes())
            await editaUsuario(usuarioDestinatario.id, usuarioDestinatario.devolveInformacoes())
            
            window.location.href = `./transferencia-concluida.html?id=${usuario.id}`
        }
    })

    botaoSair.addEventListener("click", async ()=>{
        usuario.logado = false
        await editaUsuario(usuario.id, usuario.devolveInformacoes())

        window.location.href="../login.html"
    })
    for(let i = 0; i < botoesRedirecionarIguais.length; i++){
        botoesRedirecionarIguais[i].addEventListener('click' , evento =>{
            window.location.href = `../${botoesRedirecionarIguais[i].attributes[1].value}.html?id=${usuario.id}`
        })
    }
    for(let i = 0; i < botoesRedirecionar.length; i++){
        botoesRedirecionar[i].addEventListener('click' , evento =>{
            window.location.href = `./${botoesRedirecionar[i].attributes[1].value}.html?id=${usuario.id}`
        })
    }
})()
