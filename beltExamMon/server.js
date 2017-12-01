var express = require("express");
var path = require("path");
var bp = require("body-parser");
var session = require("express-session");
var mongoose = require("mongoose");
var port = 8000;

var app = express();

mongoose.Promise = global.Promise;

app.use(session({secret: 'otterBox', resave: true, saveUninitialized: true}));
app.use(bp.json());
app.use(express.static(path.join(__dirname, './client/dist')));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(port, function() {
    console.log(`We are listening on on port ${port}`)
})