const express = require('express');
const app = express();
const server = app.listen(8000);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/static"));
app.set('views', __dirname+"/views");
app.set("view engine", "ejs");
const mongoose = require('mongoose');
const session = require('express-session');
app.use(session({
    secret: "numberSecret",
    resave: false,
    saveUninitialized: true,
    cookie:{}
}))
const flash = require('express-flash');
app.use(flash());


mongoose.connect('mongodb://localhost/quoteDojo');
// create schema for quotes
var QuoteSchema = new mongoose.Schema({
    name:{type:String, required: [true, "Name cannot be blank"], minlength:[3,"Name needs at least 3 characters"]},
    quote:{type:String, required: [true, "Cannot submit empty quote"], minlength:[2,"Quote needs at least 2 characters"]},
    date:{type: Date, default:Date.now}
}, {timestamps: true});

//store the schema under the name "Quote"
mongoose.model("Quote", QuoteSchema);
//retrive the schema called 'Quote' and store it to the variable Quote
var Quote = mongoose.model("Quote");

app.get('/', function(req, res){
    res.render('index');
})

app.post('/quoting', function(req, res){
    console.log("What's the form data? req.body:", req.body);
    var quoteInstance = new Quote();
    quoteInstance.name = req.body.name;
    quoteInstance.quote = req.body.quote;
    quoteInstance.save(function(err){
        if(err){
            console.log("Error in saving quotes info:",err);
            for(var i in err.errors){
            req.flash('submit_quote', err.errors[i].message);
            }
            res.redirect('/');
        }else{
            console.log('SAVE SUCCESS');
            res.redirect('/quotes')
        }
    })
})

app.get('/quotes', function(req, res){
    Quote.find({}, function(err, quotes){
        if(err){
            console.log('Error in finding quotes:', err)
            res.render('quotes', {quotes:quotes})
        }else{
            console.log(quotes);
            res.render('quotes', {quotes:quotes})
        }
    }).sort({createdAt:-1})
})
