var session = require("express-session");
var mongoose = require("mongoose");

module.exports = { 
    loginUser: function(req, res) {
        console.log("Login User - Controller: IN");
        var currentUser = req.body.name;
        console.log(currentUser)
        if (!req.session.currentUser) {
            req.session.currentUser = currentUser;
            console.log("Login User - Controller: OUT")
            return res.json(true)
        } else {
            res.json( {'error': "User is already logged in"} )
        }
    },

    logoutUser: function(req, res) {
        console.log("Logout User - Controller: IN");
        req.session.destroy();
    },

    getUsers: function(req, res) {
        console.log("Get Users - Controller: IN")
        Item.distinct("author", function(err, data) {
            if(err) {
                return res.json(err)
            } else {
                console.log("Get Users - Controller: OUT")
                return res.json(data)
            }
        })
    },

    checkSession: function(req, res) {
        if (req.session.currentUser) {
            return res.json(true)
        } else {
            res.json( {'error': "User is already logged in"} )
        }
    }
} 