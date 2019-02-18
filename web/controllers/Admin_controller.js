exports.main = (req,res) => {
    // res.render('DoubleHelix/index' , { email: req.session.userEmail });
    //checkLogin(req,res);
    res.render('index');
}

function checkLogin(req,res) {
    if (req.session && req.session.userId)
    {

    }
    else
    {
        return res.redirect("Login");
    }
}
