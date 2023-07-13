import { UsuariosApi } from "../services/UsuariosApi.js"
import { Horario } from "../utils/criaHorario.js"

export class OperacoesCaixinha {
    static async depositar(usuario, inputDepositar, rendimentosUsuario) {
        const erroSaldoInsuficienteDep = document.getElementById('erroInsuficiente-depositar')
        const valorInput = parseFloat(inputDepositar.value.replace(",", "."))
        const arrayUltimoValor = rendimentosUsuario.length - 1
        const valoresSomados = rendimentosUsuario[arrayUltimoValor] + valorInput
        if (valorInput <= usuario.saldo) {
            usuario.saldo -= valorInput
            if (rendimentosUsuario.length == 3 || rendimentosUsuario[0] == 0) {
                rendimentosUsuario.shift()
            }
            usuario.rendimentos.dia = Horario.criaDateCaixinha()
            rendimentosUsuario.push(valoresSomados)
            await UsuariosApi.put(usuario.id, usuario.devolveInformacoes())
            window.location.href = `./caixinha.html?id=${usuario.id}`
        } else {
            erroSaldoInsuficienteDep.className = "frase-erro-conta"
        }

    }
    static async sacar(usuario, inputSacar, rendimentosUsuario) {
        const erroSaldoInsuficienteSac = document.getElementById('erroInsuficiente-sacar')
        const ultimoValor = rendimentosUsuario.length - 1
        const valorInput = parseFloat(inputSacar.value.replace(",", "."))

        if (valorInput < rendimentosUsuario[ultimoValor]) {
            usuario.saldo += valorInput
            usuario.rendimentos.dia = Horario.criaDateCaixinha()
            rendimentosUsuario[ultimoValor] -= valorInput
            if (rendimentosUsuario.length != 1) {
                for (let i = 0; i < (rendimentosUsuario.length); i++) {
                    rendimentosUsuario.shift()
                }
            }
            await UsuariosApi.put(usuario.id, usuario.devolveInformacoes())
            window.location.href = `./caixinha.html?id=${usuario.id}`

        } else if (valorInput == rendimentosUsuario[ultimoValor]) {
            usuario.saldo += valorInput
            usuario.rendimentos.dia = ""
            for (let i = 0; i < (rendimentosUsuario.length + 2); i++) {
                rendimentosUsuario.shift()
            }
            usuario.rendimentos.valores = [0]
            await UsuariosApi.put(usuario.id, usuario.devolveInformacoes())
            window.location.href = `./caixinha.html?id=${usuario.id}`
        } else {
            erroSaldoInsuficienteSac.className = "frase-erro-conta"
        }
    }
}