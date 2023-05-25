const { Router } = require('express');

const { loginUsuario, logoutUsuario, crearUsuario, confirmarCuenta, getUsuarios, validateToken, eliminarUsuario, contacto } = require("../../controllers/auth/usuarios-auth");
const { checkEmptyData, datosExistentes, verifyToken } = require("../../middleware/auth-middleware");

const router = Router();


router.post('/login', checkEmptyData, loginUsuario);

router.post("/:user/logout", logoutUsuario)

router.post("/registrar", datosExistentes, crearUsuario);

router.get("/:user/confirmar/:token", confirmarCuenta)

router.post("/:admin/eliminar-usuario/:user", eliminarUsuario)

router.post("/contacto",  contacto)


module.exports = router;