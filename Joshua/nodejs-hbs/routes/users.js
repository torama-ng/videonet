const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const nodemailer = require('nodemailer');

// Load user model
const User = require('../models/Users');

// getting login page
router.get('/login', (req, res) => {
  res.render('users/login');
});

//registration page
router.get('/register', (req, res) => {
  res.render('users/register');
});

// login post request working with passport authentication
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});


// registartion post request, using bcrypt to hash passwords
router.post('/register', (req, res) => {
  let errors = [];

  if (req.body.password != req.body.password2) {
    errors.push({
      text: "Passwords don't match"
    });
  }

  if (req.body.password.length <= 4) {
    errors.push({
      text: "Password must be more than 4 characters"
    });
  }

  if (errors.length > 0) {
    res.render('users/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    User.findOne({
        email: req.body.email
      })
      .then(user => {
        if (user) {
          req.flash('error_msg', 'Email already registered');
          res.redirect('/users/register');
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'Registration successful, Login now!');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });


          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'your gmail',
              pass: 'your password'
            }
          });

          // setup email data with unicode symbols
          let mailOptions = {
            from: '"WELCOME TO </>TORAMA" <your gmail>', // sender address
            to: `${req.body.email}`, // list of receivers
            subject: `Hello ${req.body.name}`, // Subject line
            text: "Hello world?", // plain text body
            html: "<p>Thank you for choosing Torama Tech.</p>" // html body
          };

          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(info);
            }

            res.redirect('/users/login');

          });
        }
      });
  }
});

//log out functionality
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are now logged out');
  res.redirect('/users/login');
})

module.exports = router;