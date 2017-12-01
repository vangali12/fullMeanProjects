var mongoose = require("mongoose");
var Score = mongoose.model('Score');
var session = require("express-session");

module.exports = {
    create: function(req, res) {
        var score = new Score({name: req.session.currentUser, score: req.body.score})
        console.log("Create Score - Controller: IN")
        console.log(score)
        score.save(function(err, data) {
            if(err) {
                return res.json(err)
            } else {
                console.log("Create Score - Controller: OUT")
                return res.json(data)
            }
        })
    },

    getScores: function(req, res) {
        console.log("Get Scores - Controller: IN")
        Score.find({}).sort({score: -1}).find({}, function(err, data) {
            if(err) {
                return res.json(err)
            } else {
                console.log(data)
                console.log("Get Scores - Controller: OUT")
                return res.json(data)
            }
        })
    },

    getSearchNames: function(req, res) {
        console.log("Get Search Names - Controller: IN")
        var searchCriteria = req.params.searchCrit;
        console.log(searchCriteria)
        Score.find({name: searchCriteria} , function(err, data) {
            if(err) {
                return res.json(err)
            } else {
                console.log(data)
                console.log("Get Search Names - Controller: OUT")
                return res.json(data)
            }
        })
    },

    getSearchScore: function(req, res) {
        console.log("Get Search Scores - Controller: IN")
        var searchCriteria = Number(req.params.searchCrit);
        console.log(searchCriteria)
        Score.find({score: searchCriteria}, function(err, data) {
            if(err) {
                return res.json(err)
            } else {
                console.log(data)
                console.log("Get Search Scores - Controller: OUT")
                return res.json(data)
            }
        })
    }
}