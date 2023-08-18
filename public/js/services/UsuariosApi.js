export class UsuariosApi {
    static get() {
        const contas = JSON.parse(localStorage.getItem("Contas"));
        return contas;
    }
    static post(conta, contasApi) {
        contasApi.push(conta);
        localStorage.setItem("Contas", JSON.stringify(contasApi));
    }
    static put(localStorager, id, data) {
        const indexConta = localStorager.findIndex(conta => conta.id === id);
        localStorager[indexConta] = data;
        localStorage.setItem("Contas", JSON.stringify(localStorager));
    }
    static delete(id) {
        // await usuariosApi.delete(`/${id}`)
    }
}
