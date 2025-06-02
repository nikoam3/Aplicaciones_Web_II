import { loadVentasByIdUser } from "../api/ventas.js";
import { renderHistorialCompras } from "../components/historialCompras.js";
import { getUserDetails } from "../utils/sessionStorage.js";
import { get_producto } from '../api/productos.js'

document.addEventListener('DOMContentLoaded', async (e) => {
    const tableHistorialCompras = document.getElementById('tableHistorialCompras')
    const user = await getUserDetails()
    const historialCompras = await loadVentasByIdUser(user._id)

    historialCompras.forEach(async compra => {
        tableHistorialCompras.innerHTML += renderHistorialCompras(compra)
    })
})