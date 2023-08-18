export class Usuario {
    constructor(usuariosApi, { primeiroNome, segundoNome, cpf, email, telefone, senha }) {
        this._rendimentos = { dia: "", valores: [0] };
        let itemAtual = 1;
        if (usuariosApi) {
            itemAtual = usuariosApi[usuariosApi.length - 1] ? parseFloat(usuariosApi[usuariosApi.length - 1].id) + 1 : 1;
        }
        this._id = itemAtual.toString();
        this._primeiroNome = primeiroNome;
        this._segundoNome = segundoNome;
        this._usuario = this.constroiArrobaUsuario(this._primeiroNome, this._segundoNome, itemAtual, usuariosApi);
        this._cpf = cpf;
        this._email = email;
        this._telefone = telefone;
        this._senha = senha;
        this._numeroBanco = itemAtual + 10;
        this._agencia = itemAtual + 100;
        this._saldo = 100;
        this._foto = "../img/semFoto.jpg";
        this._logado = true;
        this._transacoes = [];
        this._itemAtual = itemAtual;
    }
    constroiArrobaUsuario(primeiroNome, segundoNome, itemAtual, usuariosApi) {
        let arrobaUsuario = `@${(primeiroNome.toLowerCase() + segundoNome.toLowerCase())
            .normalize("NFD")
            .replace(/[^a-zA-Z\s]/g, "")}`;
        try {
            const existe = usuariosApi.find(usuario => usuario.usuario == arrobaUsuario);
            if (existe) {
                return arrobaUsuario += itemAtual;
            }
            else {
                return arrobaUsuario;
            }
        }
        catch (_a) {
            return arrobaUsuario;
        }
    }
    devolveInformacoes(usuariosApi) {
        const conta = {
            id: this._id,
            primeiroNome: this._primeiroNome,
            segundoNome: this._segundoNome,
            usuario: this.constroiArrobaUsuario(this._primeiroNome, this._segundoNome, this._itemAtual, usuariosApi),
            cpf: this._cpf,
            email: this._email,
            telefone: this._telefone,
            senha: this._senha,
            numeroBanco: this._numeroBanco,
            agencia: this._agencia,
            saldo: this._saldo,
            foto: this._foto,
            logado: true,
            transacoes: this._transacoes,
            rendimentos: this._rendimentos
        };
        return conta;
    }
    get foto() {
        return this._foto;
    }
    get primeiroNome() {
        return this._primeiroNome;
    }
    get segundoNome() {
        return this._segundoNome;
    }
    get usuario() {
        return this._usuario;
    }
    get cpf() {
        return this._cpf;
    }
    get email() {
        return this._email;
    }
    get telefone() {
        return this._telefone;
    }
    get numeroBanco() {
        return this._numeroBanco;
    }
    get agencia() {
        return this._agencia;
    }
    get saldo() {
        return this._saldo;
    }
    get senha() {
        return this._senha;
    }
    get transacoes() {
        return this._transacoes;
    }
    get logado() {
        return this._logado;
    }
    set logado(status) {
        this._logado = status;
    }
    set foto(novaFoto) {
        this._foto = novaFoto;
    }
    set primeiroNome(novoPrimeiroNome) {
        this._primeiroNome = novoPrimeiroNome;
    }
    set segundoNome(novoSegundoNome) {
        this._segundoNome = novoSegundoNome;
    }
    set usuario(novoUsuario) {
        this._usuario = novoUsuario;
    }
    set email(novoEmail) {
        this._email = novoEmail;
    }
    set telefone(novoTelefone) {
        this._telefone = novoTelefone;
    }
    set senha(novaSenha) {
        this._senha = novaSenha;
    }
    set saldo(novoSaldo) {
        this._saldo = novoSaldo;
    }
    set transacoes(array) {
        this._transacoes = array;
    }
}
