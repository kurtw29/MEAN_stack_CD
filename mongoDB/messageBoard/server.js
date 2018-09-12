const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('express-flash')
app.use(session({
    secret: "whatMsGASDF",
    resave: false,
    saveUninitialized: true,
    cookie:{}
}))
app.use(flash());
app.use(bodyParser.urlencoded({extended:true}));
app.listen(8000);
app.use(express.static(__dirname+"/static"));
app.set("views", __dirname+"/views");
app.set("view engine", "ejs");



const mongoose = require('mongoose');
//create mongoose connection with mongodb
mongoose.connect('mongodb://localhost/message_board');
//create the Schema for the Message and Comment
var CommentSchema = new mongoose.Schema({
    commenter: { type: String, required: [true, "Must enter your name to comment"]},
    comment: {type:String, required: [true, "Cannot submit empty comment"]},
}, {timestamps: true})

var MessageSchema = new mongoose.Schema({
    messenger: { type: String, required: [true, "Must enter your name to post"]},
    message: {type:String, required: [true, "Cannot submit empty message"]},
    comments: [CommentSchema]
}, {timestamps: true})

var Message = mongoose.model('Message', MessageSchema)
var Comment = mongoose.model('Comment', CommentSchema)

app.get('/', function(req, res){
    console.log("CAME TO MAIN PAGE")
    // display messages (messenger + message+text)
    Message.find({}, function(err, data){
        if(err){
            console.log("There's error finding all messages errors:",err)
        }else{
            console.log("RETRIVE SUCCESS, HERE'S DATA: ", data)
        }
        res.render('room', {posts:data});
    }).sort({updatedAt:-1})
        //display comments for each of the messages (commentor + comment+text)
})

app.post('/messaging', function(req, res){
    console.log("ARRIVED at /messaging")
    //insert new posted message to database
    Message.create(req.body, function(err,data){
        console.log("req.body: ",req.body)
        console.log("ERROR IN CREATING MESSAGE - err: ", err)
        if(err){
            console.log("ERROR IN CREATING 'Message' err:",err)
            for(var i in err.errors){
                req.flash('message_err', err.errors[i].message);
            }
        }else{
            console.log("MESSAGE SAVED, data: ",data)
        }
        res.redirect("/")
    })
})

app.post('/commenting/:messID', function(req, res){
    console.log("ARRIVED at /commenting")
    console.log("RECEIVED COMMENT FORM DATA req.body:",req.body)
    //create comment to insert into message:
    Comment.create(req.body, function(err,data){
        if(err){
            console.log("There's error creating comment: ", err)
            for(var i in err.errors){
                req.flash('comment_err', err.errors[i].message);
            }
            res.redirect("/")
        }else{
            console.log("SUCCESSFULLY CREATED COMMENT, here's DATA:", data)
        //locate the message associate with the comment
        Message.update({_id:req.params.messID}, {$push:{comments:data}}, function(err, data){
            if(err){
                console.log("ERROR IN UPDATING COMMENT - err: ", err)
            }else{
                console.log("COMMENT SAVED, data: ",data)
            }
        })
        res.redirect("/")
        }
    })
})