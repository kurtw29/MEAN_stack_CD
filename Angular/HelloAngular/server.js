var express = require('express');
var app = express();
app.listen(8000);
app.use(express.static(__dirname + "/public/dist/public"));

//set up body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//set up connection with mongoose database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/taskapi');
var TaskSchema = new mongoose.Schema({
    title: String,
    description: {type:String, default:""},
    completed: {type:Boolean, default:false},
}, {timestamps:true});

//setting up model "Task"
mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');

// routing
app.get("/tasks", (req, res) => {
    console.log("Enter /tasks for retrive all tasks");
    Task.find({}, function(err, data){
        if(err){
            res.json("ERROR WHEN RETRIEVING ALL TASK:", err)
        }
        res.json(data)
    })
})

app.get("/tasks/:id", (req, res)=> {
    console.log("Enter /tasks/:id retrieve tasks with id:",req.params.id);
    Task.find({_id:req.params.id}, function(err, data){
        if(err){
            res.json("ERROR OCCURED WHEN retriving task with specific id, ERR:", err)
        }
        res.json(data)
    })
})

app.post("/tasks", (req, res) => {
    console.log("CReated a Task");
    Task.create(req.body, function(err, data){
        if(err){
            res.json("ERROR occured when creating a task. ERR:", err)
        }
        res.json({message:"Successfully added task!"})
    })
})

app.put("/tasks/:id", (req, res) => {
    console.log("Update task with id:",req.params.id)
    Task.update({_id:req.params.id}, {$set: req.body}, function(err, data){
        if(err){
            res.json("ERROR ocurred when updating a task")
        }
        res.json({message:"Successfully updated task"})
    })
})

app.delete("/tasks/:id", (req, res) => {
    console.log("Delete task with id:",req.params.id)
    Task.deleteOne({_id:req.params.id}, function(err){
        if(err){
            res.json("ERROR occured when deleting a task. ERR:",err)
        }
        res.json({message: true })
    })
})