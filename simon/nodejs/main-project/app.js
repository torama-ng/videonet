var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var busboy = require('connect-busboy');
var bodyParser = require('body-parser');
var cors = require('cors');
var fileUpload = require('express-fileupload');
var formidable = require('formidable');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
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
var user_reg  =  require('./routes/user_reg');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const ejsLint = require('ejs-lint');





var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(bodyParser({defer:true}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(expressSession({secret : 'max', saveUninitialized : false, resave: false}));



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
app.use('/users', usersRouter);
app.use('/videos', videosRouter);
app.use('/odoo', odooRouter);
app.use('/python', pythonRouter);
app.use('/java', javaRouter);
app.use('/javascript', javascriptRouter);
app.use('/bash', bashRouter);
app.use('/html', htmlRouter);
app.use('/nodejs', nodejsRouter);
app.use('/linux', linuxRouter);
app.use('/searchedVideos', searchedVids);
app.use('/randomVideos', allVideos);
app.use('/uploadFiles', uploadFiles);
app.use('/login', userLogin);
app.use('/user_reg', user_reg);






app.use('*', function(req, res) {
   res.sendFile(path.join(__dirname + '/error.html'));

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
