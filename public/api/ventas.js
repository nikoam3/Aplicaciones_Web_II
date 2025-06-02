import { API_VENTAS } from "./api.js"

export const loadVentasByIdUser = async (id) => {
    try {
        const response = await fetch(`${API_VENTAS}/detailByIdUser/${id}`)
        if (!response.ok) {
            throw new Error(`Error en middleware ${response.status}: ${await response.text()}`);
        }
        const data = await response.json();
        if (data.message && data.message.includes('error')) {
            throw new Error(`Error en controler: ${data.message}`);
        }
        return data
    } catch (error) {
        console.error('Error al obtener ventas por ID:', error.message);
        throw error;
    }
}

export const loadVentas = async () => {
    try {
        const response = await fetch(`${API_VENTAS}/all`)
        if (!response.ok) {
            throw new Error(`Error en middleware ${response.status}: ${await response.text()}`);
        }
        const data = await response.json();
        if (data.message && data.message.includes('error')) {
            throw new Error(`Error en controler: ${data.message}`);
        }
        return data
    } catch (error) {
        console.error('Error al cargar todas las ventas:', error.message);
        throw error;
    }
}

export const addVentas = async (venta) => {
    try {
        const response = await fetch(`${API_VENTAS}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venta),
        })
        if (!response.ok) {
            throw new Error(`Error en middleware ${response.status}: ${await response.text()}`);
        }
        const data = await response.json();
        if (data.message && data.message.includes('error')) {
            throw new Error(`Error en controler: ${data.message}`);
        }
        return data
    } catch (error) {
        console.error('Error al cargar venta:', error.message);
        throw error;
    }
}