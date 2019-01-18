var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var db = 'mongodb://localhost/toramaDb';
mongoose.connect(db);



var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },

    fullname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
    repassword: {
        type: String,
        required: true,
    },
});


userSchema.method.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.method.comparePassword = function(password, hash) {
    return bcrypt.compareSync(password, hash)
}
var userData = mongoose.model('users', userSchema);

module.exports = userData;