import { Router } from "express"
import {
    get_productos_all, get_productos_by_id,
    get_productos_by_price, get_productos_by_digital,
    get_index_productos_by_id, update_productos_by_price,
    add_producto, delete_producto
} from '../utils/productos.utils.js'

const router = Router()

router.get('/all', (req, res) => {
    try {
        const productos = get_productos_all()
        if (productos.length) {
            res.status(200).json(productos)
        } else {
            res.status(400).json("Productos no encontrados")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get('/byId/:id', (req, res) => {
    const id = req.params.id
    try {
        const producto = get_productos_by_id(id)
        if (producto) {
            res.status(200).json(producto)
        } else {
            res.status(400).json(`Producto con ${id} no encontrado`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/precio', (req, res) => {
    const precio = req.body.precio
    try {
        const productos = get_productos_by_price(precio)
        if (productos.length) {
            res.status(200).json(productos)
        } else {
            res.status(400).json(`No se encuentran productos por debajo del precio $ ${precio}`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/digital/', (req, res) => {
    const digital = req.body.esDigital
    try {
        const productos = get_productos_by_digital(digital)
        if (productos.length) {
            res.status(200).json(productos)
        } else {
            res.status(400).json(`${digital} valor incorrecto, solo se acepta true o false.`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.put('/update/precio/:id', (req, res) => {
    const id = req.params.id
    const newPrecio = req.body.precio
    try {
        const index = get_index_productos_by_id(id)
        if (index != -1) {
            update_productos_by_price(newPrecio, index)
            res.status(200).json(`Precio de producto id: ${id} actualizado correctamente`)
        } else {
            res.status(400).json(`${id} no encontrado`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.put('/add', (req, res) => {
    const newId = req.body.id
    const newNombre = req.body.nombre
    const newDesc = req.body.desc
    const newPrecio = req.body.precio
    const newImagen = req.body.imagen
    const newEsDigital = req.body.esDigital

    const newProducto = {
        id: newId,
        nombre: newNombre,
        desc: newDesc,
        precio: newPrecio,
        imagen: newImagen,
        esDigital: newEsDigital
    }

    try {
        if (newId) {
            add_producto(newProducto)
            res.status(200).json(`Producto ${newNombre} agregado correctamente`)
        } else {
            res.status(400).json(`Error al agregar nuevo producto`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    try {
        const index = get_index_productos_by_id(id)
        if (index != -1) {
            delete_producto(id)
            res.status(200).json(`${id} eliminado correctamente`)
        } else {
            res.status(400).json(`Id: ${id} no encontrado`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

export default router