const mongoose = require('mongoose');
const stream = require("stream");
const {Schema} = mongoose;

const PacienteSchema = new Schema({
    dni: {type: String, required: true},
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    telefono: {type: String, required: true},
    mail: {type: String, required: true},
    password: {type: String, required: true},
    direccion: {type: String, required: true},
    fecha_nac: {type: Date, required: true},
    master: {type: Boolean, required: true}
});

module.exports = mongoose.model('Paciente', PacienteSchema)