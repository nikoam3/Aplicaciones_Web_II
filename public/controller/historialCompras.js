import { loadVentas } from "../api/ventas.js";
import { renderHistorialCompras } from "../components/historialCompras.js";
import { getSession } from "../utils/sessionStorage.js";
import { get_producto } from '../api/productos.js'

document.addEventListener('DOMContentLoaded', async (e) => {
    const tableHistorialCompras = document.getElementById('tableHistorialCompras')
    const historialCompras = await loadVentas()

    historialCompras.forEach(async compra => {
        let arrayProducto = []

        await Promise.all(compra.productos.map(async p => {
            const producto = await get_producto(p.id)
            arrayProducto.push(producto)
        }))
        
        if (compra.id_usuario == getSession().id) {
            tableHistorialCompras.innerHTML += renderHistorialCompras(compra, arrayProducto)
        }
    })
})