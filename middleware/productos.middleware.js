import { body, param, validationResult } from 'express-validator';

export const validarProductoAdd = [
  body('nombre')
    .isString()
    .notEmpty()
    .withMessage('El nombre no debe estar vacío'),
  body('descripcion')
    .optional()
    .isString()
    .withMessage('La descripción debe ser una cadena'),
  body('precio')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número positivo, no vacio'),
  body('imagen')
    .optional()
    .isString()
    .withMessage('La imagen debe ser una cadena'),
  body('esDigital')
    .optional()
    .isBoolean()
    .withMessage('esDigital debe ser un booleano'),
  body('genero')
    .isString()
    .withMessage('El género debe ser una cadena'),
  body('calificacion')
    .isString()
    .withMessage('La calificación debe ser una cadena'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Datos inválidos', errors: errors.array() });
    }
    next();
  },
];

export const validarProductoById = [
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

export const validarProductoPrecio = [
  param('precio')
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser una cadena no vacía y debe ser positivo'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Datos inválidos', errors: errors.array() });
    }
    next();
  },
];

export const validarProductoGenero = [
  param('genero')
    .notEmpty()
    .isString()
    .withMessage('El genero debe ser una cadena no vacía'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Datos inválidos', errors: errors.array() });
    }
    next();
  },
];

export const validarProductoCalificacion = [
  param('calificacion')
    .notEmpty()
    .isString()
    .withMessage('La calificacion debe ser una cadena no vacía'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Datos inválidos', errors: errors.array() });
    }
    next();
  },
];

export const validarSearch = [
  param("nombre")
    .optional()
    .isString().withMessage("El nombre debe ser una cadena")
    .trim() //eliminar los espacios en blanco al inicio y al final
    .matches(/^[a-zA-Z0-9\s]*$/).withMessage("El nombre solo puede contener letras, números y espacios"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Datos inválidos', errors: errors.array() });
    }
    next();
  },
];

export const validarValoracion = [
  body("puntuacion")
    .isInt({ min: 0, max: 5 }).withMessage("La puntuación debe ser un número entero entre 0 y 5"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({message: 'Datos invádilos', errors: errors.array() });
    }
    next();
  },
];