export const renderProductos = (data) => {
    return `
        <tr>
            <th scope="row">${data.nombre}</th>
            <td>${data.desc}</td>
            <td>${data.genero}</td>
            <td>${data.calif}</td>
            <td>${data.precio}</td>
            <td><input class="form-check-input" type="checkbox" id="${data.id}" value="" aria-label="${data.id}"></td>
        </tr>`
}

