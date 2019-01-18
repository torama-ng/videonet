// const hbs = require('handlebars');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const walk = require('./walk.js');
const hbs = require('hbs');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/toramaDb');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var menuRouter = require('./routes/menu');
var userloggedinRouter = require('./routes/userloggedin');
var userregRouter = require('./routes/userreg');
var auth = require('./routes/auth')(passport);
var creator = require('./routes/creator');


var app = express();

//view engine set up
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
// app.engine('hbs', exphbs({
//     extname: 'hbs',
//     layoutsDir: __dirname + '/views/',
//     defaultLayout: 'layout'
// }));






// Handlebars helpers
hbs.registerHelper('formatMe', function(txt) {
    txt = path.basename(txt, '.mp4');
    txt = decodeURI(txt);
    return txt.substring(0, 45);

});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'videos')));
app.use(session({
    secret: 'thesecret',
    saveUninitialized: false,
    resave: false
}));
app.use(bodyParser.json());
app.use('/auth', auth)

// Walk Dir

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/menu', menuRouter);
app.use('/userloggedin', userloggedinRouter);
app.use('/userreg', userregRouter);
app.use('/creator', creator);


app.use('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

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