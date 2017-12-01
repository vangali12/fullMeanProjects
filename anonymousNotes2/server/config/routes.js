var mongoose = require("mongoose");
var notesCon = require('./../controllers/notesCon.js');

module.exports = function(app) {
    app.post('/createNote', function(req, res) {
        console.log("Create Note - Routes: IN")
        notesCon.create(req, res)
    })

    app.get('/findAll', function(req, res) {
        console.log("Find All - Routes: IN")
        notesCon.findAll(req, res)
    })
}