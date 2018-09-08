const express = require('express');
const app = express();
app.use(express.static(__dirname+"/static"));
const server = app.listen(1212);
const io = require('socket.io')(server);
// const bodyParser = require('body-parser');

var bg_color;
io.on("connection", function(socket){
    socket.emit("greeting", {msg:"connected to Server", color:bg_color});
    socket.on("reply", function(data){
        console.log(data.msg);
    })
    socket.on("change_color", function(data){
        console.log("recevied change_color, data.change_color:",data.change_color);
        //update bg_color to the received socket info about color:
        bg_color = data.change_color;
        io.emit("new_color", {new_color:bg_color})
    })
})

app.set("views", __dirname+"/views");
app.set("view engine", "ejs");

app.get('/', function(req, res){
    console.log("received '/' request url ");
    res.render('colorRoom');

})