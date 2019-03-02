var User = require("../models/User");
var Patient = require("../models/Patient");
var bcrypt = require("bcrypt");

exports.authenticate = (req, res) => {
  if (req.body.email && req.body.password) {
    var user = req.body.email;
    var passwd = req.body.password;
    logs(user + " tried to log in");
    User.authenticate(user, passwd, (err, user) => {
      if (err || !user) {
        var error = new Error("Wrong email or password\n" + err);
        return sendRep("Wrong email or password", error, req, res);
      } else {
        bcrypt.hash(myPlaintextPassword, 10, function(err, hash) {
          var UserMod = new User({
            email: user
          });
          logs(user._id + " successfully logged in");
          res.status(200).json({ success: true, api: api_key });
        });
      }
    });
  } else {
    var error = "Please enter username and password";
    logs(req.body.email);
    sendRep(error, error, req, res);
  }
};

exports.login = (req, res) => {
  var user = req.body.email;
  var password = req.body.password;

  var users = user.split("@");
  var PatientID = "";

  //Miriam Mcgee , Autexpl@46mu7zr , pbkcet
  var finalPhone = parseInt(users[1], 36);
  var flag = false;
  Patient.findOne({ patientID: users[0] }, (err, data) => {
    if (err) {
      res.status(200).json({ Success: false, error: "Couldnt query database" });
    } else {
      try {
        var relatives = data.relatives;
        for (i in relatives) {
          if (relatives[i].phone == finalPhone && i != "_parent") {
            flag = true;
            console.log(
              "Log in to user: " +
                data.patientID +
                "\nby relative:" +
                relatives[i].phone +
                "\n"
            );
            bcrypt.compare(password, relatives[i].password, (err, result) => {
              if (result === true) {
                res.status(200).json({
                  Success: true,
                  patientID: data.patientID,
                  cameraID: data.cameraID,
                  phone: finalPhone
                });
              } else {
                res
                  .status(200)
                  .json({ Success: false, err: "Password incorrect" });
              }
            });
          }
        }
        if (!flag)
          res.status(200).json({ Success: false, error: "No user found" });
      } catch (err) {
        res.status(200).json({ Success: false, error: "No user found" });
      }
    }
  });
  // res.send(200).json({ Success: false, error: "Err" });
};

function sendRep(data, err, req, res) {
  if (err) {
    res.status(500).json({ success: false, err: data, errorData: err });
  }
}
function logs(data) {
  console.log("[API]: " + data);
}
