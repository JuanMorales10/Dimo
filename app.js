const express = require('express');
const app = express();

// Configuración del motor de vistas y archivos estáticos
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});