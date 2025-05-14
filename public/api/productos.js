import { API_PRODUCTOS } from "./api.js"

export const loadProducts = async () => {
    try {
        const products = await fetch(`${API_PRODUCTOS}/all`, {
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
        return products
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}
/*
export const addProducts = async ({ id, nombre, desc, precio, imagen, esDigital }) => {
    try {
        const response = await fetch(`${API_PRODUCTOS}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, nombre, desc, precio, imagen, esDigital }),
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

export const deleteProducts = async ({ id }) => {
    try {
        const response = await fetch(`${API_PRODUCTOS}/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            params: JSON.stringify({ id }),
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
        console.error('Error al eliminar los productos:', error);
    }
}

export const updateProducts = async ({ id, nombre, desc, precio, imagen, esDigital }) => {
    try {
        const response = await fetch(`${API_PRODUCTOS}/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, desc, precio, imagen, esDigital })
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
        console.error('Error al actualizar el producto:', error);
    }
}
*/
export const get_genero = async (genero) => {
    try {
        const response = await fetch(`${API_PRODUCTOS}/genero`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ genero })
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

export const get_calificacion = async (calificacion) => {
    try {
        const response = await fetch(`${API_PRODUCTOS}/calificacion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ calificacion })
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

export const get_precio = async ({ precio }) => {
    try {
        const response = await fetch(`${API_PRODUCTOS}/precio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ precio })
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

export const get_producto = async (id) => {
    try {
        const response = await fetch(`${API_PRODUCTOS}/byId/${id}`, {
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
        return response
    } catch (error) {
        console.error('Error al agregar el producto:', error);
    }
} 