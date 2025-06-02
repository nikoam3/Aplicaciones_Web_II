import { body, param, validationResult } from 'express-validator';
import Usuarios from '../DB/models/usuarios.models.js';
import Productos from '../DB/models/productos.models.js';
import mongoose from 'mongoose';

export const validarVentaAdd = [
    body('id_usuario')
        .isMongoId()
        .notEmpty()
        .withMessage('El Id de usuario debería ser un ID de MongoDB no vacío').
        custom(async (value) => {
            const usuario = await Usuarios.findById({ _id: value });
            if (!usuario) {
                throw new Error(`El usuario con ID ${value} no existe`);
            }
            return true;
        }),
    body('total')
        .isFloat({ min: 0 })
        .notEmpty()
        .withMessage('El total debe ser un número positivo, no vacío'),
    body('direccion')
        .isString()
        .notEmpty()
        .withMessage('La dirección no debe estar vacía'),
    body('productos')
        .isArray({ min: 1 })
        .withMessage('Debe proporcionarse al menos un producto')
        .custom(async (productos) => {
            // Verificar que todos los IDs sean ObjectId válidos
            if (!productos.every((_id) => mongoose.isValidObjectId(_id))) {
                throw new Error('Uno o más IDs de productos no son ObjectId válidos');
            }
            // Verificar que todos los productos existan
            const productosExistentes = await Productos.find({ _id: { $in: productos } });
            if (productosExistentes.length !== productos.length) {
                throw new Error('Uno o más productos no existen');
            }
            return true;
        }),
    body('completada')
        .optional()
        .isBoolean()
        .withMessage('El campo completada debe ser un booleano'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Datos inválidos', errors: errors.array() });
        }
        next();
    },
];

export const validarVentaUpdate = [
    param('_id')
        .isMongoId()
        .notEmpty()
        .withMessage('El ID debe ser un ID de MongoDB válido'),
    body('id_usuario')
        .isMongoId()
        .optional()
        .withMessage('El Id de usuario debería ser un ID de MongoDB no vacío').
        custom(async (value) => {
            const usuario = await Usuarios.findById({ _id: value });
            if (!usuario) {
                throw new Error(`El usuario con ID ${value} no existe`);
            }
            return true;
        }),
    body('total')
        .isFloat({ min: 0 })
        .optional()
        .withMessage('El total debe ser un número positivo, no vacío'),
    body('direccion')
        .isString()
        .optional()
        .withMessage('La dirección no debe estar vacía'),
    body('productos')
        .optional()
        .isArray({ min: 1 })
        .withMessage('Debe proporcionarse al menos un producto')
        .custom(async (productos) => {
            // Verificar que todos los IDs sean ObjectId válidos
            if (!productos.every((id) => mongoose.isValidObjectId(id))) {
                throw new Error('Uno o más IDs de productos no son ObjectId válidos');
            }
            // Verificar que todos los productos existan
            const productosExistentes = await Productos.find({ _id: { $in: productos } });
            if (productosExistentes.length !== productos.length) {
                throw new Error('Uno o más productos no existen');
            }
            return true;
        }),
    body('completada')
        .optional()
        .isBoolean()
        .withMessage('El campo completada debe ser un booleano'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Datos inválidos', errors: errors.array() });
        }
        next();
    },
];

export const validarVentaById = [
    param('_id')
        .isMongoId()
        .notEmpty()
        .withMessage('El ID debe ser una cadena no vacía'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Datos inválidos', errors: errors.array() });
        }
        next();
    },
];
