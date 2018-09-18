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

app.post('/save', function(req, res){
    console.log("arrived server /SAVE")
    console.log('req.body info: ', req.body)
    Gold.find({userName:req.body.userName}, function(err, data){
        console.log("FINDING USERS: DATA, ",data, " and err: ", err)
        if(err != null || data.length == 0){
            Gold.create(req.body, function(err, data){
                console.log("USER NOT FOUND -> CREATING USER")
                if(err != null || data.length == 0){
                    console.log("did not find user & unable to create new")
                    res.json({"message":false, data})
                }else{
                    res.json({"message":true, data})
                }
            })
        }else{
            Gold.update({userName:req.body.userName}, {gold:req.body.gold, activities:req.body.activities}, function(err, data){
                console.log("USER FOUND -> UPDATING USER err: ", err, " data: ", data)
                if(err != null){
                    res.json({"message":false, data})
                }else{
                    res.json({"message":true, data})
                }
            })
        }
    })
})

app.post('/load', function(req, res){
    console.log("arrived server /load");
    console.log('req.body info: ', req.body);
    Gold.find({userName:req.body.userName}, function(err, data){
        console.log("FINDING USER: data: ",data, "Error: ",err);
        if(err != null || data.length == 0){
            res.json({"message":false, data})
        }else{
            res.json({"message": true, data})
        }
    })
})

app.get('/top', function(req,res){
    Gold.find({}, function(err, data){
        if(err != null){
            res.json({"message":false, data});
        }else{
            res.json({message:true, data})
        }
    }).sort({gold:-1}).limit(5);
});
// app.post('/gold', function(req, res){
//     Gold.find({userName:req.body.userName}, function(err, data){
//         console.log("get /gold data: ", data)
//         if(err){
//             res.json({message:false, data});
//         }else{
//             res.json({message: true, data});
//         }
//     })
// })

// app.post('/create', function(req, res){
//     Gold.create({userName:req.body.userName, gold:0, activities:[]}, function(err, data){
//         if(err){
//             res.json({message:false, data})
//         }else{
//             res.json({message:true, data});
//         }
//     })
// })

// app.post('/farm', function(req, res){
//     console.log('inside post /farm');
//     console.log('req.body: ',req.body);
//     console.log('AFTER change score req.body: ',req.body, " score: ");
//     Gold.update({userName:req.body.userName}, {$set: {gold:req.body.gold}},  function(err, data){
//         if(err){
//             console.log("problem updating gold", err)
//             res.json({"message":false, data});
//         }else{
//             Gold.update({userName: req.body.userName}, {$push: {activities: req.body.activities}}, function(err, data){
//                 if(err){
//                     console.log("problem updating gold", err)
//                     res.json({"message":false, data});
//                 }
//                 else{
//                     console.log("succesfully updated, data: ", data)
//                     res.json({"message":true, data});

//                 }
//             })
            
//         }
//     });
// })
// app.post('/cave', function(req, res){
//     console.log(" post/cave req.body: ",req.body)
//     Gold.update({userName:req.body.userName}, {$set: {gold:req.body.gold}}, function(err, data){
//         if(err){
//             console.log("problem updating gold", err)
//             res.json({"message":false, data});
//         }else{
//             Gold.update({userName: req.body.userName}, {$push: {activities: req.body.activities}}, function(err, data){
//                 if(err){
//                     console.log("problem updating gold", err)
//                     res.json({"message":false, data});
//                 }
//                 else{
//                     console.log("succesfully updated, data: ", data)
//                     res.json({"message":true, data});
//                 }
//             })
            
//         }
//     });
// })
// app.post('/house', function(req, res){
//     Gold.update({userName:req.body.userName}, {$set: {gold:req.body.gold}}, function(err, data){
//         if(err){
//             console.log("problem updating gold", err)
//             res.json({"message":false, data});
//         }else{
//             Gold.update({userName: req.body.userName}, {$push: {activities: req.body.activities}}, function(err, data){
//                 if(err){
//                     console.log("problem updating gold", err)
//                     res.json({"message":false, data});
//                 }
//                 else{
//                     console.log("succesfully updated, data: ", data)
//                     res.json({"message":true, data});

//                 }
//             })
            
//         }
//     });
// })
// app.post('/casino', function(req, res){
//     Gold.update({userName:req.body.userName}, {$set: {gold:req.body.gold}}, function(err, data){
//         if(err){
//             console.log("problem updating gold", err)
//             res.json({"message":false, data});
//         }else{
//             Gold.update({userName: req.body.userName}, {$push: {activities: req.body.activities}}, function(err, data){
//                 if(err){
//                     console.log("problem updating gold", err)
//                     res.json({"message":false, data});
//                 }
//                 else{
//                     console.log("succesfully updated, data: ", data)
//                     res.json({"message":true, data});

//                 }
//             })
            
//         }
//     });
// })

app.listen(8000);