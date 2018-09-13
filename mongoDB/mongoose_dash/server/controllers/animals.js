const mongoose = require('mongoose');
var Animal = mongoose.model('Animal')

module.exports={
    index:function(req, res){
        //Display all the mongooses
        Animal.find({}, function(err, animals){
            if(err){
                console.log("err in finding all mongoose:", err);
            }
            // console.log("all the animal objects display here:",animals)
            res.render('index', {animals:animals})
        })
    },

    new:function(req, res){
        // Display form for making a new mongoose
        res.render('new')
    },

    displayOne:function(req, res){
        //display information about one mongoose
        Animal.find({_id:req.params.id}, function(err, animals){
            if(err){
                console.log("Error in finding the animal with params id:", err)
            }
            // console.log("display the animal object associated with the params id:", animals)
            res.render('info', {animals:animals})
        })
    },

    adding:function(req, res){
        // Process the submitted new mongoose, save mongoose
        var animalInstance = new Animal()
        animalInstance.name = req.body.name;
        animalInstance.desc = req.body.desc;
        animalInstance.save(function(err){
            if(err){
                console.log("Errors in adding new mongoos: ", err)
            }else{
            console.log("SUCCESSFULLY ADDED NEW MONGOose")
            }
        })
        res.redirect('/')
    },

    edit:function(req, res){
        // Should a form to edit an existing mongoose
        Animal.find({_id:req.params.id}, function(err, animal){
            if(err){
                console.log("Error in getting single animal from params.id: ", animal)
            }
            console.log("found the mongoose: animal:",animal)
            res.render('edit', {animal:animal})
        })
    },

    proc_edit:function(req, res){
        // process the editing mongoose (update)
        Animal.update({_id:req.params.id}, {$set: {name: req.body.name, desc:req.body.desc}}, function(err){
            if(err){
                console.log("Error in updating animal", err)
            }else{
            console.log("UPDATED SUCCESS")
            }
            res.redirect('/')
        })
    },

    delete:function(req, res){
        // delete mongoose from database by id
        Animal.remove({_id:req.params.id}, function(err){
            if(err){
                console.log("Error in removing", err);
            }else{
            console.log("Remomving SUCCESSFUL")
            }
        })
        res.redirect('/');
    }
}