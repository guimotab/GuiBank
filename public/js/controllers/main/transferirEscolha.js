import { InformacoesUsuario } from "../../models/InformacoesUsuario.js"
import { editaUsuario, getUsuariosApi } from "../../services/usuarios.js"
import { criaPerfisAmigos } from "../../utils/criaPerfisAmigos.js"
import { verificaLogin } from "../../utils/verificaLogin.js"
(async()=>{
    const contasApi = await getUsuariosApi()
    const usuario = new InformacoesUsuario(await verificaLogin())

    const botaoSair = document.getElementById('deslogar')
    const botoesRedirecionar = document.querySelectorAll('[data-lista]')
    const botoesRedirecionarIguais = document.querySelectorAll('[data-lista-iguais]')

    const contasAmigos = document.getElementById('contas-ul')
    // let contasAmigosLi = false;
    let contasAmigosLi;
    try {
        if(!contasApi[1]){
            throw new Error()
        }
        contasApi.forEach( (elemento) => {
            if (elemento._id != usuario.id){
                criaPerfisAmigos(contasAmigos, elemento._id, elemento)
            }
        })
        contasAmigosLi = document.querySelectorAll('#contas-li')
        if(contasAmigosLi){
            for(let i = 0; i < contasAmigosLi.length; i++){
                contasAmigosLi[i].addEventListener('click' , (evento) =>{
                    window.location.href = `./transferir.html?id=${usuario.id}&remetente=${evento.target.id}`
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