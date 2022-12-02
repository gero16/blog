const { Router } = require('express');

const { check } = require('express-validator');
const { indexPrincipal, indexPlantilla, crearUsuario, confirmarCuenta, loginUsuario, infoSesion, crearPostPlantilla, getUsuarios } = require ('../controllers/auth/index');
const { postPlantilla, eliminarPlantilla, editarPostPlantilla, authPostPlantilla, perfil } = require('../controllers/auth/plantillas');
const { authAgregarComentario, crearPost, actualizarPost } = require('../controllers/auth/post');
const { sesion, getSesion, logoutUsuario } = require('../controllers/auth/usuarios');

const { generarJWT } = require('../helpers');
const { esAdmin } = require('../helpers/validators');
const { checkAuth, verifyToken } = require('../middleware/auth');

const router = Router();

router.get("/", indexPrincipal)

router.post("/registrar", crearUsuario);

router.get("/confirmar/:token", confirmarCuenta)

router.post('/login', loginUsuario);

router.get("/users", getUsuarios)

//router.post("/:user/index", infoSesion)

router.get("/:user/index", indexPlantilla)

router.post("/:user/info-sesion", sesion)

router.get("/:user/info-sesion", getSesion)

router.get("/publicaciones/:titulo/", postPlantilla)

//router.get("/:user/info-sesion", getSesion)

router.get("/:admin/publicaciones/:titulo", esAdmin, authPostPlantilla)

router.get("/:admin/crear-post", verifyToken, crearPostPlantilla)

router.get("/:admin/editar/:titulo", esAdmin, editarPostPlantilla)

router.get("/:admin/eliminar/:titulo", esAdmin, eliminarPlantilla)

router.post("/:user/publicaciones/:titulo/agregar-comentario", authAgregarComentario)

router.get("/:user/perfil", perfil)

router.post("/crear-post", crearPost)

router.post("/actualizar-post", actualizarPost)

router.post("/:user/logout", logoutUsuario)

module.exports = router;

