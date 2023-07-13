import { hashSenha } from "../utils/criptografaSenha.js"

export class Usuario {
    #primeiroNome
    #segundoNome
    #usuario
    #cpf
    #email
    #telefone
    #senha
    #numeroBanco
    #agencia
    #id
    #saldo
    #foto
    #logado
    #transacoes
    #itemAtual

    constructor(usuariosApi, primeiroNome, segundoNome, cpf, email, telefone, senha, id) {

        const itemAtual = usuariosApi[usuariosApi.length - 1] ? usuariosApi[usuariosApi.length - 1].numeroBanco + 1 : 1
        this.#primeiroNome = primeiroNome;
        this.#segundoNome = segundoNome;
        this.#cpf = cpf;
        this.#email = email;
        this.#telefone = telefone;
        this.#senha = senha;
        this.#numeroBanco = itemAtual + 10;
        this.#agencia = itemAtual + 100;
        this.#id = id;
        this.#saldo = 100;
        this.#foto = "../img/semFoto.jpg";
        this.#logado = true;
        this.#itemAtual = itemAtual
    }
    constroiArrobaUsuario(primeiroNome, segundoNome, itemAtual, usuariosApi){
        let arrobaUsuario = `@${(primeiroNome.toLowerCase() + segundoNome.toLowerCase())
            .normalize("NFD")
            .replace(/[^a-zA-Z\s]/g, "")}`
            try{
                const existe = usuariosApi.find(usuario => usuario.usuario == arrobaUsuario)
                if (existe){
                    return arrobaUsuario += itemAtual
                } else {
                    return arrobaUsuario
                }
            } catch {
                return arrobaUsuario
            }
    }
    devolveInformacoes(usuariosApi) {
        const conta = {
            "primeiroNome": this.#primeiroNome,
            "segundoNome": this.#segundoNome,
            "usuario": this.constroiArrobaUsuario(this.#primeiroNome, this.#segundoNome, this.#itemAtual, usuariosApi),
            "cpf": this.#cpf,
            "email": this.#email,
            "telefone": this.#telefone,
            "senha": this.#senha,
            "numeroBanco": this.#numeroBanco,
            "agencia": this.#agencia,
            "saldo": this.#saldo,
            "foto": this.#foto,
            "logado": this.#logado,
            "transacoes": [],
            "rendimentos": {dia:"", valores:[0]}
        }
        return conta
    }
    
    // static contaQuantidadeUsuarios(contas){
    //     let quantidadeContas = 0
    //     contas.forEach( conta=>{
    //         quantidadeContas++
    //     })
    //     return quantidadeContas
    // }
    get id() {
        return this.#id
    }
    get foto() {
        return this.#foto
    }
    get primeiroNome() {
        return this.#primeiroNome
    }
    get segundoNome() {
        return this.#segundoNome
    }
    get usuario() {
        return this.#usuario
    }
    get cpf() {
        return this.#cpf
    }
    get email() {
        return this.#email
    }
    get telefone() {
        return this.#telefone
    }
    get numeroBanco() {
        return this.#numeroBanco
    }
    get agencia() {
        return this.#agencia
    }
    get saldo() {
        return this.#saldo
    }
    get senha() {
        return this.#senha
    }
    get transacoes() {
        return this.#transacoes
    }
    set logado(status) {
        this.#logado = status
    }
    set foto(novaFoto) {
        this.#foto = novaFoto
    }
    set primeiroNome(novoPrimeiroNome) {
        this.#primeiroNome = novoPrimeiroNome
    }
    set segundoNome(novoSegundoNome) {
        this.#segundoNome = novoSegundoNome
    }
    set usuario(novoUsuario) {
        this.#usuario = novoUsuario
    }
    set email(novoEmail) {
        this.#email = novoEmail
    }
    set telefone(novoTelefone) {
        this.#telefone = novoTelefone
    }
    set senha(novaSenha) {
        this.#senha = novaSenha
    }
    set saldo(novoSaldo) {
        this.#saldo = novoSaldo
    }
    set transacoes(array) {
        this.#transacoes = array
    }
}