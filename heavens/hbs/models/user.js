var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
mongoose.connect('MongoDB://localhost/torama');

var db = mongoose.connection;

//user schema
var UserSchema = mongoose.Schema({
    username:{
        type:String,
        index:true
    },
    password:{
        type:String,
    },
    email:{
        type:String,
    },
    name:{
        type:String,
    },
    profileimage:{
        type:String,
    }
});

var User = module.exports = mongoose.model('user', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.comparePassword = function(candicatePassword, hash){
    becrypt.compare(candicatePassword, hash, function(err, isMatch){
      callback(null, isMatch);
    });
}
module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(newUser.password, salt, function(err, hash){
        //store your passswords  as hash in your  database
        newUser.password=hash;
        newUser.save(callback);
    });
    });
    
}
 