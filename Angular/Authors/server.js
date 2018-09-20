var express = require('express');
var app = express();
app.use(express.static(__dirname + "/public/dist/public"));

//set up path to serve index.html to client when url not found in server
const path = require('path');


//set up body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//set up connection with mongoose database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authors');

var AuthorSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, "Cannot enter blank"],
        minlength: [3, "Name must have at least 3 characters"],
    },
    quote: {
        type:String,
        minlength: [3, "Quote must have at least 3 characters"]
    }
})

//setting up model "Author"
mongoose.model('Author', AuthorSchema);
var Author = mongoose.model('Author');


// routing
app.get("/authors", (req, res) => {
    console.log("Enter /authors for retrive all authors");
    Author.find({}, function(err, data){
        if(err){
            // res.json("ERROR WHEN RETRIEVING ALL AUTHORS:", err)
            res.json({message:false, err})
        }else{
        res.json({message:true, data})
        }
    })
})

app.get("/authors/:id", (req, res)=> {
    console.log("Enter /authors/:id retrieve author with id:",req.params.id);
    Author.find({_id:req.params.id}, function(err, data){
        if(err){
            // res.json("ERROR OCCURED WHEN retriving author with specific id, ERR:", err)
            res.json({message:false, err})
        }else{
        res.json({message:true, data})
        }
    })
})

// post for adding a author
app.post("/authors", (req, res) => {
    console.log("CReated a author; req.body: ", req.body);
    Author.create(req.body, function(err, data){
        if(err){
            console.log("err in creating author: ", err)
            // res.json("ERROR occured when creating a Author. ERR:", err)
            res.json({message:false, err})
        }else{
        // res.json({message:"Successfully added author!"})
        res.json({message:true, data})
        }
    })
})
// edit author
app.put("/authors/:id", (req, res) => {
    console.log("Update author with id:",req.params.id)
    Author.update({_id:req.params.id}, {$set: req.body}, {runValidators: true, context: 'query'}, function(err, data){
        if(err == null){
            res.json({message:true, data})
        }else{
            // res.json("ERROR ocurred when updating a author")
            res.json({message:false, err})
        }
    })
})

app.delete("/authors/:id", (req, res) => {
    console.log("Delete Author with id:",req.params.id)
    Author.deleteOne({_id:req.params.id}, function(err){
        if(err){
            // res.json("ERROR occured when deleting an author. ERR:",err)
            res.json({message:false, err})

        }else{
            res.json({message: true })
        }
    })
})
app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});
app.listen(8000);
