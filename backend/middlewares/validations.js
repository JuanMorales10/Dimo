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

const validateCreateService = [
    body('nombre').notEmpty().withMessage('El nombre del servicio es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripción del servicio es obligatoria'),
    body('categoria_id').isNumeric().withMessage('La categoría es obligatoria'),
    body('capacidad').isNumeric().withMessage('La capacidad debe ser un número'),
    body('id_region').isNumeric().withMessage('La región es obligatoria'),
    body('atp').isBoolean().withMessage('El campo ATP debe ser booleano'),
    body('rating').isNumeric().withMessage('El rating debe ser un número'),
    body('precio').isNumeric().withMessage('El precio debe ser un número'),
    body('duracion').notEmpty().withMessage('La duración es obligatoria'),
    body('disponibilidad').isBoolean().withMessage('La disponibilidad debe ser booleana'),
    body('direccion').notEmpty().withMessage('La dirección es obligatoria'),
    body('operating_hours_start').notEmpty().withMessage('La hora de inicio de operaciones es obligatoria'),
    body('operating_hours_end').notEmpty().withMessage('La hora de fin de operaciones es obligatoria'),
    body('operating_days').isArray().withMessage('Por favor, seleccione los días de operación')
    .custom((days) => {
        const validDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        return days.every(day => validDays.includes(day));
    }).withMessage('Algunos de los días seleccionados no son válidos. Por favor, elija días correctos.'),
];

const validateEditService = [
    body('nombre').notEmpty().withMessage('El nombre del servicio es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripción del servicio es obligatoria'),
    body('categoria_id').isNumeric().withMessage('La categoría es obligatoria'),
    body('capacidad').isNumeric().withMessage('La capacidad debe ser un número'),
    body('id_region').isNumeric().withMessage('La región es obligatoria'),
    body('atp').isBoolean().withMessage('El campo ATP debe ser booleano'),
    body('rating').isNumeric().withMessage('El rating debe ser un número'),
    body('precio').isNumeric().withMessage('El precio debe ser un número'),
    body('duracion').notEmpty().withMessage('La duración es obligatoria'),
    body('disponibilidad').isBoolean().withMessage('La disponibilidad debe ser booleana'),
    body('direccion').notEmpty().withMessage('La dirección es obligatoria'),
    body('operating_hours_start').notEmpty().withMessage('La hora de inicio de operaciones es obligatoria'),
    body('operating_hours_end').notEmpty().withMessage('La hora de fin de operaciones es obligatoria'),
    body('operating_days')
        .custom((daysString) => {
            if (!daysString) return true; // Si el string está vacío o es null, pasa la validación
            const daysArray = daysString.split(','); // Divide el string en un array
            const validDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
            return daysArray.every(day => validDays.includes(day)); // Verifica que cada día sea válido
        })
        .withMessage('Algunos de los días seleccionados no son válidos. Por favor, elija días correctos.')
];

module.exports = {
    validateLogin,
    validateRegister,
    validateRegisterHost,
    validateCreateService,
    validateEditService
};