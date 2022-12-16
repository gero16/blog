const { Router } = require('express');
const { indexPrincipal } = require('../controllers/auth');
const { errorPlantilla } = require('../controllers/auth/plantillas');

const router = Router();

router.get("/", indexPrincipal)

router.get("/error/:numero", errorPlantilla)


module.exports = router;

