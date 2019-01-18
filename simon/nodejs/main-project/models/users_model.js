const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username : {
        type: String
    },
    email : {
        type : String
    },
    country : {
        type : String
    },
    password : {
        type : String
    },
    image : {
        type : String , required : false ,
    },
    date: {
        type: Date,
        default: Date.now
      }
});

 let user = mongoose.model('user_details', userSchema);

module.exports = user;