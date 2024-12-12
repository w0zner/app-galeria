const mongoose = require('mongoose');
require('dotenv').config()

const mongoURI = process.env.BD_URL

mongoose
  .connect(mongoURI)
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((err) => console.error('Error conectando a MongoDB:', err));

module.exports = mongoose;
