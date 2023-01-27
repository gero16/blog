const { Router } = require('express');
const { errorPlantilla } = require('../controllers/auth/plantillas-auth');
const { indexPublicPlantilla } = require('../controllers/public/post-public');

const router = Router();

router.get("/", indexPublicPlantilla)

router.get("/error/:numero", errorPlantilla)

module.exports = router;

