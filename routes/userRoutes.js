const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//@Get
router.get('/login', userController.getLogin)
router.get("/register",userController.getRegister);
router.get('/profile',userController.getProfile)
// router.get('/services', userController.getServices);

//@Post
router.post('/login', userController.login);
router.post('/logOut', userController.logOut)

module.exports = router;