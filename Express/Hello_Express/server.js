var express = require("express");
console.log("What is express:", express);

var app = express();
// console.log("What is app?: ", app);
// use app's get method and pass it the base route "/" and a callback
app.get("/", function(request, response){
    //just for fun, take a look at the request and response objects:
    // console.log("The rquest object", request);
    // console.log("The response object", response);
    // use the response object's .send() method to respond with an h1
    response.send("<h1>Hello Express</h1>");
})
app.use(express.static(__dirname + "/static"));
    console.log( __dirname);

app.use(express.static(__dirname + "/static/cars.html"));
    console.log( __dirname);

app.use(express.static(__dirname + "/static/cats.html"));
    console.log( __dirname);

app.use(express.static(__dirname + "/static/form.html"));
    console.log( __dirname);

// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views');
// Now lets set the view engine itself so that express knows what we are using 'ejs' as oppose to another templating engin like 'jade'
app.set('view engine', 'ejs');

app.get("/users", function(request, response){
    //hard-coded user data
    var users_array = [
        {name: "Michael", email: "michasel@codingdojo.com"},
        {name: "Jay", email: "jay@codingdojo.com"},
        {name: "Brendan", email: "brendan@codingdojo.com"},
        {name: "Andrew", email: "andrew@codingdojo.com"},
    ];
    response.render('users', {users: users_array});
})

// tell the express app to listen on port 8000, always have this at end of server.js file
app.listen(8000, function(){
    console.log("listening on ponrt 8000");
})