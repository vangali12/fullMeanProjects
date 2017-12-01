var usersCon = require("./../controllers/usersCon");
var questionsCon = require("./../controllers/questionsCon");
var scoresCon = require("./../controllers/scoresCon");
var path = require("path");

module.exports = function(app) {   
    app.post('/loginUser', function(req, res) {
        console.log("Login User - Routes: IN");
        usersCon.loginUser(req, res)
    })

    app.get('/logoutUser', function(req, res) {
        console.log("Logout User - Routes: IN");
        usersCon.logoutUser(req, res)
    })

    app.get('/getScores', function(req, res) {
        console.log("Get Scores - Routes: IN");
        scoresCon.getScores(req, res)
    })

    app.get('/checkSession', function(req, res) {
        console.log("Check Session - Routes: IN");
        usersCon.checkSession(req, res)
    })

    app.get('/getSearchNames/:searchCrit', function(req, res) {
        console.log("Get Search Names - Routes: IN");
        scoresCon.getSearchNames(req, res)
    })

    app.get('/getSearchScore/:searchCrit', function(req, res) {
        console.log("Get Search Scores - Routes: IN");
        scoresCon.getSearchScore(req, res)
    })

    app.post('/addQuestion', function(req, res) {
        console.log("Create Question - Routes: IN");
        questionsCon.create(req, res)
    })

    app.post('/addScore', function(req, res) {
        console.log("Create Score - Routes: IN");
        scoresCon.create(req, res)
    })

    app.get('/getQuestions', function(req, res) {
        console.log("Get Questions - Routes: IN");
        questionsCon.getQuestions(req, res)
    })

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./client/dist/index.html"))
        console.log("hitting all")
    })

}