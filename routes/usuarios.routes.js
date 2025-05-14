import { Router } from "express"
import {
    get_usuarios_all, get_usuarios_by_id,
    get_usuario_by_email, get_usuario_by_name,
    update_usuarios, get_login,
    add_usuario, delete_usuario
} from '../utils/usuarios.utils.js'

const router = Router()

router.get('/all', async (req, res) => {
    try {
        const usuarios = await get_usuarios_all()
        if (usuarios.length) {
            res.status(200).json(usuarios)
        } else {
            res.status(400).json("usuarios no encontrados")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    try {
        const usuario = await get_usuarios_by_id(id)
        if (usuario) {
            res.status(200).json(usuario)
        } else {
            res.status(400).json(`usuario con ${id} no encontrado`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/email', async (req, res) => {
    const email = req.body.email
    try {
        const usuarios = await get_usuario_by_email(email)
        if (usuarios) {
            res.status(200).json(usuarios)
        } else {
            res.status(400).json(`No se encuentran usuario con email ${email}`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})


router.post('/name', async (req, res) => {
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    try {
        const usuarios = await get_usuario_by_name(nombre, apellido)
        if (usuarios) {
            res.status(200).json(usuarios)
        } else {
            res.status(400).json(`No se encuentran usuario con nombre ${nombre} ${apellido}`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/login', async (req, res) => {
    const userName = req.body.userName
    const pass = req.body.pass
    try {
        const usuario = await get_login(userName, pass)
        if (usuario) {
            res.status(200).json(usuario)
        } else {
            res.status(400).json(`Usuario o contraseña incorrectos`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/update/:id', async (req, res) => {
    const id = req.params.id
    const { nombre, apellido, email, direccion, contraseña } = req.body

    const newusuario = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        direccion: direccion,
        contraseña: contraseña,
    }

    try {
        const index = await get_usuarios_by_id(id, true)
        if (index != -1) {
            await update_usuarios(newusuario, index)
            res.status(200).json(`Nombre de usuario id: ${id} actualizado correctamente`)
        } else {
            res.status(400).json(`Id: ${id} no encontrado`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//agrega un nuevo usuario
router.put('/add', async (req, res) => {
    const { id, nombre, apellido, email, direccion, contraseña } = req.body

    const newusuario = {
        id: id,
        nombre: nombre,
        apellido: apellido,
        email: email,
        direccion: direccion,
        contraseña: contraseña,
    }

    try {
        if (newId) {
            await add_usuario(newusuario)
            res.status(200).json(`usuario ${newNombre} agregado correctamente`)
        } else {
            res.status(400).json(`Error al agregar nuevo usuario`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//elimina un usuario 
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    try {
        const index = await get_usuarios_by_id(id, true)
        if (index != -1) {
            await delete_usuario(index)
            res.status(200).json(`Id: ${id} eliminado correctamente`)
        } else {
            res.status(400).json(`Id: ${id} no encontrado`)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

export default router