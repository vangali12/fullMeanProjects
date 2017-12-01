var playersCon = require("./../controllers/playersCon");
var path = require("path");

module.exports = function(app) {
    app.post('/addPlayer', function(req, res) {
        console.log("Create Player - Routes: IN");
        playersCon.create(req, res)
    })

    app.get('/getPlayers/', function(req, res) {
        console.log("Get Players - Routes: IN");
        playersCon.getPlayers(req, res)
    })

    app.get('/deletePlayer/:id', function(req, res) {
        console.log("Delete Player - Routes: IN");
        playersCon.deletePlayer(req, res)
    })

    app.get('/updatePlayer/:id/:game/:str', function(req, res) {
        console.log("Update Player - Routes: IN");
        playersCon.update(req, res)
    })

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./client/dist/index.html"))
        console.log("hitting all")
    })
}