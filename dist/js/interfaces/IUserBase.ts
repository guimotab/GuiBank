import IIncome from "./IIncome"
import IPeriodsTransations from "./IPeriodsTransations"
export default interface IUserBase {
        id: string
        primeiroNome: string
        segundoNome: string
        usuario: string
        cpf: string
        email: string
        telefone: string
        senha: string
        numeroBanco: number
        agencia: number
        saldo: number
        foto: string
        logado: boolean
        transacoes: IPeriodsTransations[]
        rendimentos: IIncome
}