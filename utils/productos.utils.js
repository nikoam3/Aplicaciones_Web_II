import { readFile, writeFile } from 'fs/promises'

const data = await readFile('./Data/productos.json', 'utf-8')
const productos = JSON.parse(data)

//devuelve todos los productos del json
export const get_productos_all = () => {
    return productos
}

//devuelve el producto por id
export const get_productos_by_id = (id) => {
    return productos.find(p => p.id == id)
}

//devuelve la ubicacion del indice a traves del ID en el json 
export const get_index_productos_by_id = (id) => {
    return productos.findIndex(p => p.id == id)
}

//devuelve los productos que estén por debajo de un precio
export const get_productos_by_price = (price) => {
    return productos.filter(p => p.precio <= price)
}

//devuelve los productos dependiendo de su digitalizacion (true=digital, false=fisico)
export const get_productos_by_digital = (digital) => {
    return productos.filter(p => p.esDigital == digital)
}

//actualiza el precio de los productos
export const update_productos_by_price = (newPrecio, index) => {
    const productos = get_productos_all()
    productos[index].precio = newPrecio
    writeFile('./Data/productos.json', JSON.stringify(productos, null, 2))
}

//agrega un nuevo producto
export const add_producto = (newProducto) => {
    const productos = get_productos_all()
    productos.push(newProducto)
    writeFile('./Data/productos.json', JSON.stringify(productos, null, 2))
}

//elimina un producto 
export const delete_producto = (index) => {
    const productos = get_productos_all()
    productos.splice(index, 1)            
    writeFile('./Data/productos.json', JSON.stringify(productos, null, 2))
}