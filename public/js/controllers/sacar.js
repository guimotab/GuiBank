import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { verificaCampos } from "../utils/verificaCampos.js"
import { verificaLogin } from "../utils/verificaLogin.js"
import { RedirecionaBotoes} from "../utils/redirecionaBotoesAside.js"
import { RealizaOperacao } from "./RealizaOperacao.js"
(async()=>{
    const usuario = new InformacoesUsuario(await verificaLogin())

    const inputValor = document.getElementById('valor')
    const botaoSubmit = document.getElementById('botao-operacao')
    const form = document.getElementById('formulario')
    const erroSaldoInsuficiente = document.querySelector(".erro-insuficiente")

    inputValor.focus()

    inputValor.addEventListener('blur', evento =>{
        erroSaldoInsuficiente.style.display = "none";
        verificaCampos.inputsOperacoes(inputValor)
    })
    form.addEventListener('submit', async evento =>{
        evento.preventDefault()
        botaoSubmit.innerHTML = `
        <div class="mx-12 h-7 w-7 border-4 border-cor-carregamento border-t-white rounded-full animate-spin">
        </div>`
        verificaExtratoExiste(usuario)
        const taxa = 3.30
        if(verificaCampos.inputsOperacoes(inputValor, usuario, taxa)){
            await RealizaOperacao.adicionaValores(inputValor, usuario, "Saque")
        }
    })

    RedirecionaBotoes.redireciona(usuario)

})()