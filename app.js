const express = require('express');
const app = express();
const methodOverride = require('method-override');

// Configuración del motor de vistas y archivos estáticos
app.use(express.static("public"));
app.set("view engine", "ejs");

// Configuración de middlewares en el orden correcto
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});