var mongoose = require("mongoose");
var fs = require("fs");
var path = require("path");
var mp = path.join(__dirname, './../models');

mongoose.connect('mongodb://localhost/anonNotes2');

fs.readdirSync(mp).forEach(function(file) {
    if (file.indexOf(".js") >= 0) {
        require(mp + "/" + file);
    }
})