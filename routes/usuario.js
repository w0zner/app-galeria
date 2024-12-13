const express = require('express');
const router = express.Router();
const usuario = require('../controllers/usuarios');

router.post('/login', usuario.login);
router.get('/listar', usuario.list);
router.post('/crear', usuario.create);

module.exports = router;
