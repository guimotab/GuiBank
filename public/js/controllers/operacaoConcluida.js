import { OperacaoRealizada } from "../class/OperacaoRealizada.js";
import { RedirecionaBotoes } from "../utils/redirecionaBotoesAside.js";
import { verificaLogin } from "../utils/verificaLogin.js";
import { UsuariosApi } from "../services/UsuariosApi.js";
import { InformacoesApi } from "../class/InformacoesApi.js";
import abreAside from "../utils/abreAside.js";
verificaLogin();
const [contasApi, usuario] = InformacoesApi.pegaInformacoes();
const voltarHome = document.getElementById('voltar-home');
// Array.prototype.get = function (index) {
//     return this[index > 0 ? this.length - index : index];
// }
function getIndexArray(array, index) {
    return array[index > 0 ? array.length - index : index];
}
const posicaoUsuarioTransacoes = getIndexArray(usuario.transacoes, 1);
const valorExtrato = getIndexArray(posicaoUsuarioTransacoes.periodo.valores, 1);
const tipoExtrato = getIndexArray(posicaoUsuarioTransacoes.periodo.tipos, 1);
OperacaoRealizada.criaTexto(tipoExtrato, valorExtrato, usuario);
voltarHome.addEventListener('click', evento => {
    UsuariosApi.put(contasApi, usuario.id, usuario.devolveInformacoes());
    window.location.href = `./home.html?id=${usuario.id}`;
});
abreAside();
RedirecionaBotoes.redireciona(contasApi, usuario);
