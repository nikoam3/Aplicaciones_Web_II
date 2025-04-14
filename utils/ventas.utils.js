import { readFile, writeFile } from 'fs/promises'
import { get_usuarios_by_id } from '../utils/usuarios.utils.js'
import { get_productos_by_id } from '../utils/productos.utils.js'

//devuelve todos los ventas del json
export const get_ventas_all = async () => {
    try {
        const data = await readFile('./Data/ventas.json', 'utf-8')
        const ventas = JSON.parse(data)
        return ventas
    } catch (error) {
        console.error(error)
    }
}

//devuelve el venta o indice por id
export const get_ventas_by_id = async (id, index) => {
    const ventas = await get_ventas_all()
    try {
        if (index) {
            return ventas.findIndex(u => u.id == id)
        } else {
            return ventas.find(u => u.id == id)
        }
    } catch (error) {
        console.error(error)
    }
}

//devuelve las ventas dentro de un rango de fechas
export const get_ventas_by_date = async (from, to) => {
    try {
        const ventas = await get_ventas_all()
        return ventas.filter(v => v.fecha >= from && v.fecha <= to)
    } catch (error) {
        console.error(error)
    }
}

//devuelve las ventas por debajo del total
export const get_venta_by_total = async (total) => {
    try {
        const ventas = await get_ventas_all()
        return ventas.filter(u => u.total <= total)
    } catch (error) {
        console.error(error)
    }
}

//devuelve el detalle de los productos de todas las ventas
export const get_detail_ventas_by_productos = async () => {
    const ventas = await get_ventas_all()
    try {
        let results = await Promise.all(ventas.map(async v => {
            const usuario = await get_usuarios_by_id(v.id_usuario)
            const nombreUsuario = `${usuario.nombre} ${usuario.apellido}`

            return {
                id: v.id,
                id_usuario: nombreUsuario,
                fecha: v.fecha,
                total: v.total,
                direccion: v.direccion,
                completada: v.completada,
                productos: await Promise.all(v.productos.map(async vp => {
                    const nombres = await get_productos_by_id(vp.id)
                    return nombres.nombre
                }))
            }
        }))
        return results
    } catch (error) {
        console.error(error)
    }
}

//actualiza el usuario de la venta
export const update_ventas_by_usuario = async (idUsuario, index) => {
    try {
        let ventas = await get_ventas_all()
        ventas[index].id_usuario = idUsuario
        await writeFile('./Data/ventas.json', JSON.stringify(ventas, null, 2))
    } catch (error) {
        console.error(error)
    }
}

//actuailza el o los productos de la venta
export const update_ventas_by_productos = async (idProductos, index) => {
    try {
        const ventas = await get_ventas_all()
        ventas[index].productos = idProductos
        await writeFile('./Data/ventas.json', JSON.stringify(ventas, null, 2))
    } catch (error) {
        console.error(error)
    }
}
//agrega un nuevo venta
export const add_venta = async (newventa) => {
    try {
        let ventas = await get_ventas_all()
        ventas.push(newventa)
        await writeFile('./Data/ventas.json', JSON.stringify(ventas, null, 2))
    } catch (error) {
        console.error(error)
    }
}

//elimina un venta 
export const delete_venta = async (index) => {
    try {
        const ventas = await get_ventas_all()
        ventas.splice(index, 1)
        await writeFile('./Data/ventas.json', JSON.stringify(ventas, null, 2))
    } catch (error) {
        console.error(error)
    }
}
