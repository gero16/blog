const { Router } = require('express');


const { indexPlantilla, adminPostPlantilla, userPostPlantilla, crearPostPlantilla, editarPostPlantilla, eliminarPlantilla, perfilPlantilla, errorPlantilla } = require("../../controllers/auth/plantillas-auth")
const { sesion } = require("../../controllers/auth/usuarios-auth")
const { esAdmin } = require("../../helpers/validators")
const { verifyTokenPlantillas } = require("../../middleware/auth-middleware")


const router = Router();

router.get("/:user/index", indexPlantilla)

router.post("/:user/info-sesion", sesion)

router.get("/:admin/publicaciones/:titulo", [esAdmin, verifyTokenPlantillas], adminPostPlantilla)

router.get("/:user/publicaciones/:titulo",  userPostPlantilla)

router.get("/:admin/crear-post", verifyTokenPlantillas, crearPostPlantilla)

router.get("/:admin/editar/:titulo",  editarPostPlantilla)

router.get("/:admin/eliminar/:titulo", [esAdmin, verifyTokenPlantillas], eliminarPlantilla)

router.get("/:user/perfil", perfilPlantilla)

router.get("/error", errorPlantilla)

module.exports = router;