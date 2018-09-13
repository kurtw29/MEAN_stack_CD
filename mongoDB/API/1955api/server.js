//setting up basic modules
const express = require('express');
const app = express();
app.listen(8000);

//setting up json body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//setting mongoose database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/1955api');
var PeopleSchema = new mongoose.Schema({
    name: String
})
//setting up model, "People"
mongoose.model('People', PeopleSchema);
var People = mongoose.model('People')

//routing
app.get("/", function(req, res){
    let people = People.find({}, function(err, data){

        console.log(data);
        res.json(data)
    });
})

app.get('/new/:name/', function(req, res){
    People.create({name:req.params.name}, function(err, data){
        if(err){
            console.log("WE HAVE AN ERROR CREATING req.params.name");
        }else{
            console.log("WE ADDED req.params.name in our database, data: ", data)
        }
        res.redirect('/');
    })
})

app.get('/remove/:name', function(req, res){
    People.deleteOne({name:req.params.name}, function(err){
        if(err){
            console.log('WE HAVE AN ERROR DELETING req.params.name:',req.params.name)
        }else(
            console.log('SUCCESSFULLY DELETED req.params.name')
        )
        res.redirect('/');
    })
})

app.get("/:name", function(req, res){
    People.findOne({name:req.params.name}, function(err, data){
        if(err){
            console.log("WE GOT AN ERROR FINDING ONE DOCUMENT req.params.name:", req.params.name)
        }else{
            console.log("SUCCESSFULLY FOUND ONE MATCHING DOCUMENT, ",data)
        }
        res.json(data);
    })
})