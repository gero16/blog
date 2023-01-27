const { Router } = require('express')
const {crearPost, traerPublicaciones, agregarComentario, mostrarPublicacion} = require('../controllers/public/post-public')

const router = Router()

// /publicaciones
router.get("/", traerPublicaciones)

router.get("/:url", mostrarPublicacion)

router.post("/:url/agregar-comentario", agregarComentario)


module.exports = router