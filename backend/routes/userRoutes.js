const express = require('express');
const router = express.Router();
const avatar = require('../middlewares/processAvatar');
const authCookie = require('../middlewares/authenticateUserWithCookie')
const userController = require('../controllers/userController');
const authenticateJWT = require('../middlewares/authenticateJWT')

//@Get
router.get('/login', userController.getLogin);
router.get("/registerUser",userController.getRegisterUser);
router.get("/registerHost",userController.getRegisterHost);
router.get('/profile', authenticateJWT, userController.getProfile);
router.get('/services', authenticateJWT, userController.getServices);
router.get('/detail/:dni', authenticateJWT, userController.getUserDetail);
router.get('/detailService/:dni', userController.getUserServiceDetail);

//@Post
router.post('/registerUser', avatar.single("avatar"),userController.registerUser);
router.post('/registerHost', avatar.single("avatar"),userController.registerHost);
router.post('/login', authCookie.authenticateUser, userController.login);
router.post('/logOut', userController.logOut);

//@Put
router.put('/updateProfile', avatar.single("avatar"),authenticateJWT, userController.updateProfile);

//@Delete
router.delete('/deleteAccount', userController.deleteAccount);

module.exports = router;