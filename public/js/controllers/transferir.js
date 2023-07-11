import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { InformacoesApi } from "../utils/InformacoesApi.js"
import { verificaCampos } from "../utils/verificaCampos.js"
import { RedirecionaBotoes} from "../utils/redirecionaBotoesAside.js"
import { verificaExtratoExiste } from "../utils/criaExtratoUsuario.js"
import { RealizaOperacao } from "./RealizaOperacao.js"
(async()=>{
    const [contasApi, usuario] = await InformacoesApi.pegaInformacoes()
    
    const pegaUrl = new URL(window.location.href)
    const idRementente = pegaUrl.searchParams.get('remetente') 
    const remetente = contasApi.find( (elemento) => elemento._id == idRementente )
    const usuarioDestinatario = new InformacoesUsuario(remetente)

    const frase = document.getElementById('label-frase')
    frase.innerHTML = `Quanto você deseja transferir para ${usuarioDestinatario.primeiroNome + " " + usuarioDestinatario.segundoNome}?`

    const inputValor = document.getElementById('valor')
    const form = document.getElementById('formulario-transfere')
    const botaoSubmit = document.getElementById('botao-operacao')

    inputValor.focus()

    inputValor.addEventListener('blur', evento =>{
        verificaCampos.inputsOperacoes(inputValor)
    })
    form.addEventListener('submit', async evento =>{
        evento.preventDefault()
        botaoSubmit.innerHTML = `
        <div class="mx-12 h-7 w-7 border-4 border-cor-carregamento border-t-white rounded-full animate-spin">
        </div>`
        verificaExtratoExiste(usuario)
        const taxa = 9.30
        if(verificaCampos.inputsOperacoes(inputValor, usuario, taxa)){
            await RealizaOperacao.adicionaValores(inputValor, usuario, "Transferência")
        }
    })

    RedirecionaBotoes.redireciona(usuario)

})()
