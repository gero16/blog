
const { Router } = require('express');
const { indexPlantilla } = require('../../controllers/auth/plantillas-auth');
const { loginUsuario, logoutUsuario  } = require('../../controllers/auth/usuarios-auth');
const { checkEmptyData } = require('../../middleware/auth-middleware');


const router = Router();

router.get("/:user/index", indexPlantilla)

router.post('/login', checkEmptyData, loginUsuario);

router.post("/:user/logout", logoutUsuario)


module.exports = router;