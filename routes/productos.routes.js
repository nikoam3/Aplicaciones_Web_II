import { Router } from "express"
import {
    get_productos_all, get_productos_by_id,
    get_productos_by_price, get_productos_by_digital,
    get_productos_by_genero, add_producto,
    delete_producto, update_productos,
    get_productos_by_calificacion
} from '../utils/productos.utils.js'

const router = Router()

router.get('/all', async (req, res) => {
    try {
        const productos = await get_productos_all()
        if (productos.length) {
            res.status(200).json(productos)
        } else {
            res.status(400).json("Productos no encontrados")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    try {
        const producto = await get_productos_by_id(id)
        if (producto) {
            res.status(200).json(producto)
        } else {
            res.status(400).json(`Producto con ${id} no encontrado`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/precio', async (req, res) => {
    const precio = req.body.precio
    try {
        const productos = await get_productos_by_price(precio)
        if (productos.length) {
            res.status(200).json(productos)
        } else {
            res.status(400).json(`No se encuentran productos por debajo del precio $ ${precio}`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/digital', async (req, res) => {
    const digital = req.body.esDigital
    try {
        const productos = await get_productos_by_digital(digital)
        if (productos.length) {
            res.status(200).json(productos)
        } else {
            res.status(400).json(`${digital} valor incorrecto, solo se acepta true o false.`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/genero', async (req, res) => {
    const genero = req.body.genero
    try {
        const productos = await get_productos_by_genero(genero)
        if (productos.length) {
            res.status(200).json(productos)
        } else {
            res.status(400).json(`Género incorrecto.`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/calificacion', async (req, res) => {
    const calificacion = req.body.calificacion
    try {
        const productos = await get_productos_by_calificacion(calificacion)
        if (productos.length) {
            res.status(200).json(productos)
        } else {
            res.status(400).json(`Género incorrecto.`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.put('/update/:id', async (req, res) => {
    const id = req.params.id
    const newNombre = req.body.nombre
    const newDesc = req.body.desc
    const newPrecio = req.body.precio
    const newImagen = req.body.imagen
    const newEsDigital = req.body.esDigital
    const newGenero= req.body.genero
    const newCalif = req.body.calif

    const newProducto = {
        nombre: newNombre,
        desc: newDesc,
        precio: newPrecio,
        imagen: newImagen,
        esDigital: newEsDigital,
        genero: newGenero,
        calif: newCalif
    }

    try {
        const index = await get_productos_by_id(id, true)
        if (index != -1) {
            await update_productos(newProducto, index)
            res.status(200).json(`Producto ${newProducto.nombre} modificado correctamente`)
        } else {
            res.status(400).json(`Error al agregar nuevo producto`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/add', async (req, res) => {
    const newId = req.body.id
    const newNombre = req.body.nombre
    const newDesc = req.body.desc
    const newPrecio = req.body.precio
    const newImagen = req.body.imagen
    const newEsDigital = req.body.esDigital
    const newGenero= req.body.genero
    const newCalif = req.body.calif

    const newProducto = {
        id: newId,
        nombre: newNombre,
        desc: newDesc,
        precio: newPrecio,
        imagen: newImagen,
        esDigital: newEsDigital,
        genero: newGenero,
        calif: newCalif
    }

    try {
        if (newId) {
            await add_producto(newProducto)
            res.status(200).json(`Producto ${newNombre} agregado correctamente`)
        } else {
            res.status(400).json(`Error al agregar nuevo producto`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    try {
        const index = await get_productos_by_id(id, true)
        if (index != -1) {
            await delete_producto(index)
            res.status(200).json(`${id} eliminado correctamente`)
        } else {
            res.status(400).json(`Id: ${id} no encontrado`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

export default router