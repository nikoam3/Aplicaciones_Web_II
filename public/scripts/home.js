import { getUserDetails } from "../utils/sessionStorage.js";
import { getUniqueGenero, getUniqueCalificacion } from "../utils/getUnique.js";
import { addCarrito, getCarrito, clearCarrito } from "../utils/localStorage.js";
import { renderProductos } from "../components/loadProductos.js";
import { modalFiltroCalificacion, modalFiltroGenero } from "../components/modelFiltros.js";
import { alert } from "../components/alerts.js";
import { renderItemsCarro } from "../components/itemsCarro.js";
import { loadProducts, productosSearch } from "../api/productos.js";

const modalFilterGenero = document.getElementById('filterGenero')
const modalFilterCalificacion = document.getElementById('filterCalificacion')

document.getElementById('limpiarFiltros').addEventListener('click', async (e) => {
    loadProductosGrid(await loadProducts())
})

document.getElementById('clearCart').addEventListener('click', (e) => {
    clearCarrito()
    /*const offcanvas = document.getElementById('offcanvasWithBothOptions');
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
    if (bsOffcanvas) {
        bsOffcanvas.hide();
    }*/
    const cartTotal = document.getElementById('cartTotal')
    cartTotal.innerText = `Total: $0.00`;
    showCarrito();
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
        arrayProductoFiltrados = arrayProductoFiltrados.filter(producto => producto.calificacion == selectCalif)
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
    loadProductosGrid(arrayProductoFiltrados)
})

const loadProductosGrid = (data) => {
    setFilters(data)
    const grid = document.getElementById('gridProductos');
    grid.innerHTML = ''
    data.map((producto) => {
        grid.innerHTML += renderProductos(producto)
    }).join('')
}

const setFilters = (allProductos) => {
    const arrayUniqueGenero = getUniqueGenero(allProductos)
    const arrayUniqueCalificacion = getUniqueCalificacion(allProductos)
    modalFilterGenero.innerHTML = modalFiltroGenero(arrayUniqueGenero)
    modalFilterCalificacion.innerHTML = modalFiltroCalificacion(arrayUniqueCalificacion)
}

const showCarrito = async () => {
    const user = await getUserDetails();
    if (!user) {
        const cartTotal = document.getElementById('cartTotal')
        const noLogin = document.getElementById('noLogin')
        noLogin.innerHTML = `<p class="text-danger">Debe iniciar sesión para ver el carrito!</p>`
        cartTotal.innerText = `Total: $0.00`;
        document.getElementById('clearCart').hidden = true;
        document.getElementById('confirmCompra').hidden = true;
    }
    else {
        const cart = getCarrito()
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal')
        document.getElementById('noLogin').hidden = true;
        document.getElementById('clearCart').hidden = false;
        document.getElementById('confirmCompra').hidden = false;
        let total = 0;
        cartItems.innerHTML = ''
        if (cart) {
            cart.map((item) => {
                cartItems.innerHTML += renderItemsCarro(item)
                total += parseFloat(item.precio);
            }).join('')
            cartTotal.innerText = `Total: $${total.toFixed(2)}`;
        }
    }
}

document.getElementById("searchForm").addEventListener("input", async (e) => {
    const searchInput = document.getElementById("searchNombre").value;
    if (searchInput) {
        let productSearch = await productosSearch(searchInput);
        loadProductosGrid(productSearch);
    }
    else {
        loadProductosGrid(await loadProducts());
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    const allProductos = await loadProducts()
    if (allProductos) {
        loadProductosGrid(allProductos)
    } else {
        gridProductos.innerHTML = "<p class='col-12'>No se encontraron productos</p>";
    }
})

document.getElementById('showCarrito').addEventListener('click', async (e) => {
    showCarrito();
})

document.getElementById('gridProductos').addEventListener('click', async (e) => {
    if (e.target.getAttribute('buttonAddCart') === 'buttonAddCart') {

        const user = await getUserDetails();
        if (!user) {
            alert('Debe iniciar sesión para agregar productos al carrito', 'warning');
        } else {
            const productoId = e.target.getAttribute('dataId') || e.target.parentElement.getAttribute('dataId');
            const productoNombre = e.target.getAttribute('dataNombre') || e.target.parentElement.getAttribute('dataNombre');
            const productoPrecio = e.target.getAttribute('dataPrecio') || e.target.parentElement.getAttribute('dataPrecio');
            const productoImagen = e.target.getAttribute('dataImagen') || e.target.parentElement.getAttribute('dataImagen');
            const cart = getCarrito();

            if (cart === null) {
                addCarrito([{
                    _id: productoId,
                    nombre: productoNombre,
                    precio: productoPrecio,
                    imagen: productoImagen
                }]);
            } else if (!cart.find(item => item._id === productoId)) {
                cart.push({
                    _id: productoId,
                    nombre: productoNombre,
                    precio: productoPrecio,
                    imagen: productoImagen
                });
                addCarrito(cart);
            }
        }
        showCarrito();
    }
})
document.getElementById('confirmCompra').addEventListener('click', async (e) => {
    const cart = getCarrito();
    addCarrito(cart)
    window.location.href = `${window.location.origin}/public/pages/ordenCompra.html`;
})