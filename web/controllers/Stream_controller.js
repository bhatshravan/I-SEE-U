const path = require('path');

exports.create = (req,res) => {
    return res.status(400).json({ "Stream": "Stream error"});
}

exports.test = (req,res) => {
    res.redirect('/login.html');
}

exports.stream = (req,res) => {
    res.render('stream');
}
