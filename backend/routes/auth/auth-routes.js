const { Router } = require('express');

const {  indexPlantilla, crearUsuario, confirmarCuenta, loginUsuario,  crearPostPlantilla, getUsuarios } = require ('../../controllers/auth/index-auth');
const { authAgregarComentario, crearPost, actualizarPost, eliminarPost, eliminarComentario   } = require('../../controllers/auth/post-auth');
const {  eliminarPlantilla, editarPostPlantilla, authPostPlantilla,  olvidePasswordPlantilla, cambiarPassword, perfilPlantilla, errorPlantilla, adminPostPlantilla, userPostPlantilla } = require('../../controllers/auth/plantillas-auth');

const { sesion, getSesion, logoutUsuario, validateToken, editarPerfil, olvidePassword, comprobarPassword, nuevoPassword, adminNotificaciones, actualizarNotificacion } = require('../../controllers/auth/usuarios-auth');

const { esAdmin } = require('../../helpers/validators');
const { checkAuth, verifyToken, checkEmptyData, datosExistentes,  verifyTokenGet, redirectError } = require('../../middleware/auth-middleware');

const router = Router();

const { Post } = require("../../models/model.js")

// Seccion de Usuarios
router.post('/login', checkEmptyData, loginUsuario);

router.post("/:user/logout", logoutUsuario)

router.post("/registrar", datosExistentes, crearUsuario);

router.get("/:user/confirmar/:token", confirmarCuenta)

router.get("/users", getUsuarios)


// Seccion de plantillas para usuarios autenticados
router.get("/:user/index", indexPlantilla)

router.post("/:user/info-sesion", sesion)

router.get("/:admin/publicaciones/:titulo", [esAdmin, verifyTokenGet], adminPostPlantilla)

router.get("/:user/publicaciones/:titulo",  userPostPlantilla)

router.get("/:admin/crear-post", [esAdmin, verifyTokenGet], crearPostPlantilla)

router.get("/:admin/editar/:titulo",  editarPostPlantilla)

router.get("/:admin/eliminar/:titulo", [esAdmin, verifyTokenGet], eliminarPlantilla)

router.get("/:user/perfil", perfilPlantilla)

router.get("/error", errorPlantilla)



// Seccion actualizacion de contenido
router.post("/validate-token", verifyToken, validateToken)

// Ruta a la que se le manda el token header
router.post("/:user/editar-perfil",  editarPerfil)

router.post("/:admin/crear-post" , crearPost)

router.post("/actualizar-post",  actualizarPost)

router.post("/eliminar-post/:id",   eliminarPost)

router.post("/:user/publicaciones/:titulo/agregar-comentario", authAgregarComentario)

router.post("/:admin/publicaciones/:titulo/eliminar-comentario/:id", eliminarComentario)


// Interacciones cuenta
router.get("/olvide-password", olvidePasswordPlantilla)

router.get("/cambiar-password", cambiarPassword)

router.post("/olvide-password", olvidePassword)
// Confirmar - A traves de email
router.route("/:usuario/olvide-password/:token").get(comprobarPassword).post(nuevoPassword)


// Notificaciones
router.get("/:admin/notificaciones", adminNotificaciones)

router.post("/:admin/notificaciones", actualizarNotificacion)




module.exports = router;

