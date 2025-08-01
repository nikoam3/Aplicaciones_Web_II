export const renderCardsCarro = (data) => {
    return `
        <div class="card mb-3 bg-dark text-light" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${data.imagen}" class="img-fluid rounded-start" alt="${data.nombre}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${data.nombre}</h5>
                            <p class="card-text text-start">${data.descripcion}</p>
                            <p class="card-text"><small>${data.genero}</small></p>
                            <p class="card-text"><small>${data.calificacion}</small></p>
                            <p class="card-text"><small>${data.promedioValoraciones} ★</small></p>
                            <p class="card-text"><small>$${data.precio}</small></p> 
                        </div>
                    </div>
                </div>
            </div>
            `
}