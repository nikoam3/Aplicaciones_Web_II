import jwt from 'jsonwebtoken';

import { body, param, validationResult } from 'express-validator';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' })

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1].replace(/"/g, '')

  if (!token) {
    return res.status(401).json({ message: 'Token requerido' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

export const validarUsuarioNuevo = [
  body('nombre')
    .isString()
    .notEmpty()
    .withMessage('El nombre de usuario es requerido'),
  body('apellido')
    .isString()
    .notEmpty()
    .withMessage('El apellido de usuario es requerido'),
  body('email')
    .isEmail()
    .notEmpty()
    .withMessage('El email debe ser válido'),
  body('contraseña')
    .isLength({ min: 2 })
    .notEmpty()
    .isString()
    .withMessage('La contraseña debe tener al menos 3 caracteres'),
  body('direccion')
    .isString()
    .notEmpty()
    .withMessage('La dirección es requerida'),
  body('telefono')
    .isString()
    .notEmpty()
    .withMessage('La dirección es requerida'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Datos inválidos', errors: errors.array() });
    }
    next();
  },
];

export const validarUsuarioModificado = [
  param('_id')
    .isMongoId()
    .notEmpty()
    .withMessage('El ID debe ser un ID de MongoDB válido'),
  body('nombre')
    .isString()
    .optional()
    .withMessage('El nombre de usuario es requerido'),
  body('apellido')
    .isString()
    .optional()
    .withMessage('El apellido de usuario es requerido'),
  body('email')
    .isEmail()
    .optional()
    .withMessage('El email debe ser válido'),
  body('direccion')
    .isString()
    .optional()
    .withMessage('La dirección es requerida'),
  body('telefono')
    .isString()
    .optional()
    .withMessage('La dirección es requerida'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Datos inválidos', errors: errors.array() });
    }
    next();
  },
];

export const validarLogin = [
  body('email')
    .isEmail()
    .notEmpty()
    .withMessage('El email debe ser válido y no vacio'),
  body('pass')
    .isString()
    .notEmpty()
    .withMessage('La contraseña debe tener al menos 3 caracteres y no vacia'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Datos inválidos', errors: errors.array() });
    }
    next();
  },
];

export const validarUsuarioId = [
  param('_id')
    .isMongoId()
    .notEmpty()
    .withMessage('El ID debe ser un ID de MongoDB válido'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Datos inválidos', errors: errors.array() });
    }
    next();
  },
];