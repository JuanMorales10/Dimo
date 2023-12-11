const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const { validateCreateReserva } = require('../middlewares/reservaValidations');

router.get('/reservas', reservaController.getReservas);
router.post('/reservas', validateCreateReserva, reservaController.createReserva);
router.put('/reservas/:id', reservaController.updateReserva);
router.delete('/reservas/:id', reservaController.deleteReserva);

module.exports = router;

