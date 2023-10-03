const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const serviceImage = require('../middlewares/processServiceImage')

// router.get('/', serviceController.showIndex);

//@Get
router.get('/createService', serviceController.getCreateService)

//@Post
router.post('/createService', serviceImage.any('image'), serviceController.createService)


module.exports = router;