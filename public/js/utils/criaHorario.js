const mes = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

function criaDia(){
    let diaTransacoes = new Date().getDate().toString().padStart(2, "0")
    return diaTransacoes
}

function criaMesDia(){
    let diaTransacoes = new Date().getDate().toString().padStart(2, "0")
    const mesTransacoes = mes[new Date().getMonth()];
    return diaTransacoes + " " + mesTransacoes
}

function criaHoraMin(){
    let horaTransacoes = new Date().getHours().toString().padStart(2, "0")
    let minutoTransacoes = new Date().getMinutes().toString().padStart(2, "0")
    return horaTransacoes + ":" + minutoTransacoes
}

// const opcoes = {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     timezone: 'UTC',
//   };

export const Horario = {
    criaDia,
    criaMesDia,
    criaHoraMin
}