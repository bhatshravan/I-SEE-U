const express = require('express');
const path = require('path');
const User_controller = require('../controllers/Users_controllers');
const Stream_controller = require('../controllers/Stream_controller');

const authError = (err, req, res, next) => {
    // return res.status(401).json({ success: false, message: 'unauthorized' });
    return res.redirect('/login.html');
};


module.exports = app => {

    const Users = express.Router();
    const Stream = express.Router();
    const Admin = express.Router();

    ///Login page
    app.all('/' , (req,res) => {
        res.render('index.ejs');
    });

    //Users login page
    app.use('/Users',Users);
    Users.get('/LogIn',User_controller.login);
    Users.post('/Register',User_controller.create);
    Users.post('/LogIn',User_controller.authenticate);

    app.all('/Test', (req,res) => {
        res.redirect('/login.html');
    });

    ///Stream page
    app.use('/Stream',Stream);
    Stream.get('/Main',Stream_controller.create);
    Stream.get('/Test',Stream_controller.test);


    ///Admin page
    app.use('/Admin',Admin);
    Admin.all('/Test',requiresLogin, User_controller.create, authError);
    // router.get('/profile', mid.requiresLogin, function(req, res, next) {
    // });

    //Error page
    app.get('*', (req,res) => {
        res.status(404);
        res.render('404');
    });
}

function requiresLogin(err, req, res, next) {
    if (req.session && req.session.userId2)
    {
        return next();
    }
    else
    {
        return next(err);
    }
}
