export class VerificacoesUsuario{
    static existeUsuario(contasApi, campo, usuario){
        const valorDoCampo = campo.value
        const existe = contasApi.find(conta => conta.usuario == valorDoCampo && usuario.usuario != valorDoCampo)
        
        if (existe) {
            return true
        } else {
            return false
        }
    }
    static corrigeUsuario(campo){
        let valorDoCampo = campo.value[0]
        if(valorDoCampo == "@"){
            return true
        } else {
            return campo.value = "@" + campo.value
        }

    }
}