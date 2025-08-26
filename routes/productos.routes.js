import { Router } from "express"
import {
    get_productos_all, get_productos_by_id,
    get_productos_by_price,
    get_productos_by_genero, add_producto,
    delete_producto,
    get_productos_by_calificacion,
    search_productos_by_name,
    add_valoracion_product
} from '../controllers/productos.controller.js'

import {
    validarProductoById, validarProductoPrecio,
    validarProductoGenero, validarProductoCalificacion,
    validarProductoAdd, validarSearch, validarValoracion
} from '../middleware/productos.middleware.js'

import {
    verifyToken
} from '../middleware/usuarios.middleware.js'

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

//elimina un producto por id
router.delete('/delete/:_id', validarProductoById, delete_producto)

//buscador de productos por nombre
router.get("/search/:nombre", validarSearch, search_productos_by_name)

//agregar una valoración a un producto
router.post("/:_id/valoraciones", validarValoracion, validarProductoById, add_valoracion_product)

export default router