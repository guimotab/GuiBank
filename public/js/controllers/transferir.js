import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { editaUsuario } from "../services/usuarios.js"
import { InformacoesApi } from "../utils/InformacoesApi.js"
import { InsereExtratos } from "../utils/InsereExtratos.js"
import { verificaCampos } from "../utils/verificaCampos.js"
import { redirecionaBotoesAside } from "../utils/redirecionaBotoesAside.js"
import { verificaExtratoExiste } from "../utils/criaExtratoUsuario.js"
(async()=>{
    const [contasApi, usuario] = await InformacoesApi.pegaInformacoes()
    
    const pegaUrl = new URL(window.location.href)
    const idRementente = pegaUrl.searchParams.get('remetente') 
    const remetente = contasApi.find( (elemento) => elemento._id == idRementente )
    const usuarioDestinatario = new InformacoesUsuario(remetente)

    const botaoSair = document.getElementById('deslogar')
    const botoesRedirecionar = document.querySelectorAll('[data-lista]') 

    const frase = document.getElementById('label-frase')
    frase.innerHTML = `Quanto você deseja transferir para ${usuarioDestinatario.primeiroNome + " " + usuarioDestinatario.segundoNome}?`

    const inputValor = document.getElementById('valor')
    const form = document.getElementById('formulario-transfere')

    inputValor.focus()

    inputValor.addEventListener('blur', evento =>{
        verificaCampos.inputsOperacoes(inputValor)
    })
    form.addEventListener('submit', async evento =>{
        evento.preventDefault()
        verificaExtratoExiste(usuario)
        if(verificaCampos.inputsOperacoes(inputValor)){
            if(((parseFloat(inputValor.value)+ 9.30) < usuario.saldo)){
                let saldo = (usuario.saldo - parseFloat(inputValor.value.replace(',', '.')) - 9.30).toFixed(2)
                InsereExtratos.extratoTransferir(usuario, parseFloat(inputValor.value.replace(',', '.')).toFixed(2), usuarioDestinatario)
                usuario.saldo = parseFloat(saldo) 

                usuarioDestinatario.saldo += parseFloat(inputValor.value.replace(',', '.'))
            } else {
                throw new Error("Você não tem saldo suficiente para essa operação") 
            }
            await editaUsuario(usuario.id, usuario.devolveInformacoes())
            await editaUsuario(usuarioDestinatario.id, usuarioDestinatario.devolveInformacoes())
            
            window.location.href = `./operacaoConcluida.html?id=${usuario.id}`
        }
    })

    redirecionaBotoesAside(botaoSair, usuario, botoesRedirecionar)
})()
