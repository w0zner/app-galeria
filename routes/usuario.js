const express = require('express');
const router = express.Router();
const usuario = require('../controllers/usuarios');

router.get('/list', usuario.list);
router.post('/create', usuario.create);

module.exports = router;
