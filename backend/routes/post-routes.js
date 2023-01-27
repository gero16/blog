const { Router } = require('express')
const {crearPost, traerPublicaciones, agregarComentario, mostrarPublicacion, postPlantillaPublic} = require('../controllers/public/post-public')

const router = Router()

// /publicaciones
router.get("/", traerPublicaciones)

router.get("/:url", postPlantillaPublic)

router.post("/:url/agregar-comentario", agregarComentario)


module.exports = router