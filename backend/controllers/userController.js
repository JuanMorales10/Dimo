const { User } = require('../database/models');
const bcrypt = require('bcryptjs');

const userController = {
  login: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
  
      if (!user) {
        return res.redirect(
          `${req.baseUrl}/users/login?error=El correo electrónico o la contraseña son incorrectos`
        );
      }
  
      const validPw = await bcrypt.compare(req.body.password, user.dataValues.password);
  
      if (validPw) {
        // Contraseña válida
        if (req.body["keep-session"] === "on") {
          // Establecer la cookie de sesión si es necesario
          res.cookie("email", user.dataValues.email, {
            maxAge: 1000 * 60 * 60 * 24, // Expira en un día
          });
        }
        res.json({ success: true, message: "Login exitoso.", user: user  });
      } else {
        // Contraseña no válida
       return res.status(401).json({ success: false, message: "El correo electrónico o la contraseña son incorrectos" });
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
  },
  logOut: (req, res) => {
    // Elimina la propiedad 'user' de la sesión
    delete req.session.user

    if (req.cookies.email) {
      // Elimina la cookie 'email'
      res.clearCookie('email');

      res.redirect('/'); // Redirige a la página principal u otra ubicación
    } else {
      res.redirect('/'); // Redirige a la página principal si no hay cookie
    }
  },

  registerUser: async (req, res) => {
    let avatar = 'defaultAvatar.jpg'; 
    try {

      if (req.body.password === req.body.password2){

  
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
      console.log(user)
      req.session.user = user;
      // res.send(user)
      // return res.render('./main/index', { user: req.session.user });
    } catch (error) {
      console.log(error);
      // return res.redirect("/users/register?error=" + error);
    }
  },
  registerHost: async (req, res) => {

    try {
      let avatar = 'defaultAvatar.jpg'; // Valor predeterminado para avatar

      if (req.file && req.file.filename) {
        // Si se proporciona un archivo, usa su nombre
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
        avatar: avatar // Asigna el valor predeterminado o el nombre de archivo
      });

      console.log(user)

      req.session.user = user;

      // res.send(user)

      // return res.render('./main/index', { user: req.session.user });

    } catch (error) {

      console.log(error);
      return res.redirect("/users/register?error=" + error);

    }
  }
  ,
  updateProfile: async (req, res) => {
    try {

      const updatedProfile = {
        ...req.body,
      };


      if (req.file) {
        updatedProfile.avatar = req.file.filename;
      }

      if (updatedProfile.avatar === '') {
        let imagen = await User.findOne({
          where: {
            id: updatedProfile.dni
          }
        });

        updatedProfile.avatar = imagen.avatar;
      }

      let updatedUser = await User.update(updatedProfile, {
        where: {
          id: updatedProfile.dni
        }
      })
      console.log(updatedUser)

      // res.redirect('/users/profile')

    } catch (error) {
      console.log(error)
    }

  },
  deleteAccount: async (req, res) => {
    try {
      await User.destroy({
        where:{
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
  getProfile: (req, res) => {
    // res.render('./users/profile', {  user: req.session.user })
  },
  getServices: (req, res) => {

    // res.render("./users/register");
  },
};

module.exports = userController;
