const User = require('User');
exports.login = (req,res) => {
    res.status(200);
    res.send("Welcome to login page");
};


exports.create = (req,res) => {
    res.status(200);
    if (req.body.email &&
        req.body.password 
        //req.body.passwordConf)
    {
        var UserData = {
            email: req.body.email,
            password: req.body.password
        }

        User.create(UserData, function(err, user){
            if(err) {
                return next(err)
            }
            else {
                return res.send('No error,successfully inserted')
            }
        })
    }
};
