//modularized the controllers
const quotes = require('../controllers/quotes.js')

module.exports = function(app){
    app.get('/', function(req, res){
        quotes.index(req, res);
    })

    app.post('/quoting', function(req, res){
        quotes.quoting(req, res);
    })

    app.get('/quotes', function(req, res){
        quotes.displaying(req, res);
    })
}