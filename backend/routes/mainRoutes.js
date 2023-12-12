const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const googleAuth = require('../public/js/googleAuth');


// Tus credenciales
const credentials = {
  installed: {
    client_id: "YOUR_CLIENT_ID",
    client_secret: "YOUR_CLIENT_SECRET",
    redirect_uris: ["YOUR_REDIRECT_URI"]
  }
};


module.exports = router;


router.get('/', mainController.showIndex);

router.get('/nosotros', mainController.showAboutUs);
router.get('/auth/google', (req, res) => {
  const client = googleAuth.getClient(credentials);
  const authUrl = googleAuth.getAuthUrl(client);
  res.redirect(authUrl);
});

router.get('/auth/google/callback', async (req, res) => {
  const client = googleAuth.getClient(credentials);
  const code = req.query.code;
  try {
    const tokens = await googleAuth.exchangeCodeForToken(code, client);
    // Aquí podrías redireccionar al usuario a otra página o mostrar un mensaje de éxito
  } catch (error) {
    res.status(500).send('Error during token exchange.');
  }
});

module.exports = router;