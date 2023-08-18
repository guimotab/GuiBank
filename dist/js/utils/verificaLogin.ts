import { InformacoesApi } from "../class/InformacoesApi.js"

export  function verificaLogin(){
    try {
    const [contasApi, usuario] =  InformacoesApi.pegaInformacoes()
    if(usuario.logado){
        return usuario
    } else {
        window.location.href = './login.html'
    }
    } catch {
        window.location.href = './login.html'
    }
    
}
