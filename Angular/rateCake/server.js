var express = require('express');
var app = express();
app.listen(8000);
app.use(express.static(__dirname + "/public/dist/public"));

//set up body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//set up connection with mongoose database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rateCake');
var RatingSchema = new mongoose.Schema({
    stars: Number,
    comment: String
}, {timestamps:true});

var CakeSchema = new mongoose.Schema({
    baker: String,
    url: String,
    ratings: [RatingSchema],
}, {timestamps:true});

//setting up model "Cake"
mongoose.model('Cake', CakeSchema);
var Cake = mongoose.model('Cake');
//setting up model "Rating"
mongoose.model("Rating", RatingSchema);
var Rating = mongoose.model("Rating");

// routing
app.get("/cakes", (req, res) => {
    console.log("Enter /cakes for retrive all cakes");
    Cake.find({}, function(err, data){
        if(err){
            res.json("ERROR WHEN RETRIEVING ALL CAKES:", err)
        }
        res.json(data)
    })
})

app.get("/cakes/:id", (req, res)=> {
    console.log("Enter /cakes/:id retrieve cake with id:",req.params.id);
    Cake.find({_id:req.params.id}, function(err, data){
        if(err){
            res.json("ERROR OCCURED WHEN retriving cake with specific id, ERR:", err)
        }
        res.json(data)
    })
})

// post for adding a cake
app.post("/cakes", (req, res) => {
    console.log("CReated a Cake");
    Cake.create(req.body, function(err, data){
        if(err){
            res.json("ERROR occured when creating a cake. ERR:", err)
        }
        res.json({message:"Successfully added cake!"})
    })
})

//post for rating a cake with <:id>
app.post("/cakes/:id", (req, res) => {
    console.log("Update cake with id:",req.params.id)
    console.log("Update cake with req.body:",req.body)
    Rating.create(req.body, function(err, data){
        if(err){
            console.log("Erro creating rating for adding ",err)
            res.json({message:"Error creating rating for adding"})
        }else{
            console.log("pushing",data,"into Cake collection")
             Cake.update({_id:req.params.id}, {$push: {ratings:data}}, function(err){
                if(err){
                    console.log("Error in pushing data into Cake ",err)
                    res.json("ERROR ocurred when updating a cake")
                }
                res.json({message:"Successfully updated cake"})
            })
        }
    })
   
})

app.delete("/cakes/:id", (req, res) => {
    console.log("Delete cake with id:",req.params.id)
    Cake.deleteOne({_id:req.params.id}, function(err){
        if(err){
            res.json("ERROR occured when deleting a cake. ERR:",err)
        }
        res.json({message: true })
    })
})