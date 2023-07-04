import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { editaUsuario } from "../services/usuarios.js"
import { OperacaoRealizada } from "../utils/OperacaoRealizada.js"
import { verificaLogin } from "../utils/verificaLogin.js"
import { redirecionaBotoesAside } from "../utils/redirecionaBotoesAside.js"
(async()=>{
    const usuario = new InformacoesUsuario(await verificaLogin())
    const botaoSair = document.getElementById('deslogar')
    const botoesRedirecionar = document.querySelectorAll('[data-lista]')
    const voltarHome = document.getElementById('voltar-home')
    
    Array.prototype.get = function (index) {
        return this[index > 0 ? this.length - index : index];
    }
    const valorExtrato = usuario.transacoes.get(1).periodo.valores.get(1);
    const tipoExtrato = usuario.transacoes.get(1).periodo.tipos.get(1);

    OperacaoRealizada.criaTexto(tipoExtrato, valorExtrato, usuario)
    
    voltarHome.addEventListener('click', async evento =>{
        await editaUsuario(usuario.id, usuario.devolveInformacoes())
        window.location.href = `./main.html?id=${usuario.id}`
    })
    
    redirecionaBotoesAside(botaoSair, usuario, botoesRedirecionar)
})()