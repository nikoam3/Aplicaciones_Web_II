import { Router } from "express"
import {
    get_usuarios_all, get_usuarios_by_id,
    get_index_usuarios_by_id,
    get_usuario_by_email, get_usuario_by_name,
    update_usuarios_by_name,
    add_usuario, delete_usuario
} from '../utils/usuarios.utils.js'

const router = Router()

router.get('/all', (req, res) => {
    try {
        const usuarios = get_usuarios_all()
        if (usuarios.length) {
            res.status(200).json(usuarios)
        } else {
            res.status(400).json("usuarios no encontrados")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get('/byId/:id', (req, res) => {
    const id = req.params.id
    try {
        const usuario = get_usuarios_by_id(id)
        if (usuario) {
            res.status(200).json(usuario)
        } else {
            res.status(400).json(`usuario con ${id} no encontrado`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/email', (req, res) => {
    const email = req.body.email
    try {
        const usuarios = get_usuario_by_email(email)
        if (usuarios) {
            res.status(200).json(usuarios)
        } else {
            res.status(400).json(`No se encuentran usuario con email ${email}`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})


router.post('/name', (req, res) => {
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    try {
        const usuarios = get_usuario_by_name(nombre, apellido)
        if (usuarios) {
            res.status(200).json(usuarios)
        } else {
            res.status(400).json(`No se encuentran usuario con nombre ${nombre} ${apellido}`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.put('/update/name/:id', (req, res) => {
    const id = req.params.id
    const newNombre = req.body.nombre
    const newApellido = req.body.apellido

    try {
        const index = get_index_usuarios_by_id(id)
        if (index != -1) {
            update_usuarios_by_name(newNombre, newApellido, index)
            res.status(200).json(`Nombre de usuario id: ${id} actualizado correctamente`)
        } else {
            res.status(400).json(`Id: ${id} no encontrado`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//agrega un nuevo usuario
router.put('/add', (req, res) => {
    const newId = req.body.id
    const newNombre = req.body.nombre
    const newApellido = req.body.apellido
    const newEmail = req.body.email
    const newContraseña = req.body.contraseña

    const newusuario = {
        id: newId,
        nombre: newNombre,
        apellido: newApellido,
        email: newEmail,
        contraseña: newContraseña,
    }

    try {
        if (newId) {
            add_usuario(newusuario)
            res.status(200).json(`usuario ${newNombre} agregado correctamente`)
        } else {
            res.status(400).json(`Error al agregar nuevo usuario`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//elimina un usuario 
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    try {
        const index = get_index_usuarios_by_id(id)
        if (index != -1) {
            delete_usuario(id)
            res.status(200).json(`Id: ${id} eliminado correctamente`)
        } else {
            res.status(400).json(`Id: ${id} no encontrado`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

export default router