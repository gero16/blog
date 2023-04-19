const { Router } = require('express');


const { adminPostPlantilla, userPostPlantilla, crearPostPlantilla, editarPostPlantilla, eliminarPlantilla, perfilPlantilla, errorPlantilla, eliminarUsuarioPlantilla, usuariosPlantilla } = require("../../controllers/auth/plantillas-auth")
const { sesion } = require("../../controllers/auth/usuarios-auth");
const { verifyToken } = require('../../middleware/auth-middleware');


const router = Router();

// router.get("/:user/index", indexPlantilla)

router.post("/:user/info-sesion", sesion)

router.get("/:admin/publicaciones/:titulo", verifyToken, adminPostPlantilla)

router.get("/:user/publicaciones/:titulo",verifyToken,  userPostPlantilla)

router.get("/:admin/crear-post", verifyToken, crearPostPlantilla)

router.get("/:admin/editar/:titulo", verifyToken, editarPostPlantilla)

router.get("/:user/perfil", perfilPlantilla)

router.get("/error", errorPlantilla)

router.get("/:admin/users", usuariosPlantilla)

router.get("/:admin/eliminar-post/:titulo", verifyToken, eliminarPlantilla)

router.get("/:admin/eliminar-usuario/:user", eliminarUsuarioPlantilla)

module.exports = router;