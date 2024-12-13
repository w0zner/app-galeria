const mongoose = require('mongoose');

const FotografiaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  imagen: { type: String },
  numero: { type: Number },
  autor: { type: String, required: true },
  activo: { type: Boolean, default: true },
  usuario_creacion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, },
});

module.exports = mongoose.model('Fotografia', FotografiaSchema);
