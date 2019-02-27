const express = require("express");
const path = require("path");
const User_controller = require("../controllers/Users_controllers");
const Stream_controller = require("../controllers/Stream_controller");
const Admin_controller = require("../controllers/Admin_controller");
const Patient_controller = require("../controllers/Patient_controller");

const Camera = require("../models/Camera");

const authError = (err, req, res, next) => {
  return res.status(401).json({ success: false, message: "unauthorized" });
  //return res.redirect('/login.html');
};

module.exports = app => {
  const Users = express.Router();
  const Stream = express.Router();
  const Admin = express.Router();
  const Patient = express.Router();

  ///Login page
  app.all("/", (req, res) => {
    res.render("login");
  });
  app.all("/Login", (req, res) => {
    res.render("login");
  });

  app.get("/register", (req, res) => {
    res.render("register");
  });

  app.get("/AdminDashboard/index", (req, res) => {
    res.render("AdminDashboard/index");
  });
  app.get("/AdminDashboard/contact", (req, res) => {
    res.render("AdminDashboard/contact");
  });
  app.get("/AdminDashboard/addPatients", (req, res) => {
    res.render("AdminDashboard/addPatients");
  });
  app.get("/AdminDashboard/cameras", (req, res) => {
    Camera.find((err, data) =>
      res.render("AdminDashboard/cameras", { cameras: data })
    );
  });
  app.get("/AdminDashboard/patients", (req, res) => {
    res.render("AdminDashboard/patients");
  });

  app.get("/PatientDashboard/index", (req, res) => {
    res.render("PatientDashboard/index");
  });
  app.get("/PatientDashboard/documents", (req, res) => {
    res.render("PatientDashboard/documents");
  });
  app.get("/PatientDashboard/bestWishes", (req, res) => {
    res.render("PatientDashboard/bestWishes");
  });

  app.post("/Login/test", Patient_controller.test);

  app.all("/SMS", Admin_controller.sendSms);

  //Users login page
  app.use("/Users", Users);
  Users.post("/Register", User_controller.create);
  Users.post("/Login", User_controller.authenticate);
  //Users.all('/Logout', User_controller.logout);

  app.all("/Logout", User_controller.logout);

  ///Stream page
  app.use("/Stream", Stream);
  Stream.get("/Main", Stream_controller.stream);
  Stream.get("/Test", Stream_controller.test);

  app.use("/index", requiresLogin, Admin_controller.main, authError);

  ///Admin page
  app.use("/Admin", Admin);
  Admin.post("/Test", Admin_controller.direct);
  Admin.post("/CamMap", requiresLogin, Admin_controller.cameraMap, authError);
  Admin.post("/CamUpdate", Admin_controller.cameraUpdate);
  Admin.post("/CamGet", Admin_controller.cameraGet);
  Admin.post("/CamGetAll", Admin_controller.cameraGetAll);
  Admin.post("/CamRemove", Admin_controller.cameraRemove);

  //Patient
  app.use("/Patient", Patient);
  Patient.post("/newPatient", Patient_controller.newPatient);
  Patient.post("/newRelative", Patient_controller.newRelative);
  Patient.post("/updateMinutes", Patient_controller.updateMinutes);
  Patient.post("/modifyPatient", Patient_controller.modifyPatient);
  Patient.post("/removeRelative", Patient_controller.removeRelative);
  Patient.post("/removeRelativeAll", Patient_controller.removeRelativeAll);
  Patient.post("/patientGet", Patient_controller.removeRelative);
  Patient.post("/patientGetAll", Patient_controller.PatientGetAll);
  Patient.post("/removePatient", Patient_controller.removePatient);

  //Error page
  app.get("*", (req, res) => {
    res.status(404);
    res.render("404");
  });
};

function requiresLogin(err, req, res, next) {
  console.log("test2");
  if (req.session && req.session.userId) {
    console.log("test");
    return next();
  } else {
    console.log("error");
    return next(err);
  }
}
