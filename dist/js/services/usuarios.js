// import axios from 'axios';
const usuariosApi = axios.create({baseURL:'http://localhost:3000/usuarios'})

async function getUsuariosApi(){
    const response = await usuariosApi.get('/')
    return response.data
}
async function cadastraUsuario(data){
    await usuariosApi.post(`/`, data)
}
async function editaUsuario(id, data){
    await usuariosApi.put(`/${id}`, data)
}
async function deletaUsuario(id){
    await usuariosApi.delete(`/${id}`)
}

export {
    getUsuariosApi,
    cadastraUsuario,
    editaUsuario,
    deletaUsuario
}
