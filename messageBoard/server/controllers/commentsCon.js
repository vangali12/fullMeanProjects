var mongoose = require("mongoose");
var Comment = mongoose.model('Comment');

module.exports = {
    create: function(req, res) {
        var comment = new Comment({name: req.session.currentUser, content: req.body.content})
        console.log("Create Comment - Controller: IN")
        console.log(comment)
        comment.save(function(err, data) {
            if(err) {
                return res.json(err)
            } else {
                console.log("Create Comment - Controller: OUT")
                return res.json(data)
            }
        })
    },

    getComments: function(req, res) {
        console.log("Get Comments - Controller: IN")
        Comment.find({}, function(err, data) {
            if(err) {
                return res.json(err)
            } else {
                console.log("Get Comments - Controller: OUT")
                return res.json(data)
            }
        })
    },

    deleteComment: function(req, res) {
        console.log("Delete Comment - Controller; IN")
        var commentId = req.params.id;
        Comment.remove({ _id: commentId }, function(err, data) {
            if (err) {
                return res.json(err)
            } else {
                console.log("Delete Comment - Controller: OUT")
                return res.json(data)
            }
        })
    }
}