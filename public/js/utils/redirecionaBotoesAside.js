import { editaUsuario } from "../services/usuarios.js"
export class RedirecionaBotoes{
    static redireciona(usuario){
        const botaoSair = document.getElementById('deslogar')
        const botoesAside = document.querySelectorAll('[data-aside]')
        const botoesCard = document.querySelectorAll('[data-card]')

        this.botaoDeslogar(botaoSair, usuario)
        this.redirecionaAside(usuario, botoesAside)
        this.redirecionaCard(usuario, botoesCard)
    }

    static redirecionaCard(usuario, botoesCard){
        for(let i = 0; i < botoesCard.length; i++){
            botoesCard[i].addEventListener('click' , evento =>{
                if (window.location.pathname != `/app/public/routes/${botoesCard[i].attributes[0].value}.html`) {
                    window.location.href = `./${botoesCard[i].attributes[0].value}.html?id=${usuario.id}`
                }
            })
        }
    }

    static redirecionaAside(usuario, botoesAside){
        for(let i = 0; i < botoesAside.length; i++){
            botoesAside[i].addEventListener('click' , evento =>{
                if (window.location.pathname != `/app/public/routes/${botoesAside[i].attributes[1].value}.html`) {
                    window.location.href = `./${botoesAside[i].attributes[1].value}.html?id=${usuario.id}`
                }
            })
        }
    }
    
    static botaoDeslogar(botaoSair, usuario){
        botaoSair.addEventListener("click", async ()=>{
            usuario.logado = false
            await editaUsuario(usuario.id, usuario.devolveInformacoes())
            window.location.href="./login.html"
        })
    }

}