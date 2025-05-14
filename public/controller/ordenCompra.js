import { addVentas, loadVentas } from "../api/ventas.js";
import { renderCardsCarro } from "../components/cardsCarro.js";
import { getCarrito, getSession, addCompraOk } from "../utils/sessionStorage.js";

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
    const productosCarro = getCarrito()
    const infoUser = getSession()
    const id = (await loadVentas()).length
    const id_usuario = infoUser.id
    const fecha = new Date()
    const total = document.getElementById('precioTotal').textContent
    const direccion = infoUser.direccion
    const completada = false
    const productos = productosCarro.map(producto => producto.id)

    const compraItem = {
        id: id,
        id_usuario: id_usuario,
        fecha: fecha,
        total: total,
        direccion: direccion,
        completada: completada,
        productos: productos
    }

    const ventaOk = await addVentas(compraItem)

    if (ventaOk) {
        addCompraOk(compraItem)
        window.location.href = '../pages/compraRealizada.html'
    }
})
