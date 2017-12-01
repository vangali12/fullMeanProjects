var mongoose = require("mongoose");

var NoteSchema = new mongoose.Schema ({
    content: {type: String}
}, {timestamps: true});

var Note = mongoose.model('Note', NoteSchema);