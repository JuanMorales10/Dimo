const { User } = require('../database/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {
  login: async (req, res) => {

  
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
  
      if (!user) {
        return res.status(401).json({ message: "El correo electrónico o la contraseña son incorrectos" });
      }
  
      const validPw = await bcrypt.compare(req.body.password, user.dataValues.password);
  
      if (validPw) {
        // Crear un token JWT
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET, // Usa una variable de entorno para tu secreto
          { expiresIn: '24h' } // Configura la expiración del token
        );

        console.log(token)
  
        // Enviar el token al cliente
        res.json({ success: true, message: "Login exitoso.", token: token });
      } else {
        // Contraseña no válida
        return res.status(401).json({ message: "El correo electrónico o la contraseña son incorrectos" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
  logOut: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Error al intentar destruir la sesión:', err);
        return res.status(500).json({ success: false, message: 'Error interno del servidor al cerrar sesión' });
      }
  
      if (req.cookies.email) {
        res.clearCookie('email');
      }
 
      res.json({ success: true, message: 'Sesión cerrada correctamente' });
    });
  },
  

  registerUser: async (req, res) => {
    let avatar = 'defaultAvatar.jpg';
    try {

      if (req.body.password === req.body.password2) {


        if (req.file && req.file.filename) {
          // Si se proporciona un archivo, usa su nombre
          avatar = req.file.filename;
        }
      }

      const user = await User.create({
        id: req.body.dni,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        type: "Personal",
        avatar: avatar // Asigna el valor predeterminado o el nombre de archivo
      });

      req.session.user = user;
      res.json({ success: true, message: "Usuario registrado" });
    } catch (error) {
      console.log(error);
      return res.redirect("/user/registerUser?error=" + error);
    }
  },
  registerHost: async (req, res) => {

    try {
      let avatar = 'defaultAvatar.jpg'; 

      if (req.file && req.file.filename) {
        avatar = req.file.filename;
      }

      const user = await User.create({
        id: req.body.dni,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono || null,
        ciudad: req.body.ciudad || null,
        direccion: req.body.direccion || null,
        type: "Host",
        avatar: avatar 
      });

      console.log(user)

      req.session.user = user;
      res.json({ success: true, message: "Usuario registrado" });
    } catch (error) {

      console.log(error);
      return res.redirect("/user/registerUser?error=" + error);

    }
  }
  ,
  updateProfile: async (req, res) => {
    try {
        const id = req.body.id;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if (req.body.currentPassword === user.password) {
        }
        const updatedProfile = { ...req.body };

        console.log('updated' + updatedProfile);

        if (req.file) {
            updatedProfile.avatar = req.file.filename;
        }

        if (!updatedProfile.avatar) {
            updatedProfile.avatar = user.avatar;
        }

        let updatedUser = await User.update(updatedProfile, {
            where: { id: id }
        });
        console.log(updatedUser);

        res.json({ message: "Perfil actualizado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al actualizar el perfil" });
    }
},

  deleteAccount: async (req, res) => {
    try {
      await User.destroy({
        where: {
          email: req.body.email
        }
      })
      res.send('Usuario eliminado')
    } catch (error) {
      console.log(error)
    }

  },
  getLogin: (req, res) => {

    // res.render("./users/login");
  },
  getRegisterUser: (req, res) => {

    // res.render("./users/register");
  },
  getRegisterHost: (req, res) => {

    // res.render("./users/register");
  },
  getUserDetail: async (req, res) => {
    try {

      const userDni = req.params.dni || req.query.dni;

      if (!userDni) {
        return res.status(400).json({ success: false, message: "Se requiere un DNI para la búsqueda." });
      }

      const user = await User.findOne({
        where: {
          id: userDni
        }
      });

      if (user) {

        const userDetails = {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
          apellido: user.apellido,
          telefono: user.telefono,
          ciudad: user.ciudad,
          direccion: user.direccion,
          type: user.type,
          avatar: user.avatar
        };

        res.json({ success: true, userDetails });
      } else {
        res.status(404).json({ success: false, message: "No se encontró un usuario con ese DNI." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error interno del servidor al obtener los detalles del usuario." });
    }
  },
   getProfile : async (req, res) => {
    try {
        // Verificar el token JWT
        const token = req.headers.authorization.split(' ')[1]; // Obtener el token del header
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token

        const userId = decodedToken.userId; // Extraer el userId del token decodificado

        if (!userId) {
            return res.status(401).json({ success: false, message: "Usuario no autenticado." });
        }

        const user = await User.findByPk(userId);

        if (user) {
            const userProfile = {
                id: user.id,
                email: user.email,
                nombre: user.nombre,
                apellido: user.apellido,
                telefono: user.telefono,
                ciudad: user.ciudad,
                direccion: user.direccion,
                type: user.type,
                avatar: user.avatar
            };

            res.json({ success: true, profile: userProfile });
        } else {
            res.status(404).json({ success: false, message: "Perfil de usuario no encontrado." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error interno del servidor al obtener el perfil." });
    }
},
  getServices: (req, res) => {

    // res.render("./users/register");
  },
};

module.exports = userController;
