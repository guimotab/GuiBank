// import axios from 'axios';
const usuariosApi = axios.create({baseURL:'http://localhost:3000/usuarios'})

export class UsuariosApi{
    static async get(){
        const response = await usuariosApi.get('/')
    
        return response.data
    }
    static async post(data){
        await usuariosApi.post(`/`, data)
    }
    static async put(id, data){
        await usuariosApi.put(`/${id}`, data)
    }
    static async delete(id){
        await usuariosApi.delete(`/${id}`)
    }

}
