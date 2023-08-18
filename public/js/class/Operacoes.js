export class Operacoes {
    static criaTextos(destinatario) {
        const tituloOperacao = document.getElementById('titulo-operacao');
        const textoTaxa = document.getElementById('texto-taxa');
        const botaoOperacao = document.getElementById('botao-operacao');
        if (window.location.pathname == `/public/routes/sacar.html`) {
            const taxa = 3.30;
            this.sacarTexto(tituloOperacao, textoTaxa, botaoOperacao);
            return taxa;
        }
        else if (window.location.pathname == `/public/routes/transferir.html`) {
            const taxa = 9.30;
            if (destinatario) {
                this.transferirTexto(tituloOperacao, textoTaxa, botaoOperacao, destinatario.devolveInformacoes());
            }
            return taxa;
        }
        else if (window.location.pathname == `/public/routes/depositar.html`) {
            const taxa = 0;
            this.depositarTexto(tituloOperacao, textoTaxa, botaoOperacao);
            return taxa;
        }
    }
    static sacarTexto(tituloOperacao, textoTaxa, botaoOperacao) {
        tituloOperacao.innerText = 'Qual valor deseja sacar?';
        textoTaxa.innerText = '*Taxa de R$3,30 por saque';
        botaoOperacao.innerText = 'Sacar';
    }
    static transferirTexto(tituloOperacao, textoTaxa, botaoOperacao, destinatario) {
        tituloOperacao.innerText =
            `Qual valor deseja transferir para ${destinatario.primeiroNome} ${destinatario.segundoNome}?`;
        textoTaxa.innerText = '*Taxa de R$9,30 por transferência';
        botaoOperacao.innerText = 'Transferir';
    }
    static depositarTexto(tituloOperacao, textoTaxa, botaoOperacao) {
        tituloOperacao.innerText = 'Qual valor deseja depositar?';
        textoTaxa.innerText = '';
        botaoOperacao.innerText = 'Depositar';
    }
    static devolveOperacao() {
        if (window.location.pathname == `/public/routes/sacar.html`) {
            const operacao = 'Saque';
            return operacao;
        }
        else if (window.location.pathname == `/public/routes/transferir.html`) {
            const operacao = 'Transferência';
            return operacao;
        }
        else {
            const operacao = 'Depósito';
            return operacao;
        }
    }
    static devolveTaxas() {
        if (window.location.pathname == `/public/routes/sacar.html`) {
            const taxa = 3.30;
            return taxa;
        }
        else if (window.location.pathname == `/public/routes/transferir.html`) {
            const taxa = 9.30;
            return taxa;
        }
        else if (window.location.pathname == `/public/routes/depositar.html`) {
            const taxa = 0;
            return taxa;
        }
    }
}
