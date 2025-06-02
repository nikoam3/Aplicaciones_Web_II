export const renderProductos = (data) => {
    return `
        <tr>
            <th scope="row">${data.nombre}</th>
            <td>${data.descripcion}</td>
            <td>${data.genero}</td>
            <td>${data.calificacion}</td>
            <td>${data.precio}</td>
            <td><input class="form-check-input" type="checkbox" id="${data._id}" value="" aria-label="${data._id}"></td>
        </tr>`
}

