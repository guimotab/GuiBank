export class ListaAmigos {
    static criaPerfisAmigos(contasApi, contaUsuario, listaAmigosUl, contasAmigosLi){
        if(!contasApi[1]){
            throw new Error()
        }
        contasApi.forEach( (elemento) => {
            if (elemento._id != contasAmigosLi.id){
                ListaAmigos.criaLiExistePerfis(listaAmigosUl, elemento._id, elemento )
            }
        })
        for(let i = 0; i < contasAmigosLi.length; i++){
            contasAmigosLi[i].addEventListener('click' , evento =>{
                const target = evento.target
                window.location.href = `./main/transferir.html?id=${contaUsuario.id}&remetente=${target.id}`
            })
        }
    }

    static criaLiSemPerfis(listaAmigosUl){
        return listaAmigosUl.innerHTML = `<li class="tela-contas_informacoes" id="contas-li">
        <div class="tela_informacoes-contas">
        <h4>Não há perfis no momento...</h4>
        </div>
        </li>`
    }

    static criaLiExistePerfis(listaAmigosUl, idAmigos, indexAmigos){
        const AdicionaPerfilAmigos = `<li class="tela-contas_informacoes">
            <div class="tela_informacoes-contas">
                <div>
                    <h4 id="nome">${indexAmigos.primeiroNome + " " + indexAmigos.segundoNome}</h4>
                    <p id="nome-pessoal">${indexAmigos.usuario}</p>
                </div>
                <div class="botao-transferir-contas" id="contas-li">
                    <button id="${idAmigos}">Transferir</button>
                </div>
            </div>
            <div class="barra-separacao"></div>
        </li>`
    
        return listaAmigosUl.innerHTML += AdicionaPerfilAmigos 
    }
}