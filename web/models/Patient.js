var mongoose = require("mongoose");
var PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  patientID: {
    type: String,
    required: true
  },
  minutes: {
    type: Number
  },
  relativesList: [{ name: String, phone: Number, email: String }]
});

var Patient = mongoose.model("Patient", PatientSchema);

module.exports(Patient);