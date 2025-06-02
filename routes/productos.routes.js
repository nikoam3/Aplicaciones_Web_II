import { Router } from "express"
import {
    get_productos_all, get_productos_by_id,
    get_productos_by_price,
    get_productos_by_genero, add_producto,
    delete_producto,
    get_productos_by_calificacion
} from '../controllers/productos.controller.js'

import {
    validarProductoById, validarProductoPrecio,
    validarProductoGenero, validarProductoCalificacion,
    validarProductoAdd
} from '../middleware/productos.middleware.js'
const router = Router()

//devuelve todos los productos del json
router.get('/all', get_productos_all)

//devuelve el producto o indice por id 
router.get('/byId/:_id', validarProductoById, get_productos_by_id)

//devuelve los productos que estén por debajo o igual de un precio
router.get('/precio/:precio', validarProductoPrecio, get_productos_by_price)

//devuelvo los productos por genero
router.get('/genero/:genero', validarProductoGenero, get_productos_by_genero)

//devuelvo los productos por calificacion
router.get('/calificacion/:calificacion', validarProductoCalificacion, get_productos_by_calificacion)

//agrera un producto
router.post('/add', validarProductoAdd, add_producto)

router.delete('/delete/:_id', validarProductoById, delete_producto)

export default router