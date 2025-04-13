import { readFile, writeFile } from 'fs/promises'
import { get_usuarios_by_id } from '../utils/usuarios.utils.js'
import { get_productos_by_id } from '../utils/productos.utils.js'

const data = await readFile('./Data/ventas.json', 'utf-8')
const ventas = JSON.parse(data)


//devuelve todos los ventas del json
export const get_ventas_all = () => {
    return ventas
}

//devuelve el venta por id
export const get_ventas_by_id = (id) => {
    return ventas.find(u => u.id == id)
}

//devuelve la ubicacion del indice a traves del ID en el json 
export const get_index_ventas_by_id = (id) => {
    return ventas.findIndex(u => u.id == id)
}

//devuelve las ventas dentro de un rango de fechas
export const get_ventas_by_date = (from, to) => {
    return ventas.filter(v => v.fecha >= from && v.fecha <= to)
}

//devuelve las ventas por debajo del total
export const get_venta_by_total = (total) => {
    return ventas.filter(u => u.total <= total)
}

//devuelve el detalle de los productos de todas las ventas
export const get_detail_ventas_by_productos = () => {
    const ventas = get_ventas_all()
    let results  = ventas.map(v => {
        const usuario = get_usuarios_by_id(v.id_usuario)
        const nombreUsuario = `${usuario.nombre} ${usuario.apellido}`

        return {
            id: v.id,
            id_usuario: nombreUsuario,
            fecha: v.fecha,
            total: v.total,
            direccion: v.direccion,
            completada: v.completada,
            productos: v.productos.map(vp => {
                return get_productos_by_id(vp.id).nombre
            })
        }
    })
    return results
}

//actualiza el usuario de la venta
export const update_ventas_by_usuario = (idUsuario, index) => {
    const ventas = get_ventas_all()
    ventas[index].id_usuario = idUsuario
    writeFile('./Data/ventas.json', JSON.stringify(ventas, null, 2))
}

//actuailza el o los productos de la venta
export const update_ventas_by_productos = (idProductos, index) => {
    const ventas = get_ventas_all()
    ventas[index].productos = idProductos
    writeFile('./Data/ventas.json', JSON.stringify(ventas, null, 2))
}
//agrega un nuevo venta
export const add_venta = (newventa) => {
    const ventas = get_ventas_all()
    ventas.push(newventa)
    writeFile('./Data/ventas.json', JSON.stringify(ventas, null, 2))
}

//elimina un venta 
export const delete_venta = (index) => {
    const ventas = get_ventas_all()
    ventas.splice(index, 1)
    writeFile('./Data/ventas.json', JSON.stringify(ventas, null, 2))
}
