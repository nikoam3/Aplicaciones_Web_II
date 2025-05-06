import { renderCompraRealizada } from "../components/compraRealizada.js";
import { getSession } from "../utils/sessionStorage.js";
import { getCompraOk, getCarrito } from "../utils/sessionStorage.js";


document.addEventListener('DOMContentLoaded', () => {
    const compraOk = getCompraOk()
    const infoUser = getSession()
    const carrito = getCarrito()
    const resumenCompra = document.getElementById('resumenCompra')
    resumenCompra.innerHTML += renderCompraRealizada(compraOk, carrito, infoUser)
})
