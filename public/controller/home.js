import { getSession } from "../utils/sessionStorage.js";
import { getUniqueGenero, getUniqueCalificacion } from "../utils/getUnique.js";
import { addCarrito } from "../utils/sessionStorage.js";
import { renderProductos } from "../components/loadProductos.js";
import { modalFiltroCalificacion, modalFiltroGenero } from "../components/modelFiltros.js";
import { alert } from "../components/alerts.js";
import { loadProducts } from "../api/productos.js";
//import { renderNavbar } from "../components/navbar.js";

const modalFilterGenero = document.getElementById('filterGenero')
const modalFilterCalificacion = document.getElementById('filterCalificacion')

document.getElementById('limpiarFiltros').addEventListener('click', async (e) => {

    await loadProductosTable(await loadProducts())
})

document.getElementById('aplicarFiltros').addEventListener('click', async (e) => {
    const selectGenero = document.getElementById('selectFilterGenero').value
    const selectCalif = document.getElementById('selectFilterCalificacion').value
    const selectPrecio = document.getElementById('filterPrecio').value
    let arrayProductoFiltrados = await loadProducts()

    if (selectGenero) {
        arrayProductoFiltrados = arrayProductoFiltrados.filter(producto => producto.genero == selectGenero)
        let arrayUniqueCalificacion = getUniqueCalificacion(arrayProductoFiltrados)
        modalFilterCalificacion.innerHTML = modalFiltroCalificacion(arrayUniqueCalificacion)
    }
    if (selectCalif) {
        arrayProductoFiltrados = arrayProductoFiltrados.filter(producto => producto.calif == selectCalif)
        let arrayUniqueGenero = getUniqueGenero(arrayProductoFiltrados)
        modalFilterGenero.innerHTML = modalFiltroGenero(arrayUniqueGenero)
    }
    if (selectPrecio) {
        arrayProductoFiltrados = arrayProductoFiltrados.filter(producto => producto.precio <= selectPrecio)
        let arrayUniqueGenero = getUniqueGenero(arrayProductoFiltrados)
        let arrayUniqueCalificacion = getUniqueCalificacion(arrayProductoFiltrados)
        modalFilterGenero.innerHTML = modalFiltroGenero(arrayUniqueGenero)
        modalFilterCalificacion.innerHTML = modalFiltroCalificacion(arrayUniqueCalificacion)

    }
    await loadProductosTable(arrayProductoFiltrados)
})

document.getElementById('selectAll').addEventListener('change', (e) => {
    document.querySelectorAll('input').forEach((checkbox) => {
        checkbox.checked = e.target.checked;
    });
})

document.getElementById('botonAgregarCarrito').addEventListener('click', async (e) => {
    const checkSeleccionados = document.querySelectorAll('input[type="checkbox"]:checked')
    const alertCarrito = document.getElementById('alertaCarritoVacio');
    let arrayProductosSeleccionados = []
    const productos = await loadProducts()
    if (checkSeleccionados.length) {
        checkSeleccionados.forEach(check => {
            const productosSeleccionados = productos.find(p => p.id == check.id)
            arrayProductosSeleccionados.push(productosSeleccionados)
        })
        addCarrito(arrayProductosSeleccionados)
        window.location.href = '../pages/ordenCompra.html';
    }
    else {
        alertCarrito.innerHTML = alert('Seleccione un producto para agregar al carrito!', 'danger')
    }
})

const loadProductosTable = async (data) => {
    const table = document.getElementById('tableProductos');
    try {
        table.innerHTML = ''
        if (data) {
            data.map((producto) => {
                table.innerHTML += renderProductos(producto)
            }).join('')
        }
    }
    catch (error) {
        console.log('Error al cargar los productos:', error);
    }
}

const loadUser = () => {
    const user = getSession();
    const userNameElement = document.getElementById('userName');
    userNameElement.textContent = `Bienvenido ${user.nombre} ${user.apellido}`;
}

document.addEventListener('DOMContentLoaded', async () => {
    //const navbar = document.getElementById('navbar')
    //navbar.innerHTML += renderNavbar()

    loadUser()
    const allProductos = await loadProducts()
    await loadProductosTable(allProductos)
    const arrayUniqueGenero = getUniqueGenero(allProductos)
    const arrayUniqueCalificacion = getUniqueCalificacion(allProductos)
    modalFilterGenero.innerHTML = modalFiltroGenero(arrayUniqueGenero)
    modalFilterCalificacion.innerHTML = modalFiltroCalificacion(arrayUniqueCalificacion)
})
