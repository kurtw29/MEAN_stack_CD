var express = require('express');
var app = express();

app.get("/", function(req, res){
    console.log("came to '/' ");
    console.log("request object:", req)
    console.log("respond object:", res)
})
app.set('views', __dirname+ "+/views");
app.set('view engine', 'ejs');

app.listen(8000, function(){
    console.log("listening on port 8000");
})