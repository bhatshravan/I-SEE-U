const User = require('../models/User');
exports.login = (req,res) => {
    res.status(200);
    res.send("Welcome to login page");
};


exports.create = (req,res) => {
    res.status(200);
    if (req.body.email &&
        req.body.password)
        //req.body.passwordConf)
    {
        var UserData = {
            email: req.body.email,
            password: req.body.password
        }
        logs(UserData);
        //
        User.create(UserData, function(err, user){
            if(err) {
                return sendRep('Insertion error',err,req,res);
            }
            else {
                return res.status(200).send('No error,successfully inserted')
            }
        });
        // res.status(200).json({success:true, msg:"Data successfully inserted"});
    }
    else {
        return res.status(403).json({ success: false, error: 'Error occured, no data given' });
    }
};

exports.authenticate = (req,res) => {

    if(req.body.email && req.body.password)
    {
        var user = req.body.email;
        var passwd = req.body.password;
        logs('User: '+user+' successfully logged in at:'+Date.now());
        User.authenticate(user ,passwd, (err, user) => {
            if(err || !user) {
                var error = new Error('Wrong email or password\n'+err);
                return sendRep(error, error, req,res);
            }
            else
            {
                console.log(user);
                var test2 = user.email;
                console.log(test2);
                return res.status(200).json({ success:true , msg: "User logged in"})
            }
        });
    }
    else
    {
        sendRep('Please enter user and reject');
    }
};

function sendRep(data,err,req,res)
{
    //console.log('\n\n['+req.method+']'+req.url);
    console.log(err);
    if(err)
    {
        res.status(500).json({ err: data });
        console.log(err);
    }
}
function logs(data){
    console.log(data);
}
