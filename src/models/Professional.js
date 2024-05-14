const mongoose = require('mongoose');
const stream = require("stream");
const {Schema} = mongoose;

const Schedule = require('./Schedule');

const ProfessionalSchema = new Schema({
    dni: {type: String, required: true},
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    telefono: {type: String, required: true},
    mail: {type: String, required: true},
    direccion: {type: String, required: true},
    fecha_nac: {type: Date, required: true},
    schedules: {type: [mongoose.SchemaTypes.ObjectId], ref: 'Schedule', required: false},
    obrasSociales: {type: [mongoose.SchemaTypes.ObjectId], ref: 'ObraSocial', required: false},
    practicas: {type: [mongoose.SchemaTypes.ObjectId], ref: 'Practice', required: false},
});

module.exports = mongoose.model('Professional', ProfessionalSchema)