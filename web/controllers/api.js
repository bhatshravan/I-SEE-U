var User = require("../models/User");
var Patient = require("../models/Patient");

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

exports.mobile = (req, res) => {
  var user = req.body.email;
  var password = req.body.password;

  var users = user.split("@");
  var PatientID = "";

  Patient.find({ patientID: users[0] }, (err, data) => {
    try {
      // data[0].relatives[0]
    } catch (err) {
      res.send(200).json({ Success: false });
    }
  });
};

function sendRep(data, err, req, res) {
  if (err) {
    res.status(500).json({ success: false, err: data, errorData: err });
  }
}
function logs(data) {
  console.log("[API]: " + data);
}
