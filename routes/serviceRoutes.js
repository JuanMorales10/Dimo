const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const serviceImage = require('../middlewares/processServiceImage')

// router.get('/', serviceController.showIndex);

//@Get
router.get('/createService', serviceController.getCreateService)
router.get('/:id/detail', serviceController.getServiceDetails)
router.get('/:region', serviceController.getServiceByRegion)

//@Post
router.post('/createService', serviceImage.any('image'), serviceController.createService)
router.post('/:id/postComment', serviceController.postComment)

//@Put
router.put('/updateService/:id', serviceImage.any('image'), serviceController.putUpdateService)

//@Delete
router.delete('/deleteService/:id', serviceController.deleteService)


module.exports = router;