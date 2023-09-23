const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mainRouter = require('./routes/mainRoutes')
const userRouter = require('./routes/userRoutes')
const serviceRouter = require('./routes/serviceRoutes')

// Configuración del motor de vistas y archivos estáticos
app.use(express.static("public"));
app.set("view engine", "ejs");

// Configuración de middlewares en el orden correcto
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));


//Routes
app.use('/', mainRouter);
app.use('/user', userRouter)
app.use('/service', serviceRouter)

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});