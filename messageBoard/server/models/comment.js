var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema ({
    content: {type: String},
    author: {type: String},
})

var Comment = mongoose.model('Comment', CommentSchema);