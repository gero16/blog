
const { Router } = require('express')
const { posteo, editarPost } = require('../controllers/controllers')

const router = Router()

router.get("/:titulo", posteo)

router.post("/editar", editarPost)

module.exports = router