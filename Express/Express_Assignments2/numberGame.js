var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var result = require('./gameCheck')


//using and setting the modules we need
app.use(express.static(__dirname+"/static"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("views", __dirname+"/views");
app.set("view engine", "ejs");
app.use(session({
    secret: "numberSecret",
    resave: false,
    saveUninitialized: true,
    cookie:{}
}))

// routing
app.get('/', function(req, res){
    console.log("game to '/' route");
    if (!req.session.number){
        req.session.number = Math.trunc(Math.random()*100);
    }
    console.log("The randomly generated & sessioned.number is:", req.session.number);
    res.render('game', {answer:req.session.answer});
})

app.post('/guess', function(req, res){
    console.log("Entered Guess routing")
    console.log("Check req.body:",req.body)
    console.log("Check req.session.number:",req.session.number)
    // we compare the user input and the random number in module located in "gameCheck.js" that returns object "result"
    req.session.answer = result(req.body.number, req.session.number)
    res.redirect('/')
})

app.get('/again', function(req, res){
    req.session.destroy()
    res.redirect('/');
})

// set up listening for request
app.listen(8000, function(){
    console.log("listening server port at #8000");
});
