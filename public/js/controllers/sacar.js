import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { editaUsuario } from "../services/usuarios.js"
import { InsereExtratos } from "../utils/InsereExtratos.js"
import { verificaCampos } from "../utils/verificaCampos.js"
import { verificaLogin } from "../utils/verificaLogin.js"
import { redirecionaBotoesAside } from "../utils/redirecionaBotoesAside.js"
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
        if(verificaCampos.inputsOperacoes(inputValor)){
            if((parseFloat(inputValor.value) + 3.30) < usuario.saldo){
                let saldo = (usuario.saldo - parseFloat(inputValor.value.replace(',', '.')) - 3.30)
                InsereExtratos.extratoSacar(usuario, (parseFloat(inputValor.value.replace(',', '.')) + 3.30).toFixed(2))
                usuario.saldo = saldo
            } else {
                erroSaldoInsuficiente.style.display = "block";
                throw new Error("Você não tem saldo suficiente para essa operação") 
            }
            
            await editaUsuario(usuario.id, usuario.devolveInformacoes())

            window.location.href = `./operacaoConcluida.html?id=${usuario.id}`
        }
    })

    redirecionaBotoesAside(botaoSair, usuario, botoesRedirecionar)
})()