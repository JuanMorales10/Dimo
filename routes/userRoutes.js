const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.showIndex);

router.get('/nosotros', userController.showAboutUs);

module.exports = router;