
const { Router } = require('express');
const { loginUsuario, logoutUsuario  } = require('../../controllers/auth/usuarios-auth');
const { checkEmptyData } = require('../../middleware/auth-middleware');

const router = Router();

router.post('/login', checkEmptyData, loginUsuario);
router.post("/:user/logout", logoutUsuario)


module.exports = router;