const { Router } = require('express');

const { userPostPlantilla, perfilPlantilla, errorPlantilla, eliminarUsuarioPlantilla, indexUserPlantilla } = require("../../controllers/auth/plantillas")
const { verifyToken } = require('../../middleware/auth-middleware');
const { perfilAdmin, indexAdminPlantilla, adminPostPlantilla, crearPostPlantilla, editarPostPlantilla, eliminarPlantilla, usuariosPlantilla } = require('../../controllers/auth/plantillas-admin');
const { esAdmin } = require('../../helpers/validators');

const router = Router();

//*** User/Other Routes ***//
router.get("/index/usuario/:user", indexUserPlantilla)
router.get("/publicaciones/:user/:titulo",verifyToken,  userPostPlantilla)
router.get("/perfil/:user", perfilPlantilla)
router.get("/error", errorPlantilla)

//*** Admin Routes ***//
router.get("/admin/:admin/index", esAdmin, indexAdminPlantilla)
router.get("/admin/:admin/publicaciones/:titulo", [esAdmin, verifyToken], adminPostPlantilla)
router.get("/admin/:admin/crear-post", [esAdmin, verifyToken], crearPostPlantilla)
router.get("/admin/:admin/editar/:titulo",  [esAdmin, verifyToken], editarPostPlantilla)
router.get("/admin/:admin/eliminar-post/:titulo",  [esAdmin, verifyToken], eliminarPlantilla)
router.get("/admin/:admin/eliminar-usuario/administrador", eliminarUsuarioPlantilla)
router.get("/admin/:admin/perfil", esAdmin, perfilAdmin)
router.get("/admin/:admin/usuarios", esAdmin, usuariosPlantilla)

module.exports = router;