const { crearPost, actualizarPost, eliminarPost, authAgregarComentario, eliminarComentario } = require("../../controllers/auth/post-auth")
const { editarPerfil } = require("../../controllers/auth/usuarios-auth")

const { Router } = require('express');
const { verifyToken } = require("../../middleware/auth-middleware");

const router = Router();

/*********************
 
    El verifyToken esta funcionando porque le mando admin en los params, pero no deberia funcionar porque nunca le mando el token 
     -- Estoy usando el token_sesion - no me acuerdo bien como lo usaba

***********************/

// Ruta a la que se le manda el token header
router.post("/:user/editar-perfil", verifyToken, editarPerfil)

router.post("/:admin/crear-post", verifyToken, crearPost)

router.post("/:admin/actualizar-post", verifyToken, actualizarPost)

router.post("/:admin/eliminar-post/:id", verifyToken,  eliminarPost)

router.post("/:user/publicaciones/:titulo/agregar-comentario",  authAgregarComentario)

router.post("/:admin/publicaciones/:titulo/eliminar-comentario/:id",  eliminarComentario)

module.exports = router;