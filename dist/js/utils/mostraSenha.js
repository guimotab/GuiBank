const campoSenha1 = document.getElementById('campo-senha')
const campoSenha2 = document.getElementById('campo-senha2')

const riscaSaldo = document.getElementById('esconde-saldo')
const saldo = document.getElementById('saldo')

function verSenha(olho){    
    if(olho.id == 1) {
        campoSenha1.type = "text"
        olho.src = "../img/olho-ver.png"
    } else if(olho.id == 2) { 
        campoSenha2.type = "text"
        olho.src = "../img/olho-ver.png"
    }
}
function fecharSenha(olho){
    if(olho.id == 1) {
        campoSenha1.type = "password"
        olho.src = "../img/olho-cego.png"
    } else if(olho.id == 2) {
        campoSenha2.type = "password"
        olho.src = "../img/olho-cego.png"
    }
}

function mostraSaldo(olho, saldoAtual){
    riscaSaldo.style.display = "none"
    saldo.style.display = "block"
    saldo.innerHTML = saldoAtual.innerHTML
    olho.src = "../img/olho-ver.png"
}
function escondeSaldo(olho){
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
