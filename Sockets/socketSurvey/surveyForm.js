const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = app.listen(1234);
const io = require('socket.io')(server);
const querystring = require('querystring');

io.on('connection', function(socket){
    socket.emit('greeting', {msg: "Hello fellow clients, this is your server - Server"});
    socket.on('thankyou', function(data){ //Server is listening for "thank you" and it'll trigger the function
        console.log(data.msg)
    });

    socket.on("form_data", function(data){
        console.log("received form data:", querystring.parse(data))
        var form_info = querystring.parse(data);
        var lucky_num = Math.trunc(Math.random()*1000);
        form_info.lucky = lucky_num;
        socket.emit("form_info", form_info);
    })

})
app.use(express.static( __dirname+"/static"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("views", __dirname+"/views");
app.set("view engine", "ejs");

app.get('/', function(req, res){
    console.log("came to root");
    res.render('indexSurvey');
});

//emit form information to server
// server emit an event called "random_number" and pass a random number (1-1000) along with form info
// client display the  submitted form data and the random number.
