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
  mainName: {
    type: String,
    required: true
  },
  mainPhone: {
    type: String,
    required: true
  },
  mainPassword: {
    type: String,
    required: true
  },
  relatives: [
    {
      name: String,
      phone: String,
      password: String
    }
  ],
  cameraID: {
    type: Number,
    default: 2
  },
  vitals: {
    type: String
  },
  otp: {
    type: String
  },
  otpTime: {
    type: Number
  },
  status: {
    type: String,
    default: "enabled"
  }
});

var Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;
