import { Router } from "express"
import {
    get_ventas_all, get_ventas_by_id,
    get_index_ventas_by_id, get_ventas_by_date,
    get_venta_by_total, get_detail_ventas_by_productos,
    update_ventas_by_usuario, update_ventas_by_productos,
    add_venta, delete_venta
} from '../utils/ventas.utils.js'
import { get_usuarios_by_id } from '../utils/usuarios.utils.js'
import { get_productos_by_id } from '../utils/productos.utils.js'

//crear instancia
const router = Router()

//definicion de rutas
router.get('/all', (req, res) => {
    try {
        const ventas = get_ventas_all()
        if (ventas.length) {
            res.status(200).json(ventas)
        } else {
            res.status(400).json("Ventas no encontradas")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})
router.get('/byId/:id', (req, res) => {
    const id = req.params.id
    try {
        const venta = get_ventas_by_id(id)
        if (venta) {
            res.status(200).json(venta)
        } else {
            res.status(400).json(`Venta con ${id} no encontrada`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get('/detail/', (req, res) => {
    try {
        const ventas = get_detail_ventas_by_productos()

        if (ventas.length) {
            res.status(200).json(ventas)
        } else {
            res.status(400).json(`Error al cargar datos}`)
        }
    } catch (error) {
        res.send(500).json(error.message)
    }
})

router.post('/date', (req, res) => {
    const from = req.body.from
    const to = req.body.to
    try {
        const ventas = get_ventas_by_date(from, to)
        if (ventas.length) {
            res.status(200).json(ventas)
        } else {
            res.status(400).json(`No coinciden fechas desde ${from} a ${to}`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/total', (req, res) => {
    const total = req.body.total
    try {
        const ventas = get_venta_by_total(total)
        if (ventas.length) {
            res.status(200).json(ventas)
        } else {
            res.status(400).json(`No se encuentran venta con total ${total}`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})


router.put('/update/usuario/:id', (req, res) => {
    const idVenta = req.params.id
    const idUsuario = req.body.idUsuario

    try {
        const findUsuario = get_usuarios_by_id(idUsuario)
        if (!findUsuario) {
            res.status(400).json(`Id de usuario: ${idUsuario} no existe`)
        }

        const index = get_index_ventas_by_id(idVenta)
        if (index != -1) {
            update_ventas_by_usuario(idUsuario, index)
            res.status(200).json(`Nombre de venta id: ${idUsuario} actualizado correctamente`)
        } else {
            res.status(400).json(`Id de venta: ${idVenta} no existe`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.put('/update/productos/:id', (req, res) => {
    const idVenta = req.params.id
    const idProductos = req.body.idProductos
    let arrayProductos = []
    try {
        idProductos.map(i => {
            let findproducto = get_productos_by_id(i)
            if (findproducto) {
                arrayProductos.push({ "id": findproducto.id })
            } else {
                res.status(400).json(`Id de producto: ${i} no existe`)
            }
        })

        const index = get_index_ventas_by_id(idVenta)
        if (index != -1) {
            update_ventas_by_productos(arrayProductos, index)
            res.status(200).json(`Productos de venta id: ${idVenta} actualizado correctamente`)
        } else {
            res.status(400).json(`Id de venta: ${idVenta} no existe`)
        }
    }
    catch (error) {
        res.status(500).json(error.message)
    }
})

router.put('/add', (req, res) => {
    const newId = req.body.id
    const newIdUsuario = req.body.id_usuario
    const newFecha = req.body.fecha
    const newTotal = req.body.total
    const newDireccion = req.body.direccion
    const newCompletada = req.body.completada
    const newProductos = req.body.productos
    let arrayProductos = []

    try {
        const findUsuario = get_usuarios_by_id(newIdUsuario)
        if (!findUsuario) {
            res.status(400).json(`Id de usuario: ${newIdUsuario} no existe`)
        }
        if (newProductos.length) {
            newProductos.map(i => {
                let findproducto = get_productos_by_id(i)
                if (findproducto) {
                    arrayProductos.push({ "id": findproducto.id })
                } else {
                    res.status(400).json(`Id de producto: ${i} no existe`)
                }
            }
            )
        }
        else {
            res.status(400).json(`Se deben agregar productos.`)
        }

        const newventa = {
            id: newId,
            id_usuario: newIdUsuario,
            fecha: newFecha,
            total: newTotal,
            direccion: newDireccion,
            completada: newCompletada,
            productos: arrayProductos
        }
        add_venta(newventa)
        res.status(200).json(`Venta agregada correctamente`)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
    try {
        if (newId) {
            add_venta(newventa)
            res.status(200).json(`venta ${newNombre} agregado correctamente`)
        } else {
            res.status(400).json(`Error al agregar nuevo venta`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    try {
        const index = get_index_ventas_by_id(id)
        if (index != -1) {
            delete_venta(id)
            res.status(200).json(`Id: ${id} eliminado correctamente`)
        } else {
            res.status(400).json(`Id: ${id} no encontrado`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

export default router