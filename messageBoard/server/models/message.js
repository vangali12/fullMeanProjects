var mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema ({
    content: {type: String},
    author: {type: String},
})

var Message = mongoose.model('Message', MessageSchema);