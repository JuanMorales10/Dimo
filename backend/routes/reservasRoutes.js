const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const authenticateJWT = require('../middlewares/authenticateJWT');
const { validateCreateReserva } = require('../middlewares/validateCreateReserva');

router.get('/reservas', reservaController.getReservas);
router.post('/reservas', authenticateJWT, validateCreateReserva, reservaController.createReserva); 
router.put('/reservas/:id', reservaController.updateReserva);
router.delete('/reservas/:id', reservaController.deleteReserva);

module.exports = router;

