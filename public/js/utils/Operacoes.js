export class Operacoes {
    static criaTextos(destinatario) {
        const tituloOperacao = document.getElementById('titulo-operacao')
        const textoTaxa = document.getElementById('texto-taxa')
        const botaoOperacao = document.getElementById('botao-operacao')
        
        if (window.location.pathname == `/app/public/routes/sacar.html`) {
            const taxa = 3.30
            this.sacarTexto(tituloOperacao, textoTaxa, botaoOperacao)
            return taxa

        } else if (window.location.pathname == `/app/public/routes/transferir.html`) {
            const taxa = 9.30
            this.transferirTexto(tituloOperacao, textoTaxa, botaoOperacao, destinatario)
            return taxa

        } else if (window.location.pathname == `/app/public/routes/depositar.html`) {
            const taxa = 0
            this.depositarTexto(tituloOperacao, textoTaxa, botaoOperacao)
            return taxa
        }
    }
    static sacarTexto(tituloOperacao, textoTaxa, botaoOperacao) {
        tituloOperacao.innerText = 'Quanto você deseja sacar?'
        textoTaxa.innerText = '*taxa de R$3,30 por saque'
        botaoOperacao.innerText = 'Sacar'
    }
    static transferirTexto(tituloOperacao, textoTaxa, botaoOperacao, destinatario) {
        tituloOperacao.innerText = 
            `Quanto você deseja transferir para ${destinatario.primeiroNome} ${destinatario.segundoNome}?`
        textoTaxa.innerText = '*taxa de R$9,30 por transferir'
        botaoOperacao.innerText = 'Transferir'
    }
    static depositarTexto(tituloOperacao, textoTaxa, botaoOperacao) {
        tituloOperacao.innerText = 'Quanto você deseja depositar?'
        textoTaxa.innerText = ''
        botaoOperacao.innerText = 'Depositar'
    }

    static devolveOperacao(){
        if (window.location.pathname == `/app/public/routes/sacar.html`) {
            const operacao = 'Saque'
            return operacao

        } else if (window.location.pathname == `/app/public/routes/transferir.html`) {
            const operacao = 'Transferência'
            return operacao

        } else if (window.location.pathname == `/app/public/routes/depositar.html`) {
            const operacao = 'Depósito'
            return operacao
        }
    }

    static devolveTaxas(){
        if (window.location.pathname == `/app/public/routes/sacar.html`) {
            const taxa = 3.30
            return taxa

        } else if (window.location.pathname == `/app/public/routes/transferir.html`) {
            const taxa = 9.30
            return taxa

        } else if (window.location.pathname == `/app/public/routes/depositar.html`) {
            const taxa = 0
            return taxa
        }
    }
}