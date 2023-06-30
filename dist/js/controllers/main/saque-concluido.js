import { InformacoesUsuario } from "../../models/InformacoesUsuario.js"
import { editaUsuario } from "../../services/usuarios.js"
import { Horario } from "../../utils/criaHorario.js"
import { verificaLogin } from "../../utils/verificaLogin.js"
(async()=>{
    const usuario = new InformacoesUsuario(await verificaLogin())

    const botaoSair = document.getElementById('deslogar')
    const botoesRedirecionar = document.querySelectorAll('[data-lista]')
    const botoesRedirecionarIguais = document.querySelectorAll('[data-lista-iguais]')

    const frase = document.getElementById('frase-saque')
    const voltarHome = document.getElementById('voltar-home')

    const valorSaque = usuario.transacoes.find( (elemento) => elemento.periodo.dia == Horario.criaMesDia()
        ? elemento.periodo: 0
    )

    const posicaoUltimoSaque = valorSaque.periodo.valores.length - 1

    let valor1 = (parseFloat(valorSaque.periodo.valores[posicaoUltimoSaque])-3.30).toFixed(2)
    let valor2 = usuario.saldo.toFixed(2)

    frase.innerHTML = `<p>Você sacou <strong>R$${valor1.replace('.', ',')}</strong>. Seu saldo agora é de <strong>R$${valor2.replace('.', ',')}</strong></p>`

    voltarHome.addEventListener('click', evento =>{
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