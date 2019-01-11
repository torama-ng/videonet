const createError = require("http-errors"),
  express = require("express"),
  hbs = require("hbs"),
  path = require("path"),
  fs = require("fs"),
  flash = require("connect-flash"),
  cookieParser = require("cookie-parser"),
  bodyparser = require("body-parser"),
  logger = require("morgan"),
  session = require("express-session"),
  MongoStore = require("connect-mongo")(session),
  passport = require("passport"),
  mongoose = require("mongoose");

// loading routes
const indexRouter = require("./routes/index"),
  usersRouter = require("./routes/users"),
  videosRouter = require("./routes/videos"),
  searchRouter = require("./routes/search"),
  uploadRouter = require("./routes/upload"),
  videosCategory = require("./routes/videosCategory");

const app = express();

// DB config
const db = require("./config/database");

// Passport config
require("./config/passport")(passport);

//connecting to the database
mongoose
  .connect(
    db.mongoURI, {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log("Videonet Database connected!");
  })
  .catch(err => console.log(err));

// load videos model
const Videos = require("./models/Videos");

// getting json data file and saving to mongoDB
fs.readFile("./videos.json", function (err, data) {
  if (err) throw err;

  let videoList = JSON.parse(data);
  var videoArray = videoList.videos;

  Videos.collection.deleteMany({});

  videoArray.forEach(video => {
    Videos.collection.findOneAndUpdate(
      video, {
        $set: video
      }, {
        upsert: true
      }
    );
  });
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// setting handlebars partials
hbs.registerPartials(__dirname + "/views/partials");

// handlebars helpers
hbs.registerHelper("formatMe", function (txt) {
  txt = path.basename(txt, ".mp4");
  txt = decodeURI(txt);

  return txt.substring(0, 45);
});

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "videos")));

// some middleware options for bodyparser
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: false
  })
);

// Express session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      url: db.mongoURI
    })
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// using Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/videos", videosRouter);
app.use("/search", searchRouter);
app.use("/upload", uploadRouter);
app.use("/category", videosCategory);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;