const hbs = require('handlebars');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/playarea');
var nodeRouter = require('./routes/nodejs');
var pythonRouter = require('./routes/python');
var javaRouter = require('./routes/java');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', exphbs({
  extname:'hbs',
  layoutsDir:__dirname+'/views',
  defaultLayout:'layout'
}));

app.set('view engine', 'hbs');

// Handlebars helpers converting decodeduri to a parmalink
hbs.registerHelper('formatMe', function(txt) {
  txt = path.basename(txt,'.mp4');
  txt =  decodeURI(txt);

  var result = txt.substring(0, 45) ;
  return  new hbs.SafeString(result);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'videos')));


app.use('/', indexRouter);
app.use('/playarea', usersRouter);
app.use('/nodejs',nodeRouter);
app.use('/python',pythonRouter);
app.use('/java',javaRouter);

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
