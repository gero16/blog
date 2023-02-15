const { crearPost, actualizarPost, eliminarPost, authAgregarComentario, eliminarComentario } = require("../../controllers/auth/post-auth")
const { editarPerfil } = require("../../controllers/auth/usuarios-auth")

const { Router } = require('express');

const router = Router();


// Ruta a la que se le manda el token header
router.post("/:user/editar-perfil", editarPerfil)

router.post("/:admin/crear-post", crearPost)

router.post("/actualizar-post", actualizarPost)

router.post("/eliminar-post/:id",  eliminarPost)

router.post("/:user/publicaciones/:titulo/agregar-comentario", authAgregarComentario)

router.post("/:admin/publicaciones/:titulo/eliminar-comentario/:id", eliminarComentario)

module.exports = router;