var mongoose = require("mongoose");

var ItemSchema = new mongoose.Schema ({
    title: {type: String},
    content: {type: String},
    author: {type: String},
    tagged: {type: String}
}, {timestamps: true})

var Item = mongoose.model('Item', ItemSchema);