import Usuarios from "../DB/models/usuarios.models.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config({ path: './.env' })
const SECRET = process.env.SECRET

export const get_usuarios_all = async (req, res) => {
    try {
        const usuarios = await Usuarios.find()
        if (usuarios.length) {
            return res.status(200).json(usuarios)
        } else {
            return res.status(404).json({ message: "Usuarios no encontrados" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const get_usuarios_by_id = async (req, res) => {
    try {
        const usuario = await Usuarios.findById(req.params._id)
        if (usuario) {
            return res.status(200).json(usuario)
        } else {
            return res.status(404).json({ message: `usuario con ID ${req.params._id} no encontrado` })
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Datos inválidos', errors: messages });
        }
        return res.status(500).json({ message: error.message });
    }
}

export const get_login = async (req, res) => {
    try {
        const checkEmail = await Usuarios.findOne({ email: req.body.email })
        if (!checkEmail) {
            return res.status(404).json({ message: `Email o Contraseña incorrecta` })
        }

        const checkPass = await bcrypt.compare(req.body.pass, checkEmail.contraseña)

        if (checkPass) {
            const token = jwt.sign({ ...checkEmail }, SECRET, { expiresIn: 86400 })
            return res.status(200).json({
                token: token,
                usuario:
                {
                    _id: checkEmail._id,
                    nombre: checkEmail.nombre,
                    apellido: checkEmail.apellido,
                    email: checkEmail.email,
                    direccion: checkEmail.direccion,
                    telefono: checkEmail.telefono
                }
            })
        } else {
            return res.status(404).json({ message: `Email o Contraseña incorrecta` })
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Datos inválidos', errors: messages });
        }
        return res.status(500).json({ message: error.message });
    }
}

export const update_usuarios = async (req, res) => {
    try {
        const actualizarCampos = {};
        if (req.body.nombre) actualizarCampos.nombre = req.body.nombre;
        if (req.body.apellido) actualizarCampos.apellido = req.body.apellido;
        if (req.body.email) actualizarCampos.email = req.body.email;
        if (req.body.direccion) actualizarCampos.direccion = req.body.direccion;
        if (req.body.telefono) actualizarCampos.telefono = req.body.telefono;
        const newUsuario = await Usuarios.findByIdAndUpdate(
            req.params._id,
            { $set: actualizarCampos },
            { new: true, runValidators: true }
        );
        if (newUsuario) {
            return res.status(200).json(newUsuario);
        } else {
            return res.status(404).json({ message: `No se encontró el usuario con ID ${req.params._id}` });
        }
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: `El ID ${req.body._id} ya está en uso` });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Datos inválidos', errors: messages });
        }
        return res.status(500).json({ message: error.message });
    }
}

export const add_usuario = async (req, res) => {
    try {
        const newUsuario = await Usuarios.create(req.body)
        if (newUsuario) {
            return res.status(201).json(newUsuario);
        }
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: error.message });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Datos inválidos', errors: messages });
        }
        return res.status(500).json({ message: error.message });
    }
}

export const delete_usuario = async (req, res) => {
    const _id = req.params._id
    try {
        const usuario = await Usuarios.findByIdAndDelete({ _id });
        if (usuario) {
            return res.status(204).json(usuario);
        } else {
            return res.status(404).json({ message: `No se encontró el usuario con ID ${_id}` });
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Datos inválidos', errors: messages });
        }
        return res.status(500).json({ message: error.message });
    }
}