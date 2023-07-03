export class ExtratoMain {
    static posicaoArray = 0
    static constroiExtrato(usuario, extratoUl) {
        try{
            if (usuario.transacoes == []) {
                throw Error
            } else {
                usuario.transacoes.slice().reverse().forEach((elemento) => {
                    extratoUl.innerHTML += this.criaExtrato(elemento.periodo.dia, this.posicaoArray)
                    const extratoLi = document.getElementById(`li-extratos-${this.posicaoArray}`)
                    
                    for (let i = elemento.periodo.tipos.length - 1; i >= 0; i--) {
                        extratoLi.innerHTML += this.adicionaLiExtrato(elemento.periodo.tipos[i], elemento.periodo.valores[i], elemento.periodo.horarios[i])
                    }
                    this.posicaoArray++
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
    }

    static criaExtrato(mesDia, posicaoArray){
        
        // <img src=${srcImagem} alt=${altImagem} width="30" heigth="10">
        const adicionaExtrato = 
        `<div class="extrato-depositos_dias id="dias-extratos">
        <div class="extrato-depositos_dias-numeros">
            <h4>${mesDia}</h4>
        </div>
        <div class="extrato-depositos_dias-li">
            <li class="extrato-depositos_li" id="li-extratos-${posicaoArray}">
                
            </li>
        </div>
        <div class="barra-separacao"></div>
        </div>`
        return adicionaExtrato   
    }
    
    static adicionaLiExtrato(tipoExtrato, valor, horario){
        let classTipo
        let id
        if(tipoExtrato == "Transferência Enviada"){
            classTipo = "extrato-depositos_tipo-enviado"
            id="enviado"
        } else if (tipoExtrato == "Transferência Recebida"){
            classTipo = "extrato-depositos_tipo-recebido"
            id="recebido"
        } else if (tipoExtrato == "Depósito"){
            classTipo = "extrato-depositos_tipo-deposito"
            id="dep"
        } else if (tipoExtrato == "Saque"){
            classTipo = "extrato-depositos_tipo-saque"
            id="saq"
        }
        const liExtrato = 
        `<div class="extrato-depositos_informacoes">
        <div class=${classTipo}>
            <h3 id="nome">${tipoExtrato}</h3>
        </div>
        <div class="extrato-depositos_informacoes_contas ${classTipo}">
            <h4 id=${id}>R$${valor.replace('.', ',')}</h4>
            <div class="barra-serapacao_valor"></div>
            <p id="nome-pessoal">${horario}</p>
        </div>
        </div>`
        return liExtrato  
    }

}
