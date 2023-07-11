import { editaUsuario } from "../services/usuarios.js";
import { InformacoesApi } from "../utils/InformacoesApi.js";
import { RedirecionaBotoes } from "../utils/redirecionaBotoesAside.js";

const [contasApi, usuario] = await InformacoesApi.pegaInformacoes()

const saldoDisponivel = document.getElementById('saldo-disponivel')
const divRendimentos = document.getElementById('div-rendimentos')
const ulRendimentos = document.getElementById('ul-rendimentos')

const formularioDepositar = document.getElementById('formulario-depositar')
const inputDepositar = document.getElementById('input-depositar')

const formularioSacar = document.getElementById('formulario-sacar')
const inputSacar = document.getElementById('input-sacar')

const rendimentosUsuario = usuario.rendimentos.valores
const ultimoValor = rendimentosUsuario.length - 1

console.log(rendimentosUsuario[ultimoValor]);
atualizaRendimentos()

try {
    criaLiRendimentos()
    saldoDisponivel.innerHTML = `R$${rendimentosUsuario[ultimoValor].toFixed(2).replace(".", ",")}`
} catch {
    saldoDisponivel.innerHTML = "R$0,00"
    rendimentosUsuario[ultimoValor] = 0
    divRendimentos.innerHTML = `<div class="text-lg font-medium">Sem rendimentos ainda...<br>Adicione dinheiro à sua caixinha!</div>`
}
function criaLiRendimentos() {
    function buscaLiRendimentos(posicao) {
        const liRendimentos = `
            <div class="absolute z-10 w-8 mt-7 h-1 bg-cor-terciaria"></div>
            <li class="flex flex-col items-center z-10">
                <p class="font-medium">R$${(rendimentosUsuario[posicao] * 1).toFixed(2).replace(".", ",")}</p>
                <div class="h-3 w-3 rounded-full bg-cor-terciaria"></div>
            </li>`
        return liRendimentos
    }
    function buscaLiRendimentosFuturos(posicao, taxa) {
        const liRendimentosFuturos = `
            <li class="flex flex-col items-center z-10">
                <p class="font-medium text-cor-secundaria">R$${(rendimentosUsuario[posicao] * taxa).toFixed(2).replace(".", ",")}</p>
                <div class="h-3 w-3 rounded-full bg-cor-secundaria"></div>
            </li>`
        return liRendimentosFuturos
    }
    const legenda = `
        <div class="flex flex-col gap-3">
            <div>
                <p class="font-medium">Rendimento:</p> 
                <div class="h-1 w-10 bg-cor-terciaria"></div>
            </div>
            <div>
                <p class="font-medium">Expectativa:</p> 
                <div class="w-10 h-0.5 border-dashed border-2 border-cor-rendimento"></div>
            </div>
        </div>`
    const barraDivisaoPontilhada = `<div class="absolute z-0 w-33rem mt-7 h-0.5 border-dashed border-2 border-cor-rendimento"></div>`
    if (rendimentosUsuario.length == 1) {
        divRendimentos.innerHTML += buscaLiRendimentos(0)
        divRendimentos.innerHTML += barraDivisaoPontilhada
        let taxa = 1.03
        for (let i = 0; i < 5; i++) {
            divRendimentos.innerHTML += buscaLiRendimentosFuturos(0, taxa)
            taxa += 0.03
        }
        ulRendimentos.innerHTML += legenda
    } else if (rendimentosUsuario.length == 2) {
        const barraDivisao = `<div class="absolute z-10 w-32 mt-7 h-1 bg-cor-terciaria"></div>`
        divRendimentos.innerHTML += buscaLiRendimentos(0)
        divRendimentos.innerHTML += buscaLiRendimentos(1)
        divRendimentos.innerHTML += barraDivisao
        divRendimentos.innerHTML += barraDivisaoPontilhada
        let taxa = 1.03
        for (let i = 0; i < 4; i++) {
            divRendimentos.innerHTML += buscaLiRendimentosFuturos(1, taxa)
            taxa += 0.03
        }
        ulRendimentos.innerHTML += legenda
    } else if (rendimentosUsuario.length == 3) {
        const barraDivisao = `<div class="absolute z-10 w-56 mt-7 h-1 bg-cor-terciaria"></div>`
        divRendimentos.innerHTML += buscaLiRendimentos(0)
        divRendimentos.innerHTML += buscaLiRendimentos(1)
        divRendimentos.innerHTML += buscaLiRendimentos(2)
        divRendimentos.innerHTML += barraDivisao
        divRendimentos.innerHTML += barraDivisaoPontilhada
        let taxa = 1.03
        for (let i = 0; i < 3; i++) {
            divRendimentos.innerHTML += buscaLiRendimentosFuturos(2, taxa)
            taxa += 0.03
        }
        ulRendimentos.innerHTML += legenda
    } else {
        console.log(rendimentosUsuario.length);
        throw Error
    }

}
function insereValoresRendimentos() {
    if (usuario.rendimentos.length == 1) {

    }
}
const erroSaldoInsuficienteDep = document.getElementById('erroInsuficiente-depositar')
inputDepositar.addEventListener("blur", evento => {
    const valorInput = parseFloat(inputDepositar.value)
    if (valorInput > usuario.saldo) {
        erroSaldoInsuficienteDep.className = "frase-erro-conta"
    } else {
        erroSaldoInsuficienteDep.className = "hidden"
    }
})
const erroSaldoInsuficienteSac = document.getElementById('erroInsuficiente-sacar')

