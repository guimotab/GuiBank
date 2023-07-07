import { VerificacoesUsuario } from "./VerificacoesUsuario.js"
import { verificacoesCPF } from "./verificacoesCPF.js"
const classCorreto = " border-2 border-cor-outline rounded-lg px-2 py-1 focus:outline-none focus:border-cor-hover border-cor-outline"
const classErro = " border-2 border-cor-erro rounded-lg px-2 py-1 focus:outline-none focus:border-cor-erro border-cor-erro"
function verificaCampoNome(campo, erroClassObrigatorio, erroClassLength, erroClassEscrita){
    if(campo.value == ""){
        campo.className = classErro
        erroClassObrigatorio.style.display = "block"
        erroClassEscrita.style.display = "none"
        erroClassLength.style.display = "none"
        return false
    } else {
        campo.className = classCorreto
        erroClassObrigatorio.style.display = "none"
        if(campo.value.length >= 3){
            campo.className = classCorreto
            erroClassLength.style.display = "none"
            if(!campo.validity.valid){
                campo.className = classErro
                erroClassEscrita.style.display = "block"
                return false
            } else {
                campo.className = classCorreto
                erroClassEscrita.style.display = "none"
                return true
            }
        } else {
            campo.className = classErro
            erroClassLength.style.display = "block"
            return false
        }
    }
}
function verificaCampoUsuario(campo, erroClassObrigatorio, erroClassEscrita, erroClassUsado, contasAPI, contaUsuario){
    if(campo.value == ""){
        //Obrigatório
        campo.className = '2px solid #e45e5e'
        erroClassObrigatorio.style.display = "block"
        erroClassEscrita.style.display = "none"
        erroClassUsado.style.display = "none"
        return false
    } else {
        campo.style.border = '2px solid #011e42'
        erroClassObrigatorio.style.display = "none"
        VerificacoesUsuario.corrigeUsuario(campo)
        if(campo.validity.patternMismatch){
            //escrita
            campo.style.border = '2px solid #e45e5e'
            erroClassEscrita.style.display = "block"
            return false
        } else {
            campo.style.border = '2px solid #011e42'
            erroClassEscrita.style.display = "none"
            if(VerificacoesUsuario.existeUsuario(contasAPI, campo, contaUsuario)){
                //existe
                campo.style.border = '2px solid #e45e5e'
                erroClassEscrita.style.display = "none"
                erroClassUsado.style.display = "block"
                return false
            } else {

                campo.style.border = '2px solid #011e42'
                erroClassUsado.style.display = "none"
                return true
            }
        }
    }
}
function verificaCampoCPF(campo, erroClassObrigatorio, erroClassInvalido, erroClassExiste, erroClassEscrita, array){
    if(campo.value == ""){
        //Obrigatório
        campo.style.border = '2px solid #e45e5e'
        erroClassObrigatorio.style.display = "block"
        erroClassEscrita.style.display = "none"
        erroClassInvalido.style.display = "none"
        erroClassExiste.style.display = "none"
        return false
    } else {
        campo.style.border = '2px solid #011e42'
        erroClassObrigatorio.style.display = "none"
        verificacoesCPF.formataCPF(campo)
        if(!campo.validity.patternMismatch && campo.value.length == 11){
            //escrita
            campo.style.border = '2px solid #e45e5e'
            erroClassEscrita.style.display = "block"
            return false
        } else {
            campo.style.border = '2px solid #011e42'
            erroClassEscrita.style.display = "none"
            if(!verificacoesCPF.validaCPF(campo.value)){
                //invalido
                campo.style.border = '2px solid #e45e5e'
                erroClassInvalido.style.display = "block"
                return false
            } else {
                campo.style.border = '2px solid #011e42'
                erroClassInvalido.style.display = "none"
                if(!verificacoesCPF.verificaCPF(array, campo.value)){
                    console.log();
                    //existe
                    campo.style.border = '2px solid #e45e5e'
                    erroClassExiste.style.display = "block"
                    return false
                } else {
                    campo.style.border = '2px solid #011e42'
                    erroClassExiste.style.display = "none"
                    return true
                }
            }
        }
    }
}
function verificaCampoEmail(campo, erroClassObrigatorio, erroClassEscrita){
    if(campo.value == ""){
        campo.style.border = '2px solid #e45e5e'
        erroClassObrigatorio.style.display = "block"
        erroClassEscrita.style.display = "none"
        return false
    } else {
        campo.style.border = '2px solid #011e42'
        erroClassObrigatorio.style.display = "none"
        if(!campo.validity.valid){
            campo.style.border = '2px solid #e45e5e'
            erroClassEscrita.style.display = "block"
            return false
        } else {
            campo.style.border = '2px solid #011e42'
            erroClassEscrita.style.display = "none"
            return true
        }
    }
}
function verificaCampoTelefone(campo, erroClassObrigatorio, erroClassEscrita, erroClassInvalido){
    if(campo.value == ""){
        campo.style.border = '2px solid #e45e5e'
        erroClassObrigatorio.style.display = "block"
        erroClassInvalido.style.display = "none"
        erroClassEscrita.style.display = "none"
        return false
    } else {
        campo.style.border = '2px solid #011e42'
        erroClassObrigatorio.style.display = "none"
        if(campo.value.length < 11){
            campo.style.border = '2px solid #e45e5e'
            erroClassInvalido.style.display = "block"
            return false

        } else {
            campo.style.border = '2px solid #011e42'
            erroClassInvalido.style.display = "none"
            if(!campo.validity.valid){
                campo.style.border = '2px solid #e45e5e'
                erroClassEscrita.style.display = "block"
                return false

            } else {
                campo.style.border = '2px solid #011e42'
                erroClassEscrita.style.display = "none"
                return true
            }
        }
    }
}
function verificaCampoSenha(campo, erroClassObrigatorio, erroClassEscrita, erroClassInvalido){
    if(campo.value == ""){
        campo.style.border = '2px solid #e45e5e'
        erroClassEscrita.style.display = "none"
        erroClassInvalido.style.display = "none"
        erroClassObrigatorio.style.display = "block"
        return false
    } else {
        if(campo.validity.patternMismatch){
            campo.style.border = '2px solid #e45e5e'
            erroClassInvalido.style.display = "block"
            return false
        } else {
            campo.style.border = '2px solid #011e42'
            erroClassObrigatorio.style.display = "none"
            erroClassInvalido.style.display = "none"
            if(campo.value.length < 4){
                campo.style.border = '2px solid #e45e5e'
                erroClassEscrita.style.display = "block"
                return false
    
            } else {
                campo.style.border = '2px solid #011e42'
                erroClassEscrita.style.display = "none"
                return true
            }
        }
    } 
}
function verificaCampoSenhaConta(campo, erroClassEscrita, erroClassInvalido){
    if(campo.value == ""){
        campo.style.border = '2px solid #011e42'
        erroClassEscrita.style.display = "none"
        erroClassInvalido.style.display = "none"
        return true
        
    } else {
        if(campo.validity.patternMismatch){
            campo.style.border = '2px solid #e45e5e'
            erroClassInvalido.style.display = "block"
            return false
        } else {
            campo.style.border = '2px solid #011e42'
            erroClassInvalido.style.display = "none"
            if(campo.value.length < 4){
            campo.style.border = '2px solid #e45e5e'
            erroClassEscrita.style.display = "block"
            return false
    
            } else {
                campo.style.border = '2px solid #011e42'
                erroClassEscrita.style.display = "none"
                return true
            }
        }
    }
}
function comparaSenha(campoSenha1, campoSenha2, erroSenhaDif){
    if(!campoSenha1.validity.patternMismatch){
        if(!(campoSenha1.value.length < 4)){
            if(campoSenha1.value == campoSenha2.value){
                campoSenha2.style.border = '2px solid #011e42'
                erroSenhaDif.style.display = "none"
                return true
            } else {
                campoSenha2.style.border = '2px solid #e45e5e'
                erroSenhaDif.style.display = "block"
                return false
            }
        } else {
            campoSenha2.style.border = '2px solid #011e42'
            erroSenhaDif.style.display = "none"
            return true
        }
    }
}
function inputsOperacoes(campo, usuario, taxa = 0){
    const valor = parseFloat(campo.value)
    const saldo = usuario.saldo
    const classErroInsuficiente = document.querySelector('.erro-insuficiente')
    const classErroValor = document.querySelector('.erro-valor')
    if(taxa == 0){
        if(campo.value == ""){
            campo.style.border = '2px solid #011e42'
            classErroValor.style.display = "none"
            return false
        } else {
            if(!campo.validity.valid){
                campo.style.border = '2px solid #e45e5e'
                classErroValor.style.display = "block"
                return false
            } else {
                campo.style.border = '2px solid #011e42'
                classErroValor.style.display = "none"
                return true
            }
        }
    }
    if(campo.value == ""){
        campo.style.border = '2px solid #011e42'
        classErroInsuficiente.style.display = "none"
        classErroValor.style.display = "none"
        return false
    } else {
        if(!campo.validity.valid){
            campo.style.border = '2px solid #e45e5e'
            classErroInsuficiente.style.display = "none"
            classErroValor.style.display = "block"
            return false
        } else if(valor + taxa > saldo) {
            campo.style.border = '2px solid #e45e5e'
            classErroInsuficiente.style.display = "block"
            classErroValor.style.display = "none"
            return false
        } else {
            campo.style.border = '2px solid #011e42'
            classErroInsuficiente.style.display = "none"
            classErroValor.style.display = "none"
            return true
        }
    }
}
function verificaCamposLogin(campo, erroClassObrigatorio, erroClassInvalido, erroClassExiste, erroClassEscrita, contasApi){
    if(campo.value == ""){
        //Obrigatório
        campo.style.border = '2px solid #e45e5e'
        erroClassObrigatorio.style.display = "block"
        erroClassEscrita.style.display = "none"
        erroClassInvalido.style.display = "none"
        erroClassExiste.style.display = "none"
        return false
    } else {
        campo.style.border = '2px solid #011e42'
        erroClassObrigatorio.style.display = "none"
        verificacoesCPF.formataCPF(campo)
        if(!campo.validity.patternMismatch && campo.value.length == 11){
            //escrita
            campo.style.border = '2px solid #e45e5e'
            erroClassEscrita.style.display = "block"
            return false
        } else {
            campo.style.border = '2px solid #011e42'
            erroClassEscrita.style.display = "none"
            if(!verificacoesCPF.verificaCPF(contasApi, campo.value)){
                //existe
                campo.style.border = '2px solid #e45e5e'
                erroClassExiste.style.display = "block"
                return false
            } else {
                campo.style.border = '2px solid #011e42'
                erroClassExiste.style.display = "none"
                return true
            }
        }
    }
}
function verificaCamposErros(arrayDosCampos){
    return arrayDosCampos.find(elemento => elemento.style.border == '2px solid rgb(228, 94, 94)' )
}
export const verificaCampos = {
    verificaCampoNome,
    verificaCampoUsuario,
    verificaCampoCPF,
    verificaCampoEmail,
    verificaCampoTelefone,
    verificaCampoSenha,
    verificaCampoSenhaConta,
    comparaSenha,
    inputsOperacoes,
    verificaCamposErros,
    verificaCamposLogin
}