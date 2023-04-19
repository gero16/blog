const { Router } = require('express');
const { errorPlantilla } = require('../../controllers/auth/plantillas-auth');
const { indexPublicPlantilla, postPlantillaPublic } = require('../../controllers/public/post-public');
const { contacto } = require('../../controllers/auth/usuarios-auth');

const router = Router();

router.get("/", indexPublicPlantilla)

router.get("/error/:numero", errorPlantilla)

router.get("/publicaciones/:titulo/", postPlantillaPublic) // Esta que hace aca ?

router.post("/contacto", contacto)

module.exports = router;

