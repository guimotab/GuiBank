import { VerificacoesUsuario } from "../class/VerificacoesUsuario.js"
import IUserBase from "../interfaces/IUserBase.js"
import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { verificacoesCPF } from "./verificacoesCPF.js"
const classCorreto = " border-2 border-cor-outline rounded-lg px-2 py-0.5 h-fit text-lg font-medium focus:outline-none focus:border-cor-hover"
const classErro = " border-2 border-cor-erro rounded-lg px-2 py-0.5 h-fit text-lg font-medium focus:outline-none focus:border-cor-erro"
function verificaCampoNome(campo: HTMLInputElement, erroClassObrigatorio: HTMLElement, erroClassLength: HTMLElement, erroClassInvalido: HTMLElement) {
    if (campo.value == "") {
        campo.className = classErro
        erroClassObrigatorio.className = "frase-erro-conta"
        erroClassInvalido.className = "hidden"
        erroClassLength.className = "hidden"
        return false
    } else {
        campo.className = classCorreto
        erroClassObrigatorio.className = "hidden"
        erroClassInvalido.className = "hidden"
        if (campo.value.length >= 3) {
            campo.className = classCorreto
            erroClassLength.className = "hidden"
            if (!campo.validity.valid) {
                campo.className = classErro
                erroClassInvalido.className = "frase-erro-conta"
                return false
            } else {
                campo.className = classCorreto
                erroClassInvalido.className = "hidden"
                return true
            }
        } else {
            campo.className = classErro
            erroClassLength.className = "frase-erro-conta"
            return false
        }
    }
}
function verificaCampoUsuario(campo: HTMLInputElement, erroClassObrigatorio: HTMLElement, erroClassInvalido: HTMLElement, erroClassExiste: HTMLElement, contasAPI: IUserBase[], contaUsuario: InformacoesUsuario) {
    if (campo.value == "") {
        //Obrigatório
        campo.className = classErro
        erroClassObrigatorio.className = "frase-erro-conta"
        erroClassInvalido.className = "hidden"
        erroClassExiste.className = "hidden"
        return false
    } else if (campo.value == "@") {
        campo.className = classErro
        erroClassObrigatorio.className = "frase-erro-conta"
        erroClassInvalido.className = "hidden"
        return false
    } else {
        campo.className = classCorreto
        erroClassObrigatorio.className = "hidden"
        VerificacoesUsuario.corrigeUsuario(campo)
        if (campo.validity.patternMismatch) {
            //escrita
            campo.className = classErro
            erroClassInvalido.className = "frase-erro-conta"
            return false
        } else {
            campo.className = classCorreto
            erroClassInvalido.className = "hidden"
            if (VerificacoesUsuario.existeUsuario(contasAPI, campo, contaUsuario)) {
                //existe
                campo.className = classErro
                erroClassInvalido.className = "hidden"
                erroClassExiste.className = "frase-erro-conta"
                return false
            } else {

                campo.className = classCorreto
                erroClassExiste.className = "hidden"
                return true
            }
        }
    }
}
function verificaCampoCPF(campo: HTMLInputElement, erroClassObrigatorio: HTMLElement, erroClassInvalido: HTMLElement, erroClassExiste: HTMLElement, erroClassEscrita: HTMLElement, contas: IUserBase[]) {
    if (campo.value == "") {
        //Obrigatório
        campo.className = classErro
        erroClassObrigatorio.className = "frase-erro-conta"
        erroClassEscrita.className = "hidden"
        erroClassInvalido.className = "hidden"
        erroClassExiste.className = "hidden"
        return false
    } else {
        campo.className = classCorreto
        erroClassObrigatorio.className = "hidden"
        verificacoesCPF.formataCPF(campo)
        if (!campo.validity.patternMismatch && campo.value.length == 11) {
            //escrita
            campo.className = classErro
            erroClassInvalido.className = "hidden"
            erroClassExiste.className = "hidden"
            erroClassEscrita.className = "frase-erro-conta"
            return false
        } else {
            campo.className = classCorreto
            erroClassEscrita.className = "hidden"
            if (!verificacoesCPF.validaCPF(campo.value)) {
                //invalido
                campo.className = classErro
                erroClassExiste.className = "hidden"
                erroClassInvalido.className = "frase-erro-conta"
                return false
            } else {
                campo.className = classCorreto
                erroClassInvalido.className = "hidden"
                if (!verificacoesCPF.verificaCPF(contas, campo.value)) {
                    //existe
                    campo.className = classErro
                    erroClassExiste.className = "frase-erro-conta"
                    return false
                } else {
                    campo.className = classCorreto
                    erroClassExiste.className = "hidden"
                    return true
                }
            }
        }
    }
}
function verificaCampoEmail(campo: HTMLInputElement, erroClassObrigatorio: HTMLElement, erroClassInvalido: HTMLElement) {
    if (campo.value == "") {
        campo.className = classErro
        erroClassObrigatorio.className = "frase-erro-conta"
        erroClassInvalido.className = "hidden"
        return false
    } else {
        campo.className = classCorreto
        erroClassObrigatorio.className = "hidden"
        if (campo.value.length < 7) {
            campo.className = classErro
            erroClassInvalido.className = "frase-erro-conta"
            return false
        } else {
            campo.className = classCorreto
            erroClassInvalido.className = "hidden"
            return true
        }
    }
}
function verificaCampoTelefone(campo: HTMLInputElement, erroClassObrigatorio: HTMLElement, erroClassInvalido: HTMLElement, erroClassFormato: HTMLElement) {
    if (campo.value == "") {
        campo.className = classErro
        erroClassObrigatorio.className = "frase-erro-conta"
        erroClassFormato.className = "hidden"
        erroClassInvalido.className = "hidden"
        return false
    } else {
        campo.className = classCorreto
        erroClassObrigatorio.className = "hidden"
        erroClassInvalido.className = "hidden"
        if (campo.value.length < 11) {
            campo.className = classErro
            erroClassFormato.className = "hidden"
            erroClassInvalido.className = "frase-erro-conta"
            return false

        } else {
            campo.className = classCorreto
            erroClassInvalido.className = "hidden"
            if (!campo.validity.valid) {
                campo.className = classErro
                erroClassFormato.className = "frase-erro-conta"
                return false

            } else {
                campo.className = classCorreto
                erroClassFormato.className = "hidden"
                return true
            }
        }
    }
}
function verificaCampoSenha(campo: HTMLInputElement, erroClassObrigatorio: HTMLElement, erroClassEscrita: HTMLElement, erroClassInvalido: HTMLElement) {
    const classCorreto = `border-2 border-cor-terciaria rounded-lg px-2 py-0.5 w-full text-lg font-medium focus:outline-none focus:border-cor-hover`
    const classErro = `border-2 border-cor-erro rounded-lg px-2 py-0.5 w-full text-lg font-medium focus:outline-none focus:border-cor-erro`
    if (campo.value == "") {
        campo.className = classErro
        erroClassEscrita.className = "hidden"
        erroClassInvalido.className = "hidden"
        erroClassObrigatorio.className = "frase-erro-conta"
        return false
    } else {
        if (campo.validity.patternMismatch) {
            campo.className = classErro
            erroClassInvalido.className = "frase-erro-conta"
            return false
        } else {
            campo.className = classCorreto
            erroClassObrigatorio.className = "hidden"
            erroClassInvalido.className = "hidden"
            if (campo.value.length < 4) {
                campo.className = classErro
                erroClassEscrita.className = "frase-erro-conta"
                return false

            } else {
                campo.className = classCorreto
                erroClassEscrita.className = "hidden"
                return true
            }
        }
    }
}
function comparaSenha(campoSenha1: HTMLInputElement, campoSenha2: HTMLInputElement, erroSenhaDif: HTMLElement) {
    if (campoSenha1.value == "" && !(campoSenha2.value == "")) {
        campoSenha2.className = classErro
        return false
    } else if (!campoSenha1.validity.patternMismatch) {
        if (!(campoSenha1.value.length < 4)) {
            if (campoSenha1.value == campoSenha2.value) {
                campoSenha2.className = classCorreto

                erroSenhaDif.className = "hidden"
                return true
            } else {
                campoSenha2.className = classErro
                erroSenhaDif.className = "frase-erro-conta"
                return false
            }
        } else {
            campoSenha2.className = classCorreto
            erroSenhaDif.className = "hidden"
            return true
        }
    }
    return false
}
function inputsOperacoes(campo: HTMLInputElement, usuario: InformacoesUsuario, taxa = 0) {
    const valor = parseFloat(campo.value)
    const saldo = usuario.saldo
    const divInput = document.getElementById('div-input')!
    const classErroValor = document.getElementById('erroInvalido')!
    const classErroInsuficiente = document.getElementById('erroInsuficiente')!
    const classCorretoLabel = " flex items-end gap-px border-b-2 border-cor-outline max-w-xs"
    const classErroLabel = " flex items-end gap-px border-b-2 border-cor-erro max-w-xs"
    
    if (taxa == 0) {
        if (campo.value == "") {
            divInput.className = classCorretoLabel
            classErroValor.className = "hidden"
            return false
        } else {
            if (!campo.validity.valid) {
                divInput.className = classErroLabel
                classErroValor.className = "frase-erro-operacao"
                return false
            } else {
                divInput.className = classCorretoLabel
                classErroValor.className = "hidden"
                return true
            }
        }
    }
    if (campo.value == "") {
        divInput.className = classCorretoLabel
        classErroInsuficiente.className = "hidden"
        classErroValor.className = "hidden"
        return false
    } else {
        
        if (!campo.validity.valid) {
            divInput.className = classErroLabel
            classErroInsuficiente.className = "hidden"
            classErroValor.className = "frase-erro-operacao"
            return false
        } else if (valor + taxa > saldo) {
            divInput.className = classErroLabel
            classErroInsuficiente.className = "frase-erro-operacao"
            classErroValor.className = "hidden"
            return false
        } else {
            divInput.className = classCorretoLabel
            classErroInsuficiente.className = "hidden"
            classErroValor.className = "hidden"
            return true
        }
    }
}
function verificaCampoCpfLogin(campo: HTMLInputElement, erroClassObrigatorio: HTMLElement, erroClassInvalido: HTMLElement, erroClassExiste: HTMLElement, erroClassEscrita: HTMLElement, contasApi: IUserBase[]) {
    const classCorretoLabel = " correto-label-transparente w-full max-w-[20rem]"
    const classErroLabel = " erro-label-transparente w-full max-w-[20rem]"
    if (campo.value == "") {
        //Obrigatório
        campo.className = classErroLabel
        erroClassObrigatorio.className = "frase-erro-conta"
        erroClassEscrita.className = "hidden"
        erroClassInvalido.className = "hidden"
        erroClassExiste.className = "hidden"
        return false
    } else {
        campo.className = classCorretoLabel
        erroClassObrigatorio.className = "hidden"
        verificacoesCPF.formataCPF(campo)
        if (!campo.validity.patternMismatch && campo.value.length == 11) {
            //escrita
            campo.className = classErroLabel
            erroClassEscrita.className = "frase-erro-conta"
            return false
        } else {
            campo.className = classCorretoLabel
            erroClassEscrita.className = "hidden"
            if (verificacoesCPF.verificaCPF(contasApi, campo.value)) {
                //existe
                campo.className = classErroLabel
                erroClassExiste.className = "frase-erro-conta"
                return false
            } else {
                campo.className = classCorretoLabel
                erroClassExiste.className = "hidden"
                return true
            }
        }
    }
}
function verificaCampoSenhaLogin(campo: HTMLInputElement, erroClassObrigatorio: HTMLElement, erroClassEscrita: HTMLElement, erroClassInvalido: HTMLElement) {

    const classCorretoLabel = " correto-label-transparente w-full max-w-[20rem]"
    const classErroLabel = " erro-label-transparente w-full max-w-[20rem]"
    if (campo.value == "") {
        campo.className = classErroLabel
        erroClassEscrita.className = "hidden"
        erroClassInvalido.className = "hidden"
        erroClassObrigatorio.className = "frase-erro-conta"
        return false
    } else {
        if (campo.validity.patternMismatch) {
            campo.className = classErroLabel
            erroClassInvalido.className = "frase-erro-conta"
            return false
        } else {
            campo.className = classCorretoLabel
            erroClassObrigatorio.className = "hidden"
            erroClassInvalido.className = "hidden"
            if (campo.value.length < 4) {
                campo.className = classErroLabel
                erroClassEscrita.className = "frase-erro-conta"
                return false

            } else {
                campo.className = classCorretoLabel
                erroClassEscrita.className = "hidden"
                return true
            }
        }
    }
}
function verificaCampoSenhaConta(campo: HTMLInputElement, erroClassLength: HTMLElement, erroClassInvalido: HTMLElement) {
    if (campo.value == "") {
        campo.className = classCorreto
        erroClassLength.className = "hidden"
        erroClassInvalido.className = "hidden"
        return true
    } else {
        if (campo.validity.patternMismatch) {
            campo.className = classErro
            erroClassInvalido.className = "frase-erro-conta"
            return false
        } else {
            campo.className = classCorreto
            erroClassInvalido.className = "hidden"
            if (campo.value.length < 4) {
                campo.className = classErro
                erroClassLength.className = "frase-erro-conta"
                return false
            } else {
                campo.className = classCorreto
                erroClassLength.className = "hidden"
                return true
            }
        }
    }
}
function verificaCamposErros(arrayDosCampos: HTMLInputElement[]) {
    const temErro = arrayDosCampos.find(elemento => elemento.className == classErro)
    const ultimoCampo = arrayDosCampos.length - 1
    let senha1Vazia = false
    let senha2Vazia = false

    if (arrayDosCampos[ultimoCampo - 1].value == "" && arrayDosCampos[ultimoCampo].value != "") {
        senha1Vazia = true
    }
    if (arrayDosCampos[ultimoCampo - 1].value != "" && arrayDosCampos[ultimoCampo].value == "") {
        senha2Vazia = true
    }

    if (temErro || senha1Vazia || senha2Vazia) {
        return true
    } else {
        return false
    }
}
export const verificaCampos = {
    verificaCampoNome,
    verificaCampoUsuario,
    verificaCampoCPF,
    verificaCampoEmail,
    verificaCampoTelefone,
    verificaCampoSenha,
    verificaCampoSenhaLogin,
    comparaSenha,
    inputsOperacoes,
    verificaCamposErros,
    verificaCampoCpfLogin,
    verificaCampoSenhaConta
}