var createError = require('http-errors');
var express = require('express');
var path = require('path');
var hbs = require('hbs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var indexRouter = require('./routes/index');
var user = require('./routes/user');
var viewer = require('./routes/viewer');
var categories = require('./routes/categories');
var randomvideos = require('./routes/randomvideos');
var searchedvideos = require('./routes/searchedvideos');
var uploadfiles = require('./routes/uploadfiles');
var videos = require('./routes/videos');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// setting handlebars partials
hbs.registerPartials(__dirname + '/views/partials');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'videos')));
app.use(express.static(path.join(__dirname, 'profile_pics')));

app.use('/', indexRouter);
app.use('/categories',categories);
app.use('/user',user);
app.use('/viewer',viewer);
app.use('/randomvideos', randomvideos);
app.use('/searchedvideos', searchedvideos);
app.use('/uploadfiles', uploadfiles);
//app.use('/user_registration_mongo', user_registration_mongo);
app.use('/videos', videos);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

hbs.registerHelper('Get_Name', function(txt) {
  var url = txt.split('/upload/');
  var name = url[1];
  return name;

});

hbs.registerHelper('formatMe', function(txt) {
  txt = path.basename(txt,'.mp4');
  txt =  decodeURI(txt) ;
  return txt;
  //return txt.substring(0, 45);

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
