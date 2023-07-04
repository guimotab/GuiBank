import mostraSenha from "../utils/mostraSenha.js"
import { hashSenha } from "../utils/criptografaSenha.js"
import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { editaUsuario, getUsuariosApi } from "../services/usuarios.js"
import { verificaCampos } from "../utils/verificaCampos.js"
(async () => {
    const contas = await getUsuariosApi()
    const login = document.getElementById('form')
    const CPF = document.getElementById('cpf')
    const campoSenha = document.getElementById('campo-senha')

    const olho = document.querySelector('[data-id]')

    olho.addEventListener("mousedown", (evento) => {
        let clicouOlho = evento.target
        mostraSenha.verSenha(clicouOlho)
    })
    olho.addEventListener("mouseup", (evento) => {
        let clicouOlho = evento.target
        mostraSenha.fecharSenha(clicouOlho)
    })

    CPF.addEventListener('blur', (evento) => {
        const erroCpfObg = document.querySelector(".erro-cpf-obrigatorio")
        const erroCpfInv = document.querySelector(".erro-cpf-invalido")
        const erroCpfExi = document.querySelector(".erro-cpf-existe")
        const erroCpfEsc = document.querySelector(".erro-cpf-escrita")
        verificaCampos.verificaCamposLogin(CPF, erroCpfObg, erroCpfInv, erroCpfExi, erroCpfEsc, contas)
    })
    campoSenha.addEventListener('blur', (evento) => {
        const erroSenhaObg = document.querySelector(".erro-senha-obrigatorio")
        const erroSenhaEsc = document.querySelector(".erro-senha-escrita")
        const erroSenhaInv = document.querySelector(".erro-senha-invalido")
        verificaCampos.verificaCampoSenha(campoSenha, erroSenhaObg, erroSenhaEsc, erroSenhaInv)
    })

    login.addEventListener('submit', async (evento) => {
        evento.preventDefault()
        const cpf = CPF.value
        const senha = campoSenha.value
        const usuarioEncontrado = contas.find((elemento) => elemento.cpf == cpf)

        try {
            const usuario = new InformacoesUsuario(usuarioEncontrado)
            if (hashSenha.verificaSenha(usuario.senha) == senha) {
                usuario.logado = true
                await editaUsuario(usuario.id, usuario.devolveInformacoes())

                window.location.href = `main.html?id=${usuario.id}`

            } else {
                throw new Error("Senha Incorreta")
            }
        } catch {
            throw new Error("CPF não cadastrado")
        }

    })
})()