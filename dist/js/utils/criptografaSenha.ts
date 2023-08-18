function transformaHash(senha: string,  movimentos = 18) {
    const senhaCifrada = senha.split("").map( caractere => {
                                //devolve a posicao do caractere por meio do .map
        const codigoCaractere = caractere.charCodeAt(0)
        return String.fromCharCode(codigoCaractere + movimentos)
        //move as strings
    })
    return senhaCifrada.join("")
}

function verificaSenha(senha: string, movimentos = 18) {
    const senhaCifrada = senha.split("").map( caractere => {
                                //transforma os caracteres em códigos
        const codigoCaractere = caractere.charCodeAt(0) //0 determina por onde inicia
        return String.fromCharCode(codigoCaractere - movimentos)
        //pega esses códigos dos caracteres e subtrai 3, mudandno de caractere
    })
    return senhaCifrada.join("")
}

export const hashSenha = {
    transformaHash,
    verificaSenha
}