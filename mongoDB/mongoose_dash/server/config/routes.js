const animals = require('./../controllers/animals.js')
module.exports = function(app){
    app.get('/', function(req, res){
        animals.index(req, res);
    })
        
    app.get('/mongooses/new', function(req, res){
        animals.new(req, res);
    })
    
    app.get('/mongooses/:id', function(req, res){
        animals.displayOne(req, res);
    })
    
    
    app.post("/mongooses", function(req, res){
        animals.adding(req, res);
    })
    
    app.get('/mongoose/edit/:id', function(req, res){
        animals.edit(req, res);
    })
    
    app.post("/mongooses/:id", function(req, res){
        animals.edit_proc(req, res);
    })
    
    app.get("/mongoose/destroy/:id", function(req, res){
        animals.delete(req, res);
    })
}