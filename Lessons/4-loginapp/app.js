const hbs = require('handlebars');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://tor1:T0rDBpass@ds117109.mlab.com:17109/tordb1');
var db = mongoose.connection;


var routes = require('./routes/index');
var users = require('./routes/users');
var nodejs = require('./routes/nodejs');
var mongod = require('./routes/mongod');
var javascript = require('./routes/javascript');
var html = require('./routes/html');
var usermgt = require('./routes/usermgt');
var css = require('./routes/css');
var bootstrap = require('./routes/bootstrap');
const linux = require('./routes/linux');
const react = require('./routes/react');
const vue = require('./routes/vue');
const angular = require('./routes/angular');
const bash = require('./routes/bash');

 

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
    extname:'hbs',
    layoutsDir:__dirname+'/views/layouts/',
    defaultLayout:'layout'
  }));
  
app.set('view engine', 'hbs');

// Handlebars helpers
hbs.registerHelper('formatme', function(txt) {
  txt = path.basename(txt,'.mp4');
  txt =  decodeURI(txt) ;
  return txt.substring(0, 45);

});


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'videos')));


// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
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

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  res.locals.title = "</>Torama Videonet"
  next();
});

// Routes
app.use('/', routes);
app.use('/users', users);
app.use('/nodejs', nodejs);
app.use('/javascript', javascript);
app.use('/mongod', mongod);
app.use('/html', html);
app.use('/css', css);
app.use('/bootstrap', bootstrap);
app.use('/usermgt', usermgt);
app.use('/react', react);
app.use('/angular', angular);
app.use('/vue', vue);
app.use('/linux', linux);
app.use('/bash', bash);

module.exports = app;
