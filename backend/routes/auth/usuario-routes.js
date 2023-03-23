const { Router } = require('express');
const { usuariosPlantilla } = require('../../controllers/auth/plantillas-auth');


const { loginUsuario, logoutUsuario, crearUsuario, confirmarCuenta, getUsuarios, validateToken, eliminarUsuario } = require("../../controllers/auth/usuarios-auth");
const { checkEmptyData, datosExistentes, verifyToken } = require("../../middleware/auth-middleware");

const router = Router();


router.post('/login', checkEmptyData, loginUsuario);

router.post("/:user/logout", logoutUsuario)

router.post("/registrar", datosExistentes, crearUsuario);

router.get("/:user/confirmar/:token", confirmarCuenta)

router.get("/:admin/users", usuariosPlantilla)


router.post("/users/eliminar", eliminarUsuario)


module.exports = router;