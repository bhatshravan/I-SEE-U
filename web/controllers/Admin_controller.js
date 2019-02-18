exports.main = (req,res) => {
    // res.render('DoubleHelix/index' , { email: req.session.userEmail });
    if (req.session && req.session.userId)
    {
        res.render('DoubleHelix/index');
    }
    else
    {
        res.redirect("/login.html");
    }
}
