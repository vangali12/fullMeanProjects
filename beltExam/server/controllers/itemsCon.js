var mongoose = require("mongoose");
var Item = mongoose.model('Item');
var session = require("express-session");

module.exports = {
    create: function(req, res) {
        var item = new Item({title: req.body.title, content: req.body.content, author: req.session.currentUser, tagged: req.body.tagged})
        console.log("Create Item - Controller: IN")
        console.log(item)
        console.log(req.session['currentUser'])
        item.save(function(err, data) {
            if(err) {
                return res.json(err)
            } else {
                console.log("Create Item - Controller: OUT")
                return res.json(data)
            }
        })
    },

    getItems: function(req, res) {
        console.log("Get Items - Controller: IN")
        Item.find({}, function(err, data) {
            if(err) {
                return res.json(err)
            } else {
                console.log("Get Items - Controller: OUT")
                return res.json(data)
            }
        })
    },

    getMyItems: function(req, res) {
        console.log("Get My Items - Controller: IN")
        Item.find({ $or: [{author: req.session.currentUser}, {tagged: req.session.currentUser}]}, function(err, data) {
            if(err) {
                return res.json(err)
            } else {
                console.log("Get My Items - Controller: OUT")
                return res.json(data)
            }
        })
    },

    getUserItems: function(req, res) {
        console.log("Get User Items - Controller: IN")
        Item.find({ $or: [{author: req.body.displayUser}, {tagged: req.body.displayUser}]}, function(err, data) {
            if(err) {
                return res.json(err)
            } else {
                console.log("Get User Items - Controller: OUT")
                return res.json(data)
            }
        })
    },

    deleteItem: function(req, res) {
        console.log("Delete Item - Controller; IN")
        var itemId = req.params.id;
        Item.remove({ _id: itemId }, function(err, data) {
            if (err) {
                return res.json(err)
            } else {
                console.log("Delete Item - Controller: OUT")
                return res.json(data)
            }
        })
    }
}