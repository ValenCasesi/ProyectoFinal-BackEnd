const mongoose = require('mongoose');
const stream = require('stream');
const {Schema} = mongoose;

const PracticaSchema = new Schema({
        nombre: {type: String, required: true}
    }
);

module.exports = mongoose.model('Practica', PracticaSchema);
