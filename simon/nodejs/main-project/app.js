var createError = require('http-errors');
var express = require('express');
var path = require('path');
const flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const expressSession = require('express-session');
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
const hbs = require('hbs');
let passport  = require('passport');
const user_reg = require('./models/user_reg');
const profile = require('./models/profile');
const cookieSession = require('cookie-session');
const projectKeys  = require('./models/appKeys');
const index_pro  = require('./routes/index_pro');
const torplay = require('./routes/toyplay');
const videoRoutes = require('./routes/videoroutes');





var app = express();



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
app.use(expressSession({secret : projectKeys.session.sessionKeys, saveUninitialized : true, resave: true}));
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
app.use('/videos', ensureAuthenticated, videosRouter);
app.use('/odoo', ensureAuthenticated,  odooRouter);
app.use('/python', ensureAuthenticated, pythonRouter);
app.use('/java',ensureAuthenticated,  javaRouter);
app.use('/javascript',ensureAuthenticated,  javascriptRouter);
app.use('/bash', ensureAuthenticated, bashRouter);
app.use('/html', ensureAuthenticated, htmlRouter);
app.use('/nodejs', ensureAuthenticated,  nodejsRouter);
app.use('/linux', ensureAuthenticated, linuxRouter,);
app.use('/searchedVideos',ensureAuthenticated,  searchedVids);
app.use('/randomVideos',ensureAuthenticated, allVideos);
app.use('/uploadFiles',ensureAuthenticated, uploadFiles);
app.use('/login',   userLogin);
app.use('/user_reg',  user_reg);
app.use('/profile',ensureAuthenticated, profile );
app.use('/index_pro',ensureAuthenticated,  index_pro);

// Routes
app.use('/api/videos',videoRoutes);
app.use('/torplay',torplay);





// render 404 error
// app.use('*', function(req, res) {
//    res.sendFile(path.join(__dirname + '/error.html'));

// });

// session
app.use(passport.initialize());
app.use(passport.session( { cookie: { maxAge: 60000 }}));
// app.use(cookieSession({
//   maxAge : 24 * 60 * 60 * 1000,
//   keys : [projectKeys.session.sessionKeys]
// }))

// Handlebars helpers
hbs.registerHelper('formatMe', function(txt) {
  txt = path.basename(txt,'.mp4');
  txt =  decodeURI(txt) ;
   return txt.substring(0, 45);

});

// Handlebars helpers
hbs.registerHelper('if_eq', function(a, b, opts) {
  if (a == b) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


// ensure authentication...
function ensureAuthenticated(req, res, next){
  if( req.session.user){
    return next();
  }else{
    console.log('message :   you are not logged in ...');
    req.flash('you are not logged in');
    res.redirect('/');
  }
  }
  

module.exports = app;
