const { body } = require('express-validator');

const validateCreateReserva = [
  body('usuario_dni').isInt().withMessage('El DNI del usuario debe ser un número entero'),
  body('service_id').isInt().withMessage('El ID del servicio debe ser un número entero'),
  body('start_datetime').isISO8601().withMessage('La fecha de inicio debe tener un formato válido'),
  body('end_datetime').isISO8601().withMessage('La fecha de finalización debe tener un formato válido'),
  body('end_datetime').custom((value, { req }) => {
    if (new Date(value) <= new Date(req.body.start_datetime)) {
      throw new Error('La fecha de finalización debe ser después de la fecha de inicio');
    }
    return true;
  }),
 
];

module.exports = {
  validateCreateReserva
};
