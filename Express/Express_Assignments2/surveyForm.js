var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static( __dirname+"/static"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("views", __dirname+"/views");
app.set("view engine", "ejs");

app.get('/', function(req, res){
    console.log("came to root");
    res.render('indexSurvey');
});

app.post('/result', function(req, res){
    console.log('came to /result');
    console.log(req.body);
    res.render('results', {info: req.body});
})

app.listen(8000, function(){
    console.log("listening on port 8000")
})