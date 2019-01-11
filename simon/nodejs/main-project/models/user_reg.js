const express = require('express');
let busboy = require('connect-busboy');
const bodyParser = require('body-parser');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const router = express.Router();
const mongoose = require('mongoose');
const express_validator = require('express-validator');
const Users = require('../models/users_model');
const db = require('../models/db');
const connectFlash = require('connect-flash');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const auth = require('../models/auth');




let app = express();


//var walkSync = walk.walkSync('videos');
const allVideos = require('../randomFilePicker');
var videosSync = [];
videosSync = allVideos.findVideos('videos');




//app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// express validator middleware
app.use(express_validator());

// Express Validator
app.use(express_validator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));
    // use connect flash
  app.use(connectFlash());

  //Global varial for flash
  app.use(function(req, res, nexr){
           res.locals.success_msg = req.flash('success_msg');
          res.locals.error_msg = req.flash('error_msg');
         res.locals.error = req.flash.flash('error');
         next();
  })
  



  // registration form
router.get('/', function(req, res,next) {
    res.render( 'user_reg',  {
        
      });
   
  
});



        // submit registration form....
 router.post('/', function(req , res , next){
     /// show user details
     console.log(req.body.password);
     // password to object
     let pass = req.body.user_password;
  
     // hash users password , but not used for now ....
     const encrypted_data = cryptr.encrypt(pass);
   
     // check form validation if errors
  req.checkBody('user_name', 'username is required.').notEmpty();
  req.checkBody('user_email', ' Enter a valid email.').isEmail();
  req.checkBody('user_country', 'country is required.').notEmpty();
  req.checkBody('user_password', ' invalid password').isLength({min :4}).equals(req.body.user_password2);

 let errors = req.validationErrors(); 
  if (errors){
     res.render('user_reg', {
         errors : errors
     });
      console.log("error in form "+errors);
  

  }else{

        
     
    // if no errors  register user here
    let username = req.body.user_name;
    let email = req.body.user_email;
    let country = req.body.user_country;
    let password = req.body.user_password;
    // create nschema object for new user
    let newUser = new Users();
    newUser.username = username;
    newUser.password = password;
    newUser.email = email;
    newUser.country = country;
    newUser.save(function(error, docs){
        if(error){
            console.log('error saving data :'+ error);
        }
        console.log('user data saved....');

        // flash sucess message....
       // req.connectFlash('success_message', " thank you for registering...");
        res.render('home', {
            
        videoTitle: 'Torama Video Portal (index)',
        lessonNumber: 'Lesson 1',
        videoDir: 'Root (videos)',
        videoFiles: videosSync,
        recommended: videosSync[3],
          name : username,
          success : false , error : req.session.errors
        });
        
        
    });
      
      // const decryptedString = cryptr.decrypt(encryptedString);
}});
      
  

module.exports = router;