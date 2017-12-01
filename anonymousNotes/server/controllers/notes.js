var mongoose = require("mongoose");
var Note = mongoose.model('Note');

module.exports = {
    index: function(req, res) {
        Note.find({}, function(err, data) {
            if (err) {
                return res.json(err);
            } else {
                return res.json(data);
            }
        });
    },
    
    addNote: function(req, res) {
        var note = new Note({content: req.body.content});
        console.log(note);
        note.save(function(err) {
            if(err) {
                return res.json(err);
            }
        })
    },

    getNotes: function(req, res) {
        Note.find({}, function(err, data) {
            if(err) {
                return res.json(err);
            } else {
                return res.json(data);
            }
        })
    }
}