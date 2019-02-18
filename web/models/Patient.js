var mongoose = require("mongoose");
var PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  patientID: {
      type: String,
      required: true
  }
});