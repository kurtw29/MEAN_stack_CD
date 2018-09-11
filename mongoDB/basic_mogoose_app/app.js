// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Require Monogoose
var mongoose = require('mongoose');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Setting our Static Folder Directory
app.use(express.static(__dirname+ '/static'));
// Setting our Views Folder Directory
app.set('views', __dirname + '/views');
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_mongoose');
// make our first Schema that we will use to model Users. Let's say that each user will have a name that is a string and an age that is a number.
var UserSchema = new mongoose.Schema({
    name: String,
    age: Number
}, {timestamps: true})
//We are setting this Schema in our Models as 'User'
mongoose.model('User', UserSchema) 
// We are retrieving this Schema from our Models, named 'User'
var User = mongoose.model('User')

// Use native promoise
mongoose.Promise = global.Promise;


// Routes
// Root Request
app.get('/', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    // User.find({}, function(err, users){
    //     console.log(users);
    //     if(err){
    //         console.log('something went wrong with loading users info from DATABASE');
    //     }else{
    //         res.render('index', {users_data:users});
    //     }
    //     // res.render('index');
    // })
    User.findOne({}, function(err, users){
        if(err){
            console.log("something is wrong");
        }else{
            res.render('index', {users_data:users})
        }
    })
})
// Add User Request 
app.post('/users', function(req, res) {
    console.log("POST DATA", req.body);
    // This is where we would add the user from req.body to the database.
    
    // create a new User with the name and age corresponding to those from req.body
    var user = new User({name:req.body.name, age:req.body.age});

    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    user.save(function(err){
        //if there's anyting err, console.log that something's wrong
        if(err){
            console.log("something's wrong");
        }else{
            console.log("successfully added a user");
            res.redirect('/');
        }

    })
})
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
