const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authenticateJWT = require('../middlewares/authenticateJWT');

// Ruta para iniciar la autenticación con Google
router.get('/google/start', authenticateJWT, userController.iniciarAuth);


// Ruta para el callback después de la autenticación con Google
router.get('/google/callback', authenticateJWT, userController.despAuth );


module.exports = router;
