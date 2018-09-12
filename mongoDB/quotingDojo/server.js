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
const Quote = mongoose.model("Quote");

require('./server/config/routes.js')(app);