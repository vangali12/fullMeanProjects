var mongoose = require("mongoose");

var QuestionSchema = new mongoose.Schema ({
    content: {type: String},
    correct: {type: String},
    incorrect: {type: Array}
}, {timestamps: true})

var Question = mongoose.model('Question', QuestionSchema);