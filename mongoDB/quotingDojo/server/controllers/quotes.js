const mongoose = require('mongoose');
//retrive the schema called 'Quote' and store it to the variable Quote
// const Quote = mongoose.model("Quote");
const Quote = require('./../config/mongoose.js')

module.exports = {

    index: function(req, res){
        res.render('index');
    },

    quoting: function(req, res){
        console.log("What's the form data? req.body:", req.body);
        var quoteInstance = new Quote();
        quoteInstance.name = req.body.name;
        quoteInstance.quote = req.body.quote;
        quoteInstance.save(function(err){
            if(err){
                console.log("Error in saving quotes info:",err);
                for(var i in err.errors){
                req.flash('submit_quote', err.errors[i].message);
                }
                res.redirect('/');
            }else{
                console.log('SAVE SUCCESS');
                res.redirect('/quotes')
            }
        })
    },

    displaying: function(req, res){
        Quote.find({}, function(err, quotes){
            if(err){
                console.log('Error in finding quotes:', err)
                res.render('quotes', {quotes:quotes})
            }else{
                // console.log(quotes);
                res.render('quotes', {quotes:quotes})
            }
        }).sort({createdAt:-1})
    }

}