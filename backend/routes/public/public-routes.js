const { Router } = require('express');
const { errorPlantilla } = require('../../controllers/auth/plantillas-auth');
const { indexPublicPlantilla, postPlantillaPublic } = require('../../controllers/public/post-public');

const router = Router();

router.get("/", indexPublicPlantilla)

router.get("/error/:numero", errorPlantilla)

router.get("/publicaciones/:titulo/", postPlantillaPublic) // Esta que hace aca ?

module.exports = router;

