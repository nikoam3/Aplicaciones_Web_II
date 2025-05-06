export const renderCompraRealizada = (compraOk, carrito, infoUser) => {
    return `
        <div class="container mt-5 border">
                <h3 class="alert-heading">¡Muchas gracias ${infoUser.nombre} por la confiar en nosotros!</h3>
                <p>Tu pedido ha sido procesado y se enviará a la dirección proporcionada.</p>
                <div class="d-flex flex-direction-column justify-content-evenly align-items-center">
                    <div class="text-start">
                        <h5>Detalle Envío:</h5>
                        <p class="mb-0">Nombre: ${infoUser.nombre}</p>
                        <p class="mb-0">Email: ${infoUser.email}</p>
                        <p class="mb-0">Teléfono: ${infoUser.telefono}</p>
                        <p class="mb-0">Dirección: ${infoUser.direccion}</p>
                    </div>
                    <div class="text-start">
                        <h5>Detalle Productos:</h5>
                        <p class="mb-0">Nro de compra: ${compraOk.id}</p>
                        <p class="mb-0">Fecha: ${compraOk.fecha}</p>
                        <ul class="mb-0">Películas:
                            ${carrito.map(producto =>
                                `<li class="mb-0">${producto.nombre}</li>`).join('')}
                        </ul>
                        <p class="mb-0">Total: $ ${compraOk.total}</p>
                    </div>
                </div>
                <h4>Estado de compra:</h4>
                <div class="progress m-2" role="progressbar" aria-label="Animated striped example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 25%">Preparando pedido</div>
                </div>
                <p class="m-3" >Si tienes alguna pregunta, no dudes en contactarnos.</p>
            </div>
        </div>
    `
}