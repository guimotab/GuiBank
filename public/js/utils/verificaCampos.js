import { verificacoesCPF } from "./verificacoesCPF.js"

function verificaCampoNome(campo, erroClassObrigatorio, erroClassLength, erroClassEscrita){
    if(campo.value == ""){
        campo.style.border = '2px solid #e45e5e'
        erroClassObrigatorio.style.display = "block"
        erroClassEscrita.style.display = "none"
        erroClassLength.style.display = "none"
        return false
    } else {
        campo.style.border = '2px solid #526D82'
        erroClassObrigatorio.style.display = "none"
        if(campo.value.length >= 3){
            campo.style.border = '2px solid #526D82'
            erroClassLength.style.display = "none"
            if(!campo.validity.valid){
                campo.style.border = '2px solid #e45e5e'
                erroClassEscrita.style.display = "block"
                return false
            } else {
                campo.style.border = '2px solid #526D82'
                erroClassEscrita.style.display = "none"
                return true
            }
        } else {
            campo.style.border = '2px solid #e45e5e'
            erroClassLength.style.display = "block"
            return false
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
        campo.style.border = '2px solid #526D82'
        erroClassObrigatorio.style.display = "none"
        verificacoesCPF.formataCPF(campo)
        if(!campo.validity.patternMismatch && campo.value.length == 11){
            //escrita
            campo.style.border = '2px solid #e45e5e'
            erroClassEscrita.style.display = "block"
            return false
        } else {
            campo.style.border = '2px solid #526D82'
            erroClassEscrita.style.display = "none"
            if(!verificacoesCPF.validaCPF(campo.value)){
                //invalido
                campo.style.border = '2px solid #e45e5e'
                erroClassInvalido.style.display = "block"
                return false
            } else {
                campo.style.border = '2px solid #526D82'
                erroClassInvalido.style.display = "none"
                if(!verificacoesCPF.verificaCPF(array, campo.value)){
                    //existe
                    campo.style.border = '2px solid #e45e5e'
                    erroClassExiste.style.display = "block"
                    return false
                } else {
                    campo.style.border = '2px solid #526D82'
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
        campo.style.border = '2px solid #526D82'
        erroClassObrigatorio.style.display = "none"
        if(!campo.validity.valid){
            campo.style.border = '2px solid #e45e5e'
            erroClassEscrita.style.display = "block"
            return false
        } else {
            campo.style.border = '2px solid #526D82'
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
        campo.style.border = '2px solid #526D82'
        erroClassObrigatorio.style.display = "none"
        if(campo.value.length < 11){
            campo.style.border = '2px solid #e45e5e'
            erroClassInvalido.style.display = "block"
            return false

        } else {
            campo.style.border = '2px solid #526D82'
            erroClassInvalido.style.display = "none"
            if(!campo.validity.valid){
                campo.style.border = '2px solid #e45e5e'
                erroClassEscrita.style.display = "block"
                return false

            } else {
                campo.style.border = '2px solid #526D82'
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
            campo.style.border = '2px solid #526D82'
            erroClassObrigatorio.style.display = "none"
            erroClassInvalido.style.display = "none"
            if(campo.value.length < 4){
                campo.style.border = '2px solid #e45e5e'
                erroClassEscrita.style.display = "block"
                return false
    
            } else {
                campo.style.border = '2px solid #526D82'
                erroClassEscrita.style.display = "none"
                return true
            }
        }
    } 
}
function verificaCampoSenhaConta(campo, erroClassEscrita, erroClassInvalido){
    if(campo.value == ""){
        campo.style.border = '2px solid #526D82'
        erroClassEscrita.style.display = "none"
        erroClassInvalido.style.display = "none"
        return true
        
    } else {
        if(campo.validity.patternMismatch){
            campo.style.border = '2px solid #e45e5e'
            erroClassInvalido.style.display = "block"
            return false
        } else {
            campo.style.border = '2px solid #526D82'
            erroClassInvalido.style.display = "none"
            if(campo.value.length < 4){
            campo.style.border = '2px solid #e45e5e'
            erroClassEscrita.style.display = "block"
            return false
    
            } else {
                campo.style.border = '2px solid #526D82'
                erroClassEscrita.style.display = "none"
                return true
            }
        }
    }
}

function comparaSenha(campoSenha1, campoSenha2, erroSenhaDif, erroClassInvalido){
    if(campoSenha1.validity.patternMismatch){
        
    } else {
        if(!(campoSenha1.value.length < 4)){
            if(campoSenha1.value == campoSenha2.value){
                campoSenha2.style.border = '2px solid #526D82'
                erroSenhaDif.style.display = "none"
                return true
            } else {
                campoSenha2.style.border = '2px solid #e45e5e'
                erroSenhaDif.style.display = "block"
                return false
            }
        } else {
            campoSenha2.style.border = '2px solid #526D82'
            erroSenhaDif.style.display = "none"
            return true
        }
    }
}
function inputsOperacoes(campo){
    const classErroValor = document.querySelector('.erro-valor')
    if(!campo.validity.valid || campo.value == ""){
        campo.style.border = '2px solid #e45e5e'
        classErroValor.style.display = "block"
        return false
    } else {
        campo.style.border = '2px solid #526D82'
        classErroValor.style.display = "none"
        return true
    }
}
function verificaCamposErros(arrayDosCampos){
    return arrayDosCampos.find(elemento => elemento.style.border == '2px solid rgb(228, 94, 94)' )
}
export const verificaCampos = {
    verificaCampoCPF,
    verificaCampoEmail,
    verificaCampoNome,
    verificaCampoSenha,
    verificaCampoSenhaConta,
    verificaCampoTelefone,
    comparaSenha,
    inputsOperacoes,
    verificaCamposErros
}