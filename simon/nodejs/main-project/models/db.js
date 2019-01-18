const mongoose = require('mongoose');
var model = require('./users_model');

console.log("Model - "+model);

mongoose.connect('mongodb://localhost:27017/simon_data', function(err){
    if (!err){
        console.log(' database  connection sucessful');
    }else{
        console.log('erorr connecting to mongodb :'+ err);
    }
});

