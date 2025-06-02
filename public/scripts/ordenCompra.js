import { addVentas, loadVentas } from "../api/ventas.js";
import { renderCardsCarro } from "../components/cardsCarro.js";
import { getCarrito, addCompraOk } from "../utils/localStorage.js";
import { getUserDetails } from "../utils/sessionStorage.js";
import { alert } from "../components/alerts.js";

document.addEventListener('DOMContentLoaded', (e) => {
    const cardsCarro = document.getElementById('cardsCarro')
    const precioTotalHTML = document.getElementById('precioTotal')
    const productosCarro = getCarrito()
    let precioTotal = 0

    productosCarro.forEach(producto => {
        cardsCarro.innerHTML += renderCardsCarro(producto)
        precioTotal += producto.precio
    })
    precioTotalHTML.innerHTML = Math.round(parseFloat(precioTotal, 2))
})

document.getElementById('botonComprar').addEventListener('click', async (e) => {
    try {
        const productosCarro = getCarrito()
        const infoUser = await getUserDetails()
        const id_usuario = infoUser._id
        const total = document.getElementById('precioTotal').textContent
        const direccion = infoUser.direccion
        const completada = false
        const productos = productosCarro.map(producto => producto._id)

        const compraItem = {
            id_usuario: id_usuario,
            total: total,
            direccion: direccion,
            completada: completada,
            productos: productos
        }
        const ventaOk = await addVentas(compraItem)
        if (ventaOk) {
            addCompraOk(ventaOk)
            window.location.href = '../pages/compraRealizada.html'
        }
    } catch (error) {
        console.error('Ocurrió un error en la compra.', error);
        document.getElementById('alertCompra').innerHTML = alert('Ocurrió un error en la compra, intentar nuevamente.', 'warning');
    }
})
