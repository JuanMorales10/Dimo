const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//@Get
router.get('/login', userController.getLogin);
router.get("/registerUser",userController.getRegisterUser);
router.get("/registerHost",userController.getRegisterHost);
router.get('/profile',userController.getProfile);
router.get('/services', userController.getServices);

//@Post
router.post('/registerUser', userController.registerUser);
router.post('/registerHost', userController.registerHost);
router.post('/login', userController.login);
router.post('/logOut', userController.logOut);

//@Put
router.put('/updateProfile', userController.updateProfile);

//@Delete
router.delete('/deleteAccount', userController.deleteAccount);

module.exports = router;