var User = require('../models/User');

exports.authenticate = (req,res) => {
    if(req.body.email && req.body.password)
    {
        var user = req.body.email;
        var passwd = req.body.password;
        logs(user+' tried to log in');
        User.authenticate(user ,passwd, (err, user) => {
            if(err || !user) {
                var error = new Error('Wrong email or password\n'+err);
                return sendRep("Wrong email or password", error, req,res);
            }
            else
            {
                logs(user._id+' successfully logged in');
                res.redirect('/index');
            }
        });
    }
    else
    {
        var error = 'Please enter username and password';
        logs(req.body.email);
        sendRep(error,error,req,res);
    }
};

function sendRep(data,err,req,res)
{
    if(err)
    {
        res.status(500).json({ success:false, err: data, errorData: err });
    }
}
function logs(data){
    console.log('[API]: '+data);
}
