var mongoose = require("mongoose");
var Player = mongoose.model('Player');

module.exports = {
    create: function(req, res) {
        var player = new Player({name: req.body.name, position: req.body.position})
        console.log("Create Player - Controller: IN")
        console.log(player)
        player.save(function(err, data) {
            if(err) {
                return res.json(err)
            } else {
                console.log("Create Player - Controller: OUT")
                return res.json(data)
            }
        })
    },

    getPlayers: function(req, res) {
        console.log("Get Players - Controller: IN")
        Player.find({}, function(err, data) {
            if(err) {
                return res.json(err)
            } else {
                console.log("Get Players - Controller: OUT")
                return res.json(data)
            }
        })
    },

    deletePlayer: function(req, res) {
        console.log("Delete Player - Controller; IN")
        var playerId = req.params.id;
        Player.remove({ _id: playerId }, function(err, data) {
            if (err) {
                return res.json(err)
            } else {
                console.log("Delete Player - Controller: OUT")
                return res.json(data)
            }
        })
    },

    update: function(req, res) {
        console.log("Update Player - Controller: IN")
        var gameId = "game" + req.params.game + "";
        var status = req.params.str;
        var query = {};
        query[gameId] = status;
        console.log(req.params.id, query)
        Player.update({ _id: req.params.id }, query, function(err, data) {
            if(err) {
                return res.json(err)
            } else {
                console.log("Update Player - Controller: OUT")
                return res.json(data)
            }
        })
    }


}