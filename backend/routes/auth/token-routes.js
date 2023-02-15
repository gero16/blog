
const { Router } = require('express');


const { validateToken } = require("../../controllers/auth/usuarios-auth");
const { verifyToken } = require("../../middleware/auth-middleware");

const router = Router();


// Seccion actualizacion de contenido

router.post("/validate-token", verifyToken, validateToken)



module.exports = router;