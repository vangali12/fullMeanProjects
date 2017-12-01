var commentsCon = require("./../controllers/commentsCon");
var messagesCon = require("./../controllers/messagesCon");
var usersCon = require('./../controllers/usersCon')
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

    app.post('/addMessage', function(req, res) {
        console.log("Create Message - Routes: IN");
        messagesCon.create(req, res)
    })
    
    app.post('/addComment', function(req, res) {
        console.log("Create Comment - Routes: IN");
        commentsCon.create(req, res)
    })

    app.get('/getMessages', function(req, res) {
        console.log("Get Messages - Routes: IN");
        messagesCon.getMessages(req, res)
    })

    app.get('/getComments', function(req, res) {
        console.log("Get Comments - Routes: IN");
        commentsCon.getComments(req, res)
    })

    app.get('/deleteMessage/:id', function(req, res) {
        console.log("Delete Message - Routes: IN");
        messagesCon.deleteMessage(req, res)
    })

    app.get('/deleteComment/:id', function(req, res) {
        console.log("Delete Comment - Routes: IN");
        commentsCon.deleteComment(req, res)
    })

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./client/dist/index.html"))
        console.log("hitting all")
    })

}