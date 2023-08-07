import { Operacoes } from "../class/Operacoes.js"
import { verificaExtratoExiste } from "../utils/criaExtratoUsuario.js"
import { RedirecionaBotoes} from "../utils/redirecionaBotoesAside.js"
import { verificaCampos } from "../utils/verificaCampos.js"
import { RealizaOperacao } from "../class/RealizaOperacao.js"
import { InformacoesApi } from "../class/InformacoesApi.js"
import { verificaLogin } from "../utils/verificaLogin.js"
import { InformacoesUsuario } from "../models/InformacoesUsuario.js"

await verificaLogin()
const [contasApi, usuario] = await InformacoesApi.pegaInformacoes()
const formulario = document.getElementById('formulario')
const input = document.getElementById('input-operacao')
const tipoOperacao = Operacoes.devolveOperacao()
const taxaDasOperacoes = Operacoes.devolveTaxas()
const botaoSubmit = document.getElementById('botao-operacao')

let usuarioDestinatario
try{
    const pegaUrl = new URL(window.location.href)
    const idRementente = pegaUrl.searchParams.get('remetente') 
    const remetente = contasApi.find( (elemento) => elemento._id == idRementente )
    usuarioDestinatario = new InformacoesUsuario(remetente)
} catch {

}

Operacoes.criaTextos(usuarioDestinatario)

input.addEventListener('blur', evento=>{
    verificaCampos.inputsOperacoes(input, usuario, taxaDasOperacoes)
})

formulario.addEventListener('submit', async evento =>{
    evento.preventDefault()
    verificaExtratoExiste(usuario)
    if(verificaCampos.inputsOperacoes(input, usuario, taxaDasOperacoes)){
        botaoSubmit.innerHTML = ` <div class = "flex justify-center w-full">
        <div class="h-7 w-7 border-4 border-cor-carregamento border-t-white rounded-full animate-spin">
        </div>
        </div>`
        await RealizaOperacao.adicionaValores(input, usuario, tipoOperacao, usuarioDestinatario)
    }
})

RedirecionaBotoes.redireciona(usuario)
