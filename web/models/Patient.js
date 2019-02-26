var mongoose = require("mongoose");
var PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    room :{
        type: String,
    },
    patientID: {
        type: String,
        required: true
    },
    minutes: {
        type: Number
    },
    relatives: [{
        name: String, phone: Number, password: String
    }],
    vitals: {
        type: String
    },
    documents: {
        type: String
    }

});

var Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;
