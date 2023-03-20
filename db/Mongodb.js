const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/productos', (err) => {
  if (err) {
    console.log(`Error al conectar a la base de datos: ${err}`);
  } else {
    console.log('Conexión establecida a MongoDB');
  }
});

module.exports = mongoose;