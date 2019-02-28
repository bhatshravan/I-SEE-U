const User = require("../models/User");
const Patient = require("../models/Patient");
const creds = require("../creds");
const axios = require("axios");
const bcrypt = require("bcrypt");
const generator = require("generate-password");

function insertAndSmsReltive(req, res, patientID, name, phone, render) {
  var password = generator.generate({
    length: 6,
    uppercase: false
  });
  var hashedPassword = "";
  bcrypt.hash(password, 2, function(err, hash) {
    if (err) {
      console.log(err);
    }
    var finalUser = username + "@" + parseInt(phone).toString(36);

    const Relative = {
      name: name,
      phone: phone,
      password: hash
    };

    console.log("Username is: " + finalUser);
    console.log("Password is: " + password);
    console.log("Hash is: " + hash);
    Patient.findOneAndUpdate(
      { patientID: req.body.patientID },
      { $push: { relativesList: Relative } },
      { new: true },
      (err, data) => logs("New relative added")
    );
    //sendSms(phone, finalUser, password);
  });
}

function sendSms(mobile, user, password) {
  var url = "http://api.msg91.com/api/sendhttp.php";

  logs("Message sent to: " + mobile);
  var message =
    "You have been registered for I-SEE-YOU Facility at Apollo Hospitals\nUsername:" +
    user +
    "\nPassword:" +
    password;
  //return res.redirect('/login');
  axios
    .get(url, {
      params: {
        country: 91,
        sender: "DBLHLX",
        route: 4,
        mobiles: "91" + mobile,
        authkey: creds.api,
        message: message
      }
    })
    .then(function(response) {
      //console.log(response);
      log("Message sent successfully");
    })
    .catch(function(error) {
      console.log(error);
    });
}

//Patients functions
exports.newPatient = (req, res) => {
  const patientMap = new Patient({
    name: req.body.name,
    room: req.body.room,
    patientID: req.body.patientID.replace(" ",""),
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
    bed: req.body.bed
  });
  //relatives: req.body.relatives

  patientMap.save((err, data) =>
    sendToPage(err, data, req, res, "AdminDashboard/addPatients")
  );
  var relatives = req.body.relatives;

  for (i in relatives) {
    var username = req.body.patientID;
    var name = relatives[i].name;
    var phone = relatives[i].phone;

    var password = generator.generate({
      length: 6,
      uppercase: false
    });
    var hashedPassword = "";
    bcrypt.hash(password, 2, function(err, hash) {
      if (err) {
        console.log(err);
      }
      var finalUser = username + "@" + parseInt(phone).toString(36);

      const Relative = {
        name: name,
        phone: phone,
        password: hash
      };

      Patient.findOneAndUpdate(
        { patientID: username},
        { $push: { relativesList: Relative } },
        { new: true },
        (err, data) => logs("[ E[" + i + "] ]" + relatives[i].name + " , " + finalUser +" , " + password)
      );
      //sendSms(phone, finalUser, password);
    });
  }
};

exports.newRelative = (req, res) => {
  var username = req.body.patientID;
  var phone = req.body.phone;

  var password = generator.generate({
    length: 6,
    uppercase: false
  });
  var hashedPassword = "";
  bcrypt.hash(password, 2, function(err, hash) {
    if (err) {
      console.log(err);
    }
    var finalUser = username + "@" + parseInt(phone).toString(36);

    const Relative = {
      name: req.body.name,
      phone: req.body.phone,
      password: hash
    };
    Patient.findOneAndUpdate(
      { patientID: req.body.patientID },
      { $push: { relativesList: Relative } },
      { new: true },
      (err, data) => sendRep(err, data, req, res)
    );
  });
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
  Patient.deleteOne({ _id: req.query.patientID }, (err, data) =>
    res.redirect("../AdminDashboard/patients")
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

function sendToPage(err, data, req, res, redirect) {
  if (err) {
    console.log("[] Error logging in: " + err);
    res.render(redirect, { Success: false });
  } else {
    res.render(redirect, { Success: true });
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
