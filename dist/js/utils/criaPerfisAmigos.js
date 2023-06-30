export function criaPerfisAmigos(contasAmigos, idAmigos, indexAmigos){
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

    contasAmigos.innerHTML += AdicionaPerfilAmigos 
}