const { Router } = require('express');

const { loginUsuario, logoutUsuario, crearUsuario, confirmarCuenta, eliminarUsuario, contacto } = require("../../controllers/auth/usuarios-auth");
const { checkEmptyData, datosExistentes } = require("../../middleware/auth-middleware");

const router = Router();

router.post("/:user/logout", logoutUsuario)

router.post("/registrar", datosExistentes, crearUsuario);

router.get("/:user/confirmar/:token", confirmarCuenta)

router.post("/:admin/eliminar-usuario/:user", eliminarUsuario)

router.post("/contacto",  contacto)


module.exports = router;