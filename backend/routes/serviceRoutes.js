const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const serviceImage = require('../middlewares/processServiceImage');
const authenticateJWT = require('../middlewares/authenticateJWT');
const { validateServiceUpdate } = require('../middlewares/validateServiceUpdate');

//@Get
router.get('/createService', serviceController.getCreateService);
router.get('/:id/detail', serviceController.getServiceDetails);
router.get('/allServices', serviceController.getAllServices);
router.get('/userServices/:id', serviceController.getUserServices);
router.get('/popularServices', serviceController.getPopularServices);
router.get('/availableServices', serviceController.getAvailableServices);
router.get('/searchServicesByName', serviceController.searchServicesByName);
router.get('/:id/available-slots', serviceController.getAvailableSlots);


//@Post
router.post('/createService', serviceImage.array('image'), serviceController.postCreateService);
router.post('/:id/postComment', authenticateJWT ,serviceController.postComment);
router.post('/filter', serviceController.filterServices); 

//@Put
router.put('/updateService/:id', serviceImage.array('image'),validateServiceUpdate, serviceController.putUpdateService);

//@Delete
router.delete('/deleteService/:id', serviceController.deleteService);

module.exports = router;
