import { API_USUARIOS } from '../api/api.js'

export const auth = async (credenciales) => {
    try {
        const response = await fetch(`${API_USUARIOS}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credenciales)
        })
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.message && data.message.includes('error')) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        console.error('Error al loggearse:', error.message);
        throw error;
    }
}