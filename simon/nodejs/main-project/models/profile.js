var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const bodyParser = require('body-parser');
const Cryptr = require('cryptr');







router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));




let profileSchema = new mongoose.Schema({
    name : {
        first : String, 
        lastname : String
    },
    gender : { type : Number, max : 3},
    age : Number
});


router.get('/' , function(req, res){
    res.render('profile');
})

module.exports = router;



