// const hbs = require('handlebars');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var hbs = require('hbs');
// var exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var session = require('express-session');
var passport = require('passport');
var localStratrgy = require('passport-local').Strategy;
var ExpressValidator = require('express-validator');
var multer = require('multer');
var upload = multer({dest: './uploads'});
var flash = require('connect-flash');
var bcrypt = require('bcryptjs');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;

var indexRouter = require('./routes/index');
var playareaRouter = require('./routes/playarea');
var nodeRouter = require('./routes/nodejs');
var pythonRouter = require('./routes/python');
var javaRouter = require('./routes/java');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// app.engine('hbs', exphbs({
//   extname:'hbs',
//   layoutsDir:__dirname+'/views',
//   defaultLayout:'layout'
// }));

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

// Handlebars helpers converting decodeduri to a parmalink
hbs.registerHelper('formatMe', function(txt) {
  txt = path.basename(txt,'.mp4');
  txt =  decodeURI(txt);

  var result = txt.substring(0, 45) ;
  return  new hbs.SafeString(result);
});

// Handlebars helpers converting decodeduri to a parmalink
hbs.registerHelper('GetNums', function(number) {
   if(number == 3){
     return true;
   }else{
     return false;
   }
});

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'videos')));

app.use(session({
  secret:'secret',
  saveUnitialized:true,
  resave: true
}));
//passport
app.use(passport.initialize());
app.use(passport.session());
//validator
app.use(ExpressValidator({
  errorFormatter: function(param, msg, value){
    var namespace = param.split('.'),
    root = namespace.shift(),
    fornParam = root;
    while(namespace.length){
      fornParam +='[' + namespace.shift() + ']';
    }
    return{
      param: fornParam,
      msg : msg,
      value: value
    };
  }
}));
//flash

// app.use(require('connect-flash')());
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success = req.flash('success');
  res.locals.register = req.register || null;
  next();
});

app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res);
  next();
});
app.use('/', indexRouter);
app.use('/playarea', playareaRouter);
app.use('/nodejs',nodeRouter);
app.use('/python',pythonRouter);
app.use('/java',javaRouter);
app.use('/users',usersRouter);

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
