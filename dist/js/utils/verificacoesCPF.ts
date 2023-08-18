import IUserBase from "../interfaces/IUserBase";

export class verificacoesCPF {
    
    static formataCPF(cpf: HTMLInputElement) {
        const elementoAlvo = cpf
        const cpfAtual = cpf.value
        let cpfAtualizado;
        cpfAtualizado = cpfAtual.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,
            function (regex, argumento1, argumento2, argumento3, argumento4) {
                return argumento1 + '.' + argumento2 + '.' + argumento3 + '-' + argumento4;
            })
        return elementoAlvo.value = cpfAtualizado;;
    }

    static verificaCPF(contas: IUserBase[], cpf: string) {
            let resultado
            if(contas){
                resultado = contas.find((elemento) => elemento.cpf == cpf)
            }
            if (resultado){
                return false
            } else {
                return true
            }
    }

    static validaCPF(campoCpf: string) {
        const cpf = campoCpf.replace(/\.|-/g, "")
        if (this.validaPrimeiroDigito(cpf) || this.validaSegundoDigito(cpf)) {
            // campo.setCustomValidity("Esse cpf não é válido")
            return false
        }
        return true
    }

    static validaPrimeiroDigito(cpf: string) {
        let soma = 0
        let multiplicador = 10
        for (let tamanho = 0; tamanho < 9; tamanho++) {
            soma += parseFloat(cpf[tamanho]) * multiplicador
            multiplicador--
        }
        soma = (soma * 10) % 11

        if (soma == 10 || soma == 11) {
            soma = 0
        }
        return soma != parseFloat(cpf[9])
    }
    static validaSegundoDigito(cpf: string) {
        let soma = 0
        let multiplicador = 11
        for (let tamanho = 0; tamanho < 10; tamanho++) {
            soma += parseFloat(cpf[tamanho]) * multiplicador
            multiplicador--
        }
        soma = (soma * 10) % 11

        if (soma == 10 || soma == 11) {
            soma = 0
        }
        return soma != parseFloat(cpf[10])
    }
}