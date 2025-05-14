import { API_VENTAS } from "./api.js"

export const loadVentas = async () => {
    try {
        const ventas = await fetch(`${API_VENTAS}/all`, {
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
        return ventas
    } catch (error) {
        console.error('Error al cargar las ventas:', error);
    }
}

export const addVentas = async (venta) => {
    try {
        const response = await fetch(`${API_VENTAS}/add`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(venta),
        }).then((response) => {
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
        console.error('Error al agregar el producto:', error);
    }
}