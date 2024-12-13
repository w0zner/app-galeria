const express = require('express');
const router = express.Router();
const fotografias = require('../controllers/fotografias');
const md_auth = require('../middlewares/verifyJWT')


//router.get('/listar', md_auth.verifyAuth, usuario.list);
router.post('/guardar', fotografias.create);
router.post('/actualizar/:id', fotografias.update);

module.exports = router;