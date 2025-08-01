import { loadVentasByIdUser } from "../api/ventas.js";
import { renderHistorialCompras } from "../components/historialCompras.js";
import { getUserDetails } from "../utils/sessionStorage.js";
import { addValoracion } from "../api/productos.js";

document.addEventListener('DOMContentLoaded', async (e) => {
    const tableHistorialCompras = document.getElementById('historial')
    const user = await getUserDetails()
    const historialCompras = await loadVentasByIdUser(user._id)

    historialCompras.forEach(async compra => {
        tableHistorialCompras.innerHTML += renderHistorialCompras(compra)
    })

    //inicializar las valoraciones de los productos
    if (historialCompras.length > 0) {
        historialCompras.forEach(compra => {
            if (compra.productos.length > 0) {
                compra.productos.forEach(producto => {
                    let pHtml = document.getElementById(producto._id);
                    if (producto.valoraciones.length > 0) {
                        producto.valoraciones.forEach(valoracion => {
                            if (valoracion.id_usuario == user._id) {
                                pHtml.textContent = valoracion.puntuacion;
                            }
                        }
                        )
                    }
                });
            }
        });
    }

    // Inicializar las estrellas de valoración
    const productRatings = document.querySelectorAll('.product-rating');

    // Iteramos sobre cada contenedor de producto para inicializar sus estrellas
    productRatings.forEach((productRatingContainer) => {
        const ratingContainer = productRatingContainer.querySelector('.rating'); // Referencia al div.rating
        const stars = productRatingContainer.querySelectorAll('.rating .star');
        const currentRatingDisplay = productRatingContainer.querySelector('.current-rating-display');
        let currentRating = currentRatingDisplay.textContent; // Para almacenar la valoración seleccionada

        // Función para pintar las estrellas hasta el valor dado
        function highlightStars(value) {
            stars.forEach((star) => {
                if (parseInt(star.dataset.value) <= value) {
                    star.classList.add('selected');
                } else {
                    star.classList.remove('selected');
                }
            });
        }
        function updateRatingDisplay(value) {
            if (currentRatingDisplay) {
                currentRatingDisplay.textContent = value;
            }
        }
        // Inicializar la valoración actual desde el HTML
        if (currentRating > 0) {
            highlightStars(parseInt(currentRating));
        }
        // Evento mouseout para resetear el efecto de hover si no se ha seleccionado nada
        productRatingContainer.querySelector('.rating').addEventListener('mouseout', () => {
            highlightStars(currentRating); // Vuelve a pintar las estrellas según la valoración actual de ESTE producto
        });

        // Evento mouseover para el efecto de hover
        stars.forEach((star) => {
            star.addEventListener('mouseover', (e) => {
                const value = parseInt(e.target.dataset.value);
                highlightStars(value);
            });
        });

        // Evento click para seleccionar la valoración
        stars.forEach((star) => {
            star.addEventListener('click', async (e) => {
                const productId = e.target.parentElement.getAttribute('productId');
                currentRating = parseInt(e.target.dataset.value);
                const body = {
                    userId: user._id,
                    puntuacion: currentRating
                }
                try {
                    const valoracionOk = await addValoracion(productId, body)
                    if (valoracionOk.message == 'Valoración añadida') {
                        updateRatingDisplay(currentRating);
                        highlightStars(currentRating);
                    }
                }
                catch (error) {
                    console.error('Error al enviar la valoración:', error);
                }
            });
        });
    })
})