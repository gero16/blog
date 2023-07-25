const { crearPost, actualizarPost, eliminarPost, eliminarComentario, agregarComentario, editarComentario } = require("../../controllers/auth/post-auth")
const { editarPerfil } = require("../../controllers/auth/usuarios-auth")

const { Router } = require('express');
const { verifyToken, validarTitulo, validarPublicacionCrear, validarPublicacionEditar } = require("../../middleware/auth-middleware");

const router = Router();

/*********************
 
    El verifyToken esta funcionando porque le mando admin en los params, pero no deberia funcionar porque nunca le mando el token 
     -- Estoy usando el token_sesion - no me acuerdo bien como lo usaba

***********************/

// Ruta a la que se le manda el token header
router.post("/:user/editar-perfil", verifyToken, editarPerfil)

router.post("/:admin/crear-post", [verifyToken, validarTitulo, validarPublicacionCrear], crearPost)

router.post("/:admin/actualizar-post", [verifyToken, validarPublicacionEditar],  actualizarPost)

router.post("/:admin/eliminar-post/:id",  eliminarPost)

router.post("/admin/:user/publicaciones/:titulo/agregar-comentario",  agregarComentario)

router.post("/admin/:user/publicaciones/:titulo/editar-comentario",  editarComentario)

router.post("/admin/:admin/publicaciones/:titulo/eliminar-comentario/:id",  eliminarComentario)

module.exports = router;