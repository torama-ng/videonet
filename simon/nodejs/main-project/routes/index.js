var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const Users = require('../models/users_model');
const mongoose = require('mongoose');
const express_validator = require('express-validator');
//const walk = require('../walk.js');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//var walkSync = walk.walkSync('videos');
const allVideos = require('../randomFilePicker');
var videosSync = [];
videosSync = allVideos.findVideos('videos');


/* GET home page. */
router.get('/', function(req, res, next){
  res.render('login_view');
});

router.post('/',function(req,res){
  // login details user here
  
  let email = req.body.user_email;
  let password = req.body.user_password;

  Users.findOne({email : email, password : password}, function(error, user){
    if(error){
        console.log(' error logging in. :'+ error);
       
    }
    if (!user){
        console.log(' user does not exist..');
    }
    res.render('home',{ 
        videoTitle: 'Torama Video Portal (index)',
        lessonNumber: 'Lesson 1',
        videoDir: 'Root (videos)',
        videoFiles: videosSync,
        recommended: videosSync[3],
          name : email
      
         
      });
  })
});



module.exports = router;

