const { Router } = require('express');


const { indexPlantilla, adminPostPlantilla, userPostPlantilla, crearPostPlantilla, editarPostPlantilla, eliminarPlantilla, perfilPlantilla, errorPlantilla } = require("../../controllers/auth/plantillas-auth")
const { sesion } = require("../../controllers/auth/usuarios-auth");
const { verifyToken } = require('../../middleware/auth-middleware');


const router = Router();

// router.get("/:user/index", indexPlantilla)

router.post("/:user/info-sesion", sesion)

router.get("/:admin/publicaciones/:titulo", verifyToken, adminPostPlantilla)

router.get("/:user/publicaciones/:titulo",verifyToken,  userPostPlantilla)

router.get("/:admin/crear-post", verifyToken, crearPostPlantilla)

router.get("/:admin/editar/:titulo", verifyToken, editarPostPlantilla)

router.get("/:admin/eliminar/:titulo", verifyToken, eliminarPlantilla)

router.get("/:user/perfil", perfilPlantilla)

router.get("/error", errorPlantilla)

module.exports = router;