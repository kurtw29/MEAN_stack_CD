const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/AnimalDB');

    var AnimalSchema = new mongoose.Schema({
        name: {type:String, required: [true, "Name cannot be blank"], minlength:[3,"Name needs at least 3 characters"]},
        desc: String,
    }, {timestamps: true});
    
    mongoose.model('Animal', AnimalSchema);
    var Animal = mongoose.model('Animal');