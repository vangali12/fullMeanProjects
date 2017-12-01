var mongoose = require("mongoose");

var PlayerSchema = new mongoose.Schema ({
    name: {type: String},
    position: {type: String},
    game1: {type: String, default: "undecided"},
    game2: {type: String, default: "undecided"},
    game3: {type: String, default: "undecided"}
})

var Player = mongoose.model('Player', PlayerSchema);