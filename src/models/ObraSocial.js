const mongoose = require('mongoose');
const stream = require("stream");
const {Schema} = mongoose;


const ObraSocialSchema = new Schema({
    nombre: {type: String, required: true},
    imgURL: {type: String, required: true}
});


module.exports = mongoose.model('ObraSocial', ObraSocialSchema)