inputSacar.addEventListener("blur", evento => {
    const valorInput = parseFloat(inputSacar.value)
    if (valorInput > rendimentosUsuario[ultimoValor]) {
        erroSaldoInsuficienteSac.className = "frase-erro-conta"
    } else {
        erroSaldoInsuficienteSac.className = "hidden"
    }
})
formularioSacar.addEventListener('submit', async evento => {
    evento.preventDefault()
    const valorInput = parseFloat(inputSacar.value)

    if (valorInput < rendimentosUsuario[ultimoValor]) {
        usuario.saldo += valorInput
        rendimentosUsuario[ultimoValor] -= valorInput
        for (let i = 0; i < (rendimentosUsuario.length); i++) {
            rendimentosUsuario.shift()
        }
        await editaUsuario(usuario.id, usuario.devolveInformacoes())
        window.location.href = `./caixinha.html?id=${usuario.id}`
    } else if (valorInput == rendimentosUsuario[ultimoValor]) {
        usuario.saldo += valorInput
        for (let i = 0; i < (rendimentosUsuario.length + 2); i++) {
            rendimentosUsuario.shift()
        }
        await editaUsuario(usuario.id, usuario.devolveInformacoes())
        window.location.href = `./caixinha.html?id=${usuario.id}`
    } else {
        erroSaldoInsuficienteSac.className = "frase-erro-conta"
    }
})

formularioDepositar.addEventListener('submit', async evento => {
    evento.preventDefault()
    const valorInput = parseFloat(inputDepositar.value)
    const somaValores = rendimentosUsuario[ultimoValor] + valorInput
    if (valorInput <= usuario.saldo) {
        usuario.saldo -= valorInput
        if (rendimentosUsuario.length == 3) {
            rendimentosUsuario.shift()
        }
        usuario.rendimentos.dia = criaDate()
        rendimentosUsuario.push(somaValores)
        await editaUsuario(usuario.id, usuario.devolveInformacoes())
        window.location.href = `./caixinha.html?id=${usuario.id}`
    } else {
        erroSaldoInsuficienteDep.className = "frase-erro-conta"
    }

})
function criaDate() {
    const day = new Date().getDate()
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    // const hour = new Date().getHours()
    // const minutes = new Date().getMinutes()
    // const seconds = new Date().getSeconds()
    // const fullDate = `${year}-${month}-${day}-${hour}:${minutes}:${seconds}`
    const fullDate = `${year}-${month}-${day}`
    return fullDate
}
function checaDate() {
    const day = new Date().getDate()
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const fullDate = `${year}-${month}-${day}`

    const day1 = Date.parse(usuario.rendimentos.dia)
    const day2 = Date.parse(fullDate)

    return day2 - day1
}
function atualizaRendimentos() {
    const rendimento = checaDate() / 86400000

    if (rendimento == 1) {
        if(rendimentosUsuario.length == 1){
            const valorRendido = (rendimentosUsuario[ultimoValor] * 1.03).toFixed(2)
            rendimentosUsuario.push(valorRendido)
        } else if(rendimentosUsuario.length == 2){
            const valorRendido = (rendimentosUsuario[ultimoValor] * 1.03).toFixed(2)
            rendimentosUsuario.push(valorRendido)
        } else if(rendimentosUsuario.length == 3){
            const valorRendido = (rendimentosUsuario[ultimoValor] * 1.03).toFixed(2)
            rendimentosUsuario.shift()
            rendimentosUsuario.push(valorRendido)
        }
    }
    if (rendimento == 2) {
        if(rendimentosUsuario.length == 1){
            const valorRendido1x = (rendimentosUsuario[ultimoValor] * 1.03).toFixed(2)
            const valorRendido2x = (rendimentosUsuario[ultimoValor] * Math.pow(1.03, 2)).toFixed(2)
            rendimentosUsuario.push(valorRendido1x, valorRendido2x)

        } else if(rendimentosUsuario.length == 2){
            const valorRendido1x = (rendimentosUsuario[ultimoValor] * 1.03).toFixed(2)
            const valorRendido2x = (rendimentosUsuario[ultimoValor] * Math.pow(1.03, 2)).toFixed(2)
            rendimentosUsuario.shift()
            rendimentosUsuario.push(valorRendido1x, valorRendido2x)

        } else if(rendimentosUsuario.length == 3){
            const valorRendido1x = (rendimentosUsuario[ultimoValor] * 1.03).toFixed(2)
            const valorRendido2x = (rendimentosUsuario[ultimoValor] * Math.pow(1.03, 2)).toFixed(2)
            rendimentosUsuario.shift()
            rendimentosUsuario.shift()
            rendimentosUsuario.push(valorRendido1x, valorRendido2x)
        }
    }
    if (rendimento > 2) {
        const valorRendido1x = (rendimentosUsuario[ultimoValor] * Math.pow(1.03, rendimento-2)).toFixed(2)
        const valorRendido2x = (rendimentosUsuario[ultimoValor] * Math.pow(1.03, rendimento-1)).toFixed(2)
        const valorRendido3x = (rendimentosUsuario[ultimoValor] * Math.pow(1.03, rendimento)).toFixed(2)
        rendimentosUsuario.shift()
        rendimentosUsuario.shift()
        rendimentosUsuario.shift()
        rendimentosUsuario.push(valorRendido1x, valorRendido2x, valorRendido3x)
}

}
RedirecionaBotoes.redireciona(usuario)