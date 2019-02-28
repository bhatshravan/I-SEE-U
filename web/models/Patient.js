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
      phone: String,
      password: { type: String, required:false }
    }
  ],
  cameraID:{
    type: Number,
    default:2
  },
  vitals: {
    type: String
  },
  status: {
    type: String,
    default: "enabled"
  }
});

var Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;
