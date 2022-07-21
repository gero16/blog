require('dotenv').config()

const { dbConnection } = require('./database/config')

const express = require('express')
const bodyParser = require('body-parser')
const colors = require('colors')
const path = require("path");
const multer = require("multer");


const routes = require('./routes/routes')
const rutas = require('./routes/rutas.js')


const app = express()
const port = 3000;

app.set('port', port)
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
      cb(null, new Date().getTime() + path.extname(file.originalname)) // cambiar el nombre de la img
  }
})
app.use(multer({storage}).single("imagen")) // Ve si estamos enviando una img al servidor

app.use(bodyParser.json())



app.set("view engine", "pug");

app.set("views", path.join(__dirname, "./views"))


// Solo me funciono de esta forma
app.use('/img',express.static(path.join(__dirname, 'public/img')));
app.use('/js',express.static(path.join(__dirname, 'public/js')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use('/', express.static('public/html'))

app.use("/", rutas)
app.use("/api", routes)


const conectarDB = async () => {
  await dbConnection()
}
conectarDB()

app.listen(app.get('port'), () => {
    console.log(colors.bgMagenta(`Puerto corriendo en: ${port} :)`))
  })
