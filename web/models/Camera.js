var mongoose = require("mongoose");
var CameraSchema = new mongoose.Schema({
  cameraID: {
    type: String,
    required: true,
    unique: true
  },
  cameraUrl: {
    type: String,
    required: true,
    unique: true
  },
  bedNumber: {
    type: Number,
    required: true
  },
  roomNumber: {
    type: String,
    required: true
  },
  patientID: {
    type: String
  }
});

var Camera = mongoose.model("Camera", CameraSchema);

module.exports = Camera;
