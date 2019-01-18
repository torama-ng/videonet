var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});
var passport = require('passport');
var localStratrgy = require('passport-local').Strategy;
var User = require('../models/user');

router.get('/', function(req, res, next){
    res.send('responding to ur messsages');
});

router.get('/register', function(req, res, next){
    res.render('register');
});

router.get('/login', function(req, res, next){
    // res.render('login');
});

router.post('/login',
    passport.authenticate('local', {failureRedirect:'/users/login', failureflash: 'Invalid username or password'}),
    function(req, res){
    req.flash('success', 'you are now logged in');
    res.redirect('/');
});

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.getUserById(id, function(err, user){
        done(err, user);
    });
});
passport.use(new localStratrgy(function(username, password, done){
    user.getUserByUsername(use, function(err, user){
        if(err) throw err;
        if(!user){
            return done(null, false,{message: 'unkown User'});
        }
        User.comparepassword(password, user.password, function(err, isMatch){
            if(err) return done(err);
            if(isMatch){
                return done (null, user);
            }else{
                return done(null, false, {message:'Invalid Passord'});
            }
        });
    });
}));

router.post('/register', upload.single('profileimage') ,function(req, res, next){
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    
    //file up;oading
    if(req.file  ){
        console.log('uploading file');
        var profileimage = req.file.filename;
    }else{
        console.log('no file uploaded...');  
        var profileimage = 'noimage.jpg';  
    }
//Form Validator
req.checkBody('name', 'Name field required').notEmpty();
req.checkBody('email', 'Email field required').notEmpty();
req.checkBody('email', 'Email is not valid').isEmail();
req.checkBody('password', 'Password is field required').notEmpty();
req.checkBody('password2', 'passwords do not match').equals(req.body.password);

var errors = req.validationErrors();
  if(errors){
      //if errors redirect or re render the page
     console.log('Errors');
      res.render('register', {
          errors:errors
      });
  }else{
      var newUser = new User({
          name: name,
          email: email,
          username: username,
          password: password,
          profileimage: profileimage
      }); 

      User.createUser(newUser, function(err, user){
          if(err) throw err;
          console.log(user);
      });
      
      req.flash('success', 'You are now registered, login to ur account');
      
      res.location('/');
      res.redirect('/');
      }
      
});

module.exports = router;