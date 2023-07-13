import { VerificacoesUsuario } from "../class/VerificacoesUsuario.js"
import { verificacoesCPF } from "./verificacoesCPF.js"
const classCorreto = " border-2 border-cor-outline rounded-lg px-2 py-0.5 h-fit text-lg font-medium focus:outline-none focus:border-cor-hover"
const classErro = " border-2 border-cor-erro rounded-lg px-2 py-0.5 h-fit text-lg font-medium focus:outline-none focus:border-cor-erro"
function verificaCampoNome(campo, erroClassObrigatorio, erroClassLength, erroClassInvalido) {
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
function verificaCampoUsuario(campo, erroClassObrigatorio, erroClassInvalido, erroClassExiste, contasAPI, contaUsuario) {
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
        erroClassLength.className = "hidden"
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
function verificaCampoCPF(campo, erroClassObrigatorio, erroClassInvalido, erroClassExiste, erroClassEscrita, array) {
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
                if (!verificacoesCPF.verificaCPF(array, campo.value)) {
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
function verificaCampoEmail(campo, erroClassObrigatorio, erroClassInvalido) {
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
function verificaCampoTelefone(campo, erroClassObrigatorio, erroClassInvalido, erroClassFormato) {
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
function verificaCampoSenha(campo, erroClassObrigatorio, erroClassEscrita, erroClassInvalido) {
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
function comparaSenha(campoSenha1, campoSenha2, erroSenhaDif) {
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
}
function inputsOperacoes(campo, usuario, taxa = 0) {
    const valor = parseFloat(campo.value)
    const saldo = usuario.saldo
    const divInput = document.getElementById('div-input')
    const classErroValor = document.getElementById('erroInvalido')
    const classErroInsuficiente = document.getElementById('erroInsuficiente')
    const classCorretoLabel = " flex items-end gap-px border-b-2 border-cor-outline w-80"
    const classErroLabel = " flex items-end gap-px border-b-2 border-cor-erro w-80"

    if (taxa == 0) {
        if (campo.value == "") {
            divInput.classList = classCorretoLabel
            classErroValor.className = "hidden"
            return false
        } else {
            if (!campo.validity.valid) {
                divInput.classList = classErroLabel
                classErroValor.className = "frase-erro-operacao"
                return false
            } else {
                divInput.classList = classCorretoLabel
                classErroValor.className = "hidden"
                return true
            }
        }
    }
    if (campo.value == "") {
        divInput.classList = classCorretoLabel
        classErroInsuficiente.className = "hidden"
        classErroValor.className = "hidden"
        return false
    } else {
        if (!campo.validity.valid) {
            divInput.classList = classErroLabel
            classErroInsuficiente.className = "hidden"
            classErroValor.className = "frase-erro-operacao"
            return false
        } else if (valor + taxa > saldo) {
            divInput.classList = classErroLabel
            classErroInsuficiente.className = "frase-erro-operacao"
            classErroValor.className = "hidden"
            return false
        } else {
            divInput.classList = classCorretoLabel
            classErroInsuficiente.className = "hidden"
            classErroValor.className = "hidden"
            return true
        }
    }
}
function verificaCampoCpfLogin(campo, erroClassObrigatorio, erroClassInvalido, erroClassExiste, erroClassEscrita, contasApi) {
    const classCorretoLabel = " correto-label-transparente"
    const classErroLabel = " erro-label-transparente"
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
function verificaCampoSenhaLogin(campo, erroClassObrigatorio, erroClassEscrita, erroClassInvalido) {

    const classCorretoLabel = " correto-label-transparente"
    const classErroLabel = " erro-label-transparente"
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
function verificaCampoSenhaConta(campo, erroClassLength, erroClassInvalido) {
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
function verificaCamposErros(arrayDosCampos) {
    const temErro = arrayDosCampos.find(elemento => elemento.className == classErro)
    let senha1Vazia = false
    let senha2Vazia = false

    if (arrayDosCampos[4].value == "" && arrayDosCampos[5].value != "") {
        senha1Vazia = true
    }
    if (arrayDosCampos[4].value != "" && arrayDosCampos[5].value == "") {
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