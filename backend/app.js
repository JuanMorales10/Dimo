const express = require('express');
const app = express();
const methodOverride = require('method-override');
const cors = require('cors');
require('dotenv').config();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis')
const mainRouter = require('./routes/mainRoutes')
const userRouter = require('./routes/userRoutes')
const serviceRouter = require('./routes/serviceRoutes')
const authCookie = require('./middlewares/authenticateUserWithCookie');
const reservaRoutes = require('./routes/reservasRoutes');
const googleAuthRoutes = require('./routes/googleAuthRoutes');
const mercadoPago = require('mercadopago')

mercadoPago.configure({
  access_token: process.env.ACCESS_TOKEN_MP || "",
})


const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true, 
};

// Configuración de middlewares en el orden correcto
app.use(express.urlencoded({ extended: true }));  
app.use(cors(corsOptions))
app.use(express.json());
app.use(methodOverride('_method'));

//Configuracion de Session
app.use(session({
  secret: 'Whattodo',
  resave: false,
  saveUninitialized: true,
}));

// Configuración del motor de vistas y archivos estáticos
app.use(express.static("public"));
app.set("view engine", "ejs");

//Configuracion de Cookie Parser
app.use(cookieParser())

//Configuracion de Auth Cookie
app.use(authCookie.authenticateUserWithCookie);


//Routes
app.use('/', mainRouter);
app.use('/user', userRouter)
app.use('/service', serviceRouter)
app.use('/reserva' ,reservaRoutes)
app.use('/auth', googleAuthRoutes);

app.get('/', (req, res) => {
    res.render('home')
})

const PORT = 3008;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
