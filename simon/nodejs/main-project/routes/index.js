var express = require('express');
const expressSession = require('express-session');
var router = express.Router();
const bodyParser = require('body-parser');
const Cryptr = require('cryptr');
const Users = require('../models/users_model');
const mongoose = require('mongoose');
const express_validator = require('express-validator');
const connectFlash = require('connect-flash');
const passport = require('passport');
const facebookStrategy = require('passport-facebook');
const passportLocal = require('passport-local').Strategy;
const configAuth = require('../models/auth');


//const walk = require('../walk.js');

let app = express();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

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


 // facebook login strategy
passport.use(new facebookStrategy({
    clientID: configAuth.facebookAuth.client_id,
    clientSecret: configAuth.facebookAuth.client_secret,
    callbackURL: configAuth.facebookAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate("username", function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook'));
// authentication has failed.
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));


// express session
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
    // pass session to object on login form
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
    // get login form details...
    let email = req.body.user_email;
  let password = req.body.user_password;
        //  find user in database...
  Users.findOne({email : email, password : password}, function(error, user){
    if(error){
        console.log(' error logging in. :'+ error);
       
    }

    // if user user not found in database...
    if (!user){
        console.log(' user does not exist..');
    }
    // if user is found, go to home page
    req.session.user = user;
    res.render('home',{ 
        videoTitle: 'Torama Video Portal (index)',
        lessonNumber: 'Lesson 1',
        videoDir: 'Root (videos)',
        videoFiles: videosSync,
        recommended: videosSync[3],
          name : email
      });
//req.session.errors = null;
  })
}
});



module.exports = router;

