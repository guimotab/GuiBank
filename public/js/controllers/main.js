import mostraSenha from "../utils/mostraSenha.js"
import { criaPerfisAmigos } from "../utils/criaPerfisAmigos.js"
import { criaExtratoMain } from "../utils/criaExtratoMain.js"
import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { verificaLogin } from "../utils/verificaLogin.js"
import { editaUsuario, getUsuariosApi } from "../services/usuarios.js"
//guardo o usário para poder alterar
(async ()=> {
    const contasApi = await getUsuariosApi()

    const usuario = new InformacoesUsuario(await verificaLogin())
    
    const botoesRedirecionar = document.querySelectorAll('[data-lista]')
    const botoesRedirecionarIguais = document.querySelectorAll('[data-lista-iguais]')
    
    const fotoPerfil = document.getElementById('foto-perfil')
    const primeiroNomeInnerHTML = document.getElementById('nome')
    const segundoNomeInnerHTML = document.getElementById('nome')
    const usuarioInnerHTML = document.getElementById('usuario')
    const saldoInnerHTML = document.getElementById('saldo')
    const botaoSair = document.getElementById('deslogar')
    
    const verSaldo = document.getElementById('olhoSaldo')
    let cliqueSaldo = 1
    
    const contasAmigos = document.getElementById('contas-ul')
    //let contasAmigosLi = false;
    try {
        if(!contasApi[1]){
            throw new Error()
        }
        contasApi.forEach( (elemento) => {
            if (elemento._id != usuario.id){
                criaPerfisAmigos(contasAmigos, elemento._id, elemento)
            }
        })
        const contasAmigosLi = document.querySelectorAll('#contas-li')
        if(contasAmigosLi){
            for(let i = 0; i < contasAmigosLi.length; i++){
                contasAmigosLi[i].addEventListener('click' , evento =>{
                    const target = evento.target
                    window.location.href = `./main/transferir.html?id=${usuario.id}&remetente=${target.id}`
                })
            }
        }
    } catch {
        contasAmigos.innerHTML = `<li class="tela-contas_informacoes" id="contas-li">
        <div class="tela_informacoes-contas">
        <h4>Não há perfis no momento...</h4>
        </div>
        </li>`
    }
    
    fotoPerfil.setAttribute("src", usuario.foto)
    primeiroNomeInnerHTML.innerHTML = usuario.primeiroNome
    segundoNomeInnerHTML.innerHTML += " " + usuario.segundoNome
    usuarioInnerHTML.innerHTML = usuario.usuario
    saldoInnerHTML.innerHTML = `R$${usuario.saldo.toFixed(2)}`.replace(".",",")
    
    
    const extratoUl = document.getElementById("depositos-ul")
    try {
        let posicaoArray = 0
        if(usuario.transacoes.length -1){
            throw Error
        } else {
            usuario.transacoes.slice().reverse().forEach((elemento) => { 
                extratoUl.innerHTML += criaExtratoMain.criaExtrato(elemento.periodo.dia, posicaoArray)
                const extratoLi = document.getElementById(`li-extratos-${posicaoArray}`)
                for(let i = elemento.periodo.tipos.length-1 ; i >= 0 ; i--){
                    extratoLi.innerHTML += criaExtratoMain.adicionaLiExtrato(elemento.periodo.tipos[i], elemento.periodo.valores[i], elemento.periodo.horarios[i])
                }
                posicaoArray++
            })
        }
    } catch {
        extratoUl.innerHTML = `<li class="extrato-depositos_li">
        <div class="extrato-depositos_informacoes">
            <div class="extrato-depositos_tipo">
            <h3 id="nome">Não há extratos no momento...</h3>
            </div>
            <div class="extrato-depositos_informacoes_contas">
            </div>
        </div>
        <div class="barra-separacao"></div>
    </li>`
    }
    
    verSaldo.addEventListener("click", ()=>{
        if(cliqueSaldo == 1){
            mostraSenha.mostraSaldo(verSaldo, saldoInnerHTML)
            cliqueSaldo = 0
        } else {
            mostraSenha.escondeSaldo(verSaldo)
            cliqueSaldo = 1
        }
    })
    
    botaoSair.addEventListener("click", async ()=>{
        usuario.logado = false
        await editaUsuario(usuario.id, usuario.devolveInformacoes())
    
        window.location.href="./login.html"
    })
    for(let i = 0; i < botoesRedirecionarIguais.length; i++){
        botoesRedirecionarIguais[i].addEventListener('click' , evento =>{
            window.location.href = `./${botoesRedirecionarIguais[i].attributes[1].value}.html?id=${usuario.id}`
        })
    }
    for(let i = 0; i < botoesRedirecionar.length; i++){
        botoesRedirecionar[i].addEventListener('click' , evento =>{
            window.location.href = `./main/${botoesRedirecionar[i].attributes[1].value}.html?id=${usuario.id}`
        })
    }
})()
