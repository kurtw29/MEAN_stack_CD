var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var app = express();
app.use(express.static(__dirname + '/public/dist/public'));
app.use(bodyparser.json());

mongoose.connect('mongodb://localhost/ninjaGold');
var GoldSchema = new mongoose.Schema({
    userName: String,
    gold: Number,
    activities: []
}, {timpstamps: true});

mongoose.model('Gold', GoldSchema);
var Gold = mongoose.model('Gold');

app.get('/gold', function(req, res){
    Gold.find({userName:req.body.userName}, function(err, data){
        console.log("get /gold data: ", data)
        if(err){
            res.json({message:false, data});
        }else{
            res.json({message: true, data});
        }
    })
})

app.post('/farm', function(req, res){
    console.log('inside post /farm');
    console.log('req.body: ',req.body);
    console.log('AFTER change score req.body: ',req.body, " score: ");
    Gold.update({userName:req.body.userName}, {$set: {gold:req.body.gold}},  function(err, data){
        if(err){
            console.log("problem updating gold", err)
            res.json({"message":false, data});
        }else{
            Gold.update({userName: req.body.userName}, {$push: {activities: req.body.activities}}, function(err, data){
                if(err){
                    console.log("problem updating gold", err)
                    res.json({"message":false, data});
                }
                else{
                    console.log("succesfully updated, data: ", data)
                    res.json({"message":true, data});

                }
            })
            
        }
    });
})
app.post('/cave', function(req, res){
    console.log(" post/cave req.body: ",req.body)
    Gold.update({userName:req.body.userName}, {$set: {gold:req.body.gold}}, function(err, data){
        if(err){
            console.log("problem updating gold", err)
            res.json({"message":false, data});
        }else{
            Gold.update({userName: req.body.userName}, {$push: {activities: req.body.activities}}, function(err, data){
                if(err){
                    console.log("problem updating gold", err)
                    res.json({"message":false, data});
                }
                else{
                    console.log("succesfully updated, data: ", data)
                    res.json({"message":true, data});
                }
            })
            
        }
    });
})
app.post('/house', function(req, res){
    Gold.update({userName:req.body.userName}, {$set: {gold:req.body.gold}}, function(err, data){
        if(err){
            console.log("problem updating gold", err)
            res.json({"message":false, data});
        }else{
            Gold.update({userName: req.body.userName}, {$push: {activities: req.body.activities}}, function(err, data){
                if(err){
                    console.log("problem updating gold", err)
                    res.json({"message":false, data});
                }
                else{
                    console.log("succesfully updated, data: ", data)
                    res.json({"message":true, data});

                }
            })
            
        }
    });
})
app.post('/casino', function(req, res){
    Gold.update({userName:req.body.userName}, {$set: {gold:req.body.gold}}, function(err, data){
        if(err){
            console.log("problem updating gold", err)
            res.json({"message":false, data});
        }else{
            Gold.update({userName: req.body.userName}, {$push: {activities: req.body.activities}}, function(err, data){
                if(err){
                    console.log("problem updating gold", err)
                    res.json({"message":false, data});
                }
                else{
                    console.log("succesfully updated, data: ", data)
                    res.json({"message":true, data});

                }
            })
            
        }
    });
})

app.listen(8000);