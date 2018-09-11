var express = require('express')
var app = express();
app.listen(8000);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/stataic"));
app.set("views"+__dirname+"/views");
app.set("view engine", "ejs");
mongoose.connect('mongodb://localhost/AnimalDB');
var AnimalSchema = new mongoose.Schema({
    name: {type:String, required: [true, "Name cannot be blank"], minlength:[3,"Name needs at least 3 characters"]},
    desc: String,
    id_num: Number
}, {timestamps: true});
mongoose.model('Animal', AnimalSchema);
var Animal = mongoose.model('Animal');
app.get('/', function(req, res){
    //Display all the mongooses
    Animal.find({}, function(err, animals){
        if(err){
            console.log("err in finding all mongoose:", err);
        }
        console.log("all the animal objects display here:",animals)
        res.render('index', {animals:animals})
    })
})

app.get('/mongooses/:id', function(req, res){
    //display information about one mongoose
    Animal.find({id_num:req.params.id}, function(err, animals){
        if(err){
            console.log("Error in finding the animal with params id:", err)
        }
        console.log("display the animal object associated with the params id:", animals)
        res.render('index', {animals:animals});
    })
})
app.get('/mongooses/new', function(){
    // Display form for making a new mongoose
    res.render('new')
})

//create auto-increment id
var id_counter = 0;
app.post("/mongooses", function(req, res){
    // Process the submitted new mongoose, save mongoose
    id_counter++
    var animalInstance = new Animal()
    animalInstance.name = req.body.name;
    animalInstance.desc = req.body.desc;
    animalInstance.id_num = id_counter
    animalInstance.save(function(err){
        if(err){
            console.log("Errors in adding new mongoos: ", err)
        }else{
        console.log("SUCCESSFULLY ADDED NEW MONGOose")
        }
    })
    res.redirect('/')
})

app.get('/mongooses/edit/:id', function(req, res){
    // Should a form to edit an existing mongoose
    Animal.find({id_num:req.params.id}, function(err, animal){
        if(err){
            console.log("Error in getting single animal from params.id: ", animal)
        }
        res.render('edit', {animals:animals})
    })
})

app.post("/mongooses/:id", function(req, res){
    // process the editing mongoose (update)
    Animal.update({id_num:req.params.id}, {$set: {name: req.body.name, desc:req.body.desc}}, function(err){
        if(err){
            console.log("Error in updating animal", err)
        }else{
        console.log("UPDATED SUCCESS")
        }
        res.redirect('/')
    })
})

app.post("/mongooses/destroy/:id", function(req, res){
    // delete mongoose from database by id
    Animal.remove({id_num:req.params.id}, function(err){
        if(err){
            console.log("Error in removing", err);
        }else{
        console.log("Remomving SUCCESSFUL")
        }
    })
})