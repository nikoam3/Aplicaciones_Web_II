import { API_USUARIOS } from './api.js'

export const updateUsuario = async (user) => {
    try {
        const response = await fetch(`${API_USUARIOS}/update/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        if (!response.ok) {
            throw new Error(`Error en middleware ${response.status}: ${await response.text()}`);
        }
        const data = await response.json();
        if (data.message && data.message.includes('error')) {
            throw new Error(`Error en controller: ${data.message}`);
        }
        return data
    } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
        throw error;
    }
}

export const addUsuario = async (user) => {
    try {
        const response = await fetch(`${API_USUARIOS}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        if (!response.ok) {
            throw new Error(`Error en middleware ${response.status}: ${await response.text()}`);
        }
        const data = await response.json();
        if (data.message && data.message.includes('error')) {
            throw new Error(`Error en controller: ${data.message}`);
        }
        return data
    } catch (error) {
        console.error('Error al crear usuario:', error.message);
        throw error;
    }
}

export const getById = async ({ id }) => {
    try {
        const response = await fetch(`${API_USUARIOS}/byId/${id}`)
        if (!response.ok) {
            throw new Error(`Error en middleware ${response.status}: ${await response.text()}`);
        }
        const data = await response.json();
        if (data.message && data.message.includes('error')) {
            throw new Error(`Error en controller: ${data.message}`);
        }
        return data
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error.message);
        throw error;
    }
}