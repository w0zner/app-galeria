const express = require('express');
const router = express.Router();
const usuario = require('../controllers/usuarios');
const md_auth = require('../middlewares/verifyJWT')

router.post('/login', usuario.login);
router.get('/listar', md_auth.verifyAuth, usuario.list);
router.post('/crear', usuario.create);

module.exports = router;
