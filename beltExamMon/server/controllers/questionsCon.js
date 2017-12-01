var mongoose = require("mongoose");
var Question = mongoose.model('Question');
var session = require("express-session");

module.exports = {
    create: function(req, res) {
        var question = new Question({title: req.body.title, content: req.body.content, correct: req.body.correct, incorrect: [req.body.incorrectOne, req.body.incorrectTwo]})
        console.log("Create Question - Controller: IN")
        console.log(question)
        question.save(function(err, data) {
            if(err) {
                return res.json(err)
            } else {
                console.log("Create Question - Controller: OUT")
                return res.json(data)
            }
        })
    },

    getQuestions: function(req, res) {
        console.log("Get Questions - Controller: IN")
        Question.find({}, function(err, data) {
            if(err) {
                return res.json(err)
            } else {
                console.log("Get Questions - Controller: OUT")
                return res.json(data)
            }
        })
    }

}