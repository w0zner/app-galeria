const express = require('express');
const router = express.Router();
const fotografias = require('../controllers/fotografias');
const md_auth = require('../middlewares/verifyJWT')
const cm = require('connect-multiparty')

const md_upload = cm({uploadDir: './uploads/fotografias'})

//router.get('/listar', md_auth.verifyAuth, usuario.list);
router.post('/guardar', fotografias.create);
router.post('/actualizar/:id', fotografias.update);
router.post('/subir-foto/:id', md_upload, fotografias.uploadFotografia)
router.get('/get-foto/:fotografia/:thumb', md_upload, fotografias.getFotografia)

module.exports = router;