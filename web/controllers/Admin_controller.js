const User = require('../models/User');
const Camera = require('../models/Camera');

exports.main = (req,res) => {
    // res.render('DoubleHelix/index' , { email: req.session.userEmail });
    //checkLogin(req,res);
    res.render('index');
}


//Test login
exports.direct = (req,res) =>
{
    var user  = "bhatshravan3@yahoo.com";
    logs(user+' giving direct login');
    User.findOne({email:user},
        (err,data) => {
            req.session.userId = data._id;
            req.session.userEmail = data.email;
            logs(data.email);
            res.status(200).json({ success:true,data: data.email });
            //sendRep(err,data,req,res);
        });
    




//Camera functions
exports.cameraMap = (req,res) => {
    const cameraMap = new Camera({
        cameraID: req.body.cameraID,
        cameraUrl: req.body.cameraUrl,
        bedNumber: req.body.bedNumber,
        roomNumber: req.body.roomNumber,
        patientID: req.body.patientID
    });
    cameraMap.save((err,data)=>sendRep(err,data,req,res));
}

exports.cameraUpdate = (req,res) => {
    const cameraMap = new Camera({
        cammeraUrl: req.body.cameraUrl,
        patientID: req.body.patientID
    });
    Camera.findOneAndUpdate(req.body.cameraID,{ $set: req.body },(err,data)=>sendRep(err,data,req,res));
}

exports.cameraGet = (req,res) => {
    const cameraMap = new Camera({
        cammeraID: req.body.cameraID
    });
    Camera.find({"cameraID": req.body.cameraID},(err,data)=>sendRep(err,data,req,res));
}
exports.cameraGetAll = (req,res) => {
    const cameraMap = new Camera({
        cammeraID: req.body.cameraID
    });
    Camera.find((err,data)=>sendRep(err,data,req,res));
}

exports.cameraRemove = (req,res) => {
    Camera.remove({"cameraID": req.body.cameraID},(err,data)=>sendRep(err,data,req,res));
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
