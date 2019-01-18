const GoogleStrategy = require('passport-google-oauth20');
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const googleKeys = require('../models/appKeys');
const passport = require('passport');
var express = require('express');
var router = express.Router();





// google login authentication
// //   /auth/twitter/callback
// // router.get('/auth/google',
// // passport.authenticate('google', { scope: ['profile'] }));
// // // failed authentication redirect

// // router.get('/auth/google/randomVideos', 
// // passport.authenticate('google', { failureRedirect: '/' }),
// // function(req, res) {
// //   // Successful authentication, redirect.
// //   res.send('you just logged in from google');
// //   // res.redirect('/randomVideos');
// });
  
 