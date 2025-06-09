const auth = function (req, res, next) {
    return next();
   
  /*  console.log("req user", req.user);
    if (req.isAuthenticated() && req.user.token) {
        console.log("auth success");
        req.profileToken = req.user.token;
        return next();
    }
    console.log("auth failed");
    res.redirect("/login");
    */
};

module.exports = auth;