import { editaUsuario } from "../services/usuarios.js"

export function redirecionaBotoesAside(botaoSair, usuario, botoesRedirecionar){
    botaoSair.addEventListener("click", async ()=>{
        usuario.logado = false
        await editaUsuario(usuario.id, usuario.devolveInformacoes())
        window.location.href="./login.html"
    })
    for(let i = 0; i < botoesRedirecionar.length; i++){
        botoesRedirecionar[i].addEventListener('click' , evento =>{
            if (window.location.pathname != `/app/public/routes/${botoesRedirecionar[i].attributes[1].value}.html`) {
                window.location.href = `./${botoesRedirecionar[i].attributes[1].value}.html?id=${usuario.id}`
            }
        })
    }
}