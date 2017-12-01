var mongoose = require("mongoose");
var Note = mongoose.model('Note');

module.exports = {
    create: function(req, res) {
        var note = new Note({content: req.body.content});
        console.log("Create Note - Controller: IN")
        console.log(note);
        note.save(function(err, data) {
            if (err) {
                return res.json(err)
            }
            console.log("Create Note - Controller: OUT")
            return res.json(data)
        })
    }, 

    findAll: function(req, res) {
        console.log("Find All - Controller: IN")
        Note.find({}, function(err, data) {
            if (err) {
                return res.json(err);
            } else {
                console.log("Find All - Controller: OUT")
                return res.json(data);
            }
        })
        

    }
}