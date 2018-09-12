//Create a login and reg, uses back-end validation, catches errors, and display errors to clients
const express = require('express');
const app = express();
app.listen(8000);
//get bodyParser for form submission
const bodyParser = require('body-parser');
//get session and flash message
const session = require('express-session');
const flash = require('express-flash');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/loginReg'), {useNewUrlParser: true}
mongoose.Promise = global.Promise;
const uniqueValidator = require('mongoose-unique-validator');

//set up body-parser
app.use(bodyParser.urlencoded({extended: true}));
//set up -using session
app.use(session({
    secret:"whaddamean?",
    resave: false,
    saveUninitialized: true,
    cookie:{}
}))
//set up flash
app.use(flash());

//setup static & views
app.use(express.static(__dirname+'/static'))
app.set("views", __dirname+"/views");
app.set("view engine", "ejs");

var UserSchema = new mongoose.Schema({
    email: {type:String, required:[true, "Email cannot be empty"], minlength:[4, "Email must have at least 4 characters"], unique:[true, "Email already taken"]},
    first_name: {type:String, required:[true, "First name cannot be blank"], minlength:[2, "First name must be at least 2 characters long."]},
    last_name: {type:String, required:[true, "Last name cannot be blank"], minlength:[2, "Last name must be at least 2 characters long."]},
    password: {type:String, required:[true, "Password must not be blank"], minlength:[4, "Password must be at least 4 characters long"], max:150}
}, {timestamps: true})
UserSchema.plugin(uniqueValidator);
mongoose.model('User', UserSchema); // We are setting this Schema in our models as "User"
var User = mongoose.model('User') //we are retrieving this Schema, models, namede 'User'


app.get('/', function(req, res){
    res.render('loginReg');
})

app.post('/reg', function(req,res){
    console.log("SUBMITTED REGISTRATION INFO, req.body: ", req.body)
    //check inputs empty or not
    var empty_input;
    if(req.body.email.length == 0){
        req.flash("reg", "Emaill cannot be blank")
        empty_input = true;
    }
    if(req.body.first_name.length == 0){
        req.flash("reg", "First name cannot be blank")
        empty_input = true;

    }
    if(req.body.last_name.length == 0){
        req.flash("reg", "Last name cannot be blank")
        empty_input = true;
    }
    if(req.body.password.length == 0){
        req.flash("reg", "Password cannot be blank")
        empty_input = true;
    }
    if(req.body.birthday.length == 0){
        req.flash("reg", "Must enter birthday")
        empty_input = true;
    }
    //If there are empty input redirect to '/'
    if(empty_input == true){
        res.redirect("/")
    }else{
        // regex to check valid email
        var re = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/
        if(re.test(req.body.email)){
            //if the regex test is true
            console.log("EMAIL FORMATE IS GOOD")
                    //valid email unique (check w/ database)
        User.find({email:req.body.email}, function(err, data){
            //check if there's an email exists in the db, if so, redirect
            if(err){
                //checking if there's an checking during the searching process
                console.log("THERE'S AN ERROR IN FINDING USER via EMAIL")
            }else{
                console.log("FINISH TRYING TO FIND USER VIA EMAIL, here's data:", data)
                if(data.length > 0){
                console.log("DUPLICATED EMAIL, EMAIL IS NOT UNIQUE redirect to '/'")
                req.flash('req',"Email already exists");
                res.redirect('/')
                }else{
                // data is empty, we can go ahead with the registration
                    // bcrypt-hash password then store into db
                    bcrypt.hash(req.body.password, 10)
                    .then(hashed_pw => {
                        req.body.password = hashed_pw;
                        // Create this user in database
                        User.create(req.body, function(err,data){
                            if(err){
                                console.log("ERROR IN SAVING USER INFO INTO DB for REGISTRATIONS")
                                for(var i in err.errors){
                                    req.flash("reg", err.errors[i].message);
                                }
                            }else{
                                console.log('SAVED USER IN DB, REGISTERED, here is data save: ', data)
                            }
                        });
                    })
                    .catch(error => {
                        for(var key in err.errors){
                            req.flash("reg", "Issue with your password secruity");
                        }
                        res.redirect("/");
                    })
                    //successful registration, store user_id session
                    res.redirect('success')

                    }
            }
        })
        
        }else{
            req.flash("reg", "Invalid Email")
            console.log("BAD EMAIL FORMATE, REDIRECT BACK WITH FLASH ERROR")
            res.redirect('/')
        }
    }
})

app.post('/login', function(req,res){
    console.log("ATTEMPTING TO LOGIN, req.body: ", req.body)
    //check to make sure no-empty inputs
    var empty = false;
    if(req.body.email.length == 0){
        req.flash("login", "Emaill cannot be blank")
        empty= true;
    }
    if(req.body.password.length == 0){
        req.flash("login", "Password cannot be blank")
        empty = true;
    }
    if(empty == true){
        //if email or password is empty, redirect
        res.redirect('/');
    }else{
        // Check email with database
        User.find({email:req.body.email}, function(err, data){
            if(err){
                console.log("WE HAD ERROR WHEN TRYING TO FIND USER VIA EMAIL")
                req.flash("login", "Unable to login")
                res.redirect('/')
            }else{
                console.log("WE COMPLETED FINDING USER via email")
                // Bcrypt password and check password
                bcrypt.compare(req.body.password, data.password)
                .then( result => {
                    console.log('COMPARISON SUCCESSFUL, PASSWORD MATCHED')
                    // if valid login - store user_id into session
                    req.session.id = data.id
                    res.redirect('success')
                })
                .catch(error =>{
                    console.log("There's an ERROR IN COMPARING HASHED PASSWORD")
                    req.flash("login", "Unable to login")
                    res.redirect("/")
                })
            }
        })

    }
})