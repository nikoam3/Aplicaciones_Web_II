import { Router } from "express"
import {
    get_usuarios_all, get_usuarios_by_id,
    update_usuarios, get_login,
    add_usuario, delete_usuario
} from '../controllers/usuarios.controller.js'
import {
    validarUsuarioId, validarLogin,
    validarUsuarioNuevo, validarUsuarioModificado,
} from '../middleware/usuarios.middleware.js'
import dotenv from 'dotenv';

dotenv.config({ path: './.env' })

const router = Router()

//devuelve todos los usuarios del json
router.get('/all', get_usuarios_all)

//devuelve el usuario o indice por id
router.get('/byId/:_id', validarUsuarioId, get_usuarios_by_id)

//duelve un token si se realiza el login correctamente
router.post('/login', validarLogin, get_login)

//actualiza el nombre y apellido de los usuarios
router.put('/update/:_id', validarUsuarioModificado, update_usuarios)

//agrega un nuevo usuario
router.post('/add', validarUsuarioNuevo, add_usuario)

//elimina un usuario 
router.delete('/delete/:_id', validarUsuarioId, delete_usuario)

export default router