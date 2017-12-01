var express = require("express");
var bp = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");
var port = 8000;
var app = express();

mongoose.Promise = global.Promise;

app.use(bp.json());
app.use(express.static(path.join(__dirname, './client/dist')));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(port, function() {
    console.log(`We are listening on port ${port}`);
})