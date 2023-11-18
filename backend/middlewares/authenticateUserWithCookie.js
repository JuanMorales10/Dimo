const { User } = require('../database/models');

const authenticateUserWithCookie = {
  authenticateUserWithCookie: async (req, res, next) => {
    try {
      if (req.cookies.email) {
        const user = await User.findOne({
          where: {
            email: req.cookies.email
          }
        });

        if (user) {
          req.session.user = user;
        }
      }
      next(); // Continúa con el siguiente middleware o ruta
    } catch (error) {
      console.error(error);
      res.redirect("/users/login?error=Error en la autenticación con cookies");
    }
  },
  
  authenticateUser: async (req, res, next) => {
    try {
      if (!req.body.email) {
        return res.status(400).json({ error: "El correo electrónico es requerido" });
      }
  
      const user = await User.findOne({
        where: { email: req.body.email }
      });
  
      if (user) {
        req.session.user = user;
        next();
      } else {
        return res.status(401).json({ error: "El correo electrónico o la contraseña son incorrectos" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error en la autenticación del usuario" });
    }
  }
  
};

module.exports = authenticateUserWithCookie;
