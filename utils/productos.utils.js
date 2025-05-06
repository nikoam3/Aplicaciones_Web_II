import { readFile, writeFile } from 'fs/promises'

//devuelve todos los productos del json
export const get_productos_all = async () => {
    try {
        const data = await readFile('./Data/productos.json', 'utf-8')
        const productos = JSON.parse(data)
        return productos
    } catch (error) {
        console.error(error.mensaje)
    }
}

//devuelve el producto o indice por id 
export const get_productos_by_id = async (id, index) => {
    try {
        const productos = await get_productos_all()
        if (index) {
            return productos.findIndex(p => p.id == id)
        } else {
            return productos.find(p => p.id == id)
        }
    } catch (error) {
        console.error(error.mensaje)
    }
}

//devuelve los productos que estén por debajo de un precio
export const get_productos_by_price = async (genero) => {
    try {
        const productos = await get_productos_all()
        return productos.filter(p => p.precio <= genero)
    } catch (error) {
        console.error(error.mensaje)
    }
}

//devuelve los productos dependiendo de su digitalizacion (true=digital, false=fisico)
export const get_productos_by_digital = async (digital) => {
    try {
        const productos = await get_productos_all()
        return productos.filter(p => p.esDigital == digital)
    } catch (error) {
        console.error(error.mensaje)
    }
}

//devuelvo los productos por genero
export const get_productos_by_genero = async (genero) => {
    try {
        let productos = await get_productos_all()
        return productos.filter(p => p.genero == genero)
    } catch (error) {
        console.error(error.mensaje)
    }
}

//devuelvo los productos por calificacion
export const get_productos_by_calificacion = async (calificacion) => {
    try {
        let productos = await get_productos_all()
        return productos.filter(p => p.calif == calificacion)
    } catch (error) {
        console.error(error.mensaje)
    }
}

//actualiza un producto
export const update_productos = async (newProducto, index) => {
    try {
        let productos = await get_productos_all()
        productos[index].nombre = newProducto.nombre
        productos[index].desc = newProducto.desc
        productos[index].precio = newProducto.precio
        productos[index].imagen = newProducto.imagen
        productos[index].esDigital = newProducto.esDigital
        productos[index].genero = newProducto.genero
        productos[index].calif = newProducto.calif
        await writeFile('./Data/productos.json', JSON.stringify(productos, null, 2))
    } catch (error) {
        console.error(error.mensaje)
    }
}

//agrega un nuevo producto
export const add_producto = async (newProducto) => {
    try {
        let productos = await get_productos_all()
        productos.push(newProducto)
        await writeFile('./Data/productos.json', JSON.stringify(productos, null, 2))
    } catch (error) {
        console.error(error.mensaje)
    }
}

//elimina un producto 
export const delete_producto = async (index) => {
    try {
        let productos = await get_productos_all()
        productos.splice(index, 1)
        await writeFile('./Data/productos.json', JSON.stringify(productos, null, 2))
    } catch (error) {
        console.error(error.mensaje)
    }
}