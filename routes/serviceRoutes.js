const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const serviceImage = require('../middlewares/processServiceImage')

// router.get('/', serviceController.showIndex);


module.exports = router;