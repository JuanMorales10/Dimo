const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const serviceImage = require('../middlewares/processServiceImage');
const authenticateJWT = require('../middlewares/authenticateJWT');
const favoriteController = require('../controllers/favoriteController')
const {validateCreateService, validateEditService} = require('../middlewares/validations')

//@Get
router.get('/createService', serviceController.getCreateService);
router.get('/:id/detail',serviceController.getServiceDetails);
router.get('/allServices', serviceController.getAllServices);
router.get('/userServices/:id', serviceController.getUserServices);
router.get('/popularServices', serviceController.getPopularServices);
router.get('/servicesByCategory', serviceController.servicesByCategory);
router.get('/:id/available-slots', serviceController.getAvailableSlots);
router.get('/service/:id/favorite', authenticateJWT ,favoriteController.isFavorite);
router.get('/service/favorite', authenticateJWT ,favoriteController.favorites);

//@Post
router.post('/createService', serviceImage.array('image'), authenticateJWT , validateCreateService ,serviceController.postCreateService);
router.post('/:id/postComment', authenticateJWT ,serviceController.postComment);
router.post('/filter', serviceController.filterServices); 
router.post('/service/:id/favorite', authenticateJWT ,favoriteController.addFavorite);
router.post('/mercado-pago', serviceController.mercadoPago)

//@Put
router.put('/updateService/:id', serviceImage.array('image'),authenticateJWT ,validateEditService, serviceController.putUpdateService);

//@Delete
router.delete('/deleteService/:id',authenticateJWT ,serviceController.deleteService);
router.delete('/service/:id/favorite', authenticateJWT ,favoriteController.removeFavorite);

module.exports = router;
