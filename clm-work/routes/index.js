var express = require('express');
var router = express.Router();


var session = require('express-session');


router.use(session({secret:"_ajjvnjjcbvhbhvLiveNow",resave:false,saveUninitialized:true}));

const allVideos = require('../randomfilepicker');
var videosSync = [];

videosSync = allVideos.findVideos('videos');

console.log(__dirname);
/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.user){
    res.render('recommended', {
      videoTitle: 'Torama Video Portal (index)',
      lessonNumber: 'Lesson 1',
      videoDir: 'Root (videos)',
      videoFiles: videosSync,
      recommended: videosSync[3],
      checker:true,
      user: req.session.user
    });
  }
  else{
    res.render('recommended', {
      videoTitle: 'Torama Video Portal (index)',
      lessonNumber: 'Lesson 1',
      videoDir: 'Root (videos)',
      videoFiles: videosSync,
      recommended: videosSync[3],
      checker:false,
      user:""    
    });
  }
 
});

module.exports = router;

