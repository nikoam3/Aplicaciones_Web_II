export const renderItemsCarro = (data) => {
    return `
    <ul class="list-group list-group-horizontal align-items-center mb-2">
        <li class="list-group-item border-0 p-0" style="width: 60px;">
            <img src="${data.imagen}" alt="${data.nombre}" class="img-fluid" style="width: 50px; height: 75px; object-fit: cover;">
        </li>
        <li class="list-group-item border-0 flex-fill">${data.nombre}</li>
        <li class="list-group-item border-0" style="width: 80px; text-align: right;">$${data.precio}</li>
    </ul>
`
}