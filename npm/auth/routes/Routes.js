const Users = require('./Users.js');
const Stream = require('./Stream.js');
const Admin = require('./Admin.js');
const path = require('path');

module.exports = function(app){
    ///Login page
    app.all('/' , (req,res) => {
        res.render('index');
    });

    app.use('/Users',Users);

    app.get('*', (req,res) => {
        res.status(404);
        res.sendFile(path.join(_dirname + '../views/404.html'));
    });
    ///Stream page
    app.use('/Stream',Stream);

    ///Admin page
    app.use('/Admin',Admin);
}
