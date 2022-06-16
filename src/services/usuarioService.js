import { axiosInstance } from '../helpers/axios-config';

//GET http://localhost:4000/usuario
//POST http://localhost:4000/usuario
//PUT http://localhost:4000/usuario

const getUsuarios = () => {
    return axiosInstance.get('usuario', {
        headers: {
            'content-type': 'application/json'
        }
    });
}

const crearUsuarios = (data) => {
    return axiosInstance.post('usuario', data, {
        headers: {
            'content-type': 'application/json'
        }
    });
}

const editarUsuarios= (usuarioId, data) => {
    return axiosInstance.put(`usuario/${usuarioId}`, data, {
        headers: {
            'content-type': 'application/json'
        }
    });
}

export {
    getUsuarios, crearUsuarios, editarUsuarios
}