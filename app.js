const express = require('express')
const cors = require('cors')
const colors = require("colors")
const path = require("path");
const multer = require("multer");

const authRoutesPublic = require("./backend/routes/public/auth-routes")
const authToken = require("./backend/routes/auth/token-routes")
const authPost = require("./backend/routes/auth/post-routes")
const authPlantillas = require("./backend/routes/auth/plantillas-routes")
const authUsuario = require("./backend/routes/auth/usuario-routes")
const authPasswords = require("./backend/routes/auth/passwords-routes")
const authNotificaciones = require("./backend/routes/auth/notificaciones-routes")
const post = require("./backend/routes/public/post-routes") 
const public = require("./backend/routes/public/public-routes");
const { rutaInexistente } = require('./backend/helpers/validators');
const { conectarBD } = require('./backend/db/db');
const { storage } = require('./backend/helpers/multer');

require('dotenv').config()

const app = express()
const port = process.env.PORT | 4000

conectarBD()

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./backend/views"));

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para que funcionen los formularios
app.use(multer({ storage  }).single("imagen")) // Ve si estamos enviando una img al servidor

app.use("/",  public)
app.use("/auth",  authRoutesPublic)
app.use("/auth", [ authToken, authUsuario, authPlantillas, authPost, authPasswords, authNotificaciones ])
app.use("/publicaciones", post)

app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/uploads', express.static(path.join(__dirname, '/public/uploads')));
app.use('/', express.static('public/html'))
app.get("/*", rutaInexistente)


app.listen(port, () => {
  console.log(colors.bgYellow(`Corriendo en puerto: ${port}`))
})