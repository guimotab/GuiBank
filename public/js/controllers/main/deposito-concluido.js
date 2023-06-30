import { InformacoesUsuario } from "../../models/InformacoesUsuario.js"
import { editaUsuario } from "../../services/usuarios.js"
import { Horario } from "../../utils/criaHorario.js"
import { insereExtratoEspecialDep } from "../../utils/insereExtratoDepositar.js"
import { verificaLogin } from "../../utils/verificaLogin.js"
(async()=>{
    
    const usuario = new InformacoesUsuario(await verificaLogin())
    
    const botaoSair = document.getElementById('deslogar')
    const botoesRedirecionar = document.querySelectorAll('[data-lista]')
    const botoesRedirecionarIguais = document.querySelectorAll('[data-lista-iguais]')
    
    const frase = document.getElementById('frase-deposito')
    const voltarHome = document.getElementById('voltar-home')
    
    const valorDeposito = usuario.transacoes.find( (elemento) => elemento.periodo.dia == Horario.criaMesDia() 
    ? elemento.periodo : 0 )
    
    const posicaoUltimoDeposito = valorDeposito.periodo.valores.length - 1
    
    let valor1 = valorDeposito.periodo.valores[posicaoUltimoDeposito]
    let valor2 = usuario.saldo
    if(parseFloat(valor1) > 8000) {
        frase.innerHTML = `<p>Você depositou <strong>R$${valor1.replace('.', ',')}</strong> e isso é um valor muito alto!</p> <p>99,99% desse valor foi doado para uma caridade.</p> <p>Você recebeu <strong>R$${(valor1*0.001).toFixed(2).replace('.' , ',')}</strong>. Seu saldo agora é de <strong>R$${valor2.toFixed(2).replace('.', ',')}</strong></p>`
        valor1 = (valor1*0.001).toFixed(2) 
        insereExtratoEspecialDep(usuario, valor1)
    } else {    
        frase.innerHTML = `<p2>Você depositou <strong>R$${valor1.replace('.', ',')}</strong>. Seu saldo agora é de <strong>R$${valor2.toFixed(2).replace('.', ',')}</strong></p2>`
    }
    
    
    voltarHome.addEventListener('click', async evento =>{
        await editaUsuario(usuario.id, usuario.devolveInformacoes())
        window.location.href = `../main.html?id=${usuario.id}`
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
            window.location.href = `./${botoesRedirecionar[i].attributes[1].value}.html?id=${usuario.id}`
        })
    }
})()