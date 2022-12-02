const { Router } = require('express');
const { indexPrincipal } = require('../controllers/auth');

const router = Router();

router.get("/", indexPrincipal)



module.exports = router;

