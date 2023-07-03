import { InformacoesUsuario } from "../../models/InformacoesUsuario.js"
import { editaUsuario } from "../../services/usuarios.js"
import { verificaExtratoExiste } from "../../utils/criaObjetoExtrato.js"
import { insereExtratoSacar } from "../../utils/insereExtratoSacar.js"
import { verificaCampos } from "../../utils/verificaCampos.js"
import { verificaLogin } from "../../utils/verificaLogin.js"
(async()=>{
    const usuario = new InformacoesUsuario(await verificaLogin())

    const botaoSair = document.getElementById('deslogar')
    const botoesRedirecionar = document.querySelectorAll('[data-lista]')
    const botoesRedirecionarIguais = document.querySelectorAll('[data-lista-iguais]')

    const inputValor = document.getElementById('valor')
    // const botao = document.getElementById('botao-sacar')
    const form = document.getElementById('formulario')
    const erroSaldoInsuficiente = document.querySelector(".erro-insuficiente")

    inputValor.focus()

    inputValor.addEventListener('blur', evento =>{
        erroSaldoInsuficiente.style.display = "none";
        verificaCampos.funcoesMain(inputValor)
    })
    form.addEventListener('submit', async evento =>{
        evento.preventDefault()
        verificaExtratoExiste(usuario)
        if(verificaCampos.funcoesMain(inputValor)){
            if((parseFloat(inputValor.value) + 3.30) < usuario.saldo){
                erroSaldoInsuficiente.style.display = "none";
                let saldo = (usuario.saldo - parseFloat(inputValor.value.replace(',', '.')) - 3.30)
                insereExtratoSacar(usuario, (parseFloat(inputValor.value.replace(',', '.')) + 3.30).toFixed(2))
                usuario.saldo = saldo
            } else {
                erroSaldoInsuficiente.style.display = "block";
                throw new Error("Você não tem saldo suficiente para essa operação") 
            }
            
            await editaUsuario(usuario.id, usuario.devolveInformacoes())

            window.location.href = `./saque-concluido.html?id=${usuario.id}`
        }
    })

    botaoSair.addEventListener("click", async ()=>{
        usuario.logado = false
        await editaUsuario(usuario.id, usuario.devolveInformacoes())
        window.location.href="../login.html"
    })
    for(let i = 0; i < botoesRedirecionarIguais.length; i++){
        botoesRedirecionarIguais[i].addEventListener('click' , evento =>{
            window.location.href = `../${botoesRedirecionarIguais[i].attributes[1].value}.html?id=${usuario.id}`
        })
    }
    for(let i = 0; i < botoesRedirecionar.length; i++){
        botoesRedirecionar[i].addEventListener('click' , evento =>{
            if (botoesRedirecionar[i].attributes[1].value != "sacar"){
                window.location.href = `./${botoesRedirecionar[i].attributes[1].value}.html?id=${usuario.id}`
            }
        })
}})()