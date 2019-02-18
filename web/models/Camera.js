var mongoose = require("mongoose");
var CameraSchema = new mongoose.Schema({
  cameraID: {
    type: String,
    required: true
  },
  bedNumber: {
    type: Number,
    required: true
  },
  roomNumber: {
    type: Number,
    required: true
  },
  patientID: {
    type: String,
    required: true
  }
});

var Camera = mongoose.model("Camera", CameraSchema);

module.exports = Camera;
