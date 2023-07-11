export class InformacoesUsuario{
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
    #rendimentos

    constructor(usuario){
        this.#primeiroNome = usuario.primeiroNome;
        this.#segundoNome = usuario.segundoNome;
        this.#cpf = usuario.cpf;
        this.#email = usuario.email;
        this.#telefone = usuario.telefone;
        this.#senha = usuario.senha;
        this.#numeroBanco = usuario.numeroBanco
        this.#agencia = usuario.agencia
        this.#id = usuario._id
        this.#saldo = usuario.saldo;
        this.#foto = usuario.foto
        this.#logado = usuario.logado;
        this.#usuario = usuario.usuario
        this.#transacoes = usuario.transacoes
        this.#rendimentos = usuario.rendimentos
    }
     devolveInformacoes(){
        
        const informacoes = {
            "_id": this.#id,
            "primeiroNome" : this.#primeiroNome,
            "segundoNome" : this.#segundoNome,
            "cpf" : this.#cpf,
            "email" : this.#email,
            "telefone" : this.#telefone,
            "senha" : this.#senha,
            "numeroBanco" : this.#numeroBanco,
            "agencia" : this.#agencia,
            "saldo": this.#saldo,
            "foto": this.#foto,
            "logado" : this.#logado,
            "usuario": this.#usuario,
            "transacoes" : this.#transacoes,
            "rendimentos": this.#rendimentos
        }
        return informacoes
    }
     get foto(){
        return this.#foto
    }
     get id() {
        return this.#id
    }
     get logado() {
        return this.#logado
    }
     get primeiroNome(){
        return this.#primeiroNome
    }
     get segundoNome(){
        return this.#segundoNome
    }
     get usuario(){
        return this.#usuario
    }
     get cpf(){
        return this.#cpf
    }
     get email(){
        return this.#email
    }
     get telefone(){
        return this.#telefone
    }
     get numeroBanco(){
        return this.#numeroBanco
    }
     get agencia(){
        return this.#agencia
    }
     get saldo(){
        return this.#saldo
    }
     get senha(){
        return this.#senha
    }
     get transacoes(){
        return this.#transacoes
    }
     get rendimentos(){
        return this.#rendimentos
    }
     set logado(status){
       this.#logado = status
    }
     set foto(novaFoto){
        this.#foto = novaFoto
    }
     set primeiroNome(novoPrimeiroNome){
        this.#primeiroNome = novoPrimeiroNome
    }
     set segundoNome(novoSegundoNome){
        this.#segundoNome = novoSegundoNome
    }
     set usuario(novoUsuario){
        this.#usuario = novoUsuario
    }
     set email(novoEmail){
        this.#email = novoEmail
    }
     set telefone(novoTelefone){
        this.#telefone = novoTelefone
    }
     set senha(novaSenha){
        this.#senha = novaSenha
    }
     set saldo(novoSaldo){
        this.#saldo = novoSaldo
    }
     set transacoes(array){
        this.#transacoes = array
    }
}