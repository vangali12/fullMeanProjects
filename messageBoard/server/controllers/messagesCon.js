var mongoose = require("mongoose");
var Message = mongoose.model('Message');

module.exports = {
    create: function(req, res) {
        var message = new Message({name: req.session.currentUser, content: req.body.content})
        console.log("Create Message - Controller: IN")
        console.log(message)
        message.save(function(err, data) {
            if(err) {
                return res.json(err)
            } else {
                console.log("Create Message - Controller: OUT")
                return res.json(data)
            }
        })
    },

    getMessages: function(req, res) {
        console.log("Get Messages - Controller: IN")
        Message.find({}, function(err, data) {
            if(err) {
                return res.json(err)
            } else {
                console.log("Get Messages - Controller: OUT")
                return res.json(data)
            }
        })
    },

    deleteMessage: function(req, res) {
        console.log("Delete Message - Controller; IN")
        var messageId = req.params.id;
        Message.remove({ _id: messageId }, function(err, data) {
            if (err) {
                return res.json(err)
            } else {
                console.log("Delete Message - Controller: OUT")
                return res.json(data)
            }
        })
    }
}