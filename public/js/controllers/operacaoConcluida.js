import { OperacaoRealizada } from "../class/OperacaoRealizada.js"
import { RedirecionaBotoes } from "../utils/redirecionaBotoesAside.js"
import { verificaLogin } from "../utils/verificaLogin.js";
import { UsuariosApi } from "../services/UsuariosApi.js"
import { InformacoesApi } from "../class/InformacoesApi.js";
(async()=>{
    await verificaLogin()
    const [contasApi, usuario] = await InformacoesApi.pegaInformacoes()

    const voltarHome = document.getElementById('voltar-home')
    
    Array.prototype.get = function (index) {
        return this[index > 0 ? this.length - index : index];
    }
    const valorExtrato = usuario.transacoes.get(1).periodo.valores.get(1);
    const tipoExtrato = usuario.transacoes.get(1).periodo.tipos.get(1);

    OperacaoRealizada.criaTexto(tipoExtrato, valorExtrato, usuario)
    
    voltarHome.addEventListener('click', async evento =>{
        await UsuariosApi.put(usuario.id, usuario.devolveInformacoes())
        window.location.href = `./home.html?id=${usuario.id}`
    })
    
    RedirecionaBotoes.redireciona(usuario)
})()