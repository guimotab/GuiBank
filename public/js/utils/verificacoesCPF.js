export class verificacoesCPF {
    
    static formataCPF(cpf) {
        const elementoAlvo = cpf
        const cpfAtual = cpf.value
        let cpfAtualizado;
        cpfAtualizado = cpfAtual.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,
            function (regex, argumento1, argumento2, argumento3, argumento4) {
                return argumento1 + '.' + argumento2 + '.' + argumento3 + '-' + argumento4;
            })
        return elementoAlvo.value = cpfAtualizado;;
    }

    static verificaCPF(contas, cpf) {
        try {
            contas.forEach((elemento) => {
                if (elemento.cpf == cpf) {
                    existe = true
                }
            })
            return false
        } catch {
            return true
        }
    }

    static validaCPF(campoCpf) {
        const cpf = campoCpf.replace(/\.|-/g, "")
        if (this.validaPrimeiroDigito(cpf) || this.validaSegundoDigito(cpf)) {
            // campo.setCustomValidity("Esse cpf não é válido")
            return false
        }
        return true
    }

    static validaPrimeiroDigito(cpf) {
        let soma = 0
        let multiplicador = 10
        for (let tamanho = 0; tamanho < 9; tamanho++) {
            soma += cpf[tamanho] * multiplicador
            multiplicador--
        }
        soma = (soma * 10) % 11

        if (soma == 10 || soma == 11) {
            soma = 0
        }
        return soma != cpf[9]
    }
    static validaSegundoDigito(cpf) {
        let soma = 0
        let multiplicador = 11
        for (let tamanho = 0; tamanho < 10; tamanho++) {
            soma += cpf[tamanho] * multiplicador
            multiplicador--
        }
        soma = (soma * 10) % 11

        if (soma == 10 || soma == 11) {
            soma = 0
        }
        return soma != cpf[10]
    }
}