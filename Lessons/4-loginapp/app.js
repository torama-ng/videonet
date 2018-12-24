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
var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://tor1:T0rDBpass@ds117109.mlab.com:17109/tordb1');
var db = mongoose.connection;


var routes = require('./routes/index');
var users = require('./routes/users');
var nodejs = require('./routes/nodejs');
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
const mongod = require('./routes/mongo');

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
app.use('/html', html);
app.use('/css', css);
app.use('/bootstrap', bootstrap);
app.use('/usermgt', usermgt);
app.use('/mongod', mongod);
app.use('/react', react);
app.use('/angular', angular);
app.use('/vue', vue);
app.use('/linux', linux);
app.use('/bash', bash);

// Set Port
app.set('port', (process.env.PORT || 3100));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});

module.exports = app;
