var express = require("express");

var app = express();

app.use(express.static(__dirname + "/static"));
    console.log( __dirname);

app.use(express.static(__dirname + "/static/cars.html"));
    console.log( __dirname);

app.use(express.static(__dirname + "/static/cats.html"));
    console.log( __dirname);

app.use(express.static(__dirname + "/static/form.html"));
    console.log( __dirname);

app.listen(8000, function(){
    console.log("listening on port 8000");
})