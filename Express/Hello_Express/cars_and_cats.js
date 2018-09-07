var express = require("express");

var app = express();

app.use(express.static(__dirname + "/static/"));
//we store our css file in /static/css, so express needs to use the files in that folder as well
app.use(express.static(__dirname + "/static/css"));

//tell the location where express will look for the ejs views
app.set('views', __dirname + '/views');
// tell express to look for files with 'ejs' extension
app.set('view engine', 'ejs');
// get and render cars.ejs 
app.get("/cars", function(request, response){
    response.render("cars");
})

app.get("/cats", function(request, response){
    response.render("cats");
})

app.get("/form", function(request, response){
    response.render("form");
})

app.get("/cat1", function(request, response){
    // we store the hardcoded cat info in cat_info.js file, and used module.exports/require to call it, request via the url "./cats_info"
    var cat1_array = require('./cats_info').cat1;
    //render the html file at "cat1"
    //we passed the object "cat1_array" with key: cat1 for templating
    response.render('cat1', {cat1:cat1_array});
})
app.get("/cat2", function(request, response){
    var cat2_array = require('./cats_info').cat2;
    response.render('cat2', {cat2:cat2_array});
})
app.get("/cat3", function(request, response){
    var cat3_array = require('./cats_info').cat3;
    response.render('cat3', {cat3:cat3_array});
})

// start our server at port 8000;
app.listen(8000, function(){
    console.log("listening on port 8000");
})