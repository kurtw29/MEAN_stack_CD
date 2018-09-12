const express = require('express');
const app = express();
app.listen(8000);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/static"));
app.set('views', __dirname+"/views");
app.set("view engine", "ejs");
const session = require('express-session');
app.use(session({
    secret: "numberSecret",
    resave: false,
    saveUninitialized: true,
    cookie:{}
}))
const flash = require('express-flash');
app.use(flash());

// //modular for the models
// require('./server/models/quote.js')();
require('./server/config/mongoose.js')

//Modular for the routing
require('./server/config/routes.js')(app);