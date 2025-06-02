import { Router } from "express"
import {
    get_ventas_all, get_ventas_by_id,
    update_ventas, add_venta,
    delete_venta, get_detail_ventas,
    get_detail_by_id_user_ventas
} from '../controllers/ventas.controller.js'
import { validarVentaAdd, validarVentaById, validarVentaUpdate } from '../middleware/ventas.middleware.js'
//crear instancia
const router = Router()

//definicion de rutas
//devuelve todos los ventas del json
router.get('/all', get_ventas_all)

//devuelve la venta o indice por id
router.get('/byId/:_id', validarVentaById, get_ventas_by_id)

//devuelve el detalle de los productos de todas las ventas
router.get('/detail/', get_detail_ventas)

//devuelve el detalle de los productos de todas las ventas por ID de usuario
router.get('/detailByIdUser/:_id', validarVentaById, get_detail_by_id_user_ventas)

//actualiza la venta de los atributos que recibe por body
router.put('/update/:_id', validarVentaUpdate, update_ventas)

//agrega una nueva venta
router.post('/add', validarVentaAdd, add_venta)

//elimina un venta
router.delete('/delete/:_id', validarVentaById, delete_venta)

export default router