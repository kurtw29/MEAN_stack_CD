const express = require('express');
const app = express();
const session = require('express-session');
const server = app.listen(1234);
const io = require('socket.io')(server);

app.use(express.static(__dirname+"/static"));
app.set("views", __dirname+"/views");
app.set("view engine", "ejs");

app.use(session({
    secret:"thisislife",
    resave: false,
    saveUninitialized:true,
    cookie: {maxAge: 60000}
}))

var counter = 0;
io.on("connection", function(socket){
    socket.emit("greeting", {msg:"Connected to server", count:counter});
    socket.on("reply", function(data){
        console.log(data.msg);
    })
    socket.on('pushed', function(data){
        console.log(data.pushed)
        counter++;
        io.emit("counter", {count:counter});
    })
    socket.on('reseting', function(data){
        console.log(data.reset);
        counter = data.reset;
        console.log('new counter = ',counter)
        io.emit("counter", {count:counter});
    })
})

app.get('/', function(req, res){
    console.log("requested '/' url")
    res.render('epicButton');
})
