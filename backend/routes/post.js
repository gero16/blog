const { Router } = require('express')
const {crearPost, traerPublicaciones, agregarComentario, mostrarPublicacion} = require('../controllers/post')

const router = Router()

router.get("/", traerPublicaciones)

router.get("/:url", mostrarPublicacion)

router.post("/:url/agregar-comentario", agregarComentario)


module.exports = router