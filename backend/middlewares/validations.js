const { body } = require('express-validator');

const validateLogin = [
    body('email').isEmail().withMessage('El email no es válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria')
];

const validateRegister = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('El email no tiene un formato válido'),
    body('dni').notEmpty().withMessage('El DNI es obligatorio')
        .isLength({ min: 7, max: 8 }).withMessage('Longitud de DNI incorrecta')
        .isNumeric().withMessage('El DNI debe ser numérico'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    })
];

const validateRegisterHost = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('apellido').notEmpty().withMessage('El apellido es obligatorio'),
    body('email').isEmail().withMessage('El email no tiene un formato válido'),
    body('dni').notEmpty().withMessage('El DNI es obligatorio')
        .isLength({ min: 7, max: 8 }).withMessage('Longitud de DNI incorrecta')
        .isNumeric().withMessage('El DNI debe ser numérico'),
    body('telefono').notEmpty().withMessage('El número de teléfono es obligatorio'),
    body('nacionalidad').notEmpty().withMessage('La nacionalidad es obligatoria'),
    body('ciudad').notEmpty().withMessage('La ciudad es obligatoria'),
    body('direccion').notEmpty().withMessage('La dirección es obligatoria'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    })
];

module.exports = {
    validateLogin,
    validateRegister,
    validateRegisterHost
};