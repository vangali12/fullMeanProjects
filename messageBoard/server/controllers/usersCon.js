var session = require("express-session");

module.exports = {
    loginUser: function(req, res) {
        console.log("Login User - Controller: IN");
        var currentUser = req.body.name;
        console.log(currentUser)
        if (!req.session.currentUser) {
            req.session.currentUser = currentUser;
            return req.session.currentUser;
        } else {
            res.json( {'error': "User is already logged in"} )
        }
        console.log(req.session.currentUser)
    },

    logoutUser: function(req, res) {
        console.log("Logout User - Controller: IN");
        req.session.destroy();
    }
}    