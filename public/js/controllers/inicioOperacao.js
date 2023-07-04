import { Operacoes } from "../utils/Operacoes.js"
import { verificaExtratoExiste } from "../utils/criaExtratoUsuario.js"
import { redirecionaBotoesAside } from "../utils/redirecionaBotoesAside.js"
import { verificaCampos } from "../utils/verificaCampos.js"
import { RealizaOperacao } from "../utils/RealizaOperacao.js"
import { InformacoesApi } from "../utils/InformacoesApi.js"
import { InformacoesUsuario } from "../models/InformacoesUsuario.js"

const [contasApi, usuario] = await InformacoesApi.pegaInformacoes()
const formulario = document.getElementById('formulario')
const input = document.getElementById('input-valor')
const tipoOperacao = Operacoes.devolveOperacao()
const taxaDasOperacoes = Operacoes.devolveTaxas()

let usuarioDestinatario
try{
    const pegaUrl = new URL(window.location.href)
    const idRementente = pegaUrl.searchParams.get('remetente') 
    const remetente = contasApi.find( (elemento) => elemento._id == idRementente )
    usuarioDestinatario = new InformacoesUsuario(remetente)
} catch {

}

const botaoSair = document.getElementById('deslogar')
const botoesRedirecionar = document.querySelectorAll('[data-lista]')

Operacoes.criaTextos(usuarioDestinatario)

input.addEventListener('blur', evento=>{
    verificaCampos.inputsOperacoes(input, usuario, taxaDasOperacoes)
})

formulario.addEventListener('submit', async evento =>{
    evento.preventDefault()
    verificaExtratoExiste(usuario)
    if(verificaCampos.inputsOperacoes(input, usuario, taxaDasOperacoes)){
        await RealizaOperacao.adicionaValores(input, usuario, tipoOperacao, usuarioDestinatario)
    }
})

redirecionaBotoesAside(botaoSair, usuario, botoesRedirecionar)