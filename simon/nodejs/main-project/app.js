var createError = require('http-errors');
var express = require('express');
var path = require('path');
// const expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var busboy = require('connect-busboy');
var bodyParser = require('body-parser');
var cors = require('cors');
const expressSession = require('express-session');
var fileUpload = require('express-fileupload');
var formidable = require('formidable');
var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var videosRouter = require('./routes/videos');
var odooRouter = require('./routes/odoo');
var pythonRouter = require('./routes/python');
var javaRouter = require('./routes/java');
var javascriptRouter = require('./routes/javascript');
var bashRouter = require('./routes/bash');
var htmlRouter = require('./routes/html');
var linuxRouter = require('./routes/linux');
var nodejsRouter = require('./routes/nodejs');
var searchedVids = require('./routes/searchedVideos');
var allVideos = require('./routes/randomVideos');
var uploadFiles = require('./routes/uploadFiles');
var userLogin  =  require('./routes/login');
const expressValidator = require('express-validator');
const ejsLint = require('ejs-lint');
const mongoose = require('mongoose');
const hbs = require('hbs');
var exphbs = require('express-handlebars');
let db = require('./models/db');
let passport  = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;
const auth = require('./models/auth');
const user_reg = require('./models/user_reg');





var app = express();


// ensure authentication...

function ensureAuthenticated(req, res, next){
if( name){
  return next();
}else{
  // should send login view
  console.log('message :   you are not logged in ...');
  res.redirect('/');
}
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
  


// setting handlebars partials
hbs.registerPartials(__dirname + '/views/partials');

// Handlebars helpers
hbs.registerHelper('formatMe', function(txt) {
  txt = path.basename(txt,'.mp4');
  txt =  decodeURI(txt) ;
   return txt.substring(0, 45);

});
app.use(bodyParser({defer:true}));
app.use(bodyParser.json());
app.use(expressValidator());
// express session at work
app.use(expressSession({secret : 'ewetrurifndkedndnkwh', saveUninitialized : true, resave: true}));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'videos')));




// global validator
app.use(function(req, res, next){
  res.locals.errors = null;
  next();

});



// Walk Dir

app.use('/', indexRouter);
// app.use('/users', ensureAuthenticated,  usersRouter);
app.use('/videos',  videosRouter);
app.use('/odoo',   odooRouter);
app.use('/python',  pythonRouter);
app.use('/java',  javaRouter);
app.use('/javascript',  javascriptRouter);
app.use('/bash',  bashRouter);
app.use('/html', htmlRouter);
app.use('/nodejs',   nodejsRouter);
app.use('/linux', linuxRouter,);
app.use('/searchedVideos',  searchedVids);
app.use('/randomVideos', allVideos);
app.use('/uploadFiles', uploadFiles);
app.use('/login',   userLogin);
app.use('/user_reg',  user_reg);







// render 404 error
app.use('*', function(req, res) {
   res.sendFile(path.join(__dirname + '/error.html'));

});

// session
app.use(passport.initialize());
app.use(passport.session());

// Handlebars helpers
hbs.registerHelper('formatMe', function(txt) {
  txt = path.basename(txt,'.mp4');
  txt =  decodeURI(txt) ;
  //return txt;
   return txt.substring(0, 45);

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
