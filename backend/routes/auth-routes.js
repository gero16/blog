const { Router } = require('express');

const {  indexPlantilla, crearUsuario, confirmarCuenta, loginUsuario, infoSesion, crearPostPlantilla, getUsuarios } = require ('../controllers/auth/index-auth');
const { authAgregarComentario, crearPost, actualizarPost, eliminarPost, eliminarComentario, editarComentario } = require('../controllers/auth/post-auth');
const {  postPlantilla, eliminarPlantilla, editarPostPlantilla, authPostPlantilla, perfil, olvidePasswordPlantilla, cambiarPassword, perfilPlantilla } = require('../controllers/auth/plantillas-auth');

const { sesion, getSesion, logoutUsuario, validateToken, editarPerfil, olvidePassword, comprobarPassword, nuevoPassword, adminNotificaciones, actualizarNotificacion } = require('../controllers/auth/usuarios-auth');

const { esAdmin } = require('../helpers/validators');
const { checkAuth, verifyToken, checkEmptyData, datosExistentes } = require('../middleware/auth');

const router = Router();

const { Post } = require("../models/model.js")

// Seccion de Usuarios
router.post('/login', checkEmptyData, loginUsuario);

router.post("/:user/logout", logoutUsuario)

router.post("/registrar", datosExistentes, crearUsuario);

router.get("/:user/confirmar/:token", confirmarCuenta)

router.get("/users", getUsuarios)


// Seccion de plantillas para usuarios autenticados
router.get("/:user/index", indexPlantilla)

router.post("/:user/info-sesion", sesion)

router.get("/:user/info-sesion", getSesion)

router.get("/:user/publicaciones/:titulo",  authPostPlantilla)

router.get("/:admin/crear-post", esAdmin, crearPostPlantilla)

router.get("/:admin/editar/:titulo", esAdmin, editarPostPlantilla)

router.get("/:admin/eliminar/:titulo", esAdmin, eliminarPlantilla)

router.get("/:user/perfil", perfilPlantilla)



// Seccion actualizacion de contenido
router.post("/:user/editar-perfil", editarPerfil)

router.post("/:admin/crear-post", crearPost)

router.post("/actualizar-post", actualizarPost)

router.post("/eliminar-post/:id",  eliminarPost)

router.post("/:user/publicaciones/:titulo/agregar-comentario", authAgregarComentario)

router.post("/:admin/publicaciones/:titulo/eliminar-comentario/:id", eliminarComentario)


// Ruta a la que se le manda el token header
router.post("/validate-token", verifyToken, validateToken)

router.get("/olvide-password", olvidePasswordPlantilla)

router.get("/cambiar-password", cambiarPassword)

router.post("/olvide-password", olvidePassword)
// Confirmar - A traves de email
router.route("/:usuario/olvide-password/:token").get(comprobarPassword).post(nuevoPassword)

// Notificaciones
router.get("/:admin/notificaciones", adminNotificaciones)

router.post("/:admin/notificaciones", actualizarNotificacion)




module.exports = router;

