const { Router } = require('express');

const { olvidePasswordPlantilla, cambiarPassword } = require('../../controllers/auth/plantillas-auth');
const { olvidePassword, comprobarPassword, nuevoPassword } = require('../../controllers/auth/usuarios-auth');


const router = Router();


router.get("/olvide-password", olvidePasswordPlantilla)

router.get("/cambiar-password", cambiarPassword)

router.post("/olvide-password", olvidePassword)

// Confirmar - A traves de email
router.route("/:usuario/olvide-password/:token").get(comprobarPassword).post(nuevoPassword)



module.exports = router;
