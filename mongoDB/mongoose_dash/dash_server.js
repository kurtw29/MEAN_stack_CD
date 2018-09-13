var express = require('express')
var app = express();
app.listen(8000);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/stataic"));
app.set("views"+__dirname+"/views");
app.set("view engine", "ejs");


require('./server/models/animal.js');

require('./server/config/routes.js')(app);