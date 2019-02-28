var mongoose = require("mongoose");
var PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  room: {
    type: String
  },
  bed: {
    type: String
  },
  phone: {
    type: String
  },
  patientID: {
    type: String,
    required: true,
    unique: true
  },
  relatives: [
    {
      name: String,
      phone: String
    }
  ],
  vitals: {
    type: String
  }
});

var Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;
