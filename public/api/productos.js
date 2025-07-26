import { API_PRODUCTOS } from "./api.js"

export const loadProducts = async () => {
    try {
        const response = await fetch(`${API_PRODUCTOS}/all`)
        if (!response.ok) {
            throw new Error(`Error en middleware ${response.status}: ${await response.text()}`);
        }
        const data = await response.json();
        if (data.message && data.message.includes('error')) {
            throw new Error(`Error en controler: ${data.message}`);
        }
        return data
    } catch (error) {
        console.error('Error al cargar todos los productos:', error.message);
        throw error;
    }
}

export const productosSearch = async (nombre) => {
    try {
        const response = await fetch(`${API_PRODUCTOS}/search/${nombre}`);
        if (!response.ok) {
            throw new Error(`Error en middleware ${response.status}: ${await response.text()}`);
        }
        const data = await response.json();
        if (data.message && data.message.includes('error')) {
            throw new Error(`Error en controler: ${data.message}`);
        }
        return data
    } catch (error) {
        console.error('Error al buscar todos los productos:', error.message);
        throw error;
    }
}

export const get_genero = async (genero) => {
    try {
        const response = await fetch(`${API_PRODUCTOS}/genero/${genero}`)
        if (!response.ok) {
            throw new Error(`Error en middleware ${response.status}: ${await response.text()}`);
        }
        const data = await response.json();
        if (data.message && data.message.includes('error')) {
            throw new Error(`Error en controler: ${data.message}`);
        }
        return data
    } catch (error) {
        console.error('Error al buscar por genero:', error.message);
        throw error;
    }
}

export const get_calificacion = async (calificacion) => {
    try {
        const response = await fetch(`${API_PRODUCTOS}/calificacion/${calificacion}`)
        if (!response.ok) {
            throw new Error(`Error en middleware ${response.status}: ${await response.text()}`);
        }
        const data = await response.json();
        if (data.message && data.message.includes('error')) {
            throw new Error(`Error en controler: ${data.message}`);
        }
        return data
    } catch (error) {
        console.error('Error al buscar por calificacion:', error.message);
        throw error;
    }
}

export const get_precio = async (precio) => {
    try {
        const response = await fetch(`${API_PRODUCTOS}/precio/${precio}`)
        if (!response.ok) {
            throw new Error(`Error en middleware ${response.status}: ${await response.text()}`);
        }
        const data = await response.json();
        if (data.message && data.message.includes('error')) {
            throw new Error(`Error en controler: ${data.message}`);
        }
        return data
    } catch (error) {
        console.error('Error al buscar por precio usuario:', error.message);
        throw error;
    }
}

export const get_producto = async (id) => {
    try {
        const response = await fetch(`${API_PRODUCTOS}/byId/${id}`)
        if (!response.ok) {
            throw new Error(`Error en middleware ${response.status}: ${await response.text()}`);
        }
        const data = await response.json();
        if (data.message && data.message.includes('error')) {
            throw new Error(`Error en controler: ${data.message}`);
        }
        return data
    } catch (error) {
        console.error('Error al obtener producto por ID:', error.message);
        throw error;
    }
} 