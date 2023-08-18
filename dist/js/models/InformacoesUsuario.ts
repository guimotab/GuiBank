import IIncome from "../interfaces/IIncome"
import IPeriodsTransations from "../interfaces/IPeriodsTransations"
import IUserBase from "../interfaces/IUserBase"

export class InformacoesUsuario {
    private _primeiroNome: string
    private _segundoNome: string
    private _usuario: string
    private _cpf: string
    private _email: string
    private _telefone: string
    private _senha: string
    private _numeroBanco: number
    private _agencia: number
    private _id: string
    private _saldo: number
    private _foto: string
    private _logado: boolean
    private _transacoes: IPeriodsTransations[]
    private _rendimentos: IIncome

    constructor({ id, agencia, cpf, email, foto, logado, numeroBanco, primeiroNome, rendimentos, saldo, segundoNome, senha, telefone, transacoes, usuario }: IUserBase) {
        this._primeiroNome = primeiroNome;
        this._segundoNome = segundoNome;
        this._cpf = cpf;
        this._email = email;
        this._telefone = telefone;
        this._senha = senha;
        this._numeroBanco = numeroBanco
        this._agencia = agencia
        this._id = id
        this._saldo = saldo;
        this._foto = foto
        this._logado = logado;
        this._usuario = usuario
        this._transacoes = transacoes
        this._rendimentos = rendimentos
    }
    devolveInformacoes() {

        const informacoes = {
            id: this._id,
            primeiroNome: this._primeiroNome,
            segundoNome: this._segundoNome,
            cpf: this._cpf,
            email: this._email,
            telefone: this._telefone,
            senha: this._senha,
            numeroBanco: this._numeroBanco,
            agencia: this._agencia,
            saldo: this._saldo,
            foto: this._foto,
            logado: this._logado,
            usuario: this._usuario,
            transacoes: this._transacoes,
            rendimentos: this._rendimentos
        } as IUserBase
        return informacoes
    }
    get foto() {
        return this._foto
    }
    get id() {
        return this._id
    }
    get logado() {
        return this._logado
    }
    get primeiroNome() {
        return this._primeiroNome
    }
    get segundoNome() {
        return this._segundoNome
    }
    get usuario() {
        return this._usuario
    }
    get cpf() {
        return this._cpf
    }
    get email() {
        return this._email
    }
    get telefone() {
        return this._telefone
    }
    get numeroBanco() {
        return this._numeroBanco
    }
    get agencia() {
        return this._agencia
    }
    get saldo() {
        return this._saldo
    }
    get senha() {
        return this._senha
    }
    get transacoes() {
        return this._transacoes
    }
    get rendimentos() {
        return this._rendimentos
    }
    set logado(status) {
        this._logado = status
    }
    set foto(novaFoto) {
        this._foto = novaFoto
    }
    set primeiroNome(novoPrimeiroNome) {
        this._primeiroNome = novoPrimeiroNome
    }
    set segundoNome(novoSegundoNome) {
        this._segundoNome = novoSegundoNome
    }
    set usuario(novoUsuario) {
        this._usuario = novoUsuario
    }
    set email(novoEmail) {
        this._email = novoEmail
    }
    set telefone(novoTelefone) {
        this._telefone = novoTelefone
    }
    set senha(novaSenha) {
        this._senha = novaSenha
    }
    set saldo(novoSaldo) {
        this._saldo = novoSaldo
    }
    set transacoes(array) {
        this._transacoes = array
    }
    set rendimentos(objeto) {
        this._rendimentos = objeto
    }
}