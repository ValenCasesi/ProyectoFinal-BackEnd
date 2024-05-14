const mongoose = require('mongoose');
const stream = require("stream");
const {Schema} = mongoose;


const ScheduleSchema = new Schema({
    dia: {type: String, required: true},
    hsDesde: {type: Number, required: true},
    hsHasta: {type: Number, required: true},
    state: {type: Boolean, required: true},
});

module.exports = mongoose.model('Schedule', ScheduleSchema)