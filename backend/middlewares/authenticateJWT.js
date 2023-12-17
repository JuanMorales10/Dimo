const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const token = authHeader.split(' ')[1];
  
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403); // Acceso prohibido si el token no es válido
        }
  
        req.session.user = user;
        console.log('Req.session.user:  ',req.session.user)
        next();
      });
    } else {
      res.sendStatus(401); // No autorizado si no hay token
    }
  };

 module.exports = authenticateJWT;