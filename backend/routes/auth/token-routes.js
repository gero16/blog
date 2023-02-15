
const { Router } = require('express');


const { validateToken } = require("../../controllers/auth/usuarios-auth");
const { verifyToken  } = require("../../middleware/auth-middleware");

const router = Router();


// Seccion actualizacion de contenido

// Este token es el que verifica las
router.post("/validate-token", verifyToken, validateToken)


module.exports = router;