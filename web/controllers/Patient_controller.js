const User = require("../models/User");
const Patient = require("../models/Patient");
const creds = require("../creds");
const axios = require("axios");
const bcrypt = require("bcrypt");
const generator = require("generate-password");

//Patients functions 9738267219
exports.newPatient = (req, res) => {
  var patientID = req.body.patientID;
  patientID = patientID.replace(" ", "");
  //var phone = (req.body.phone);
  //phone = phone.replace("+","").replace("(","").replace(")","").replace("-","").replace(" ", "");
  var relPusher = req.body.relatives;
  for (i in relPusher) {
    var password = generator.generate({
      length: 6,
      uppercase: false
    });
    var phone = relPusher[i].phone;
    var finalPush = "";
    var finalUser = patientID + "@" + parseInt(phone + ".0").toString(36);
    console.log(
      "[ E[" +
        i +
        "] ]" +
        relPusher[i].name +
        " , " +
        finalUser +
        " , " +
        password +
        "\n"
    );

    bcrypt.hash(password, 2, function(err, hash) {
      relPusher[i].password = hash;
      const patientMap = new Patient({
        name: req.body.name,
        room: req.body.room,
        patientID: patientID.toLowerCase(),
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
        bed: req.body.bed,
        relatives: relPusher,
        cameraID: Math.floor(Math.random() * 3 + 1)
      });
      //relatives: req.body.relatives

      patientMap.save((err, data) => {
        sendToPage3(
          phone,
          finalUser,
          password,
          err,
          data,
          req,
          res,
          "AdminDashboard/addPatients"
        );
      });
    });
    //sendSmsInitial(phone, finalUser, password);
  }
};

exports.changeStream = (req, res) => {};

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

//Patients functions 9738267219
exports.newPatient = (req, res) => {
  var patientID = req.body.patientID;
  patientID = patientID.replace(" ", "");
  var relPusher = req.body.relatives;
  for (i in relPusher) {
    var password = generator.generate({
      length: 6,
      uppercase: false
    });
    var phone = relPusher[i].phone;
    var finalPush = "";
    var finalUser = patientID + "@" + parseInt(phone + ".0").toString(36);

    bcrypt.hash(password, 2, function(err, hash) {
      relPusher[i].password = hash;
      const patientMap = new Patient({
        name: req.body.name,
        room: req.body.room,
        patientID: patientID.toLowerCase(),
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
        bed: req.body.bed,
        relatives: relPusher,
        cameraID: Math.floor(1)
      });
      //relatives: req.body.relatives
      //cameraID: Math.floor(Math.random() * 3 + 1)

      patientMap.save((err, data) => {
        sendToPage3(
          phone,
          finalUser,
          password,
          err,
          data,
          req,
          res,
          "AdminDashboard/addPatients"
        );
      });
    });
    sendSmsInitial(phone, finalUser, password);
  }
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
function sendToPage3(
  phone,
  finalUser,
  password,
  err,
  data,
  req,
  res,
  redirect
) {
  if (err) {
    console.log("[] Error logging in: " + err);
    res.render(redirect, { Success: false });
  } else {
    res.render(redirect, { Success: true });
    //sendSms(phone, finalUser, password);
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

function logs2(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log("[]: " + data);
  }
}

function sendSmsInitial(mobile, user, password) {
  var url = "http://api.msg91.com/api/sendhttp.php";

  logs("Message sent to: " + mobile);
  var message =
    "You have been registered for Streaming Facility at Apollo Hospitals\nUsername:" +
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
      logs("Message sent successfully");
    })
    .catch(function(error) {
      console.log(error);
    });
}

function sendSmsOTP(mobile, fromMobile, from, otp) {
  message =
    "Your assoicate " +
    from +
    " wants to view the stream with mobile no " +
    fromMobile +
    "\nTo allow access, please ask them to enter the\nOTP: ";

  var url = "http://api.msg91.com/api/sendhttp.php";

  logs("Message sent to: " + mobile);

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
      logs("Message sent successfully");
    })
    .catch(function(error) {
      console.log(error);
    });
}
