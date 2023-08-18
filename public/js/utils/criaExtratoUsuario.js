import { Horario } from "./criaHorario.js";
const mesDia = Horario.criaMesDia();
export function verificaExtratoExiste(indexId) {
    //verifica se existe algum objeto de transacao
    function verificaExisteObjeto() {
        if (indexId.transacoes) {
            return true;
        }
        else {
            return false;
        }
    }
    //verifica se já existe algum dia igual
    function verificaExisteDiaIgual() {
        let existe = false;
        try {
            indexId.transacoes.forEach((elemento) => {
                if (elemento.periodo.dia == Horario.criaMesDia()) {
                    existe = true;
                }
            });
            return existe;
        }
        catch (_a) {
            return existe;
        }
    }
    const existeObjetoDia = verificaExisteObjeto();
    const existeDiaIgual = verificaExisteDiaIgual();
    const objetoDia = {
        "periodo": {
            "dia": `${mesDia}`,
            "tipos": [],
            "valores": [],
            "horarios": [],
        }
    };
    if (existeObjetoDia && existeDiaIgual) {
        return false;
    }
    else if (existeObjetoDia && !existeDiaIgual) {
        indexId.transacoes.push(objetoDia);
        return true;
    }
    if (!existeObjetoDia && !existeDiaIgual) {
        indexId.transacoes = [];
        indexId.transacoes.push(objetoDia);
        return true;
    }
}
