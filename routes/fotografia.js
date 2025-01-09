const express = require('express');
const router = express.Router();
const fotografias = require('../controllers/fotografias');
const md_auth = require('../middlewares/verifyJWT')
const cm = require('connect-multiparty')

const md_upload = cm({uploadDir: './uploads/fotografias'})

//router.get('/listar', md_auth.verifyAuth, usuario.list);
router.post('/guardar', md_auth.verifyAuth, fotografias.create);
router.post('/actualizar/:id', md_auth.verifyAuth, fotografias.update);
router.post('/subir-foto/:id', md_upload, fotografias.uploadFotografia)
router.get('/get-foto/:fotografia/:thumb', md_upload, fotografias.getFotografia)
router.get('/', fotografias.getAll);
router.get('/admin', md_auth.verifyAuth, fotografias.getAllAdmin);
router.get('/:id', md_auth.verifyAuth, fotografias.getById);

module.exports = router;