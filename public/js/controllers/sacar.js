import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { verificaCampos } from "../utils/verificaCampos.js"
import { verificaLogin } from "../utils/verificaLogin.js"
import { redirecionaBotoesAside } from "../utils/redirecionaBotoesAside.js"
import { RealizaOperacao } from "./RealizaOperacao.js"
(async()=>{
    const usuario = new InformacoesUsuario(await verificaLogin())

    const botaoSair = document.getElementById('deslogar')
    const botoesRedirecionar = document.querySelectorAll('[data-lista]')

    const inputValor = document.getElementById('valor')
    // const botao = document.getElementById('botao-sacar')
    const form = document.getElementById('formulario')
    const erroSaldoInsuficiente = document.querySelector(".erro-insuficiente")

    inputValor.focus()

    inputValor.addEventListener('blur', evento =>{
        erroSaldoInsuficiente.style.display = "none";
        verificaCampos.inputsOperacoes(inputValor)
    })
    form.addEventListener('submit', async evento =>{
        evento.preventDefault()
        verificaExtratoExiste(usuario)
        const taxa = 3.30
        if(verificaCampos.inputsOperacoes(inputValor, usuario, taxa)){
            await RealizaOperacao.adicionaValores(inputValor, usuario, "Saque")
        }
    })

    redirecionaBotoesAside(botaoSair, usuario, botoesRedirecionar)
})()