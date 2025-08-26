export const renderProductos = (p) => {
  return `
            <div class="col-md-4 mb-4">
              <div class="card h-100 position-relative" id="producto-${p._id}">
                  <button class="btn btn-sm btn-success position-absolute top-0 end-0 m-1 cart-btn" buttonAddCart='buttonAddCart'
                      dataId="${p._id}" dataNombre="${p.nombre}" dataPrecio="${p.precio}", dataImagen="${p.imagen}" data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                      <i class="fa-solid fa-cart-shopping fa-lg" buttonAddCart='buttonAddCart'></i>
                  </button>
                  <img src="${p.imagen || 'https://via.placeholder.com/300x200?text=Sin+Imagen'}" class="card-img-top"
                      alt="${p.nombre}">

                  <div class="card-body" id="card-body">
                      <h5 class="card-title">${p.nombre}</h5>
                      <p class="card-text">
                          <strong>Género:</strong> ${p.genero}<br>
                          <strong>Precio:</strong> $${p.precio}<br>
                          <strong>Calificación:</strong> ${p.calificacion}<br>
                          <strong>Formato:</strong> ${p.esDigital ? "Digital" : "Físico"}<br>
                          <strong>Promedio:</strong> ${p.promedioValoraciones || 0} ${renderEstrellas(p.promedioValoraciones ||
                          0)}
                      </p>
                      <p class="card-text"><strong>Descripción:</strong> ${p.descripcion || "Sin descripción"}</p>
                  </div>
              </div>
          </div>
          `;
}

function renderEstrellas(puntuacion) {
  let estrellas = '';
  for (let i = 0; i < 5; i++) {
    estrellas += i < Math.round(puntuacion) ? '<span class="star-filled">★</span>' : '<span class="star-empty">☆</span>';
  }
  return estrellas;
}

