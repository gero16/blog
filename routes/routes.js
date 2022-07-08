const { Router } = require('express')
const {crearPost, traerPost, traerPublicaciones} = require('../controllers/controllers')


const router = Router()

router.get("/publicaciones", traerPublicaciones)

router.post("/crear-post", crearPost)

// router.get("/crear-post", traerPost)

/*
router.get("/:titulo", posteo)
*/

module.exports = router