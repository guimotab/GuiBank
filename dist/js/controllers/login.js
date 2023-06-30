import mostraSenha from "../utils/mostraSenha.js"
import { formataCPF } from "../utils/formataCPF.js"
import { hashSenha } from "../utils/formataSenha.js"
import { InformacoesUsuario } from "../models/InformacoesUsuario.js"
import { editaUsuario, getUsuariosApi } from "../services/usuarios.js"
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
        formataCPF(CPF)
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
                console.log(await getUsuariosApi());

                window.location.href = `main.html?id=${usuario.id}`

            } else {
                throw new Error("Senha Incorreta")
            }
        } catch {
            throw new Error("CPF não cadastrado")
        }

    })
})()