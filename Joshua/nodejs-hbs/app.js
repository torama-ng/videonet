const createError = require('http-errors');
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const logger = require('morgan');

// loading routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const videosRouter = require('./routes/videos');
const odooRouter = require('./routes/odoo');
const pythonRouter = require('./routes/python');
const javaRouter = require('./routes/java');
const javascriptRouter = require('./routes/javascript');
const bashRouter = require('./routes/bash');
const htmlRouter = require('./routes/html');
const linuxRouter = require('./routes/linux');
const nodejsRouter = require('./routes/nodejs');
const searchRouter = require('./routes/search');

// DB config
const db = require("./config/database");

const app = express();

//connecting to the database
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Vidoenet Database connected!')
  })
  .catch(err => console.log(err));

// load videos model
require("./models/Videos");
var Videos = mongoose.model("videos");

// getting json data file and saving to mongoDB
fs.readFile('./videos.json', function (err, data) {
  if (err) throw err;

  let videoList = JSON.parse(data);
  var videoArray = videoList.videos;

  videoArray.forEach(video => {
    Videos.collection.findOneAndUpdate(video, {
      $set: video
    }, {
      upsert: true
    })
  });

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// setting handlebars partials
hbs.registerPartials(__dirname + '/views/partials');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'videos')));


// some middleware options for bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: false
}));


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
app.use('/search', searchRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;