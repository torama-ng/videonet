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
    }
});

 let user = mongoose.model('user_details', userSchema);

module.exports = user;