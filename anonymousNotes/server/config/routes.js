var mongoose = require("mongoose");
var noteController = require('./../controllers/notes.js');

module.exports = function(app) {
    app.get('/notes', function(req, res) {
        noteController.index(req, res)
    })
    
    app.post('/notes', function(req, res) {
        noteController.addNote(req, res)
    })

    app.get('/getNotes', function(req, res) {
        noteController.getNotes(req, res)
    })
}