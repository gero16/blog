const { Router } = require('express');

const { check } = require('express-validator');
const { indexPrincipal, indexPlantilla, crearUsuario, confirmarCuenta, loginUsuario, infoSesion, crearPostPlantilla, getUsuarios } = require ('../controllers/auth/index');
const { postPlantilla, eliminarPlantilla, editarPostPlantilla, authPostPlantilla, perfil } = require('../controllers/auth/plantillas');
const { authAgregarComentario, crearPost, actualizarPost, eliminarPost } = require('../controllers/auth/post');
const { sesion, getSesion, logoutUsuario, validateToken, editarPerfil } = require('../controllers/auth/usuarios');

const { generarJWT } = require('../helpers');
const { esAdmin, rutaInexistente } = require('../helpers/validators');
const { checkAuth, verifyToken, checkEmptyData } = require('../middleware/auth');

const router = Router();

router.get("/", indexPrincipal)

router.post('/login', checkEmptyData, loginUsuario);

router.post("/:user/logout", logoutUsuario)

router.post("/registrar", crearUsuario);

router.post("/validate-token", verifyToken, validateToken)

router.get("/:user/confirmar/:token", confirmarCuenta)

router.get("/users", getUsuarios)

router.get("/:user/index", indexPlantilla)

router.post("/:user/info-sesion", sesion)

router.get("/:user/info-sesion", getSesion)

router.get("/publicaciones/:titulo/", postPlantilla)

router.get("/:user/publicaciones/:titulo",  authPostPlantilla)

router.get("/:admin/crear-post", esAdmin, crearPostPlantilla)

router.get("/:admin/editar/:titulo", esAdmin, editarPostPlantilla)

router.get("/:admin/eliminar/:titulo", esAdmin, eliminarPlantilla)

router.post("/:user/publicaciones/:titulo/agregar-comentario", authAgregarComentario)

router.get("/:user/perfil", perfil)

router.post("/:user/editar-perfil", editarPerfil)

router.post("/crear-post", crearPost)

router.post("/actualizar-post", actualizarPost)

router.post("/eliminar-post/:id", verifyToken, eliminarPost)

//router.get("/*", rutaInexistente)


module.exports = router;

