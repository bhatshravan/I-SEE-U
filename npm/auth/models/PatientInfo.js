var mongoose = require('mongoose');

var PatientSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    room: {
        type: Number,
        required: true
    }
});

var Patient = mongoose.model('Patient',PatientSchema);
module.exports = Patient;
