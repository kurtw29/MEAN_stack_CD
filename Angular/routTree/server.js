var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.use(express.static(__dirname+"/public/dist/public"))
//set up body-parser to parse json
app.use(bodyParser.json());


//set up path to server index.html
app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
})
app.listen(8000)