var express = require('express');
var router = express.Router();
var session = require('express-session');
var path =require("path");

router.use(session({ secret: "_ajjvnjjcbvhbhvLiveNow", resave: false, saveUninitialized: true }));

// Load and call the user collections from the collections folder
const videoData = require('../collections/videos');


const allVideos = require('../randomfilepicker');
var videosSync = [];

videosSync = allVideos.findVideos('videos');

console.log(__dirname);
/* GET home page. */
router.get('/', function (req, res, next) {

  if (req.session.user) {

    videosSync.forEach(path => {

      //var splitPath = path.url.split('/');
      var name = getName(path.url);
      var category = getCategory(path.url);

      // Changing all mp4 formats to jpg
      splitName = name.split(".");
      snapshot = splitName[0];


      console.log(name);

      videoData.findOne({ vid_name: name }, (err, doc) => {
        if (err) throw err;
        if (doc) {
          console.log('Video in database');
        } else {

          // Video Thumbnail
         //convertToThumbnail(category, name);
          // var id = new Date().toLocaleTimeString() + "_"+new Date().getSeconds() + "Torama"+ new Date().getHours();
          var vid_items = {
            vid_url: path.url,
            vid_name: name,
            vid_views: 1,
            vid_uploader: req.session.user.email,
            vid_category: category,
            vid_thumbnail: snapshot + ".jpg"
          }

          var data = new videoData(vid_items);
          data.save();

        }

      })

    });

    videoData.find({}, (error, doc) => {
      if (error) throw error;

      res.render('recommended', {
        videoTitle: 'Torama Video Portal (index)',
        lessonNumber: 'Lesson 1',
        videoDir: 'Root (videos)',
        videoFiles: doc,
        recommended: doc[2],
        checker: true,
        user: req.session.user
      });

    });

  }
  else {

  
    res.redirect('/user/login');
  }


});


function getName(txt) {
  var url = txt.split('/');
  var name = url[1];
  return name;
}

function getCategory(txt) {
  var url = txt.split('/');
  var name = url[0];
  return name;
}


function convertToThumbnail(fileElements, video) {
  splitpath = video.split(".");
  snapshot = splitpath[0];

  pathToFile = path.join(__dirname, "videos", fileElements, video);
  pathToSnapshot = path.join(__dirname, "thumbnails", `${snapshot}.jpg`);

  // Also a default node module
  require('child_process').exec(('ffmpeg -ss 00:00:25 -i ' + pathToFile + ' -vframes 1 -q:v 2 ' + pathToSnapshot), function () {
    console.log('Saved the thumb to:', pathToSnapshot);

  });
}

module.exports = router;

