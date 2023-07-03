import { verificaExtratoExiste } from "../../utils/criaObjetoExtrato.js"
import { insereExtratoDepositar } from "../../utils/insereExtratoDepositar.js"
import { verificaCampos } from "../../utils/verificaCampos.js"
import { InformacoesUsuario } from "../../models/InformacoesUsuario.js"
import { verificaLogin } from "../../utils/verificaLogin.js"
import { editaUsuario } from "../../services/usuarios.js"
(async()=>{
    // const contasApi = await getUsuariosApi()

    const usuario = new InformacoesUsuario(await verificaLogin())

//todas contas no banco de Dados
const botaoSair = document.getElementById('deslogar')
const botoesRedirecionar = document.querySelectorAll('[data-lista]')
const botoesRedirecionarIguais = document.querySelectorAll('[data-lista-iguais]')

const inputValor = document.getElementById('valor')
const form = document.getElementById('formulario')

inputValor.focus()

botaoSair.addEventListener("click", async ()=>{
    usuario.logado = false
    await editaUsuario(usuario.id, usuario.devolveInformacoes())

    window.location.href="../login.html"
})
inputValor.addEventListener('blur', evento =>{
    
    verificaCampos.funcoesMain(inputValor)
})
form.addEventListener('submit', async evento =>{
    evento.preventDefault()
    verificaExtratoExiste(usuario)
    let saldo
    if(verificaCampos.funcoesMain(inputValor)){
        if(parseFloat(inputValor.value) > 8000){
            saldo = parseFloat(inputValor.value.replace(',', '.'))*0.001
            saldo = (saldo + usuario.saldo)
            // insereExtratoDepositar(usuario, (0.001*parseFloat(inputValor.value.replace(',', '.')).toFixed(2)))
            insereExtratoDepositar(usuario, parseFloat(inputValor.value.replace(',', '.')).toFixed(2))
            usuario.saldo = saldo
        } else {
            saldo = (parseFloat(inputValor.value.replace(',', '.')) + usuario.saldo)
            usuario.saldo = saldo
            insereExtratoDepositar(usuario, parseFloat(inputValor.value.replace(',', '.')).toFixed(2))
            
        }
        await editaUsuario(usuario.id, usuario.devolveInformacoes())
        window.location.href = `./deposito-concluido.html?id=${usuario.id}`
    }
})
for(let i = 0; i < botoesRedirecionarIguais.length; i++){
    botoesRedirecionarIguais[i].addEventListener('click' , evento =>{
        window.location.href = `../${botoesRedirecionarIguais[i].attributes[1].value}.html?id=${usuario.id}`
    })
}
for(let i = 0; i < botoesRedirecionar.length; i++){
    botoesRedirecionar[i].addEventListener('click' , evento =>{
        if (botoesRedirecionar[i].attributes[1].value != "depositar"){
            window.location.href = `./${botoesRedirecionar[i].attributes[1].value}.html?id=${usuario.id}`
        }
    })
}})()