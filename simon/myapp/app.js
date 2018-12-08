var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const walk = require('./walk.js');
let bodyParser = require ('body-parser');




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
var djangoRouter = require('./routes/django');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'videos')));

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
app.use('/django', djangoRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

let urlencodedParser = bodyParser.urlencoded({extended:false})

// get value from search box
app.get('/process_get',  function(req,res){
  //prepare output
  response = {
    searchbox:req.query.searchbox};
  console.log(response);
  res.end(JSON.stringify(response));
})

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
