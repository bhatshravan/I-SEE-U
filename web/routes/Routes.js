const express = require('express');
const path = require('path');
const User_controller = require('../controllers/Users_controllers');
const Stream_controller = require('../controllers/Stream_controller');
const Admin_controller = require('../controllers/Admin_controller');
const authError = (err, req, res, next) => {
     return res.status(401).json({ success: false, message: 'unauthorized' });
    //return res.redirect('/login.html');
};


module.exports = app => {

    const Users = express.Router();
    const Stream = express.Router();
    const Admin = express.Router();

    ///Login page
    app.all('/' , (req,res) => {
        res.render('login');
    });

    app.get('/register', (req,res) => {
        res.render('register');
    });

    //Users login page
    app.use('/Users',Users);
    Users.post('/Register',User_controller.create);
    Users.post('/Login',User_controller.authenticate);
    //Users.all('/Logout', User_controller.logout);


    app.all('/Logout',User_controller.logout);

    ///Stream page
    app.use('/Stream',Stream);
    Stream.get('/Main',Stream_controller.create);
    Stream.get('/Test',Stream_controller.test);


    ///Admin page
    // app.use('/Admin',Admin);
    app.use('/index',requiresLogin, Admin_controller.main, authError);

    //Error page
    app.get('*', (req,res) => {
        res.status(404);
        res.render('404');
    });
}

function requiresLogin(err, req, res, next) {
    console.log("Requires login");
    if (req.session && req.session.userId)
    {
        console.log("test");
        return next();
    }
    else
    {
        console.log("error");
        return next(err);
    }
}
