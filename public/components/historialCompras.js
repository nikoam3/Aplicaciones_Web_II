export const renderHistorialCompras = (data, arrayProducto) => {
    return `<tr>
                <td>${data.id}</td>
                <td>${data.fecha}</td>
                <td>${data.direccion}</td>
                <td>${data.completada ? "Entregado" : "Preparando envío"}</td>
                <td>
                    <ul>
                        ${arrayProducto.map(p=> 
                           `<li>${p.nombre}</li>`
                        ).join('')} 
                    </ul>
                </td>
                <td>${data.total}</td>
            </tr>`
}

