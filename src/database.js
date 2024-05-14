const mongoose = require('mongoose');

module.exports = async function conect() {

    // Cadena de conexión a MongoDB Atlas
    const connectionString = 'mongodb+srv://ValenCasesi:proyectofinal@clinicaodontologica.ihmfcty.mongodb.net/?retryWrites=true&w=majority&appName=clinicaOdontologica';
    
    // Conectar a la base de datos
    mongoose.connect(connectionString)
    .then(() => {
    console.log('Conexión exitosa a MongoDB Atlas');
    })
    .catch((error) => {
    console.error('Error al conectar a MongoDB Atlas:', error);
    });


}