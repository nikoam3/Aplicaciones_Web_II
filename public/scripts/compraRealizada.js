import { renderCompraRealizada } from "../components/compraRealizada.js";
import { getUserDetails } from "../utils/sessionStorage.js";
import { getCompraOk, getCarrito, clearCarrito, clearCompraOk } from "../utils/localStorage.js";


document.addEventListener('DOMContentLoaded', async () => {
    const compraOk = getCompraOk()
    const infoUser = await getUserDetails()
    const carrito = getCarrito()
    const resumenCompra = document.getElementById('resumenCompra')
    resumenCompra.innerHTML += renderCompraRealizada(compraOk, carrito, infoUser)
    clearCarrito()
    clearCompraOk()
})
