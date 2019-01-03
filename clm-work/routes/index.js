var express = require('express');
var router = express.Router();
const fs = require('fs');
const session = require('express-session');


router.use(session({secret:"_ajjvnjjcbvhbhvLiveNow",resave:false,saveUninitialized:true}));
//const walk = require('../walk.js');

//var walkSync = walk.walkSync('videos');
//const walker = require('../sqlwalker');
const allVideos = require('../randomfilepicker');
var videosSync = [];

// mkdir if not exits
const mkdirSync = function (dirPath) {
  try {
      fs.mkdirSync(dirPath)
  } catch (err) {
      if (err.code !== 'EEXIST') throw err
  }
}

// Make dir if not exists
mkdirSync('videos');
videosSync = allVideos.findVideos('videos');


/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.user){

    res.render('recommended', {
      videoTitle: 'Torama Video Portal (index)',
      lessonNumber: 'Lesson 1',
      videoDir: 'Root (videos)',
      videoFiles: videosSync,
      recommended: videosSync[3],
      checker:1,
      user: req.session.user
    });
  }else{
    res.render('recommended', {
      videoTitle: 'Torama Video Portal (index)',
      lessonNumber: 'Lesson 1',
      videoDir: 'Root (videos)',
      videoFiles: videosSync,
      recommended: videosSync[3],
      checker:0
    });
  }
 
});

module.exports = router;

