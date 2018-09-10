const express = require('express');
const app = express();
const session = require('express-session');
const server = app.listen(1044);
const io = require('socket.io')(server);

// keep track of logged users
var users =[];
var sockets_list = [];
// keep track of posts/messages/conversations
var posts = []
//listen for connection from #port:1044
io.on('connection', function(socket){
    // console.log("CONNECTED socket id:", socket.id);
    sockets_list.push(socket.id);
    socket.emit('greeting', {msg: "Connected with server"});
    //listen for client's reply to greeting; client confirming connection, then Server EMIT user & posts info
    socket.on('reply', function(data){
        console.log("received client reply:",data.msg, "user info:",data.user_info)
        //adding socket_id into user_info object
        data.user_info.socketid = socket.id
        users.push(data.user_info)
        // console.log("users object array:", users)
        io.emit('users_list', {users_list:users, posts_info:posts})
        console.log("Server EMIT-ing users data: ",users)
        console.log("Server EMIT-ing posts info: ",posts)

    })

    // listen for user sending "message"
    socket.on('send_message', function(data){
        console.log("received user message:", data.message)
        console.log("FROM user_info: ", data.user_info)
        console.log("FROM socketid: ", socket.id)
        var pposter = data.user_info.name.replace(/>|</g, '&');
        var pmessage = data.message.replace(/>|</g, '&');
        var post_info={
            poster:pposter,
            post_message:pmessage
        }
        posts.push(post_info)
        // emit to all other sockets the "message"
        io.emit('post_message', {post_message:data.message, poster:data.user_info.name})
        console.log("Server EMIT-ing to all clients new post message: ",data.message, "from poster:",data.user_info.name);
    })

    //listen for socket "typing", broadcast to all other sockets that zomeone's typing
    socket.on('typing', function(){
        socket.broadcast.emit('someone_typing');
    })

    socket.on('disconnect', function(){
        console.log("DISCONNECTED socket id:", socket.id)
        // console.log("PRE-pop USERS:", users)
        for(i in users){
            // console.log("remove loop i:",i)
            // console.log('users[',i,']: ',users[i])
            if(users[i].socketid == socket.id){
                // console.log('users[',i,'] == socket.id:',users[i],'==',socket.id)
                temp = users[i]
                users[i] = users[users.length-1]
                users[users.length-1] = users[i]
                users.pop()
                // console.log("POST-pop, updated USERS: ", users);
            }
        }
    })
})
app.use(express.static(__dirname+"/static"));
app.set('views', __dirname+"/views");
app.set('view engine', 'ejs');

app.use(session({
    secret:"chatIsSecret",
    resave: false,
    saveUninitialized: true,
    cookie:{}
}))

app.get('/', function(req, res){
    console.log("ROUTE REQUESTED '/' sessionID:", req.sessionID);
    res.render("chat", {user_id: req.session.id});
})