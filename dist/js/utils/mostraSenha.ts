const campoSenha1 = document.getElementById('campo-senha') as HTMLInputElement
const campoSenha2 = document.getElementById('campo-senha2') as HTMLInputElement
const riscaSaldo = document.getElementById('esconde-saldo') as HTMLInputElement
const saldo = document.getElementById('saldo') as HTMLInputElement

function verSenha(olho: any) {
    console.log("🚀 ~ file: mostraSenha.ts:8 ~ verSenha ~ olho.id:", olho.id)
    if (parseFloat(olho.id) == 1) {
        campoSenha1.type = "text"
        olho.src = "../img/olho-ver.png"
    } else if (parseFloat(olho.id) == 2) {
        campoSenha2.type = "text"
        olho.src = "../img/olho-ver.png"
    }
}
function fecharSenha(olho: any) {
    if (parseFloat(olho.id) == 1) {
        campoSenha1.type = "password"
        olho.src = "../img/olho-cego.png"
    } else if (parseFloat(olho.id) == 2) {
        campoSenha2.type = "password"
        olho.src = "../img/olho-cego.png"
    }
}

function mostraSaldo(olho: any, saldoAtual: HTMLElement) {
    riscaSaldo.style.display = "none"
    saldo.style.display = "block"
    saldo.innerHTML = saldoAtual.innerHTML
    olho.src = "../img/olho-ver.png"
}
function escondeSaldo(olho: any) {
    saldo.style.display = "none"
    riscaSaldo.style.display = "block"
    olho.src = "../img/olho-cego.png"
}

const mostraSenha = {
    fecharSenha,
    verSenha,
    mostraSaldo,
    escondeSaldo
}
export default mostraSenha
