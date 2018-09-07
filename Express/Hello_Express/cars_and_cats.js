var express = require("express");

var app = express();

app.use(express.static(__dirname + "/static/"));

//tell the location where express will look for the ejs views
app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.get("/cars", function(request, response){
    response.render("cars");
})

app.listen(8000, function(){
    console.log("listening on port 8000");
})