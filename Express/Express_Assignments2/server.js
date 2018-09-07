var express = require('express');
var session = require('express-session');
var app = express();

app.use(session({
    secret: "issecret",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))

//setting the "counter"
app.get('/', function(req, res){
    if(req.session.counter){
        req.session.counter++;
    }else{
        req.session.counter = 1;
    }
    console.log("session.counter:",req.session.counter)
    res.render('index', {count:req.session.counter});
})
app.get('/add2', function(req, res){
    req.session.counter++;
    res.redirect("/");
})
app.get('/clear_count', function(req, res){
    req.session.destroy();
    res.redirect("/");
})

app.use(express.static(__dirname+"/static"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.listen(8000, function(){
    console.log("listening on port 8000");
})