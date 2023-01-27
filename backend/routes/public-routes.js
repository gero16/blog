const { Router } = require('express');
const { errorPlantilla } = require('../controllers/auth/plantillas-auth');
const { indexPublic } = require('../controllers/public/post-public');

const router = Router();

router.get("/", indexPublic)

router.get("/error/:numero", errorPlantilla)

module.exports = router;

