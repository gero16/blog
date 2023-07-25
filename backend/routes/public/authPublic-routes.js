
const { Router } = require('express');
const { loginUsuario, logoutUsuario  } = require('../../controllers/auth/usuarios-auth');
const { checkEmptyData, validarLogin } = require('../../middleware/auth-middleware');


const router = Router();


router.post('/login', [checkEmptyData, validarLogin], loginUsuario);

router.post("/:user/logout", logoutUsuario)


module.exports = router;