import { verificaCampos } from "../utils/verificaCampos.js"
import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { verificaLogin } from "../utils/verificaLogin.js"
import { editaUsuario } from "../services/usuarios.js"
import { InsereExtratos } from "../utils/InsereExtratos.js"
import { redirecionaBotoesAside } from "../utils/redirecionaBotoesAside.js"
(async()=>{
    const usuario = new InformacoesUsuario(await verificaLogin())

    const botaoSair = document.getElementById('deslogar')
    const botoesRedirecionar = document.querySelectorAll('[data-lista]')

    const inputValor = document.getElementById('valor')
    const form = document.getElementById('formulario')

    inputValor.focus()

    inputValor.addEventListener('blur', evento =>{
        
        verificaCampos.inputsOperacoes(inputValor)
    })
    form.addEventListener('submit', async evento =>{
        evento.preventDefault()
        verificaExtratoExiste(usuario)
        if(verificaCampos.inputsOperacoes(inputValor)){
            if(parseFloat(inputValor.value) > 8000){
                let saldo = parseFloat(inputValor.value.replace(',', '.'))*0.001
                saldo = (saldo + usuario.saldo)
                InsereExtratos.extratoDepositar(usuario, parseFloat(inputValor.value.replace(',', '.')).toFixed(2))
                usuario.saldo = saldo
            } else {
                saldo = (parseFloat(inputValor.value.replace(',', '.')) + usuario.saldo)
                usuario.saldo = saldo
                InsereExtratos.extratoDepositar(usuario, parseFloat(inputValor.value.replace(',', '.')).toFixed(2))
                
            }
            await editaUsuario(usuario.id, usuario.devolveInformacoes())
            window.location.href = `./operacaoConcluida.html?id=${usuario.id}`
        }
    })
    redirecionaBotoesAside(botaoSair, usuario, botoesRedirecionar)
})()