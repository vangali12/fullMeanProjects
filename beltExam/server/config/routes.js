var itemsCon = require("./../controllers/itemsCon");
var usersCon = require("./../controllers/usersCon");
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

    app.get('/getUsers', function(req, res) {
        console.log("Get Users - Routes: IN");
        usersCon.getUsers(req, res)
    })

    app.post('/addItem', function(req, res) {
        console.log("Create Item - Routes: IN");
        itemsCon.create(req, res)
    })

    app.get('/getItems', function(req, res) {
        console.log("Get Items - Routes: IN");
        itemsCon.getItems(req, res)
    })

    app.get('/getMyItems', function(req, res) {
        console.log("Get My Items - Routes: IN");
        itemsCon.getMyItems(req, res)
    })

    app.get('/getUserItems', function(req, res) {
        console.log("Get User Items - Routes: IN");
        itemsCon.getUserItems(req, res)
    })

    app.get('/deleteItem/:id', function(req, res) {
        console.log("Delete Item - Routes: IN");
        itemsCon.deleteItem(req, res)
    })

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./client/dist/index.html"))
        console.log("hitting all")
    })
}