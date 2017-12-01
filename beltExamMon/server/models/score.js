var mongoose = require("mongoose");

var ScoreSchema = new mongoose.Schema ({
    name: {type: String},
    score: {type: Number},
}, {timestamps: true})

var Score = mongoose.model('Score', ScoreSchema);