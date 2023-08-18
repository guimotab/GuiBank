import IUserBase from "../interfaces/IUserBase.js"

export class UsuariosApi{
    static get(){
        const contas = JSON.parse(localStorage.getItem("Contas")!) as IUserBase[]
    
        return contas
    }
    static post(conta: IUserBase, contasApi: IUserBase[]){
        contasApi.push(conta)
        localStorage.setItem("Contas", JSON.stringify(contasApi))
    }
    static put(localStorager: IUserBase[], id: string, data: IUserBase){
        const indexConta = localStorager.findIndex(conta=> conta.id === id)
        localStorager[indexConta] = data
        localStorage.setItem("Contas", JSON.stringify(localStorager))
    }
    static  delete(id: string){
        // await usuariosApi.delete(`/${id}`)
    }

}
