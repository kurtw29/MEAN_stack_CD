var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var app = express();
app.use(express.static(__dirname+"/public/dist/public"))
//set up body-parser to parse json
app.use(bodyParser.json());


//set up mongoose connection to mongodb
mongoose.connect('mongodb://localhost/productManagers');
var ProductSchema = new mongoose.Schema({
    title: {type: String, required:[true, "Title cannot be empty"], minlength:[4, "Title be at least 4 characters"]},
    price: {type: Number, required:[true, "Price cannot be empty"]},
    image_url: {type:String, default:""}
})
mongoose.model("Product", ProductSchema);
var Product = mongoose.model("Product");


// routing
app.get("/all_products", (req, res) => {
    console.log("Enter /products for retrive all products");
    Product.find({}, function(err, data){
        if(err){
            res.json({message: false, err})
        }else{
        res.json({message:true, data})
        }
    })
})

app.get("/product_by_id/:id", (req, res)=> {
    console.log("Enter /products/:id retrieve products with id:",req.params.id);
    Product.find({_id:req.params.id}, function(err, data){
        if(err){
            res.json({message:false, err})
        }else{
            res.json({message:true, data})
        }
    })
})

app.post("/add_products", (req, res) => {
    console.log("CReated a Product", req.body);
    console.log("typeof req.body['price']: ",typeof req.body['price'])
    console.log("typeof req.body['title']: ",typeof req.body['title'])
    // req.body['price'] = parseInt(req.body['price'])
    // console.log("typeof req.body['price']: ",typeof req.body['price'])
    Product.create(req.body)
        .then(
            data => {
                res.json({message: true, data: data})
            }
        )
        .catch(
            error => res.json({message: false, err: error})
        )
})

app.put("/edit_products/:id", (req, res) => {
    console.log("Update task with id:",req.params.id)
    Product.update({_id:req.params.id}, {$set: req.body}, {runValidators: true, context: 'query'}, function(err, data){
        if(err){
            res.json({message:false, err})
        }else{
            res.json({message:true, data})
        }
    })
})

app.delete("/delete_products/:id", (req, res) => {
    console.log("Delete task with id:",req.params.id)
    Product.deleteOne({_id:req.params.id}, function(err){
        if(err){
            res.json({message: false,err});
        }else{
            res.json({message: true });
        }
    })
})




//set up path to server index.html
app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
})
app.listen(8000)