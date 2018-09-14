var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname +'/public/dist/public'));
app.use(bodyParser.json());

app.listen(8000);
