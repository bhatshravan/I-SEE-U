const User = require('../models/User');

exports.logout = (req, res, next) => {
    if(req.session) {
        req.session.destroy( (err) => {
            if(err) {
                sendRep('Logout error',err,req,res);
            }
            else {
                return res.redirect('/login');
            }
        });
    }
}


exports.create = (req,res) => {
    res.status(200);
    if (req.body.email &&  req.body.password) //req.body.passwordConf)
        {
            var UserData = {
                email: req.body.email,
                password: req.body.password
            }
            logs(UserData+' registered');

            User.create(UserData, function(err, user) {
                if(err) {
                    return sendRep('Insertion error',err,req,res);
                }
                else {
                    return res.status(200).send('No error,successfully inserted')
                }
            });
        }
        else {
            return res.status(403).json({ success: false, error: 'Error occured, no data given' });
        }
    };

    exports.register = (req,res) => {
        res.render('/register');
    }

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
                    var test2 = user.email;
                    req.session.userEmail = user.email;
                    req.session.userId = user._id;
                    logs(user._id+' successfully logged in');
                    res.redirect('/index');
                    //return res.status(200).json({ success:true , msg: "User logged in"})
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
        //console.log('\n\n['+req.method+']'+req.url);
        //console.log(err);
        if(err)
        {
            res.status(500).json({ success:false, err: data, err2: err });
            console.log('[ERR:] :'+err);
        }
    }
    function logs(data){
        console.log('[]: '+data);
    }
