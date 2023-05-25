const { Router } = require('express');

const { adminNotificaciones, actualizarNotificacion } = require('../../controllers/auth/usuarios-auth');

const router = Router();


router.get("/admin/:admin/notificaciones", adminNotificaciones)

router.post("/admin/:admin/notificaciones", actualizarNotificacion)



module.exports = router;