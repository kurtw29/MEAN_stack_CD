var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req, res){
    if(req.url === '/cars'){
        fs.readFile('cars.html', 'utf8', function(errors, contents){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(contents);
            res.end();
        });
    }
    else if(req.url === '/images/car1.png'){
        fs.readFile('./images/car1.png', function(errors, contents){
            res.writeHead(200, {'Content-Type':'image/png'});
            res.write(contents);
            res.end();
        });
    }
    else if(req.url === '/images/car2.png'){
        fs.readFile('./images/car2.png', function(errors, contents){
            res.writeHead(200, {'Content-Type':'image/png'});
            res.write(contents);
            res.end();
        });
    }
    else if(req.url === '/images/car3.png'){
        fs.readFile('./images/car3.png', function(errors, contents){
            res.writeHead(200, {'Content-Type':'image/png'});
            res.write(contents);
            res.end();
        });
    }
    if(req.url === '/cats'){
        fs.readFile('cats.html', 'utf-8', function(errors, contents){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(contents);
            res.end();
        });
    }
    else if(req.url === '/images/cat1.png'){
        fs.readFile('./images/cat1.png', function(errors, contents){
            res.writeHead(200, {'Content-Type':'image/png'});
            res.write(contents);
            res.end();
        })
    }
    else if(req.url === '/images/cat2.png'){
        fs.readFile('./images/cat2.png', function(errors, contents){
            res.writeHead(200, {'Content-Type':'image/png'});
            res.write(contents);
            res.end();
        })
    }
    else if(req.url === '/images/cat3.png'){
        fs.readFile('./images/cat1.png', function(errors, contents){
            res.writeHead(200, {'Content-Type':'image/png'});
            res.write(contents);
            res.end();
        })
    }
    else if(req.url === '/cars/new'){
        fs.readFile('newcar.html', 'utf-8', function(errors, contents){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(contents);
            res.end();
        })
    }
});
server.listen(6789);
console.log("running localhost at post 6789");
