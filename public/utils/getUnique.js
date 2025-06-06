
export const getUniqueGenero = (data) => {
    let arrayProductosGenero = data.map((producto) => producto.genero)
    return [...new Set(arrayProductosGenero)];
}

export const getUniqueCalificacion = (data) => {
    let arrayProductosCalificacion = data.map((producto) => producto.calificacion)
    return [...new Set(arrayProductosCalificacion)];
}
