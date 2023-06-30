export function verificaCPF(contas, cpf){
    let existe = false
    try{
        contas.forEach( (elemento) => {
            if(elemento.cpf == cpf){ 
                existe = true
            }
        })
    } catch {
        return true
    }
    if(existe){
        return false
    } else {
        return true
    }

}