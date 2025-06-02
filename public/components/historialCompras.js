export const renderHistorialCompras = (data) => {
    return `<tr>
                <td>${data._id}</td>
                <td>${data.fecha}</td>
                <td>${data.direccion}</td>
                <td>${data.completada ? "Entregado" : "Preparando envío"}</td>
                <td>
                    <ul>
                        ${data.productos.map(p=> 
                           `<li>${p.nombre}</li>`
                        ).join('')} 
                    </ul>
                </td>
                <td>${data.total}</td>
            </tr>`
}

