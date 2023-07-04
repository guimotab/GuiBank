import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { InformacoesApi } from "../utils/InformacoesApi.js"
import { verificaCampos } from "../utils/verificaCampos.js"
import { redirecionaBotoesAside } from "../utils/redirecionaBotoesAside.js"
import { verificaExtratoExiste } from "../utils/criaExtratoUsuario.js"
import { RealizaOperacao } from "./RealizaOperacao.js"
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
        const taxa = 9.30
        if(verificaCampos.inputsOperacoes(inputValor, usuario, taxa)){
            await RealizaOperacao.adicionaValores(inputValor, usuario, "Transferência")
        }
    })

    redirecionaBotoesAside(botaoSair, usuario, botoesRedirecionar)
})()
