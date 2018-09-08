const express = require('express');
const app = express();
app.use(express.static(__dirname+"/static"));

const server = app.listen(1234);
const io = require('socket.io')(server);
var counter = 0;

io.on('connection', function(socket){
    socket.emit('greeting', {msg: 'Greetings, from server Node, brought to you by sockets! - Server'});
    socket.on('thank you', function(data){
        console.log(data.msg);
    })
})