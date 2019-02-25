const User = require("../models/User");
const Patient = require("../models/Patient");
// const Random = require('random');
const generator = require("generate-password");

//Patients functions
exports.newPatient = (req, res) => {
  const patientMap = new Patient({
    name: req.body.name,
    room: req.body.room,
    patientID: req.body.patientID,
    minutes: req.body.minutes
  });
  patientMap.save((err, data) => sendRep(err, data, req, res));
};

var password = generator.generate({
  length: 8,
  uppercase: false
});

exports.newRelative = (req, res) => {
  var username = req.body.patientID;

  var randomPassword = "hello,tes";
  var hashedPassword = "";
  bcrypt.hash(randomPassword, 10, function(err, hash) {
    hashedPassword = hash;
  });

  //TODO: SNED SMS
  const Relative = {
    name: req.body.name,
    phone: req.body.phone,
    password: hashedPassword
  };
  Patient.findOneAndUpdate(
    { patientID: req.body.patientID },
    { $push: { relativesList: Relative } },
    { new: true },
    (err, data) => sendRep(err, data, req, res)
  );
};

exports.updateMinutes = (req, res) => {
  Patient.findOneAndUpdate(
    req.body.PatientID,
    { $set: req.body },
    (err, data) => sendRep(err, data, req, res)
  );
};

exports.modifyPatient = (req, res) => {
  Patient.findOneAndUpdate(
    req.body.patientID,
    { $set: req.body },
    (err, data) => sendRep(err, data, req, res)
  );
};

exports.removeRelative = (req, res) => {
  Patient.findOneAndUpdate(
    req.body.patientID,
    { $pull: { relativesList: { name: req.body.name } } },
    { new: true },
    (err, data) => sendRep(err, data, req, res)
  );
};

exports.removePatient = (req, res) => {
  Patient.deleteOne({ patientID: req.body.patientID }, (err, data) =>
    sendRep(err, data, req, res)
  );
};

exports.removeRelativeAll = (req, res) => {
  Patient.findOneAndUpdate(
    req.body.patientID,
    { $pull: { relativesList: {} } },
    { new: true },
    (err, data) => sendRep(err, data, req, res)
  );
};

exports.PatientGet = (req, res) => {
  Patient.find({ patientID: req.body.patientID }, (err, data) =>
    sendRep(err, data, req, res)
  );
};

exports.PatientGetAll = (req, res) => {
  Patient.find({}, (err, data) => sendRep(err, data, req, res));
};

//Misc functions
function sendRep(err, data, req, res) {
  if (err) {
    res.status(500).json({ err: err });
    console.log("[] Error logging in: " + err);
  } else {
    res.status(200).json(data);
  }
}

function checkLogin(req, res) {
  if (req.session && req.session.userId) {
  } else {
    return res.redirect("Login");
  }
}

function logs(data) {
  console.log("[]: " + data);
}
