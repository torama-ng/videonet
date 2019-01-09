var express = require('express');
const expressSession = require('express-session');
var router = express.Router();
const bodyParser = require('body-parser');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const Users = require('../models/users_model');
const mongoose = require('mongoose');
const express_validator = require('express-validator');
//const walk = require('../walk.js');

let app = express();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));


router.use(expressSession({
    secret : 'fererresjcsjhcbkckcjdkkljkllj',
    resave : false,
    saveUninitialized : false,
    // cookie : {secure : true}
  }));

//var walkSync = walk.walkSync('videos');
const allVideos = require('../randomFilePicker');
var videosSync = [];
videosSync = allVideos.findVideos('videos');


/* GET home page. */
router.get('/', function(req, res, next){
 // check if user already , then redirect back to home page
  if(req.session.user){
  
    useremail = req.session.user.email;
   
    console.log(' you are already logged in as :'+ useremail);
    res.render('home', {
        
            videoTitle: 'Torama Video Portal (index)',
            lessonNumber: 'Lesson 1',
            videoDir: 'Root (videos)',
            videoFiles: videosSync,
            recommended: videosSync[3],
              name : "welcome back : "+useremail
    });

}else{ 
  res.render('login_view' ,{
    userObj: req.user || null	
  }); }
});

router.post('/',function(req,res, next){
  // login details user here
  
  if(req.session.user){
  
        useremail = req.session.user.email;
       
        console.log(' you are already logged in as :'+ useremail);
        res.render('home', {
            
                videoTitle: 'Torama Video Portal (index)',
                lessonNumber: 'Lesson 1',
                videoDir: 'Root (videos)',
                videoFiles: videosSync,
                recommended: videosSync[3],
                  name : "you are already logged in as : "+useremail
        });

}else{

    let email = req.body.user_email;
  let password = req.body.user_password;

  Users.findOne({email : email, password : password}, function(error, user){
    if(error){
        console.log(' error logging in. :'+ error);
       
    }
    if (!user){
        console.log(' user does not exist..');
    }

    req.session.user = user;
    res.render('home',{ 
        videoTitle: 'Torama Video Portal (index)',
        lessonNumber: 'Lesson 1',
        videoDir: 'Root (videos)',
        videoFiles: videosSync,
        recommended: videosSync[3],
          name : email
      });
      req.session.errors = null;
  })
}
});



module.exports = router;

