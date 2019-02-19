const User = require('../models/User');
const Patient = require('../models/Patient');


//Patients functions
exports.newPatient = (req,res) => {
    const patientMap = new Patient({
        name: req.body.name,
        room :req.body.room,
        patientID: req.body.patientID,
        minutes: req.body.minutes
    });
    patientMap.save((err,data)=>sendRep(err,data,req,res));
}

exports.newRelative = (req,res) => {
    const relativeMap = new Patient({
        relativesList: [{name: req.body.name,  phone: req.body.phone, email:req.body.email}]
    });
    Patient.create(req.body.patientID,{ $set: req.body },(err,data)=>sendRep(err,data,req,res));
}


exports.modifyPatient = (req,res) => {
    Patient.findOneAndUpdate(req.body.patientID,{ $set: req.body },(err,data)=>sendRep(err,data,req,res));
}


exports.modifyRelative = (req,res) => {
    const patientMap = new Patient({
        cammeraUrl: req.body.cameraUrl,
        patientID: req.body.patientID
    });
    Patient.findOneAndUpdate(req.body.patientID,{ $set: req.body },(err,data)=>sendRep(err,data,req,res));
}

exports.removeRelative = (req,res) => {
    const patientMap = new Patient({
        cammeraUrl: req.body.cameraUrl,
        patientID: req.body.patientID
    });
    Patient.findOneAndUpdate(req.body.patientID,{ $set: req.body },(err,data)=>sendRep(err,data,req,res));
}

exports.removeRelativeAll = (req,res) => {
    const patientMap = new Patient({
        cammeraUrl: req.body.cameraUrl,
        patientID: req.body.patientID
    });
    Patient.findOneAndUpdate(req.body.patientID,{ $set: req.body },(err,data)=>sendRep(err,data,req,res));
}


exports.RelativeGet = (req,res) => {
    const patientMap = new Patient({
        cammeraID: req.body.patientID
    });
    Patient.find({"patientID": req.body.patientID},(err,data)=>sendRep(err,data,req,res));
}

exports.PatientGet = (req,res) => {
    const patientMap = new Patient({
        cammeraID: req.body.patientID
    });
    Patient.find({"patientID": req.body.patientID},(err,data)=>sendRep(err,data,req,res));
}

exports.PatientGetAll = (req,res) => {
    const patientMap = new Patient({
        cammeraID: req.body.patientID
    });
    Patient.find((err,data)=>sendRep(err,data,req,res));
}



//Misc functions
function sendRep(err,data,req,res){
    if(err){
        res.status(500).json({err: err});
        console.log('[] Error logging in: '+err);
    }
    else{
        //res.redirect('/index');
        res.status(200).json(data);
    }
}

function checkLogin(req,res) {
    if (req.session && req.session.userId)
    {    }
    else
    {
        return res.redirect("Login");
    }
}

function logs(data){
    console.log('[]: '+data);
}
