var mongoose = require('mongoose');
var DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    doctorID: {
        type: String,
        required: true
    },
    patientID: [{
        patientID: {
            type: String
        }
    }]
});

var Doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = Doctor;
