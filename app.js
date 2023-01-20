
const express = require('express')

const cors = require('cors')
const colors = require("colors")
const path = require("path");
const multer = require("multer");

const sequelize = require("./backend/db/db")

const post = require("./backend/routes/post")
const auth = require("./backend/routes/auth")
const public = require("./backend/routes/public");
const { rutaInexistente } = require('./backend/helpers/validators');

const app = express()
const port = process.env.PORT | 4000

require('dotenv').config()

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./backend/views"));

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true})); // Para que funcionen los formularios

const conectarBD = async () => {
  try {
      await sequelize.authenticate();
      console.log('Conexion establecida');
      await sequelize.sync();

    } catch (error) {
      console.error('No se pudo conectar a la base', error);
    }
}

conectarBD();


const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
      cb(null, new Date().getTime() + path.extname(file.originalname)) // cambiar el nombre de la img
  }
})

app.use(multer({storage}).single("imagen")) // Ve si estamos enviando una img al servidor

app.use("/", public)
app.use("/auth", auth)
app.use("/publicaciones", post)

// Solo me funciono de esta forma
/
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/uploads', express.static(path.join(__dirname, '/public/uploads')));
app.use('/', express.static('public/html'))
app.get("/*", rutaInexistente)

// Creo que lo tengo por el problema con el token de confirmacion
// app.use(express.static('public'))

app.listen(port, () => {
  console.log(colors.bgYellow(`Corriendo en puerto: ${port}`))
})