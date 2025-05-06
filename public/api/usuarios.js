import { API_USUARIOS } from './api.js'

export const updateUsuario = async ({ id, nombre, apellido, email, direccion, contraseña }) => {
    try {
        const response = await fetch(`${API_USUARIOS}/update/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, apellido, email, direccion, contraseña }),
        }).then(async (response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Network response es no OK')
            }
        }).catch(error => {
            console.error('Problema con el fetch', error)
        })
        return response
    } catch (error) {
        console.error('Error al agregar el usuario:', error);
    }
}

/*export const updateUsuario = async ({ id, nombre, apellido, email, direccion, contraseña }) => {
    try {
        const response = await fetch(`${API_USUARIOS}/update/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, apellido, email, direccion, contraseña }),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error; // Propaga el error para que el llamador pueda manejarlo
    }
};*/

export const getById = async ({id}) => {
    try {
        const user = await fetch(`${API_USUARIOS}/byId/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Network response es no OK')
            }
        }).catch(error => {
            console.error('Problema con el fetch', error)
        })
        return user
    } catch (error) {
        console.error('Error al agregar el usuario:', error);
    }
}