
const mongoose = require('mongoose');

// DB constants 
const url = "mongodb://localhost:27017/Toramadb";
const _collectionname = "torama_users";

//Connect to the database using mongoose
mongoose.connect(url);
var Schema = mongoose.Schema;

//Defining a data representation
var UserDataSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
    playlist: {
        vid_name: String,
        vid_duration: String,
        vid_url: String,
        vid_views: Number
    }
});

// Creating a collection
var userData = mongoose.model(_collectionname, UserDataSchema);
//console.log(userData);
module.exports = userData;