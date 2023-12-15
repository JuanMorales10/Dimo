const { body } = require('express-validator');

const validateServiceUpdate = [
  body('nombre').trim().notEmpty().withMessage('El nombre es requerido'),
  body('descripcion').trim().notEmpty().withMessage('La descripción es requerida'),
  // ... otras validaciones para cada campo ...
  body('operating_hours_start').isString().withMessage('Hora de inicio inválida'),
  body('operating_hours_end').isString().withMessage('Hora de fin inválida'),
  body('operating_days').isArray().withMessage('Los días de operación deben ser un array'),
  // ... más validaciones según sea necesario ...
];

module.exports = { validateServiceUpdate };
