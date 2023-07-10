import { verificaCampos } from "../utils/verificaCampos.js"
import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { verificaLogin } from "../utils/verificaLogin.js"
import { redirecionaBotoesAside } from "../utils/redirecionaBotoesAside.js"
import { RealizaOperacao } from "./RealizaOperacao.js"
import { verificaExtratoExiste } from "../utils/criaExtratoUsuario.js"
(async()=>{
    const usuario = new InformacoesUsuario(await verificaLogin())

    const botaoSair = document.getElementById('deslogar')
    const botoesRedirecionar = document.querySelectorAll('[data-lista]')

    const inputValor = document.getElementById('valor')
    const form = document.getElementById('formulario')
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
        if(verificaCampos.inputsOperacoes(inputValor, usuario)){
            await RealizaOperacao.adicionaValores(inputValor, usuario, "Depósito")
        }
    })
    redirecionaBotoesAside(botaoSair, usuario, botoesRedirecionar)
})()