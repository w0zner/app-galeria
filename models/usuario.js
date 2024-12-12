const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  password: { type: String, required: true },
  rol: { type: String },
  activo: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
