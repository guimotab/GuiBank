import IUserBase from "../interfaces/IUserBase"
import { InformacoesUsuario } from "../models/InformacoesUsuario"

export class ListaAmigos {
    static criaPerfisAmigos(contasApi: IUserBase[], contaUsuario: InformacoesUsuario, listaAmigosUl: HTMLElement, contasAmigosLi: NodeListOf<Element>){
        const sectionAmigos = document.getElementById('section-amigos')!
        if(contasApi.length > 3){
            sectionAmigos.className += " overflow-y-scroll"
        }

        if(!contasApi[1]){
            throw new Error()
        }
        contasApi.forEach( (elemento) => {
            if (elemento.id != contaUsuario.id){
                this.criaLiExistePerfis(listaAmigosUl, elemento.id, elemento )
                contasAmigosLi = document.querySelectorAll('#contas-li')!
            }
        })

        for(let i = 0; i < contasAmigosLi.length; i++){
            contasAmigosLi[i].addEventListener('click' , evento =>{
                const target = evento.target as any
                window.location.href = `./transferir.html?id=${contaUsuario.id}&remetente=${target.id}`
            })
        }
    }

    static criaLiSemPerfis(listaAmigosUl: HTMLElement){
        listaAmigosUl.innerHTML = `
        <h3 class="text-lg font-medium">Não há amigos no momento...</h3>`
    }

    static criaLiExistePerfis(listaAmigosUl: HTMLElement, idAmigos: string, indexAmigos: IUserBase){
        const AdicionaPerfilAmigos = 
        `<li class="border-cor-terciaria border-solid border-2 rounded-xl px-7 py-2">
        <div class="flex flex-col gap-3 justify-between w-full items-center min-[440px]:flex-row min-[440px]:gap-2">
            <div class="flex flex-col justify-center">
                <h4 class="text-lg font-medium " id="nome">${indexAmigos.primeiroNome + " " + indexAmigos.segundoNome}</h4>
                <p id="nome-pessoal">${indexAmigos.usuario}</p>
            </div>
            <div id="contas-li" class="flex items-end" >
                <button id="${idAmigos}"class="px-3.5 py-1.5 bg-cor-terciaria rounded-xl text-cor-branco hover:bg-cor-hover">Transferir</button>
            </div>
        </div>
    </li>`
        listaAmigosUl.innerHTML += AdicionaPerfilAmigos 
    }
}