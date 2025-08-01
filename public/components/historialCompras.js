export const renderHistorialCompras = (data) => {
    return `<div class="col-12 mb-4">
                <div class="card">
                    <div class="card-header">
                        <strong>Compra #${data._id}</strong> - ${new Date(data.fecha).toLocaleString()}
                    </div>
                    <div class="card-body">
                        <p><strong>Dirección:</strong> ${data.direccion}</p>
                        <p><strong>Estado:</strong> ${data.completada ? "Entregado" : "Preparando envío"}</p>
                        <p><strong>Total:</strong> $${data.total.toFixed(2)}</p>
                        <h6>Productos:</h6>
                        <ul class="list-group">
                            ${data.productos.map(p => `
                            <li class="list-group-item d-flex align-items-center">
                                <img src="${p.imagen || 'https://via.placeholder.com/50x75?text=Sin+Imagen'}"
                                    class="card-img-small me-3" alt="${p.nombre}">
                                <div class="flex-grow-1">
                                    <strong>${p.nombre}</strong> - $${p.precio}
                                        <div class="product-rating">
                                            <div class="rating" productId="${p._id}">
                                                <span class="star" data-value="1">★</span>
                                                <span class="star" data-value="2">★</span>
                                                <span class="star" data-value="3">★</span>
                                                <span class="star" data-value="4">★</span>
                                                <span class="star" data-value="5">★</span>
                                                <p>Valoración actual: <span class="current-rating-display" id=${p._id}>0</span></p>
                                            </div>
                                        </div>
                                </div>
                            </li>
                            `).join("")}
                        </ul>
                    </div>
                </div>
            </div>`
}
